import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  variant?: "default" | "hoverable";
  className?: string;
  as?: "div" | "article";
};

const baseClasses =
  "flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row";
const hoverableClasses =
  "transition hover:border-zinc-300 dark:hover:border-zinc-700";

export function Card({
  children,
  variant = "default",
  className = "",
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={`${baseClasses} ${variant === "hoverable" ? hoverableClasses : ""} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
