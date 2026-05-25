"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { ArrowLeft, Loader2 } from "lucide-react";

type OrderDetail = {
  _id: string;
  orderNumber: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  currency: string;
  createdAt: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  items: Array<{
    name: string;
    slug: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    image?: string;
  }>;
  payment?: { status?: string; razorpayPaymentId?: string; method?: string };
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/auth/login?next=/profile");
      return;
    }
    if (!id) return;
    setLoading(true);
    api<OrderDetail>(`/orders/${encodeURIComponent(id)}`)
      .then((o) => {
        setOrder(o);
        setErr("");
      })
      .catch((e) => setErr(e instanceof Error ? e.message : "Could not load order"))
      .finally(() => setLoading(false));
  }, [authLoading, user, id, router]);

  if (authLoading || (!user && !err)) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center pt-40">
          <Loader2 className="w-10 h-10 animate-spin text-brand-emerald" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-40 pb-24 container mx-auto px-6">
        <Link href="/profile" className="inline-flex items-center text-[10px] uppercase tracking-widest text-gray-500 hover:text-brand-gold mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to profile
        </Link>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-brand-emerald" />
          </div>
        ) : err || !order ? (
          <div className="bg-white p-10 shadow-sm text-center">
            <p className="text-red-500 mb-6">{err || "Order not found"}</p>
            <Link href="/profile">
              <Button variant="outline">Back</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white p-10 shadow-sm max-w-3xl">
            <h1 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-2">{order.orderNumber}</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-8">
              Placed {new Date(order.createdAt).toLocaleString()} · Status {order.status.replace(/_/g, " ")}
            </p>

            <div className="border-b pb-8 mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Items</h2>
              <ul className="space-y-4">
                {order.items.map((it, idx) => (
                  <li key={`${it.slug}-${idx}`} className="flex justify-between gap-4 text-sm">
                    <span className="font-serif text-brand-emerald">{it.name} × {it.quantity}</span>
                    <span className="shrink-0 font-bold">₹{it.lineTotal.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{order.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{order.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-brand-emerald pt-2 border-t">
                  <span className="uppercase tracking-widest text-xs">Total</span>
                  <span>₹{order.total.toLocaleString()} {order.currency}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Ship to</h2>
              <p className="text-sm tracking-widest uppercase text-gray-700 leading-relaxed">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.line1}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
                <br />
                {order.shippingAddress.country ?? "IN"} · {order.shippingAddress.phone}
              </p>
            </div>

            {order.payment && typeof order.payment === "object" && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Payment</h2>
                <p className="text-sm text-gray-600 capitalize">
                  {order.payment.status?.replace(/_/g, " ") ?? "—"}
                  {order.payment.method ? ` · ${order.payment.method}` : ""}
                </p>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
