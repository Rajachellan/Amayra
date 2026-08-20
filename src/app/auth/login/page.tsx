"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GoogleAuthSection } from "@/components/auth/GoogleAuthSection";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { login, loginWithGoogleIdToken, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleAccountNotice, setIsGoogleAccountNotice] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = () => {
    const next = params.get("next");
    if (next && next.startsWith("/")) router.replace(next);
    else router.replace("/");
  };

  React.useEffect(() => {
    if (!loading && user) redirectTo();
  }, [loading, user, params, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setIsGoogleAccountNotice(false);
    try {
      await login(email, password);
      toast.success("Signed in");
      redirectTo();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign in failed";
      if (msg.includes("Google sign-in")) {
        setIsGoogleAccountNotice(true);
      }
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif text-brand-emerald tracking-widest uppercase mb-4">Welcome Back</h1>
        <p className="text-gray-400 font-sans tracking-widest text-xs uppercase">
          Sign in to access your luxury collection
        </p>
      </div>

      <GoogleAuthSection
        onCredential={async (idToken) => {
          await loginWithGoogleIdToken(idToken);
          toast.success("Signed in with Google");
          redirectTo();
        }}
      />

      {isGoogleAccountNotice && (
        <div className="mt-4 mb-2 p-3.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 font-medium text-center shadow-sm">
          💡 This account was created with Google. Click <strong className="font-bold underline">"Continue with Google"</strong> above to sign in!
        </div>
      )}

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400">
          <span className="bg-white px-4">Or use email</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Email Address</label>
          <div className="relative mt-0.5">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-sm rounded-md focus:outline-none focus:border-brand-gold font-sans tracking-widest"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Password</label>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-12 pr-12 py-3 text-sm rounded-md focus:outline-none focus:border-brand-gold font-sans tracking-widest"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button variant="gold" className="w-full" type="submit" disabled={submitting || loading}>
          {submitting ? "Signing in…" : "SIGN IN"} <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-4">New to MaiRii?</p>
        <Link href={params.get("next") ? `/auth/signup?next=${encodeURIComponent(params.get("next")!)}` : "/auth/signup"}>
          <Button variant="outline" className="w-full">
            CREATE AN ACCOUNT
          </Button>
        </Link>
      </div>
    </>
  );
}


export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-40 px-6">
        <div className="w-full max-w-md bg-white p-10 shadow-sm border border-gray-100">
          <Suspense fallback={<p className="text-center text-sm text-gray-500">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  );
}
