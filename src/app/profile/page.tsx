"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { ProductCard } from "@/components/products/ProductCard";
import {
  User,
  Package,
  Heart,
  LogOut,
  ChevronRight,
  Loader2,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Headphones,
  Lock,
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import { api } from "@/lib/api";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";
import { PersonalDetailsPanel } from "@/components/profile/PersonalDetailsPanel";

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
    return "Track Delivery";
  }
  if (order.status === "paid" || order.status === "processing") {
    return "Preparing Shipment";
  }
  return null;
}

function statusBadgeStyle(status: string) {
  const s = status.toLowerCase();
  if (s === "delivered") {
    return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
  }
  if (s === "shipped") {
    return "bg-blue-500/10 text-blue-700 border-blue-500/20";
  }
  if (s === "processing" || s === "paid") {
    return "bg-amber-500/10 text-amber-700 border-amber-500/20";
  }
  if (s === "cancelled") {
    return "bg-rose-500/10 text-rose-700 border-rose-500/20";
  }
  return "bg-stone-500/10 text-stone-700 border-stone-500/20";
}

function statusLabel(status: string) {
  return status.replace(/_/g, " ").toUpperCase();
}

export default function ProfilePage() {
  const router = useRouter();
  const { wishlist } = useWishlist();
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("wishlist");

  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersErr, setOrdersErr] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/auth/login?next=/profile");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    if (activeTab !== "orders") return;
    setOrdersLoading(true);
    api<{ items: OrderRow[] }>("/orders/me?limit=50")
      .then((res) => {
        setOrders(res.items || []);
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

  if (authLoading || !user) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center pt-32 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#c9a84c]" />
          <span className="text-xs uppercase tracking-[0.25em] text-stone-400 font-medium">
            Loading your MaiRii Privé profile…
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1510] flex flex-col selection:bg-[#c9a84c]/30">
      <Navbar />

      {/* Header Banner - Luxury Dark Emerald Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#091F13] via-[#0B2516] to-[#0D2E1B] text-white border-b border-[#c9a84c]/20">
        <BotanicalDecoration className="text-[#c9a84c]" opacity={0.05} />

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c9a84c]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* User Identity Info */}
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#8a702b] via-[#c9a84c] to-[#f3e5ab] p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <div className="w-full h-full rounded-full bg-[#0B2516] flex items-center justify-center text-[#c9a84c] text-3xl font-serif font-semibold overflow-hidden relative">
                    {user.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={user.name || "User Avatar"}
                        width={112}
                        height={112}
                        sizes="112px"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#c9a84c] text-[#0B2516] p-1.5 rounded-full shadow-lg border-2 border-[#0B2516]">
                  <Sparkles className="w-4 h-4 fill-current" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#e5ca78]">
                    MaiRii Privé Concierge
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-wide leading-tight">
                  Welcome, <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ab] via-[#c9a84c] to-[#e5ca78]">{user.name}</span>
                </h1>
                <p className="text-stone-300 font-sans text-xs tracking-[0.2em] uppercase font-light">
                  {user.email} {user.phone ? `· ${user.phone}` : ""}
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-[100px] hover:border-[#c9a84c]/40 transition-colors">
                <span className="block text-2xl font-serif text-[#c9a84c] font-semibold">
                  {wishlist.length}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-stone-300 font-medium block mt-1">
                  Saved Items
                </span>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-[100px] hover:border-[#c9a84c]/40 transition-colors">
                <span className="block text-2xl font-serif text-[#c9a84c] font-semibold">
                  {orders.length > 0 ? orders.length : "—"}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-stone-300 font-medium block mt-1">
                  Orders
                </span>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-[100px] hover:border-[#c9a84c]/40 transition-colors">
                <span className="block text-2xl font-serif text-[#c9a84c] font-semibold">
                  VIP
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-stone-300 font-medium block mt-1">
                  Status
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Profile Dashboard */}
      <section className="flex-grow py-10 md:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Sidebar Navigation (4 cols) */}
            <aside className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xl shadow-stone-200/40 space-y-6">

                <div className="pb-5 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-stone-400 block mb-0.5">
                      Account Hub
                    </span>
                    <h2 className="font-serif text-lg text-stone-900 font-medium">Dashboard Menu</h2>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active Account" />
                </div>

                <nav className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs tracking-[0.15em] transition-all duration-300 uppercase font-medium group ${activeTab === "wishlist"
                        ? "bg-[#0B2516] text-white shadow-lg shadow-[#0B2516]/20"
                        : "text-stone-700 hover:bg-stone-50 hover:text-[#0B2516]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${activeTab === "wishlist" ? "bg-[#c9a84c] text-[#0B2516]" : "bg-stone-100 text-stone-600 group-hover:bg-[#c9a84c]/20 group-hover:text-[#0B2516]"}`}>
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
                      <span className="font-semibold">My Wishlist</span>
                    </div>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${activeTab === "wishlist" ? "bg-[#c9a84c] text-[#0B2516]" : "bg-stone-100 text-stone-600"
                      }`}>
                      {wishlist.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs tracking-[0.15em] transition-all duration-300 uppercase font-medium group ${activeTab === "orders"
                        ? "bg-[#0B2516] text-white shadow-lg shadow-[#0B2516]/20"
                        : "text-stone-700 hover:bg-stone-50 hover:text-[#0B2516]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${activeTab === "orders" ? "bg-[#c9a84c] text-[#0B2516]" : "bg-stone-100 text-stone-600 group-hover:bg-[#c9a84c]/20 group-hover:text-[#0B2516]"}`}>
                        <Package className="w-4 h-4" />
                      </div>
                      <span className="font-semibold">Order History</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === "orders" ? "text-[#c9a84c] translate-x-0.5" : "text-stone-400 group-hover:translate-x-0.5"}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs tracking-[0.15em] transition-all duration-300 uppercase font-medium group ${activeTab === "profile"
                        ? "bg-[#0B2516] text-white shadow-lg shadow-[#0B2516]/20"
                        : "text-stone-700 hover:bg-stone-50 hover:text-[#0B2516]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${activeTab === "profile" ? "bg-[#c9a84c] text-[#0B2516]" : "bg-stone-100 text-stone-600 group-hover:bg-[#c9a84c]/20 group-hover:text-[#0B2516]"}`}>
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-semibold">Personal Details</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === "profile" ? "text-[#c9a84c] translate-x-0.5" : "text-stone-400 group-hover:translate-x-0.5"}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("concierge")}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs tracking-[0.15em] transition-all duration-300 uppercase font-medium group ${activeTab === "concierge"
                        ? "bg-[#0B2516] text-white shadow-lg shadow-[#0B2516]/20"
                        : "text-stone-700 hover:bg-stone-50 hover:text-[#0B2516]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${activeTab === "concierge" ? "bg-[#c9a84c] text-[#0B2516]" : "bg-stone-100 text-stone-600 group-hover:bg-[#c9a84c]/20 group-hover:text-[#0B2516]"}`}>
                        <Headphones className="w-4 h-4" />
                      </div>
                      <span className="font-semibold">VIP Services</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === "concierge" ? "text-[#c9a84c] translate-x-0.5" : "text-stone-400 group-hover:translate-x-0.5"}`} />
                  </button>

                  <div className="pt-4 border-t border-stone-100">
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-xs tracking-[0.15em] text-rose-600 hover:bg-rose-50/80 transition-all duration-300 uppercase font-semibold"
                      onClick={() => {
                        logout();
                        router.replace("/");
                      }}
                    >
                      <div className="p-2 rounded-xl bg-rose-100/60 text-rose-600">
                        <LogOut className="w-4 h-4" />
                      </div>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </nav>

              </div>

              {/* VIP Concierge Card Banner */}
              <div className="bg-gradient-to-br from-[#0B2516] to-[#164228] rounded-3xl p-6 text-white border border-[#c9a84c]/30 shadow-lg relative overflow-hidden">
                <BotanicalDecoration className="text-[#c9a84c]" opacity={0.08} />
                <div className="relative z-10 space-y-3">
                  <span className="text-[9px] font-bold tracking-[0.25em] text-[#c9a84c] uppercase block">
                    Bespoke Concierge
                  </span>
                  <h3 className="font-serif text-lg leading-snug">Need Private Styling Assistance?</h3>
                  <p className="text-stone-300 text-xs font-light leading-relaxed">
                    Connect with our dedicated jewellery specialists for bridal consultations and bespoke custom pieces.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3e5ab] hover:text-white transition-colors pt-1"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content Pane (8 cols) */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl shadow-stone-200/40 min-h-[600px]">
                <AnimatePresence mode="wait">

                  {/* TAB 1: Wishlist */}
                  {activeTab === "wishlist" && (
                    <motion.div
                      key="wishlist"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                        <div>
                          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] block mb-1">
                            Curated Collection
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
                            Saved Wishlist
                          </h2>
                        </div>
                        <span className="text-xs text-stone-500 tracking-widest uppercase font-semibold bg-stone-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
                          {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} Saved
                        </span>
                      </div>

                      {wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {wishlist.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      ) : (
                        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                          <div className="w-20 h-20 rounded-full bg-[#FAF8F5] border border-[#c9a84c]/30 flex items-center justify-center mx-auto shadow-inner text-[#c9a84c]">
                            <Heart className="w-9 h-9 stroke-[1.5]" />
                          </div>
                          <h3 className="font-serif text-2xl text-stone-900">Your wishlist is empty</h3>
                          <p className="text-stone-500 text-xs tracking-wider uppercase leading-relaxed">
                            Discover our handcrafted gold, diamond, and bridal collections to save your favorite luxury creations.
                          </p>
                          <div className="pt-2">
                            <Link href="/category/all">
                              <button className="px-8 py-3.5 rounded-full bg-[#0B2516] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c9a84c] hover:text-[#0B2516] transition-all shadow-lg hover:shadow-xl">
                                Explore Jewellery
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 2: Orders */}
                  {activeTab === "orders" && (
                    <motion.div
                      key="orders"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                        <div>
                          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] block mb-1">
                            Purchase Archives
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
                            Order History
                          </h2>
                        </div>
                      </div>

                      {ordersLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-[#c9a84c]" />
                          <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">
                            Retrieving your order records…
                          </span>
                        </div>
                      ) : ordersErr ? (
                        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs tracking-wider">
                          {ordersErr}
                        </div>
                      ) : orders.length === 0 ? (
                        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                          <div className="w-20 h-20 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
                            <Package className="w-9 h-9 stroke-[1.5]" />
                          </div>
                          <h3 className="font-serif text-2xl text-stone-900">No Orders Yet</h3>
                          <p className="text-stone-500 text-xs tracking-wider uppercase leading-relaxed">
                            You haven't placed any orders with us yet. Begin your journey with MaiRii today.
                          </p>
                          <div className="pt-2">
                            <Link href="/category/all">
                              <button className="px-8 py-3.5 rounded-full bg-[#0B2516] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c9a84c] hover:text-[#0B2516] transition-all shadow-lg">
                                Shop Collections
                              </button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {orders.map((order) => {
                            const thumb = order.items?.[0]?.image;
                            return (
                              <Link
                                key={order._id}
                                href={`/profile/orders/${order.orderNumber}`}
                                className="block p-6 rounded-2xl border border-stone-200/80 hover:border-[#c9a84c]/60 hover:shadow-lg transition-all duration-300 bg-stone-50/40 hover:bg-white group"
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                                  <div className="flex items-center gap-5 min-w-0">
                                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                                      {thumb ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                      ) : (
                                        <ShoppingBag className="w-8 h-8 text-stone-300 absolute inset-0 m-auto" />
                                      )}
                                    </div>

                                    <div className="space-y-1.5 min-w-0">
                                      <div className="flex items-center gap-3">
                                        <span className="font-semibold text-stone-900 text-sm tracking-wider uppercase">
                                          Order #{order.orderNumber}
                                        </span>
                                      </div>
                                      <p className="text-xs text-stone-500 tracking-wider">
                                        Placed on{" "}
                                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </p>
                                      {shippingHint(order) && (
                                        <div className="flex items-center gap-1.5 text-[11px] text-[#c9a84c] font-semibold tracking-wider uppercase">
                                          <Clock className="w-3.5 h-3.5" />
                                          <span>{shippingHint(order)}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-4 md:pt-0 border-t md:border-0 border-stone-200/60">
                                    <div className="text-left md:text-right space-y-1">
                                      <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${statusBadgeStyle(order.status)}`}>
                                        {statusLabel(order.status)}
                                      </span>
                                      <p className="font-serif text-lg text-stone-900 font-semibold">
                                        ₹{order.total.toLocaleString()}
                                      </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all" />
                                  </div>

                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 3: Personal Details */}
                  {activeTab === "profile" && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PersonalDetailsPanel />
                    </motion.div>
                  )}

                  {/* TAB 4: VIP Concierge & Security */}
                  {activeTab === "concierge" && (
                    <motion.div
                      key="concierge"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="pb-6 border-b border-stone-100">
                        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] block mb-1">
                          Exclusive Support
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
                          VIP Concierge Services
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
                          <div className="w-12 h-12 rounded-xl bg-[#0B2516] text-[#c9a84c] flex items-center justify-center">
                            <Headphones className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-serif text-lg text-stone-900 font-medium">Personal Assistant</h3>
                            <p className="text-xs text-stone-500 leading-relaxed mt-1">
                              Reach out directly for order assistance, customized engraving, or sizing advice.
                            </p>
                          </div>
                          <a
                            href="https://wa.me/919566571655"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B2516] hover:text-[#c9a84c] transition-colors"
                          >
                            <span>WhatsApp Concierge</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
                          <div className="w-12 h-12 rounded-xl bg-[#0B2516] text-[#c9a84c] flex items-center justify-center">
                            <Lock className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-serif text-lg text-stone-900 font-medium">Account Protection</h3>
                            <p className="text-xs text-stone-500 leading-relaxed mt-1">
                              Your account is secured with encrypted login sessions and verified contact access.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Session Authenticated</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* No Footer on Profile page as requested */}
    </main>
  );
}
