import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // next-themesと連携するために'class'を使用
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--color-card)",
        "card-hover": "var(--color-card-hover)",
        border: "var(--color-border)",
        "border-hover": "var(--color-border-hover)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        "gray-900": "#111827", // Tailwind CSSのデフォルトgray-900カラー
      },
      boxShadow: {
        subtle: "var(--color-shadow-subtle)",
        DEFAULT: "var(--color-shadow)",
        dark: "var(--color-shadow-dark)",
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")({
      theme: {
        extend: {
          ringOffsetColor: {
            DEFAULT: "var(--background)",
            ...require("tailwindcss/theme").colors.gray,
          },
        },
      },
    }),
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".focus-ring": {
          outline: "2px solid transparent",
          "outline-offset": "2px",
          "&:focus": {
            "outline-color": "var(--color-accent)",
            "outline-offset": "2px",
            "background-color": "transparent",
          },
          "&:focus:not(:focus-visible)": {
            outline: "none",
            "outline-offset": "0",
          },
          "&:focus-visible": {
            "outline-color": "var(--color-accent)",
            "outline-offset": "2px",
          },
        },
      });
    },
  ],
};

export default config;
