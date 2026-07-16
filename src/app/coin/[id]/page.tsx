import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoinDetailClient } from "@/components/coin-detail/CoinDetailClient";
import { StatsGrid } from "@/components/coin-detail/StatsGrid";
import type { CoinDetail } from "@/lib/types/coingecko";

interface CoinPageProps {
  params: Promise<{ id: string }>;
}

export default async function CoinPage({ params }: CoinPageProps) {
  const { id } = await params;

  const coinResponse = await fetch(`http://localhost:3000/api/coins/${id}`, {
    next: { revalidate: 60 },
  });

  if (!coinResponse.ok) {
    notFound();
  }

  const coinData = (await coinResponse.json()) as CoinDetail;

  return (
    <main className="flex flex-1 flex-col bg-zinc-50 px-4 py-8 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Link href="/" className="text-sm font-medium text-cyan-600 hover:underline">
          ← Back to overview
        </Link>

        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {coinData.image?.large ? (
                <Image
                  src={coinData.image.large}
                  alt={coinData.name}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              )}
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-600">
                  {coinData.symbol?.toUpperCase()}
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {coinData.name}
                </h1>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {coinData.market_data?.current_price?.usd != null
                ? `$${coinData.market_data.current_price.usd.toLocaleString()}`
                : "Price unavailable"}
            </div>
          </div>
        </section>

        <StatsGrid coin={coinData} />
        <CoinDetailClient coin={coinData} coinId={id} />
      </div>
    </main>
  );
}
