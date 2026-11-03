"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useProducts, useProductFacets, type ProductsQueryData } from "@/hooks/useProducts";
import { useCollections, useOccasions } from "@/hooks/useCatalogMetadata";
import { resolveOptionalMediaUrl } from "@/lib/apiBase";
import {
  JEWELLERY_COLORS,
  CATALOG_PRICE_RANGES,
  matchesCanonicalColor,
} from "@/lib/catalogFilters";
import { ChevronUp, ChevronDown, SlidersHorizontal, X, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SortDropdown } from "@/components/ui/SortDropdown";
import Image from "next/image";
import Link from "next/link";

const BATCH_SIZE = 16;

export interface OccasionDoc {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface OccasionClientProps {
  occasionSlug: string;
  initialOccasions?: OccasionDoc[];
  initialProductsData?: ProductsQueryData;
  initialFilterKey?: string;
}

function ProductGridSkeleton({
  count = 6,
  showFilter = true,
}: {
  count?: number;
  showFilter?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 ${
        showFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"
      } gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-12 animate-pulse`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative bg-white border border-gray-100 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm"
        >
          <div className="relative aspect-square bg-neutral-200/80 overflow-hidden" />
          <div className="p-5 flex flex-col items-center text-center space-y-3">
            <div className="h-3 w-16 rounded bg-neutral-200" />
            <div className="h-4 w-3/4 rounded bg-neutral-200" />
            <div className="h-3 w-1/2 rounded bg-neutral-200" />
            <div className="pt-2 border-t border-stone-100 w-full flex flex-col items-center space-y-3">
              <div className="h-5 w-20 rounded bg-neutral-200" />
              <div className="h-10 w-full rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OccasionClient({
  occasionSlug,
  initialOccasions,
  initialProductsData,
  initialFilterKey,
}: OccasionClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const colorQuery = searchParams.get("color");
  const maxPriceQuery = searchParams.get("maxPrice");
  const collectionQuery = searchParams.get("collection");
  const searchQuery = searchParams.get("q") || "";
  const filterQuery = searchParams.get("filter");
  const sortQuery = searchParams.get("sort");

  // Unified Storefront Sidebar Filter States (matching Category/Collection pages)
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    occasionSlug ? [occasionSlug] : []
  );
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    collectionQuery ? [collectionQuery] : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    colorQuery ? [colorQuery] : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(() => {
    if (!maxPriceQuery) return null;
    const maxNum = Number(maxPriceQuery);
    if (Number.isNaN(maxNum)) return null;
    const found = CATALOG_PRICE_RANGES.find((r) => r.max === maxNum);
    return found ? { min: found.min, max: found.max } : { min: 0, max: maxNum };
  });

  const [sortBy, setSortBy] = useState(() => {
    if (filterQuery === "best" || sortQuery === "bestseller") return "Bestsellers";
    if (sortQuery === "trending") return "Trending";
    return "Featured";
  });
  const [showFilter, setShowFilter] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    occasion: true,
    collection: true,
    color: true,
    price: true,
  });

  // Sync occasion selection when navigating between /occasion/[id] routes
  useEffect(() => {
    if (occasionSlug) {
      setSelectedOccasions([occasionSlug]);
    }
  }, [occasionSlug]);

  const EMPTY_ARRAY = useMemo(() => [] as any[], []);
  const { data: collectionsData = EMPTY_ARRAY } = useCollections();
  const { data: occasionsList } = useOccasions(initialOccasions);
  const occasionsData = occasionsList ?? initialOccasions ?? EMPTY_ARRAY;

  const occasion = useMemo(() => {
    if (!occasionsData.length) return null;
    return occasionsData.find((o) => o.slug === occasionSlug) ?? null;
  }, [occasionsData, occasionSlug]);

  const heroImageUrl = useMemo(() => {
    if (heroImgError) return null;
    return resolveOptionalMediaUrl(occasion?.image);
  }, [occasion?.image, heroImgError]);

  useEffect(() => {
    setHeroImgError(false);
  }, [occasionSlug, occasion?.image]);

  const sortParam =
    sortBy === "Price: Low to High"
      ? "price_asc"
      : sortBy === "Price: High to Low"
        ? "price_desc"
        : sortBy === "Trending"
          ? "trending"
          : sortBy === "Bestsellers"
            ? "bestseller"
            : undefined;

  const facetQueryParams = useMemo(() => {
    const q: Record<string, string | number | undefined> = {};
    if (searchQuery.trim()) {
      q.q = searchQuery.trim();
    }
    return q;
  }, [searchQuery]);

  const { facets } = useProductFacets(facetQueryParams);

  const productQueryParams = useMemo(() => {
    const q: Record<string, string | number | undefined> = {
      page: 1,
      limit: 100,
      sort: sortParam,
    };
    if (searchQuery.trim()) {
      q.q = searchQuery.trim();
    }
    if (selectedOccasions.length > 0) {
      q.occasions = selectedOccasions.join(",");
    }
    if (selectedCollections.length > 0) {
      q.collections = selectedCollections.join(",");
    }
    if (selectedColors.length > 0) {
      q.colors = selectedColors.join(",");
    }
    if (selectedPriceRange !== null) {
      if (selectedPriceRange.min > 0) q.minPrice = selectedPriceRange.min;
      q.maxPrice = selectedPriceRange.max;
    }
    return q;
  }, [
    searchQuery,
    sortParam,
    selectedOccasions,
    selectedCollections,
    selectedColors,
    selectedPriceRange,
  ]);

  const currentFilterKey = [
    selectedOccasions.join(","),
    sortParam ?? "",
    searchQuery.trim(),
    selectedCollections.join(","),
    selectedColors.join(","),
    selectedPriceRange ? `${selectedPriceRange.min}-${selectedPriceRange.max}` : "",
  ].join("|");

  const matchesInitial = Boolean(initialProductsData && initialFilterKey === currentFilterKey);

  const { products: rawProducts, isLoading: loading } = useProducts(
    productQueryParams,
    matchesInitial ? { initialData: initialProductsData } : undefined
  );

  const collectionsMeta = useMemo(
    () => collectionsData.map((c: any) => ({ name: c.name, slug: c.slug })),
    [collectionsData]
  );
  const occasionsMeta = useMemo(
    () => occasionsData.map((o: any) => ({ name: o.name, slug: o.slug })),
    [occasionsData]
  );

  const displayOccasions = useMemo(() => {
    if (facets?.occasions && facets.occasions.length > 0) {
      return facets.occasions;
    }
    return occasionsMeta.map((o) => ({ name: o.name, slug: o.slug, count: 0 }));
  }, [facets?.occasions, occasionsMeta]);

  const displayCollections = useMemo(() => {
    if (facets?.collections && facets.collections.length > 0) {
      return facets.collections;
    }
    return collectionsMeta.map((c) => ({ name: c.name, slug: c.slug, count: 0 }));
  }, [facets?.collections, collectionsMeta]);

  const displayColors = useMemo(() => {
    const facetMap = new Map<string, number>();
    if (facets?.colors && facets.colors.length > 0) {
      for (const fc of facets.colors) {
        facetMap.set(fc.name, fc.count);
      }
    }
    return JEWELLERY_COLORS.map((clr) => {
      const facetCount = facetMap.get(clr);
      const productCount = rawProducts.filter((p) => matchesCanonicalColor(p.color, clr)).length;
      return {
        name: clr,
        count: facetCount !== undefined ? facetCount : productCount,
      };
    });
  }, [facets?.colors, rawProducts]);

  const displayPriceRanges = useMemo(() => {
    if (facets?.priceRanges && facets.priceRanges.length > 0) {
      return facets.priceRanges;
    }
    return CATALOG_PRICE_RANGES.map((r) => ({
      ...r,
      count: rawProducts.filter((p) => p.price >= r.min && p.price <= r.max).length,
    }));
  }, [facets?.priceRanges, rawProducts]);

  // Apply active sidebar filters (identical to Category/Collection page)
  const filteredProducts = useMemo(() => {
    return rawProducts.filter((p) => {
      if (p.isPromotionalGift || p.sku === "GIFT799" || p.slug === "free-gift-worth-799") {
        return false;
      }
      if (selectedOccasions.length > 0) {
        const matchesOcc = selectedOccasions.some((occ) => {
          const occLower = occ.toLowerCase();
          const inOccasions = p.occasions?.some((o: any) => {
            if (typeof o === "string") return o.toLowerCase() === occLower;
            return (
              o?.slug?.toLowerCase() === occLower ||
              o?.name?.toLowerCase() === occLower ||
              String(o?._id) === occLower
            );
          });
          const inTags = p.tags?.some((t) => t.toLowerCase() === occLower);
          const inDesc = p.description?.toLowerCase().includes(occLower);
          return inOccasions || inTags || inDesc;
        });
        if (!matchesOcc) return false;
      }
      if (selectedCollections.length > 0) {
        const matchesCol = selectedCollections.some((col) => {
          const colLower = col.toLowerCase();
          const inCollections = p.collections?.some((c: any) => {
            if (typeof c === "string") return c.toLowerCase() === colLower;
            return (
              c?.slug?.toLowerCase() === colLower ||
              c?.name?.toLowerCase() === colLower ||
              String(c?._id) === colLower
            );
          });
          const inTags = p.tags?.some((t) => t.toLowerCase().includes(colLower));
          const inCat = p.category?.toLowerCase().includes(colLower);
          return inCollections || inTags || inCat;
        });
        if (!matchesCol) return false;
      }
      if (selectedColors.length > 0) {
        const matchesColor = selectedColors.some((selectedClr) => {
          return (
            matchesCanonicalColor(p.color, selectedClr) ||
            matchesCanonicalColor(p.name, selectedClr) ||
            p.tags?.some((t) => matchesCanonicalColor(t, selectedClr))
          );
        });
        if (!matchesColor) return false;
      }
      if (selectedPriceRange !== null) {
        if (p.price < selectedPriceRange.min || p.price > selectedPriceRange.max) {
          return false;
        }
      }
      return true;
    });
  }, [
    rawProducts,
    selectedOccasions,
    selectedCollections,
    selectedColors,
    selectedPriceRange,
  ]);

  // Progressive batching: loads 16 items initially, streams more on scroll
  const [displayCount, setDisplayCount] = useState(BATCH_SIZE);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDisplayCount(BATCH_SIZE);
  }, [currentFilterKey]);

  useEffect(() => {
    if (displayCount >= filteredProducts.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDisplayCount((prev) => Math.min(prev + BATCH_SIZE, filteredProducts.length));
        }
      },
      { rootMargin: "400px" }
    );
    const target = observerTarget.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [displayCount, filteredProducts.length]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, displayCount),
    [filteredProducts, displayCount]
  );

  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleOccasion = (slugOrName: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(slugOrName) ? prev.filter((x) => x !== slugOrName) : [...prev, slugOrName]
    );
  };

  const toggleCollection = (slug: string) => {
    setSelectedCollections((prev) =>
      prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug]
    );
  };

  const toggleColor = (name: string) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  const hasCustomFilters =
    selectedCollections.length > 0 ||
    selectedColors.length > 0 ||
    selectedPriceRange !== null ||
    selectedOccasions.join(",") !== occasionSlug;

  const resetAllFilters = () => {
    setSelectedOccasions(occasionSlug ? [occasionSlug] : []);
    setSelectedCollections([]);
    setSelectedColors([]);
    setSelectedPriceRange(null);
  };

  const formattedSlug = occasionSlug.replace(/-/g, " ");

  const AmamaSidebar = ({ hideTitle = false }: { hideTitle?: boolean } = {}) => (
    <div className="w-full space-y-6 text-stone-800 pb-6">
      {!hideTitle && (
        <h2 className="text-xl font-bold font-serif tracking-tight border-b border-stone-200 pb-3 text-stone-900">
          Filter
        </h2>
      )}

      {/* Accordion 1: Occasion */}
      <div className="border-b border-stone-200 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("occasion")}
          className="w-full flex items-center justify-between py-2 text-left hover:text-stone-950 font-medium text-sm text-stone-700"
        >
          <span>Occasion</span>
          {expanded.occasion ? (
            <ChevronUp className="w-4 h-4 text-stone-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-500" />
          )}
        </button>

        {expanded.occasion && (
          <div className="mt-2 space-y-3 pl-0.5 max-h-60 overflow-y-auto no-scrollbar pr-1">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>{selectedOccasions.length} selected</span>
              {selectedOccasions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedOccasions([])}
                  className="hover:underline text-stone-700 font-medium"
                >
                  Reset
                </button>
              )}
            </div>
            {displayOccasions.map((occ) => {
              const occKey = occ.slug || occ.name;
              const isChecked =
                selectedOccasions.includes(occ.slug || "") ||
                selectedOccasions.includes(occ.name);
              const cnt = occ.count ?? 0;
              return (
                <label
                  key={occKey}
                  className={`flex items-center space-x-3 cursor-pointer group text-xs ${
                    cnt === 0 && !isChecked
                      ? "text-stone-400 hover:text-stone-600"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleOccasion(occ.slug || occ.name)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-0 accent-stone-800"
                  />
                  <span className="truncate">
                    {occ.name} ({cnt})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 2: Collection */}
      <div className="border-b border-stone-200 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("collection")}
          className="w-full flex items-center justify-between py-2 text-left hover:text-stone-950 font-medium text-sm text-stone-700"
        >
          <span>Collection</span>
          {expanded.collection ? (
            <ChevronUp className="w-4 h-4 text-stone-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-500" />
          )}
        </button>

        {expanded.collection && (
          <div className="mt-2 space-y-3 pl-0.5 max-h-60 overflow-y-auto no-scrollbar pr-1">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>{selectedCollections.length} selected</span>
              {selectedCollections.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCollections([])}
                  className="hover:underline text-stone-700 font-medium"
                >
                  Reset
                </button>
              )}
            </div>
            {displayCollections.map((col, idx) => {
              const colKey = col.slug || col.name || String(idx);
              const isChecked =
                selectedCollections.includes(col.slug || "") ||
                selectedCollections.includes(col.name);
              const cnt = col.count ?? 0;
              return (
                <label
                  key={colKey}
                  className={`flex items-center space-x-3 cursor-pointer group text-xs ${
                    cnt === 0 && !isChecked
                      ? "text-stone-400 hover:text-stone-600"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCollection(col.slug || col.name)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-0 accent-stone-800"
                  />
                  <span className="truncate">
                    {col.name} ({cnt})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 3: Color / Finish */}
      <div className="border-b border-stone-200 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("color")}
          className="w-full flex items-center justify-between py-2 text-left hover:text-stone-950 font-medium text-sm text-stone-700"
        >
          <span>Color / Finish</span>
          {expanded.color ? (
            <ChevronUp className="w-4 h-4 text-stone-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-500" />
          )}
        </button>

        {expanded.color && (
          <div className="mt-2 space-y-3 pl-0.5 max-h-60 overflow-y-auto no-scrollbar pr-1">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>{selectedColors.length} selected</span>
              {selectedColors.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedColors([])}
                  className="hover:underline text-stone-700 font-medium"
                >
                  Reset
                </button>
              )}
            </div>
            {displayColors.map((clr) => {
              const isChecked = selectedColors.includes(clr.name);
              const cnt = clr.count ?? 0;
              return (
                <label
                  key={clr.name}
                  className={`flex items-center space-x-3 cursor-pointer group text-xs ${
                    cnt === 0 && !isChecked
                      ? "text-stone-400 hover:text-stone-600"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleColor(clr.name)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-0 accent-stone-800"
                  />
                  <span>
                    {clr.name} ({cnt})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 4: Price */}
      <div className="border-b border-stone-200 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between py-2 text-left hover:text-stone-950 font-medium text-sm text-stone-700"
        >
          <span>Price</span>
          {expanded.price ? (
            <ChevronUp className="w-4 h-4 text-stone-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-500" />
          )}
        </button>

        {expanded.price && (
          <div className="mt-2 space-y-3 pl-0.5 max-h-60 overflow-y-auto no-scrollbar pr-1">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>{selectedPriceRange !== null ? "1 selected" : "0 selected"}</span>
              {selectedPriceRange !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedPriceRange(null)}
                  className="hover:underline text-stone-700 font-medium"
                >
                  Reset
                </button>
              )}
            </div>
            {displayPriceRanges.map((range) => {
              const rMin = range.min ?? 0;
              const rMax = range.max;
              const isChecked =
                selectedPriceRange !== null &&
                selectedPriceRange.min === rMin &&
                selectedPriceRange.max === rMax;
              const cnt = range.count ?? 0;
              return (
                <label
                  key={range.label}
                  className={`flex items-center space-x-3 cursor-pointer group text-xs ${
                    cnt === 0 && !isChecked
                      ? "text-stone-400 hover:text-stone-600"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <input
                    type="radio"
                    name="sidebar-price"
                    checked={isChecked}
                    onChange={() =>
                      setSelectedPriceRange(isChecked ? null : { min: rMin, max: rMax })
                    }
                    className="w-4 h-4 text-stone-900 focus:ring-0 accent-stone-800"
                  />
                  <span>
                    {range.label} ({cnt})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Clear All Link */}
      {hasCustomFilters && (
        <button
          type="button"
          onClick={resetAllFilters}
          className="text-xs font-semibold uppercase tracking-wider text-red-700 hover:underline pt-2 pb-2 block"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <Navbar />

      <section className="relative h-[100vh] md:h-[80vh] min-h-[480px] md:min-h-[480px] flex items-center justify-center overflow-hidden bg-stone-950 pt-16">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,160,100,0.16)_0%,_rgba(12,10,9,0.95)_70%)]" />

        {heroImageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              key={heroImageUrl}
              src={heroImageUrl}
              alt={occasion?.name || formattedSlug}
              fill
              sizes="100vw"
              quality={75}
              priority
              fetchPriority="high"
              decoding="async"
              className="object-cover object-[center_35%] brightness-[0.92]"
              onError={() => setHeroImgError(true)}
            />
          </div>
        )}

        {/* Soft Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/15 to-stone-950/70 z-10" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C4A064] to-transparent z-20" />

        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4A064]/25 border border-[#C4A064]/40 backdrop-blur-md shadow-md">
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span className="text-amber-300 uppercase tracking-[0.4em] text-[10px] font-bold">
                Occasion Collection
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.1] capitalize drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              {occasion?.name || formattedSlug}
            </h1>

            <nav className="flex items-center justify-center space-x-3 text-stone-200 text-[11px] uppercase tracking-[0.3em] font-serif pt-2 drop-shadow-md">
              <Link href="/" className="hover:text-amber-300 transition-colors duration-300">
                Home
              </Link>
              <span className="text-amber-300/70">/</span>
              <span className="text-amber-300 font-bold tracking-[0.35em]">{formattedSlug}</span>
            </nav>
          </div>
        </div>

        {/* Bottom Filigree Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C4A064] to-transparent z-20" />
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-6">
          {/* Controls Bar (Hide Filter toggle left, count & sort right — identical to Category page) */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 1024) {
                  setIsMobileFilterOpen(true);
                } else {
                  setShowFilter((prev) => !prev);
                }
              }}
              className="inline-flex items-center space-x-2 text-stone-700 hover:text-stone-950 font-medium text-xs uppercase tracking-wider cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-stone-700" />
              <span>{showFilter ? "Hide filter" : "Show filter"}</span>
            </button>

            <div className="flex items-center space-x-6">
              <span className="text-stone-500 text-xs tracking-wider">
                {filteredProducts.length} products
              </span>

              <SortDropdown
                value={sortBy}
                onChange={setSortBy}
                options={[
                  "Featured",
                  "Newest Arrivals",
                  "Price: Low to High",
                  "Price: High to Low",
                  "Trending",
                  "Bestsellers",
                ]}
              />
            </div>
          </div>

          {/* Main Layout: Sidebar + Product Grid */}
          <div className="flex gap-10 items-start">
            {showFilter && (
              <aside className="hidden lg:block w-64 shrink-0 pr-4 border-r border-stone-200 sticky top-28 self-start max-h-[calc(100vh-7.5rem)] overflow-y-auto no-scrollbar overscroll-contain">
                <AmamaSidebar />
              </aside>
            )}

            <div className="flex-1">
              {loading && filteredProducts.length === 0 ? (
                <ProductGridSkeleton count={6} showFilter={showFilter} />
              ) : filteredProducts.length > 0 ? (
                <>
                  <div
                    className={`grid grid-cols-2 sm:grid-cols-2 ${
                      showFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"
                    } gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-12`}
                  >
                    {visibleProducts.map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        priority={idx < (showFilter ? 3 : 4)}
                      />
                    ))}
                  </div>

                  {displayCount < filteredProducts.length && (
                    <div ref={observerTarget} className="w-full py-10 flex justify-center items-center">
                      <div className="flex items-center gap-2.5 text-stone-400 text-xs tracking-widest uppercase">
                        <div className="w-4 h-4 rounded-full border-2 border-champagne/40 border-t-champagne animate-spin" />
                        <span>Loading more handcrafted pieces…</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-24 text-center bg-stone-50 border border-dashed border-stone-200 rounded-sm">
                  <h3 className="font-serif text-2xl text-stone-400 uppercase tracking-widest mb-4">
                    No Treasures Found
                  </h3>
                  <p className="text-stone-500 mb-6 tracking-widest text-xs uppercase">
                    Try adjusting or clearing your active filters
                  </p>
                  <Button
                    variant="gold"
                    onClick={() => {
                      resetAllFilters();
                      router.push("/category/all");
                    }}
                  >
                    EXPLORE ALL PRODUCTS
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Slide-over Drawer (identical to Category page) */}
      <Suspense>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative h-full w-[320px] sm:w-[360px] bg-white shadow-2xl flex flex-col z-10">
              <div className="flex justify-between items-center px-6 py-4 border-b border-stone-200 shrink-0">
                <h2 className="text-sm uppercase tracking-widest font-bold text-stone-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#c9a84c]" />
                  <span>Filter & Refine</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar overscroll-contain">
                <AmamaSidebar hideTitle />
              </div>
              <div className="p-4 border-t border-stone-200 bg-white shrink-0 flex gap-3">
                {hasCustomFilters && (
                  <Button
                    variant="outline"
                    className="flex-1 py-3 text-xs uppercase tracking-wider"
                    onClick={resetAllFilters}
                  >
                    Reset
                  </Button>
                )}
                <Button
                  variant="gold"
                  className="flex-1 py-3 text-xs uppercase tracking-wider"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply ({filteredProducts.length})
                </Button>
              </div>
            </div>
          </div>
        )}
      </Suspense>

      <Footer />
    </>
  );
}
