import { awardVolts, cleanEmail, clientIp, insertRow, rateLimit, selectRows, supabaseConfigured } from "@/lib/integrations";
import { json } from "@/lib/http";

function monthKey() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Adelaide", year: "numeric", month: "2-digit" }).format(new Date());
}

export async function POST(request: Request) {
  if (!rateLimit(`barefoot:${clientIp(request)}`)) {
    return json({ ok: false, message: "Too many tries. Wait a few minutes." }, 429);
  }
  const body = (await request.json().catch(() => null)) as { email?: string; minutes?: number } | null;
  const email = cleanEmail(body?.email);
  const minutes = Number(body?.minutes);
  if (!email || !Number.isInteger(minutes) || minutes < 1 || minutes > 10000) {
    return json({ ok: false, message: "Check the email and the minutes." }, 400);
  }
  if (!supabaseConfigured()) {
    return json({ ok: false, message: "The log book is not connected yet. Nothing was stored." }, 503);
  }
  const month = monthKey();
  const table = process.env.SUPABASE_BAREFOOT_TABLE || "barefoot_logs";
  const existing = await selectRows(table, `email=eq.${encodeURIComponent(email)}&month=eq.${encodeURIComponent(month)}&select=id`);
  if (existing.ok && existing.rows.length) {
    return json({ ok: true, message: "This month is already logged. One award a month." });
  }
  const saved = await insertRow(table, { email, minutes, month, created_at: new Date().toISOString() });
  if (!saved.ok) return json({ ok: false, message: "We could not store that log." }, 502);
  const points = await awardVolts({ email, points: 100, note: "Barefoot minutes, one month" });
  if (points.ok) return json({ ok: true, message: "Minutes logged. 100 Volts were sent to the loyalty app." });
  return json({ ok: true, message: "Minutes logged. Volts are not being issued yet." });
}
