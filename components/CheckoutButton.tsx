"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export function CheckoutButton() {
  const { lines, clear } = useCart();
  const [status, setStatus] = useState("The amount charged is the Shopify price. These draft figures may differ.");
  const [pending, setPending] = useState(false);

  if (!lines.length) return null;

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lines }),
        });
        const body = (await response.json()) as { message?: string; checkoutUrl?: string };
        if (body.checkoutUrl) {
          clear();
          window.location.href = body.checkoutUrl;
          return;
        }
        setStatus(body.message || "Checkout is not available.");
        setPending(false);
      }}
    >
      <button className="action" type="submit" disabled={pending}>
        {pending ? "Opening checkout" : "Checkout"}
      </button>
      <p className="note" role="status">
        {status}
      </p>
    </form>
  );
}
