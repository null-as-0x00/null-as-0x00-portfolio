import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  /** Heading level: h1 for page title, h2 for section title (default) */
  as?: "h1" | "h2";
};

// dark: プレフィックスを消し、CSS変数に紐付いたクラスに変更
const headingClasses =
  "text-2xl font-semibold tracking-tight text-brand-primary";

export function SectionHeader({
  title,
  description,
  action,
  className = "",
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between ${className}`.trim()}
      role="group"
      aria-label={title}
    >
      <div>
        <Heading className={headingClasses}>{title}</Heading>
        {description && (
          // zinc-600 dark:text-zinc-400 を color-muted に統合
          <p className="mt-1 text-sm text-color-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
