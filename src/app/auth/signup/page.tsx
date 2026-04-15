"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-40 px-6">
        <div className="w-full max-w-md bg-white p-10 shadow-sm border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-4">
              Join the Legacy
            </h1>
            <p className="text-gray-400 font-sans tracking-widest text-xs uppercase">
              Create an account for exclusive access
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold font-sans tracking-widest"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
              <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold font-sans tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <p className="text-[10px] text-gray-400 tracking-widest uppercase py-2">
              By creating an account, you agree to our <Link href="#" className="font-bold text-brand-gold hover:underline">Terms of Service</Link> and <Link href="#" className="font-bold text-brand-gold hover:underline">Privacy Policy</Link>.
            </p>

            <Button variant="gold" className="w-full" type="button">
              CREATE ACCOUNT <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-4">Already have an account?</p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">SIGN IN INSTEAD</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
