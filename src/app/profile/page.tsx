"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { ProductCard } from "@/components/products/ProductCard";
import { User, Package, Heart, LogOut, ChevronRight, MapPin, Loader2, ShieldCheck, Mail, Phone } from "lucide-react";
import { api } from "@/lib/api";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

type OrderRow = {
  _id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items?: Array<{ image?: string; name: string }>;
  shiprocket?: { awbCode?: string; trackingUrl?: string };
};

function shippingHint(order: OrderRow) {
  if (order.shiprocket?.awbCode || order.status === "shipped" || order.status === "delivered") {
    return "Track delivery";
  }
  if (order.status === "paid" || order.status === "processing") {
    return "Preparing to ship";
  }
  return null;
}

type ProfileDetail = {
  name: string;
  email: string;
  phone?: string;
  addresses?: Array<{ line1: string; city: string; state: string; pincode: string; country?: string }>;
};

function statusLabel(status: string) {
  return status.replace(/_/g, " ");
}

export default function ProfilePage() {
  const router = useRouter();
  const { wishlist } = useWishlist();
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("wishlist");

  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersErr, setOrdersErr] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/auth/login?next=/profile");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    if (activeTab !== "profile") return;
    setProfileLoading(true);
    api<ProfileDetail>("/auth/customer/me")
      .then((p) => setProfile({ name: p.name, email: p.email, phone: p.phone, addresses: p.addresses }))
      .catch(() => setProfile(user ? { name: user.name, email: user.email, phone: user.phone } : null))
      .finally(() => setProfileLoading(false));
  }, [activeTab, user?.id]);

  useEffect(() => {
    if (!user) return;
    if (activeTab !== "orders") return;
    setOrdersLoading(true);
    api<{ items: OrderRow[] }>("/orders/me?limit=50")
      .then((res) => {
        setOrders(res.items);
        setOrdersErr("");
      })
      .catch((e) => setOrdersErr(e instanceof Error ? e.message : "Failed to load orders"))
      .finally(() => setOrdersLoading(false));
  }, [activeTab, user?.id]);

  const initials = user?.name
    ? user.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase())
        .join("")
    : "";

  const displayProfile = profile ?? (user ? { name: user.name, email: user.email, phone: user.phone } : null);

  if (authLoading || !user) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center pt-32 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
          <span className="text-xs uppercase tracking-widest text-stone-400">Loading your profile…</span>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] text-[#1C1510]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-[#0B2516] text-white">
        <BotanicalDecoration className="text-white" opacity={0.04} />
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-400/40 flex items-center justify-center text-amber-300 text-2xl font-serif shadow-2xl overflow-hidden shrink-0">
              {user.avatarUrl ? (
                <Image src={user.avatarUrl} alt="" width={96} height={96} className="object-cover w-full h-full" />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-amber-400 text-[10px] font-bold tracking-[0.3em] uppercase">
                  Mairii Member Concierge
                </span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <h1 className="text-3xl md:text-5xl font-serif leading-tight">
                Welcome, <span className="italic text-yellow-600 font-serif">{user.name}</span>
              </h1>
              <p className="text-white/60 font-sans text-xs tracking-widest uppercase">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Main Body */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-1/4">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-lg space-y-6 sticky top-28">
                <div className="pb-6 border-b border-stone-100 text-center">
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-stone-400 block mb-1">
                    Account Dashboard
                  </span>
                  <h3 className="font-serif text-lg text-stone-900 line-clamp-1">{user.name}</h3>
                </div>

                <nav className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs tracking-[0.15em] transition-all duration-300 uppercase font-semibold ${
                      activeTab === "wishlist"
                        ? "bg-stone-900 text-white shadow-md"
                        : "text-stone-600 hover:bg-stone-50 hover:text-amber-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4" />
                      <span>My Wishlist</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'wishlist' ? 'bg-amber-500 text-stone-900' : 'bg-stone-100 text-stone-600'}`}>
                      {wishlist.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs tracking-[0.15em] transition-all duration-300 uppercase font-semibold ${
                      activeTab === "orders"
                        ? "bg-stone-900 text-white shadow-md"
                        : "text-stone-600 hover:bg-stone-50 hover:text-amber-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4" />
                      <span>Order History</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs tracking-[0.15em] transition-all duration-300 uppercase font-semibold ${
                      activeTab === "profile"
                        ? "bg-stone-900 text-white shadow-md"
                        : "text-stone-600 hover:bg-stone-50 hover:text-amber-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4" />
                      <span>Personal Details</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  <div className="pt-4 border-t border-stone-100">
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs tracking-[0.15em] text-red-500 hover:bg-red-50 transition-all duration-300 uppercase font-semibold"
                      onClick={() => {
                        logout();
                        router.replace("/");
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content Pane */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200/80 shadow-lg min-h-[550px]">
                
                {/* TAB 1: Wishlist */}
                {activeTab === "wishlist" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-600 block mb-1">
                          Saved Items
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
                          My Wishlist
                        </h2>
                      </div>
                      <span className="text-xs text-stone-500 tracking-wider">
                        {wishlist.length} Saved
                      </span>
                    </div>

                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center">
                        <Heart className="w-16 h-16 text-amber-500/20 mx-auto mb-4" />
                        <h3 className="font-serif text-xl text-stone-900 mb-2">Your wishlist is empty</h3>
                        <p className="text-stone-500 text-xs tracking-wider uppercase mb-6">Discover pieces to add to your collection</p>
                        <Link href="/category/all">
                          <button className="px-6 py-3 rounded-full bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-amber-600 transition-colors shadow-md">
                            Explore Jewellery
                          </button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB 2: Orders */}
                {activeTab === "orders" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-600 block mb-1">
                          Purchase History
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
                          Your Orders
                        </h2>
                      </div>
                    </div>

                    {ordersLoading ? (
                      <div className="flex flex-col items-center justify-center py-20 space-y-3">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                        <span className="text-xs uppercase tracking-widest text-stone-400">Loading order history…</span>
                      </div>
                    ) : ordersErr ? (
                      <div className="p-6 rounded-xl bg-red-50 text-red-600 text-xs tracking-wider">
                        {ordersErr}
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="py-20 text-center">
                        <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                        <h3 className="font-serif text-xl text-stone-900 mb-2">No Orders Placed Yet</h3>
                        <p className="text-stone-500 text-xs tracking-wider uppercase mb-6">Explore our curated collections and place your first order.</p>
                        <Link href="/category/all">
                          <button className="px-6 py-3 rounded-full bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-amber-600 transition-colors shadow-md">
                            Shop Collections
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => {
                          const thumb = order.items?.[0]?.image;
                          return (
                            <Link
                              key={order._id}
                              href={`/profile/orders/${order._id}`}
                              className="block p-5 rounded-xl border border-stone-200/80 hover:border-amber-500/50 hover:shadow-md transition-all duration-300 group bg-stone-50/50"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 min-w-0">
                                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-white border border-stone-200">
                                    {thumb ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      <Package className="w-6 h-6 text-stone-300 absolute inset-0 m-auto" />
                                    )}
                                  </div>
                                  <div className="min-w-0 space-y-1">
                                    <p className="font-bold text-stone-900 text-sm tracking-wider uppercase truncate">
                                      Order #{order.orderNumber}
                                    </p>
                                    <p className="text-[11px] text-stone-500 tracking-wider">
                                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </p>
                                    {shippingHint(order) && (
                                      <span className="inline-block text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                                        {shippingHint(order)}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-3 sm:pt-0 border-t sm:border-0 border-stone-200/60">
                                  <div className="text-left sm:text-right">
                                    <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 block mb-1">
                                      {statusLabel(order.status)}
                                    </span>
                                    <p className="font-semibold text-stone-900 text-base">₹{order.total.toLocaleString()}</p>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB 3: Profile Details */}
                {activeTab === "profile" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-600 block mb-1">
                          Account Profile
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
                          Personal Details
                        </h2>
                      </div>
                    </div>

                    {profileLoading || !displayProfile ? (
                      <div className="flex flex-col items-center justify-center py-20 space-y-3">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                        <span className="text-xs uppercase tracking-widest text-stone-400">Loading details…</span>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block">Full Name</span>
                            <p className="text-sm font-semibold text-stone-900 tracking-wide">{displayProfile.name}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block">Email Address</span>
                            <p className="text-sm font-semibold text-stone-900 tracking-wide break-all">{displayProfile.email}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1 md:col-span-2">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block">Contact Phone</span>
                            <p className="text-sm font-semibold text-stone-900 tracking-wide">{displayProfile.phone || "Not provided"}</p>
                          </div>
                        </div>

                        {/* Saved addresses */}
                        <div className="space-y-4 pt-4 border-t border-stone-100">
                          <div className="flex items-center gap-2 text-amber-600">
                            <MapPin className="w-4 h-4" />
                            <h4 className="font-serif text-lg text-stone-900">Saved Addresses</h4>
                          </div>

                          {displayProfile.addresses?.length ? (
                            <div className="grid grid-cols-1 gap-4">
                              {displayProfile.addresses.map((a, i) => (
                                <div key={`${a.line1}-${i}`} className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 relative">
                                  {i === 0 && (
                                    <span className="absolute top-4 right-4 text-[9px] font-bold bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                      Default
                                    </span>
                                  )}
                                  <p className="text-xs text-stone-600 leading-relaxed uppercase tracking-wider">
                                    {a.line1}<br />
                                    {a.city}, {a.state} — {a.pincode}<br />
                                    {a.country ?? "IN"}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 leading-relaxed uppercase tracking-wider">
                              Your shipping addresses entered during checkout are automatically linked to your account orders.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

