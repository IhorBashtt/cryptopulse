"use client";

import { useMemo } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import type { CoinChartData } from "@/lib/types/coingecko";

interface PriceChartProps {
  data: CoinChartData | undefined;
  isLoading: boolean;
  isError: boolean;
}

function formatPrice(value: number) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function formatTime(value: number) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function PriceChart({ data, isLoading, isError }: PriceChartProps) {
  if (isLoading) {
    return <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">Loading chart…</div>;
  }

  if (isError || !data?.prices?.length) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">Unable to load chart data.</div>;
  }

  const chartData = useMemo(() => {
    return data.prices.map(([timestamp, price]) => ({
      time: timestamp,
      price,
    }));
  }, [data.prices]);

  return (
    <div className="h-80 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" opacity={0.4} />
          <XAxis
            dataKey="time"
            tickFormatter={(value) => formatTime(Number(value))}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => formatPrice(Number(value))}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
          />
          <Tooltip
            labelFormatter={(value) => formatTime(Number(value))}
            formatter={(value) => (typeof value === "number" ? formatPrice(value) : value)}
            contentStyle={{
              backgroundColor: "#09090b",
              border: "1px solid #3f3f46",
              borderRadius: "12px",
              color: "#f4f4f5",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
            }}
            labelStyle={{ color: "#f4f4f5" }}
            itemStyle={{ color: "#f4f4f5" }}
          />
          <Line type="monotone" dataKey="price" stroke="#0891b2" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
