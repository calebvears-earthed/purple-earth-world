import type { Metadata } from "next";
import Link from "next/link";
import { ProductTile } from "@/components/ProductTile";
import { products } from "@/lib/catalog";

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
        <p>Seven pieces, one colour in this preview, made to the count of a 14 day numbered pre-order. Accessories are not in this drop.</p>
        <p>Prices are drafts. Payment is taken at Shopify checkout once the store is connected. Nothing here reserves a number.</p>
      </div>
      <div className="grid products">
        {products.map((product) => (
          <ProductTile key={product.handle} product={product} />
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
