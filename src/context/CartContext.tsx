"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Product, CartItem } from "../types";
import { toast } from "react-hot-toast";

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const setIsCartOpen = useCallback((isOpen: boolean) => setCartOpen(isOpen), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen((o) => !o), []);

  // Load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCartWithQuantity = useCallback(
    (product: Product, quantity: number, options?: { openDrawer?: boolean }) => {
      const q = Math.max(1, Math.floor(quantity));
      let message = `Added ${product.name} to cart`;

      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
          message = `Updated ${product.name} in cart`;
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: q } : item
          );
        }
        return [...prev, { ...product, quantity: q }];
      });

      toast.success(message);
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
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = useCallback((options?: { silent?: boolean }) => {
    setCart([]);
    if (!options?.silent) toast.success("Cart cleared");
  }, []);

  const buyNow = useCallback((product: Product, quantity: number) => {
    const q = Math.max(1, Math.floor(quantity));
    setCart([{ ...product, quantity: q }]);
    toast.success(`Proceeding to checkout`);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
    }),
    [cart, isCartOpen, openCart, closeCart, setIsCartOpen, toggleCart, addToCart, addToCartWithQuantity, clearCart, buyNow, subtotal]
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
