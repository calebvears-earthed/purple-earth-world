"use client";

import { useState } from "react";

export function CheckInForm({ token, walkId }: { token: string; walkId: string }) {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  if (!token) {
    return <p>The check-in code is not published yet. Points are not awarded from this page until it is.</p>;
  }
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setPending(true);
        const response = await fetch("/api/walk-club/check-in", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: data.get("email"), token, walkId }),
        });
        const body = (await response.json()) as { message?: string };
        setStatus(body.message || "Try again in a moment.");
        setPending(false);
      }}
    >
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required maxLength={200} />
      </label>
      <button className="action" type="submit" disabled={pending}>
        {pending ? "Sending" : "Check in"}
      </button>
      <p className="note" role="status">
        {status}
      </p>
    </form>
  );
}
