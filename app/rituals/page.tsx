import type { Metadata } from "next";
import Link from "next/link";
import { rituals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on the Walk Club, the work, and how a drop is counted.",
};

export default function RitualsPage() {
  return (
    <section className="section">
      <p className="kicker">Journal</p>
      <h1>Rituals.</h1>
      <p className="prose">Short notes. Habits and making. No claims about the body.</p>
      <ul className="list">
        {rituals.map((ritual) => (
          <li key={ritual.slug}>
            <Link href={`/rituals/${ritual.slug}`}>
              <p className="kicker">{ritual.kicker}</p>
              <h2>{ritual.title}</h2>
              <span>{ritual.standfirst}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
