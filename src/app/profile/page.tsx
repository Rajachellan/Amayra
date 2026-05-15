"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";
import { User, Package, Heart, LogOut, ChevronRight, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState("wishlist");

  const mockOrders = [
    {
      id: "ORD-9281",
      date: "Oct 12, 2025",
      total: 85000,
      status: "Delivered",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3f413?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "ORD-4423",
      date: "Jan 05, 2026",
      total: 35000,
      status: "Processing",
      image: "https://images.unsplash.com/photo-1535633302704-b02923cc5c37?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-1/4">
              <div className="bg-white p-8 shadow-sm space-y-8 sticky top-32">
                <div className="flex flex-col items-center pb-8 border-b">
                  <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4 text-3xl font-serif">
                    JS
                  </div>
                  <h3 className="font-serif text-xl tracking-widest text-brand-emerald">Jane Sharma</h3>
                  <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase font-bold">Premium Member</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center space-x-4 px-4 py-3 text-xs tracking-[0.2em] transition-all duration-300 uppercase font-bold ${
                      activeTab === "profile" ? "bg-brand-emerald text-white" : "text-gray-500 hover:text-brand-emerald"
                    }`}
                  >
                    <User className="w-4 h-4" /> <span>Profile Details</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center space-x-4 px-4 py-3 text-xs tracking-[0.2em] transition-all duration-300 uppercase font-bold ${
                      activeTab === "orders" ? "bg-brand-emerald text-white" : "text-gray-500 hover:text-brand-emerald"
                    }`}
                  >
                    <Package className="w-4 h-4" /> <span>Order History</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center space-x-4 px-4 py-3 text-xs tracking-[0.2em] transition-all duration-300 uppercase font-bold ${
                      activeTab === "wishlist" ? "bg-brand-emerald text-white" : "text-gray-500 hover:text-brand-emerald"
                    }`}
                  >
                    <Heart className="w-4 h-4" /> <span>My Wishlist ({wishlist.length})</span>
                  </button>
                  <div className="pt-6">
                    <button className="w-full flex items-center space-x-4 px-4 py-3 text-xs tracking-[0.2em] text-red-400 hover:text-red-500 transition-all duration-300 uppercase font-bold">
                      <LogOut className="w-4 h-4" /> <span>Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Content Area */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white p-10 shadow-sm min-h-[600px]">
                
                {/* Wishlist Tab */}
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

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-10 pb-4 border-b">
                      Your Orders
                    </h2>
                    <div className="space-y-6">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border border-gray-100 p-6 flex items-center justify-between group hover:border-brand-gold transition-colors duration-300">
                          <div className="flex items-center space-x-6">
                            <div className="relative w-16 h-20 shrink-0 overflow-hidden">
                              <Image src={order.image} alt={order.id} fill sizes="64px" className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-brand-emerald tracking-widest uppercase mb-1">{order.id}</p>
                              <p className="text-[10px] text-gray-400 tracking-widest uppercase">{order.date}</p>
                            </div>
                          </div>
                          <div className="text-right flex items-center space-x-10">
                            <div className="hidden md:block">
                              <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">Status</p>
                              <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 ${
                                order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-brand-gold/10 text-brand-gold"
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">Total</p>
                              <p className="font-bold text-brand-emerald">₹{order.total.toLocaleString()}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-gold transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-10 pb-4 border-b">
                      Personal Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-1">Full Name</label>
                        <p className="p-4 bg-gray-50 border border-transparent text-sm font-bold tracking-widest uppercase">Jane Sharma</p>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-1">Email Address</label>
                        <p className="p-4 bg-gray-50 border border-transparent text-sm font-bold tracking-widest uppercase">jane@example.com</p>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-1">Contact Number</label>
                        <p className="p-4 bg-gray-50 border border-transparent text-sm font-bold tracking-widest uppercase">+91 98XXX XXXXX</p>
                      </div>
                    </div>

                    <div className="mt-20 space-y-8">
                      <div className="flex items-center space-x-3 text-brand-gold">
                        <MapPin className="w-5 h-5" />
                        <h4 className="font-serif text-xl tracking-widest">SAVED ADDRESSES</h4>
                      </div>
                      <div className="p-6 border border-brand-gold/20 relative">
                        <span className="absolute top-4 right-4 text-[10px] font-bold bg-brand-gold/10 text-brand-gold px-2 py-1">DEFAULT</span>
                        <p className="text-sm font-bold tracking-widest uppercase text-brand-emerald mb-2">Home</p>
                        <p className="text-xs text-gray-500 leading-relaxed tracking-widest">
                          123 Skyview Residency, Worli,<br />
                          Mumbai, Maharashtra - 400018
                        </p>
                      </div>
                      <Button variant="outline" size="sm">ADD NEW ADDRESS</Button>
                    </div>
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
