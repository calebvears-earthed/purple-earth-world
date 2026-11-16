"use client";

import { useEffect, useRef } from "react";
import { CampaignImage } from "@/components/CampaignImage";
import { campaign, sharedFacts } from "@/lib/catalog";

export function Hero() {
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = media.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="hero-shot" aria-label="Drop 01 at dawn">
      <div className="hero-media" ref={media}>
        <CampaignImage frame={campaign.hero} priority sizes="100vw" className="hero-photo ken" />
      </div>
      <div className="hero-scrim" />
      <div className="hero-copy">
        <p className="kicker">Dawn, Drop 01</p>
        <h1>Drop 01, at dawn.</h1>
        <p className="lede">{sharedFacts.ship}</p>
        <a className="action" href="#drop">
          Pre-order Drop 01
        </a>
      </div>
    </section>
  );
}
