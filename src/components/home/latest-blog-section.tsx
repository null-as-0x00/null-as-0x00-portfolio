"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";

import type { BlogPost } from "@/lib/microcms-client";
import { SectionHeader, EmptyState, ErrorMessage } from "@/components/ui/index";

type LatestBlogSectionProps = {
  posts: BlogPost[];
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

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <m.article variants={itemVariants} whileHover="hover" className="group">
      <m.div
        variants={cardHoverVariants}
        className="flex flex-col gap-4 rounded-xl border border-color-border bg-background p-4 transition-colors hover:border-color-border-hover sm:flex-row"
      >
        {post.thumbnail ? (
          <div className="relative h-24 w-full overflow-hidden rounded-lg bg-color-border/50 sm:w-40">
            <Image
              width={320}
              height={180}
              src={post.thumbnail.url}
              alt={post.title}
              fill
              sizes="(min-width: 640px) 160px, 100vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-br from-color-border/30 to-color-border/60 text-xs text-color-muted sm:w-40">
            No thumbnail
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-base font-semibold tracking-tight text-brand-primary">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline focus-ring rounded"
            >
              {post.title}
            </Link>
          </h3>
          {post.excerpt && (
            <p className="mt-1 text-sm text-color-muted">{post.excerpt}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-color-muted">
            {post.category && <span>{post.category}</span>}
            {post.publishedAt && (
              <span>
                Published{" "}
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                </time>
              </span>
            )}
          </div>
        </div>
      </m.div>
    </m.article>
  );
}

export function LatestBlogSection({ posts, error }: LatestBlogSectionProps) {
  return (
    <m.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={containerVariants}
      className="space-y-6"
    >
      <SectionHeader
        title="Latest Blog"
        description="最新の技術記事・学習メモ"
        action={
          <Link
            href="/blog"
            className="text-sm font-medium text-color-muted hover:text-brand-primary focus-ring rounded"
          >
            View all →
          </Link>
        }
      />

      {error ? (
        <ErrorMessage
          message="Blog 記事の取得中にエラーが発生しました。"
          className="rounded-xl border border-dashed border-red-200 bg-red-50 p-4 text-sm dark:border-red-800 dark:bg-red-900/20"
        />
      ) : posts.length === 0 ? (
        <EmptyState message="まだ公開中の Blog 記事はありません。" />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </m.section>
  );
}
