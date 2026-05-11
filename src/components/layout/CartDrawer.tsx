"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5 text-champagne" />
                <h2 className="text-xl font-serif tracking-widest uppercase">Your Bag ({cart.length})</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex space-x-4 group">
                    <div className="relative w-24 h-32 overflow-hidden rounded-sm bg-gray-50 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider line-clamp-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-maroon transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                          {item.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-100 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-champagne transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-champagne transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-serif font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="text-gray-400 font-sans tracking-widest uppercase text-xs">
                    Your bag is currently empty
                  </p>
                  <Link
                    href="/category/all"
                    onClick={() => setIsCartOpen(false)}
                    className="text-champagne font-bold text-[10px] tracking-[0.2em] uppercase hover:underline"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">Subtotal</span>
                  <span className="text-xl font-serif font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                  Shipping and taxes calculated at checkout
                </p>
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full flex items-center justify-center space-x-3 bg-foreground text-background py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-champagne hover:text-foreground transition-all duration-500 shadow-xl"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full block text-center py-2 text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-foreground transition-colors"
                  >
                    View Full Shopping Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
