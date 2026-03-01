import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { getBlogList, type BlogPost } from "@/lib/microcms-client";
import {
  Card,
  SectionHeader,
  EmptyState,
  ErrorMessage,
} from "@/components/ui/index";

export const metadata: Metadata = {
  title: "Blog",
  description: "技術記事や学習メモ、日々の開発で得た知見を発信しています。",
};

type BlogListSectionProps = {
  posts: BlogPost[];
};

function BlogListSection({ posts }: BlogListSectionProps) {
  if (!posts.length) {
    return (
      <EmptyState message="まだ公開中の Blog 記事はありません。記事を追加すると、ここに一覧表示されます。" />
    );
  }

  return (
    <section aria-label="Blog posts list" className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} variant="hoverable" as="article">
          {post.thumbnail ? (
            <div className="w-full overflow-hidden rounded-lg bg-color-border/50 sm:w-40">
              <Image
                src={post.thumbnail.url}
                alt={post.title}
                width={post.thumbnail.width}
                height={post.thumbnail.height}
                sizes="(min-width: 640px) 160px, 100vw"
                className="h-auto w-full object-contain transition-transform group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-br from-color-border/30 to-color-border/60 text-xs text-color-muted sm:w-40">
              No thumbnail
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-base font-semibold tracking-tight text-brand-primary">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline focus-ring rounded"
              >
                {post.title}
              </Link>
            </h2>
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
        </Card>
      ))}
    </section>
  );
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let isError = false;

  try {
    const { contents } = await getBlogList();
    posts = contents;
  } catch (error) {
    console.error(
      "[BlogPage] Failed to fetch blog posts from microCMS:",
      error,
    );
    isError = true;
  }

  return (
    <>
      <header className="mb-8 space-y-2">
        <SectionHeader
          as="h1"
          title="Blog"
          description="技術記事や学習メモの一覧ページです。microCMS と連携した実データを表示します。"
        />
        {isError && (
          <ErrorMessage message="Blog 記事の取得中にエラーが発生しました。時間をおいて再度お試しください。" />
        )}
      </header>

      <BlogListSection posts={posts} />
    </>
  );
}
