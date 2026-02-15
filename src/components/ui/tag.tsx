import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
};

const variantClasses = {
  default:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
  outline:
    "border border-zinc-200 bg-transparent text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
};

export function Tag({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: TagProps) {
  return (
    <span
      className={`inline-block rounded-full font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
