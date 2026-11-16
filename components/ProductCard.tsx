import Link from "next/link";
import { CampaignImage } from "@/components/CampaignImage";
import { aud, type Product } from "@/lib/catalog";

export function ProductCard({
  product,
  large = false,
  priority = false,
}: {
  product: Product;
  large?: boolean;
  priority?: boolean;
}) {
  const colour = product.colourways.find((item) => item.images.length > 0) ?? product.colourways[0];
  const main = colour?.images[0];
  const hover = colour?.images[1];
  const sizes = large ? "(min-width: 900px) 58vw, 100vw" : "(min-width: 1100px) 32vw, (min-width: 700px) 48vw, 100vw";

  return (
    <Link className={`card ${large ? "card-large" : ""}`} href={`/shop/${product.handle}`}>
      <div className="card-frame">
        {main ? (
          <CampaignImage frame={main} sizes={sizes} priority={priority} className="card-base" />
        ) : (
          <div className="card-empty">Photograph to come</div>
        )}
        {hover ? <CampaignImage frame={hover} sizes={sizes} className="card-alt" /> : null}
      </div>
      <div className="card-caption">
        <h3>{product.name}</h3>
        <p className="price">Pre-order {aud(product.priceAud)}</p>
        <p className="dots" aria-label="Colourways">
          {product.colourways.map((item) => (
            <span key={item.id} style={{ background: item.swatch }} title={item.name} />
          ))}
        </p>
        <p className="meta">{colour?.name}</p>
      </div>
    </Link>
  );
}
