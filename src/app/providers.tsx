"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";

/***
 * テーマプロバイダー
 * @param children - 子コンポーネント
 * @returns ThemeProviderでラップされた子コンポーネント
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
