import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
export const cn = function (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const debounce = function <T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait)
  }
}