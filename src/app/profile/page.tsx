"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { ProductCard } from "@/components/products/ProductCard";
import { User, Package, Heart, LogOut, ChevronRight, MapPin, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

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
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="w-full lg:w-1/4">
              <div className="bg-white p-8 shadow-sm space-y-8 sticky top-32">
                <div className="flex flex-col items-center pb-8 border-b">
                  <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4 text-xl font-serif overflow-hidden">
                    {user.avatarUrl ? (
                      <Image src={user.avatarUrl} alt="" width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl tracking-widest text-brand-emerald">{user.name}</h3>
                  <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase font-bold truncate max-w-[200px]">
                    {user.email}
                  </p>
                </div>

                <nav className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center space-x-4 px-4 py-3 text-xs tracking-[0.2em] transition-all duration-300 uppercase font-bold ${
                      activeTab === "profile" ? "bg-brand-emerald text-white" : "text-gray-500 hover:text-brand-emerald"
                    }`}
                  >
                    <User className="w-4 h-4" /> <span>Profile Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center space-x-4 px-4 py-3 text-xs tracking-[0.2em] transition-all duration-300 uppercase font-bold ${
                      activeTab === "orders" ? "bg-brand-emerald text-white" : "text-gray-500 hover:text-brand-emerald"
                    }`}
                  >
                    <Package className="w-4 h-4" /> <span>Order History</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center space-x-4 px-4 py-3 text-xs tracking-[0.2em] transition-all duration-300 uppercase font-bold ${
                      activeTab === "wishlist" ? "bg-brand-emerald text-white" : "text-gray-500 hover:text-brand-emerald"
                    }`}
                  >
                    <Heart className="w-4 h-4" /> <span>My Wishlist ({wishlist.length})</span>
                  </button>
                  <div className="pt-6">
                    <button
                      type="button"
                      className="w-full flex items-center space-x-4 px-4 py-3 text-xs tracking-[0.2em] text-red-400 hover:text-red-500 transition-all duration-300 uppercase font-bold"
                      onClick={() => {
                        logout();
                        router.replace("/");
                      }}
                    >
                      <LogOut className="w-4 h-4" /> <span>Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            <div className="w-full lg:w-3/4">
              <div className="bg-white p-10 shadow-sm min-h-[600px]">
                {activeTab === "wishlist" && (
                  <div>
                    <h2 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-10 pb-4 border-b">
                      Saved For Later
                    </h2>
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {wishlist.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center">
                        <Heart className="w-20 h-20 text-gray-100 mx-auto mb-6" />
                        <h3 className="font-serif text-2xl text-gray-300 uppercase tracking-widest mb-6">Your wishlist is empty</h3>
                        <Link href="/category/all">
                          <Button variant="outline">Discover Jewellery</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-10 pb-4 border-b">
                      Your Orders
                    </h2>
                    {ordersLoading ? (
                      <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-emerald" />
                      </div>
                    ) : ordersErr ? (
                      <p className="text-red-500 text-sm">{ordersErr}</p>
                    ) : orders.length === 0 ? (
                      <p className="text-gray-500 text-sm tracking-widest uppercase py-16 text-center">
                        No orders yet. Explore the collection and check out when you&apos;re ready.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => {
                          const thumb = order.items?.[0]?.image;
                          return (
                            <Link key={order._id} href={`/profile/orders/${order._id}`} className="block border border-gray-100 p-6 group hover:border-brand-gold transition-colors duration-300">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6 min-w-0">
                                  <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-gray-100">
                                    {thumb ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                                    ) : null}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-bold text-brand-emerald tracking-widest uppercase mb-1 truncate">{order.orderNumber}</p>
                                    <p className="text-[10px] text-gray-400 tracking-widest uppercase">
                                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </p>
                                    {shippingHint(order) && (
                                      <p className="text-[10px] text-brand-gold tracking-widest uppercase mt-1 font-bold">
                                        {shippingHint(order)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right flex items-center space-x-10 shrink-0">
                                  <div className="hidden md:block">
                                    <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">Status</p>
                                    <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-brand-gold/10 text-brand-gold">
                                      {statusLabel(order.status)}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">Total</p>
                                    <p className="font-bold text-brand-emerald">₹{order.total.toLocaleString()}</p>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-gold transition-colors hidden sm:block" />
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-10 pb-4 border-b">
                      Personal Details
                    </h2>
                    {profileLoading || !displayProfile ? (
                      <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-emerald" />
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-1">Full Name</label>
                            <p className="p-4 bg-gray-50 border border-transparent text-sm font-bold tracking-widest uppercase">{displayProfile.name}</p>
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-1">Email Address</label>
                            <p className="p-4 bg-gray-50 border border-transparent text-sm font-bold tracking-widest uppercase break-all">{displayProfile.email}</p>
                          </div>
                          <div className="space-y-4 md:col-span-2">
                            <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-1">Contact Number</label>
                            <p className="p-4 bg-gray-50 border border-transparent text-sm font-bold tracking-widest uppercase">
                              {displayProfile.phone || "—"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-20 space-y-8">
                          <div className="flex items-center space-x-3 text-brand-gold">
                            <MapPin className="w-5 h-5" />
                            <h4 className="font-serif text-xl tracking-widest">SAVED ADDRESSES</h4>
                          </div>
                          {displayProfile.addresses?.length ? (
                            displayProfile.addresses.map((a, i) => (
                              <div key={`${a.line1}-${i}`} className="p-6 border border-brand-gold/20 relative">
                                {i === 0 ? (
                                  <span className="absolute top-4 right-4 text-[10px] font-bold bg-brand-gold/10 text-brand-gold px-2 py-1">DEFAULT</span>
                                ) : null}
                                <p className="text-xs text-gray-500 leading-relaxed tracking-widest uppercase">
                                  {a.line1}
                                  <br />
                                  {a.city}, {a.state} — {a.pincode}
                                  <br />
                                  {a.country ?? "IN"}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 tracking-widest">
                              Addresses you use at checkout can be saved here in a future update. Your last shipment details are attached to each order.
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
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
