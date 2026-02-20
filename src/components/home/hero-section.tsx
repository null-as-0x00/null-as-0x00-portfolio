import { m } from "framer-motion";

export function HeroSection() {
  return (
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
          transition={{ duration: 0.7, ease: "easeOut" }}
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

        {/* Placeholder for visual element on the right on large screens */}
        <div className="hidden lg:flex lg:items-center lg:justify-end">
          <div className="h-64 w-full max-w-xs rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50" />
        </div>
      </div>
    </section>
  );
}
