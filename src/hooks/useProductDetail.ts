"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { shopApi } from "@/lib/api/shop";
import { queryKeys } from "@/lib/queryKeys";
import { mapDetailToProduct, mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import type { Product } from "@/types";

function collectDetailImages(detail: any): string[] {
  const out: string[] = [];
  const push = (v: unknown) => {
    if (typeof v !== "string") return;
    const s = v.trim();
    if (!s) return;
    out.push(resolveMediaUrl(s));
  };

  // Only include product-specific images in gallery
  if (Array.isArray(detail?.images)) {
    detail.images.forEach(push);
  }
  
  if (Array.isArray(detail?.variants)) {
    detail.variants.forEach((v: any) => {
      if (Array.isArray(v?.images)) v.images.forEach(push);
      else if (typeof v?.image === "string") push(v.image);
    });
  }

  return [...new Set(out)];
}

export function useProductDetail(slug: string) {
  // 1. Fast, non-blocking primary product detail query
  const detailQuery = useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: async () => {
      if (!slug) return null;
      const detail = await shopApi.productBySlug(slug);
      const product = mapDetailToProduct(detail);
      const images = collectDetailImages(detail);
      const fallbackImg = product.image || resolveMediaUrl(undefined);

      return {
        product,
        images: images.length ? images : [fallbackImg],
        categorySlug: product.categorySlug,
      };
    },
    enabled: !!slug,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const catSlug = detailQuery.data?.categorySlug;
  const currentSlug = slug;

  // 2. Decoupled related products query (fetches concurrently in background without delaying product view)
  const relatedQuery = useQuery({
    queryKey: ["products", "related", catSlug, currentSlug],
    queryFn: async () => {
      let items: any[] = [];
      if (catSlug) {
        try {
          const r = await shopApi.products({ category: catSlug, limit: 8, page: 1 });
          items = r.items.filter((i) => i.slug !== currentSlug);
        } catch {
          /* fallback below */
        }
      }

      if (items.length === 0) {
        try {
          const r = await shopApi.products({ limit: 8, page: 1 });
          items = r.items.filter((i) => i.slug !== currentSlug);
        } catch {
          /* ignore */
        }
      }

      return items.slice(0, 8).map(mapListItemToProduct);
    },
    enabled: !!catSlug && !detailQuery.isLoading,
    staleTime: 10 * 60 * 1000,
  });

  // 3. Complementary "Pair It With" accessories query
  const pairWithQuery = useQuery({
    queryKey: ["products", "pair-with", currentSlug],
    queryFn: async () => {
      try {
        const r = await shopApi.products({ trending: "true", limit: 8, page: 1 });
        const filtered = r.items.filter((i) => i.slug !== currentSlug);
        if (filtered.length >= 3) return filtered.map(mapListItemToProduct);
      } catch {
        /* fallback */
      }
      try {
        const r = await shopApi.products({ sort: "bestseller", limit: 8, page: 1 });
        return r.items.filter((i) => i.slug !== currentSlug).map(mapListItemToProduct);
      } catch {
        return [];
      }
    },
    enabled: !detailQuery.isLoading,
    staleTime: 10 * 60 * 1000,
  });

  return {
    product: detailQuery.data?.product ?? null,
    images: detailQuery.data?.images ?? [],
    relatedProducts: relatedQuery.data ?? [],
    pairWithProducts: pairWithQuery.data ?? [],
    isLoading: detailQuery.isLoading,
    isFetching: detailQuery.isFetching,
    error: detailQuery.error,
  };
}

export function usePrefetchProductDetail() {
  const queryClient = useQueryClient();

  return (slug: string) => {
    if (!slug) return;
    queryClient.prefetchQuery({
      queryKey: queryKeys.products.detail(slug),
      queryFn: async () => {
        const detail = await shopApi.productBySlug(slug);
        const product = mapDetailToProduct(detail);
        const images = collectDetailImages(detail);
        const fallbackImg = product.image || resolveMediaUrl(undefined);
        return {
          product,
          images: images.length ? images : [fallbackImg],
          categorySlug: product.categorySlug,
        };
      },
      staleTime: 10 * 60 * 1000,
    });
  };
}
