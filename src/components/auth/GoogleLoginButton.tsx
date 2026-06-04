"use client";

import { GoogleLogin } from "@react-oauth/google";

type Props = {
  useSignupCopy?: boolean;
  onSuccess: (credential: string | undefined) => void;
  onError: () => void;
};

export function GoogleLoginButton({ useSignupCopy, onSuccess, onError }: Props) {
  return (
    <GoogleLogin
      onSuccess={(cred) => onSuccess(cred.credential)}
      onError={onError}
      text={useSignupCopy ? "signup_with" : "continue_with"}
      size="large"
      width={320}
      theme="filled_blue"
    />
  );
}
