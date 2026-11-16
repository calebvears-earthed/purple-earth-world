import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms", description: "Draft terms for the Purple Earth website and Drop 01." };

export default function TermsPage() {
  return (
    <article className="reading">
      <div className="section">
        <p className="kicker">Legal. Draft</p>
        <h1>Terms.</h1>
        <div className="prose">
          <p>These terms are a draft for review. They are not the final contract. The price and the conditions that apply to an order are the ones shown at Shopify checkout, once that store is connected.</p>
          <p>The seller is intended to be Purple Earth Pty Ltd, of Adelaide, South Australia, once that company is registered. Until then, the legal name of the seller is the name shown at checkout. An ABN will be published on registration. None is printed here, because none is being claimed.</p>
          <p>Putting a piece in the bag on this website does not form a contract and does not reserve a number. A contract is formed when checkout accepts payment.</p>
          <p>Drop 01 is a 14 day numbered pre-order. Pieces are made to the count of that window. Dispatch time will be stated before you pay. It is not stated here, because it is not confirmed.</p>
          <p>Figures on this preview are drafts in Australian dollars. They are not an offer. The checkout total is the amount charged, including any GST the checkout adds or includes.</p>
          <p>Nothing in these terms excludes the consumer guarantees in the Australian Consumer Law. Read the <Link href="/shipping-returns">shipping and returns</Link> note and the <Link href="/claims-policy">claims policy</Link>.</p>
          <p>The electrician&apos;s guide is general information from a licensed electrician. It is not a job, not a certificate, and not a reason to work on a switchboard yourself.</p>
          <p>The site may be paused or changed. Draft program rules for Volts sit in the <Link href="/club-terms">club terms</Link> and are not an offer.</p>
          <p>These draft terms are to be read under the law of South Australia, Australia.</p>
        </div>
      </div>
    </article>
  );
}
