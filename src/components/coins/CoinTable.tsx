"use client";

import { useMemo, useState } from "react";
import { useGetCoinsQuery } from "@/lib/redux/api/coinsApi";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { CoinRow } from "./CoinRow";
import { SearchBar } from "./SearchBar";

export function CoinTable() {
  const { data, error, isLoading } = useGetCoinsQuery();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [sortBy, setSortBy] = useState<"market_cap" | "price_change_percentage_24h">("market_cap");

  const filteredCoins = useMemo(() => {
    const list = data ?? [];

    const normalizedSearch = debouncedSearch.trim().toLowerCase();
    const filtered = normalizedSearch
      ? list.filter((coin) => coin.name.toLowerCase().includes(normalizedSearch))
      : list;

    return [...filtered].sort((left, right) => {
      if (sortBy === "price_change_percentage_24h") {
        return (right.price_change_percentage_24h ?? 0) - (left.price_change_percentage_24h ?? 0);
      }

      return (right.market_cap ?? 0) - (left.market_cap ?? 0);
    });
  }, [data, debouncedSearch, sortBy]);

  if (isLoading) {
    return <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">Loading coins…</div>;
  }

  if (error) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">Failed to load coins. Please try again shortly.</div>;
  }

  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Top crypto market data</h2>
          <p className="text-sm text-zinc-500">Tracked from CoinGecko public API.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <SearchBar value={search} onChange={setSearch} />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "market_cap" | "price_change_percentage_24h")}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <option value="market_cap">Sort by market cap</option>
            <option value="price_change_percentage_24h">Sort by 24h change</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3">Coin</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">24h</th>
              <th className="hidden px-4 py-3 md:table-cell">Market cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <CoinRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
