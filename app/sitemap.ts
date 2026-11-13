import type { MetadataRoute } from "next";
import { products, rituals, siteUrl } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/shop",
    "/rituals",
    "/earthed-safely",
    "/club",
    "/club/check-in",
    "/account",
    "/story",
    "/waitlist",
    "/cart",
    "/terms",
    "/privacy",
    "/club-terms",
    "/shipping-returns",
    "/claims-policy",
    ...products.map((product) => `/shop/${product.handle}`),
    ...rituals.map((ritual) => `/rituals/${ritual.slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }));
}
