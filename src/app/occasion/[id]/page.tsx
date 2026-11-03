import React, { Suspense } from "react";
import { headers } from "next/headers";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { CATALOG_PRICE_RANGES } from "@/lib/catalogFilters";
import type { ProductListResponse } from "@/lib/api/shop";
import type { ProductsQueryData } from "@/hooks/useProducts";
import { OccasionClient, type OccasionDoc } from "./OccasionClient";

async function resolveServerApiBase(): Promise<string> {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  try {
    const hdrs = await headers();
    const hostHeader = hdrs.get("x-forwarded-host") || hdrs.get("host") || "";
    const proto = hdrs.get("x-forwarded-proto") || "http";
    const hostname = hostHeader.split(":")[0]?.toLowerCase() || "";

    if (
      hostname === "mairiijewels.com" ||
      hostname === "www.mairiijewels.com" ||
      hostname.endsWith(".mairiijewels.com")
    ) {
      return "https://api.mairiijewels.com";
    }
    if (hostname) {
      return `${proto}://${hostname}:4000`;
    }
  } catch {
    // Fallback below if headers() is unavailable
  }

  return process.env.NODE_ENV === "production"
    ? "https://api.mairiijewels.com"
    : "http://localhost:4000";
}

function normalizeServerMediaUrl(raw: string | undefined | null, apiBase: string): string | undefined {
  const s = typeof raw === "string" ? raw.trim() : "";
  if (!s) return undefined;
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:")) return s;
  return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
}

export default async function OccasionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    color?: string;
    maxPrice?: string;
    collection?: string;
    q?: string;
    filter?: string;
    sort?: string;
  }>;
}) {
  const [{ id: occasionSlug }, resolvedSearchParams, apiBase] = await Promise.all([
    params,
    searchParams,
    resolveServerApiBase(),
  ]);

  const color = resolvedSearchParams?.color || "";
  const collection = resolvedSearchParams?.collection || "";
  const searchQuery = resolvedSearchParams?.q?.trim() || "";
  const sortParam =
    resolvedSearchParams?.filter === "best" || resolvedSearchParams?.sort === "bestseller"
      ? "bestseller"
      : resolvedSearchParams?.sort === "trending"
        ? "trending"
        : "";

  const maxPriceNum =
    resolvedSearchParams?.maxPrice && !Number.isNaN(Number(resolvedSearchParams.maxPrice))
      ? Number(resolvedSearchParams.maxPrice)
      : null;

  const matchedRange =
    maxPriceNum != null ? CATALOG_PRICE_RANGES.find((r) => r.max === maxPriceNum) : undefined;
  const priceRangeObj =
    maxPriceNum != null
      ? matchedRange
        ? { min: matchedRange.min, max: matchedRange.max }
        : { min: 0, max: maxPriceNum }
      : null;

  const productSp = new URLSearchParams({
    page: "1",
    limit: "100",
    occasions: occasionSlug,
  });
  if (sortParam) productSp.set("sort", sortParam);
  if (searchQuery) productSp.set("q", searchQuery);
  if (collection) productSp.set("collections", collection);
  if (color) productSp.set("colors", color);
  if (priceRangeObj) {
    if (priceRangeObj.min > 0) productSp.set("minPrice", String(priceRangeObj.min));
    productSp.set("maxPrice", String(priceRangeObj.max));
  }

  const [initialOccasions, initialProductsData] = await Promise.all([
    fetch(`${apiBase}/occasions`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    })
      .then(async (res) => {
        if (!res.ok) return undefined;
        const list = (await res.json()) as OccasionDoc[];
        if (!Array.isArray(list)) return undefined;
        return list.map((o) => ({
          ...o,
          image: normalizeServerMediaUrl(o.image, apiBase),
        }));
      })
      .catch(() => undefined),
    fetch(`${apiBase}/products?${productSp.toString()}`, {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(2500),
    })
      .then(async (res): Promise<ProductsQueryData | undefined> => {
        if (!res.ok) return undefined;
        const data = (await res.json()) as ProductListResponse;
        const normalizedItems = (data.items || []).map((item) => ({
          ...item,
          images: Array.isArray(item.images)
            ? item.images
                .map((img) => normalizeServerMediaUrl(img, apiBase))
                .filter((img): img is string => Boolean(img))
            : [],
        }));
        return {
          items: normalizedItems.map(mapListItemToProduct),
          total: data.total || 0,
          page: data.page || 1,
          pages: data.pages || 0,
        };
      })
      .catch(() => undefined),
  ]);

  const initialFilterKey = [
    occasionSlug,
    sortParam,
    searchQuery,
    collection,
    color,
    priceRangeObj ? `${priceRangeObj.min}-${priceRangeObj.max}` : "",
  ].join("|");

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="min-h-screen bg-stone-950" />}>
        <OccasionClient
          occasionSlug={occasionSlug}
          initialOccasions={initialOccasions}
          initialProductsData={initialProductsData}
          initialFilterKey={initialFilterKey}
        />
      </Suspense>
    </main>
  );
}
