import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | null-as-0x00",
  description: "Articles and engineering notes.",
};

const mockPosts = [
  {
    slug: "sample-post",
    title: "Sample Blog Post",
    summary: "ポートフォリオ用のブログ記事ページの雛形です。",
  },
];

export default function BlogPage() {
  return (
    <>
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          技術記事や学習メモの一覧ページです。microCMS 連携前の雛形として利用できます。
        </p>
      </header>

      <section aria-label="Blog posts list" className="space-y-4">
        {mockPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <h2 className="text-base font-semibold tracking-tight">
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

