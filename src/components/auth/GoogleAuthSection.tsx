"use client";

import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
  /** Use Google's "Sign up with Google" label vs "Continue with Google" */
  useSignupCopy?: boolean;
  onCredential: (idToken: string) => Promise<void>;
};

/** True when storefront has a non-empty NEXT_PUBLIC_GOOGLE_CLIENT_ID */
export function isGoogleOAuthConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim());
}

export function GoogleAuthSection({ useSignupCopy, onCredential }: Props) {
  const googleEnabled = isGoogleOAuthConfigured();

  async function handleSuccess(credential: string | undefined) {
    if (!credential) return;
    try {
      await onCredential(credential);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    }
  }

  return (
    <div className="mb-8 w-full">
      {/* Center Razorpay / GIS iframe wrappers */}
      <div className="flex min-h-[44px] w-full justify-center [&_iframe]:rounded-md">
        {googleEnabled ? (
          <GoogleLogin
            onSuccess={(cred) => void handleSuccess(cred.credential)}
            onError={() => toast.error("Google sign-in was cancelled")}
            text={useSignupCopy ? "signup_with" : "continue_with"}
            size="large"
            width={320}
            theme="filled_blue"
          />
        ) : (
          <button
            type="button"
            onClick={() =>
              toast.error(
                "Google sign-in OAuth Client ID is not configured"
              )
            }
            className="flex w-[min(100%,320px)] items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
          >
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded"
            >
              <Image 
                src="/images/icons/google.png"
                alt="Google"
                width={24}
                height={24}
              />
            </span>
            Continue with Google
          </button>
        )}
      </div>
      {!googleEnabled ? (
        <p className="mt-3 text-center text-[10px] leading-relaxed uppercase tracking-[0.12em] text-gray-400">
          Google sign-in not yet configured
        </p>
      ) : null}
    </div>
  );
}
