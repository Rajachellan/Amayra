"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { CategorySlider } from "@/components/products/CategorySlider";
import { shopApi, type CategoryTreeNode } from "@/lib/api/shop";
import { useProducts, useProductFacets } from "@/hooks/useProducts";
import { useCategoriesTree, useCollections, useOccasions } from "@/hooks/useCatalogMetadata";
import innerbanner1 from "../../../assets/preview_banner/Emerald Lotus Bridal Necklace ad.png"
import bridalbanner1 from "../../../assets/preview_banner/banner-image (1).png"
import bridalbanner2 from "../../../assets/preview_banner/banner-image (2).png"
import bridalbanner3 from "../../../assets/preview_banner/banner-image (3).png"
import bridalbanner4 from "../../../assets/preview_banner/banner-image (4).png"
import { mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import { ChevronUp, ChevronDown, SlidersHorizontal, X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SortDropdown } from "@/components/ui/SortDropdown";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import silverBanner from "@/assets/silver.jpg";
import bridalBanner from "../../../assets/preview_banner/Inspired-by-Her.png";
import necklaceBanner from "@/assets/preview_banner/neckles-banner (2).png";
import necklaceBanner2 from "../../../assets/preview_banner/previewbanner1.jpeg";
import banglesBanner from "@/assets/bangles_7.jpg";
import earringsBanner from "@/assets/kammal_6.jpg";
import bannerImage from "../../../assets/preview_banner/inner-banner-1.png";
import ringsImg from "@/assets/pexels-the-glorious-studio-3584518-10361481 (1).jpg";
import nosePinImg from "@/assets/pexels-ankunijjar-31772512.jpg";
import mangalsutraImg from "@/assets/pexels-the-glorious-studio-3584518-8306531.jpg";
import chainImg from "@/assets/pexels-thisisjooh-36160928.jpg";
import pendantImg from "@/assets/pexels-arif-13595746.jpg";

/* ── MOBILE BANNER IMAGES ─────────────────────────────────────────────────────
 * Unga generate pannina mobile images-a inga import pannunga.
 * File names / path unga folder-ku match aagura maathiri maathikonga.
 * (Idhe folder: assets/preview_banner/)
 * ──────────────────────────────────────────────────────────────────────────── */
import mobileBanner1 from "../../../assets/preview_banner/inner-banner-mobile.jpeg"; // Mobile Slide 1
import mobileBanner2 from "../../../assets/preview_banner/inner-banner-mobile.jpeg"; // Mobile Slide 2

type BannerSlide = {
  id: string;
  image: any; // Laptop / desktop image
  mobileImage?: any; // Mobile image (illaina laptop image-ae use aagum)
};

const CATEGORY_BANNERS: Record<string, any> = {
  silver: silverBanner,
  earrings: earringsBanner,
  necklaces: necklaceBanner,
  bangles: banglesBanner,
  rings: ringsImg,
  bridal: bridalBanner,
  "nose-pins": nosePinImg,
  mangalsutras: mangalsutraImg,
  chains: chainImg,
  pendants: pendantImg,
  all: bannerImage,
};

function getCategoryBanner(slug: string, sub?: string | null): any {
  const currentKey = (sub || slug || "all").toLowerCase();
  return CATEGORY_BANNERS[currentKey] || CATEGORY_BANNERS[(slug || "all").toLowerCase()] || bannerImage;
}

/**
 * Default 2-slide banner configuration for category/collection pages (e.g. category/all?collection=aanchal).
 * image = laptop view, mobileImage = mobile view.
 */
export const DEFAULT_BANNER_SLIDES: BannerSlide[] = [
  {
    id: "necklace-slide-1",
    image: bannerImage, // Slide 1 LAPTOP Banner Image (Wear What Lives Within You)
    mobileImage: innerbanner1, // Slide 1 MOBILE Banner Image
  },
  {
    id: "necklace-slide-2",
    image: necklaceBanner2, // Slide 2 LAPTOP Banner Image (Inspired by Her. Made for You.)
    mobileImage: mobileBanner2, // Slide 2 MOBILE Banner Image
  },

];

/**
 * Necklaces Category Banner Slides (2-slide banner configuration)
 * image = laptop view, mobileImage = mobile view.
 */
export const NECKLACE_BANNER_SLIDES: BannerSlide[] = [
  {
    id: "necklace-slide-1",
    image: bannerImage, // Slide 1 LAPTOP Banner Image (Wear What Lives Within You)
    mobileImage: innerbanner1, // Slide 1 MOBILE Banner Image
  },
  {
    id: "necklace-slide-2",
    image: necklaceBanner2, // Slide 2 LAPTOP Banner Image (Inspired by Her. Made for You.)
    mobileImage: mobileBanner2, // Slide 2 MOBILE Banner Image
  },
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  silver: "Pure sterling 925 silver creations, hand-carved with timeless perfection and contemporary charm.",
  earrings: "From intricate jhumkas to statement Kundan drops — handcrafted to frame every expression of beauty.",
  necklaces: "Handcrafted chokers, temple cascades and regal Kundan pieces woven to celebrate your unique identity.",
  bangles: "Traditional kadas, glass-fitted bangles and embellished wristwear reflecting light in every gesture.",
  rings: "Solitaires, cocktail rings and handcrafted bands designed to make every glance unforgettable.",
  bridal: "Grand wedding sets and royal trousseau heirlooms created for your most sacred moments.",
  "nose-pins": "Delicate septums, classic Nathis and embellished nose pins capturing ethnic grace.",
  mangalsutras: "Sacred bonds reinvented — modern minimalist chains and classic black-beaded heritage sets.",
  chains: "Fine gold and silver layering chains crafted with delicate filigree and smooth polish.",
  pendants: "Celestial charms and gemstone pendants designed to rest gracefully near your heart.",
  all: "Explore the full spectrum of MaiRii imitation jewellery — where affordability meets timeless elegance.",
};

export const JEWELLERY_COLORS = [
  "Antique/Metallic",
  "Black",
  "Blue/ Teal",
  "Golden/Yellow",
  "Green/Mint",
  "Grey/Smokey",
  "Ivory/White",
  "Multicolour",
  "Orange/Peach",
  "Pink/Magenta",
  "Purple/Voilet/Lavendar",
  "Red/ Maroon",
] as const;

export function matchesCanonicalColor(
  productColor: string | undefined | null,
  targetColor: string
): boolean {
  if (!productColor) return false;
  const p = productColor.trim().toLowerCase();
  const t = targetColor.toLowerCase();

  if (p === t) return true;

  switch (targetColor) {
    case "Antique/Metallic":
      return p.includes("antique") || p.includes("metallic");
    case "Black":
      return p.includes("black") || p.includes("oxidised");
    case "Blue/ Teal":
      return (
        p.includes("blue") ||
        p.includes("teal") ||
        p.includes("sapphire") ||
        p.includes("turquoise")
      );
    case "Golden/Yellow":
      return p.includes("gold") || p.includes("golden") || p.includes("yellow");
    case "Green/Mint":
      return (
        p.includes("green") ||
        p.includes("mint") ||
        p.includes("emerald")
      );
    case "Grey/Smokey":
      return (
        p.includes("grey") ||
        p.includes("gray") ||
        p.includes("silver") ||
        p.includes("smok")
      );
    case "Ivory/White":
      return (
        p.includes("white") ||
        p.includes("ivory") ||
        p.includes("pearl") ||
        p.includes("kundan")
      );
    case "Multicolour":
      return p.includes("multi") || p.includes("navratan");
    case "Orange/Peach":
      return (
        p.includes("orange") ||
        p.includes("peach") ||
        p.includes("coral") ||
        p.includes("rust")
      );
    case "Pink/Magenta":
      return (
        p.includes("pink") ||
        p.includes("magenta") ||
        p.includes("blush") ||
        p.includes("rose") ||
        p.includes("rani")
      );
    case "Purple/Voilet/Lavendar":
      return (
        p.includes("purple") ||
        p.includes("violet") ||
        p.includes("voilet") ||
        p.includes("lavender") ||
        p.includes("lavendar") ||
        p.includes("lilac") ||
        p.includes("mauve")
      );
    case "Red/ Maroon":
      return (
        p.includes("red") ||
        p.includes("maroon") ||
        p.includes("ruby") ||
        p.includes("wine") ||
        p.includes("crimson")
      );
    default:
      return p.includes(t);
  }
}
const PRICE_RANGES = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Over ₹20,000", min: 20000, max: 1000000 },
];

function findInTree(
  nodes: CategoryTreeNode[],
  slug: string,
  parent: CategoryTreeNode | null = null
): { node: CategoryTreeNode; parent: CategoryTreeNode | null } | null {
  for (const n of nodes) {
    if (n.slug === slug) return { node: n, parent };
    const inner = findInTree(n.children || [], slug, n);
    if (inner) return inner;
  }
  return null;
}

function CategoryContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySlug = id as string;

  const subQuery = searchParams.get("sub");
  const colorQuery = searchParams.get("color");
  const maxPriceQuery = searchParams.get("maxPrice");
  const collectionQuery = searchParams.get("collection");
  const searchQuery = searchParams.get("q") || "";

  // Amama-style Sidebar Filter States
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    collectionQuery ? [collectionQuery] : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    colorQuery ? [colorQuery] : []
  );
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(
    maxPriceQuery ? Number(maxPriceQuery) : null
  );

  const [sortBy, setSortBy] = useState("Featured");
  const [showFilter, setShowFilter] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Accordion collapsed/expanded state per section
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    occasion: true,
    collection: true,
    color: true,
    price: true,
  });

  const EMPTY_ARRAY = useMemo(() => [] as any[], []);
  const { data: treeData = EMPTY_ARRAY } = useCategoriesTree();
  const { data: collectionsData = EMPTY_ARRAY } = useCollections();
  const { data: occasionsData = EMPTY_ARRAY } = useOccasions();

  const tree = treeData;
  const collectionsList = useMemo(() => collectionsData.map((c) => ({ name: c.name, slug: c.slug })), [collectionsData]);
  const occasionsList = useMemo(() => occasionsData.map((o) => ({ name: o.name, slug: o.slug })), [occasionsData]);

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
    if (categorySlug && categorySlug !== "all") {
      q.category = categorySlug;
    }
    if (subQuery) {
      q.subCategory = subQuery;
    }
    if (searchQuery.trim()) {
      q.q = searchQuery.trim();
    }
    return q;
  }, [categorySlug, subQuery, searchQuery]);

  const { facets } = useProductFacets(facetQueryParams);

  const productQueryParams = useMemo(() => {
    const q: Record<string, string | number | undefined> = {
      page: 1,
      limit: 100,
      sort: sortParam,
    };
    if (categorySlug && categorySlug !== "all") {
      q.category = categorySlug;
    }
    if (subQuery) {
      q.subCategory = subQuery;
    }
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
    if (selectedMaxPrice !== null) {
      q.maxPrice = selectedMaxPrice;
    }
    return q;
  }, [
    categorySlug,
    subQuery,
    searchQuery,
    sortParam,
    selectedOccasions,
    selectedCollections,
    selectedColors,
    selectedMaxPrice,
  ]);

  const { products: rawProducts, isLoading: loading } = useProducts(productQueryParams);

  const [heroImage, setHeroImage] = useState<any>(() => getCategoryBanner(categorySlug, subQuery));
  const [title, setTitle] = useState(categorySlug);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  const activeSlides: BannerSlide[] = useMemo(() => {
    const slug = (categorySlug || "all").toLowerCase();
    if (slug === "necklaces" || slug === "necklace") {
      return NECKLACE_BANNER_SLIDES;
    }
    if (slug === "bridal") {
      return [
        { id: "slide-bridal-1", image: bridalBanner },
        { id: "slide-bridal-2", image: bridalbanner1 },
        { id: "slide-bridal-3", image: bridalbanner2 },
        { id: "slide-bridal-4", image: bridalbanner3 },
        { id: "slide-bridal-5", image: bridalbanner4 },
      ];
    }
    if (slug === "all" || !categorySlug || !CATEGORY_BANNERS[slug]) {
      return DEFAULT_BANNER_SLIDES;
    }
    const catBanner = heroImage || CATEGORY_BANNERS[slug] || DEFAULT_BANNER_SLIDES[0].image;
    return [{ id: `slide-${slug}`, image: catBanner }];
  }, [categorySlug, heroImage]);

  const hasMultipleSlides = activeSlides.length > 1;

  // Reset slide index only when category changes
  useEffect(() => {
    setCurrentBannerIndex(0);
  }, [categorySlug]);

  // Auto-scroll default banner slides when multiple slides are active and not hovered
  useEffect(() => {
    if (!hasMultipleSlides || activeSlides.length <= 1 || isBannerHovered) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [hasMultipleSlides, activeSlides.length, isBannerHovered]);

  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const matchedBanner = getCategoryBanner(categorySlug, subQuery);

    const ctx = findInTree(tree, categorySlug);
    if (ctx?.node.image && typeof ctx.node.image === "string") {
      setHeroImage(resolveMediaUrl(ctx.node.image));
    } else {
      setHeroImage(matchedBanner);
    }

    if (ctx?.node.name) {
      setTitle(ctx.node.name);
    } else {
      setTitle(categorySlug);
    }
  }, [tree, categorySlug, subQuery]);

  // Real data lists with counts from Facets
  const displayOccasions = useMemo(() => {
    if (facets?.occasions && facets.occasions.length > 0) {
      return facets.occasions;
    }
    return occasionsList.map((o) => ({ name: o.name, slug: o.slug, count: 0 }));
  }, [facets?.occasions, occasionsList]);

  const displayCollections = useMemo(() => {
    if (facets?.collections && facets.collections.length > 0) {
      return facets.collections;
    }
    return collectionsList.map((c) => ({ name: c.name, slug: c.slug, count: 0 }));
  }, [facets?.collections, collectionsList]);

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
    return PRICE_RANGES.map((r) => ({
      ...r,
      count: rawProducts.filter((p) => p.price >= r.min && p.price <= r.max).length,
    }));
  }, [facets?.priceRanges, rawProducts]);

  // Apply active sidebar filters
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
      if (selectedMaxPrice !== null) {
        if (p.price > selectedMaxPrice) return false;
      }
      return true;
    });
  }, [rawProducts, selectedOccasions, selectedCollections, selectedColors, selectedMaxPrice]);

  const ctx = findInTree(tree, categorySlug);
  const subCategoryItems =
    ctx && ctx.node.children?.length
      ? ctx.node.children.map((c) => ({
        name: c.name,
        slug: c.slug,
        image: resolveMediaUrl(c.image),
      }))
      : ctx?.parent?.children?.length
        ? ctx.parent.children.map((c) => ({
          name: c.name,
          slug: c.slug,
          image: resolveMediaUrl(c.image),
        }))
        : [];

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

  // Laptop & mobile image sources for the current slide
  const desktopBannerSrc =
    activeSlides[currentBannerIndex]?.image ||
    heroImage ||
    DEFAULT_BANNER_SLIDES[0].image;
  const mobileBannerSrc =
    activeSlides[currentBannerIndex]?.mobileImage || desktopBannerSrc;

  /* ── Amama-style Sidebar Component ────────────────────────────────────────── */
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
                  className={`flex items-center space-x-3 cursor-pointer group text-xs ${cnt === 0 && !isChecked
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
                  className={`flex items-center space-x-3 cursor-pointer group text-xs ${cnt === 0 && !isChecked
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

      {/* Accordion 3: Finish / Color */}
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
                  className={`flex items-center space-x-3 cursor-pointer group text-xs ${cnt === 0 && !isChecked
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

      {/* Accordion 4: Price Range */}
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
              <span>{selectedMaxPrice !== null ? "1 selected" : "0 selected"}</span>
              {selectedMaxPrice !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedMaxPrice(null)}
                  className="hover:underline text-stone-700 font-medium"
                >
                  Reset
                </button>
              )}
            </div>
            {displayPriceRanges.map((range) => {
              const isChecked = selectedMaxPrice === range.max;
              const cnt = range.count ?? 0;
              return (
                <label
                  key={range.label}
                  className={`flex items-center space-x-3 cursor-pointer group text-xs ${cnt === 0 && !isChecked
                    ? "text-stone-400 hover:text-stone-600"
                    : "text-stone-600 hover:text-stone-900"
                    }`}
                >
                  <input
                    type="radio"
                    name="sidebar-price"
                    checked={isChecked}
                    onChange={() =>
                      setSelectedMaxPrice(selectedMaxPrice === range.max ? null : range.max)
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
      {(selectedOccasions.length > 0 ||
        selectedCollections.length > 0 ||
        selectedColors.length > 0 ||
        selectedMaxPrice !== null) && (
          <button
            type="button"
            onClick={() => {
              setSelectedOccasions([]);
              setSelectedCollections([]);
              setSelectedColors([]);
              setSelectedMaxPrice(null);
            }}
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

      <section
        onMouseEnter={() => setIsBannerHovered(true)}
        onMouseLeave={() => setIsBannerHovered(false)}
       className="relative h-[100vh] md:h-[80vh] min-h-[480px] md:min-h-[480px] flex items-center justify-center overflow-hidden bg-stone-950 pt-16"
      >
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={hasMultipleSlides ? currentBannerIndex : "single"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* MOBILE view image (below 768px) */}
              <Image
                src={mobileBannerSrc}
                alt="Collection Banner Slide"
                fill
                sizes="100vw"
                className="block md:hidden object-cover object-[center_35%] brightness-100"
              />
              {/* LAPTOP / DESKTOP view image (768px and above) */}
              <Image
                src={desktopBannerSrc}
                alt="Collection Banner Slide"
                fill
                sizes="100vw"
                className="hidden md:block object-cover object-[center_35%] brightness-100"
                priority={currentBannerIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {hasMultipleSlides && activeSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentBannerIndex(
                  (prev) => (prev - 1 + activeSlides.length) % activeSlides.length
                );
              }}
              aria-label="Previous Slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white transition-all backdrop-blur-xs border border-white/10 hover:border-[#C4A064]/50 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentBannerIndex((prev) => (prev + 1) % activeSlides.length);
              }}
              aria-label="Next Slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white transition-all backdrop-blur-xs border border-white/10 hover:border-[#C4A064]/50 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Auto-Scroll Pagination Indicators */}
        {hasMultipleSlides && activeSlides.length > 1 && (
          <div className="absolute bottom-5 z-30 flex items-center justify-center gap-2.5">
            {activeSlides.map((slide, idx) => (
              <button
                key={slide.id || idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentBannerIndex(idx);
                }}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${currentBannerIndex === idx
                  ? "w-8 bg-[#C4A064] shadow-[0_0_10px_rgba(196,160,100,0.8)]"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Bottom Filigree Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C4A064] to-transparent z-20" />
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-6">
          {/* Controls Bar (Amama Header Style: Hide Filter toggle left, count & sort right) */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
            {/* Toggle Filter Button */}
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

            {/* Right Side: Product Count & Sort Selector */}
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
            {/* Desktop Left Sidebar */}
            {showFilter && (
              <aside className="hidden lg:block w-64 shrink-0 pr-4 border-r border-stone-200 sticky top-28 self-start max-h-[calc(100vh-7.5rem)] overflow-y-auto no-scrollbar overscroll-contain">
                <AmamaSidebar />
              </aside>
            )}

            {/* Products Grid Area */}
            <div className="flex-1">
              {loading ? (
                <ProductGridSkeleton count={6} showFilter={showFilter} />
              ) : filteredProducts.length > 0 ? (
                <div
                  className={`grid grid-cols-2 sm:grid-cols-2 ${showFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"
                    } gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-12`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
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
                      setSelectedOccasions([]);
                      setSelectedCollections([]);
                      setSelectedColors([]);
                      setSelectedMaxPrice(null);
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

      {/* Mobile Filter Slide-over Drawer */}
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
                {(selectedOccasions.length > 0 ||
                  selectedCollections.length > 0 ||
                  selectedColors.length > 0 ||
                  selectedMaxPrice !== null) && (
                    <Button
                      variant="outline"
                      className="flex-1 py-3 text-xs uppercase tracking-wider"
                      onClick={() => {
                        setSelectedOccasions([]);
                        setSelectedCollections([]);
                        setSelectedColors([]);
                        setSelectedMaxPrice(null);
                      }}
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

function ProductGridSkeleton({ count = 6, showFilter }: { count?: number; showFilter?: boolean }) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 ${showFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-12 animate-pulse`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative bg-white border border-gray-100 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm"
        >
          <div className="relative aspect-square bg-neutral-200/80 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.8s_infinite]" />
          </div>
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

export default function CategoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="min-h-screen bg-white">
            <Navbar />
            <div className="h-[40vh] bg-stone-900 animate-pulse" />
            <div className="container mx-auto px-6 py-12">
              <ProductGridSkeleton count={8} showFilter={false} />
            </div>
          </div>
        }
      >
        <CategoryContent />
      </Suspense>
    </main>
  );
}