"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sizes, type Size } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";

export function PreorderForm({
  handle,
  name,
  checkoutLive,
}: {
  handle: string;
  name: string;
  checkoutLive: boolean;
}) {
  const { add } = useCart();
  const router = useRouter();
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState(
    checkoutLive
      ? "Choose a size. Pay at checkout, or register the size if you are not paying yet."
      : "Choose a size and your email. This registers the pre-order. It does not take payment.",
  );
  const [pending, setPending] = useState(false);

  function requireSize() {
    if (size) return true;
    setNote("Choose a size.");
    return false;
  }

  return (
    <div>
      <p className="kicker">Size</p>
      <div className="sizes" role="group" aria-label="Size">
        {sizes.map((option) => (
          <button key={option} type="button" className="size" aria-pressed={size === option} onClick={() => setSize(option)}>
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
      {checkoutLive ? (
        <button
          className="action"
          type="button"
          onClick={() => {
            if (!requireSize() || !size) return;
            add({ handle, size, qty });
            router.push("/cart");
          }}
        >
          Pay pre-order
        </button>
      ) : null}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!requireSize() || !size) return;
          const form = event.currentTarget;
          const data = new FormData(form);
          if (String(data.get("company") || "")) return;
          setPending(true);
          const response = await fetch("/api/preorder", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              email: data.get("email"),
              name: data.get("name"),
              handle,
              size,
              qty,
              consent: data.get("consent") === "on",
            }),
          });
          const body = (await response.json()) as { message?: string };
          setNote(body.message || "Try again in a moment.");
          setPending(false);
          if (response.ok) form.reset();
        }}
      >
        <div className="honeypot" aria-hidden="true">
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="field">
          <span>Name</span>
          <input name="name" autoComplete="name" maxLength={80} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
        <label className="check">
          <input name="consent" type="checkbox" required />
          <span>Register this pre-order and send me Drop 01 notes. I can unsubscribe.</span>
        </label>
        <button className={checkoutLive ? "action quiet" : "action"} type="submit" disabled={pending}>
          {pending ? "Sending" : "Register pre-order"}
        </button>
      </form>
      <p className="note" role="status">
        {note}
      </p>
    </div>
  );
}
