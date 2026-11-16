import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { CampaignImage } from "@/components/CampaignImage";
import { campaign, products } from "@/lib/catalog";
import { registrationOpen, shopifyConfigured } from "@/lib/integrations";

export default function HomePage() {
  const ordered = [
    "dusk-mock-neck-crew",
    "ground-hoodie",
    "mineral-barrel-pant",
    "ground-jogger",
    "dusk-boxy-tee",
    "ritual-crop-tank",
    "earth-biker-short",
  ]
    .map((handle) => products.find((product) => product.handle === handle))
    .filter((product) => product !== undefined);
  const [lead, ...rest] = ordered;

  return (
    <>
      <Hero />

      <section className="band" aria-label="Dunes">
        <div className="band-frame">
          <CampaignImage frame={campaign.dunes} sizes="100vw" />
        </div>
        <p className="band-caption">Dunes. Lilac tank, charcoal short.</p>
      </section>

      <section className="manifesto">
        <Reveal className="manifesto-copy">
          <h2>Clothes for the quieter hours.</h2>
          <p>Drop 01 is a small capsule in lilac, mauve, bone, mist and one deep aubergine.</p>
          <p>Made to be worn at dawn, on a long walk, and for the rest of the day after. From family, in South Australia.</p>
        </Reveal>
        <Reveal className="manifesto-photo" delay={80}>
          <div className="manifesto-frame">
            <CampaignImage frame={campaign.fleece} sizes="(min-width: 900px) 42vw, 100vw" />
          </div>
        </Reveal>
      </section>

      <section className="section" id="drop">
        <Reveal>
          <p className="kicker">The drop</p>
          <h2>Seven pieces.</h2>
          <p className="muted">
            Pre-order prices in Australian dollars.{" "}
            {registrationOpen()
              ? "Register a size on the piece."
              : "Registration is on hold until the list is connected."}{" "}
            {shopifyConfigured() ? "Payment is open at checkout." : "Payment is on hold until checkout is connected."}
          </p>
        </Reveal>
        <div className="edit-grid">
          {lead ? (
            <Reveal className="edit-lead">
              <ProductCard product={lead} large priority />
            </Reveal>
          ) : null}
          {rest.map((product, index) => (
            <Reveal key={product.handle} delay={index * 70}>
              <ProductCard product={product} priority={index < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="teaser">
        <div className="teaser-head">
          <p className="kicker">Lookbook</p>
          <h2>Dawn, Drop 01.</h2>
          <Link href="/lookbook">Open the lookbook</Link>
        </div>
        <div className="teaser-row">
          {campaign.lookbook.map((frame) => (
            <Link href="/lookbook" key={frame.src} className="teaser-frame">
              <CampaignImage frame={frame} sizes="(min-width: 800px) 33vw, 80vw" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
