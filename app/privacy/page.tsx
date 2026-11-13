import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "What Purple Earth collects, and where it is stored once the tools are connected." };

export default function PrivacyPage() {
  return (
    <article className="reading">
      <div className="section">
        <p className="kicker">Legal. Draft</p>
        <h1>Privacy.</h1>
        <div className="prose">
          <p>Purple Earth is in Adelaide, South Australia. The contact mailbox on the domain is not connected yet. When it is, that address is where you write to access or correct information, or to complain to us. You can also complain to the Office of the Australian Information Commissioner.</p>
          <p>If you join the founding list, we collect your email and, if you give it, your name, plus the fact that you asked to hear about Drop 01. The box must be ticked. You can unsubscribe from marketing mail.</p>
          <p>If you RSVP to a walk, we collect your name, email and the date you chose. That RSVP is not marketing. It joins the founding list only if you tick that box as well.</p>
          <p>If you check in at a walk, or log barefoot minutes, we collect your email and the record. The minutes log is a club count. It is not a health record, and it is not used as one.</p>
          <p>When the tools are connected, the list may be stored in Supabase and sent to Klaviyo. Orders, payment and delivery are held by Shopify. We do not receive full card numbers. Points are held by the loyalty app. Reviews, if you write one, are held by Judge.me. Some of these services store data outside Australia, including in the United States. The maker of the garments is in China and receives the order details needed to make and send a piece.</p>
          <p>We use this information to run the list, the club and orders. We do not sell personal information.</p>
          <p>If a tool is not connected, the form tells you, and nothing is stored.</p>
        </div>
      </div>
    </article>
  );
}
