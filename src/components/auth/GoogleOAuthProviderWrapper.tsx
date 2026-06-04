"use client";

import type { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function GoogleOAuthProviderWrapper({
  clientId,
  children,
}: {
  clientId: string;
  children: ReactNode;
}) {
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
