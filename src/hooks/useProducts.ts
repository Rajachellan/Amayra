"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { shopApi } from "@/lib/api/shop";
import { queryKeys } from "@/lib/queryKeys";
import { mapListItemToProduct } from "@/lib/mapProduct";
import type { Product } from "@/types";

export function useProducts(filters: Record<string, string | number | undefined> = {}) {
  const query = useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: async () => {
      const res = await shopApi.products(filters);
      const items: Product[] = (res.items || []).map(mapListItemToProduct);
      return {
        items,
        total: res.total || 0,
        page: res.page || 1,
        pages: res.pages || 0,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  return {
    products: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    pages: query.data?.pages ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
