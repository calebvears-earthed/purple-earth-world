import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductStage } from "@/components/ProductStage";
import { Reviews } from "@/components/Reviews";
import { aud, getProduct, products, sharedFacts } from "@/lib/catalog";
import { shopifyConfigured } from "@/lib/integrations";

export function generateStaticParams() {
  return products.map((product) => ({ handle: product.handle }));
}

export const dynamicParams = false;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Piece" };
  return {
    title: product.name,
    description: `${product.story} Pre-order ${aud(product.priceAud)}.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  return (
    <article className="product-page">
      <ProductStage product={product} checkoutLive={shopifyConfigured()} />
      <section className="section product-notes">
        <div>
          <h2>The piece</h2>
          <dl className="facts">
            <div><dt>Cloth</dt><dd>{product.cloth}</dd></div>
            <div><dt>Fit</dt><dd>{product.fit}</dd></div>
            <div><dt>Care</dt><dd>{sharedFacts.care}</dd></div>
            <div><dt>Made</dt><dd>{sharedFacts.origin}.</dd></div>
          </dl>
        </div>
        <Reviews handle={product.handle} />
      </section>
    </article>
  );
}
