const DEFAULT_API_PORT = 4000;

/** Base URL for the Node API (no trailing slash). */
export function getPublicApiUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  // In the browser, match the page host so LAN dev (e.g. 192.168.x.x:3000 → :4000) works.
  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;
    if (hostname === "mairiijewels.com" || hostname === "www.mairiijewels.com" || hostname.endsWith(".mairiijewels.com")) {
      return "https://api.mairiijewels.com";
    }
    return `${protocol}//${hostname}:${DEFAULT_API_PORT}`;
  }

  return `http://localhost:${DEFAULT_API_PORT}`;
}

/** Turn API image path or absolute URL into a usable `next/image` src. */
export function resolveMediaUrl(pathOrUrl: string | undefined | null): string {
  const raw = typeof pathOrUrl === "string" ? pathOrUrl.trim() : "";
  if (!raw) return "/images/1.jpg";
  if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("data:")) return raw;
  return `${getPublicApiUrl()}${raw.startsWith("/") ? "" : "/"}${raw}`;
}
