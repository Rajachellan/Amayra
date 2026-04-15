"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-40 px-6">
        <div className="w-full max-w-md bg-white p-10 shadow-sm border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-4">
              Welcome Back
            </h1>
            <p className="text-gray-400 font-sans tracking-widest text-xs uppercase">
              Sign in to access your luxury collection
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold font-sans tracking-widest"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Password</label>
                <Link href="#" className="text-[10px] text-brand-gold font-bold tracking-widest uppercase hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold font-sans tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button variant="gold" className="w-full" type="button">
              SIGN IN <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-4">New to Shree Aarna?</p>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full">CREATE AN ACCOUNT</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
