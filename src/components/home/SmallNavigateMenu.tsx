"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product as GlobalProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { shopApi } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

type Tab = "bestsellers" | "newarrivals" | "trending";

type RowProduct = {
    idStr: string;
    slug: string;
    name: string;
    price: string;
    oldPrice?: string;
    category: Tab;
    badge?: string;
    image: string;
    accent: string;
    global: GlobalProduct;
};

function toRow(
    p: GlobalProduct,
    tab: Tab,
    badge?: string
): RowProduct {
    const img = typeof p.image === "string" ? p.image : "";
    const computedOldPrice = p.oldPrice != null ? p.oldPrice : (p.price ? Math.round(p.price * 1.25) : 0);
    return {
        idStr: p.id,
        slug: p.slug ?? p.id,
        name: p.name,
        price: `₹${p.price.toLocaleString()}`,
        oldPrice: computedOldPrice > p.price ? `₹${computedOldPrice.toLocaleString()}` : undefined,
        category: tab,
        badge:
            badge ??
            (tab === "bestsellers" ? "Bestseller" : tab === "newarrivals" ? "New" : "Trending"),
        image: img,
        accent: "#d4af37",
        global: p,
    };
}

const tabs: { key: Tab; label: string }[] = [
    { key: "bestsellers", label: "Best Sellers" },
    { key: "newarrivals", label: "New Arrivals" },
    { key: "trending", label: "Trending Now" },
];

export function SmallNavigationMenu() {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [activeTab, setActiveTab] = useState<Tab>("bestsellers");
    const [animating, setAnimating] = useState(false);
    const [pool, setPool] = useState<Record<Tab, RowProduct[]>>({
        bestsellers: [],
        newarrivals: [],
        trending: [],
    });
    const visibleProducts = pool[activeTab];
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            shopApi.products({ sort: "bestseller", limit: 4, page: 1 }),
            shopApi.products({ category: "new", limit: 4, page: 1 }),
            shopApi.products({ trending: "true", limit: 4, page: 1 }),
        ])
            .then(([b, n, t]) => {
                setPool({
                    bestsellers: b.items.map((x) => toRow(mapListItemToProduct(x), "bestsellers")),
                    newarrivals: n.items.map((x) => toRow(mapListItemToProduct(x), "newarrivals")),
                    trending: t.items.map((x) => toRow(mapListItemToProduct(x), "trending")),
                });
            })
            .catch(() =>
                setPool({ bestsellers: [], newarrivals: [], trending: [] })
            );
    }, []);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const handleTabChange = (tab: Tab) => {
        if (tab === activeTab || animating) return;
        setAnimating(true);
        setTimeout(() => {
            setActiveTab(tab);
            setAnimating(false);
        }, 300);
    };

    // Move indicator
    useEffect(() => {
        const btn = tabRefs.current[activeTab];
        const indicator = indicatorRef.current;
        if (btn && indicator) {
            indicator.style.left = `${btn.offsetLeft}px`;
            indicator.style.width = `${btn.offsetWidth}px`;
        }
    }, [activeTab]);

    return (
        <section
            className="w-full flex flex-col relative overflow-hidden py-16 md:py-10"
            style={{
                backgroundColor: "var(--bg-ivory)",
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            }}
        >
            {/* <BotanicalDecoration className="text-[#2E5A44]" variant={1} position="top-right" /> */}

            {/* Header */}
            <header className="relative text-center px-4 shrink-0 z-10">
                <p
                    className="text-[20px] tracking-[0.2em] font-bold uppercase "
                    style={{ color: "#2b743e", letterSpacing: "0.2em" }}
                >
                    Handcrafted Luxury
                </p>
                <h1
                    className="text-3xl sm:text-4xl md:text-6xl font-light "
                    style={{
                        color: "#3a2a1a",
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        letterSpacing: "0.05em",
                    }}
                >
                    The Jewel Atelier
                </h1>
                {/* Ornamental divider */}
                <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="h-px w-12 sm:w-16" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <polygon points="10,1 12,8 19,8 13.5,12.5 15.5,19.5 10,15 4.5,19.5 6.5,12.5 1,8 8,8" fill="#c9a84c" opacity="0.9" />
                    </svg>
                    <div className="h-px w-12 sm:w-16" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="relative flex justify-center px-4 mt-5 mb-5 shrink-0 z-10">
                <div className="relative flex gap-4 sm:gap-8 border-b border-black/5 pb-2">
                    {/* Sliding indicator */}
                    <div
                        ref={indicatorRef}
                        className="absolute bottom-[-1px] h-[1px] transition-all duration-500"
                        style={{
                            background: "#c9a84c",
                            zIndex: 10,
                            transition: "left 0.45s cubic-bezier(.4,0,.2,1), width 0.45s cubic-bezier(.4,0,.2,1)",
                        }}
                    />
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            ref={(el) => { tabRefs.current[tab.key] = el; }}
                            onClick={() => handleTabChange(tab.key)}
                            className="relative z-10 px-2  text-[18px] sm:text-lg tracking-widest font-bold uppercase transition-colors duration-300"
                            style={{
                                color: activeTab === tab.key ? "#c9a84c" : "#8a6a3a",
                                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                                fontWeight: activeTab === tab.key ? 600 : 400,
                                letterSpacing: "0.1em",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 z-10">
                <div
                    className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 transition-all duration-300 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                        }`}
                    style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }}
                >
                    {visibleProducts.map((product, index) => (
                        <div
                            key={product.idStr}
                            className="group cursor-pointer"
                            onMouseEnter={() => setHoveredId(product.idStr)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{
                                animationDelay: `${index * 80}ms`,
                                animation: animating ? "none" : "fadeSlideUp 0.55s ease both",
                            }}
                        >
                            {/* Image Card */}
                            <div
                                className="relative overflow-hidden rounded-xl mb-4 bg-white"
                                style={{
                                    aspectRatio: "1/1",
                                    boxShadow:
                                        hoveredId === product.idStr
                                            ? "0 15px 40px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.03)"
                                            : "0 4px 15px rgba(0,0,0,0.03)",
                                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                    transform: hoveredId === product.idStr ? "translateY(-4px)" : "translateY(0)",
                                }}
                            >
                                {/* Image */}
                                <div className="relative w-full h-full p-2">
                                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            quality={75}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* Shimmer overlay on hover */}
                                <div
                                    className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(255,255,255,0) 40%, rgba(201,168,76,0.08) 100%)",
                                        opacity: hoveredId === product.idStr ? 1 : 0,
                                    }}
                                />

                                {/* Badge */}
                                {product.badge && (
                                    <div
                                        className="absolute top-4 left-4 px-3 py-1 text-white text-[10px] tracking-widest uppercase rounded-sm border border-[#d4af37]/40"
                                        style={{
                                            background: "linear-gradient(135deg, #1a3d2f 0%, #2e5a44 100%)",
                                            letterSpacing: "0.14em",
                                            boxShadow: "0 2px 10px rgba(26,61,47,0.3)",
                                        }}
                                    >
                                        {product.badge}
                                    </div>
                                )}

                                {/* Wishlist icon */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleWishlist(product.global);
                                    }}
                                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 z-10"
                                    style={{
                                        background: "rgba(255,255,255,0.9)",
                                        backdropFilter: "blur(4px)",
                                        opacity: 1,
                                        transform: "translateY(0)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill={isInWishlist(product.global.id) ? "#c9a84c" : "none"}
                                        stroke="#c9a84c"
                                        strokeWidth="1.5"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="px-1 text-center">
                                <Link href={`/product/${product.slug}`}>
                                    <h3
                                        className="text-sm sm:text-base leading-snug mb-2 transition-colors duration-300"
                                        style={{
                                            color: hoveredId === product.idStr ? "#c9a84c" : "#3a2a1a",
                                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                                            fontWeight: 500,
                                            letterSpacing: "0.01em",
                                        }}
                                    >
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="flex flex-col items-center justify-center gap-2">
                                    {/* Price Hierarchy Section */}
                                    <div className="flex items-baseline justify-center gap-2 mb-1">
                                        {product.oldPrice && (
                                            <span
                                                className="text-xs sm:text-sm font-medium line-through"
                                                style={{ color: "#1a3d2f", opacity: 0.85 }}
                                            >
                                                {product.oldPrice}
                                            </span>
                                        )}
                                        <span
                                            className="text-base sm:text-lg font-bold tracking-tight"
                                            style={{ color: "#d4af37" }}
                                        >
                                            {product.price}
                                        </span>
                                    </div>

                                    {/* Dark Green Add to Cart Button with White Text and Modern Hover Effect */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToCart(product.global);
                                        }}
                                        className="relative w-full group/btn rounded-xl flex items-center justify-center py-2.5 px-4 text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer overflow-hidden border-none shadow-md hover:shadow-[0_8px_25px_rgba(26,61,47,0.45)] hover:-translate-y-0.5 active:translate-y-0"
                                        style={{
                                            background: "linear-gradient(135deg, #1a3d2f 0%, #2e5a44 100%)",
                                            color: "#ffffff",
                                        }}
                                    >
                                        {/* Shimmer sweep effect */}
                                        <span
                                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 -translate-x-full group-hover/btn:translate-x-full"
                                        />

                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            className="mr-2 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:-rotate-6"
                                        >
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                            <line x1="3" y1="6" x2="21" y2="6" />
                                            <path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                        <span className="relative z-10 font-bold text-white">Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="flex justify-center mt-12">
                    <Link href="/category/necklaces">
                        <button
                        className="group relative px-8 py-3 text-[11px] tracking-[0.2em] uppercase overflow-hidden"
                        style={{
                            border: "1px solid #c9a84c",
                            color: "#c9a84c",
                            background: "transparent",
                            cursor: "pointer",
                            transition: "color 0.4s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c";
                        }}
                    >
                        <span
                            className="absolute inset-0 transition-transform duration-500 origin-left"
                            style={{
                                background: "#c9a84c",
                                transform: "scaleX(0)",
                                zIndex: 0,
                            }}
                            ref={(el) => {
                                if (el) {
                                    el.parentElement?.addEventListener("mouseenter", () => {
                                        el.style.transform = "scaleX(1)";
                                    });
                                    el.parentElement?.addEventListener("mouseleave", () => {
                                        el.style.transform = "scaleX(0)";
                                    });
                                }
                            }}
                        />
                        <span className="relative z-10 font-medium text-base">Explore Full Collection</span>
                        </button>
                    </Link>
                </div>
            </main>

            <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </section>
    );
}