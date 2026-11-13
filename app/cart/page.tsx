import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

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
        <p>The bag is kept in this browser. Checkout, tax and payment happen on Shopify. A number is assigned there, when the order exists. It is not assigned here.</p>
      </div>
      <CartView />
    </section>
  );
}
