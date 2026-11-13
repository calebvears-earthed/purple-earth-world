import type { Metadata } from "next";
import { CheckInForm } from "@/components/CheckInForm";
import { walks } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Walk check-in",
  description: "Check in at a Walk Club meeting. Points are issued only when the loyalty awards switch is on.",
};

export default async function CheckInPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string; walk?: string }>;
}) {
  const query = await searchParams;
  const token = typeof query.t === "string" ? query.t : "";
  const walkId = typeof query.walk === "string" && walks.some((walk) => walk.id === query.walk) ? query.walk : walks[0]?.id || "";
  return (
    <section className="section">
      <p className="kicker">Walk Club</p>
      <h1>Check in.</h1>
      <div className="prose">
        <p>Use the code from the meeting. One check-in for each walk. This page does not describe a benefit. It records that you came.</p>
      </div>
      <CheckInForm token={token} walkId={walkId} />
    </section>
  );
}
