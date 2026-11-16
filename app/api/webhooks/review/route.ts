import { automationAuthorised, awardVolts, cleanEmail } from "@/lib/integrations";
import { json } from "@/lib/http";

export async function POST(request: Request) {
  if (!process.env.AUTOMATION_SECRET) return json({ ok: false, message: "Automation secret is not set." }, 501);
  if (!automationAuthorised(request)) return json({ ok: false, message: "Not authorised." }, 401);
  const body = (await request.json().catch(() => null)) as { email?: string; hasPhoto?: boolean; event?: string } | null;
  if (body?.event !== "review_published" || body.hasPhoto !== true) {
    return json({ ok: true, message: "Ignored. Points are sent only for a published review with a photograph." });
  }
  const email = cleanEmail(body.email);
  if (!email) return json({ ok: false, message: "Check the email." }, 400);
  const points = await awardVolts({ email, points: 100, note: "Review with a photograph" });
  if (!points.ok) return json({ ok: true, message: "Review noted. Volts were not issued." });
  return json({ ok: true, message: "100 Volts were sent to the loyalty app." });
}
