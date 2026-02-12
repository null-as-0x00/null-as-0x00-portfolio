import type { Metadata } from "next";

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata(
  { params }: BlogDetailPageProps,
): Metadata {
  const { slug } = params;

  return {
    title: `${slug} | Blog | null-as-0x00`,
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Blog Post
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {slug}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ここに microCMS から取得した記事の本文やメタ情報を表示します。
        </p>
      </header>

      <section className="prose prose-zinc max-w-none dark:prose-invert">
        <p>
          このページは Dynamic Route (`/blog/[slug]`) 用の雛形です。目次やコードブロック、
          関連記事などの UI を今後拡張しやすいよう、シンプルな構造にしています。
        </p>
      </section>
    </article>
  );
}

