"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { ArrowLeft, Loader2, Package, MapPin, CreditCard, ShieldCheck, CheckCircle2, Printer } from "lucide-react";
import { OrderTrackingSection } from "@/components/orders/OrderTrackingSection";

type OrderDetail = {
  _id: string;
  orderNumber: string;
  status: string;
  orderStatus?: string;
  returnStatus?: string;
  refundStatus?: string;
  paymentMethod?: string;
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
    product: string;
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

  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnReason, setReturnReason] = useState("DONT_LIKE");
  const [returnDesc, setReturnDesc] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [submittingReturn, setSubmittingReturn] = useState(false);
  const [returnErr, setReturnErr] = useState("");
  const [returnSuccess, setReturnSuccess] = useState(false);

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

  useEffect(() => {
    if (order) {
      const initial: Record<string, number> = {};
      order.items.forEach((item) => {
        if (item.product) {
          initial[item.product] = item.quantity;
        }
      });
      setSelectedItems(initial);
    }
  }, [order]);

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReturnErr("");

    const items = Object.entries(selectedItems)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => ({
        product: productId,
        quantity: qty,
      }));

    if (items.length === 0) {
      setReturnErr("Please select at least one item to return");
      return;
    }

    setSubmittingReturn(true);
    try {
      await api("/returns", {
        method: "POST",
        body: JSON.stringify({
          orderId: order?._id,
          items,
          reason: returnReason,
          description: returnDesc,
        }),
      });
      setReturnSuccess(true);
    } catch (err: any) {
      setReturnErr(err.message || "Failed to submit return request");
    } finally {
      setSubmittingReturn(false);
    }
  };

  if (authLoading || (!user && !err)) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center pt-32 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#c9a84c]" />
          <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">
            Loading order details…
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1510] flex flex-col">
      <Navbar />

      <section className="flex-grow pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          href="/profile"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 hover:text-[#0B2516] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Profile Dashboard
        </Link>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-[#c9a84c]" />
          </div>
        ) : err || !order ? (
          <div className="bg-white p-10 rounded-3xl border border-stone-200 shadow-xl text-center space-y-4">
            <p className="text-rose-600 text-sm font-medium">{err || "Order not found"}</p>
            <Link href="/profile">
              <Button variant="outline" className="rounded-full px-6 py-2.5 uppercase text-xs tracking-wider">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xl shadow-stone-200/50 space-y-10">
            
            {/* Header / Order Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#c9a84c]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
                    Mairii Verified Order
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif text-[#0B2516] font-medium">
                  Order #{order.orderNumber}
                </h1>
                <p className="text-xs text-stone-400 tracking-wider uppercase font-medium mt-1">
                  Placed on {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-3 self-start sm:self-auto">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-[#0B2516] text-[#c9a84c]">
                    {order.status.replace(/_/g, " ")}
                  </span>
                  {order.returnStatus && order.returnStatus !== "NOT_REQUESTED" && (
                    <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-[#c9a84c] text-[#0B2516]">
                      Return: {order.returnStatus.replace(/_/g, " ")}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/profile/orders/${order.orderNumber}/invoice`}>
                    <button className="px-4 py-1.5 border border-stone-300 hover:border-[#0B2516] text-stone-700 hover:text-[#0B2516] text-[10px] uppercase tracking-wider font-semibold rounded-full transition-all flex items-center gap-1.5 bg-white">
                      <Printer className="w-3.5 h-3.5" />
                      Invoice
                    </button>
                  </Link>

                  {/* Return Button */}
                  {(order.status === "delivered" || order.status === "DELIVERED" || order.orderStatus === "DELIVERED") && 
                   (!order.returnStatus || order.returnStatus === "NOT_REQUESTED" || order.returnStatus === "REJECTED") && (
                    <button
                      onClick={() => setIsReturnModalOpen(true)}
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] uppercase tracking-wider font-semibold rounded-full transition-all font-sans"
                    >
                      Request Return
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Tracking Section */}
            <OrderTrackingSection orderId={order._id} orderStatus={order.status} />

            {/* Purchased Items Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 border-b border-stone-100 pb-3">
                <Package className="w-4 h-4 text-[#c9a84c]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Ordered Items</h2>
              </div>
              
              <ul className="divide-y divide-stone-100">
                {order.items.map((it, idx) => (
                  <li key={`${it.slug}-${idx}`} className="py-4 flex items-center justify-between gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="font-serif text-stone-900 text-base font-medium">{it.name}</p>
                      <p className="text-xs text-stone-400">Quantity: {it.quantity} × ₹{it.unitPrice.toLocaleString()}</p>
                    </div>
                    <span className="font-semibold text-stone-900">₹{it.lineTotal.toLocaleString()}</span>
                  </li>
                ))}
              </ul>

              {/* Price Breakdown */}
              <div className="bg-stone-50/70 rounded-2xl p-5 space-y-2.5 text-xs text-stone-600 border border-stone-200/60 mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST)</span>
                  <span>₹{order.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span>₹{order.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-sm pt-3 border-t border-stone-200">
                  <span className="uppercase tracking-widest">Total Paid</span>
                  <span className="font-serif text-lg text-[#0B2516]">₹{order.total.toLocaleString()} {order.currency}</span>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-stone-900 border-b border-stone-100 pb-2">
                  <MapPin className="w-4 h-4 text-[#c9a84c]" />
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">Shipping Address</h2>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  <span className="font-semibold text-stone-900">{order.shippingAddress.fullName}</span>
                  <br />
                  {order.shippingAddress.line1}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
                  <br />
                  {order.shippingAddress.country ?? "IN"} · {order.shippingAddress.phone}
                </p>
              </div>

              {order.payment && typeof order.payment === "object" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 border-b border-stone-100 pb-2">
                    <CreditCard className="w-4 h-4 text-[#c9a84c]" />
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">Payment Information</h2>
                  </div>
                  <div className="text-xs text-stone-600 space-y-1 pt-1">
                    <p className="capitalize">
                      Status: <span className="font-semibold text-stone-900">{order.payment.status?.replace(/_/g, " ") ?? "—"}</span>
                    </p>
                    {order.payment.method && (
                      <p className="capitalize">Method: {order.payment.method}</p>
                    )}
                    {order.payment.razorpayPaymentId && (
                      <p className="text-[11px] text-stone-400 font-mono">Ref ID: {order.payment.razorpayPaymentId}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Return Request Modal Overlay */}
            {isReturnModalOpen && order && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 shadow-2xl relative space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#0B2516] font-medium">Request Return</h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Select items and specify details for order #{order.orderNumber}
                    </p>
                  </div>

                  {returnSuccess ? (
                    <div className="space-y-4 text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-semibold text-emerald-800">Return Request Submitted Successfully</p>
                      <p className="text-xs text-stone-500">
                        Our team will review your request and schedule a courier pickup.
                      </p>
                      <button
                        onClick={() => {
                          setIsReturnModalOpen(false);
                          setReturnSuccess(false);
                          window.location.reload();
                        }}
                        className="px-6 py-2.5 bg-[#0B2516] text-white text-xs uppercase tracking-wider font-semibold rounded-full"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleReturnSubmit} className="space-y-4 text-xs text-stone-600">
                      {returnErr && (
                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
                          {returnErr}
                        </div>
                      )}

                      {/* Item selection */}
                      <div className="space-y-3">
                        <label className="font-bold text-stone-700 uppercase tracking-wider">Select Items to Return:</label>
                        <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto pr-2">
                          {order.items.map((item) => {
                            const isSelected = selectedItems[item.product] > 0;
                            return (
                              <div key={item.product} className="py-2.5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      setSelectedItems((prev) => ({
                                        ...prev,
                                        [item.product]: e.target.checked ? item.quantity : 0,
                                      }));
                                    }}
                                    className="rounded border-stone-300 text-[#0B2516] focus:ring-[#0B2516] w-4 h-4"
                                  />
                                  <div>
                                    <p className="font-semibold text-stone-900">{item.name}</p>
                                    <p className="text-[10px] text-stone-400">Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString()}</p>
                                  </div>
                                </div>

                                {isSelected && item.quantity > 1 && (
                                  <div className="flex items-center gap-2">
                                    <span>Qty to return:</span>
                                    <select
                                      value={selectedItems[item.product]}
                                      onChange={(e) => {
                                        setSelectedItems((prev) => ({
                                          ...prev,
                                          [item.product]: Number(e.target.value),
                                        }));
                                      }}
                                      className="bg-stone-50 border border-stone-200 rounded px-2 py-1 focus:outline-none"
                                    >
                                      {Array.from({ length: item.quantity }, (_, i) => i + 1).map((val) => (
                                        <option key={val} value={val}>
                                          {val}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Return Reason */}
                      <div className="space-y-1.5">
                        <label className="font-bold text-stone-700 uppercase tracking-wider">Reason for Return:</label>
                        <select
                          value={returnReason}
                          onChange={(e) => setReturnReason(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#c9a84c] text-stone-700"
                        >
                          <option value="DONT_LIKE">Don't Like / Changed Mind</option>
                          <option value="DAMAGED">Damaged Product Received</option>
                          <option value="WRONG_PRODUCT">Wrong Product Delivered</option>
                          <option value="QUALITY_ISSUE">Quality Issue</option>
                          <option value="SIZE_ISSUE">Incorrect Size</option>
                          <option value="OTHER">Other / Describe below</option>
                        </select>
                      </div>

                      {/* Return Description */}
                      <div className="space-y-1.5">
                        <label className="font-bold text-stone-700 uppercase tracking-wider">Additional details:</label>
                        <textarea
                          value={returnDesc}
                          onChange={(e) => setReturnDesc(e.target.value)}
                          rows={3}
                          placeholder="Please provide any comments or details about the product state..."
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#c9a84c] text-stone-700"
                        />
                      </div>

                      {/* Form Actions */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsReturnModalOpen(false)}
                          className="px-5 py-2.5 border border-stone-300 hover:bg-stone-50 rounded-full font-semibold uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submittingReturn}
                          className="px-5 py-2.5 bg-[#0B2516] hover:bg-[#c9a84c] text-white hover:text-[#0B2516] rounded-full font-semibold uppercase tracking-wider disabled:opacity-50 transition-all"
                        >
                          {submittingReturn ? "Submitting..." : "Submit Request"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

          </div>
        )}
      </section>

      {/* No Footer on Profile page as requested */}
    </main>
  );
}
