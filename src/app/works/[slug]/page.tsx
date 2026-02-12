import type { Metadata } from "next";

type WorkDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata(
  { params }: WorkDetailPageProps,
): Metadata {
  const { slug } = params;

  return {
    title: `${slug} | Works | null-as-0x00`,
  };
}

export default function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = params;

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Work Detail
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {slug}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ここに microCMS などから取得した制作物の詳細情報を表示します。
        </p>
      </header>

      <section className="prose prose-zinc max-w-none dark:prose-invert">
        <p>
          このページは Dynamic Route (`/works/[slug]`) 用の雛形です。今後、ビジュアル、
          技術スタック、役割、リンクなどのセクションを追加して拡張できます。
        </p>
      </section>
    </article>
  );
}

