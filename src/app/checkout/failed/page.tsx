"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { XCircle } from "lucide-react";

export default function CheckoutFailedPage() {
  const { openCart } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="mx-auto flex max-w-lg flex-grow flex-col items-center px-6 py-20 text-center">
        <XCircle className="mx-auto mb-6 h-16 w-16 text-red-500" />
        <h1 className="mb-4 font-serif text-3xl tracking-widest text-brand-emerald uppercase">
          Payment not completed
        </h1>
        <p className="mb-8 text-gray-600">
          We couldn&apos;t confirm your payment. If money was deducted, it will be refunded by your bank according to
          Razorpay policy. You may try again safely.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/checkout">
            <Button variant="gold">Try again</Button>
          </Link>
          <Button type="button" variant="outline" onClick={() => openCart()}>
            Return to cart
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
