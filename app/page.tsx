import Link from "next/link";
import { ProductTile } from "@/components/ProductTile";
import { products, rituals, sharedFacts } from "@/lib/catalog";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="kicker">Drop 01</p>
        <h1>Pre-order the first seven.</h1>
        <p className="lede">Fourteen days. Numbered. Ritual wear from Adelaide, cut in aubergine.</p>
        <p className="ship-line">{sharedFacts.ship}</p>
        <a className="action" href="#drop">
          See the seven
        </a>
      </section>

      <section className="section" id="drop">
        <p className="kicker">The drop</p>
        <h2>Seven pieces.</h2>
        <p className="muted">Pre-order prices in Australian dollars. Register a size on each piece. Payment opens when checkout is connected.</p>
        <div className="grid products">
          {products.map((product) => (
            <ProductTile key={product.handle} product={product} />
          ))}
        </div>
      </section>

      <section className="section white">
        <p className="kicker">The idea</p>
        <p className="pull">I spend my days making sure high voltage finds its way safely to earth. Purple Earth is the slower version of that, for people.</p>
        <div className="prose">
          <p>The pieces in Drop 01 are clothes. They do not connect a person to the earth, and they are not a treatment.</p>
        </div>
        <p className="byline">Caleb. Adelaide.</p>
      </section>

      <section className="section">
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
        <p className="links">
          <Link href="/club">The club and the walks</Link>
        </p>
      </section>
    </>
  );
}