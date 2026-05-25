"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GoogleAuthSection } from "@/components/auth/GoogleAuthSection";
import toast from "react-hot-toast";

function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { register, loginWithGoogleIdToken, loading, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = () => {
    const next = params.get("next");
    if (next && next.startsWith("/")) router.replace(next);
    else router.replace("/");
  };

  React.useEffect(() => {
    if (!loading && user) redirectTo();
  }, [loading, user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(name, email, password);
      toast.success("Account created");
      redirectTo();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-4">Join the Legacy</h1>
        <p className="text-gray-400 font-sans tracking-widest text-xs uppercase">
          Create an account for exclusive access
        </p>
      </div>

      <GoogleAuthSection
        useSignupCopy
        onCredential={async (idToken) => {
          await loginWithGoogleIdToken(idToken);
          toast.success("Signed up with Google");
          redirectTo();
        }}
      />

      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400">
          <span className="bg-white px-4">Or register with email</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold font-sans tracking-widest"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold font-sans tracking-widest"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold font-sans tracking-widest"
              placeholder="••••••••"
              required
              minLength={6}
            />
            {showPassword ? <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />}
          </div>
        </div>

        <Button variant="gold" className="w-full" type="submit" disabled={submitting || loading}>
          {submitting ? "Creating…" : "CREATE ACCOUNT"} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-4">Already have an account?</p>
        <Link href={params.get("next") ? `/auth/login?next=${encodeURIComponent(params.get("next")!)}` : "/auth/login"}>
          <Button variant="outline" className="w-full">
            SIGN IN INSTEAD
          </Button>
        </Link>
      </div>
    </>
  );
}

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-40 px-6">
        <div className="w-full max-w-md bg-white p-10 shadow-sm border border-gray-100">
          <Suspense fallback={<p className="text-center text-sm text-gray-500">Loading…</p>}>
            <SignupForm />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  );
}
