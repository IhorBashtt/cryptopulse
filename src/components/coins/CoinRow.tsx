import Image from "next/image";
import Link from "next/link";
import type { CoinMarketData } from "@/lib/types/coingecko";

interface CoinRowProps {
  coin: CoinMarketData;
}

export function CoinRow({ coin }: CoinRowProps) {
  const priceChange = coin.price_change_percentage_24h ?? 0;

  return (
    <tr className="border-b border-zinc-100 text-sm dark:border-zinc-800">
      <td className="px-4 py-4">
        <Link href={`/coin/${coin.id}`} className="flex items-center gap-3 hover:opacity-80">
          {coin.image ? (
            <Image
              src={coin.image}
              alt={coin.name}
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          )}
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">{coin.name}</p>
            <p className="text-xs uppercase text-zinc-500">{coin.symbol}</p>
          </div>
        </Link>
      </td>
      <td className="px-4 py-4 text-zinc-700 dark:text-zinc-300">
        {coin.current_price != null ? `$${coin.current_price.toLocaleString()}` : "—"}
      </td>
      <td className="px-4 py-4">
        <span
          className={`font-medium ${priceChange >= 0 ? "text-emerald-600" : "text-rose-600"}`}
        >
          {priceChange >= 0 ? "+" : ""}
          {priceChange.toFixed(2)}%
        </span>
      </td>
      <td className="hidden px-4 py-4 text-zinc-600 dark:text-zinc-400 md:table-cell">
        {coin.market_cap != null ? `$${coin.market_cap.toLocaleString()}` : "—"}
      </td>
    </tr>
  );
}
