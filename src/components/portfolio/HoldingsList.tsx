"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useGetCoinsQuery } from "@/lib/redux/api/coinsApi";
import { removeHolding, updateHolding, type Holding } from "@/lib/redux/slices/portfolioSlice";
import type { AppDispatch } from "@/lib/redux/store";

interface HoldingsListProps {
  holdings: Holding[];
}

export function HoldingsList({ holdings }: HoldingsListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: coins = [] } = useGetCoinsQuery();

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Your holdings</h2>
          <p className="text-sm text-zinc-500">Edit amounts or remove positions anytime.</p>
        </div>
      </div>

      <div className="space-y-3">
        {holdings.map((holding) => {
          const coinData = coins.find((coin) => coin.id === holding.coinId);
          const currentPrice = coinData?.current_price ?? 0;
          const value = (currentPrice ?? 0) * holding.amount;

          return (
            <div key={holding.id} className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                {holding.coinImage ? (
                  <Image src={holding.coinImage} alt={holding.coinName} width={32} height={32} className="rounded-full" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                )}
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{holding.coinName}</p>
                  <p className="text-sm text-zinc-500">{holding.coinSymbol.toUpperCase()}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:items-end">
                <label className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                  Amount
                  <input
                    type="number"
                    min="0"
                    step="0.0001"
                    value={holding.amount}
                    onChange={(event) => {
                      const nextAmount = Number(event.target.value);
                      dispatch(updateHolding({ id: holding.id, amount: Number.isFinite(nextAmount) ? nextAmount : 0 }));
                    }}
                    className="w-24 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-800 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </label>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Price: {currentPrice != null ? `$${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "—"}
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Value: ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(removeHolding(holding.id))}
                  className="text-sm font-medium text-rose-600 hover:text-rose-700"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
