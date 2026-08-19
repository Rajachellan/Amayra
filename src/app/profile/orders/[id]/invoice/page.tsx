"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { ArrowLeft, Loader2, Printer } from "lucide-react";

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
  paymentMethod?: string;
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
  }>;
  payment?: { status?: string; razorpayPaymentId?: string; method?: string };
};

export default function InvoicePage() {
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
      .catch((e) => setErr(e instanceof Error ? e.message : "Could not load invoice"))
      .finally(() => setLoading(false));
  }, [authLoading, user, id, router]);

  // Trigger print dialog automatically when loaded
  useEffect(() => {
    if (!loading && order) {
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, order]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#c9a84c]" />
        <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">
          Generating invoice preview…
        </span>
      </div>
    );
  }

  if (err || !order) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <p className="text-rose-600 text-sm font-medium">{err || "Order not found"}</p>
        <Link href={`/profile/orders/${id}`}>
          <button className="px-6 py-2.5 bg-[#0B2516] text-white rounded-full uppercase text-xs tracking-wider">
            Back to Order Detail
          </button>
        </Link>
      </div>
    );
  }

  const invoiceDate = new Date(order.createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-stone-50 text-[#1C1510] font-sans antialiased p-4 sm:p-8">
      {/* Printable page styling */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            border: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* Action Buttons (Hidden during printing) */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between no-print bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <Link
          href={`/profile/orders/${id}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 hover:text-[#0B2516] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Order
        </Link>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B2516] hover:bg-[#c9a84c] text-white hover:text-[#0B2516] font-semibold text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <Printer className="w-4 h-4" />
          Print Invoice
        </button>
      </div>

      {/* Invoice Card Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-stone-200/80 shadow-md p-8 sm:p-12 print-container relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-stone-100">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-wider text-[#0B2516]">
              Mairii <span className="text-[#c9a84c] font-light">Jewels</span>
            </h1>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold mt-1">
              Pure Luxury. Timeless Craftsmanship.
            </p>
          </div>
          <div className="text-left sm:text-right space-y-1">
            <h2 className="text-xl uppercase tracking-widest font-bold text-stone-800">
              Tax Invoice
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Invoice No: <span className="font-semibold text-stone-900">#INV-{order.orderNumber}</span>
            </p>
            <p className="text-xs text-stone-500 font-medium">
              Date: <span className="font-semibold text-stone-900">{invoiceDate}</span>
            </p>
          </div>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-stone-100 text-xs">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-stone-400 mb-2">Sold By:</h3>
            <p className="text-stone-900 font-semibold text-sm">Amayra Jewels Pvt. Ltd.</p>
            <p className="text-stone-600 leading-relaxed mt-1">
              123 Sparkle Mansion, Johari Bazar,
              <br />
              Jaipur, Rajasthan — 302001, India
              <br />
              GSTIN: 08AAAAA1111A1Z1
              <br />
              Email: support@mairiijewels.com
            </p>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider text-stone-400 mb-2">Shipped To:</h3>
            <p className="text-stone-900 font-semibold text-sm">
              {order.shippingAddress.fullName}
            </p>
            <p className="text-stone-600 leading-relaxed mt-1">
              {order.shippingAddress.line1}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
              <br />
              Country: {order.shippingAddress.country ?? "IN"}
              <br />
              Phone: {order.shippingAddress.phone}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="py-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase text-[10px] tracking-wider font-semibold">
                <th className="pb-3 w-8 font-semibold">#</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 text-right font-semibold">Unit Price</th>
                <th className="pb-3 text-center font-semibold">Qty</th>
                <th className="pb-3 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
              {order.items.map((it, idx) => (
                <tr key={idx} className="align-top">
                  <td className="py-4 font-medium text-stone-400">{idx + 1}</td>
                  <td className="py-4">
                    <p className="font-semibold text-stone-950 font-serif text-sm">{it.name}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">SKU: {it.slug}</p>
                  </td>
                  <td className="py-4 text-right">₹{it.unitPrice.toLocaleString()}</td>
                  <td className="py-4 text-center">{it.quantity}</td>
                  <td className="py-4 text-right font-semibold text-stone-900">
                    ₹{it.lineTotal.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start pt-6 border-t border-stone-200 gap-6">
          <div className="text-xs text-stone-500 leading-relaxed max-w-sm">
            <h4 className="font-bold uppercase tracking-wider text-stone-400 mb-1">
              Payment Method:
            </h4>
            <p className="capitalize text-stone-900 font-semibold">
              {order.payment?.method || order.paymentMethod || "PREPAID"}
            </p>
            {order.payment?.razorpayPaymentId && (
              <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                Txn Ref: {order.payment.razorpayPaymentId}
              </p>
            )}
            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/50">
              <p className="text-[10px]">
                Note: This is a computer-generated document. No signature is required. For return requests, use your online customer portal within 15 days of delivery.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-64 text-xs space-y-2 text-stone-600 self-end">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (Tax)</span>
              <span>₹{order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Insurance</span>
              <span>₹{order.shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-stone-900 text-sm pt-3 border-t border-stone-100">
              <span className="uppercase tracking-wider">Total</span>
              <span className="font-serif text-lg text-[#0B2516]">
                ₹{order.total.toLocaleString()} {order.currency}
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
