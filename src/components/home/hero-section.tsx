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
      <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
        ポートフォリオサイトへようこそ。制作物や技術記事を紹介しています。
      </p>
    </motion.section>
  );
}
