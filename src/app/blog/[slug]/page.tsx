import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getBlogBySlug,
  getBlogList,
  type BlogPost,
} from "@/lib/microcms-client";

type BlogDetailPageParams = {
  params: {
    slug: string;
  };
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

export async function generateMetadata(
  { params }: BlogDetailPageParams,
): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog post not found | null-as-0x00",
    };
  }

  return {
    title: `${post.title} | Blog | null-as-0x00`,
    description: post.excerpt || "Blog post.",
  };
}

type BlogHeaderProps = {
  post: BlogPost;
};

function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Blog Post
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        {post.category && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
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
    <div className="relative h-56 w-full overflow-hidden rounded-xl bg-zinc-100 sm:h-64">
      <Image
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
      className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:underline prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100"
    >
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </section>
  );
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageParams) {
  const post = await getBlogBySlug(params.slug);

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

