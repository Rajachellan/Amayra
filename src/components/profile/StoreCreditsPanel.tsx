"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/formatPrice";
import {
  CreditCard,
  Copy,
  Check,
  AlertTriangle,
  Clock,
  ArrowRight,
  Loader2,
  Receipt,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export type CustomerCreditItem = {
  _id: string;
  couponCode: string;
  initialBalance: number;
  availableBalance: number;
  reservedBalance: number;
  redeemedAmount: number;
  issuedDate: string;
  expiryDate: string;
  status: "ACTIVE" | "PARTIALLY_REDEEMED" | "EXHAUSTED" | "EXPIRED" | "CANCELLED";
  isExpiringSoon: boolean;
  creditNoteNumber?: string;
  returnRequestNumber?: string;
  originalOrderNumber?: string;
};

export type CreditTransactionItem = {
  _id: string;
  transactionType: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  transactionDate: string;
  description: string;
  orderNumber?: string;
};

export type StoreCreditsResponse = {
  totalAvailable: number;
  credits: CustomerCreditItem[];
  transactions: CreditTransactionItem[];
};

export function StoreCreditsPanel() {
  const [data, setData] = useState<StoreCreditsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"credits" | "history">("credits");

  useEffect(() => {
    setLoading(true);
    api<StoreCreditsResponse>("/store-credits/me")
      .then((res) => {
        setData(res);
        setError("");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load store credits"))
      .finally(() => setLoading(false));
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode((curr) => (curr === code ? null : curr));
    }, 2500);
  };

  const formatDate = (d: string) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDaysRemaining = (expiryDateStr: string) => {
    const diff = new Date(expiryDateStr).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#c9a84c]" />
        <p className="text-xs uppercase tracking-widest text-stone-400">Loading your store credits…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-2">
        <p className="text-sm text-rose-700">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-xs font-semibold uppercase tracking-wider text-rose-800 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  const credits = data?.credits || [];
  const transactions = data?.transactions || [];
  const totalAvailable = data?.totalAvailable || 0;

  return (
    <div className="space-y-8">
      {/* Top Hero Balance Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2516] via-[#103822] to-[#0B2516] text-white p-8 md:p-10 shadow-xl border border-[#c9a84c]/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#c9a84c]/20 text-[#c9a84c]">
                <CreditCard className="w-4 h-4" />
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
                Total Available Store Credit
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white">
              ₹{formatPrice(totalAvailable)}
            </h2>
            <p className="text-xs text-stone-300 max-w-md">
              Valid for 3 months (90 days) from issuance. Automatically applied at checkout or enter your credit coupon code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#e4cb7e] text-[#0B2516] font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/20 transition duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Use at Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-navigation tabs: Active Credits vs Transaction Ledger */}
      <div className="flex border-b border-stone-200">
        <button
          type="button"
          onClick={() => setActiveSubTab("credits")}
          className={`pb-3 px-4 text-xs font-semibold uppercase tracking-widest border-b-2 transition ${
            activeSubTab === "credits"
              ? "border-[#0B2516] text-[#0B2516]"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          Credit Notes ({credits.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab("history")}
          className={`pb-3 px-4 text-xs font-semibold uppercase tracking-widest border-b-2 transition ${
            activeSubTab === "history"
              ? "border-[#0B2516] text-[#0B2516]"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          Transaction Ledger ({transactions.length})
        </button>
      </div>

      {/* SUB-TAB 1: Active & Past Credit Notes */}
      {activeSubTab === "credits" && (
        <div className="space-y-6">
          {credits.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#c9a84c] flex items-center justify-center mx-auto">
                <Receipt className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-serif text-xl text-[#0B2516]">No Store Credits Yet</h3>
              <p className="text-sm text-stone-500 max-w-md mx-auto">
                When you return an item and opt for Store Credit settlement, your 90-day credit note and coupon code will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {credits.map((c) => {
                const daysLeft = calculateDaysRemaining(c.expiryDate);
                const isUsable = (c.status === "ACTIVE" || c.status === "PARTIALLY_REDEEMED") && c.availableBalance > 0 && daysLeft > 0;
                const isCopied = copiedCode === c.couponCode;

                return (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl border transition-all p-6 space-y-5 bg-white shadow-sm hover:shadow-md ${
                      isUsable ? "border-stone-200" : "border-stone-200 opacity-75 bg-stone-50/50"
                    }`}
                  >
                    {/* Header: Credit Note # and Status */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Credit Note
                        </span>
                        <span className="font-mono text-xs font-bold text-[#0B2516]">
                          {c.creditNoteNumber || "CN-RECORD"}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            c.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : c.status === "PARTIALLY_REDEEMED"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : c.status === "EXPIRED"
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : "bg-stone-100 text-stone-600 border border-stone-200"
                          }`}
                        >
                          {c.status.replace(/_/g, " ")}
                        </span>
                        {c.isExpiringSoon && isUsable && (
                          <span className="flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            Expiring in {daysLeft}d
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Coupon Code Block */}
                    <div className="p-3.5 bg-gradient-to-r from-stone-50 to-[#faf8f5] border border-stone-200 rounded-xl flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 block mb-0.5">
                          Coupon Code (Enter at Checkout)
                        </span>
                        <span className="font-mono text-base font-bold text-[#0B2516] tracking-wider">
                          {c.couponCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(c.couponCode)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          isCopied
                            ? "bg-emerald-600 text-white"
                            : "bg-[#0B2516] text-white hover:bg-[#c9a84c] hover:text-[#0B2516]"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy
                          </>
                        )}
                      </button>
                    </div>

                    {/* Balances Breakdown */}
                    <div className="grid grid-cols-3 gap-2 text-center p-3 bg-stone-50/70 rounded-xl">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Initial</span>
                        <span className="text-xs font-bold text-stone-700">₹{formatPrice(c.initialBalance)}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Redeemed</span>
                        <span className="text-xs font-bold text-stone-700">₹{formatPrice(c.redeemedAmount)}</span>
                      </div>
                      <div className="border-l border-stone-200 pl-1">
                        <span className="text-[9px] uppercase tracking-wider text-[#c9a84c] font-bold block">Available</span>
                        <span className="text-xs font-bold text-[#0B2516]">₹{formatPrice(c.availableBalance)}</span>
                      </div>
                    </div>

                    {/* Metadata & Dates */}
                    <div className="text-[11px] text-stone-500 space-y-1 pt-1">
                      <div className="flex justify-between">
                        <span>Issued Date:</span>
                        <span className="text-stone-700 font-medium">{formatDate(c.issuedDate)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Expiry Date (90 Days):</span>
                        <span className={`font-semibold ${c.isExpiringSoon ? "text-amber-700" : "text-stone-800"}`}>
                          {formatDate(c.expiryDate)}
                        </span>
                      </div>
                      {c.returnRequestNumber && (
                        <div className="flex justify-between">
                          <span>Return Request:</span>
                          <span className="font-mono text-stone-700">{c.returnRequestNumber}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: Immutable Transaction History Ledger */}
      {activeSubTab === "history" && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-sm text-stone-500">No transaction records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-widest text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Transaction</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Balance After</th>
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {transactions.map((tx) => {
                    const isCredit = tx.transactionType === "CREDIT_ISSUED" || tx.transactionType === "CREDIT_RELEASED";
                    return (
                      <tr key={tx._id} className="hover:bg-stone-50/50 transition">
                        <td className="py-3 px-4 text-stone-500 whitespace-nowrap">{formatDate(tx.transactionDate)}</td>
                        <td className="py-3 px-4 font-semibold text-stone-800">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              isCredit ? "bg-emerald-50 text-emerald-800" : "bg-stone-100 text-stone-700"
                            }`}
                          >
                            {tx.transactionType.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold whitespace-nowrap">
                          <span className={isCredit ? "text-emerald-700" : "text-[#0B2516]"}>
                            {isCredit ? "+" : "-"}₹{formatPrice(tx.amount)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-700 font-medium">₹{formatPrice(tx.balanceAfter)}</td>
                        <td className="py-3 px-4 font-mono text-stone-600">{tx.orderNumber || "-"}</td>
                        <td className="py-3 px-4 text-stone-500 max-w-xs truncate">{tx.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

