"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useGetCoinChartQuery } from "@/lib/redux/api/coinsApi";
import type { CoinDetail } from "@/lib/types/coingecko";
import { PeriodSwitcher } from "./PeriodSwitcher";

const PriceChart = dynamic(
  () => import("./PriceChart").then((module) => module.PriceChart),
  {
    ssr: false,
    loading: () => <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">Loading chart…</div>,
  },
);

interface CoinDetailClientProps {
  coin: CoinDetail;
  coinId: string;
}

type PeriodKey = "24h" | "7d" | "30d" | "1y";

function getDaysForPeriod(period: PeriodKey) {
  switch (period) {
    case "24h":
      return 1;
    case "30d":
      return 30;
    case "1y":
      return 365;
    case "7d":
    default:
      return 7;
  }
}

export function CoinDetailClient({ coin, coinId }: CoinDetailClientProps) {
  const [period, setPeriod] = useState<PeriodKey>("7d");
  const days = getDaysForPeriod(period);
  const { data, isLoading, isError } = useGetCoinChartQuery({ id: coinId, days });

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {coin.name} price history
          </h2>
          <p className="text-sm text-zinc-500">Track recent price movement.</p>
        </div>
        <PeriodSwitcher value={period} onChange={setPeriod} />
      </div>
      <PriceChart data={data} isLoading={isLoading} isError={isError} />
    </section>
  );
}
