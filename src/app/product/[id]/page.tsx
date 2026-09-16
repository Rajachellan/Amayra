"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { shopApi } from "@/lib/api/shop";
import { mapDetailToProduct, mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useCoupons } from "@/hooks/useCatalogMetadata";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { RelatedProductsRow } from "@/components/products/RelatedProductsRow";
<<<<<<< HEAD
import { ProductReviewsSection } from "@/components/products/ProductReviewsSection";
import { ProductDetailSkeleton } from "@/components/products/ProductDetailSkeleton";
=======
import { formatPrice } from "@/lib/formatPrice";
>>>>>>> c14ba75af9b64383e7b5f4ba4124b6af1ce0dbc2
import {
  Heart,
  Share2,
  Minus,
  Plus,
  Package,
  Gem,
  Globe2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Ruler,
  Award,
  Sparkles,
  ShieldCheck,
  Truck,
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";


function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;
  const { product, images, relatedProducts, pairWithProducts, isLoading } = useProductDetail(slug);
  const { data: publicCoupons = [] } = useCoupons();
  const { addToCartWithQuantity, buyNow } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const activeCoupon = publicCoupons[0];
  const couponCode = activeCoupon?.code || "";
  const couponDiscountText = activeCoupon
    ? `${activeCoupon.discountValue}${activeCoupon.discountType === "percentage" ? "% OFF" : " ₹ OFF"}`
    : "";
  const couponTitleText = activeCoupon?.title || activeCoupon?.description || "Special offer available at checkout";
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    description: true,
    features: false,
    care: false,
    styling: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

  if (isLoading) {
    return <ProductDetailSkeleton />;
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

  const mainSrc =
    typeof product.image === "string"
      ? product.image
      : product.image && typeof product.image === "object" && "src" in product.image
      ? (product.image as { src: string }).src
      : resolveMediaUrl(undefined);
  const thumbs: string[] = (images && images.length)
    ? images.map((img: any) => (typeof img === "string" ? img : img?.src || resolveMediaUrl(undefined)))
    : [mainSrc];
  const catHref = product.categorySlug ? `/category/${product.categorySlug}` : "/category/all";
  const inWishlist = isInWishlist(product.id);
  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 10;
  const maxQty = inStock ? product.stock : 1;

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <Navbar />

      {/* Breadcrumbs — luxury styling */}
      <div className="bg-[#FAF8F3] border-b border-[#C4A064]/20 pt-28 md:pt-32 pb-4 mb-8">
        <nav
          aria-label="Breadcrumb"
          className="container mx-auto px-6"
        >
          <ol className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#666666]">
            <li>
              <Link href="/" className="transition-colors hover:text-[#C4A064]">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-[#C4A064]/40">
              <ChevronRight className="h-3.5 h-3.5 text-[#C4A064]" />
            </li>
            <li>
              <Link href={catHref} className="transition-colors hover:text-[#C4A064]">
                {product.category || "Jewellery"}
              </Link>
            </li>
            <li aria-hidden className="text-[#C4A064]/40">
              <ChevronRight className="h-3.5 h-3.5 text-[#C4A064]" />
            </li>
            <li className="max-w-[220px] truncate text-[#2B2B2B] font-serif capitalize md:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
            {/* Gallery — Sticky on desktop so images remain visible while scrolling */}
            <div className="w-full lg:w-[50%] lg:sticky lg:top-28 lg:self-start">
              <ProductImageGallery
                images={thumbs}
                alt={product.name}
                activeIndex={activeImg}
                onActiveIndexChange={setActiveImg}
              />
            </div>

            {/* Product info */}
            <div className="w-full lg:w-[50%] min-w-0">
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-[#c4a574] hover:text-neutral-900 cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label="Add to wishlist"
                    className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition cursor-pointer ${
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

<<<<<<< HEAD
              {product.shortDescription && (
                <p className="mb-4 text-sm md:text-base text-neutral-600 font-serif leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Price & Discount (Clean, rounded, no decimals) */}
              <div className="mb-6 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-[#d4af37] md:text-4xl font-serif">
                  ₹{formatPrice(product.price)}
                </span>
                {product.oldPrice != null && product.oldPrice > product.price && (
                  <>
                    <span className="text-lg font-medium text-neutral-400 line-through">
                      ₹{formatPrice(product.oldPrice)}
                    </span>
                    <span className="rounded bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                      {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                    </span>
                  </>
                )}
                <span className="w-full text-xs text-neutral-500 font-medium">Incl. of all taxes</span>
=======
              <div className="mb-6 flex items-baseline gap-3">
                {product.oldPrice && (
                  <span className="text-base text-neutral-400 line-through font-medium">
                    ₹{formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-2xl font-serif font-bold text-[#d4af37]">
                  ₹{formatPrice(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                )}
>>>>>>> c14ba75af9b64383e7b5f4ba4124b6af1ce0dbc2
              </div>

              {activeCoupon && (
                <div className="mb-6 overflow-hidden rounded-xl border border-amber-200/80 bg-gradient-to-r from-[#FFFDF7] via-[#FFF9EE] to-[#FFF6E5] p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#a8895c]">
                        <Sparkles className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8895c]">
                            SPECIAL OFFER
                          </span>
                          <span className="rounded-full bg-[#1a3d2f] px-2 py-0.5 text-[9px] font-bold text-white">
                            {couponDiscountText}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-neutral-800">{couponTitleText}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard.writeText(couponCode);
                        setCopiedCode(true);
                        toast.success(`Coupon code ${couponCode} copied!`);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-[#c4a574] bg-white px-3 py-1.5 text-xs font-bold text-[#1a3d2f] shadow-sm transition hover:bg-[#faf6f0] cursor-pointer"
                    >
                      {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-[#c4a574]" />}
                      {copiedCode ? "COPIED" : couponCode}
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-8 rounded-xl border border-neutral-200/80 bg-white p-4 text-xs">
                <div className="mb-2 flex items-center justify-between border-b border-neutral-100 pb-2 font-bold uppercase tracking-wider text-neutral-700">
                  <span>Estimated Delivery</span>
                  <span className="text-emerald-700 font-semibold">In Stock</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="font-bold text-neutral-900">Pan India</span>
                    <p className="text-neutral-500">3–5 days (Mon, 24 Aug – Wed, 26 Aug)</p>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900">International (INT)</span>
                    <p className="text-neutral-500">8–12 days (Sat, 29 Aug – Thu, 3 Sep)</p>
                  </div>
                </div>
              </div>

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

              {/* Quantity + CTAs (Full width to eliminate right side empty whitespace) */}
              <div className="mb-10 space-y-4 w-full">
                <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
                  {/* Quantity selector */}
                  <div className="flex shrink-0 w-full sm:w-36 items-stretch border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-xs min-h-[48px]">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex w-11 items-center justify-center text-neutral-600 transition hover:bg-neutral-50 cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex flex-1 items-center justify-center border-x border-neutral-200 text-sm font-semibold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={!inStock || quantity >= maxQty}
                      onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                      className="flex w-11 items-center justify-center text-neutral-600 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#1a3d2f] to-[#2e5a44] py-3.5 px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:shadow-[0_8px_25px_rgba(26,61,47,0.4)] hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400 min-h-[48px] flex items-center justify-center text-center"
                  >
                    Add to Cart
                  </button>

                  {/* Buy It Now Button */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!inStock}
                    className="flex-1 rounded-xl bg-[#d4af37] py-3.5 px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a2e22] transition hover:bg-[#c59b27] hover:shadow-md cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400 min-h-[48px] flex items-center justify-center text-center"
                  >
                    Buy It Now
                  </button>
                </div>

                {!inStock && (
                  <p className="text-sm font-medium text-red-600">
                    Out of stock — update stock in admin or choose another piece.
                  </p>
                )}
              </div>

              {/* 5 Homepage Highlight Category Icons */}
              <div className="my-8 rounded-2xl bg-[#f6ead9]/60 p-4 sm:p-5 border border-[#e8d7c3]/80 shadow-xs">
                <div className="grid grid-cols-2 gap-y-6 gap-x-2 sm:grid-cols-5 items-center justify-center">
                  {[
                    {
                      image: "/aimated-icons/gate.png",
                      title: "HANDCRAFTED IN INDIA",
                    },
                    {
                      image: "/aimated-icons/box.png",
                      title: "PREMIUM PACKAGING",
                    },
                    {
                      image: "/aimated-icons/shield.png",
                      title: "100% SECURE PAYMENTS",
                    },
                    {
                      image: "/aimated-icons/fast-delivery.png",
                      title: "PAN INDIA DELIVERY",
                    },
                    {
                      image: "/aimated-icons/heart.png",
                      title: "CURATED WITH LOVE",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group flex flex-col items-center justify-center text-center px-1"
                    >
                      <div className="relative mb-2 flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          unoptimized
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                          sizes="56px"
                        />
                      </div>
                      <h4 className="text-[9px] sm:text-[10px] font-serif font-bold uppercase leading-snug tracking-[0.08em] text-[#1C1917] group-hover:text-[#2E5A44] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
              {/* Accordions */}
              <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
                {/* 1. Description Accordion */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("description")}
                    className="flex w-full items-center justify-between text-left font-serif text-base font-medium text-neutral-900 hover:text-[#c4a574] transition"
                  >
                    <span>Description</span>
                    {openAccordions.description ? <ChevronUp className="h-4 w-4 text-neutral-500" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
                  </button>
                  {openAccordions.description && (
                    <div className="mt-4 space-y-5 text-xs leading-relaxed text-neutral-600">
                      {product.description && <p className="whitespace-pre-line">{product.description}</p>}

                      {/* Product Specifications Table */}
                      <div className="rounded-lg bg-white p-4 border border-neutral-100 shadow-sm space-y-2">
                        <p className="font-bold uppercase tracking-wider text-neutral-900 text-[11px] mb-2 border-b border-neutral-100 pb-1">Product Specification</p>
                        {product.sku && (
                          <p><strong className="text-neutral-800">SKU:</strong> <span className="font-mono">{product.sku}</span></p>
                        )}
                        <p><strong className="text-neutral-800">Material:</strong> {product.material || product.specifications?.material || "Gold-tone metal alloy base"}</p>
                        {(product.specifications?.inspiration || product.specifications?.craftsmanship) && (
                          <p><strong className="text-neutral-800">The Inspiration:</strong> {product.specifications.inspiration || product.specifications.craftsmanship}</p>
                        )}
                        <p><strong className="text-neutral-800">Finish:</strong> {product.specifications?.finish || product.specifications?.waterproof || "Warm gold finish with contrasting dark-toned outlines around kundan, polki and mozanite stones. Complementing enamel designs, motifs and beads."}</p>
                        {(product.color || (product.specifications as any)?.color || (product.specifications as any)?.colour) && (
                          <p><strong className="text-neutral-800">Colour:</strong> {product.color || (product.specifications as any)?.color || (product.specifications as any)?.colour}</p>
                        )}
                        {(product.length || product.breadth || product.height) && (
                          <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-x-6 gap-y-1 text-neutral-800">
                            {product.length && <p><strong>Length:</strong> {product.length}</p>}
                            {product.breadth && <p><strong>Breadth / Width:</strong> {product.breadth}</p>}
                            {product.height && <p><strong>Height:</strong> {product.height}</p>}
                          </div>
                        )}
                      </div>

                      {/* Perfect for occasions */}
                      {product.keyHighlights && product.keyHighlights.length > 0 && (
                        <div className="space-y-2">
                          <p className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">Perfect for occasions</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {product.keyHighlights.map((occ, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center rounded-full bg-[#f6ead9]/80 px-3 py-1 text-xs font-medium text-[#735427] border border-[#e8d7c3]"
                              >
                                {occ}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Styling Inspiration */}
                      {product.stylingInspiration && product.stylingInspiration.length > 0 && (
                        <div className="space-y-2">
                          <p className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">Styling Inspiration</p>
                          <ul className="list-disc space-y-1.5 pl-4 text-neutral-600">
                            {product.stylingInspiration.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Product Features Accordion */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("features")}
                    className="flex w-full items-center justify-between text-left font-serif text-base font-medium text-neutral-900 hover:text-[#c4a574] transition"
                  >
                    <span>Product Features</span>
                    {openAccordions.features ? <ChevronUp className="h-4 w-4 text-neutral-500" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
                  </button>
                  {openAccordions.features && (
                    <div className="mt-4 space-y-3 text-xs leading-relaxed text-neutral-600">
                      {product.productFeatures && product.productFeatures.length > 0 ? (
                        product.productFeatures.map((feat: any, idx: number) => {
                          if (typeof feat === "string") {
                            return <p key={idx}>{feat}</p>;
                          }
                          return (
                            <div key={idx} className="space-y-1">
                              <p className="font-bold text-neutral-800">{feat.title}:</p>
                              {feat.description && <p className="text-neutral-600">{feat.description}</p>}
                            </div>
                          );
                        })
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <p className="font-bold text-neutral-800">Timeless Designs:</p>
                            <p>Every accessory is designed to add a graceful touch to every look, ensuring a hint of classic, timeless charm that will never go out of style.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">Trendsetting Pieces:</p>
                            <p>Curated by drawing major inspiration from the latest fashion jewellery trends to bring a fresh, modern, diva-like look.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">Superior Quality Finish:</p>
                            <p>Curated with skin-friendly materials plated with 18k gold, rhodium, or silver for lasting radiance.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">Enjoy Comfortable Wear:</p>
                            <p>Lightweight style with skin-safe materials offering highest comfort from morning to night.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Care Tips Accordion */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("care")}
                    className="flex w-full items-center justify-between text-left font-serif text-base font-medium text-neutral-900 hover:text-[#c4a574] transition"
                  >
                    <span>Jewellery Care Tips</span>
                    {openAccordions.care ? <ChevronUp className="h-4 w-4 text-neutral-500" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
                  </button>
                  {openAccordions.care && (
                    <div className="mt-4 space-y-3 text-xs leading-relaxed text-neutral-600">
                      {product.careLabel && product.careLabel.length > 0 ? (
                        <div className="space-y-2">
                          {product.careLabel.map((item, idx) => (
                            <p key={idx} className="whitespace-pre-line leading-relaxed">{item}</p>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="font-semibold text-neutral-800">6 Little Secrets to Keep Your Jewellery Looking Gorgeous</p>
                          <div>
                            <p className="font-bold text-neutral-800">1. Jewellery loves to stay dry.</p>
                            <p>Take it off before a shower, swim, or washing up. Water and moisture can make your favourite pieces lose their shine faster.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">2. Perfume first, jewellery last.</p>
                            <p>Your perfume, lotion and hairspray should get their moment before you put on your jewellery. Chemicals can affect the finish over time.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">3. Give every piece its own little home.</p>
                            <p>Store your jewellery in a soft pouch or box, preferably separately. This helps prevent scratches, tangles and unnecessary rubbing.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">4. Sweat? Give it a wipe!</p>
                            <p>Heading to the gym or out in the heat? It's best to remove your jewellery. After wearing, gently wipe it with a soft, dry cloth.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">5. Handle your pretties gently!</p>
                            <p>Chains, clasps, beads and stones can be delicate. Avoid pulling, twisting or bending them - treat them as gently as you would your favourite silk outfit!</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">6. A little wipe goes a long way.</p>
                            <p>After every wear, give your jewellery a quick wipe with a soft, dry cotton or microfiber cloth. Avoid soaking or using harsh cleaners.</p>
                          </div>
                          <div className="rounded-lg bg-[#FAF8F3] p-3 border border-[#e8d7c3]/60">
                            <p className="font-bold text-neutral-800">The golden rule: Last on, first off!</p>
                            <p className="italic text-neutral-700">Put your jewellery on after getting ready, and take it off before changing, bathing or going to bed. This one simple habit can help your pieces stay beautiful for longer.</p>
                          </div>
                          <p className="italic text-neutral-500">Because every beautiful piece deserves a little Tender Loving Care.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 4. Styling Tips Accordion */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("styling")}
                    className="flex w-full items-center justify-between text-left font-serif text-base font-medium text-neutral-900 hover:text-[#c4a574] transition"
                  >
                    <span>Styling Tips</span>
                    {openAccordions.styling ? <ChevronUp className="h-4 w-4 text-neutral-500" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
                  </button>
                  {openAccordions.styling && (
                    <div className="mt-4 space-y-3 text-xs leading-relaxed text-neutral-600">
                      {product.stylingTips && product.stylingTips.length > 0 ? (
                        <div className="space-y-2">
                          {product.stylingTips.map((tip, idx) => (
                            <p key={idx} className="whitespace-pre-line leading-relaxed">{tip}</p>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="font-semibold text-neutral-800">6 Easy Jewellery Styling Tips</p>
                          <div>
                            <p className="font-bold text-neutral-800">1. Let your jewellery set the mood.</p>
                            <p>Choosing a statement piece? Keep the rest of your look simple and let your jewellery take centre stage. For a minimal look, layer a few delicate pieces together.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">2. Mix, match & make it yours.</p>
                            <p>Don't be afraid to pair different designs, textures or finishes. Sometimes, the most unexpected combinations create the prettiest looks.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">3. Balance is everything.</p>
                            <p>If you're wearing a bold piece around your face, keep the rest of your jewellery subtle - or go all out for a festive, statement look. There are no hard rules, just find your balance!</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">4. Style according to the neckline.</p>
                            <p>Use your outfit's neckline as your styling guide. A necklace can beautifully complement an open neckline, while earrings can add impact when your outfit is more covered.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">5. Layer with intention.</p>
                            <p>When layering necklaces, bracelets or rings, play with different lengths and sizes. Give each piece a little space to shine rather than letting everything compete for attention.</p>
                          </div>
                          <div>
                            <p className="font-bold text-neutral-800">6. Day to night, just switch it up.</p>
                            <p>The same jewellery can create completely different looks. Keep it understated for the day and add a few more pieces for an effortlessly elevated evening or festive look.</p>
                          </div>
                          <div className="rounded-lg bg-[#FAF8F3] p-3 border border-[#e8d7c3]/60">
                            <p className="font-bold text-neutral-800">Styling secret:</p>
                            <p className="italic text-neutral-700">There's no "right" way to wear jewellery. Your jewellery should reflect your personality, mood and style. If you love the look, you're wearing it right.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Pair It With Section */}
      {((pairWithProducts && pairWithProducts.length > 0) || (relatedProducts && relatedProducts.length > 3)) && (
        <RelatedProductsRow
          title="Pair It With"
          products={pairWithProducts && pairWithProducts.length > 0 ? pairWithProducts : relatedProducts.slice(3)}
          shopAllHref={catHref}
        />
      )}

      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <RelatedProductsRow
          title="You May Also Like"
          products={relatedProducts}
          shopAllHref={catHref}
        />
      )}

      {/* Customer Reviews Section */}
      {product && (
        <ProductReviewsSection
          productSlug={product.slug || slug}
          productId={product.id}
          productName={product.name}
          productImage={thumbs[0] || (typeof product.image === "string" ? product.image : undefined)}
        />
      )}

      <Footer />
    </main>
  );
}

export default function ProductPage() {
  return (
    <React.Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail />
    </React.Suspense>
  );
}
