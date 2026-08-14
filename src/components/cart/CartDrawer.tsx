"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { shopApi } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import type { Product } from "@/types";

const SUGGESTION_COUNT = 10;


export function CartDrawer() {
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
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [realProducts, setRealProducts] = useState<Product[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<string[]>(["WELCOME5"]);
  const [couponInput, setCouponInput] = useState("");

  useEffect(() => {
    if (!isCartOpen) return;

    // Fetch real products for suggestions
    setLoadingSuggestions(true);
    shopApi.products({ limit: 12, page: 1 })
      .then((res) => {
        const mapped = res.items.map(mapListItemToProduct);
        setRealProducts(mapped);
      })
      .catch((err) => console.error("Failed to load suggestions:", err))
      .finally(() => setLoadingSuggestions(false));

    // Fetch dynamic coupon codes from promotional banners
    shopApi.promotionalBanners()
      .then((res) => {
        const cards = res.cards || [];
        const codes = cards
          .map((c) => c.couponCode?.trim())
          .filter((code): code is string => !!code);
        setAvailableCoupons([...new Set(["WELCOME5", ...codes])]);
      })
      .catch((err) => console.error("Failed to load promotional banners for coupons:", err));
  }, [isCartOpen]);

  const FREE_SHIPPING_THRESHOLD = 1499;
  const DISCOUNT_THRESHOLD = 3499;
  const GIFT_THRESHOLD = 6999;

  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? 199 : 0;
  const tax = 0;
  const milestoneDiscount = subtotal >= DISCOUNT_THRESHOLD ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const total = Math.max(0, subtotal - discountAmount - milestoneDiscount + shipping);

  const progressVal = useMemo(() => {
    if (subtotal <= 0) return 0;
    if (subtotal < FREE_SHIPPING_THRESHOLD) {
      return (subtotal / FREE_SHIPPING_THRESHOLD) * 33.33;
    }
    if (subtotal < DISCOUNT_THRESHOLD) {
      return 33.33 + ((subtotal - FREE_SHIPPING_THRESHOLD) / (DISCOUNT_THRESHOLD - FREE_SHIPPING_THRESHOLD)) * 33.33;
    }
    if (subtotal < GIFT_THRESHOLD) {
      return 66.66 + ((subtotal - DISCOUNT_THRESHOLD) / (GIFT_THRESHOLD - DISCOUNT_THRESHOLD)) * 33.34;
    }
    return 100;
  }, [subtotal]);

  const bannerText = useMemo(() => {
    if (subtotal <= 0) return "Add items to your bag to unlock luxury benefits!";
    if (subtotal < FREE_SHIPPING_THRESHOLD) {
      return `You are ₹${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} away from Free Shipping`;
    }
    if (subtotal < DISCOUNT_THRESHOLD) {
      return `✓ Free Shipping Unlocked! Add ₹${(DISCOUNT_THRESHOLD - subtotal).toLocaleString()} more for Extra 10% OFF!`;
    }
    if (subtotal < GIFT_THRESHOLD) {
      return `✓ 10% OFF Unlocked! Add ₹${(GIFT_THRESHOLD - subtotal).toLocaleString()} more for a Free Gift (Worth ₹799)!`;
    }
    return "✓ All luxury milestones unlocked! Free Shipping, 10% OFF, & Free Gift applied! 🎉";
  }, [subtotal]);

  const cartIds = useMemo(() => new Set(cart.map((i) => i.id)), [cart]);

  const suggestions = useMemo(() => {
    return realProducts.filter((p) => !cartIds.has(p.id)).slice(0, SUGGESTION_COUNT);
  }, [realProducts, cartIds]);

  const hasInsufficientStock = useMemo(() => {
    return cart.some((i) => typeof i.stock === "number" && (i.stock <= 0 || i.quantity > i.stock));
  }, [cart]);

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

              {cart.length > 0 && (
                <div className="px-5 pb-6">
                  <div className="bg-[#fdfbf7] border border-[#f0e6d2] rounded p-4 text-center space-y-4 font-sans shadow-sm select-none">
                    <p className="text-xs font-semibold tracking-wider text-[#1a3d2f] uppercase leading-relaxed">
                      {bannerText}
                    </p>
                    
                    {/* Progress Track */}
                    <div 
                      className="relative h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(progressVal)}
                    >
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#c4a064] transition-all duration-500 ease-out" 
                        style={{ width: `${progressVal}%` }}
                      />
                    </div>
                    
                    {/* Milestone labels / nodes */}
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                      <div className="text-left space-y-0.5">
                        <span className={`block transition-colors duration-300 ${subtotal >= FREE_SHIPPING_THRESHOLD ? 'text-emerald-700 font-bold' : ''}`}>
                          {subtotal >= FREE_SHIPPING_THRESHOLD ? "✓ Free Ship" : "Free Ship"}
                        </span>
                        <span className="text-[9px] text-gray-400 font-normal">₹1,499</span>
                      </div>
                      
                      <div className="text-center space-y-0.5">
                        <span className={`block transition-colors duration-300 ${subtotal >= DISCOUNT_THRESHOLD ? 'text-emerald-700 font-bold' : ''}`}>
                          {subtotal >= DISCOUNT_THRESHOLD ? "✓ 10% OFF" : "10% OFF"}
                        </span>
                        <span className="text-[9px] text-gray-400 font-normal">₹3,499</span>
                      </div>
                      
                      <div className="text-right space-y-0.5">
                        <span className={`block transition-colors duration-300 ${subtotal >= GIFT_THRESHOLD ? 'text-emerald-700 font-bold' : ''}`}>
                          {subtotal >= GIFT_THRESHOLD ? "✓ Free Gift" : "Free Gift"}
                        </span>
                        <span className="text-[9px] text-gray-400 font-normal">₹6,999</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                              disabled={typeof item.stock === "number" ? item.quantity >= item.stock : false}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5 text-gray-500" />
                            </button>
                          </div>
                          {typeof item.stock === "number" && item.stock <= 0 && (
                            <span className="text-[9px] text-red-600 font-bold uppercase tracking-wider">
                              Out of Stock
                            </span>
                          )}
                          {typeof item.stock === "number" && item.stock > 0 && item.quantity >= item.stock && (
                            <span className="text-[9px] text-amber-700 font-bold uppercase tracking-wider">
                              Max stock reached ({item.stock})
                            </span>
                          )}
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

              {/* Coupon Code Section */}
              {cart.length > 0 && (
                <div className="mt-8 border-t border-gray-100 pt-6 px-5">
                  <h3 className="font-serif text-xs tracking-[0.25em] text-[#0b2516] uppercase mb-4 flex items-center gap-1.5 font-bold">
                    <Tag className="h-4 w-4 text-[#c4a064]" /> Apply Promo / Coupon Code
                  </h3>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="ENTER COUPON CODE"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-grow border border-gray-200 px-4 py-2.5 text-xs uppercase tracking-widest focus:border-[#c4a064] focus:outline-none bg-neutral-50 rounded"
                    />
                    {couponCode ? (
                      <button
                        type="button"
                        onClick={() => {
                          removeCoupon();
                          setCouponInput("");
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors rounded cursor-pointer"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          if (couponInput.trim()) {
                            const ok = await applyCoupon(couponInput);
                            if (ok) setCouponInput("");
                          }
                        }}
                        className="bg-[#1a3d2f] hover:bg-emerald-950 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors rounded cursor-pointer"
                      >
                        Apply
                      </button>
                    )}
                  </div>

                  {couponCode && (
                    <div className="mb-4 flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-lg text-[#1a3d2f] text-xs font-semibold">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                        Code <strong className="text-emerald-950 font-bold uppercase">{couponCode}</strong> applied
                      </span>
                      <span className="font-bold">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Available Coupons list */}
                  {availableCoupons.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-2">Available Coupons (Click to apply)</p>
                      <div className="flex flex-wrap gap-2">
                        {availableCoupons.map((code) => {
                          const isApplied = couponCode === code;
                          return (
                            <button
                              key={code}
                              type="button"
                              onClick={() => {
                                if (isApplied) {
                                  removeCoupon();
                                } else {
                                  applyCoupon(code);
                                }
                              }}
                              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                                isApplied
                                  ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-extrabold shadow-sm"
                                  : "border-gray-200 bg-white text-gray-600 hover:border-[#c4a064] hover:text-[#c4a064]"
                              }`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${isApplied ? "bg-emerald-600" : "bg-yellow-500"}`} />
                              {code}
                              {code === "WELCOME5" && <span className="text-[9px] font-normal text-gray-400 lowercase">(5% off)</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
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
                          className="mt-2 w-full bg-brand-emerald px-2 py-2 text-[9px] font-bold uppercase bg-yellow-600 tracking-widest text-white transition-colors hover:bg-emerald-900"
                        >
                          Add
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-gray-100 bg-white px-10 py-5 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.12)] space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
                <span>Subtotal ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="font-semibold text-gray-800">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
                <span>Delivery / Shipping</span>
                {shipping > 0 ? (
                  <span className="font-semibold text-gray-800">₹{shipping.toLocaleString()}</span>
                ) : (
                  <span className="font-bold text-emerald-700">FREE</span>
                )}
              </div>
              {milestoneDiscount > 0 && (
                <div className="flex items-center justify-between text-xs text-[#c4a064] uppercase tracking-widest font-semibold">
                  <span>Steal Deal (10% Off)</span>
                  <span>- ₹{milestoneDiscount.toLocaleString()}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-xs text-[#c4a064] uppercase tracking-widest font-semibold">
                  <span>Discount ({couponCode})</span>
                  <span>- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between font-serif uppercase border-t border-gray-100 pt-2">
                <span className="text-sm tracking-[0.2em] text-brand-emerald">Estimated Total</span>
                <span className="text-xl font-bold text-brand-emerald">₹{total.toLocaleString()}</span>
              </div>

              {hasInsufficientStock && (
                <p className="text-[10.5px] text-red-600 font-bold uppercase tracking-wider text-center mt-3 bg-red-50 py-2 border border-red-100 rounded-md">
                  ⚠️ Some items have insufficient stock. Please adjust quantities.
                </p>
              )}

              <Button
                variant="gold"
                size="lg"
                className="mt-4 w-full"
                disabled={cart.length === 0 || hasInsufficientStock}
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
