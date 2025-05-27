import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  features: string[]
  specifications: Record<string, string>
  images: string[]
  created_at: string
  slug: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  // Format as Indonesian Rupiah
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

export function getRandomItems (arr: Product[], count: number) {
  return [...arr]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};
