import { getProduct, sizes, type Size } from "@/lib/catalog";
import { captureMarketing, cleanEmail, cleanName, clientIp, insertRow, rateLimit, supabaseConfigured } from "@/lib/integrations";
import { json } from "@/lib/http";

export async function POST(request: Request) {
  if (!rateLimit(`preorder:${clientIp(request)}`)) {
    return json({ ok: false, message: "Too many tries. Wait a few minutes." }, 429);
  }
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    name?: string;
    handle?: string;
    size?: string;
    qty?: number;
    consent?: boolean;
    company?: string;
  } | null;
  if (!body || body.company) return json({ ok: true, message: "Pre-order registered. Payment is not taken here." });
  if (!body.consent) return json({ ok: false, message: "Tick the box to register." }, 400);
  const email = cleanEmail(body.email);
  const product = getProduct(typeof body.handle === "string" ? body.handle : "");
  const size = sizes.find((item) => item === body.size) as Size | undefined;
  const qty = Number(body.qty);
  if (!email || !product || !size || !Number.isInteger(qty) || qty < 1 || qty > 4) {
    return json({ ok: false, message: "Check the email, the piece and the size." }, 400);
  }

  const stored: string[] = [];
  if (supabaseConfigured()) {
    const table = process.env.SUPABASE_PREORDER_TABLE || "preorders";
    const saved = await insertRow(table, {
      email,
      name: cleanName(body.name) || null,
      handle: product.handle,
      size,
      qty,
      created_at: new Date().toISOString(),
    });
    if (saved.ok) stored.push("preorder");
  }
  const list = await captureMarketing({
    email,
    name: cleanName(body.name),
    source: `preorder:${product.handle}:${size}:${qty}`.slice(0, 80),
  });
  if (list.ok) stored.push(...list.stored);
  if (!stored.length) {
    const status = list.reason === "not_connected" && !supabaseConfigured() ? 503 : 502;
    const message = status === 503
      ? "The list is not connected yet. Nothing was stored."
      : "We could not store that pre-order. Try again later.";
    return json({ ok: false, message }, status);
  }
  return json({
    ok: true,
    message: `Registered for the ${product.name}, size ${size}. Payment is not taken here.`,
    stored,
  });
}
