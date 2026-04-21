"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import { navigationData } from "@/data/navigation";
import { CompactDropdown } from "./CompactDropdown";

export const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Dynamic values based on scroll
  const navHeight = useTransform(scrollY, [0, 80], ["100px", "80px"]);
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
  );
  const logoScale = useTransform(scrollY, [0, 80], [1.1, 0.95]);
  const navShadow = useTransform(
    scrollY,
    [0, 80],
    ["none", "0 4px 20px rgba(0,0,0,0.08)"]
  );
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(187, 110, 17, 0)", "rgba(61, 57, 52, 0.05)"]
  );
const iconColor = useTransform(
  scrollY,
  [0, 80],
  ["#d8d8d8ff", "#1f2937"] // white → dark (gray-800)
);
const navTextColor = useTransform(
  scrollY,
  [0, 80],
  ["#d8d6d6ff", "#000000"]
);
  const leftMenu = navigationData.slice(0, 3);
  const rightMenu = navigationData.slice(3);

  return (
    <motion.nav
      style={{ 
        height: navHeight, 
        backgroundColor: navBg,
        boxShadow: navShadow,
        borderBottomColor: navBorder,
      }}
      className="fixed top-0 left-0 w-full z-50 flex items-center transition-all duration-500 backdrop-blur-md border-b"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between relative">
        
        {/* Left Side Menu */}
<div className="hidden lg:flex items-center space-x-12 flex-1">
  {leftMenu.map((item) => (
    <div 
      key={item.name}
      onMouseEnter={() => setActiveMenu(item.name)}
      className="relative py-2 flex items-center"
    >
      <motion.div style={{ color: navTextColor }}>
        <Link
          href={item.href}
          className="text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300"
        >
          {item.name}
        </Link>
      </motion.div>

      <CompactDropdown 
        item={item} 
        isOpen={activeMenu === item.name} 
      />
    </div>
  ))}
</div>
        {/* Center: Logo */}
        <motion.div 
          style={{ scale: logoScale }}
          className="flex justify-center flex-shrink-0 px-10 transition-transform duration-500"
        >
          <Link href="/" className="relative group block">
            <Image
              src="/images/aarna-01-01-removebg-preview.png"
              alt="Shree Aarna Logo"
              width={140}
              height={70}
              className="object-contain"
              priority
            />
          </Link>
        </motion.div>

        {/* Right Side Menu + Icons */}
      <div className="hidden lg:flex items-center justify-end space-x-12 flex-1">
  
  {rightMenu.map((item) => (
    <div 
      key={item.name}
      onMouseEnter={() => setActiveMenu(item.name)}
      className="relative py-2 flex items-center"
    >
      <motion.div style={{ color: navTextColor }}>
        <Link
          href={item.href}
          className="text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300"
        >
          {item.name}
        </Link>
      </motion.div>

      {item.subItems && (
        <CompactDropdown 
          item={item} 
          isOpen={activeMenu === item.name} 
        />
      )}
    </div>
  ))}

  {/* Icons */}
  <div className="flex items-center space-x-7 pl-8 border-l border-gray-300/30 ml-4">
    
    {/* Search */}
    <motion.button style={{ color: navTextColor }}>
      <Search className="w-[17px] h-[17px] stroke-[1.5]" />
    </motion.button>

    {/* Wishlist */}
    <motion.div style={{ color: navTextColor }}>
      <Link href="/wishlist" className="relative">
        <Heart className="w-[17px] h-[17px] stroke-[1.5]" />

        {wishlist.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
            {wishlist.length}
          </span>
        )}
      </Link>
    </motion.div>

    {/* Cart */}
    <motion.div style={{ color: navTextColor }}>
      <Link href="/cart" className="relative">
        <ShoppingBag className="w-[17px] h-[17px] stroke-[1.5]" />

        {cart.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </Link>
    </motion.div>

  </div>
</div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center text-foreground/80">
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="hover:text-champagne transition-colors"
          >
            <Menu className="w-6 h-6 stroke-[1.3]" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 z-[60]"
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
    </motion.nav>
  );
};