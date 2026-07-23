import { z } from "zod";

/** Letters (incl. Unicode), spaces, apostrophe, hyphen, period — 2–80 chars */
export const PERSON_NAME_RE =
  /^(?=.{2,80}$)[\p{L}][\p{L}\p{M}'’.\-]*(?: [\p{L}][\p{L}\p{M}'’.\-]*)*$/u;

/** Production-grade email */
export const EMAIL_RE =
  /^(?=.{3,254}$)(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{0,62}[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

/** India mobile: optional +91 / 0, then 10 digits starting 6–9 */
export const IN_PHONE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/;

/** Indian PIN */
export const IN_PINCODE_RE = /^[1-9][0-9]{5}$/;

export const PLACE_NAME_RE = /^(?=.{2,60}$)[\p{L}][\p{L}\p{M}'’.\-]*(?: [\p{L}][\p{L}\p{M}'’.\-]*)*$/u;

export const ADDRESS_LINE_RE = /^(?=.{3,120}$)[^\p{Cc}\p{Cf}]+$/u;

const LABEL_RE = /^(?=.{1,40}$)[\p{L}\p{N}][\p{L}\p{N}\p{M} '’.\-/]*$/u;

export function normalizeIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return `+91${digits.slice(2)}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  if (digits.length === 10) return `+91${digits}`;
  return raw.trim();
}

export const personNameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name must be at most 80 characters")
  .regex(PERSON_NAME_RE, "Use letters only (spaces, apostrophes, and hyphens allowed)");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, "Enter a valid email")
  .max(254, "Email is too long")
  .regex(EMAIL_RE, "Enter a valid email address (e.g. name@example.com)");

export const phoneSchema = z
  .string()
  .trim()
  .min(10, "Enter a valid mobile number")
  .max(16, "Phone number is too long")
  .regex(IN_PHONE_RE, "Enter a valid Indian mobile (10 digits, starting 6–9)")
  .transform(normalizeIndianPhone);

export const profileFormSchema = z.object({
  name: personNameSchema,
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || IN_PHONE_RE.test(v), {
      message: "Enter a valid Indian mobile (10 digits, starting 6–9)",
    })
    .transform((v) => (v === "" ? "" : normalizeIndianPhone(v))),
});

export const addressFormSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Add a label (Home, Office…)")
    .max(40)
    .regex(LABEL_RE, "Label may only contain letters, numbers, and basic punctuation"),
  fullName: personNameSchema,
  phone: phoneSchema,
  line1: z
    .string()
    .trim()
    .regex(ADDRESS_LINE_RE, "Enter a valid street address (3–120 characters)"),
  line2: z
    .string()
    .trim()
    .max(120)
    .regex(/^[^\p{Cc}\p{Cf}]*$/u, "Invalid characters in address line 2"),
  city: z.string().trim().regex(PLACE_NAME_RE, "Enter a valid city name"),
  state: z.string().trim().regex(PLACE_NAME_RE, "Enter a valid state name"),
  pincode: z.string().trim().regex(IN_PINCODE_RE, "Enter a valid 6-digit PIN code"),
  country: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/, "Use a 2-letter country code (e.g. IN)"),
  isDefault: z.boolean(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type AddressFormValues = z.infer<typeof addressFormSchema>;

export type SavedAddress = {
  id?: string;
  label?: string;
  fullName?: string;
  phone?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  isDefault?: boolean;
};

export type CustomerProfile = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: SavedAddress[];
};

export function fieldErrorsFromZod(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}

export const EMPTY_ADDRESS_FORM: AddressFormValues = {
  label: "Home",
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "IN",
  isDefault: false,
};

export function addressToForm(a: SavedAddress, fallbackName = "", fallbackPhone = ""): AddressFormValues {
  return {
    label: a.label || "Home",
    fullName: a.fullName || fallbackName,
    phone: a.phone || fallbackPhone,
    line1: a.line1 || "",
    line2: a.line2 || "",
    city: a.city || "",
    state: a.state || "",
    pincode: a.pincode || "",
    country: (a.country || "IN").toUpperCase(),
    isDefault: Boolean(a.isDefault),
  };
}
