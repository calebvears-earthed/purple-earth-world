"use client";

import { useState } from "react";
import Link from "next/link";
import { CampaignImage } from "@/components/CampaignImage";
import { PreorderForm } from "@/components/PreorderForm";
import { aud, getProduct, sharedFacts, type Product } from "@/lib/catalog";

export function ProductStage({
  product,
  checkoutLive,
  registrationOpen = true,
}: {
  product: Product;
  checkoutLive: boolean;
  registrationOpen?: boolean;
}) {
  const [colourId, setColourId] = useState(product.colourways[0]?.id ?? "");
  const colour = product.colourways.find((item) => item.id === colourId) ?? product.colourways[0];
  const frames = colour?.images ?? [];

  return (
    <div className="product-stage">
      <div className="gallery">
        {frames.length ? (
          frames.map((frame, index) => (
            <div className="gallery-frame" key={frame.src}>
              <CampaignImage frame={frame} sizes="(min-width: 900px) 54vw, 100vw" priority={index === 0} />
            </div>
          ))
        ) : (
          <div className="gallery-frame gallery-empty">
            <p>Photograph to come for {colour?.name}.</p>
          </div>
        )}
      </div>
      <aside className="buy">
        <p className="kicker">Drop 01 pre-order</p>
        <h1>{product.name}</h1>
        <p className="price">Pre-order {aud(product.priceAud)}</p>
        <p>{product.cloth}</p>
        <div className="swatches" role="radiogroup" aria-label="Colour">
          {product.colourways.map((item) => (
            <button
              key={item.id}
              type="button"
              className="swatch"
              aria-checked={item.id === colour?.id}
              role="radio"
              onClick={() => setColourId(item.id)}
            >
              <span style={{ background: item.swatch }} />
              {item.name}
            </button>
          ))}
        </div>
        <p className="meta">{sharedFacts.ship}</p>
        <PreorderForm
          handle={product.handle}
          name={product.name}
          checkoutLive={checkoutLive}
          registrationOpen={registrationOpen}
          colour={colour?.id}
          price={aud(product.priceAud)}
        />
        <details className="size-guide">
          <summary>Size guide</summary>
          <p>{product.fit} Made in {sharedFacts.origin}.</p>
        </details>
        <p className="meta">{sharedFacts.preorder}</p>
        <p className="links">
          {product.pairsWith.map((handle) => {
            const pair = getProduct(handle);
            return pair ? <Link key={handle} href={`/shop/${handle}`}>{pair.name}</Link> : null;
          })}
        </p>
      </aside>
    </div>
  );
}
