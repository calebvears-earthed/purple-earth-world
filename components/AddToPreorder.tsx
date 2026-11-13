"use client";

import { useState } from "react";
import { sizes, type Size } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";

export function AddToPreorder({ handle, name }: { handle: string; name: string }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("Choose a size. The bag stays in this browser.");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!size) {
          setNote("Choose a size.");
          return;
        }
        add({ handle, size, qty });
        setNote(`${name}, size ${size}, is in your bag. Checkout opens when Shopify is connected.`);
      }}
    >
      <p className="kicker">Size</p>
      <div className="sizes" role="group" aria-label="Size">
        {sizes.map((option) => (
          <button
            key={option}
            type="button"
            className="size"
            aria-pressed={size === option}
            onClick={() => setSize(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="qty">
        <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Fewer">
          −
        </button>
        <span className="num" aria-live="polite">
          {qty}
        </span>
        <button type="button" onClick={() => setQty((value) => Math.min(4, value + 1))} aria-label="More">
          +
        </button>
      </div>
      <button className="action" type="submit">
        Add to pre-order
      </button>
      <p className="note" role="status">
        {note}
      </p>
    </form>
  );
}
