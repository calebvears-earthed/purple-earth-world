import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { shopifyConfigured } from "@/lib/integrations";

export const metadata: Metadata = {
  title: "Bag",
  description: "Your Drop 01 pre-order bag. Checkout hands off to Shopify when the store is connected.",
};

export default function CartPage() {
  return (
    <section className="section">
      <p className="kicker">Bag</p>
      <h1>Pre-order.</h1>
      <div className="prose">
        <p>The bag is kept in this browser. {shopifyConfigured() ? "Pay only through Shopify checkout." : "Checkout is on hold until the shop is connected. No payment is taken here."} A number is given when an order exists, not here.</p>
      </div>
      <CartView checkoutLive={shopifyConfigured()} />
    </section>
  );
}
