"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, clearCustomerToken, setCustomerToken } from "@/lib/api";

export type CustomerUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
};

type AuthCtx = {
  user: CustomerUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogleIdToken: (idToken: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("amayra_customer_token") : null;
      if (!token) {
        setUser(null);
        return;
      }
      const me = await api<CustomerUser & { addresses?: unknown }>("/auth/customer/me");
      const next: CustomerUser = {
        id: String(me.id),
        name: me.name,
        email: me.email,
        avatarUrl: me.avatarUrl,
        phone: me.phone,
      };
      // Avoid new object reference when nothing changed (prevents profile/tabs re-fetch loops)
      setUser((prev) => {
        if (
          prev &&
          prev.id === next.id &&
          prev.name === next.name &&
          prev.email === next.email &&
          prev.avatarUrl === next.avatarUrl &&
          prev.phone === next.phone
        ) {
          return prev;
        }
        return next;
      });
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refreshMe().finally(() => setLoading(false));
  }, [refreshMe]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api<{ token: string; customer: CustomerUser }>("/auth/customer/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      skipAuthRedirect: true,
    });
    setCustomerToken(res.token);
    setUser(res.customer);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await api<{ token: string; customer: CustomerUser }>("/auth/customer/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      skipAuthRedirect: true,
    });
    setCustomerToken(res.token);
    setUser(res.customer);
  }, []);

  const loginWithGoogleIdToken = useCallback(async (idToken: string) => {
    const res = await api<{ token: string; customer: CustomerUser }>("/auth/customer/oauth/google", {
      method: "POST",
      body: JSON.stringify({ idToken }),
      skipAuthRedirect: true,
    });
    setCustomerToken(res.token);
    setUser(res.customer);
  }, []);

  const logout = useCallback(() => {
    clearCustomerToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, loginWithGoogleIdToken, logout, refreshMe }),
    [user, loading, login, register, loginWithGoogleIdToken, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthCtx {
  const c = useContext(AuthContext);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
