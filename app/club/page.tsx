import type { Metadata } from "next";
import Link from "next/link";
import { WalkRsvp } from "@/components/WalkRsvp";
import { earnRules, formatWalkWhen, tiers, walks } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Club",
  description: "Volts, the three tiers, and the Walk Club. A draft program, not an offer, until the loyalty app is connected.",
};

export default function ClubPage() {
  return (
    <>
      <section className="section">
        <p className="kicker">Club</p>
        <h1>Volts.</h1>
        <div className="prose">
          <p>Volts are the points. 100 Volts is A$5 off. They expire after 12 months with no activity. The program is a draft. It is not open, and it is not an offer, until the loyalty app is connected and the club terms are final.</p>
          <p>Purchase points, reviews and referrals are meant to be issued by the loyalty app. A Walk Club check-in and the monthly minutes log are written here, then sent to that app only when awards are switched on.</p>
        </div>
        <div className="grid products">
          {tiers.map((tier) => (
            <article className="tier" key={tier.name}>
              <div>
                <h2>{tier.name}</h2>
                <p>{tier.threshold}</p>
              </div>
              <p>{tier.rate}. {tier.perk}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section mineral">
        <p className="kicker">Earn</p>
        <h2>How a Volt is made.</h2>
        <table className="sheet">
          <thead>
            <tr><th>Action</th><th>Volts</th></tr>
          </thead>
          <tbody>
            {earnRules.map((rule) => (
              <tr key={rule.action}>
                <td>{rule.action}</td>
                <td className="num">{rule.volts}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="prose" style={{ marginTop: "2rem" }}>
          <p>A friend who is referred receives A$15 off a first order of A$100 or more. The 250 Volts are issued when that first order ships.</p>
          <p>Barefoot minutes are a self logged count, capped at one award a month. The log is a record for the club. It is not a measure of health.</p>
          <p><Link href="/club-terms">Club terms</Link></p>
        </div>
      </section>
      <section className="section midnight">
        <p className="kicker">Walk Club</p>
        <h2>Next dates, in draft.</h2>
        <ul className="list">
          {walks.map((walk) => (
            <li key={walk.id}>
              <strong>{formatWalkWhen(walk.iso)}</strong>
              <span>{walk.place}. {walk.note}</span>
            </li>
          ))}
        </ul>
        <div className="prose">
          <p>An RSVP does not award Volts. Points for a walk come from the QR code at the meeting, once that code is published.</p>
        </div>
        <WalkRsvp />
      </section>
    </>
  );
}
