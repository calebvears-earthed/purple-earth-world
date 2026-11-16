import { adminGraphql, automationAuthorised, shopifyAdminConfigured } from "@/lib/integrations";
import { json } from "@/lib/http";

type LineNode = {
  sku: string | null;
  title: string;
  quantity: number;
  customAttributes: { key: string; value: string }[];
  variant: { id: string; title: string; selectedOptions: { name: string; value: string }[] } | null;
};

type OrderNode = {
  name: string;
  lineItems: { pageInfo: { hasNextPage: boolean }; nodes: LineNode[] };
};

type OrdersPage = {
  orders: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: OrderNode[];
  };
};

const query = `query Preorder($query: String, $cursor: String) {
  orders(first: 100, after: $cursor, query: $query) {
    pageInfo { hasNextPage endCursor }
    nodes {
      name
      lineItems(first: 100) {
        pageInfo { hasNextPage }
        nodes {
          sku
          title
          quantity
          customAttributes { key value }
          variant { id title selectedOptions { name value } }
        }
      }
    }
  }
}`;

export async function POST(request: Request) {
  if (!process.env.AUTOMATION_SECRET) {
    return json({ ok: false, message: "Automation secret is not set." }, 501);
  }
  if (!automationAuthorised(request)) return json({ ok: false, message: "Not authorised." }, 401);
  if (!shopifyAdminConfigured()) {
    return json({ ok: false, message: "Shopify Admin is not connected. No order was drafted with the maker." }, 501);
  }

  const orders: OrderNode[] = [];
  let cursor: string | null = null;
  let complete = false;
  for (let page = 0; page < 100; page += 1) {
    const after = cursor;
    const result: { data?: OrdersPage; errors?: { message: string }[] } = await adminGraphql<OrdersPage>(query, {
      query: "tag:drop-01-preorder",
      cursor: after,
    });
    if (result.errors?.length || !result.data?.orders) {
      return json({ ok: false, message: "The order count could not be read. Nothing was purchased." }, 502);
    }
    const connection: OrdersPage["orders"] = result.data.orders;
    for (const order of connection.nodes) {
      if (order.lineItems.pageInfo.hasNextPage) {
        return json({ ok: false, message: "An order has more lines than this count can read. Nothing was purchased." }, 502);
      }
    }
    orders.push(...connection.nodes);
    if (!connection.pageInfo.hasNextPage) {
      complete = true;
      break;
    }
    cursor = connection.pageInfo.endCursor;
  }
  if (!complete) {
    return json({ ok: false, message: "The count stopped before every order was read. Nothing was purchased." }, 502);
  }

  const counts = new Map<string, { sku: string; title: string; size: string; colour: string; quantity: number }>();
  for (const order of orders) {
    for (const line of order.lineItems.nodes) {
      const named = (names: string[]) =>
        line.variant?.selectedOptions.find((option) => names.includes(option.name.toLowerCase()))?.value ||
        line.customAttributes?.find((attribute) => names.includes(attribute.key.toLowerCase()))?.value ||
        "";
      const size = named(["size"]) || "unspecified";
      const colour = named(["colour", "color", "colorway"]) || "unspecified";
      const key = `${line.variant?.id || ""}|${line.sku || ""}|${line.title}|${size}|${colour}`;
      const current = counts.get(key) || { sku: line.sku || "", title: line.title, size, colour, quantity: 0 };
      current.quantity += line.quantity;
      counts.set(key, current);
    }
  }
  const draft = [...counts.values()].map((row) => ({
    ...row,
    withBuffer: Math.ceil(row.quantity * 1.1),
  }));
  return json({
    ok: true,
    message: "Draft count only. Nothing was purchased.",
    orders: orders.length,
    lines: draft,
  });
}
