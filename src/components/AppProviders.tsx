"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { OpenCartFromSearchParams } from "@/components/cart/OpenCartFromSearchParams";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? "";

const GoogleOAuthProviderWrapper = dynamic(
  () =>
    import("@/components/auth/GoogleOAuthProviderWrapper").then((m) => m.GoogleOAuthProviderWrapper),
  { ssr: false }
);

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

  return <GoogleOAuthProviderWrapper clientId={googleClientId}>{inner}</GoogleOAuthProviderWrapper>;
}
