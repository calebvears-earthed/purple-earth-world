import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Club terms", description: "Draft rules for Volts, tiers, expiry and the Walk Club." };

export default function ClubTermsPage() {
  return (
    <article className="reading">
      <div className="section">
        <p className="kicker">Legal. Draft</p>
        <h1>Club terms.</h1>
        <div className="prose">
          <p>These rules are a draft. They are not an offer, and no Volt exists, until the loyalty app is connected and this page is marked final. The <Link href="/club">club page</Link> describes the same draft.</p>
          <p>The points name is Volts. At the Lavender tier, 1 Volt is earned for each A$1 spent. Orchid begins at A$300 spent in a rolling 12 months, and earns 1.25 Volts for each A$1. Aubergine begins at A$800 spent in a rolling 12 months, and earns 1.5 Volts for each A$1. Aubergine also means early access to a drop, free shipping, and a members&apos; Walk Club breakfast, once those perks are actually running.</p>
          <p>Other draft earns: 50 Volts for creating an account, 100 on a birthday held by the loyalty app, 100 for a review with a photograph, 250 for a referral when the friend&apos;s first order ships, 50 for a Walk Club check-in, 100 for one completed barefoot minutes log in a month, and 50 for a photograph that is approved. A referred friend receives A$15 off a first order of A$100 or more.</p>
          <p>100 Volts is A$5 off, redeemed in the loyalty app at checkout. Volts are not cash, and they are not transferred for cash. They expire after 12 months with no activity. That expiry will be reminded by email when the email tool is connected.</p>
          <p>A Walk Club check-in is one per person per meeting, from the QR at the meeting. An RSVP does not earn Volts. The minutes log is self reported, once a month. We may decline a log that is not a genuine record of that month. We may correct a points error.</p>
          <p>The program can change. A change will be written on this page before it applies to new earns. Volts already earned are not a promise of a particular future drop.</p>
          <p>These rules do not limit rights under the Australian Consumer Law for the goods themselves.</p>
        </div>
      </div>
    </article>
  );
}
