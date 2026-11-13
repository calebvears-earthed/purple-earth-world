import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claims policy",
  description: "What Purple Earth will and will not say about its clothes.",
};

export default function ClaimsPage() {
  return (
    <article className="reading">
      <div className="section">
        <p className="kicker">Legal. Draft</p>
        <h1>Claims.</h1>
        <div className="prose">
          <p>Purple Earth sells clothing. A garment is described by its cut, its cloth once the maker confirms it, its colour, its origin and its care. That is the whole description.</p>
          <p>We do not claim that a garment affects the body. We do not claim that a garment connects a person to the earth, or to a socket.</p>
          <p>If a later accessory is electrical, it will be described by how it is built and by the compliance marks it actually holds. A mark that is not held will not be shown. The guide already says the mat does not exist yet.</p>
          <p>We do not invent a quote, a statistic, a certificate, or a number of customers. Reviews appear only when a review tool is connected and a person has written one.</p>
          <p>Prices on this preview are drafts. A draft price is not an advertisement of a finished offer.</p>
          <p>This follows the Australian Consumer Law. A statement that is likely to mislead will be corrected on the page where it appeared.</p>
        </div>
      </div>
    </article>
  );
}
