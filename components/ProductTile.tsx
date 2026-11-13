import Link from "next/link";
import { aud, type Product } from "@/lib/catalog";
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
      <Logo variant="wordmark" width={160} />
      <h3>{product.name}</h3>
      <p className="price">{aud(product.priceAud)} draft</p>
    </Link>
  );
}
