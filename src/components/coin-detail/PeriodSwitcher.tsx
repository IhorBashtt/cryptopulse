"use client";

type PeriodKey = "24h" | "7d" | "30d" | "1y";

interface PeriodSwitcherProps {
  value: PeriodKey;
  onChange: (value: PeriodKey) => void;
}

const periods: Array<{ label: string; value: PeriodKey }> = [
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "1y", value: "1y" },
];

export function PeriodSwitcher({ value, onChange }: PeriodSwitcherProps) {
  return (
    <div className="inline-flex rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {periods.map((period) => {
        const active = value === period.value;

        return (
          <button
            key={period.label}
            type="button"
            onClick={() => onChange(period.value)}
            className={`rounded-full px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {period.label}
          </button>
        );
      })}
    </div>
  );
}
