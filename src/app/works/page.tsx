import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Works | null-as-0x00",
  description: "Selected works and projects.",
};

const mockWorks = [
  {
    slug: "sample-work",
    title: "Sample Work",
    summary: "ポートフォリオ用のワーク詳細ページの雛形です。",
  },
];

export default function WorksPage() {
  return (
    <>
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Works</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          制作物・プロジェクトの一覧ページです。microCMS 連携前の雛形として利用できます。
        </p>
      </header>

      <section aria-label="Works list" className="space-y-4">
        {mockWorks.map((work) => (
          <article
            key={work.slug}
            className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <h2 className="text-base font-semibold tracking-tight">
              <Link
                href={`/works/${work.slug}`}
                className="hover:underline"
              >
                {work.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {work.summary}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

