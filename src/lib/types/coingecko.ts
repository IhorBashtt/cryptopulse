export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  total_volume: number | null;
  price_change_percentage_24h: number | null;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image?: {
    large?: string;
    small?: string;
    thumb?: string;
  };
  market_data?: {
    current_price?: { usd?: number | null };
    market_cap?: { usd?: number | null };
    total_volume?: { usd?: number | null };
    price_change_percentage_24h?: number | null;
    ath?: { usd?: number | null };
    ath_date?: { usd?: string | null };
    atl?: { usd?: number | null };
    atl_date?: { usd?: string | null };
    market_cap_rank?: number | null;
  };
}

export interface CoinChartData {
  prices: [number, number][];
}
