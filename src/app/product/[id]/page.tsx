"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { shopApi } from "@/lib/api/shop";
import { mapDetailToProduct, mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { RelatedProductsRow } from "@/components/products/RelatedProductsRow";
import {
  Heart,
  Share2,
  Minus,
  Plus,
  Package,
  Gem,
  Globe2,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
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

function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;
  const { addToCartWithQuantity, buyNow } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeImg, setActiveImg] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    shopApi
      .productBySlug(slug)
      .then(async (detail) => {
        if (cancelled) return;
        const imgs = collectDetailImages(detail);
        setImages(imgs.length ? imgs : [resolveMediaUrl(undefined)]);
        setActiveImg(0);
        setQuantity(1);
        setProduct(mapDetailToProduct(detail));
        const catSlug =
          detail.category && typeof detail.category === "object" && "slug" in detail.category
            ? (detail.category as { slug: string }).slug
            : undefined;
        
        let relatedItems: any[] = [];
        if (catSlug) {
          try {
            const r = await shopApi.products({ category: catSlug, limit: 8, page: 1 });
            relatedItems = r.items.filter((i) => i.slug !== detail.slug);
          } catch (e) {
            console.error("Failed to fetch related products by category:", e);
          }
        }
        
        if (relatedItems.length === 0) {
          try {
            const r = await shopApi.products({ limit: 8, page: 1 });
            relatedItems = r.items.filter((i) => i.slug !== detail.slug);
          } catch (e) {
            console.error("Failed to fetch fallback products:", e);
          }
        }

        if (cancelled) return;
        const mapped = relatedItems.slice(0, 6).map(mapListItemToProduct);
        setRelatedProducts(mapped);
      })
      .catch(() => {
        if (!cancelled) setProduct(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleShare = useCallback(async () => {
    if (!product) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* user cancelled share */
    }
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    if (!product.slug?.trim()) {
      toast.error("This product cannot be added to cart.");
      return;
    }
    if (product.stock <= 0) {
      toast.error("This item is out of stock.");
      return;
    }
    if (product.sizes?.length && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} available.`);
      return;
    }
    addToCartWithQuantity(product, quantity);
  }, [addToCartWithQuantity, product, quantity, selectedSize]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    if (!product.slug?.trim()) {
      toast.error("This product cannot be purchased online.");
      return;
    }
    if (product.stock <= 0) {
      toast.error("This item is out of stock.");
      return;
    }
    if (product.sizes?.length && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} available.`);
      return;
    }
    buyNow(product, quantity);
    router.push("/checkout");
  }, [buyNow, product, quantity, router, selectedSize]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#faf9f7]">
        <Navbar />
        <div className="flex flex-grow items-center justify-center py-40">
          <p className="font-serif text-sm uppercase tracking-widest text-neutral-400">Loading…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-[#faf9f7]">
        <Navbar />
        <div className="flex flex-grow items-center justify-center py-40">
          <h1 className="font-serif text-3xl text-neutral-800">Product Not Found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const mainSrc = typeof product.image === "string" ? product.image : resolveMediaUrl(undefined);
  const thumbs = images.length ? images : [mainSrc];
  const catHref = product.categorySlug ? `/category/${product.categorySlug}` : "/category/all";
  const inWishlist = isInWishlist(product.id);
  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 10;
  const maxQty = inStock ? product.stock : 1;

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <Navbar />

      {/* Breadcrumbs — high contrast, always visible */}
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto px-6 pb-4 pt-28 md:pt-32"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-600 md:text-xs">
          <li>
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-neutral-400">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link href={catHref} className="transition-colors hover:text-neutral-900">
              {product.category}
            </Link>
          </li>
          <li aria-hidden className="text-neutral-400">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li className="max-w-[200px] truncate text-neutral-900 md:max-w-none">{product.name}</li>
        </ol>
      </nav>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-14 xl:gap-20">
            {/* Gallery */}
            <div className="w-full lg:w-[52%]">
              <ProductImageGallery
                images={thumbs}
                alt={product.name}
                activeIndex={activeImg}
                onActiveIndexChange={setActiveImg}
              />
            </div>

            {/* Product info */}
            <div className="w-full lg:w-[48%]">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {product.isNewArrival && (
                    <span className="rounded-md bg-[#d4c4a8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                      Party Jewels
                    </span>
                  )}
                  {lowStock && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      {product.stock} left in stock
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void handleShare()}
                    aria-label="Share product"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-[#c4a574] hover:text-neutral-900"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label="Add to wishlist"
                    className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition ${
                      inWishlist
                        ? "border-[#c4a574] bg-[#c4a574] text-white"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-[#c4a574]"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>

              <h1 className="mb-2 text-2xl font-bold leading-tight text-neutral-900 md:text-3xl">
                {product.name}
              </h1>
              {product.material && (
                <p className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
                  <span className="inline-block h-3 w-3 rounded-sm bg-[#d4a853]" />
                  {product.material}
                </p>
              )}

              <div className="mb-8 flex flex-wrap items-baseline gap-3">
                {product.oldPrice != null && (
                  <span className="text-lg font-medium text-[#1a3d2f] line-through opacity-85">
                    ₹ {product.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold text-[#d4af37] md:text-4xl">
                  ₹ {product.price.toLocaleString()}
                </span>
                <span className="w-full text-xs text-neutral-500">Incl. of all taxes</span>
              </div>

              {product.description && (
                <p className="mb-8 max-w-lg text-sm leading-relaxed text-neutral-600">
                  {product.description}
                </p>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Select size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] border px-4 py-2.5 text-sm font-medium transition ${
                          selectedSize === size
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + CTAs */}
              <div className="mb-10 space-y-4">
                <div className="flex w-full max-w-md items-stretch border border-neutral-200 bg-white">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex w-14 items-center justify-center text-neutral-600 transition hover:bg-neutral-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex flex-1 items-center justify-center border-x border-neutral-200 text-lg font-semibold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={!inStock || quantity >= maxQty}
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    className="flex w-14 items-center justify-center text-neutral-600 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {!inStock && (
                  <p className="text-sm font-medium text-red-600">
                    Out of stock — update stock in admin or choose another piece.
                  </p>
                )}

                <div className="flex max-w-md flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#1a3d2f] to-[#2e5a44] py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition hover:shadow-[0_8px_25px_rgba(26,61,47,0.4)] hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!inStock}
                    className="flex-1 rounded-xl bg-[#d4af37] py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1a2e22] transition hover:bg-[#c59b27] hover:shadow-md cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400"
                  >
                    Buy It Now
                  </button>
                </div>
              </div>

              {/* Specs */}
              {(product.material || product.weight) && (
                <div className="mb-10 grid grid-cols-2 gap-4 rounded-xl border border-neutral-100 bg-white p-5">
                  {product.material && (
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        Material
                      </p>
                      <p className="text-sm font-medium text-neutral-800">{product.material}</p>
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        Weight
                      </p>
                      <p className="text-sm font-medium text-neutral-800">{product.weight}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 border-t border-neutral-200 pt-8">
                {[
                  { icon: Package, label: "Premium Packaging" },
                  { icon: Gem, label: "Unbeatable Craftsmanship" },
                  { icon: Globe2, label: "Shipping Worldwide" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#e8dfd0] bg-[#faf6f0] text-[#a8895c]">
                      <Icon className="h-6 w-6" strokeWidth={1.25} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase leading-snug tracking-wide text-neutral-600">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <RelatedProductsRow
          title="You May Also Like"
          products={relatedProducts}
          shopAllHref={catHref}
        />
      )}

      {relatedProducts.length > 3 && (
        <RelatedProductsRow
          title="Pair It With"
          products={relatedProducts.slice(3)}
          shopAllHref={catHref}
        />
      )}

      <Footer />
    </main>
  );
}

export default function ProductPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#faf9f7] font-serif uppercase tracking-widest text-neutral-400">
          Loading Product...
        </div>
      }
    >
      <ProductDetail />
    </React.Suspense>
  );
}
