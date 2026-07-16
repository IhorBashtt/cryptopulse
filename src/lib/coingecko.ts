import type { CoinChartData, CoinDetail, CoinMarketData } from "@/lib/types/coingecko";

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  const apiKey = process.env.COINGECKO_API_KEY;

  if (apiKey) {
    headers["x-cg-demo-api-key"] = apiKey;
  }

  return headers;
}

export async function getTopCoins(): Promise<CoinMarketData[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "100",
    page: "1",
    sparkline: "true",
    price_change_percentage: "24h",
  });

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`,
    {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`CoinGecko request failed with ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as CoinMarketData[];
}

export async function getCoinDetail(id: string): Promise<CoinDetail> {
  const params = new URLSearchParams({
    localization: "false",
    tickers: "false",
    market_data: "true",
    community_data: "false",
    developer_data: "false",
    sparkline: "false",
  });

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?${params.toString()}`,
    {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`CoinGecko request failed with ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as CoinDetail;
}

export async function getCoinChart(id: string, days: number): Promise<CoinChartData> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    days: days.toString(),
  });

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?${params.toString()}`,
    {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`CoinGecko request failed with ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as CoinChartData;
}
