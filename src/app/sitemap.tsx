import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogs";

export const revalidate = 3600; // Refresh sitemap cache every hour

const BASE_URL = "https://mairiijewels.com";
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://api.mairiijewels.com").replace(/\/$/, "");

// Core public static pages
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "daily", priority: 1.0 }, // Homepage
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/our-story", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "daily", priority: 0.85 },
  { path: "/store-locator", changeFrequency: "monthly", priority: 0.7 },
  { path: "/category/all", changeFrequency: "daily", priority: 0.95 },
  { path: "/sitemap", changeFrequency: "monthly", priority: 0.6 },
  { path: "/shipping-returns", changeFrequency: "monthly", priority: 0.6 },
  { path: "/returns-exchanges", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.5 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.5 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.5 },
];

// Fallback curated categories if API is unreachable
const FALLBACK_CATEGORIES = [
  "necklaces",
  "earrings",
  "bangles",
  "rings",
  "bridal",
  "silver",
  "choker",
  "nose-pins",
  "mangalsutras",
  "chains",
  "pendants",
];

// Fallback curated occasions
const FALLBACK_OCCASIONS = [
  "bridal",
  "festive",
  "party",
  "daily-wear",
  "glam-up",
];

async function fetchFromApi<T>(endpoint: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${API_URL}${endpoint}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urlMap = new Map<string, MetadataRoute.Sitemap[number]>();

  const addUrl = (entry: MetadataRoute.Sitemap[number]) => {
    // Normalize url: remove trailing slash except for root domain
    const cleanUrl = entry.url === `${BASE_URL}/` ? BASE_URL : entry.url.replace(/\/$/, "");
    if (!urlMap.has(cleanUrl)) {
      urlMap.set(cleanUrl, { ...entry, url: cleanUrl });
    }
  };

  const now = new Date();

  // 1. Add Static Routes
  for (const route of STATIC_ROUTES) {
    addUrl({
      url: `${BASE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  // 2. Fetch Dynamic Data from API concurrently with safe fallbacks
  const [categoriesData, occasionsData, productsData, blogsData] = await Promise.all([
    fetchFromApi<Array<{ slug?: string; updatedAt?: string; active?: boolean }>>("/categories"),
    fetchFromApi<Array<{ slug?: string; updatedAt?: string }>>("/occasions"),
    fetchFromApi<{ items?: Array<{ slug?: string; _id?: string; updatedAt?: string; images?: string[] }> }>("/products?limit=1000"),
    fetchFromApi<{ items?: Array<{ slug?: string; updatedAt?: string }> }>("/blogs?limit=100"),
  ]);

  // 3. Category Pages
  const categorySlugs = new Set<string>(FALLBACK_CATEGORIES);
  if (Array.isArray(categoriesData)) {
    categoriesData.forEach((c) => {
      if (c.slug && c.active !== false) categorySlugs.add(c.slug.trim());
    });
  }
  for (const slug of categorySlugs) {
    addUrl({
      url: `${BASE_URL}/category/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    });
  }

  // 4. Occasion Pages
  const occasionSlugs = new Set<string>(FALLBACK_OCCASIONS);
  if (Array.isArray(occasionsData)) {
    occasionsData.forEach((o) => {
      if (o.slug) occasionSlugs.add(o.slug.trim());
    });
  }
  for (const slug of occasionSlugs) {
    addUrl({
      url: `${BASE_URL}/occasion/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // 5. Product Pages
  if (productsData?.items && Array.isArray(productsData.items)) {
    for (const product of productsData.items) {
      const slugOrId = product.slug || product._id;
      if (!slugOrId) continue;
      addUrl({
        url: `${BASE_URL}/product/${encodeURIComponent(slugOrId)}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
        changeFrequency: "daily",
        priority: 0.85,
        ...(Array.isArray(product.images) && product.images.length > 0
          ? { images: product.images.filter((img): img is string => typeof img === "string") }
          : {}),
      });
    }
  }

  // 6. Blog Articles (Static + Dynamic)
  const blogSlugs = new Set<string>();
  for (const post of BLOG_POSTS) {
    if (post.slug) {
      blogSlugs.add(post.slug);
      addUrl({
        url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: "weekly",
        priority: 0.75,
      });
    }
  }

  if (blogsData?.items && Array.isArray(blogsData.items)) {
    for (const post of blogsData.items) {
      if (post.slug && !blogSlugs.has(post.slug)) {
        addUrl({
          url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
    }
  }

  return Array.from(urlMap.values());
}
