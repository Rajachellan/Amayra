"use client";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Loader2,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import {
  addressFormSchema,
  addressToForm,
  EMPTY_ADDRESS_FORM,
  fieldErrorsFromZod,
  profileFormSchema,
  type AddressFormValues,
  type CustomerProfile,
  type SavedAddress,
} from "@/lib/validation/customerProfile";

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  autoComplete?: string;
  hint?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  disabled,
  type = "text",
  autoComplete,
  hint,
  maxLength,
  inputMode,
}: FieldProps) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:ring-2 ${
          error
            ? "border-red-300 focus:ring-red-200"
            : "border-stone-200 focus:border-[#c9a84c]/60 focus:ring-[#c9a84c]/20"
        } ${disabled ? "bg-stone-50 text-stone-500 cursor-not-allowed" : ""}`}
      />
      {error ? (
        <span className="block text-[11px] text-red-600">{error}</span>
      ) : hint ? (
        <span className="block text-[11px] text-stone-400">{hint}</span>
      ) : null}
    </label>
  );
}

export function PersonalDetailsPanel() {
  const { user, refreshMe } = useAuth();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<AddressFormValues>(EMPTY_ADDRESS_FORM);
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  const addresses = useMemo(() => profile?.addresses ?? [], [profile]);

  async function loadProfile() {
    setLoading(true);
    try {
      const p = await api<CustomerProfile>("/auth/customer/me");
      setProfile(p);
      setName(p.name ?? "");
      setPhone(p.phone ?? "");
    } catch {
      if (user) {
        setProfile({ name: user.name, email: user.email, phone: user.phone });
        setName(user.name);
        setPhone(user.phone ?? "");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  function openCreateAddress() {
    setEditingId(null);
    setAddressErrors({});
    setAddressForm({
      ...EMPTY_ADDRESS_FORM,
      fullName: name || user?.name || "",
      phone: phone || user?.phone || "",
      isDefault: addresses.length === 0,
    });
    setEditorOpen(true);
  }

  function openEditAddress(a: SavedAddress) {
    if (!a.id) {
      toast.error("This address needs to be re-saved before it can be edited.");
      return;
    }
    setEditingId(a.id);
    setAddressErrors({});
    setAddressForm(addressToForm(a, name || user?.name || "", phone || user?.phone || ""));
    setEditorOpen(true);
  }

  function closeEditor() {
    setEditorOpen(false);
    setEditingId(null);
    setAddressErrors({});
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    const parsed = profileFormSchema.safeParse({ name, phone });
    if (!parsed.success) {
      setProfileErrors(fieldErrorsFromZod(parsed.error));
      return;
    }
    setProfileErrors({});
    setSavingProfile(true);
    try {
      const updated = await api<CustomerProfile>("/auth/customer/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: parsed.data.name,
          phone: parsed.data.phone,
        }),
      });
      setProfile(updated);
      setName(updated.name);
      setPhone(updated.phone ?? "");
      await refreshMe();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update profile");
    } finally {
      setSavingProfile(false);
    }
  }

  async function saveAddress(e: React.FormEvent) {
    e.preventDefault();
    const parsed = addressFormSchema.safeParse(addressForm);
    if (!parsed.success) {
      setAddressErrors(fieldErrorsFromZod(parsed.error));
      return;
    }
    setAddressErrors({});
    setSavingAddress(true);
    try {
      const path = editingId
        ? `/auth/customer/me/addresses/${editingId}`
        : "/auth/customer/me/addresses";
      const updated = await api<CustomerProfile>(path, {
        method: editingId ? "PATCH" : "POST",
        body: JSON.stringify(parsed.data),
      });
      setProfile(updated);
      closeEditor();
      toast.success(editingId ? "Address updated" : "Address saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save address");
    } finally {
      setSavingAddress(false);
    }
  }

  async function removeAddress(id: string) {
    if (!window.confirm("Remove this address?")) return;
    try {
      const updated = await api<CustomerProfile>(`/auth/customer/me/addresses/${id}`, {
        method: "DELETE",
      });
      setProfile(updated);
      toast.success("Address removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove address");
    }
  }

  async function makeDefault(id: string) {
    try {
      const updated = await api<CustomerProfile>(`/auth/customer/me/addresses/${id}/default`, {
        method: "POST",
      });
      setProfile(updated);
      toast.success("Default address updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not set default");
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#c9a84c]" />
        <span className="text-xs uppercase tracking-widest text-stone-400">Loading details…</span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between mb-2 pb-4 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] block mb-1">
            Account Profile
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">Personal Details</h2>
        </div>
      </div>

      {/* Profile form */}
      <form onSubmit={saveProfile} className="space-y-5" noValidate>
        <div className="flex items-center gap-2 text-stone-800">
          <User className="w-4 h-4 text-[#c9a84c]" />
          <h3 className="font-serif text-lg">Contact information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Full name"
            name="name"
            value={name}
            onChange={setName}
            error={profileErrors.name}
            placeholder="e.g. Priya Sharma"
            autoComplete="name"
            maxLength={80}
          />
          <label className="block space-y-1.5">
            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> Email address
            </span>
            <input
              value={profile.email}
              disabled
              readOnly
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-500 cursor-not-allowed"
            />
            <span className="block text-[11px] text-stone-400">
              Email is linked to your login and cannot be changed here.
            </span>
          </label>
          <div className="md:col-span-2">
            <Field
              label="Mobile number"
              name="phone"
              value={phone}
              onChange={setPhone}
              error={profileErrors.phone}
              placeholder="10-digit Indian mobile"
              autoComplete="tel"
              inputMode="tel"
              maxLength={16}
              hint="Format: 9876543210 or +91 98765 43210"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={savingProfile}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#c9a84c] hover:text-stone-900 transition-colors disabled:opacity-60"
        >
          {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Save details
        </button>
      </form>

      {/* Addresses */}
      <div className="space-y-4 pt-2 border-t border-stone-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#c9a84c]">
            <MapPin className="w-4 h-4" />
            <h3 className="font-serif text-lg text-stone-900">Saved addresses</h3>
            <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
              {addresses.length}/8
            </span>
          </div>
          <button
            type="button"
            onClick={openCreateAddress}
            disabled={addresses.length >= 8}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-900 text-stone-900 text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-stone-900 hover:text-white transition-colors disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            Add address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 leading-relaxed">
            No saved addresses yet. Add Home, Office, or gift addresses — they will be available at
            checkout.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {addresses.map((a, i) => (
              <div
                key={a.id ?? `${a.line1}-${i}`}
                className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 relative space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-900 tracking-wide">
                      {a.label || "Address"}
                      {a.isDefault ? (
                        <span className="ml-2 align-middle text-[9px] font-bold bg-[#c9a84c]/20 text-[#c9a84c] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Default
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      {a.fullName ? (
                        <>
                          {a.fullName}
                          <br />
                        </>
                      ) : null}
                      {a.phone ? (
                        <>
                          <span className="inline-flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {a.phone}
                          </span>
                          <br />
                        </>
                      ) : null}
                      {a.line1}
                      {a.line2 ? (
                        <>
                          <br />
                          {a.line2}
                        </>
                      ) : null}
                      <br />
                      {a.city}, {a.state} — {a.pincode}
                      <br />
                      {a.country ?? "IN"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!a.isDefault && a.id ? (
                      <button
                        type="button"
                        title="Set as default"
                        onClick={() => void makeDefault(a.id!)}
                        className="p-2 rounded-lg text-stone-500 hover:text-[#c9a84c] hover:bg-white transition"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                    ) : null}
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => openEditAddress(a)}
                      className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-white transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {a.id ? (
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => void removeAddress(a.id!)}
                        className="p-2 rounded-lg text-stone-500 hover:text-red-600 hover:bg-white transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Address editor modal */}
      {editorOpen ? (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/40"
            onClick={closeEditor}
          />
          <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl border border-stone-200 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] block mb-1">
                  Shipping
                </span>
                <h3 className="font-serif text-2xl text-stone-900">
                  {editingId ? "Edit address" : "Add address"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveAddress} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Address Label / Tag</label>
                  <div className="flex flex-wrap gap-2 pb-1">
                    {["Home", "Work", "Office", "Parents", "Other"].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setAddressForm((f) => ({ ...f, label: tag }))}
                        className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition border ${
                          addressForm.label === tag
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-stone-50 text-stone-600 border-stone-200 hover:border-brand-gold"
                        }`}
                      >
                        {tag === "Home" ? "🏠 Home" : tag === "Work" || tag === "Office" ? "💼 " + tag : "📍 " + tag}
                      </button>
                    ))}
                  </div>
                  <Field
                    label=""
                    name="label"
                    value={addressForm.label}
                    onChange={(v) => setAddressForm((f) => ({ ...f, label: v }))}
                    error={addressErrors.label}
                    placeholder="Home / Office / Other"
                    maxLength={40}
                  />
                </div>
                <Field
                  label="Full name"
                  name="fullName"
                  value={addressForm.fullName}
                  onChange={(v) => setAddressForm((f) => ({ ...f, fullName: v }))}
                  error={addressErrors.fullName}
                  placeholder="Recipient name"
                  autoComplete="name"
                  maxLength={80}
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Mobile"
                    name="phone"
                    value={addressForm.phone}
                    onChange={(v) => setAddressForm((f) => ({ ...f, phone: v }))}
                    error={addressErrors.phone}
                    placeholder="10-digit Indian mobile"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={16}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Address line 1"
                    name="line1"
                    value={addressForm.line1}
                    onChange={(v) => setAddressForm((f) => ({ ...f, line1: v }))}
                    error={addressErrors.line1}
                    placeholder="House / flat / street"
                    autoComplete="address-line1"
                    maxLength={120}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Address line 2 (optional)"
                    name="line2"
                    value={addressForm.line2}
                    onChange={(v) => setAddressForm((f) => ({ ...f, line2: v }))}
                    error={addressErrors.line2}
                    placeholder="Landmark, area"
                    autoComplete="address-line2"
                    maxLength={120}
                  />
                </div>
                <Field
                  label="City"
                  name="city"
                  value={addressForm.city}
                  onChange={(v) => setAddressForm((f) => ({ ...f, city: v }))}
                  error={addressErrors.city}
                  autoComplete="address-level2"
                  maxLength={60}
                />
                <Field
                  label="State"
                  name="state"
                  value={addressForm.state}
                  onChange={(v) => setAddressForm((f) => ({ ...f, state: v }))}
                  error={addressErrors.state}
                  autoComplete="address-level1"
                  maxLength={60}
                />
                <Field
                  label="PIN code"
                  name="pincode"
                  value={addressForm.pincode}
                  onChange={(v) =>
                    setAddressForm((f) => ({ ...f, pincode: v.replace(/\D/g, "").slice(0, 6) }))
                  }
                  error={addressErrors.pincode}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={6}
                />
                <Field
                  label="Country"
                  name="country"
                  value={addressForm.country}
                  onChange={(v) =>
                    setAddressForm((f) => ({ ...f, country: v.toUpperCase().slice(0, 2) }))
                  }
                  error={addressErrors.country}
                  maxLength={2}
                  hint="ISO code (IN)"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm((f) => ({ ...f, isDefault: e.target.checked }))}
                  className="rounded border-stone-300 text-[#c9a84c] focus:ring-[#c9a84c]"
                />
                Set as default shipping address
              </label>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-5 py-3 rounded-full border border-stone-200 text-xs uppercase tracking-[0.18em] font-bold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAddress}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-stone-900 text-white text-xs uppercase tracking-[0.18em] font-bold hover:bg-[#c9a84c] hover:text-stone-900 disabled:opacity-60"
                >
                  {savingAddress ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? "Update address" : "Save address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
