import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  /** Heading level: h1 for page title, h2 for section title (default) */
  as?: "h1" | "h2";
};

const headingClasses =
  "text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50";

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
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
