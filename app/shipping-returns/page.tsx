import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Shipping and returns", description: "Draft notes on dispatch, the pre-order window, and Australian Consumer Law rights." };

export default function ShippingPage() {
  return (
    <article className="reading">
      <div className="section">
        <p className="kicker">Legal. Draft</p>
        <h1>Shipping and returns.</h1>
        <div className="prose">
          <p>Drop 01 is made after the 14 day window, to the count of orders, with a small buffer. It is not sitting on a shelf. A dispatch time will be published before you pay. It is not published here, because it is not confirmed.</p>
          <p>Pieces are made in China. Delivery places are the places Shopify is set to accept. They are not set on this preview, so this page does not promise a country list or a price for postage.</p>
          <p>You have rights under the Australian Consumer Law that cannot be excluded, whether or not a shop policy says otherwise. If a piece is faulty, not as described, or not of acceptable quality, contact us and we will repair, replace or refund as that law requires.</p>
          <p>Change of mind is different. A rule for change of mind will be published before the drop opens. Until then, do not treat this page as a promise that a change of mind return will be accepted. The sizes are standard labels. They are not cut to a person&apos;s measurements.</p>
          <p>The address for a return will be the address published at checkout. There is no returns address on this preview.</p>
          <p>Read the <Link href="/claims-policy">claims policy</Link> beside this note.</p>
        </div>
      </div>
    </article>
  );
}
