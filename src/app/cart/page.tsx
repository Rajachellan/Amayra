"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Ticket } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  const shipping = 0;
  const tax = subtotal * 0.03; // Simulated GST
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-emerald mb-4 tracking-widest uppercase">
            Your Shopping Bag
          </h1>
          <p className="text-gray-500 font-sans tracking-widest text-sm mb-12 uppercase">
            Items in your bag are reserved for 60 minutes.
          </p>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items */}
            <div className="w-full lg:w-2/3 space-y-6">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="bg-white p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
                    <div className="relative w-32 h-40 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-grow space-y-2 text-center sm:text-left">
                      <h3 className="font-serif text-xl text-brand-emerald tracking-wide">{item.name}</h3>
                      <p className="text-brand-gold text-xs font-bold tracking-widest uppercase">{item.category}</p>
                      <p className="text-gray-400 text-xs tracking-widest uppercase">Material: {item.material}</p>
                      <p className="text-gray-400 text-xs tracking-widest uppercase">Weight: {item.weight}</p>
                    </div>

                    <div className="flex flex-col items-center sm:items-end space-y-4 shrink-0">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-400" />
                        </button>
                        <span className="w-10 text-center font-bold font-sans text-brand-emerald">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="flex flex-col items-center sm:items-end">
                        <span className="font-bold text-lg text-brand-emerald">₹{(item.price * item.quantity).toLocaleString()}</span>
                        {item.oldPrice && (
                          <span className="text-xs text-gray-400 line-through">₹{(item.oldPrice * item.quantity).toLocaleString()}</span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-1 uppercase text-[10px] tracking-widest"
                      >
                        <Trash2 className="w-4 h-4" /> <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-20 text-center shadow-sm">
                  <h3 className="font-serif text-3xl text-gray-300 uppercase tracking-widest mb-6">Your bag is empty</h3>
                  <Link href="/category/all">
                    <Button variant="outline">Back to Shopping</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <aside className="w-full lg:w-1/3">
              <div className="bg-white p-8 shadow-sm space-y-8 sticky top-32">
                <h3 className="font-serif text-2xl tracking-widest uppercase pb-4 border-b">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm tracking-widest text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm tracking-widest text-gray-600">
                    <span>Estimated Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm tracking-widest text-gray-600">
                    <span>Tax (GST 3%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="pt-6 border-t">
                  <div className="flex items-center space-x-2 text-xs font-bold text-brand-gold tracking-widest uppercase mb-4">
                    <Ticket className="w-4 h-4" /> <span>Apply Coupon Code</span>
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="ENTER CODE"
                      className="bg-transparent border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-brand-gold flex-grow uppercase tracking-widest"
                    />
                    <button className="bg-brand-emerald text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
                      APPLY
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex justify-between items-center mb-10">
                    <span className="font-serif text-xl tracking-widest uppercase">Total</span>
                    <span className="font-bold text-2xl text-brand-emerald">₹{total.toLocaleString()}</span>
                  </div>
                  <Button variant="gold" size="lg" className="w-full" disabled={cart.length === 0}>
                    PROCEED TO CHECKOUT <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-3 text-[10px] tracking-widest text-gray-400 uppercase">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Secure SSL Checkout</span>
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
