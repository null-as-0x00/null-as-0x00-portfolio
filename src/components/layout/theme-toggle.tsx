"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

/***
 * テーマ切り替えボタン
 * @returns テーマ切り替えボタンのReactコンポーネント
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみレンダリングするためのマウント状態管理
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-ring"
      aria-label={
        theme === "dark"
          ? "ライトモードに切り替える"
          : "ダークモードに切り替える"
      }
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-zinc-50" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-900" />
      )}
    </button>
  );
}
