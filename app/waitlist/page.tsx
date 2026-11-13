import type { Metadata } from "next";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Founding list",
  description: "The founding list for Drop 01. Two hundred places, once the list is connected.",
};

export default function WaitlistPage() {
  return (
    <section className="section">
      <p className="kicker">Founding 200</p>
      <h1>The first list.</h1>
      <div className="prose">
        <p>Two hundred places. No purchase. A note when Drop 01 opens, and nothing else promised.</p>
        <p>The live count will show when the database is connected. This preview does not pretend to know how many places are left.</p>
      </div>
      <WaitlistForm />
    </section>
  );
}
