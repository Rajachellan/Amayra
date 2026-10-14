"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, Tag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { shopApi, type CartPricingResponse, type PublicCouponDoc } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { formatPrice, formatCurrency } from "@/lib/formatPrice";
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
    pricingResult,
  } = useCart();

  const [realProducts, setRealProducts] = useState<Product[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<PublicCouponDoc[]>([]);
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

    // Fetch active public coupons from Coupon management API
    shopApi.coupons()
      .then((coupons) => {
        setAvailableCoupons(coupons || []);
      })
      .catch((err) => console.error("Failed to load active coupons:", err));
  }, [isCartOpen]);

  const [pricingConfig, setPricingConfig] = useState<{
    discountSlabs: Array<{ minimumCartValue: number; discountPercentage: number }>;
    enableFreeGift: boolean;
    freeGiftThreshold: number;
    freeGiftName: string;
  } | null>(null);

  useEffect(() => {
    shopApi.pricingSettings()
      .then(setPricingConfig)
      .catch((err) => console.error("Failed to load pricing settings:", err));
  }, []);

  const FREE_SHIPPING_THRESHOLD = 999;
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? 199 : 0;

  // Active discount slabs from pricingResult (calculated) or pricingConfig (public settings)
  const discountSlabs = useMemo(() => {
    const raw = pricingResult?.discountSlabs || pricingConfig?.discountSlabs || [];
    let list = raw.filter((s) => s.discountPercentage > 0 && s.minimumCartValue > 0);

    // Resilient fallback: extract active slab and upcoming upsell slab if raw is not yet returned
    if (list.length === 0 && pricingResult) {
      if (
        pricingResult.discountSlab &&
        pricingResult.discountSlab.discountPercentage > 0 &&
        pricingResult.discountSlab.minimumCartValue > 0
      ) {
        list.push({
          minimumCartValue: pricingResult.discountSlab.minimumCartValue,
          discountPercentage: pricingResult.discountSlab.discountPercentage,
        });
      }
      if (
        pricingResult.upsell?.available &&
        pricingResult.upsell.nextThreshold &&
        pricingResult.upsell.nextDiscountPercentage
      ) {
        list.push({
          minimumCartValue: pricingResult.upsell.nextThreshold,
          discountPercentage: pricingResult.upsell.nextDiscountPercentage,
        });
      }
    }

    // Default standard slabs fallback if API is still loading or returned empty
    if (list.length === 0) {
      list = [
        { minimumCartValue: 3499, discountPercentage: 10 },
        { minimumCartValue: 6999, discountPercentage: 16 },
      ];
    }

    return list.sort((a, b) => a.minimumCartValue - b.minimumCartValue);
  }, [pricingResult, pricingConfig]);

  // Current active discount percentage from highest matching slab
  const activeSlab = useMemo(() => {
    const matched = [...discountSlabs]
      .reverse()
      .find((s) => subtotal >= s.minimumCartValue);
    return matched || { minimumCartValue: 0, discountPercentage: 0 };
  }, [discountSlabs, subtotal]);

  const discountPct = pricingResult?.discountSlab?.discountPercentage ?? activeSlab.discountPercentage;

  const freeGiftEnabled = Boolean(pricingResult?.freeGift?.enabled ?? pricingConfig?.enableFreeGift);
  const freeGiftThreshold = pricingResult?.freeGift?.threshold ?? pricingConfig?.freeGiftThreshold ?? 6999;
  const freeGiftName = pricingResult?.freeGift?.name || pricingConfig?.freeGiftName || "Free Gift (Worth ₹799)";
  const freeGiftUnlocked = Boolean(pricingResult?.freeGift?.unlocked ?? (freeGiftEnabled && subtotal >= freeGiftThreshold));

  const milestoneDiscount = pricingResult
    ? pricingResult.automaticDiscount
    : discountPct > 0
      ? Math.round(subtotal * (discountPct / 100))
      : 0;

  const total = Math.max(0, subtotal - discountAmount - milestoneDiscount + shipping);

  // Dynamic milestones list generated from all added slabs
  // Dynamic milestones list generated from all added slabs
  const milestones = useMemo(() => {
    const list: Array<{
      id: string;
      label: string;
      threshold: number;
      type: "shipping" | "discount" | "gift" | "discount_and_gift";
      discountPct?: number;
      hasGift?: boolean;
      unlocked: boolean;
    }> = [];

    // Milestone 1: Free Shipping
    list.push({
      id: "shipping",
      label: "FREE SHIPPING",
      threshold: FREE_SHIPPING_THRESHOLD,
      type: "shipping",
      unlocked: subtotal >= FREE_SHIPPING_THRESHOLD,
    });

    // Each discount slab configured in admin panel
    discountSlabs.forEach((s) => {
      // If a slab has the same threshold as shipping, merge/override label
      const existing = list.find((m) => m.threshold === s.minimumCartValue);
      if (existing) {
        existing.label = `${s.discountPercentage}% OFF`;
        existing.type = "discount";
        existing.discountPct = s.discountPercentage;
      } else {
        list.push({
          id: `slab-${s.minimumCartValue}`,
          label: `${s.discountPercentage}% OFF`,
          threshold: s.minimumCartValue,
          type: "discount",
          discountPct: s.discountPercentage,
          unlocked: subtotal >= s.minimumCartValue,
        });
      }
    });

    // Free Gift milestone if enabled (merge if threshold matches an existing slab/milestone!)
    if (freeGiftEnabled && freeGiftThreshold > 0) {
      const existing = list.find((m) => m.threshold === freeGiftThreshold);
      if (existing) {
        if (existing.discountPct) {
          existing.label = `${existing.discountPct}% OFF + GIFT`;
        } else if (existing.id === "shipping") {
          existing.label = "FREE SHIP + GIFT";
        } else {
          existing.label = "FREE GIFT";
        }
        existing.type = "discount_and_gift";
        existing.hasGift = true;
      } else {
        list.push({
          id: "free-gift",
          label: "FREE GIFT",
          threshold: freeGiftThreshold,
          type: "gift",
          hasGift: true,
          unlocked: subtotal >= freeGiftThreshold,
        });
      }
    }

    return list.sort((a, b) => a.threshold - b.threshold);
  }, [subtotal, discountSlabs, freeGiftEnabled, freeGiftThreshold]);

  // Next locked milestone
  const nextMilestone = useMemo(() => {
    return milestones.find((m) => subtotal < m.threshold);
  }, [milestones, subtotal]);

  // Visual position of each milestone node along the horizontal track [0% - 100%]
  const nodePositions = useMemo(() => {
    const n = milestones.length;
    if (n === 0) return [];
    if (n === 1) return [70];
    if (n === 2) return [48, 92];
    if (n === 3) return [24, 58, 92];
    if (n === 4) return [18, 42, 68, 92];
    return milestones.map((_, i) => Math.round(15 + (i / (n - 1)) * 77));
  }, [milestones]);

  // Smooth progress calculation across all milestone nodes
  const progressVal = useMemo(() => {
    if (subtotal <= 0 || milestones.length === 0) return 0;
    const n = milestones.length;
    const firstThreshold = milestones[0].threshold;
    const firstPos = nodePositions[0] ?? 50;

    if (subtotal <= firstThreshold) {
      return (subtotal / firstThreshold) * firstPos;
    }

    for (let i = 0; i < n - 1; i++) {
      const curT = milestones[i].threshold;
      const nextT = milestones[i + 1].threshold;
      const curP = nodePositions[i] ?? 0;
      const nextP = nodePositions[i + 1] ?? 100;

      if (subtotal <= nextT) {
        const ratio = (subtotal - curT) / (nextT - curT);
        return curP + ratio * (nextP - curP);
      }
    }

    return 100;
  }, [subtotal, milestones, nodePositions]);

  // Banner text at the top of the cart (Matching reference image)
  const bannerText = useMemo(() => {
    if (subtotal <= 0) return "Add items to your bag to unlock luxury discounts!";
    if (nextMilestone) {
      const diff = nextMilestone.threshold - subtotal;
      const targetLabel = nextMilestone.hasGift && nextMilestone.discountPct
        ? `${nextMilestone.discountPct}% OFF + Free Gift`
        : nextMilestone.label;
      return (
        <span>
          You are <strong>₹{formatPrice(diff)}</strong> away from <strong>{targetLabel}</strong>
        </span>
      );
    }
    return <span>✓ All luxury discount milestones unlocked! ({discountPct}% OFF applied) 🎉</span>;
  }, [subtotal, nextMilestone, discountPct]);

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
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 sm:px-8 py-4">
              <div className="flex items-center gap-2">
                <h2 id="cart-drawer-title" className="font-serif text-lg tracking-[0.15em] text-brand-emerald uppercase">
                  Shopping Cart
                </h2>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-700">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-brand-emerald"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Top Gold Banner (matching reference image) */}
            {cart.length > 0 && (
              <div className="bg-[#856514] text-white py-2.5 px-4 text-center font-sans text-xs tracking-wider shrink-0 font-medium select-none shadow-sm">
                {bannerText}
              </div>
            )}

            {/* Dynamic Milestone Progress Track (matching reference image) */}
            {cart.length > 0 && milestones.length > 0 && (
              <div className="bg-white border-b border-stone-200/70 px-8 sm:px-10 pt-10 pb-11 select-none shrink-0 relative">
                <div className="relative h-1.5 bg-[#ebe4d8] rounded-full">
                  {/* Progress Fill */}
                  <div
                    className="absolute top-0 left-0 h-full bg-[#856514] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, progressVal))}%` }}
                  />

                  {/* Milestone Nodes */}
                  {milestones.map((m, idx) => {
                    const pos = nodePositions[idx] ?? 50;
                    const isUnlocked = subtotal >= m.threshold;
                    return (
                      <div
                        key={m.id}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
                        style={{ left: `${pos}%` }}
                      >
                        {/* Top Label */}
                        <div className="absolute bottom-full mb-2 -translate-x-1/2 left-1/2 text-center whitespace-nowrap">
                          <span
                            className={`text-[9.5px] sm:text-[10.5px] font-bold tracking-wider uppercase transition-colors ${
                              isUnlocked ? "text-[#856514]" : "text-stone-800"
                            }`}
                          >
                            {m.label}
                          </span>
                        </div>

                        {/* Node Circle */}
                        {isUnlocked ? (
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#856514] text-white flex items-center justify-center shadow-md shrink-0">
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-[#856514] text-[#856514] flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                            {m.hasGift || m.type === "gift" ? "🎁" : "%"}
                          </div>
                        )}

                        {/* Bottom Threshold Badge Pill */}
                        <div className="absolute top-full mt-2 -translate-x-1/2 left-1/2 text-center whitespace-nowrap">
                          <span className="inline-block bg-[#735818] text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                            ₹ {formatPrice(m.threshold)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="scrollbar-gold-slim-vertical min-h-0 flex-1 overflow-y-auto px-6 sm:px-8">
              {cart.length > 0 && pricingResult?.upsell?.available && (
                <div className="my-3 bg-[#fdfbf7] border border-[#c4a064]/50 rounded-lg p-3 font-sans shadow-sm text-center space-y-0.5">
                  <p className="text-xs font-extrabold text-[#1a3d2f] uppercase tracking-wider">
                    🎉 Add ₹{formatPrice(pricingResult.upsell.amountToUnlock)} more to unlock {pricingResult.upsell.nextDiscountPercentage}% OFF!
                  </p>
                  <p className="text-[11px] text-gray-600 font-medium">
                    Get ₹{formatPrice(pricingResult.upsell.amountToUnlock)} worth of jewelry for only{" "}
                    <strong className="text-emerald-800 font-bold underline">
                      ₹{formatPrice(pricingResult.upsell.additionalPayment)}
                    </strong>{" "}
                    more.
                  </p>
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
                  {freeGiftEnabled && freeGiftUnlocked && (
                    <li key="free-gift-item" className="flex gap-4 py-4 bg-emerald-50/50 border-b border-emerald-100 rounded-lg px-3 my-2">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded bg-white border border-emerald-200">
                        <Image src="/images/gift-box.webp" alt="Free Gift" fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="inline-block bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase mb-1">
                          🎁 COMPLIMENTARY GIFT
                        </span>
                        <p className="font-serif text-sm font-semibold uppercase tracking-wide text-brand-emerald">
                          {freeGiftName}
                        </p>
                        <p className="mt-1 text-[10px] text-emerald-800 font-medium">
                          Unlocked for cart subtotal ≥ ₹{formatPrice(freeGiftThreshold)}
                        </p>
                      </div>
                      <div className="shrink-0 pt-4 text-right">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
                          FREE
                        </span>
                      </div>
                    </li>
                  )}
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
                          ₹{formatPrice(item.price * item.quantity)}
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
                      <span className="font-bold">-₹{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  {/* Available Coupons list */}
                  {availableCoupons.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-2">Available Coupons (Click to apply)</p>
                      <div className="flex flex-wrap gap-2">
                        {availableCoupons.map((coupon) => {
                          const isApplied = couponCode === coupon.code;
                          const discountLabel =
                            coupon.discountType === "percentage"
                              ? `${coupon.discountValue}% off`
                              : `₹${formatPrice(coupon.discountValue)} off`;
                          return (
                            <button
                              key={coupon.code}
                              type="button"
                              onClick={() => {
                                if (isApplied) {
                                  removeCoupon();
                                } else {
                                  applyCoupon(coupon.code);
                                }
                              }}
                              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                                isApplied
                                  ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-extrabold shadow-sm"
                                  : "border-gray-200 bg-white text-gray-600 hover:border-[#c4a064] hover:text-[#c4a064]"
                              }`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${isApplied ? "bg-emerald-600" : "bg-yellow-500"}`} />
                              {coupon.code}
                              <span className="text-[9px] font-normal text-gray-400 lowercase">({discountLabel})</span>
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
                          ₹{formatPrice(p.price)}
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
                <span className="font-semibold text-gray-800">
                  ₹{formatPrice(pricingResult ? pricingResult.subtotal : subtotal)}
                </span>
              </div>

              {pricingResult && pricingResult.automaticDiscount > 0 && (
                <div className="flex items-center justify-between text-xs text-[#c4a064] uppercase tracking-widest font-semibold">
                  <span>Slab Discount ({pricingResult.discountSlab?.discountPercentage}% Off)</span>
                  <span>- ₹{formatPrice(pricingResult.automaticDiscount)}</span>
                </div>
              )}

              {pricingResult && pricingResult.couponDiscount > 0 && (
                <div className="flex items-center justify-between text-xs text-[#c4a064] uppercase tracking-widest font-semibold">
                  <span>Coupon Discount ({pricingResult.appliedCoupon?.code})</span>
                  <span>- ₹{formatPrice(pricingResult.couponDiscount)}</span>
                </div>
              )}

              {!pricingResult && milestoneDiscount > 0 && (
                <div className="flex items-center justify-between text-xs text-[#c4a064] uppercase tracking-widest font-semibold">
                  <span>Slab Discount ({discountPct}% Off)</span>
                  <span>- ₹{formatPrice(milestoneDiscount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
                <span>Delivery / Shipping</span>
                {shipping > 0 ? (
                  <span className="font-semibold text-gray-800">₹{formatPrice(shipping)}</span>
                ) : (
                  <span className="font-bold text-emerald-700">FREE</span>
                )}
              </div>

              <div className="flex items-center justify-between font-serif uppercase border-t border-gray-100 pt-2">
                <div>
                  <span className="text-sm tracking-[0.2em] text-brand-emerald">Estimated Total</span>
                  <p className="text-[9.5px] text-gray-400 font-sans tracking-normal uppercase">GST Included</p>
                </div>
                <span className="text-xl font-bold text-brand-emerald">
                  ₹{formatPrice(pricingResult ? pricingResult.finalAmount + shipping : total)}
                </span>
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
