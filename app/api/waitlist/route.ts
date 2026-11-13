import { captureMarketing, cleanEmail, cleanName, clientIp, rateLimit } from "@/lib/integrations";
import { json } from "@/lib/http";

export async function POST(request: Request) {
  if (!rateLimit(`waitlist:${clientIp(request)}`)) {
    return json({ ok: false, message: "Too many tries. Wait a few minutes." }, 429);
  }
  const body = (await request.json().catch(() => null)) as { email?: string; name?: string; source?: string; consent?: boolean; company?: string } | null;
  if (!body || body.company) return json({ ok: true, message: "You are on the founding list." });
  if (!body.consent) return json({ ok: false, message: "Tick the box to join the list." }, 400);
  const email = cleanEmail(body.email);
  if (!email) return json({ ok: false, message: "Check the email address." }, 400);
  const result = await captureMarketing({
    email,
    name: cleanName(body.name),
    source: typeof body.source === "string" ? body.source.slice(0, 80) : "founding-list",
  });
  if (result.reason === "not_connected") {
    return json({ ok: false, message: "The list is not connected yet. Nothing was stored." }, 503);
  }
  if (!result.ok) return json({ ok: false, message: "We could not store that email. Try again later." }, 502);
  return json({ ok: true, message: "You are on the founding list.", stored: result.stored });
}
