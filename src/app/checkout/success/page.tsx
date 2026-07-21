"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();
  const order = params.get("order") ?? "";

  return (
    <div className="w-full max-w-lg mx-auto text-center px-6 py-16">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
      <h1 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-4">
        Thank you
      </h1>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Your payment was received{order ? ` for order ${order}` : ""}. You can
        review this order anytime from your profile.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/profile">
          <Button variant="gold">View orders</Button>
        </Link>
        <Link href="/category/all">
          <Button variant="outline">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-28 pb-16">
        <Suspense
          fallback={
            <p className="text-center text-gray-500">Loading…</p>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
