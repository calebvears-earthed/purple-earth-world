"use client";

import { useState } from "react";

export function WaitlistForm({
  source = "founding-list",
  compact = false,
  button = "Join the list",
  consent = "Add me to the Purple Earth list. I can unsubscribe at any time.",
  open = true,
}: {
  source?: string;
  compact?: boolean;
  button?: string;
  consent?: string;
  open?: boolean;
}) {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  if (!open) {
    return (
      <p className="note" role="status">
        The list is on hold. It opens when the list is connected. Nothing is stored from this page.
      </p>
    );
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        if (String(data.get("company") || "")) return;
        setPending(true);
        setStatus("");
        try {
          const response = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              email: data.get("email"),
              name: data.get("name"),
              source,
              consent: data.get("consent") === "on",
            }),
          });
          const body = (await response.json().catch(() => null)) as { message?: string } | null;
          setStatus(body?.message || "Try again in a moment.");
          if (response.ok) form.reset();
        } catch {
          setStatus("Try again in a moment.");
        } finally {
          setPending(false);
        }
      }}
    >
      <div className="honeypot" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {compact ? null : (
        <label className="field">
          <span>Name</span>
          <input name="name" autoComplete="name" maxLength={80} />
        </label>
      )}
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required maxLength={200} />
      </label>
      <label className="check">
        <input name="consent" type="checkbox" required />
        <span>{consent}</span>
      </label>
      <button className="action" type="submit" disabled={pending}>
        {pending ? "Sending" : button}
      </button>
      <p className="note" role="status">
        {status}
      </p>
    </form>
  );
}
