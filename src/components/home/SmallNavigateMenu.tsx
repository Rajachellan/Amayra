"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product as GlobalProduct } from "@/types";
import neeckles from "../../../public/images/neckles_5.jpg"
import neckles2 from "../../../public/images/luxury/temple.png"
import bngles from "../../../public/images/luxury/bangles.avif"
import Image from "next/image";
type LocalProduct = {
    id: number;
    name: string;
    price: string;
    oldPrice?: string;
    category: "bestsellers" | "newarrivals" | "trending";
    badge?: string;
    image: string;
    accent: string;
};

const products: LocalProduct[] = [
    // BESTSELLERS
    {
        id: 1,
        name: "Miera Kundan Emerald Drop Earrings",
        price: "₹1,290",
        oldPrice:"₹1,800",
        category: "bestsellers",
        badge: "Best Loved",
        image:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
        accent: "#c9a84c",
    },
    {
        id: 2,
        name: "Antique Gold Polki Bangles",
        price: "₹3,200",
        category: "bestsellers",
        badge: "Top Pick",
        oldPrice:"₹3,800",
        image:
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        accent: "#d4a373",
    },
    {
        id: 3,
        name: "Floral Kundan Maang Teeka",
        price: "₹2,800",
        oldPrice:"₹3,200",
        category: "bestsellers",
        badge: "Bridal Edit",
        image:
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
        accent: "#b08850",
    },
    {
        id: 4,
        name: "Pearl Sheesh Phool Tiara",
        price: "₹5,400",
        oldPrice:"₹5,800",
        category: "bestsellers",
        badge: "Signature",
        image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        accent: "#c9a84c",
    },

    // NEW ARRIVALS
    {
        id: 5,
        name: "Rose Gold Celestial Choker",
        price: "₹4,100",
        oldPrice:"₹4,890",
        category: "newarrivals",
        badge: "Just In",
        image:
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
        accent: "#c9a84c",
    },
    {
        id: 6,
        name: "Meenakari Lotus Jhumkas",
        price: "₹1,850",
        oldPrice:"₹2,500",
        category: "newarrivals",
        badge: "New",
        image:"/images/neckles_5.jpg",
        accent: "#d4a373",
    },
    {
        id: 7,
        name: "Polki Diamond Layered Necklace",
        price: "₹6,500",
        oldPrice:"6,870",
        category: "newarrivals",
        badge: "Just Arrived",
        image:
            "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=600&q=80",
        accent: "#b08850",
    },
    {
        id: 8,
        name: "Champagne Pearl Cuff Bracelet",
        price: "₹2,350",
        oldPrice:"₹2,650",
        category: "newarrivals",
        badge: "Fresh",
        image:
            "/images/luxury/temple.png",
        accent: "#c9a84c",
    },

    // TRENDING NOW
    {
        id: 9,
        name: "Vintage Jadau Collar Necklace",
        price: "₹7,200",
        oldPrice:"₹7,630",
        category: "trending",
        badge: "Viral",
        image:
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80",
        accent: "#c9a84c",
    },
    {
        id: 10,
        name: "Boho Gold Stacking Rings Set",
        price: "₹980",
        oldPrice:"₹1,530",
        category: "trending",
        badge: "Trending",
        image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
        accent: "#d4a373",
    },
    {
        id: 11,
        name: "Kundan Floral Hair Chain",
        price: "₹3,600",
        oldPrice:"₹3,980",
        category: "trending",
        badge: "Hot Now",
        image:    "/images/luxury/bangles.avif",
        accent: "#b08850",
    },
    {
        id: 12,
        name: "Gold Enamelled Peacock Earrings",
        price: "₹2,100",
        oldPrice:"₹3,790",
        category: "trending",
        badge: "Loved By All",
        image:
            "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80",
        accent: "#c9a84c",
    },
];

type Tab = "bestsellers" | "newarrivals" | "trending";

const convertToGlobalProduct = (p: LocalProduct): GlobalProduct => ({
    id: `small-nav-${p.id}`,
    name: p.name,
    price: parseInt(p.price.replace(/[^\d]/g, "")),
    image: p.image,
    category: p.category,
    description: p.name,
    stock: 10,
});

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
    const [visibleProducts, setVisibleProducts] = useState<LocalProduct[]>(
        products.filter((p) => p.category === "bestsellers")
    );
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const handleTabChange = (tab: Tab) => {
        if (tab === activeTab || animating) return;
        setAnimating(true);
        setTimeout(() => {
            setActiveTab(tab);
            setVisibleProducts(products.filter((p) => p.category === tab));
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
        <div
            className="h-[100dvh] w-full flex flex-col overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #fdf8f2 0%, #fef0e6 50%, #fdf5fb 100%)",
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            }}
        >
            {/* Decorative top border */}
            <div
                className="w-full h-1"
                style={{
                    background: "linear-gradient(90deg, transparent, #c9a84c, #f0d9a0, #c9a84c, transparent)",
                }}
            />

            {/* Header */}
            <header className="text-center xl:pt-30 pt-20  px-4 shrink-0">
                <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-1"
                    style={{ color: "#c9a84c", letterSpacing: "0.3em" }}
                >
                    Handcrafted Luxury
                </p>
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-light mb-1"
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
            <div className="flex justify-center px-4 mb-6 shrink-0">
                <div
                    className="relative flex gap-0 rounded-full p-0.5"
                    style={{
                        background: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 4px 32px rgba(201,168,76,0.10), 0 1px 4px rgba(201,168,76,0.08)",
                        border: "1px solid rgba(201,168,76,0.18)",
                    }}
                >
                    {/* Sliding indicator */}
                    <div
                        ref={indicatorRef}
                        className="absolute top-0.5 bottom-0.5 rounded-full transition-all duration-500"
                        style={{
                            background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 60%, #c9a84c 100%)",
                            boxShadow: "0 2px 16px rgba(201,168,76,0.35)",
                            zIndex: 0,
                            transition: "left 0.45s cubic-bezier(.4,0,.2,1), width 0.45s cubic-bezier(.4,0,.2,1)",
                        }}
                    />
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            ref={(el) => { tabRefs.current[tab.key] = el; }}
                            onClick={() => handleTabChange(tab.key)}
                            className="relative z-10 px-4 sm:px-6 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase transition-colors duration-300 rounded-full"
                            style={{
                                color: activeTab === tab.key ? "#fff" : "#8a6a3a",
                                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                                fontWeight: activeTab === tab.key ? 600 : 400,
                                letterSpacing: "0.15em",
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
           <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex-1 overflow-y-auto">
                <div
                    className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 transition-all duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                        }`}
                    style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }}
                >
                    {visibleProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group cursor-pointer"
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{
                                animationDelay: `${index * 80}ms`,
                                animation: animating ? "none" : "fadeSlideUp 0.55s ease both",
                            }}
                        >
                            {/* Image Card */}
                            <div
                                className="relative overflow-hidden rounded-xl mb-2"
                                style={{
                                    aspectRatio: "1/1",
                                    boxShadow:
                                        hoveredId === product.id
                                            ? "0 10px 30px rgba(201,168,76,0.2), 0 4px 10px rgba(0,0,0,0.08)"
                                            : "0 4px 12px rgba(0,0,0,0.05)",
                                    transition: "box-shadow 0.4s ease",
                                }}
                            >
                                {/* Image */}
                               <div className="relative w-full h-full">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700"
                                    />
                                </div>

                                {/* Shimmer overlay on hover */}
                                <div
                                    className="absolute inset-0 transition-opacity duration-500"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(255,255,255,0) 40%, rgba(240,208,128,0.13) 100%)",
                                        opacity: hoveredId === product.id ? 1 : 0,
                                    }}
                                />

                                {/* Badge */}
                                {product.badge && (
                                    <div
                                        className="absolute top-3 left-3 px-3 py-1 text-white text-xs tracking-widest uppercase rounded-full"
                                        style={{
                                            background: "linear-gradient(135deg, #c9a84c, #e8c87a)",
                                            letterSpacing: "0.14em",
                                            fontSize: "0.62rem",
                                            boxShadow: "0 2px 10px rgba(201,168,76,0.4)",
                                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
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
                                        toggleWishlist(convertToGlobalProduct(product));
                                    }}
                                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.82)",
                                        backdropFilter: "blur(6px)",
                                        opacity: hoveredId === product.id ? 1 : 0,
                                        transform: hoveredId === product.id ? "scale(1)" : "scale(0.8)",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                                    }}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill={isInWishlist(`small-nav-${product.id}`) ? "#c9a84c" : "none"}
                                        stroke="#c9a84c"
                                        strokeWidth="2"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </button>

                                {/* Add to bag strip */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToCart(convertToGlobalProduct(product));
                                    }}
                                    className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-3 text-xs tracking-widest uppercase transition-all duration-400 w-full border-none cursor-pointer"
                                    style={{
                                        background: "rgba(255,255,255,0.90)",
                                        backdropFilter: "blur(8px)",
                                        color: "#8a6a3a",
                                        letterSpacing: "0.18em",
                                        fontSize: "0.65rem",
                                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                                        transform: hoveredId === product.id ? "translateY(0)" : "translateY(100%)",
                                        transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
                                    }}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" className="mr-2">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <path d="M16 10a4 4 0 0 1-8 0" />
                                    </svg>
                                    Add to Bag
                                </button>
                            </div>

                            {/* Product Info */}
                        <div className="px-1">
    <h3
        className="text-sm sm:text-base leading-snug mb-1 transition-colors duration-300"
        style={{
            color: hoveredId === product.id ? "#c9a84c" : "#3a2a1a",
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 500,
            letterSpacing: "0.01em",
        }}
    >
        {product.name}
    </h3>

    <div className="flex items-center justify-between">
        
        {/* Price Section */}
        <div className="flex items-center gap-2">
            
            {/* Old Price */}
            <p
                className="text-xs sm:text-sm font-semibold line-through"
                style={{
                    color: "#9c9c9c",
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                }}
            >
                {product.oldPrice}
            </p>

            {/* Discount Price */}
            <p
                className="text-xl font-semibold"
                style={{
                    color: "#c9a84c",
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    letterSpacing: "0.02em",
                }}
            >
                {product.price}
            </p>
        </div>

        {/* Small star accent */}
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    width="8"
                    height="8"
                    viewBox="0 0 20 20"
                    fill={i < 4 ? "#c9a84c" : "#e8d5b0"}
                >
                    <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
                </svg>
            ))}
        </div>
    </div>
</div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="flex justify-center mt-6">
                    <button
                        className="group relative px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase overflow-hidden rounded-full"
                        style={{
                            border: "1px solid #c9a84c",
                            color: "#c9a84c",
                            background: "transparent",
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            letterSpacing: "0.2em",
                            cursor: "pointer",
                            transition: "color 0.35s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c";
                        }}
                    >
                        <span
                            className="absolute inset-0 rounded-full transition-transform duration-500 origin-left"
                            style={{
                                background: "linear-gradient(135deg, #c9a84c, #e8c87a)",
                                transform: "scaleX(0)",
                                transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
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
                        <span className="relative z-10">Explore Full Collection</span>
                    </button>
                </div>
            </main>

            {/* Footer divider */}
            {/* <div
                className="w-full h-px"
                style={{
                    background: "linear-gradient(90deg, transparent, #c9a84c44, transparent)",
                }}
            />
            <footer className="text-center py-4 shrink-0 mt-auto">
                <p className="text-[9px] tracking-widest uppercase" style={{ color: "#c9a84c88", letterSpacing: "0.2em" }}>
                    © 2026 The Jewel Atelier · Crafted With Gold & Grace
                </p>
            </footer> */}

            {/* Keyframe animations via style tag */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

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
        </div>
    );
}