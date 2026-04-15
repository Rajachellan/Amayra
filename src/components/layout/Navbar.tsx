"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { navigationData } from "@/data/navigation";
import Image from "next/image";

export const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-md py-1" : "bg-transparent py-2 px-4"
      }`}
    >
      <div className="container mx-auto py-1.5 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center lg:mr-4">
          <Link href="/" className="relative group block">
            <Image
              src="/images/aarna-01-01-removebg-preview.png"
              alt="Shree Aarna Logo"
              // Responsive logo sizes: smaller on mobile, larger on desktop
              width={80}
              height={40}
              className={`object-contain transition-all duration-500 pt-2
                w-[70px] sm:w-[80px] md:w-[90px] lg:w-[100px] xl:w-[110px]
                ${isScrolled ? "scale-100" : "scale-105"}
              `}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
          {navigationData.slice(0, 6).map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className={`
                  font-sans font-bold tracking-[0.12em] uppercase transition-colors flex items-center gap-1
                  text-[10px] xl:text-[10px] 2xl:text-[11px]
                  ${isScrolled ? "text-gray-800" : "text-white drop-shadow-md"}
                  hover:text-brand-gold
                `}
              >
                {item.name}
                {item.subItems && <ChevronDown className="w-2.5 h-2.5 opacity-50" />}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.subItems && activeMenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 pt-3 w-[210px] xl:w-[220px] 2xl:w-[240px]"
                  >
                    <div className="bg-white shadow-xl border-t-2 border-brand-gold p-3.5">
                      <div className="flex flex-col space-y-2.5">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="text-[9px] xl:text-[9px] 2xl:text-[10px] font-bold tracking-widest text-gray-700 hover:text-brand-gold uppercase transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Icons Section */}
        <div className={`flex items-center space-x-4 md:space-x-5 xl:space-x-6 ${isScrolled ? "text-gray-800" : "text-white"}`}>
          <button className="hover:text-brand-gold transition-colors hidden md:block">
            {/* Icon responsive sizing: smaller on tablet, normal on desktop */}
            <Search className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-[17px] xl:h-[17px]" />
          </button>
          <Link href="/profile" className="hover:text-brand-gold transition-colors hidden md:block">
            <User className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-[17px] xl:h-[17px]" />
          </Link>
          <Link href="/wishlist" className="relative group hover:text-brand-gold transition-colors">
            <Heart
              className={`w-3.5 h-3.5 md:w-4 md:h-4 xl:w-[17px] xl:h-[17px] ${
                wishlist.length > 0 ? "fill-brand-gold text-brand-gold" : ""
              }`}
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] font-bold w-3 h-3 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative group hover:text-brand-gold transition-colors">
            <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-[17px] xl:h-[17px]" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] font-bold w-3 h-3 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden p-1.5">
            <Menu className="w-5 h-5 md:w-5 md:h-5" />
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
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[260px] sm:w-[300px] bg-white z-[70] p-6 sm:p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <Image
                  src="/images/aarna-01-01-removebg-preview.png"
                  alt="Logo"
                  width={75}
                  height={38}
                  className="object-contain"
                />
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-5">
                {navigationData.map((item) => (
                  <div key={item.name} className="space-y-2.5">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        text-gray-800 hover:text-brand-gold font-bold tracking-widest uppercase block border-b border-gray-100 pb-2
                        text-[10px] sm:text-[11px] md:text-[12px]
                      `}
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <div className="pl-3 flex flex-col space-y-2">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-500 hover:text-brand-gold text-[9px] sm:text-[10px] tracking-widest uppercase"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};