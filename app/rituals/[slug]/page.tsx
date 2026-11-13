import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRitual, rituals } from "@/lib/catalog";

export function generateStaticParams() {
  return rituals.map((ritual) => ({ slug: ritual.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ritual = getRitual(slug);
  return { title: ritual?.title || "Journal", description: ritual?.standfirst };
}

export default async function RitualPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ritual = getRitual(slug);
  if (!ritual) notFound();
  return (
    <article className="reading">
      <div className="section">
        <p className="kicker">{ritual.kicker}</p>
        <h1>{ritual.title}</h1>
        <p className="lede">{ritual.standfirst}</p>
        <div className="prose">
          {ritual.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p><Link href="/rituals">All notes</Link></p>
        </div>
      </div>
    </article>
  );
}
