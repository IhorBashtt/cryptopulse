import type { CoinDetail } from "@/lib/types/coingecko";

interface StatsGridProps {
  coin: CoinDetail;
}

function formatCurrency(value?: number | null) {
  if (value == null) {
    return "—";
  }

  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function formatDate(value?: string | null) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function StatsGrid({ coin }: StatsGridProps) {
  const marketData = coin.market_data;

  const stats = [
    {
      label: "Price",
      value: formatCurrency(marketData?.current_price?.usd),
    },
    {
      label: "Market Cap",
      value: formatCurrency(marketData?.market_cap?.usd),
    },
    {
      label: "24h Volume",
      value: formatCurrency(marketData?.total_volume?.usd),
    },
    {
      label: "ATH",
      value: `${formatCurrency(marketData?.ath?.usd)}${marketData?.ath_date?.usd ? ` • ${formatDate(marketData.ath_date.usd)}` : ""}`,
    },
    {
      label: "ATL",
      value: `${formatCurrency(marketData?.atl?.usd)}${marketData?.atl_date?.usd ? ` • ${formatDate(marketData.atl_date.usd)}` : ""}`,
    },
    {
      label: "Market Cap Rank",
      value: marketData?.market_cap_rank != null ? `#${marketData.market_cap_rank}` : "—",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
          <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
