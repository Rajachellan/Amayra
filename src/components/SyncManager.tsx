"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { api } from "@/lib/api";

export function SyncManager() {
  const { user } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Sync Cart
  useEffect(() => {
    if (!user) return;

    const payload = cart.map((item) => ({
      productId: item.id,
      name: item.name,
      slug: item.slug ?? "",
      price: item.price,
      image: typeof item.image === "string" ? item.image : undefined,
      quantity: item.quantity,
    }));

    api("/customer/saved-items/cart", {
      method: "PUT",
      body: JSON.stringify(payload),
    }).catch((err) => console.error("Failed to sync cart to backend:", err));
  }, [cart, user]);

  // Sync Wishlist
  useEffect(() => {
    if (!user) return;

    const payload = wishlist.map((item) => ({
      productId: item.id,
      name: item.name,
      slug: item.slug ?? "",
      price: item.price,
      image: typeof item.image === "string" ? item.image : undefined,
    }));

    api("/customer/saved-items/wishlist", {
      method: "PUT",
      body: JSON.stringify(payload),
    }).catch((err) => console.error("Failed to sync wishlist to backend:", err));
  }, [wishlist, user]);

  return null;
}
