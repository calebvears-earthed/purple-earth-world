import { products, type Size, sizes } from "@/lib/catalog";

export type BagLine = { handle: string; size: Size; qty: number };

export function shopifyDomain() {
  return (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

export function shopifyConfigured() {
  return Boolean(shopifyDomain() && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN);
}

export function shopifyAdminConfigured() {
  return Boolean(shopifyDomain() && process.env.SHOPIFY_ADMIN_TOKEN);
}

export function customerAccountUrl() {
  if (process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL) {
    return process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL;
  }
  const domain = shopifyDomain();
  return domain ? `https://${domain}/account` : null;
}

export function klaviyoConfigured() {
  return Boolean(process.env.KLAVIYO_API_KEY && process.env.KLAVIYO_LIST_ID);
}

export function supabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function rivoConfigured() {
  return Boolean(process.env.RIVO_API_KEY);
}

export function loyaltyAwardsEnabled() {
  return process.env.LOYALTY_AWARDS_ENABLED === "true" && rivoConfigured();
}

export function judgeMeConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN && process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN,
  );
}

type StorefrontResult<T> = { data?: T; errors?: { message: string }[] };

export async function storefront<T>(query: string, variables?: Record<string, unknown>) {
  const domain = shopifyDomain();
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) {
    throw new Error("Shopify Storefront is not connected.");
  }
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-10";
  const response = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Shopify Storefront responded ${response.status}.`);
  }
  return (await response.json()) as StorefrontResult<T>;
}

export async function adminGraphql<T>(query: string, variables?: Record<string, unknown>) {
  const domain = shopifyDomain();
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!domain || !token) {
    throw new Error("Shopify Admin is not connected.");
  }
  const version = process.env.SHOPIFY_ADMIN_API_VERSION || "2025-10";
  const response = await fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Shopify Admin responded ${response.status}.`);
  }
  return (await response.json()) as StorefrontResult<T>;
}

type VariantNode = {
  id: string;
  title: string;
  selectedOptions: { name: string; value: string }[];
};

export async function createCheckout(lines: BagLine[]) {
  const merchandise = [];
  for (const line of lines) {
    const product = products.find((item) => item.handle === line.handle);
    if (!product) throw new Error("Unknown piece.");
    if (!sizes.includes(line.size)) throw new Error("Unknown size.");
    if (!Number.isInteger(line.qty) || line.qty < 1 || line.qty > 4) {
      throw new Error("Quantity must be from 1 to 4.");
    }
    const found = await storefront<{
      product: { variants: { nodes: VariantNode[] } } | null;
    }>(
      `query Product($handle: String) {
        product(handle: $handle) {
          variants(first: 50) {
            nodes { id title selectedOptions { name value } }
          }
        }
      }`,
      { handle: line.handle },
    );
    const nodes = found.data?.product?.variants.nodes ?? [];
    if (!nodes.length) {
      throw new Error(`${product.name} is not in the Shopify catalogue yet. Use the handle ${line.handle}.`);
    }
    const sized = nodes.find((node) =>
      node.selectedOptions.some(
        (option) => option.name.toLowerCase() === "size" && option.value.toLowerCase() === line.size.toLowerCase(),
      ),
    );
    const variant = sized ?? (nodes.length === 1 ? nodes[0] : undefined);
    if (!variant) {
      throw new Error(`${product.name} has no Shopify variant for size ${line.size}.`);
    }
    merchandise.push({
      merchandiseId: variant.id,
      quantity: line.qty,
      attributes: [
        { key: "Size", value: line.size },
        { key: "Drop", value: "01" },
      ],
    });
  }

  const created = await storefront<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation CartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { message }
      }
    }`,
    {
      input: {
        lines: merchandise,
        attributes: [
          { key: "drop", value: "01" },
          { key: "preorder", value: "14-day-numbered" },
        ],
        note: "Drop 01 numbered pre-order. Assign the next number when the order is placed.",
        buyerIdentity: { countryCode: "AU" },
      },
    },
  );
  const payload = created.data?.cartCreate;
  if (!payload?.cart || payload.userErrors.length) {
    throw new Error(payload?.userErrors.map((error) => error.message).join(" ") || "Checkout could not be opened.");
  }
  return payload.cart.checkoutUrl;
}

export async function selectRows(table: string, query: string) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { ok: false as const, rows: [] as Record<string, unknown>[] };
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}?${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!response.ok) return { ok: false as const, rows: [] as Record<string, unknown>[] };
  const rows = (await response.json()) as Record<string, unknown>[];
  return { ok: true as const, rows };
}

export async function insertRow(table: string, row: Record<string, unknown>) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { ok: false as const, detail: "not_connected" };
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!response.ok) {
    return { ok: false as const, detail: `database_${response.status}` };
  }
  return { ok: true as const };
}

export async function subscribeKlaviyo(email: string, source: string) {
  const key = process.env.KLAVIYO_API_KEY;
  const list = process.env.KLAVIYO_LIST_ID;
  if (!key || !list) return { ok: false as const, detail: "not_connected" };
  const revision = process.env.KLAVIYO_API_REVISION || "2024-10-15";
  const response = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      revision,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: source,
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                },
              },
            ],
          },
        },
        relationships: { list: { data: { type: "list", id: list } } },
      },
    }),
    cache: "no-store",
  });
  if (!response.ok) return { ok: false as const, detail: `klaviyo_${response.status}` };
  return { ok: true as const };
}

export async function captureMarketing(input: { email: string; source: string; name?: string }) {
  const stored: string[] = [];
  const failed: string[] = [];
  if (supabaseConfigured()) {
    const table = process.env.SUPABASE_WAITLIST_TABLE || "waitlist";
    const result = await insertRow(table, {
      email: input.email,
      name: input.name || null,
      source: input.source,
      created_at: new Date().toISOString(),
    });
    if (result.ok) stored.push("database");
    else failed.push("database");
  }
  if (klaviyoConfigured()) {
    const result = await subscribeKlaviyo(input.email, input.source);
    if (result.ok) stored.push("email");
    else failed.push("email");
  }
  if (!supabaseConfigured() && !klaviyoConfigured()) {
    return { ok: false as const, reason: "not_connected" as const, stored, failed };
  }
  return { ok: stored.length > 0, reason: stored.length ? ("saved" as const) : ("failed" as const), stored, failed };
}

export async function awardVolts(input: { email: string; points: number; note: string }) {
  if (!loyaltyAwardsEnabled()) return { ok: false as const, detail: "awards_off" };
  const base = (process.env.RIVO_API_BASE || "https://developer-api.rivo.io/merchant_api/v1").replace(/\/$/, "");
  const response = await fetch(`${base}/points_events`, {
    method: "POST",
    headers: {
      Authorization: process.env.RIVO_API_KEY || "",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      customer_identifier: input.email,
      source: "manual",
      points_amount: input.points,
      skip_email: true,
      internal_note: input.note,
      external_note: input.note,
    }),
    cache: "no-store",
  });
  if (!response.ok) return { ok: false as const, detail: `rivo_${response.status}` };
  return { ok: true as const };
}

const hits = new Map<string, { n: number; t: number }>();

export function rateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || now - current.t > windowMs) {
    hits.set(key, { n: 1, t: now });
    return true;
  }
  if (current.n >= limit) return false;
  current.n += 1;
  return true;
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export function cleanEmail(value: unknown) {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 200 || !/^[^\s@(),]+@[^\s@(),]+\.[^\s@(),]+$/.test(email)) return null;
  return email;
}

export function cleanName(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F]/g, "").trim().slice(0, 80);
}

export function automationAuthorised(request: Request) {
  const secret = process.env.AUTOMATION_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : request.headers.get("x-automation-secret");
  return token === secret;
}
