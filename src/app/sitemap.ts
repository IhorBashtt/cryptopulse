import type { MetadataRoute } from "next";
import { getTopCoins } from "@/lib/coingecko";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/portfolio"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  try {
    const coins = await getTopCoins();
    const coinRoutes = coins.map((coin) => ({
      url: `${siteUrl}/coin/${coin.id}`,
      lastModified: new Date(),
    }));

    return [...staticRoutes, ...coinRoutes];
  } catch {
    return staticRoutes;
  }
}
