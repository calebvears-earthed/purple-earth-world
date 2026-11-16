import { walks } from "@/lib/catalog";
import { captureMarketing, cleanEmail, cleanName, clientIp, insertRow, rateLimit, supabaseConfigured } from "@/lib/integrations";
import { json } from "@/lib/http";

export async function POST(request: Request) {
  if (!rateLimit(`walk:${clientIp(request)}`)) {
    return json({ ok: false, message: "Too many tries. Wait a few minutes." }, 429);
  }
  const body = (await request.json().catch(() => null)) as { email?: string; name?: string; walkId?: string; marketing?: boolean } | null;
  const email = cleanEmail(body?.email);
  const walk = walks.find((item) => item.id === body?.walkId);
  if (!email || !walk) return json({ ok: false, message: "Check the email and the date." }, 400);
  if (!supabaseConfigured()) {
    return json({ ok: false, message: "The RSVP book is not connected yet. Nothing was stored." }, 503);
  }
  const saved = await insertRow(process.env.SUPABASE_WALK_TABLE || "walk_club_rsvps", {
    name: cleanName(body?.name),
    email,
    walk_id: walk.id,
    created_at: new Date().toISOString(),
  });
  if (!saved.ok) return json({ ok: false, message: "We could not store that RSVP. Try again later." }, 502);
  let listNote = "";
  if (body?.marketing) {
    const list = await captureMarketing({ email, name: cleanName(body?.name), source: "walk-rsvp" });
    if (!list.ok) listNote = " The founding list is not connected, so that box was not stored.";
  }
  return json({ ok: true, message: `RSVP noted. These dates are still drafts, so this does not confirm a meeting.${listNote}` });
}
