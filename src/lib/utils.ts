import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getImageUrl(name: string) {
    return new URL(`../assets/${name}`, import.meta.url).href;
}
