export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white/80 py-6 text-sm text-zinc-500 backdrop-blur dark:border-zinc-800 dark:bg-black/80 dark:text-zinc-400">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="order-2 sm:order-1">
          &copy; {new Date().getFullYear()} null-as-0x00. All rights reserved.
        </p>
        <p className="order-1 text-xs uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 sm:order-2">
          Portfolio
        </p>
      </div>
    </footer>
  );
}

