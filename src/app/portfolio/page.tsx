"use client";

import { useSelector } from "react-redux";
import { HoldingForm } from "@/components/portfolio/HoldingForm";
import { HoldingsList } from "@/components/portfolio/HoldingsList";
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import type { RootState } from "@/lib/redux/store";

export default function PortfolioPage() {
  const holdings = useSelector((state: RootState) => state.portfolio.holdings);

  return (
    <main className="flex flex-1 flex-col bg-zinc-50 px-4 py-8 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-cyan-600">Portfolio</p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Track your crypto positions.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Add holdings, track their value, and keep a simple overview of your portfolio performance.
          </p>
        </section>

        <PortfolioSummary holdings={holdings} />
        <HoldingForm />

        {holdings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
            No holdings yet. Add your first coin to start tracking the portfolio.
          </div>
        ) : (
          <HoldingsList holdings={holdings} />
        )}
      </div>
    </main>
  );
}
