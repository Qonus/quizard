import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_URL || "https://" + process.env.VERCEL_APP;
}