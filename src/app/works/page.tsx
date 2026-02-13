import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { getWorksList, type Work } from "@/lib/microcms-client";

export const metadata: Metadata = {
  title: "Works | null-as-0x00",
  description: "Selected works and projects.",
};

function WorksEmptyState() {
  return (
    <p className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
      まだ公開中の Works はありません。新しい制作物を追加すると、ここに一覧表示されます。
    </p>
  );
}

type WorksListSectionProps = {
  works: Work[];
};

function WorksListSection({ works }: WorksListSectionProps) {
  if (!works.length) {
    return <WorksEmptyState />;
  }

  return (
    <section aria-label="Works list" className="space-y-4">
      {works.map((work) => (
        <article
          key={work.id}
          className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 sm:flex-row"
        >
          {work.thumbnail ? (
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-zinc-100 sm:h-24 sm:w-40">
              <Image
                src={work.thumbnail.url}
                alt={work.title}
                fill
                sizes="(min-width: 640px) 160px, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs text-zinc-500 dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-400 sm:h-24 sm:w-40">
              No thumbnail
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-base font-semibold tracking-tight">
              <Link
                href={`/works/${work.slug}`}
                className="hover:underline"
              >
                {work.title}
              </Link>
            </h2>
            {work.summary && (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {work.summary}
              </p>
            )}
            {work.techStack && work.techStack.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {work.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

export default async function WorksPage() {
  let works: Work[] = [];
  let isError = false;

  try {
    const { contents } = await getWorksList();
    works = contents;
  } catch (error) {
    console.error("[WorksPage] Failed to fetch works list from microCMS:", error);
    isError = true;
  }

  return (
    <>
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Works</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          制作物・プロジェクトの一覧ページです。microCMS と連携した実データを表示します。
        </p>
        {isError && (
          <p className="text-xs text-red-600 dark:text-red-400">
            Works の取得中にエラーが発生しました。時間をおいて再度お試しください。
          </p>
        )}
      </header>

      <WorksListSection works={works} />
    </>
  );
}

