type EmptyStateProps = {
  message: string;
  description?: string;
  className?: string;
};

export function EmptyState({
  message,
  description,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400 ${className}`.trim()}
    >
      <p>{message}</p>
      {description && <p className="mt-1 text-xs opacity-90">{description}</p>}
    </div>
  );
}
