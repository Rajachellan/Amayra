"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import { navigationData, type NavItem } from "@/data/navigation";
import { CompactDropdown } from "./CompactDropdown";
import { shopApi } from "@/lib/api/shop";

const MarqueeBanner = () => {
  const announcements = [
    "✦ COMPLIMENTARY INTERNATIONAL SHIPPING ON ORDERS OVER $5,000 ✦",
    "✦ NEW BRIDAL COLLECTION 'ETEREA' IS NOW LIVE ✦",
    "✦ VISIT OUR ATELIER FOR A BESPOKE CONSULTATION ✦",
    "✦ DISCOVER THE ART OF HAND-CRAFTED EXCELLENCE ✦",
  ];

  return (
    <div className="w-full bg-[#1A1A1A] py-2 overflow-hidden border-b border-white/5 cursor-pointer group"
      onClick={() => {
        const nextBtn = document.querySelector('.hero-next-button') as HTMLButtonElement;
        if (nextBtn) nextBtn.click();
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {announcements.map((text, idx) => (
              <span
                key={idx}
                className="text-[9px] text-white/80 font-medium tracking-[0.3em] uppercase mx-12 group-hover:text-champagne transition-colors"
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Navbar = () => {
  const { cart, toggleCart } = useCart();
  const { wishlist } = useWishlist();
  const [shopSubItems, setShopSubItems] = useState<NonNullable<NavItem["subItems"]> | null>(null);
  const [collectionSubItems, setCollectionSubItems] = useState<NonNullable<NavItem["subItems"]> | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
    shopApi
      .categoriesTree()
      .then((tree) => {
        const sub: NonNullable<NavItem["subItems"]> = [];
        for (const root of tree) {
          sub.push({ name: root.name, href: `/category/${root.slug}` });
          for (const ch of root.children || []) {
            sub.push({ name: ch.name, href: `/category/${ch.slug}` });
          }
        }
        sub.push({ name: "New Arrivals", href: "/category/new" });
        sub.push({ name: "View All", href: "/category/all" });
        setShopSubItems(sub.slice(0, 14));
      })
      .catch(() => setShopSubItems(null));
    shopApi
      .collections({ featured: true })
      .then((cols) => {
        setCollectionSubItems(
          cols.map((c) => ({
            name: c.name,
            href: `/category/all?collection=${encodeURIComponent(c.slug)}`,
          }))
        );
      })
      .catch(() => setCollectionSubItems(null));
  }, []);

  const navItems = useMemo(() => {
    return navigationData.map((item) => {
      if (item.name === "Shop" && shopSubItems?.length) {
        return { ...item, subItems: shopSubItems };
      }
      if (item.name === "Collections" && collectionSubItems?.length) {
        return { ...item, subItems: collectionSubItems };
      }
      return item;
    });
  }, [shopSubItems, collectionSubItems]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if page is scrolled
      setIsScrolled(currentScrollY > 20);

      // Determine visibility for show/hide behavior
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past threshold
        setIsVisible(false);
      } else {
        // Scrolling up or at the top
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isWhite = isScrolled || isHovered || isMobileMenuOpen || isSearchOpen;

  const leftMenu = navItems.slice(0, 3);
  const rightMenu = navItems.slice(3);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -150,
        backgroundColor: isWhite ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 ${isWhite
        ? "shadow-lg border-b border-foreground/5 backdrop-blur-none"
        : "border-none backdrop-blur-xl bg-gradient-to-b from-black/40 via-black/10 to-transparent"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveMenu(null);
      }}
    >
      <MarqueeBanner />

      <nav className={`w-full flex items-center transition-all duration-300 ${isScrolled ? "h-20" : "h-24"
        }`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between relative">

          {/* Search Overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 z-50 bg-white flex items-center px-6"
              >
                <div className="w-full max-w-4xl mx-auto flex items-center">
                  <Search className="w-5 h-5 text-gray-400 mr-4" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search our collections..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-lg font-serif tracking-widest uppercase"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-50 rounded-full ml-4">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left Side Menu */}
          <div className="hidden lg:flex items-center space-x-12 flex-1">
            {leftMenu.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setActiveMenu(item.name)}
                className="relative py-2 flex items-center"
              >
                <Link
                  href={item.href}
                  className={`text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${isWhite ? "text-foreground" : "text-white/90"
                    } hover:text-champagne`}
                >
                  {item.name}
                </Link>

                <CompactDropdown
                  item={item}
                  isOpen={activeMenu === item.name}
                />
              </div>
            ))}
          </div>

          {/* Center: Logo */}
          <div className={`flex justify-center flex-shrink-0 px-10 transition-transform duration-500 ${isScrolled ? "scale-90" : "scale-100"
            }`}>
              <Link href="/" className="relative group block">
              <Image
                src="/logo3.png"
                alt="Amayra Logo"
                width={140}
                height={70}
                style={{ width: "auto", height: "auto" }}
                className={`object-contain transition-all duration-500 ${isWhite ? "opacity-100" : "brightness-0 invert"}`}
                priority
              />
            </Link>
          </div>

          {/* Right Side Menu + Icons */}
          <div className="hidden lg:flex items-center justify-end space-x-12 flex-1">
            {rightMenu.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setActiveMenu(item.name)}
                className="relative py-2 flex items-center"
              >
                <Link
                  href={item.href}
                  className={`text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${isWhite ? "text-foreground" : "text-white/90"
                    } hover:text-champagne`}
                >
                  {item.name}
                </Link>

                {item.subItems && (
                  <CompactDropdown
                    item={item}
                    isOpen={activeMenu === item.name}
                  />
                )}
              </div>
            ))}

            {/* Icons */}
            <div className={`flex items-center space-x-7 pl-8 border-l transition-colors duration-300 ml-4 ${isWhite ? "border-foreground/10" : "border-white/20"
              }`}>
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`${isWhite ? "text-foreground" : "text-white/90"} transition-colors hover:text-champagne`}
              >
                <Search className="w-[17px] h-[17px] stroke-[1.5]" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className={`relative ${isWhite ? "text-foreground" : "text-white/90"} transition-colors hover:text-champagne`}>
                <Heart className="w-[17px] h-[17px] stroke-[1.5]" />
                {mounted && wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-champagne text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className={`relative ${isWhite ? "text-foreground" : "text-white/90"} transition-colors hover:text-champagne`}
              >
                <ShoppingBag className="w-[17px] h-[17px] stroke-[1.5]" />
                {mounted && cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-foreground text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search & Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`${isWhite ? "text-foreground" : "text-white/90"} transition-colors`}
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button
              onClick={toggleCart}
              className={`relative ${isWhite ? "text-foreground" : "text-white/90"} transition-colors`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {mounted && cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-foreground text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`${isWhite ? "text-foreground" : "text-white"} hover:text-champagne transition-colors p-2 -mr-2`}
            >
              <Menu className="w-6 h-6 stroke-[1.3]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-background z-[70] p-10 shadow-2xl"
            >
              <div className="flex justify-end mb-12">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-foreground/40 hover:text-maroon">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg uppercase tracking-[0.2em] font-serif border-b border-foreground/5 pb-2 hover:text-champagne transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};