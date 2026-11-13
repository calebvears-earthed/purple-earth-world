import type { Metadata } from "next";
import Link from "next/link";
import { BarefootForm } from "@/components/BarefootForm";
import { customerAccountUrl, klaviyoConfigured, loyaltyAwardsEnabled, rivoConfigured, supabaseConfigured } from "@/lib/integrations";

export const metadata: Metadata = {
  title: "Account",
  description: "Shopify customer account, Volts, and the monthly minutes log.",
};

export const dynamic = "force-dynamic";

export default function AccountPage() {
  const account = customerAccountUrl();
  return (
    <section className="section">
      <p className="kicker">Account</p>
      <h1>Your place.</h1>
      <div className="prose">
        <p>Orders and sign in live with Shopify customer accounts. Volts live with the loyalty app. This page does not invent a balance.</p>
      </div>
      <div className="status">
        <div>
          <p className="kicker">Sign in</p>
          {account ? <p><a href={account}>Open the Shopify account</a></p> : <p>Shopify is not connected, so sign in is not open.</p>}
        </div>
        <div>
          <p className="kicker">Volts</p>
          <p>{rivoConfigured() ? "Rivo is connected. A balance appears after you are signed in through Shopify." : "No balance yet. The loyalty app is not connected."}</p>
          <p>{loyaltyAwardsEnabled() ? "Custom awards are switched on." : "Custom awards are switched off, so a check-in will not mint points by itself."}</p>
        </div>
        <div>
          <p className="kicker">List and logs</p>
          <p>{supabaseConfigured() ? "The database is connected." : "The database is not connected."} {klaviyoConfigured() ? "The email list is connected." : "The email list is not connected."}</p>
        </div>
        <div>
          <p className="kicker">Collection</p>
          <p>Pieces you have ordered will list here once customer accounts are connected. The bag in this browser is separate. <Link href="/cart">Open the bag</Link></p>
        </div>
      </div>
      <div style={{ marginTop: "8vh" }}>
        <h2>Barefoot minutes</h2>
        <div className="prose">
          <p>Log the minutes you spent barefoot this month. One completed log can earn 100 Volts, once a month, when awards are on. The number is your own record. It is not a measure of health.</p>
        </div>
        <BarefootForm />
      </div>
    </section>
  );
}
