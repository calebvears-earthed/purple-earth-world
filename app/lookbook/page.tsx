import type { Metadata } from "next";
import Link from "next/link";
import { CampaignImage } from "@/components/CampaignImage";
import { Reveal } from "@/components/Reveal";
import { aud, getProduct, type Frame } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Dawn, Drop 01. A short campaign from the salt lake to the dunes.",
};

const wide = (file: string, alt: string): Frame => ({ src: `/campaign/${file}`, alt, width: 1280, height: 720 });
const portrait = (file: string, alt: string): Frame => ({ src: `/campaign/${file}`, alt, width: 864, height: 1152 });

export default function LookbookPage() {
  const hoodie = getProduct("ground-hoodie");
  const crew = getProduct("dusk-mock-neck-crew");

  return (
    <article className="lookbook">
      <section className="lb-full">
        <CampaignImage frame={wide("hero-01.jpg", "Dawn on the salt lake, Drop 01.")} sizes="100vw" priority />
        <p className="lb-caption">Dawn, Drop 01</p>
      </section>

      <Reveal>
        <section className="lb-full lb-portrait">
          <CampaignImage frame={portrait("lookbook-aubergine-01.jpg", "The aubergine mock neck, the deep piece in the drop.")} sizes="(min-width: 800px) 70vw, 100vw" />
          <p className="lb-caption">The deep piece. Aubergine mock neck.</p>
        </section>
      </Reveal>

      <Reveal>
        <section className="lb-full lb-portrait">
          <CampaignImage frame={portrait("detail-hoodie-fleece-01.jpg", "Fleece at the pocket of the dusk mauve hoodie.")} sizes="(min-width: 800px) 70vw, 100vw" />
          <p className="lb-caption">Fleece, 350 gsm.</p>
        </section>
      </Reveal>

      <section className="lb-full">
        <CampaignImage frame={wide("hero-02.jpg", "A walk on the dunes in the lilac tank and charcoal short.")} sizes="100vw" />
        <p className="lb-caption">Dunes.</p>
      </section>

      <div className="lb-pair">
        <figure>
          <div className="lb-portrait">
            <CampaignImage frame={portrait("ritual-crop-tank-lilac-01.jpg", "Lilac crop tank and charcoal short.")} sizes="(min-width: 800px) 46vw, 100vw" />
          </div>
          <figcaption>Lilac tank</figcaption>
        </figure>
        <figure>
          <div className="lb-portrait">
            <CampaignImage frame={portrait("training-01.jpg", "Training frame in lilac and charcoal.")} sizes="(min-width: 800px) 46vw, 100vw" />
          </div>
          <figcaption>Training</figcaption>
        </figure>
      </div>

      <div className="lb-pair">
        <figure>
          <div className="lb-portrait">
            <CampaignImage frame={portrait("dusk-boxy-tee-bone-01.jpg", "Bone boxy tee.")} sizes="(min-width: 800px) 46vw, 100vw" />
          </div>
          <figcaption>Bone tee</figcaption>
        </figure>
        <figure>
          <div className="lb-portrait">
            <CampaignImage frame={portrait("mineral-barrel-pant-taupe-01.jpg", "Taupe barrel pant.")} sizes="(min-width: 800px) 46vw, 100vw" />
          </div>
          <figcaption>Taupe barrel</figcaption>
        </figure>
      </div>

      <div className="lb-pair">
        <figure>
          <div className="lb-portrait">
            <CampaignImage frame={portrait("detail-barrel-pant-01.jpg", "Detail of the barrel pant.")} sizes="(min-width: 800px) 46vw, 100vw" />
          </div>
          <figcaption>Mineral wash</figcaption>
        </figure>
        <figure>
          <div className="lb-portrait">
            <CampaignImage frame={portrait("detail-lilac-tank-01.jpg", "Detail of the lilac tank.")} sizes="(min-width: 800px) 46vw, 100vw" />
          </div>
          <figcaption>Lilac, close</figcaption>
        </figure>
      </div>

      <Reveal>
        <section className="lb-full lb-portrait">
          <CampaignImage frame={portrait("mist-grey-fleece-set-01.jpg", "Mist grey hoodie and jogger worn as a set.")} sizes="(min-width: 800px) 70vw, 100vw" />
          <p className="lb-caption">Mist grey, worn as a set.</p>
        </section>
      </Reveal>

      <section className="lb-full">
        <div className="lb-portrait">
          <CampaignImage frame={portrait("movement-walk-01.jpg", "Closing walk in the mist grey fleece.")} sizes="(min-width: 800px) 80vw, 100vw" />
        </div>
        <p className="lb-caption">The long walk.</p>
      </section>

      <div className="lb-pair lb-close">
        <figure>
          <Link href="/shop/ground-hoodie">
            <div className="lb-portrait">
              <CampaignImage frame={portrait("ground-hoodie-dusk-mauve-01.jpg", "Dusk mauve Ground Hoodie.")} sizes="(min-width: 800px) 46vw, 100vw" />
            </div>
            <figcaption>
              {hoodie?.name}
              <span>{hoodie ? aud(hoodie.priceAud) : ""}</span>
            </figcaption>
          </Link>
        </figure>
        <figure>
          <Link href="/shop/dusk-mock-neck-crew">
            <div className="lb-portrait">
              <CampaignImage frame={portrait("dusk-mock-neck-crew-aubergine-01.jpg", "Aubergine Dusk Mock-Neck Crew.")} sizes="(min-width: 800px) 46vw, 100vw" />
            </div>
            <figcaption>
              {crew?.name}
              <span>{crew ? aud(crew.priceAud) : ""}</span>
            </figcaption>
          </Link>
        </figure>
      </div>
    </article>
  );
}
