import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/***
 * Tailwind CSSのクラス名をマージするユーティリティ関数
 * @param inputs - マージするクラス名
 * @returns マージされたクラス名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
