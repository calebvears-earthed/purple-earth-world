"use client";

import { useState } from "react";

export function BarefootForm() {
  const [status, setStatus] = useState("A self logged count. One award a month, once the program is open. Not a health record.");
  const [pending, setPending] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setPending(true);
        const response = await fetch("/api/barefoot", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: data.get("email"),
            minutes: data.get("minutes"),
          }),
        });
        const body = (await response.json()) as { message?: string };
        setStatus(body.message || "Try again in a moment.");
        setPending(false);
        if (response.ok) form.reset();
      }}
    >
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required maxLength={200} />
      </label>
      <label className="field">
        <span>Minutes this month</span>
        <input name="minutes" type="number" min={1} max={10000} required inputMode="numeric" />
      </label>
      <button className="action" type="submit" disabled={pending}>
        {pending ? "Sending" : "Log minutes"}
      </button>
      <p className="note" role="status">
        {status}
      </p>
    </form>
  );
}
