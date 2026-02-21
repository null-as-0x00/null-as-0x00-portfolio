"use client";

import Image from "next/image";
import Link from "next/link";
import { m, type Variants } from "framer-motion";

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

const itemVariants: Variants = {
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

const cardHoverVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

function WorkCard({
  work,
  index,
  position,
}: {
  work: Work;
  index: number;
  position: "main" | "sub1" | "sub2" | "standard";
}) {
  return (
    <m.article
      variants={itemVariants}
      whileHover="hover"
      className={`group ${position === "main" ? "relative z-20 w-full transform-gpu lg:w-3/4" : position === "sub1" ? "absolute right-0 top-0 z-10 w-full transform-gpu lg:w-2/3" : position === "sub2" ? "relative z-10 w-full transform-gpu lg:w-4/5" : "relative z-10 w-full transform-gpu"}`}
    >
      <m.div
        initial={
          position === "sub1"
            ? { opacity: 0, x: 20 }
            : position === "sub2"
              ? { opacity: 0, y: 20 }
              : undefined
        }
        whileInView={
          position === "sub1" || position === "sub2"
            ? { opacity: 1, x: 0, y: 0 }
            : undefined
        }
        transition={
          position === "sub1"
            ? { delay: 0.2, ease: [0.34, 1.56, 0.64, 1] as const }
            : position === "sub2"
              ? { delay: 0.4, ease: [0.34, 1.56, 0.64, 1] as const }
              : undefined
        }
        variants={cardHoverVariants}
        className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 sm:flex-row"
      >
        {work.thumbnail ? (
          <div className="relative h-32 w-full overflow-hidden rounded-lg bg-zinc-100 sm:h-24 sm:w-40">
            <Image
              width={320}
              height={180}
              src={work.thumbnail.url}
              alt={work.title}
              fill
              sizes="(min-width: 640px) 160px, 100vw"
              priority={index < 2}
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs text-zinc-500 dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-400 sm:h-24 sm:w-40">
            No thumbnail
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-base font-semibold tracking-tight">
            <Link
              href={`/works/${work.slug}`}
              className="hover:underline focus-ring rounded"
            >
              {work.title}
            </Link>
          </h3>
          {work.summary && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {work.summary}
            </p>
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
        description="主要な制作物・プロジェクト"
        action={
          <Link
            href="/works"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 focus-ring rounded"
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
        <div className="relative space-y-8">
          {works.map((work, index) => {
            const position =
              index === 0
                ? "main"
                : index === 1
                  ? "sub1"
                  : index === 2
                    ? "sub2"
                    : "standard";
            return (
              <WorkCard
                key={work.id}
                work={work}
                index={index}
                position={position}
              />
            );
          })}
        </div>
      )}
    </m.section>
  );
}
