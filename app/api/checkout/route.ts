import { products, sizes, type Size } from "@/lib/catalog";
import { createCheckout, shopifyConfigured, type BagLine } from "@/lib/integrations";
import { json } from "@/lib/http";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { lines?: BagLine[] } | null;
  const lines = Array.isArray(body?.lines) ? body.lines : [];
  if (!lines.length || lines.length > 20) return json({ ok: false, message: "The bag is empty." }, 400);
  for (const line of lines) {
    if (!products.some((product) => product.handle === line.handle)) {
      return json({ ok: false, message: "A piece in the bag is not in Drop 01." }, 400);
    }
    if (!sizes.includes(line.size as Size)) return json({ ok: false, message: "Choose a listed size." }, 400);
    if (!Number.isInteger(line.qty) || line.qty < 1 || line.qty > 4) {
      return json({ ok: false, message: "Quantity must be from 1 to 4." }, 400);
    }
  }
  if (!shopifyConfigured()) {
    return json(
      { ok: false, message: "Checkout is not connected. Your bag stays in this browser. No payment is taken on this preview." },
      503,
    );
  }
  try {
    const checkoutUrl = await createCheckout(lines);
    return json({ ok: true, checkoutUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout could not be opened.";
    return json({ ok: false, message }, 502);
  }
}
