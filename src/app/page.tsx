import type { Metadata } from "next";

import { getWorksList, getBlogList, type Work, type BlogPost } from "@/lib/microcms-client";
import {
  HeroSection,
  FeaturedWorksSection,
  LatestBlogSection,
} from "@/components/home/index";

export const metadata: Metadata = {
  title: "null-as-0x00 portfolio",
  description: "Portfolio site built with Next.js App Router",
};

export default async function Home() {
  let featuredWorks: Work[] = [];
  let latestPosts: BlogPost[] = [];
  let worksError = false;
  let blogError = false;

  try {
    const [worksData, blogData] = await Promise.all([
      getWorksList({ limit: 3 }),
      getBlogList({ limit: 3 }),
    ]);
    featuredWorks = worksData.contents;
    latestPosts = blogData.contents;
  } catch (error) {
    console.error("[HomePage] Failed to fetch data from microCMS:", error);
    worksError = true;
    blogError = true;
  }

  return (
    <div className="space-y-16">
      <HeroSection />
      <FeaturedWorksSection works={featuredWorks} error={worksError} />
      <LatestBlogSection posts={latestPosts} error={blogError} />
    </div>
  );
}
