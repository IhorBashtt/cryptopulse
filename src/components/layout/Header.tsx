import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          CryptoPulse
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Link href="/" className="hover:text-cyan-600">
              Home
            </Link>
            <Link href="/portfolio" className="hover:text-cyan-600">
              Portfolio
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
