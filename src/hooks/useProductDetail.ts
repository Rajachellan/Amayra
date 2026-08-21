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

  if (Array.isArray(detail?.images)) detail.images.forEach(push);
  if (Array.isArray(detail?.occasions)) detail.occasions.forEach((o: any) => push(o?.image));
  if (Array.isArray(detail?.collections)) detail.collections.forEach((c: any) => push(c?.image));
  if (Array.isArray(detail?.lookbooks)) {
    detail.lookbooks.forEach((lb: any) => {
      push(lb?.coverImage);
      if (Array.isArray(lb?.images)) lb.images.forEach(push);
    });
  }

  return [...new Set(out)];
}

export function useProductDetail(slug: string) {
  const query = useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: async () => {
      if (!slug) return null;
      const detail = await shopApi.productBySlug(slug);
      const product = mapDetailToProduct(detail);
      const images = collectDetailImages(detail);

      let relatedItems: any[] = [];
      const catSlug =
        detail.category && typeof detail.category === "object" && "slug" in detail.category
          ? (detail.category as { slug: string }).slug
          : undefined;

      if (catSlug) {
        try {
          const r = await shopApi.products({ category: catSlug, limit: 8, page: 1 });
          relatedItems = r.items.filter((i) => i.slug !== detail.slug);
        } catch {
          /* fallback below */
        }
      }

      if (relatedItems.length === 0) {
        try {
          const r = await shopApi.products({ limit: 8, page: 1 });
          relatedItems = r.items.filter((i) => i.slug !== detail.slug);
        } catch {
          /* ignore */
        }
      }

      const relatedProducts: Product[] = relatedItems.slice(0, 6).map(mapListItemToProduct);

      return {
        product,
        images: images.length ? images : [resolveMediaUrl(undefined)],
        relatedProducts,
      };
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });

  return {
    product: query.data?.product ?? null,
    images: query.data?.images ?? [],
    relatedProducts: query.data?.relatedProducts ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
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
        return {
          product,
          images: images.length ? images : [resolveMediaUrl(undefined)],
          relatedProducts: [],
        };
      },
      staleTime: 10 * 60 * 1000,
    });
  };
}
