import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

// ---- 環境変数チェック ---- //
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error("Missing MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY");
}

// ---- クライアント生成 ---- //
export const microcmsClient = createClient({
  serviceDomain,
  apiKey,
});

// ---- 共通型 ---- //
type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

// ---- works モデル ---- //
export type Work = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail?: MicroCMSImage;
  body?: string;
  techStack?: string[];
  siteUrl?: string;
  repoUrl?: string;
  // microCMS 標準フィールド
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  revisedAt?: string;
};

// ---- blog モデル ---- //
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail?: MicroCMSImage;
  body: string;
  category?: string;
  // microCMS 標準フィールド
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  revisedAt?: string;
};

// ---- API ラッパ関数 ---- //

// Works 一覧
export async function getWorksList(queries?: MicroCMSQueries) {
  return microcmsClient.getList<Work>({
    endpoint: "works",
    queries: {
      orders: "-publishedAt",
      ...queries,
    },
  });
}

// Work 詳細（slug で取得）
export async function getWorkBySlug(slug: string) {
  const data = await microcmsClient.getList<Work>({
    endpoint: "works",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });

  return data.contents[0] ?? null;
}

// Blog 一覧
export async function getBlogList(queries?: MicroCMSQueries) {
  return microcmsClient.getList<BlogPost>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      ...queries,
    },
  });
}

// Blog 詳細（slug で取得）
export async function getBlogBySlug(slug: string) {
  const data = await microcmsClient.getList<BlogPost>({
    endpoint: "blog",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });

  return data.contents[0] ?? null;
}

