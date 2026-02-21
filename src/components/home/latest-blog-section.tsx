"use client";

import Image from "next/image";
import Link from "next/link";
import { m, type Variants } from "framer-motion";

import type { BlogPost } from "@/lib/microcms-client";
import { SectionHeader, EmptyState, ErrorMessage } from "@/components/ui/index";

type LatestBlogSectionProps = {
  posts: BlogPost[];
  error: boolean;
};

const containerVariants: Variants = {
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
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const cardHoverVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <m.article variants={itemVariants} whileHover="hover" className="group">
      <m.div
        variants={cardHoverVariants}
        className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 sm:flex-row"
      >
        {post.thumbnail ? (
          <div className="relative h-24 w-full overflow-hidden rounded-lg bg-zinc-100 sm:w-40">
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
          <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs text-zinc-500 dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-400 sm:w-40">
            No thumbnail
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-base font-semibold tracking-tight">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline focus-ring rounded"
            >
              {post.title}
            </Link>
          </h3>
          {post.excerpt && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {post.excerpt}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
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
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 focus-ring rounded"
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
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Large card - spans 2 columns */}
          {posts[0] && (
            <m.article
              className="md:col-span-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
            >
              <BlogCard post={posts[0]} />
            </m.article>
          )}

          {/* Small cards - right column */}
          <div className="space-y-6 md:col-span-1">
            {posts[1] && (
              <m.article
                className="relative z-10"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.5,
                  ease: [0.42, 0, 0.58, 1],
                }}
                whileHover={{ scale: 1.05, zIndex: 20 }}
              >
                <BlogCard post={posts[1]} />
              </m.article>
            )}
            {posts[2] && (
              <m.article
                className="relative z-10"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: [0.42, 0, 0.58, 1],
                }}
                whileHover={{ scale: 1.05, zIndex: 20 }}
              >
                <BlogCard post={posts[2]} />
              </m.article>
            )}
          </div>

          {/* Standard card - bottom row */}
          {posts[3] && (
            <m.article
              className="relative z-10 md:col-span-3"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: [0.42, 0, 0.58, 1],
              }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
            >
              <BlogCard post={posts[3]} />
            </m.article>
          )}
        </div>
      )}
    </m.section>
  );
}
