"use client";

import React, { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { OpenCartFromSearchParams } from "@/components/cart/OpenCartFromSearchParams";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const inner = (
    <CartProvider>
      <WishlistProvider>
        <AuthProvider>
          <Suspense fallback={null}>
            <OpenCartFromSearchParams />
          </Suspense>
          <CartDrawer />
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </WishlistProvider>
    </CartProvider>
  );

  if (!googleClientId) {
    return inner;
  }

  return <GoogleOAuthProvider clientId={googleClientId}>{inner}</GoogleOAuthProvider>;
}
