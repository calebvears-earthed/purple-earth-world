import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToPreorder } from "@/components/AddToPreorder";
import { Reviews } from "@/components/Reviews";
import { aud, getProduct, products, sharedFacts } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ handle: product.handle }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Piece" };
  return {
    title: product.name,
    description: `${product.story} Draft price ${aud(product.priceAud)}.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();
  const pairs = product.pairsWith.map((item) => getProduct(item)).filter((item) => item !== undefined);

  return (
    <article className="section">
      <div className="split">
        <div>
          {product.image ? (
            <img
              className="product-photo"
              src={product.image.src}
              alt={product.image.alt}
              width={product.image.width}
              height={product.image.height}
            />
          ) : (
            <div className="product-empty">
              <p className="kicker">Photograph to come</p>
            </div>
          )}
        </div>
        <div>
          <p className="kicker">Drop 01. Pre-order</p>
          <h1>{product.name}</h1>
          <p className="price">{aud(product.priceAud)} draft</p>
          <p>{product.story}</p>
          <p>{sharedFacts.preorder}</p>
          <AddToPreorder handle={product.handle} name={product.name} />
          <p>Earn {product.priceAud} Volts at the base rate, once the program is open. Draft.</p>
          <h2>With the set</h2>
          <ul className="links">
            {pairs.map((pair) => (
              <li key={pair.handle}>
                <Link href={`/shop/${pair.handle}`}>{pair.name}</Link>
              </li>
            ))}
            <li><Link href="/shop">The rest of Drop 01</Link></li>
          </ul>
        </div>
      </div>
      <div className="split" style={{ marginTop: "8vh" }}>
        <div>
          <h2>The piece</h2>
          <dl className="facts">
            <div><dt>Colour</dt><dd>{sharedFacts.colour}. Further colours are not confirmed, so they are not listed.</dd></div>
            <div><dt>Fit</dt><dd>{product.fit}</dd></div>
            <div><dt>Cloth</dt><dd>{sharedFacts.cloth}</dd></div>
            <div><dt>Care</dt><dd>{sharedFacts.care}</dd></div>
            <div><dt>Made</dt><dd>{sharedFacts.origin}.</dd></div>
            <div><dt>Sizes</dt><dd>XS, S, M, L, XL. Labels only, until the maker confirms a measured guide.</dd></div>
          </dl>
        </div>
        <Reviews handle={product.handle} />
      </div>
    </article>
  );
}
