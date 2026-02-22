import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getBlogBySlug,
  getBlogList,
  type BlogPost,
} from "@/lib/microcms-client";

type BlogDetailPageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const { contents } = await getBlogList({
    fields: "id,slug",
    limit: 100,
  });

  return contents.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `${post.title}のブログ記事ページです。`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [{ url: post.thumbnail.url }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail.url] : [],
    },
  };
}

type BlogHeaderProps = {
  post: BlogPost;
};

function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="space-y-2">
        {/* text-color-muted を適用 */}
        <p className="text-xs uppercase tracking-[0.16em] text-color-muted">
          Blog Post
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-brand-primary">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-sm text-color-muted">{post.excerpt}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-color-muted">
        {post.category && (
          /* 背景をボーダー色の透過に、テキストをブランドカラーに変更 */
          <span className="rounded-full bg-color-border/40 px-2 py-0.5 font-medium text-brand-primary">
            {post.category}
          </span>
        )}
        {post.publishedAt && (
          <span>
            Published{" "}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
            </time>
          </span>
        )}
        {post.updatedAt && (
          <span>
            Updated{" "}
            <time dateTime={post.updatedAt}>
              {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
            </time>
          </span>
        )}
      </div>
    </header>
  );
}

type BlogThumbnailProps = {
  post: BlogPost;
};

function BlogThumbnail({ post }: BlogThumbnailProps) {
  if (!post.thumbnail) {
    return null;
  }

  return (
    /* 背景色をボーダー色の透過に変更 */
    <div className="relative h-56 w-full overflow-hidden rounded-xl bg-color-border/30 sm:h-64">
      <Image
        width={768}
        height={432}
        src={post.thumbnail.url}
        alt={post.title}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

type BlogBodyProps = {
  body: string;
};

function BlogBody({ body }: BlogBodyProps) {
  return (
    <section
      aria-label="Article content"
      /* prose 内の固定色指定を削除し、変数に紐づくように調整 */
      className="prose prose-zinc max-w-none dark:prose-invert prose-headings:text-brand-primary prose-p:text-color-muted prose-a:text-brand-primary prose-a:underline prose-strong:text-brand-primary"
    >
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </section>
  );
}

export default async function BlogDetailPage({ params }: BlogDetailPageParams) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <BlogHeader post={post} />

      <div className="space-y-8">
        <BlogThumbnail post={post} />

        <BlogBody body={post.body} />
      </div>
    </article>
  );
}
