"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";

const SUGGESTION_COUNT = 10;
const PRICING_BREAKDOWN_ID = "cart-drawer-pricing-breakdown";

export function CartDrawer() {
  const [pricingDetailsOpen, setPricingDetailsOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    addToCart,
    subtotal,
  } = useCart();

  const shipping = 0;
  const tax = Math.round(subtotal * 0.03 * 100) / 100;
  const total = subtotal + shipping + tax;

  const cartIds = useMemo(() => new Set(cart.map((i) => i.id)), [cart]);

  const suggestions = useMemo(() => {
    return products.filter((p) => !cartIds.has(p.id)).slice(0, SUGGESTION_COUNT);
  }, [cartIds]);

  useEffect(() => {
    if (!isCartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCartOpen, closeCart]);

  function handleCheckout() {
    closeCart();
    if (user) router.push("/checkout");
    else router.push("/auth/login?next=/checkout");
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            key="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[200] bg-black/45 backdrop-blur-[1px]"
            aria-hidden
          />
          <motion.div
            key="cart-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 z-[210] flex h-full w-full max-w-xl flex-col bg-white shadow-2xl sm:max-w-2xl md:max-w-[46rem]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-10 py-4">
              <h2 id="cart-drawer-title" className="font-serif text-lg tracking-[0.2em] text-brand-emerald uppercase">
                Your bag ({cart.length})
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-brand-emerald"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="scrollbar-gold-slim-vertical min-h-0 flex-1 overflow-y-auto px-10">
              <div className="px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Items in your bag are reserved briefly while you check out.
                </p>
              </div>

              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <p className="font-serif text-xl uppercase tracking-[0.2em] text-gray-300">
                    Your bag is empty
                  </p>
                  <p className="mt-4 text-xs text-gray-500">Explore the collection and add pieces you love.</p>
                  <Link
                    href="/category/all"
                    onClick={closeCart}
                    className="mt-8 inline-flex items-center justify-center border border-brand-gold px-6 py-3 text-[10px] font-medium uppercase tracking-widest text-brand-gold transition-all hover:bg-black/75 hover:text-white"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 px-5">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 py-5">
                      <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-gray-50">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-sm font-medium uppercase tracking-wide text-brand-emerald line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                          {item.category}
                        </p>
                        {(item.material || item.weight) && (
                          <p className="mt-1 text-[9px] uppercase tracking-wider text-gray-400">
                            {item.material}
                            {item.material && item.weight ? " · " : ""}
                            {item.weight}
                          </p>
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <div className="flex items-center border border-gray-200">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-gray-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5 text-gray-500" />
                            </button>
                            <span className="min-w-[2rem] text-center font-sans text-sm font-bold text-brand-emerald">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-gray-50"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5 text-gray-500" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="shrink-0 pt-6 text-right">
                        <p className="text-sm font-bold text-brand-emerald">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {suggestions.length > 0 && (
                <div className="mt-6 border-t border-gray-100 pt-6 pb-4">
                  <div className="mb-4 flex items-center gap-4 px-5">
                    <span className="h-px flex-1 bg-gray-200" />
                    <span className="whitespace-nowrap font-serif text-xs tracking-[0.25em] text-brand-emerald uppercase">
                      You may also like
                    </span>
                    <span className="h-px flex-1 bg-gray-200" />
                  </div>
                  <div className="no-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 pt-0.5 snap-x snap-mandatory">
                    {suggestions.map((p) => (
                      <article
                        key={p.id}
                        className="w-[188px] shrink-0 snap-start border border-gray-100 bg-gray-50/50 p-3.5 sm:w-[200px] sm:p-4"
                      >
                        <div className="relative mb-3 aspect-square w-full overflow-hidden bg-white">
                          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="200px" />
                        </div>
                        <p className="line-clamp-2 font-serif text-[11px] leading-tight text-brand-emerald">
                          {p.name}
                        </p>
                        <p className="mt-1 font-sans text-xs font-bold text-brand-emerald">
                          ₹{p.price.toLocaleString()}
                        </p>
                        <button
                          type="button"
                          onClick={() => addToCart(p)}
                          className="mt-2 w-full bg-brand-emerald px-2 py-2 text-[9px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-900"
                        >
                          Add
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-gray-100 bg-white px-10 py-5 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.12)]">
              <div
                id={PRICING_BREAKDOWN_ID}
                hidden={!pricingDetailsOpen}
                className="space-y-1 text-sm text-gray-600 uppercase tracking-widest"
              >
                <div className="flex justify-between">
                  <span className="text-[10px]">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px]">Shipping</span>
                  <span className="text-green-700">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px]">Tax (GST 3%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div
                className={
                  pricingDetailsOpen
                    ? "mt-2 flex items-center justify-between border-t border-gray-100 pt-3 font-serif uppercase"
                    : "flex items-center justify-between font-serif uppercase"
                }
              >
                <span className="text-sm tracking-[0.2em] text-brand-emerald">Total</span>
                <span className="text-xl font-bold text-brand-emerald">₹{total.toLocaleString()}</span>
              </div>

              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  aria-expanded={pricingDetailsOpen}
                  aria-controls={PRICING_BREAKDOWN_ID}
                  onClick={() => setPricingDetailsOpen((open) => !open)}
                  className="rounded-sm border border-brand-gold/60 bg-transparent px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold transition-colors hover:bg-black/75 hover:text-white"
                >
                  {pricingDetailsOpen ? "Hide detail" : "View detail"}
                </button>
              </div>

              <Button
                variant="gold"
                size="lg"
                className="mt-6 w-full"
                disabled={cart.length === 0}
                type="button"
                onClick={handleCheckout}
              >
                Proceed to checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                <span>Secure checkout</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
