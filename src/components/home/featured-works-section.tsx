"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";

import type { Work } from "@/lib/microcms-client";
import {
  Tag,
  SectionHeader,
  EmptyState,
  ErrorMessage,
} from "@/components/ui/index";

type FeaturedWorksSectionProps = {
  works: Work[];
  error: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <m.article variants={itemVariants} whileHover="hover" className="group">
      <m.div
        variants={cardHoverVariants}
        className="flex flex-col gap-4 rounded-xl border border-border border-color-border bg-background p-4 transition-colors hover:border-color-border-hover sm:flex-row"
      >
        {work.thumbnail ? (
          <div className="w-full overflow-hidden rounded-lg bg-color-border/50 sm:w-40">
            <Image
              src={work.thumbnail.url}
              alt={work.title}
              width={work.thumbnail.width}
              height={work.thumbnail.height}
              sizes="(min-width: 640px) 160px, 100vw"
              priority={index < 2}
              className="h-auto w-full object-contain transition-transform group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-color-border/30 to-color-border/60 text-xs text-color-muted sm:h-24 sm:w-40">
            No thumbnail
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-base font-semibold tracking-tight text-brand-primary">
            <Link
              href={`/works/${work.slug}`}
              className="hover:underline focus-ring rounded"
            >
              {work.title}
            </Link>
          </h3>
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
      </m.div>
    </m.article>
  );
}

export function FeaturedWorksSection({
  works,
  error,
}: FeaturedWorksSectionProps) {
  return (
    <m.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={containerVariants}
      className="space-y-6"
    >
      <SectionHeader
        title="Featured Works"
        description="主要なポートフォリオ"
        action={
          <Link
            href="/works"
            className="text-sm font-medium text-color-muted hover:text-brand-primary focus-ring rounded"
          >
            View all →
          </Link>
        }
      />

      {error ? (
        <ErrorMessage
          message="Works の取得中にエラーが発生しました。"
          className="rounded-xl border border-dashed border-red-200 bg-red-50 p-4 text-sm dark:border-red-800 dark:bg-red-900/20"
        />
      ) : works.length === 0 ? (
        <EmptyState message="まだ公開中の Works はありません。" />
      ) : (
        <div className="space-y-4">
          {works.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>
      )}
    </m.section>
  );
}
