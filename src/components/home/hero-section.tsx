export function HeroSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-both space-y-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight text-brand-primary sm:text-5xl">
          null-as-0x00
        </h1>
        <p className="text-lg text-color-muted">
          Web Developer & Engineer を目指しています
        </p>
      </div>
      <div className="max-w-2xl space-y-4 text-base leading-7 text-color-muted">
        <p>
          2年間の実務経験があり、Webフロントエンドを中心に、TypeScriptを用いた開発を行っています。
        </p>
        <p>
          このブログでは、これまで制作したポートフォリオや、日々の学習で得た技術的な知見をブログとして発信しています。
        </p>
      </div>
    </section>
  );
}
