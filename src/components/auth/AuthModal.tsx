"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GoogleAuthSection } from "@/components/auth/GoogleAuthSection";
import toast from "react-hot-toast";

interface AuthModalProps {
  onCloseMasterpiece?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onCloseMasterpiece }) => {
  const { user, login, register, loginWithGoogleIdToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // If user is logged in or has already seen auth modal, trigger Masterpiece modal for session
    const hasSeenAuthModal = sessionStorage.getItem("mairii_auth_modal_seen");
    const hasSeenMasterpieceModal = sessionStorage.getItem("mairii_masterpiece_modal_seen");

    if (user || hasSeenAuthModal) {
      if (!hasSeenMasterpieceModal && onCloseMasterpiece) {
        const timer = setTimeout(() => {
          onCloseMasterpiece();
        }, 3000);
        return () => clearTimeout(timer);
      }
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("mairii_auth_modal_seen", "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, onCloseMasterpiece]);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseMasterpiece) {
      onCloseMasterpiece();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login(email, password);
        toast.success("Signed in successfully!");
      } else {
        await register(name, email, password);
        toast.success("Account created successfully!");
      }
      setIsOpen(false);
      if (onCloseMasterpiece) {
        onCloseMasterpiece();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || user) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal content box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200 p-8 sm:p-10"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Luxury top ornament bar */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-amber-400/60" />
            <span className="text-amber-600 uppercase tracking-[0.4em] text-[10px] font-bold">
              MaiRii Atelier
            </span>
            <div className="w-8 h-px bg-amber-400/60" />
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
              {mode === "login" ? "Welcome Back" : "Begin Your Journey"}
            </h2>
            <p className="text-stone-500 text-xs tracking-wider uppercase mt-1 leading-relaxed">
              {mode === "login"
                ? "Sign in to access your saved treasures & bespoke orders"
                : "Create an account for personalized recommendations & updates"}
            </p>
          </div>

          {/* Google Sign-in */}
          <div className="mb-4">
            <GoogleAuthSection
              onCredential={async (idToken) => {
                try {
                  await loginWithGoogleIdToken(idToken);
                  toast.success("Signed in with Google");
                  setIsOpen(false);
                  if (onCloseMasterpiece) {
                    onCloseMasterpiece();
                  }
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Google sign-in failed");
                }
              }}
            />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-stone-400">
              <span className="bg-white px-3">Or email authentication</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-[10px] font-bold tracking-widest uppercase text-stone-500 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-stone-50 border border-stone-200/90 pl-10 pr-4 py-3 text-xs rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white text-stone-900 tracking-wider transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-bold tracking-widest uppercase text-stone-500 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-stone-50 border border-stone-200/90 pl-10 pr-4 py-3 text-xs rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white text-stone-900 tracking-wider transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-widest uppercase text-stone-500 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-50 border border-stone-200/90 pl-10 pr-10 py-3 text-xs rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white text-stone-900 tracking-wider transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 mt-2 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-[#c9a84c] transition-colors shadow-lg disabled:opacity-50"
            >
              <span>{submitting ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer toggle */}
          <div className="mt-6 pt-4 border-t border-stone-100 text-center">
            <p className="text-xs text-stone-500 tracking-wide">
              {mode === "login" ? "New to Mairii?" : "Already a member?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="font-bold text-amber-600 hover:underline ml-1 uppercase text-[11px] tracking-wider"
              >
                {mode === "login" ? "Create an Account" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
