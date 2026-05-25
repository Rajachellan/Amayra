"use client";

import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => { open: () => void };

type CheckoutBody = {
  orderId: string;
  orderNumber: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
};

type CustomerAddress = {
  line1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
};

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const CHECKOUT_SHIPPING_PREFIX = "amayra_checkout_shipping_v1_";

/** Razorpay Standard Checkout accent (nearest solid hex to storefront `gold-gradient` CTA). */
const RAZORPAY_CHECKOUT_THEME = {
  color: "#c49a29",
  backdrop_color: "#111827",
} as const;

function shippingStorageKey(customerId: string) {
  return `${CHECKOUT_SHIPPING_PREFIX}${customerId}`;
}

type ShippingDraft = {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

function readShippingDraft(customerId: string): Partial<ShippingDraft> | null {
  try {
    const raw = sessionStorage.getItem(shippingStorageKey(customerId));
    if (!raw) return null;
    const d = JSON.parse(raw) as Partial<ShippingDraft>;
    return d && typeof d === "object" ? d : null;
  } catch {
    return null;
  }
}

function writeShippingDraft(customerId: string, draft: ShippingDraft) {
  try {
    sessionStorage.setItem(shippingStorageKey(customerId), JSON.stringify(draft));
  } catch {
    /* quota / private mode */
  }
}

export function clearCheckoutShippingDraft(customerId: string) {
  try {
    sessionStorage.removeItem(shippingStorageKey(customerId));
  } catch {
    /* ignore */
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { cart, subtotal, clearCart, openCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("IN");
  const [profileLoaded, setProfileLoaded] = useState(false);

  const [paying, setPaying] = useState(false);

  const shipping = 0;
  const tax = Math.round(subtotal * 0.03 * 100) / 100;
  const displayTotal = subtotal + shipping + tax;

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/auth/login?next=/checkout");
      return;
    }
    api<{ name?: string; phone?: string; addresses?: CustomerAddress[] }>("/auth/customer/me")
      .then((me) => {
        setFullName(me.name ?? "");
        setPhone(me.phone ?? "");
        const a = me.addresses?.[0];
        if (a) {
          if (a.line1) setLine1(a.line1);
          if (a.city) setCity(a.city);
          if (a.state) setStateVal(a.state);
          if (a.pincode) setPincode(a.pincode);
          if (a.country) setCountry(a.country);
        }
      })
      .catch(() => {
        /* me already implied by checkout gate */
      })
      .finally(() => setProfileLoaded(true));
  }, [authLoading, user, router]);

  /** Restore typed shipping before persistence effects run (avoid wiping session draft). */
  useLayoutEffect(() => {
    if (!user?.id || !profileLoaded) return;
    const draft = readShippingDraft(user.id);
    if (!draft) return;
    if (draft.fullName !== undefined) setFullName(draft.fullName);
    if (draft.phone !== undefined) setPhone(draft.phone);
    if (draft.line1 !== undefined) setLine1(draft.line1);
    if (draft.city !== undefined) setCity(draft.city);
    if (draft.state !== undefined) setStateVal(draft.state);
    if (draft.pincode !== undefined) setPincode(draft.pincode);
    if (draft.country !== undefined) setCountry(draft.country);
  }, [user?.id, profileLoaded]);

  /** Persist shipping while editing. */
  useEffect(() => {
    if (!user?.id || !profileLoaded) return;
    writeShippingDraft(user.id, {
      fullName,
      phone,
      line1,
      city,
      state: stateVal,
      pincode,
      country,
    });
  }, [user?.id, profileLoaded, fullName, phone, line1, city, stateVal, pincode, country]);

  const validCart = useMemo(() => cart.filter((i) => i.slug?.trim()), [cart]);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!user || validCart.length === 0) {
      toast.error("Your cart is empty or invalid for checkout.");
      return;
    }
    setPaying(true);
    try {
      const missingSlug = cart.some((i) => !i.slug?.trim());
      if (missingSlug) throw new Error("Some items are missing a product reference. Empty your cart and re-add from the catalogue.");

      const checkoutRes = await api<CheckoutBody>("/orders/checkout", {
        method: "POST",
        body: JSON.stringify({
          items: validCart.map((c) => ({ slug: c.slug.trim(), quantity: c.quantity })),
          shippingAddress: {
            fullName: fullName.trim(),
            phone: phone.trim(),
            line1: line1.trim(),
            city: city.trim(),
            state: stateVal.trim(),
            pincode: pincode.trim(),
            country: country.trim() || "IN",
          },
        }),
      });

      const key = checkoutRes.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!key) throw new Error("Payment key not configured (set RAZORPAY_KEY_ID on server or NEXT_PUBLIC_RAZORPAY_KEY_ID)");

      const rzOk = await loadRazorpay();
      const RZ = typeof window !== "undefined" ? window.Razorpay : undefined;
      if (!rzOk || !RZ) throw new Error("Could not load Razorpay checkout");

      await new Promise<void>((resolve) => {
        const rzp = new RZ({
          key,
          amount: checkoutRes.amount,
          currency: checkoutRes.currency ?? "INR",
          order_id: checkoutRes.razorpayOrderId,
          name: "Shree Aarna",
          description: `Order ${checkoutRes.orderNumber}`,
          prefill: {
            email: user.email,
            name: fullName.trim(),
            contact: phone.trim(),
          },
          theme: RAZORPAY_CHECKOUT_THEME,
          handler(response: RazorpaySuccess) {
            void (async () => {
              try {
                await api("/payments/verify", {
                  method: "POST",
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });
                clearCart();
                clearCheckoutShippingDraft(user.id);
                toast.success("Payment successful");
                router.push(`/checkout/success?order=${encodeURIComponent(checkoutRes.orderNumber)}`);
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Payment verification failed");
                router.push("/checkout/failed");
              } finally {
                resolve();
              }
            })();
          },
          modal: {
            ondismiss() {
              setPaying(false);
              toast("Payment cancelled", { icon: "ℹ️" });
              resolve();
            },
          },
        });
        rzp.open();
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
      router.push("/checkout/failed");
    } finally {
      setPaying(false);
    }
  }

  if (authLoading || !user || !profileLoaded) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-32">
          <Loader2 className="w-10 h-10 animate-spin text-brand-emerald" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6">
          <button
            type="button"
            onClick={() => openCart()}
            className="inline-flex items-center mb-8 border-0 bg-transparent p-0 text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-brand-gold cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to cart
          </button>

          <h1 className="text-4xl md:text-5xl font-serif text-brand-emerald mb-12 tracking-widest uppercase">
            Checkout
          </h1>

          <div className="flex flex-col lg:flex-row gap-12">
            <form className="w-full lg:w-2/3 space-y-6 bg-white p-8 shadow-sm" onSubmit={handlePay}>
              <h2 className="font-serif text-xl tracking-widest uppercase pb-4 border-b">Shipping</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full name</label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Address line</label>
                  <input
                    required
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">City</label>
                  <input required value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">State</label>
                  <input required value={stateVal} onChange={(e) => setStateVal(e.target.value)} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pincode</label>
                  <input required value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Country</label>
                  <input required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold" />
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full mt-4" disabled={validCart.length === 0 || paying}>
                {paying ? (
                  <>
                    <Loader2 className="animate-spin mr-2 w-5 h-5" /> Processing…
                  </>
                ) : (
                  "Pay securely"
                )}
              </Button>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                Total charged is validated on our server ({displayTotal.toLocaleString()} INR is an estimate; final amount follows live prices).
              </p>
            </form>

            <aside className="w-full lg:w-1/3">
              <div className="bg-white p-8 shadow-sm space-y-6 sticky top-32">
                <h3 className="font-serif text-xl tracking-widest uppercase pb-4 border-b">Your order</h3>
                {validCart.length === 0 ? (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                ) : (
                  <ul className="space-y-4 max-h-80 overflow-y-auto">
                    {validCart.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-20 shrink-0 overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-serif text-brand-emerald truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Qty {item.quantity}</p>
                          <p className="text-sm font-bold text-brand-emerald">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (3%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-brand-emerald pt-2 border-t">
                    <span className="uppercase tracking-widest text-xs">Estimated total</span>
                    <span>₹{displayTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
