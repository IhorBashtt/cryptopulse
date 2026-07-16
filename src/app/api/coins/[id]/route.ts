import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const searchParams = new URLSearchParams({
    localization: "false",
    tickers: "false",
    market_data: "true",
    community_data: "false",
    developer_data: "false",
    sparkline: "false",
  });

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  const apiKey = process.env.COINGECKO_API_KEY;

  if (apiKey) {
    headers["x-cg-demo-api-key"] = apiKey;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?${searchParams.toString()}`,
      {
        headers,
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `CoinGecko request failed with ${response.status} ${response.statusText}`,
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: `Failed to fetch coin details: ${message}`,
      },
      { status: 502 },
    );
  }
}
