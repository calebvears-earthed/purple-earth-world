import { walks } from "@/lib/catalog";
import { awardVolts, cleanEmail, clientIp, insertRow, rateLimit, selectRows, supabaseConfigured } from "@/lib/integrations";
import { json } from "@/lib/http";

export async function POST(request: Request) {
  if (!rateLimit(`checkin:${clientIp(request)}`, 6)) {
    return json({ ok: false, message: "Too many tries. Wait a few minutes." }, 429);
  }
  const body = (await request.json().catch(() => null)) as { email?: string; token?: string; walkId?: string } | null;
  const expected = process.env.WALK_CLUB_CHECKIN_TOKEN;
  if (!expected || body?.token !== expected) {
    return json({ ok: false, message: "This check-in code is not valid." }, 401);
  }
  const email = cleanEmail(body?.email);
  const walk = walks.find((item) => item.id === body?.walkId);
  if (!email || !walk) return json({ ok: false, message: "Check the email and the meeting." }, 400);
  if (!supabaseConfigured()) {
    return json({ ok: false, message: "The check-in book is not connected yet. Nothing was stored." }, 503);
  }
  const table = process.env.SUPABASE_CHECKIN_TABLE || "walk_club_checkins";
  const existing = await selectRows(table, `email=eq.${encodeURIComponent(email)}&walk_id=eq.${encodeURIComponent(walk.id)}&select=id`);
  if (existing.ok && existing.rows.length) {
    return json({ ok: true, message: "This meeting is already checked in." });
  }
  const saved = await insertRow(table, { email, walk_id: walk.id, created_at: new Date().toISOString() });
  if (!saved.ok) return json({ ok: false, message: "We could not store that check-in." }, 502);
  const points = await awardVolts({ email, points: 50, note: "Walk Club check-in" });
  if (points.ok) return json({ ok: true, message: "Check-in noted. 50 Volts were sent to the loyalty app." });
  return json({ ok: true, message: "Check-in noted. Volts are not being issued yet." });
}
