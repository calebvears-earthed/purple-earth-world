import Link from "next/link";
import { aud, sharedFacts, type Product } from "@/lib/catalog";
import { Logo } from "@/components/Logo";

export function ProductTile({ product }: { product: Product }) {
  return (
    <Link className="tile" href={`/shop/${product.handle}`}>
      {product.image ? (
        <img
          className="photo"
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
        />
      ) : (
        <div className="empty">
          <span>Photograph to come</span>
        </div>
      )}
      <Logo variant="wordmark-reverse" width={140} className="wordmark" />
      <h3>{product.name}</h3>
      <p className="price">Pre-order {aud(product.priceAud)}</p>
      <p className="meta">{sharedFacts.ship}</p>
    </Link>
  );
}
