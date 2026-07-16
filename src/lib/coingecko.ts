import type { CoinMarketData } from "@/lib/types/coingecko";

export async function getTopCoins(): Promise<CoinMarketData[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "100",
    page: "1",
    sparkline: "true",
    price_change_percentage: "24h",
  });

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  const apiKey = process.env.COINGECKO_API_KEY;

  if (apiKey) {
    headers["x-cg-demo-api-key"] = apiKey;
  }

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`,
    {
      headers,
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`CoinGecko request failed with ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as CoinMarketData[];
}
