"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import { navigationData } from "@/data/navigation";
import { CompactDropdown } from "./CompactDropdown";

const MarqueeBanner = () => {
  const announcements = [
    "✦ COMPLIMENTARY INTERNATIONAL SHIPPING ON ORDERS OVER $5,000 ✦",
    "✦ NEW BRIDAL COLLECTION 'ETEREA' IS NOW LIVE ✦",
    "✦ VISIT OUR ATELIER FOR A BESPOKE CONSULTATION ✦",
    "✦ DISCOVER THE ART OF HAND-CRAFTED EXCELLENCE ✦",
  ];

  return (
    <div className="w-full bg-[#1A1A1A] py-2 overflow-hidden border-b border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {announcements.map((text, idx) => (
              <span
                key={idx}
                className="text-[9px] text-white/80 font-medium tracking-[0.3em] uppercase mx-12"
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
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

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

  const isWhite = isScrolled || isHovered || isMobileMenuOpen;
  
  const leftMenu = navigationData.slice(0, 3);
  const rightMenu = navigationData.slice(3);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -150,
        backgroundColor: isWhite ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 ${
        isWhite 
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
      
      <nav className={`w-full flex items-center transition-all duration-300 ${
        isScrolled ? "h-20" : "h-24"
      }`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between relative">
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
                  className={`text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${
                    isWhite ? "text-foreground" : "text-white/90"
                  }`}
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
          <div className={`flex justify-center flex-shrink-0 px-10 transition-transform duration-500 ${
            isScrolled ? "scale-90" : "scale-100"
          }`}>
            <Link href="/" className="relative group block">
              <Image
                src="/logo3.png"
                alt="Shree Aarna Logo"
                width={140}
                height={70}
                className={`object-contain transition-all duration-500`}
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
                  className={`text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${
                    isWhite ? "text-foreground" : "text-white/90"
                  }`}
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
            <div className={`flex items-center space-x-7 pl-8 border-l transition-colors duration-300 ml-4 ${
              isWhite ? "border-foreground/10" : "border-white/20"
            }`}>
              {/* Search */}
              <button className={`${isWhite ? "text-foreground" : "text-white/90"} transition-colors`}>
                <Search className="w-[17px] h-[17px] stroke-[1.5]" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className={`relative ${isWhite ? "text-foreground" : "text-white/90"} transition-colors`}>
                <Heart className="w-[17px] h-[17px] stroke-[1.5]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-champagne text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className={`relative ${isWhite ? "text-foreground" : "text-white/90"} transition-colors`}>
                <ShoppingBag className="w-[17px] h-[17px] stroke-[1.5]" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-foreground text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`${isWhite ? "text-foreground" : "text-white"} hover:text-champagne transition-colors`}
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
                {navigationData.map((item) => (
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
