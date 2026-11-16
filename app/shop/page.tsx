import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products, sharedFacts } from "@/lib/catalog";
import { registrationOpen, shopifyConfigured } from "@/lib/integrations";

export const metadata: Metadata = {
  title: "Drop 01",
  description: "Seven pieces of ritual wear. A 14 day numbered pre-order. Draft prices in Australian dollars.",
};

export default function ShopPage() {
  return (
    <section className="section">
      <p className="kicker">Shop</p>
      <h1>Drop 01.</h1>
      <div className="prose">
        <p>Seven pieces. The photographed colour leads each card. {sharedFacts.ship}</p>
        <p>
          {registrationOpen()
            ? "Register a size on the piece. That holds your place on the list and does not take payment."
            : "Registration is on hold until the list is connected. Nothing is stored from a piece page."}{" "}
          {shopifyConfigured()
            ? "Payment is open at checkout."
            : "Payment is on hold until checkout is connected."}
        </p>
      </div>
        <div className="edit-grid shop-grid">
        {products.map((product, index) => (
          <ProductCard key={product.handle} product={product} large={index === 0} priority={index < 2} />
        ))}
      </div>
      <div className="prose" style={{ marginTop: "4rem" }}>
        <h2>Accessories, later.</h2>
        <p>A mat with a lead to the earth pin of a socket may come later. It would be an electrical object, described on the guide, and it is not for sale.</p>
        <p><Link href="/earthed-safely">Read the electrician&apos;s guide</Link></p>
      </div>
    </section>
  );
}
