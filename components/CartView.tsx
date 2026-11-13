"use client";

import Link from "next/link";
import { aud, getProduct } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";
import { CheckoutButton } from "@/components/CheckoutButton";

export function CartView() {
  const { lines, ready, setQty, remove } = useCart();
  if (!ready) return <p>Opening your bag.</p>;
  if (!lines.length) {
    return (
      <p className="prose">
        Your bag is empty. <Link href="/shop">See Drop 01.</Link>
      </p>
    );
  }
  const total = lines.reduce((sum, line) => sum + (getProduct(line.handle)?.priceAud || 0) * line.qty, 0);
  return (
    <div>
      {lines.map((line) => {
        const product = getProduct(line.handle);
        if (!product) return null;
        return (
          <div className="cart-line" key={`${line.handle}-${line.size}`}>
            <div>
              <Link href={`/shop/${product.handle}`}>{product.name}</Link>
              <div className="num">Size {line.size}</div>
            </div>
            <div className="qty">
              <button type="button" aria-label={`Fewer ${product.name}`} onClick={() => setQty(line.handle, line.size, line.qty - 1)}>
                −
              </button>
              <span>{line.qty}</span>
              <button type="button" aria-label={`More ${product.name}`} onClick={() => setQty(line.handle, line.size, line.qty + 1)}>
                +
              </button>
            </div>
            <p className="price">{aud(product.priceAud * line.qty)} draft</p>
            <button className="remove" type="button" onClick={() => remove(line.handle, line.size)}>
              Remove
            </button>
          </div>
        );
      })}
      <p className="price">Draft total {aud(total)}</p>
      <CheckoutButton />
    </div>
  );
}
