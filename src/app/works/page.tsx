import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { getWorksList, type Work } from "@/lib/microcms-client";
import {
  Card,
  Tag,
  SectionHeader,
  EmptyState,
  ErrorMessage,
} from "@/components/ui/index";

type WorksListSectionProps = {
  works: Work[];
};

function WorksListSection({ works }: WorksListSectionProps) {
  if (!works.length) {
    return (
      <EmptyState message="まだ公開中の Works はありません。新しい制作物を追加すると、ここに一覧表示されます。" />
    );
  }

  return (
    <section aria-label="Works list" className="space-y-4">
      {works.map((work) => (
        <Card key={work.id} variant="hoverable" as="article">
          {work.thumbnail ? (
            <div className="w-full overflow-hidden rounded-lg bg-color-border/50 sm:w-40">
              <Image
                src={work.thumbnail.url}
                alt={work.title}
                width={work.thumbnail.width}
                height={work.thumbnail.height}
                sizes="(min-width: 640px) 160px, 100vw"
                className="h-auto w-full object-contain transition-transform group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-color-border/30 to-color-border/60 text-xs text-color-muted sm:h-24 sm:w-40">
              No thumbnail
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-base font-semibold tracking-tight text-brand-primary">
              <Link
                href={`/works/${work.slug}`}
                className="hover:underline focus-ring rounded"
              >
                {work.title}
              </Link>
            </h2>
            {work.summary && (
              <p className="mt-1 text-sm text-color-muted">{work.summary}</p>
            )}
            {work.techStack && work.techStack.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5" role="list">
                {work.techStack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
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
    console.error(
      "[WorksPage] Failed to fetch works list from microCMS:",
      error,
    );
    isError = true;
  }

  return (
    <>
      <header className="mb-8 space-y-2">
        <SectionHeader
          as="h1"
          title="Works"
          description="null-as-0x00がこれまでに制作したポートフォリオの一覧です。"
        />
        {isError && (
          <ErrorMessage message="Works の取得中にエラーが発生しました。時間をおいて再度お試しください。" />
        )}
      </header>

      <WorksListSection works={works} />
    </>
  );
}
