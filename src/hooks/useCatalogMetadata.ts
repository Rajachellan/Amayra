"use client";

import { useQuery } from "@tanstack/react-query";
import { shopApi } from "@/lib/api/shop";
import { queryKeys } from "@/lib/queryKeys";

export function useCategoriesTree() {
  return useQuery({
    queryKey: queryKeys.categories.tree,
    queryFn: () => shopApi.categoriesTree(),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
}

export function useCollections() {
  return useQuery({
    queryKey: queryKeys.collections.all,
    queryFn: () => shopApi.collections(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useOccasions() {
  return useQuery({
    queryKey: queryKeys.occasions.all,
    queryFn: () => shopApi.occasions(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useLookbooks() {
  return useQuery({
    queryKey: queryKeys.lookbooks.all,
    queryFn: () => shopApi.lookbooks(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useHomepageSettings() {
  return useQuery({
    queryKey: queryKeys.homepage,
    queryFn: () => shopApi.homepageSettings(),
    staleTime: 15 * 60 * 1000,
  });
}
