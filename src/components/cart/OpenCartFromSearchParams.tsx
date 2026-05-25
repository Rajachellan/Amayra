"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * When URL contains `openCart=1` (e.g. legacy `/cart` redirect), open the drawer once and strip the param.
 */
export function OpenCartFromSearchParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openCart } = useCart();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    if (searchParams.get("openCart") !== "1") return;
    handled.current = true;
    openCart();
    const next = new URLSearchParams(searchParams.toString());
    next.delete("openCart");
    const query = next.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    router.replace(href, { scroll: false });
  }, [openCart, pathname, router, searchParams]);

  return null;
}
