import { getPublicApiUrl, resolveMediaUrl } from "../apiBase";

/**
 * Utility to resolve media URLs (alias for resolveMediaUrl)
 */
export const mediaSrc = resolveMediaUrl;

/**
 * Generic fetch wrapper for Amayra API
 */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getPublicApiUrl();
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    let errorMessage = res.statusText;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      try {
        const text = await res.text();
        if (text) errorMessage = text;
      } catch {
        // use default statusText
      }
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json() as Promise<T>;
  }
  
  return {} as T;
}
