"use client";

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetCoinsQuery } from "@/lib/redux/api/coinsApi";
import { addHolding } from "@/lib/redux/slices/portfolioSlice";
import type { AppDispatch } from "@/lib/redux/store";
import type { CoinMarketData } from "@/lib/types/coingecko";

export function HoldingForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: coins = [] } = useGetCoinsQuery();
  const [query, setQuery] = useState("");
  const [selectedCoinId, setSelectedCoinId] = useState("");
  const [amount, setAmount] = useState("1");

  const filteredCoins = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return coins.slice(0, 10);
    }

    return coins.filter((coin) => coin.name.toLowerCase().includes(normalized));
  }, [coins, query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedCoinId) {
      return;
    }

    const selectedCoin = coins.find((coin) => coin.id === selectedCoinId);

    if (!selectedCoin) {
      return;
    }

    const parsedAmount = Number(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    dispatch(
      addHolding({
        coinId: selectedCoin.id,
        coinName: selectedCoin.name,
        coinSymbol: selectedCoin.symbol,
        coinImage: selectedCoin.image,
        amount: parsedAmount,
      }),
    );

    setQuery("");
    setSelectedCoinId("");
    setAmount("1");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Add holding</h2>
        <p className="text-sm text-zinc-500">Choose a coin and add a quantity to your portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr_auto]">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Coin</label>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedCoinId("");
            }}
            placeholder="Search coin"
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          {query && filteredCoins.length > 0 ? (
            <div className="mt-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              {filteredCoins.map((coin) => (
                <button
                  key={coin.id}
                  type="button"
                  onClick={() => {
                    setSelectedCoinId(coin.id);
                    setQuery(coin.name);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <img src={coin.image} alt={coin.name} className="h-5 w-5 rounded-full" />
                  <span>{coin.name}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Amount</label>
          <input
            type="number"
            min="0.0001"
            step="0.0001"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        <button
          type="submit"
          className="self-end rounded-2xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          Add
        </button>
      </div>
    </form>
  );
}
