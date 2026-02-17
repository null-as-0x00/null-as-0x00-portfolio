import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getWorkBySlug, getWorksList, type Work } from "@/lib/microcms-client";

type WorkDetailPageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const { contents } = await getWorksList({
    fields: "id,slug",
    limit: 100,
  });

  return contents.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageParams): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return {
      title: "Work not found",
    };
  }

  return {
    title: work.title,
    description: work.summary || `${work.title}のプロジェクト詳細ページです。`,
    openGraph: {
      title: work.title,
      description: work.summary,
      images: work.thumbnail ? [{ url: work.thumbnail.url }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.summary,
      images: work.thumbnail ? [work.thumbnail.url] : [],
    },
  };
}

type WorkHeaderProps = {
  work: Work;
};

function WorkHeader({ work }: WorkHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Work Detail
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{work.title}</h1>
        {work.summary && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {work.summary}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        {work.publishedAt && (
          <span>
            Published{" "}
            <time dateTime={work.publishedAt}>
              {new Date(work.publishedAt).toLocaleDateString("ja-JP")}
            </time>
          </span>
        )}
        {work.updatedAt && (
          <span>
            Updated{" "}
            <time dateTime={work.updatedAt}>
              {new Date(work.updatedAt).toLocaleDateString("ja-JP")}
            </time>
          </span>
        )}
      </div>
    </header>
  );
}

type WorkTechStackProps = {
  techStack?: string[];
};

function WorkTechStack({ techStack }: WorkTechStackProps) {
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <section aria-label="Used technologies" className="space-y-2">
      <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Tech stack
      </h2>
      <ul className="flex flex-wrap gap-1.5">
        {techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}

type WorkLinksProps = {
  work: Work;
};

function WorkLinks({ work }: WorkLinksProps) {
  if (!work.siteUrl && !work.repoUrl) {
    return null;
  }

  return (
    <section aria-label="Project links" className="space-y-2">
      <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Links
      </h2>
      <div className="flex flex-wrap gap-2 text-sm">
        {work.siteUrl && (
          <a
            href={work.siteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Visit site
          </a>
        )}
        {work.repoUrl && (
          <a
            href={work.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            View repository
          </a>
        )}
      </div>
    </section>
  );
}

type WorkBodyProps = {
  body?: string;
};

function WorkBody({ body }: WorkBodyProps) {
  if (!body) {
    return null;
  }

  return (
    <section aria-label="Work description" className="space-y-2">
      <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Overview
      </h2>
      <div className="prose prose-zinc max-w-none text-sm dark:prose-invert">
        <p>{body}</p>
      </div>
    </section>
  );
}

type WorkThumbnailProps = {
  work: Work;
};

function WorkThumbnail({ work }: WorkThumbnailProps) {
  if (!work.thumbnail) {
    return null;
  }

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-xl bg-zinc-100 sm:h-64">
      <Image
        src={work.thumbnail.url}
        alt={work.title}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

export default async function WorkDetailPage({ params }: WorkDetailPageParams) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <WorkHeader work={work} />

      <div className="space-y-8">
        <WorkThumbnail work={work} />

        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <WorkBody body={work.body} />

          <div className="space-y-6">
            <WorkTechStack techStack={work.techStack} />
            <WorkLinks work={work} />
          </div>
        </div>
      </div>
    </article>
  );
}
