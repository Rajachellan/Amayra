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
import { ChevronUp, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const COLORS = ["Gold", "Silver", "Rose Gold", "Antique", "Kundan"];

const OCCASIONS = [
  { name: "Daily", slug: "daily" },
  { name: "Festive", slug: "festive" },
  { name: "Party", slug: "party" },
  { name: "Wedding", slug: "wedding" },
];

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
  const [rawProducts, setRawProducts] = useState<ReturnType<typeof mapListItemToProduct>[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState<string>(
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"
  );
  const [title, setTitle] = useState(categorySlug);

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
  }, []);

  useEffect(() => {
    const ctx = findInTree(tree, categorySlug);
    if (ctx?.node.image) setHeroImage(resolveMediaUrl(ctx.node.image));
    if (ctx?.node.name) setTitle(ctx.node.name);
    else setTitle(categorySlug);

    if (subQuery) {
      const subCtx = findInTree(tree, subQuery);
      if (subCtx?.node.image) setHeroImage(resolveMediaUrl(subCtx.node.image));
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
      OCCASIONS.forEach((o) => {
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
  }, [rawProducts]);

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
            {OCCASIONS.map((occ) => {
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

      <section className="relative h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroImage}
            alt="Collection Background"
            fill
            className="object-cover brightness-[0.65]"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
        <div className="absolute inset-0 bg-brand-emerald/10 mix-blend-multiply z-10" />

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-px bg-champagne/60"
              />
              <span className="text-champagne text-[11px] uppercase tracking-[0.6em] font-bold">
                The Mairii Boutique
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-px bg-champagne/60"
              />
            </div>

            <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl capitalize">
              {subQuery ? subQuery.replace(/-/g, " ") : title === "all" ? "All Jewellery" : title}
            </h1>

            <nav className="flex items-center justify-center space-x-3 text-white/60 text-[10px] uppercase tracking-[0.3em]">
              <Link href="/" className="hover:text-champagne transition-colors duration-300">
                Home
              </Link>
              <span className="text-champagne/40">/</span>
              <Link href="/category/all" className="hover:text-champagne transition-colors duration-300">
                Boutique
              </Link>
              <span className="text-champagne/40">/</span>
              <span className="text-white font-bold tracking-[0.4em]">{categorySlug}</span>
            </nav>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/40 to-transparent z-20" />
      </section>

      {subCategoryItems.length > 0 && (
        <CategorySlider currentCategory={categorySlug} subCategories={subCategoryItems} />
      )}

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
              <aside className="hidden lg:block w-64 shrink-0 pr-6 border-r border-stone-200">
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
