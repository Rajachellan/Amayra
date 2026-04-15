"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { navigationData } from "@/data/navigation";
import Image from "next/image";
import logo from "../../../public/logo-removebg.png"; // We'll keep this if needed, but the user wants absolute paths.
// Actually, I'll remove it and use string paths.


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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white shadow-md py-1.5" : "bg-transparent py-2.5"
        }`}
    >
      <div className="container mx-auto py-2 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="relative group block">
            <Image
              src="/images/aarna-01-01-removebg-preview.png"
              alt="Shree Aarna Logo"
              width={110}
              height={55}
              className={`object-contain transition-all duration-500 pt-3 ${isScrolled ? "scale-135" : "scale-140"}`}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-8">
          {navigationData.slice(0, 6).map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className={`text-[13px] font-sans font-bold tracking-[0.15em] uppercase transition-colors flex items-center gap-1.5 ${isScrolled ? "text-gray-800" : "text-white drop-shadow-md"
                  } hover:text-brand-gold`}
              >
                {item.name}
                {item.subItems && <ChevronDown className="w-3 h-3 opacity-50" />}
              </Link>

              {/* Refined Dropdown */}
              <AnimatePresence>
                {item.subItems && activeMenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 pt-4 w-[240px]"
                  >
                    <div className="bg-white shadow-xl border-t-2 border-brand-gold p-4">
                      <div className="flex flex-col space-y-3">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="text-[11px] font-bold tracking-widest text-gray-700 hover:text-brand-gold uppercase transition-colors"
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
        <div className={`flex items-center space-x-6 ${isScrolled ? "text-gray-800" : "text-white"}`}>
          <button className="hover:text-brand-gold transition-colors hidden md:block">
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <Link href="/profile" className="hover:text-brand-gold transition-colors hidden md:block">
            <User className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
          <Link href="/wishlist" className="relative group hover:text-brand-gold transition-colors">
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${wishlist.length > 0 ? "fill-brand-gold text-brand-gold" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative group hover:text-brand-gold transition-colors">
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden p-2">
            <Menu className="w-6 h-6" />
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
              className="fixed top-0 left-0 h-full w-[300px] bg-white z-[70] p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <Image src="/logo-removebg.png" alt="Logo" width={90} height={45} className="object-contain" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navigationData.map((item) => (
                  <div key={item.name} className="space-y-3">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-800 hover:text-brand-gold text-sm font-bold tracking-widest uppercase block border-b border-gray-50 pb-2"
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <div className="pl-4 flex flex-col space-y-2">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-500 hover:text-brand-gold text-[10px] tracking-widest uppercase"
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
