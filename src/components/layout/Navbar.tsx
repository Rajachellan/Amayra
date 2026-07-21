"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, User, LogIn } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { navigationData, type NavItem } from "@/data/navigation";
import { CompactDropdown } from "./CompactDropdown";
import { shopApi } from "@/lib/api/shop";

const MarqueeBanner = () => {
  const [announcements, setAnnouncements] = useState<{ text: string; link?: string }[]>([]);

  useEffect(() => {
    shopApi
      .announcements()
      .then((rows) => {
        if (rows.length) setAnnouncements(rows.map((r) => ({ text: r.text, link: r.link })));
      })
      .catch(() => { });
  }, []);

  const items =
    announcements.length > 0
      ? announcements
      : [{ text: "FREE SHIPPING on all prepaid orders PAN India" }];

  return (
    <div className="w-full bg-[#F4F8F5] py-2 overflow-hidden border-b border-black/10">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {items.map((item, idx) => {
              const content = (
                <span className="text-[9px] text-[#0B2516] font-semibold tracking-[0.3em] uppercase mx-12 hover:text-[#c9a84c] transition-colors">
                  {item.text}
                </span>
              );
              return item.link ? (
                <Link key={idx} href={item.link}>
                  {content}
                </Link>
              ) : (
                <span key={idx}>{content}</span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Navbar = () => {
  const { cart, openCart } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [shopSubItems, setShopSubItems] = useState<NonNullable<NavItem["subItems"]> | null>(null);
  const [collectionSubItems, setCollectionSubItems] = useState<NonNullable<NavItem["subItems"]> | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isWhite = isScrolled || isHovered || isMobileMenuOpen || isSearchOpen;

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: 0,
        backgroundColor: "#0B2516",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 flex flex-col shadow-lg border-b border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveMenu(null);
      }}
    >
      <MarqueeBanner />

      <nav className={`w-full flex items-center transition-all duration-300 ${isScrolled ? "h-14" : "h-14"
        }`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between relative">

          {/* Search Overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 z-50 bg-[#0B2516] text-white flex items-center px-6"
              >
                <div className="w-full max-w-4xl mx-auto flex items-center">
                  <Search className="w-5 h-5 text-gray-300 mr-4" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search our collections..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-lg font-serif tracking-widest uppercase text-white placeholder-gray-400"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-emerald-800 rounded-full ml-4">
                    <X className="w-6 h-6 text-gray-300" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left: Logo */}
          <div className={`flex justify-start flex-shrink-0 pr-8 transition-transform duration-500 ${isScrolled ? "scale-90" : "scale-100"
            }`}>
            <Link href="/" className="relative group block">
              <Image
                src="/images/mairii final-without bg.png"
                alt="Mairii Logo"
                width={140}
                height={70}
                className={`object-contain transition-all rounded-full duration-500 `}
                priority
              />
            </Link>
          </div>

          {/* Center: Navigation Menu */}
          <div className="hidden lg:flex items-center justify-center space-x-10 flex-1 px-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setActiveMenu(item.name)}
                className="relative py-2 flex items-center"
              >
                <Link
                  href={item.href}
                  className="text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 text-white/90 hover:text-brand-gold"
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
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center justify-end space-x-12">
            <div className="flex items-center space-x-7 pl-8 border-l border-white/20 transition-colors duration-300 ml-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white/90 transition-colors hover:text-brand-gold"
              >
                <Search className="w-[17px] h-[17px] stroke-[1.5]" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative text-white/90 transition-colors hover:text-brand-gold">
                <Heart className="w-[17px] h-[17px] stroke-[1.5]" />
                {mounted && wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-champagne text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                type="button"
                onClick={() => openCart()}
                className="relative text-white/90 transition-colors hover:text-brand-gold"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-[17px] h-[17px] stroke-[1.5]" />
                {mounted && cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-[#0B2516] text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Account */}
              <Link
                href={user ? "/profile" : "/auth/login"}
                className={`relative ${isWhite ? "text-foreground" : "text-white/90"} transition-colors hover:text-white`}
                aria-label={user ? "Your profile" : "Sign in"}
              >
                {user ? <User className="w-[17px] h-[17px] stroke-[1.5]" /> : <LogIn className="w-[17px] h-[17px] stroke-[1.5]" />}
              </Link>
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
              type="button"
              onClick={() => openCart()}
              className={`relative ${isWhite ? "text-foreground" : "text-white/90"} transition-colors`}
              aria-label="Open cart"
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
              className={`${isWhite ? "text-foreground" : "text-white"} hover:text-brand-gold transition-colors p-2 -mr-2`}
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
                    className="text-lg uppercase tracking-[0.2em] font-serif border-b border-foreground/5 pb-2 hover:text-brand-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    openCart();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-lg uppercase tracking-[0.2em] font-serif border-b border-foreground/5 pb-2 hover:text-brand-gold transition-colors bg-transparent"
                >
                  Cart ({cart.length})
                </button>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-[0.2em] font-serif border-b border-foreground/5 pb-2 hover:text-brand-gold transition-colors"
                >
                  Wishlist
                </Link>
                <Link
                  href={user ? "/profile" : "/auth/login"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-[0.2em] font-serif border-b border-foreground/5 pb-2 hover:text-brand-gold transition-colors"
                >
                  {user ? "My account" : "Sign in"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};