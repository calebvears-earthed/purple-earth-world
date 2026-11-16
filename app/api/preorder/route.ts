import { getProduct, sizes, type Size } from "@/lib/catalog";
import { captureMarketing, cleanEmail, cleanName, clientIp, insertRow, rateLimit, registrationOpen, supabaseConfigured } from "@/lib/integrations";
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
    colour?: string;
    consent?: boolean;
    company?: string;
  } | null;
  if (!body || body.company) return json({ ok: true, message: "Pre-order registered. Payment is not taken here." });
  if (!body.consent) return json({ ok: false, message: "Tick the box to register." }, 400);
  const email = cleanEmail(body.email);
  const product = getProduct(typeof body.handle === "string" ? body.handle : "");
  const size = sizes.find((item) => item === body.size) as Size | undefined;
  const qty = Number(body.qty);
  const colour = product?.colourways.find((item) => item.id === body.colour);
  if (!email || !product || !size || !colour || !Number.isInteger(qty) || qty < 1 || qty > 4) {
    return json({ ok: false, message: "Check the email, the piece, the colour and the size." }, 400);
  }

  const stored: string[] = [];
  if (supabaseConfigured()) {
    const table = process.env.SUPABASE_PREORDER_TABLE || "preorders";
    const saved = await insertRow(table, {
      email,
      name: cleanName(body.name) || null,
      handle: product.handle,
      colour: colour.id,
      size,
      qty,
      created_at: new Date().toISOString(),
    });
    if (saved.ok) stored.push("preorder");
  }
  const list = await captureMarketing({
    email,
    name: cleanName(body.name),
    source: `preorder:${product.handle}:${colour.id}:${size}:${qty}`.slice(0, 80),
  });
  if (list.ok) stored.push(...list.stored);
  if (!stored.length) {
    if (!registrationOpen()) {
      return json(
        {
          ok: false,
          holding: true,
          message: "Pre-order registration is on hold. Nothing was stored, and no payment was taken.",
        },
        503,
      );
    }
    return json({ ok: false, message: "We could not store that pre-order. Try again later." }, 502);
  }
  return json({
    ok: true,
    message: `Registered for the ${product.name}, ${colour.name}, size ${size}. Payment is not taken here.`,
    stored,
  });
}
