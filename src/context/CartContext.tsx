"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Product, CartItem } from "../types";
import { toast } from "react-hot-toast";
import { shopApi, type CartPricingResponse } from "@/lib/api/shop";

interface CartContextType {
  cart: CartItem[];
  /** Right-side cart drawer visibility */
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  addToCartWithQuantity: (
    product: Product,
    quantity: number,
    options?: { openDrawer?: boolean }
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: (options?: { silent?: boolean }) => void;
  buyNow: (product: Product, quantity: number) => void;
  subtotal: number;
  couponCode: string | null;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  pricingResult: CartPricingResponse | null;
  loadingPricing: boolean;
  refreshPricing: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [isCartOpen, setCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [pricingResult, setPricingResult] = useState<CartPricingResponse | null>(null);
  const [loadingPricing, setLoadingPricing] = useState<boolean>(false);

  const refreshPricing = useCallback(async () => {
    if (!cart.length) {
      setPricingResult(null);
      return;
    }
    setLoadingPricing(true);
    try {
      const items = cart.map((i) => ({ slug: i.slug, productId: i.id, quantity: i.quantity }));
      const pricing = await shopApi.calculateCart(items, couponCode || undefined);
      setPricingResult(pricing);
      if (pricing.appliedCoupon) {
        setDiscountAmount(pricing.couponDiscount);
      }
    } catch (err) {
      console.error("Cart pricing calculation error:", err);
    } finally {
      setLoadingPricing(false);
    }
  }, [cart, couponCode]);

  useEffect(() => {
    refreshPricing();
  }, [refreshPricing]);

  const applyCoupon = useCallback(
    async (code: string) => {
      const trimmed = code.trim().toUpperCase();
      if (!trimmed) return false;

      try {
        const items = cart.map((i) => ({ slug: i.slug, productId: i.id, quantity: i.quantity }));
        const pricing = await shopApi.calculateCart(items, trimmed);
        if (pricing.appliedCoupon) {
          setCouponCode(pricing.appliedCoupon.code);
          setDiscountAmount(pricing.couponDiscount);
          setPricingResult(pricing);
          toast.success(`Coupon ${pricing.appliedCoupon.code} applied!`);
          return true;
        } else {
          toast.error("Coupon is not valid for this cart");
          return false;
        }
      } catch (err: any) {
        toast.error(err?.message || "Invalid coupon code.");
        return false;
      }
    },
    [cart]
  );

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
    setDiscountAmount(0);
    toast.success("Coupon removed.");
  }, []);

  useEffect(() => {
    if (!couponCode) {
      setDiscountAmount(0);
      return;
    }
    let pct = 0.05;
    if (couponCode === "WELCOME5") {
      pct = 0.05;
    } else {
      const match = couponCode.match(/\d+/);
      if (match) {
        const val = parseInt(match[0], 10);
        if (val > 0 && val <= 100) pct = val / 100;
      }
    }
    const discount = Math.round(subtotal * pct * 100) / 100;
    setDiscountAmount(discount);
  }, [subtotal, couponCode]);

  const setIsCartOpen = useCallback((isOpen: boolean) => setCartOpen(isOpen), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen((o) => !o), []);

  // Load cart from local storage and sync with database stock/price on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        setCart(parsedCart);
        if (parsedCart.length > 0) {
          Promise.all(
            parsedCart
              .filter((item) => !!item.slug)
              .map((item) =>
                shopApi.productBySlug(item.slug!)
                  .then((p: any) => ({
                    id: item.id,
                    stock: typeof p.stock === "number" ? p.stock : 0,
                    price: typeof p.price === "number" ? p.price : item.price,
                  }))
                  .catch(() => null)
              )
          ).then((results) => {
            setCart((prev) =>
              prev.map((item) => {
                const updated = results.find((r) => r && r.id === item.id);
                if (updated) {
                  const newQty = Math.min(item.quantity, updated.stock);
                  return {
                    ...item,
                    stock: updated.stock,
                    price: updated.price,
                    quantity: updated.stock <= 0 ? 0 : Math.max(1, newQty),
                  };
                }
                return item;
              })
            );
          });
        }
      } catch (err) {
        console.error("Failed to load / sync cart:", err);
      }
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCartWithQuantity = useCallback(
    (product: Product, quantity: number, options?: { openDrawer?: boolean }) => {
      const requestedQty = Math.max(1, Math.floor(quantity));
      const maxStock = typeof product.stock === "number" ? product.stock : 0;
      if (maxStock <= 0) {
        toast.error("This item is out of stock.");
        return;
      }
      let isCapped = false;
      let finalMessage = `Added ${product.name} to cart`;

      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        const existingQty = existingItem ? existingItem.quantity : 0;
        const desiredTotal = existingItem ? existingQty + requestedQty : requestedQty;
        
        if (desiredTotal > maxStock) {
          isCapped = true;
          const allowedQty = Math.max(1, maxStock);
          finalMessage = `Only ${maxStock} in stock. Set bag quantity to ${allowedQty}.`;
          if (existingItem) {
            return prev.map((item) =>
              item.id === product.id ? { ...item, ...product, quantity: allowedQty, stock: maxStock } : item
            );
          }
          return [...prev, { ...product, quantity: allowedQty, stock: maxStock }];
        }

        if (existingItem) {
          finalMessage = `Updated ${product.name} in cart (${desiredTotal} in bag)`;
          return prev.map((item) =>
            item.id === product.id ? { ...item, ...product, quantity: desiredTotal, stock: maxStock } : item
          );
        }

        return [...prev, { ...product, quantity: requestedQty, stock: maxStock }];
      });

      if (isCapped) {
        toast.error(`Only ${maxStock} items available in stock.`);
      } else {
        toast.success(finalMessage);
      }
      if (options?.openDrawer !== false) openCart();
    },
    [openCart]
  );

  const addToCart = useCallback(
    (product: Product) => {
      addToCartWithQuantity(product, 1, { openDrawer: true });
    },
    [addToCartWithQuantity]
  );

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Removed from cart");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const maxStock = typeof item.stock === "number" ? item.stock : 0;
          const nextQty = item.quantity + delta;
          if (nextQty > maxStock) {
            toast.error(`Cannot add more. Only ${maxStock} available in stock.`);
            return { ...item, quantity: Math.max(0, maxStock), stock: maxStock };
          }
          if (nextQty < 1) return item;
          return { ...item, quantity: nextQty, stock: maxStock };
        }
        return item;
      })
    );
  };

  const clearCart = useCallback((options?: { silent?: boolean }) => {
    setCart([]);
    setCouponCode(null);
    setDiscountAmount(0);
    if (!options?.silent) toast.success("Cart cleared");
  }, []);

  const buyNow = useCallback((product: Product, quantity: number) => {
    const q = Math.max(1, Math.floor(quantity));
    setCart([{ ...product, quantity: q }]);
    toast.success(`Proceeding to checkout`);
  }, []);


  const value = useMemo(
    () => ({
      cart,
      isCartOpen,
      openCart,
      closeCart,
      setIsCartOpen,
      toggleCart,
      addToCart,
      addToCartWithQuantity,
      removeFromCart,
      updateQuantity,
      clearCart,
      buyNow,
      subtotal,
      couponCode,
      discountAmount,
      applyCoupon,
      removeCoupon,
      pricingResult,
      loadingPricing,
      refreshPricing,
    }),
    [
      cart,
      isCartOpen,
      openCart,
      closeCart,
      setIsCartOpen,
      toggleCart,
      addToCart,
      addToCartWithQuantity,
      removeFromCart,
      updateQuantity,
      clearCart,
      buyNow,
      subtotal,
      couponCode,
      discountAmount,
      applyCoupon,
      removeCoupon,
      pricingResult,
      loadingPricing,
      refreshPricing,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
