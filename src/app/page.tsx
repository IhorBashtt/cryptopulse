import { CoinTable } from "@/components/coins/CoinTable";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50 px-4 py-8 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-cyan-600">
            CryptoPulse
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Track the market at a glance.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Explore live crypto market data, search assets, and compare 24-hour movement in one place.
          </p>
        </section>

        <CoinTable />
      </div>
    </main>
  );
}
