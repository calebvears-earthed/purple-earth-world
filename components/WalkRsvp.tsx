"use client";

import { useState } from "react";
import { walks, formatWalkWhen } from "@/lib/catalog";

export function WalkRsvp() {
  const [status, setStatus] = useState("Draft dates. An RSVP is stored only when the database is connected.");
  const [pending, setPending] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setPending(true);
        const response = await fetch("/api/walk-club", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            walkId: data.get("walkId"),
            marketing: data.get("marketing") === "on",
          }),
        });
        const body = (await response.json()) as { message?: string };
        setStatus(body.message || "Try again in a moment.");
        setPending(false);
        if (response.ok) form.reset();
      }}
    >
      <label className="field">
        <span>Name</span>
        <input name="name" autoComplete="name" required maxLength={80} />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required maxLength={200} />
      </label>
      <label className="field">
        <span>Date</span>
        <select name="walkId" required defaultValue={walks[0]?.id}>
          {walks.map((walk) => (
            <option key={walk.id} value={walk.id}>
              {formatWalkWhen(walk.iso)}, {walk.place}
            </option>
          ))}
        </select>
      </label>
      <label className="check">
        <input name="marketing" type="checkbox" />
        <span>Also add me to the founding list.</span>
      </label>
      <button className="action" type="submit" disabled={pending}>
        {pending ? "Sending" : "Send RSVP"}
      </button>
      <p className="note" role="status">
        {status}
      </p>
    </form>
  );
}
