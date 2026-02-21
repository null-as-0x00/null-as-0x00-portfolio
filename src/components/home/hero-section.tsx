"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    // <LazyMotion features={domAnimation}>
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background Decoration */}
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl dark:from-blue-400/20 dark:to-purple-400/20"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/2 h-px w-1/3 -translate-y-1/2 transform bg-gradient-to-l from-transparent to-zinc-300 dark:to-zinc-700"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Text Content */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              null-as-0x00
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Web Developer & Engineer
            </p>
          </div>
          <div className="max-w-lg space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            <p>
              こんにちは、null-as-0x00 です。Web
              フロントエンドを中心に、モダンな技術スタックを用いた開発を行っています。
            </p>
            <p>
              このポートフォリオでは、これまで制作したプロジェクトや、日々の学習で得た技術的な知見をブログとして発信しています。
              「シンプルで使いやすく、かつ堅牢な実装」をモットーに、ユーザーと開発者の両方に価値を届けることを目指しています。
            </p>
          </div>
        </m.div>

        {/* Decorative elements on the right on large screens */}
        <div className="hidden lg:block">
          {/* Floating gradient circle */}
          <m.div
            className="absolute right-10 top-10 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl dark:from-blue-400/30 dark:to-purple-400/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            aria-hidden="true"
          />
          {/* Diagonal line */}
          <m.div
            className="absolute right-20 top-1/2 h-px w-1/4 -translate-y-1/2 transform bg-gradient-to-l from-transparent to-zinc-300 dark:to-zinc-700 rotate-[-15deg]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            aria-hidden="true"
          />
          {/* Floating window element */}
          <m.div
            className="absolute right-0 top-1/4 z-20 h-40 w-56 rounded-xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
            initial={{ opacity: 0, y: 20, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            whileHover={{ scale: 1.05, rotate: 5, zIndex: 30 }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="h-24 w-32 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
                <Image
                  src="/window.svg"
                  alt="Floating window element"
                  width={128}
                  height={96}
                  className="h-full w-full object-contain p-2 opacity-60"
                />
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
    // </LazyMotion>
  );
}
