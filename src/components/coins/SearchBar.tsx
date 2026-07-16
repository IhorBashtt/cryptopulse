"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
      <span className="text-base">🔎</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name"
        className="w-full bg-transparent outline-none"
      />
    </label>
  );
}
