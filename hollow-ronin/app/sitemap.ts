import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hollowronin.com";

const STATIC_ROUTES = [
  "",
  "/shop",
  "/shop/shirts",
  "/shop/hoodies",
  "/shop/masked-hoodies",
  "/shop/hats",
  "/shop/beanies",
  "/shop/socks",
  "/shop/scarfs",
  "/lookbook",
  "/about",
  "/drops",
  "/account",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url:        `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:   path === "" ? 1.0 : path.startsWith("/shop") ? 0.9 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url:        `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority:   0.8,
  }));

  return [...staticEntries, ...productEntries];
}
