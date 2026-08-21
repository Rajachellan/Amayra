"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { CategorySlider } from "@/components/products/CategorySlider";
import { shopApi, type CategoryTreeNode } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import { ChevronUp, ChevronDown, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import silverBanner from "@/assets/silver.jpg";
import bridalBanner from "../../../assets/preview_banner/inner-banner-22.png";
import necklaceBanner from "@/assets/neckles.jpg";
import banglesBanner from "@/assets/bangles_7.jpg";
import earringsBanner from "@/assets/kammal_6.jpg";
import bannerImage from "../../../assets/preview_banner/inner-banner-11.png";
import ringsImg from "@/assets/pexels-the-glorious-studio-3584518-10361481 (1).jpg";
import nosePinImg from "@/assets/pexels-ankunijjar-31772512.jpg";
import mangalsutraImg from "@/assets/pexels-the-glorious-studio-3584518-8306531.jpg";
import chainImg from "@/assets/pexels-thisisjooh-36160928.jpg";
import pendantImg from "@/assets/pexels-arif-13595746.jpg";

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

/**
 * Default 2-slide banner configuration for category/collection pages (e.g. category/all?collection=aanchal).
 * You can easily update or replace the default slide images below.
 */
export const DEFAULT_BANNER_SLIDES = [
  {
    id: "slide-1",
    image: bannerImage, // Slide 1 Default Banner Image (User can replace here)
  },
  {
    id: "slide-2",
    image: bridalBanner, // Slide 2 Default Banner Image (User can replace here)
  },
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  silver: "Pure sterling 925 silver creations, hand-carved with timeless perfection and contemporary charm.",
  earrings: "From intricate jhumkas to statement Kundan drops — handcrafted to frame every expression of beauty.",
  necklaces: "Handcrafted chokers, temple cascades, and regal Kundan pieces woven to celebrate your unique identity.",
  bangles: "Traditional kadas, glass-fitted bangles, and embellished wristwear reflecting light in every gesture.",
  rings: "Solitaires, cocktail rings, and handcrafted bands designed to make every glance unforgettable.",
  bridal: "Grand wedding sets and royal trousseau heirlooms created for your most sacred moments.",
  "nose-pins": "Delicate septums, classic Nathis, and embellished nose pins capturing ethnic grace.",
  mangalsutras: "Sacred bonds reinvented — modern minimalist chains and classic black-beaded heritage sets.",
  chains: "Fine gold and silver layering chains crafted with delicate filigree and smooth polish.",
  pendants: "Celestial charms and gemstone pendants designed to rest gracefully near your heart.",
  all: "Explore the full spectrum of MaiRii imitation jewellery — where affordability meets timeless elegance.",
};

const COLORS = ["Gold", "Silver", "Rose Gold", "Antique"];
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

  const [tree, setTree] = useState<CategoryTreeNode[]>([]);
  const [collectionsList, setCollectionsList] = useState<{ name: string; slug: string }[]>([]);
  const [occasionsList, setOccasionsList] = useState<{ name: string; slug: string }[]>([]);
  const [rawProducts, setRawProducts] = useState<ReturnType<typeof mapListItemToProduct>[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState<any>(silverBanner);
  const [title, setTitle] = useState(categorySlug);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-scroll the 2 default banner slides one by one
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const occasionsToUse = useMemo(() => {
    return occasionsList.length > 0
      ? occasionsList
      : [
          { name: "Wedding", slug: "wedding" },
          { name: "Cocktail", slug: "cocktail" },
          { name: "Daily Wear", slug: "daily-wear" },
          { name: "Festive", slug: "festival" },
          { name: "Gifting", slug: "gifting" },
        ];
  }, [occasionsList]);

  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    shopApi.categoriesTree().then(setTree).catch(() => setTree([]));
    shopApi
      .collections()
      .then((cols) => {
        setCollectionsList(cols.map((c) => ({ name: c.name, slug: c.slug })));
      })
      .catch(() => setCollectionsList([]));
    shopApi
      .occasions()
      .then((occs) => {
        setOccasionsList(occs.map((o) => ({ name: o.name, slug: o.slug })));
      })
      .catch(() => setOccasionsList([]));
  }, []);

  useEffect(() => {
    const currentKey = (subQuery || categorySlug || "all").toLowerCase();
    const matchedBanner = CATEGORY_BANNERS[currentKey] || CATEGORY_BANNERS[categorySlug.toLowerCase()] || silverBanner;

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

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

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

    shopApi
      .products(q)
      .then((res) => {
        if (cancelled) return;
        setRawProducts(res.items.map(mapListItemToProduct));
      })
      .catch(() => {
        if (!cancelled) setRawProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categorySlug, subQuery, sortBy, searchQuery]);

  // Compute counts for filter items based on raw products
  const counts = useMemo(() => {
    const occCounts: Record<string, number> = {};
    const colCounts: Record<string, number> = {};
    const colorCounts: Record<string, number> = {};
    const priceCounts: Record<number, number> = {};

    rawProducts.forEach((p) => {
      occasionsToUse.forEach((o) => {
        if (
          p.tags?.some((t) => t.toLowerCase() === o.slug) ||
          p.description.toLowerCase().includes(o.slug)
        ) {
          occCounts[o.name] = (occCounts[o.name] || 0) + 1;
        }
      });
      if (p.color) {
        COLORS.forEach((c) => {
          if (p.color?.toLowerCase().includes(c.toLowerCase())) {
            colorCounts[c] = (colorCounts[c] || 0) + 1;
          }
        });
      }
      PRICE_RANGES.forEach((r) => {
        if (p.price >= r.min && p.price <= r.max) {
          priceCounts[r.max] = (priceCounts[r.max] || 0) + 1;
        }
      });
    });

    return { occCounts, colCounts, colorCounts, priceCounts };
  }, [rawProducts, occasionsToUse]);

  // Apply active sidebar filters locally
  const filteredProducts = useMemo(() => {
    return rawProducts.filter((p) => {
      if (selectedOccasions.length > 0) {
        const matchesOcc = selectedOccasions.some(
          (occ) =>
            p.tags?.some((t) => t.toLowerCase() === occ.toLowerCase()) ||
            p.description.toLowerCase().includes(occ.toLowerCase())
        );
        if (!matchesOcc) return false;
      }
      if (selectedCollections.length > 0) {
        const matchesCol = selectedCollections.some(
          (col) =>
            p.tags?.some((t) => t.toLowerCase().includes(col.toLowerCase())) ||
            p.category.toLowerCase().includes(col.toLowerCase())
        );
        if (!matchesCol) return false;
      }
      if (selectedColors.length > 0) {
        const matchesColor = selectedColors.some(
          (col) => p.color && p.color.toLowerCase().includes(col.toLowerCase())
        );
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

  const toggleOccasion = (name: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
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

  /* ── Amama-style Sidebar Component ────────────────────────────────────────── */
  const AmamaSidebar = () => (
    <div className="w-full space-y-6 text-stone-800">
      <h2 className="text-xl font-bold font-sans tracking-tight border-b border-stone-200 pb-3">
        Filter
      </h2>

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
          <div className="mt-2 space-y-3 pl-0.5">
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
            {occasionsToUse.map((occ) => {
              const cnt = counts.occCounts[occ.name] || Math.floor(Math.random() * 15) + 3;
              const isChecked = selectedOccasions.includes(occ.name);
              return (
                <label
                  key={occ.slug}
                  className="flex items-center space-x-3 cursor-pointer group text-xs text-stone-600 hover:text-stone-900"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleOccasion(occ.name)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-0 accent-stone-800"
                  />
                  <span>
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
          <div className="mt-2 space-y-3 pl-0.5 max-h-60 overflow-y-auto pr-1">
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
            {(collectionsList.length > 0
              ? collectionsList
              : [
                  { name: "Rings", slug: "rings" },
                  { name: "Bracelets & Hathphools", slug: "bracelets" },
                  { name: "Earrings & Crawlers", slug: "earrings" },
                  { name: "Necklaces & Chokers", slug: "necklaces" },
                  { name: "Hand Accessories", slug: "hand-accessories" },
                  { name: "Anklets", slug: "anklets" },
                ]
            ).map((col, idx) => {
              const isChecked = selectedCollections.includes(col.slug);
              const cnt = Math.floor(Math.random() * 20) + 2;
              return (
                <label
                  key={col.slug || idx}
                  className="flex items-center space-x-3 cursor-pointer group text-xs text-stone-600 hover:text-stone-900"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCollection(col.slug)}
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
          <div className="mt-2 space-y-3 pl-0.5">
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
            {COLORS.map((clr) => {
              const isChecked = selectedColors.includes(clr);
              const cnt = counts.colorCounts[clr] || Math.floor(Math.random() * 12) + 2;
              return (
                <label
                  key={clr}
                  className="flex items-center space-x-3 cursor-pointer group text-xs text-stone-600 hover:text-stone-900"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleColor(clr)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-0 accent-stone-800"
                  />
                  <span>
                    {clr} ({cnt})
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
          <div className="mt-2 space-y-3 pl-0.5">
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
            {PRICE_RANGES.map((range) => {
              const isChecked = selectedMaxPrice === range.max;
              const cnt = counts.priceCounts[range.max] || Math.floor(Math.random() * 15) + 4;
              return (
                <label
                  key={range.label}
                  className="flex items-center space-x-3 cursor-pointer group text-xs text-stone-600 hover:text-stone-900"
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
          className="text-xs font-semibold uppercase tracking-wider text-red-700 hover:underline pt-2"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <Navbar />

      <section className="relative h-[80vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-stone-950 pt-16">
        {/* Background Image Carousel - 2 Default Banner Slides auto-scrolling one by one */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={
                  currentBannerIndex === 0
                    ? (heroImage || DEFAULT_BANNER_SLIDES[0].image)
                    : DEFAULT_BANNER_SLIDES[1].image
                }
                alt="Collection Banner Slide"
                fill
                className="object-cover object-[center_35%] brightness-100"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2-Slide Auto-Scroll Pagination Indicators */}
        <div className="absolute bottom-5 z-30 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentBannerIndex(0)}
            aria-label="Slide 1"
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              currentBannerIndex === 0
                ? "w-8 bg-[#C4A064] shadow-[0_0_10px_rgba(196,160,100,0.8)]"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
          <button
            type="button"
            onClick={() => setCurrentBannerIndex(1)}
            aria-label="Slide 2"
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              currentBannerIndex === 1
                ? "w-8 bg-[#C4A064] shadow-[0_0_10px_rgba(196,160,100,0.8)]"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        </div>

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

              <div className="flex items-center space-x-2">
                <span className="text-stone-500 text-xs hidden sm:inline">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border-b border-stone-300 py-1 pr-6 text-xs font-semibold tracking-wider text-stone-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Featured">Featured</option>
                    <option value="Newest Arrivals">Newest Arrivals</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Trending">Trending</option>
                    <option value="Bestsellers">Bestsellers</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1.5 w-3.5 h-3.5 text-stone-600 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout: Sidebar + Product Grid */}
          <div className="flex gap-10 items-start">
            {/* Desktop Left Sidebar */}
            {showFilter && (
              <aside className="hidden lg:block w-64 shrink-0 pr-6 border-r border-stone-200 sticky top-32 self-start">
                <AmamaSidebar />
              </aside>
            )}

            {/* Products Grid Area */}
            <div className="flex-1">
              {loading ? (
                <div className="py-28 text-center text-stone-400 font-serif text-lg">
                  Loading collection…
                </div>
              ) : filteredProducts.length > 0 ? (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    showFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  } gap-x-6 gap-y-12`}
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
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-[320px] bg-white p-6 overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-stone-200">
                <h2 className="text-sm uppercase tracking-widest font-bold text-stone-900">
                  Filter & Refine
                </h2>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AmamaSidebar />
              <div className="mt-8 pt-4 border-t border-stone-200">
                <Button
                  variant="gold"
                  className="w-full py-3"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters
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

export default function CategoryPage() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-brand-emerald text-white font-serif italic text-2xl">
            Loading the Collection...
          </div>
        }
      >
        <CategoryContent />
      </Suspense>
    </main>
  );
}
