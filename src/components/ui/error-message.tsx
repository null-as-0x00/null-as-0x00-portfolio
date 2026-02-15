type ErrorMessageProps = {
  message: string;
  className?: string;
};

export function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
  return (
    <p
      role="alert"
      className={`text-xs text-red-600 dark:text-red-400 ${className}`.trim()}
    >
      {message}
    </p>
  );
}
