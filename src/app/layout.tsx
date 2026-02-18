import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FramerMotionConfig } from "@/components/layout/framer-motion-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "null-as-0x00 portfolio",
    template: "%s | null-as-0x00",
  },
  description:
    "Webフロントエンドエンジニア null-as-0x00 のポートフォリオサイトです。制作物や技術記事を公開しています。",
  openGraph: {
    title: "null-as-0x00 portfolio",
    description:
      "Webフロントエンドエンジニア null-as-0x00 のポートフォリオサイトです。",
    url: "https://null-as-0x00.vercel.app",
    siteName: "null-as-0x00 portfolio",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "null-as-0x00 portfolio",
    description:
      "Webフロントエンドエンジニア null-as-0x00 のポートフォリオサイトです。",
    creator: "@null_as_0x00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50`}
      >
        <FramerMotionConfig>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </FramerMotionConfig>
      </body>
    </html>
  );
}
