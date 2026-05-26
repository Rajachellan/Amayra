/** Base URL for the Node API (no trailing slash). */
export function getPublicApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  return url || "http://localhost:4000";
}

/** Turn API image path or absolute URL into a usable `next/image` src. */
export function resolveMediaUrl(pathOrUrl: string | undefined | null): string {
  const raw = typeof pathOrUrl === "string" ? pathOrUrl.trim() : "";
  if (!raw) return "/images/neckles.jpg";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `${getPublicApiUrl()}${raw.startsWith("/") ? "" : "/"}${raw}`;
}
