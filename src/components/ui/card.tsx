import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  variant?: "default" | "hoverable";
  className?: string;
  as?: "div" | "article";
};

export function Card({
  children,
  variant = "default",
  className = "",
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow sm:flex-row",
        "transition-colors",
        variant === "hoverable" &&
          "hover:border-border-hover hover:bg-card-hover",
        className,
      )}
    >
      {children}
    </Component>
  );
}
