export function HeroSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-both space-y-4">
      <div className="space-y-2">
        {/* text-foreground (ブランドカラーのプライマリ) を使用 */}
        <h1 className="text-4xl font-semibold tracking-tight text-brand-primary sm:text-5xl">
          null-as-0x00
        </h1>
        {/* text-color-muted (控えめな色) を使用 */}
        <p className="text-lg text-color-muted">Web Developer & Engineer</p>
      </div>
      <div className="max-w-2xl space-y-4 text-base leading-7 text-color-muted">
        <p>
          こんにちは、null-as-0x00 です。Web
          フロントエンドを中心に、モダンな技術スタックを用いた開発を行っています。
        </p>
        <p>
          このポートフォリオでは、これまで制作したプロジェクトや、日々の学習で得た技術的な知見をブログとして発信しています。
          「シンプルで使いやすく、かつ堅牢な実装」をモットーに、ユーザーと開発者の両方に価値を届けることを目指しています。
        </p>
      </div>
    </section>
  );
}
