import { adminGraphql, automationAuthorised, shopifyAdminConfigured } from "@/lib/integrations";
import { json } from "@/lib/http";

type OrderNode = {
  name: string;
  lineItems: { nodes: { sku: string | null; title: string; quantity: number; variant: { title: string } | null }[] };
};

export async function POST(request: Request) {
  if (!process.env.AUTOMATION_SECRET) {
    return json({ ok: false, message: "Automation secret is not set." }, 501);
  }
  if (!automationAuthorised(request)) return json({ ok: false, message: "Not authorised." }, 401);
  if (!shopifyAdminConfigured()) {
    return json({ ok: false, message: "Shopify Admin is not connected. No order was drafted with the maker." }, 501);
  }
  const result = await adminGraphql<{ orders: { nodes: OrderNode[] } }>(
    `query Preorder($query: String) {
      orders(first: 100, query: $query) {
        nodes {
          name
          lineItems(first: 50) {
            nodes { sku title quantity variant { title } }
          }
        }
      }
    }`,
    { query: "tag:drop-01-preorder" },
  );
  if (result.errors?.length) return json({ ok: false, message: "The order count could not be read." }, 502);
  const counts = new Map<string, { sku: string; title: string; size: string; quantity: number }>();
  for (const order of result.data?.orders.nodes ?? []) {
    for (const line of order.lineItems.nodes) {
      const size = line.variant?.title || "unspecified";
      const key = `${line.sku || line.title}|${size}`;
      const current = counts.get(key) || { sku: line.sku || "", title: line.title, size, quantity: 0 };
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
    orders: result.data?.orders.nodes.length ?? 0,
    lines: draft,
  });
}
