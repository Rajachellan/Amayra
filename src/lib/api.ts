import { getPublicApiUrl, resolveMediaUrl } from "./apiBase";

const TOKEN_KEY = "amayra_customer_token";

export { resolveMediaUrl as mediaSrc };

export function getCustomerToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setCustomerToken(t: string): void {
  localStorage.setItem(TOKEN_KEY, t);
}

export function clearCustomerToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function apiUrl(path: string): string {
  return `${getPublicApiUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export type ApiInit = RequestInit & { skipAuthRedirect?: boolean };

export async function api<T>(path: string, init?: ApiInit): Promise<T> {
  const token = getCustomerToken();
  const { skipAuthRedirect, ...fetchInit } = init ?? {};
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(fetchInit?.headers as Record<string, string>),
  };
  if (fetchInit?.body && !(fetchInit.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers.Authorization = `Bearer ${token}`;

  const r = await fetch(apiUrl(path), { ...fetchInit, headers });

  if (r.status === 401) {
    let msg = "Unauthorized";
    try {
      const j = (await r.clone().json()) as { message?: unknown };
      if (j?.message) msg = typeof j.message === "string" ? j.message : JSON.stringify(j.message);
    } catch {
      /* ignore */
    }
    if (!skipAuthRedirect) {
      clearCustomerToken();
      if (typeof window !== "undefined") {
        const next = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/auth/login?next=${next}`;
      }
    }
    throw new Error(msg);
  }

  if (!r.ok) {
    let msg = r.statusText;
    try {
      const j = (await r.json()) as { message?: unknown };
      if (j?.message) msg = typeof j.message === "string" ? j.message : JSON.stringify(j.message);
    } catch {
      const t = await r.text();
      if (t) msg = t;
    }
    throw new Error(msg);
  }

  if (r.status === 204) return undefined as T;
  const ct = r.headers.get("content-type");
  if (!ct?.includes("application/json")) return undefined as T;
  return r.json() as Promise<T>;
}
