"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function HeroSection() {
  return (
    <motion.section
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
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
      <div className="max-w-2xl space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        <p>
          こんにちは、null-as-0x00 です。Web
          フロントエンドを中心に、モダンな技術スタックを用いた開発を行っています。
        </p>
        <p>
          このポートフォリオでは、これまで制作したプロジェクトや、日々の学習で得た技術的な知見をブログとして発信しています。
          「シンプルで使いやすく、かつ堅牢な実装」をモットーに、ユーザーと開発者の両方に価値を届けることを目指しています。
        </p>
      </div>
    </motion.section>
  );
}
