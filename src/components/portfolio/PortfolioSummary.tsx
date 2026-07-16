"use client";

import { useGetCoinsQuery } from "@/lib/redux/api/coinsApi";
import type { Holding } from "@/lib/redux/slices/portfolioSlice";

interface PortfolioSummaryProps {
  holdings: Holding[];
}

export function PortfolioSummary({ holdings }: PortfolioSummaryProps) {
  const { data: coins = [] } = useGetCoinsQuery();

  const totalValue = holdings.reduce((sum, holding) => {
    const coin = coins.find((item) => item.id === holding.coinId);
    const price = coin?.current_price ?? 0;
    return sum + price * holding.amount;
  }, 0);

  const pnl24h = holdings.reduce((sum, holding) => {
    const coin = coins.find((item) => item.id === holding.coinId);
    const price = coin?.current_price ?? 0;
    const change = coin?.price_change_percentage_24h ?? 0;
    return sum + price * holding.amount * (change / 100);
  }, 0);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Portfolio summary</h2>
        <p className="text-sm text-zinc-500">Simple overview of your current holdings.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">Total value</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">24h P&amp;L</p>
          <p className={`mt-2 text-2xl font-semibold ${pnl24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {pnl24h === 0
              ? "$0"
              : `${pnl24h > 0 ? "+" : "-"}$${Math.abs(pnl24h).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          </p>
        </div>
      </div>
    </div>
  );
}
