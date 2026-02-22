import Link from "next/link";
import type { ReactNode } from "react";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses = {
  primary: "bg-brand-primary text-background hover:opacity-90",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
  outline:
    "border border-border bg-transparent hover:border-border-hover hover:bg-zinc-50 dark:hover:bg-zinc-900",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition focus-ring";

export function PrimaryButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const combinedClassName =
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={("type" in props && props.type) || "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
