"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { OpenCartFromSearchParams } from "@/components/cart/OpenCartFromSearchParams";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { AuthModal } from "@/components/auth/AuthModal";
import { MasterpieceModal } from "@/components/home/MasterpieceModal";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? "";

const GoogleOAuthProviderWrapper = dynamic(
  () =>
    import("@/components/auth/GoogleOAuthProviderWrapper").then((m) => m.GoogleOAuthProviderWrapper),
  { ssr: false }
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [isMasterpieceOpen, setIsMasterpieceOpen] = React.useState(false);

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
          <WhatsAppButton />
          <AuthModal onCloseMasterpiece={() => setIsMasterpieceOpen(true)} />
          <MasterpieceModal
            isOpen={isMasterpieceOpen}
            onClose={() => setIsMasterpieceOpen(false)}
          />
        </AuthProvider>
      </WishlistProvider>
    </CartProvider>
  );

  if (!googleClientId) {
    return inner;
  }

  return <GoogleOAuthProviderWrapper clientId={googleClientId}>{inner}</GoogleOAuthProviderWrapper>;
}
