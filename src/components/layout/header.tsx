import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            null-as-0x00's BLOG
          </Link>
          <ThemeToggle />
        </div>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <li>
              <Link
                href="/works"
                className="rounded-full px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Works
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="rounded-full px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
