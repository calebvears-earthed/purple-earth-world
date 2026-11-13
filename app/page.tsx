import Link from "next/link";
import { ProductTile } from "@/components/ProductTile";
import { formatWalkWhen, products, rituals, tiers, walks } from "@/lib/catalog";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Made to be worn slowly.</h1>
        <p className="lede">Seven pieces. Fourteen days. A numbered pre-order from Adelaide.</p>
        <Link className="action" href="/shop">
          Shop Drop 01
        </Link>
      </section>

      <section className="section mineral">
        <p className="kicker">The idea</p>
        <p className="pull">I spend my days making sure high voltage finds its way safely to earth. Purple Earth is the slower version of that, for people.</p>
        <div className="prose">
          <p>The pieces in Drop 01 are clothes. They do not connect a person to the earth, and they are not a treatment.</p>
        </div>
        <p className="byline">Caleb. Adelaide.</p>
      </section>

      <section className="section midnight">
        <p className="kicker">Drop 01</p>
        <h2>The capsule.</h2>
        <p className="prose">Fourteen days. Numbered. Made to the count. One colour in this preview: aubergine.</p>
        <div className="grid products">
          {products.map((product) => (
            <ProductTile key={product.handle} product={product} />
          ))}
        </div>
      </section>

      <section className="section mineral">
        <p className="kicker">The club</p>
        <h2>Volts.</h2>
        <p className="prose">One Volt for each dollar at the base rate. 100 Volts is A$5 off, once the program is open. This is a draft, not an offer.</p>
        <div className="grid products">
          {tiers.map((tier) => (
            <article className="tier" key={tier.name}>
              <div>
                <h3>{tier.name}</h3>
                <p>{tier.threshold}</p>
              </div>
              <p>{tier.rate}. {tier.perk}</p>
            </article>
          ))}
        </div>
        <p className="links">
          <Link href="/club">How Volts are earned</Link>
        </p>
      </section>

      <section className="section midnight">
        <p className="kicker">Walk Club</p>
        <h2>Adelaide Hills.</h2>
        <p className="prose">Three draft dates. Nothing is confirmed until it is published. Shoes off only where the path is even and known.</p>
        <ul className="list">
          {walks.map((walk) => (
            <li key={walk.id}>
              <strong>{formatWalkWhen(walk.iso)}</strong>
              <span>{walk.place}. {walk.note}</span>
            </li>
          ))}
        </ul>
        <p className="links">
          <Link href="/club">RSVP on the club page</Link>
        </p>
      </section>

      <section className="section aged">
        <p className="kicker">Journal</p>
        <h2>Three notes.</h2>
        <ul className="list">
          {rituals.map((ritual) => (
            <li key={ritual.slug}>
              <Link href={`/rituals/${ritual.slug}`}>
                <h3>{ritual.title}</h3>
                <span>{ritual.standfirst}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
