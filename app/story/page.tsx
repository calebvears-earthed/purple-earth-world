import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Story",
  description: "Caleb and Jasmin. A high voltage electrician in Adelaide, and a clothing label made slowly.",
};

export default function StoryPage() {
  return (
    <section className="section">
      <p className="kicker">Story</p>
      <h1>Caleb and Jasmin.</h1>
      <div className="prose">
        <p>Purple Earth started between a brother and a sister.</p>
        <p>Caleb is a high voltage electrician in Adelaide. He works with earthing every day: the protective path that carries a fault current to earth. The work is ordinary, and it is strict.</p>
        <p>Jasmin builds the label with him. Her daughter is Skyla. The family is the reason the work slowed down enough to become clothes.</p>
        <p>The clothes are clothes. Drop 01 is seven pieces, made to order over fourteen days, numbered as the orders come in. A later accessory, if it comes, will be described as an electrical object on the guide. It will not be described as a treatment.</p>
        <p className="pull">I spend my days making sure high voltage finds its way safely to earth. Purple Earth is the slower version of that, for people.</p>
        <p className="byline">Caleb. Adelaide.</p>
      </div>
      <Link className="action" href="/shop">Shop Drop 01</Link>
    </section>
  );
}
