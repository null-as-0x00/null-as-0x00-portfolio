import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | null-as-0x00",
  description: "Articles and technical notes.",
};

const mockPosts = [
  {
    slug: "sample-post",
    title: "Sample Post",
    summary: "ブログ記事詳細ページの雛形です。",
    publishedAt: "2026-01-01",
  },
];

export default function BlogPage() {
  return (
    <>
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          記事・技術メモの一覧ページです。microCMS との連携前にレイアウトを検証するための雛形です。
        </p>
      </header>

      <section aria-label="Blog posts list" className="space-y-4">
        {mockPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              {post.publishedAt}
            </p>
            <h2 className="mt-1 text-base font-semibold tracking-tight">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {post.summary}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

