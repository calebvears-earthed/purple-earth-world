import { products } from "@/lib/catalog";
import { automationAuthorised, shopifyConfigured, storefront } from "@/lib/integrations";
import { json } from "@/lib/http";

type Variant = { title: string; quantityAvailable: number | null };

export async function POST(request: Request) {
  if (!process.env.AUTOMATION_SECRET) return json({ ok: false, message: "Automation secret is not set." }, 501);
  if (!automationAuthorised(request)) return json({ ok: false, message: "Not authorised." }, 401);
  if (!shopifyConfigured()) return json({ ok: false, message: "Shopify Storefront is not connected." }, 501);
  const low: { handle: string; title: string; quantity: number }[] = [];
  for (const product of products) {
    const result = await storefront<{ product: { variants: { nodes: Variant[] } } | null }>(
      `query Stock($handle: String) {
        product(handle: $handle) { variants(first: 50) { nodes { title quantityAvailable } } }
      }`,
      { handle: product.handle },
    );
    if (result.errors?.length) return json({ ok: false, message: "Stock could not be read." }, 502);
    for (const variant of result.data?.product?.variants.nodes ?? []) {
      if (variant.quantityAvailable !== null && variant.quantityAvailable < 5) {
        low.push({ handle: product.handle, title: `${product.name} ${variant.title}`, quantity: variant.quantityAvailable });
      }
    }
  }
  let alerted = false;
  if (low.length && process.env.SLACK_WEBHOOK_URL) {
    const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: `Purple Earth low stock: ${low.map((row) => `${row.title} (${row.quantity})`).join(", ")}`,
      }),
    });
    alerted = response.ok;
  }
  return json({ ok: true, low, alerted, message: "Count only. No order was placed." });
}
