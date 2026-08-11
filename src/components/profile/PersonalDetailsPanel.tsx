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
  CheckCircle2,
  Building2,
  Home,
  Tag,
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
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">{label}</span>
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
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-900 outline-none transition duration-200 focus:ring-2 ${
          error
            ? "border-rose-300 focus:ring-rose-200"
            : "border-stone-200 focus:border-[#c9a84c] focus:ring-[#c9a84c]/20"
        } ${disabled ? "bg-stone-50 text-stone-500 cursor-not-allowed border-stone-200" : ""}`}
      />
      {error ? (
        <span className="block text-[11px] text-rose-600 font-medium">{error}</span>
      ) : hint ? (
        <span className="block text-[11px] text-stone-400 font-light">{hint}</span>
      ) : null}
    </label>
  );
}

function getAddressIcon(label?: string) {
  const l = (label || "").toLowerCase();
  if (l.includes("office") || l.includes("work")) return <Building2 className="w-4 h-4 text-[#c9a84c]" />;
  if (l.includes("home")) return <Home className="w-4 h-4 text-[#c9a84c]" />;
  return <Tag className="w-4 h-4 text-[#c9a84c]" />;
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
      toast.success("Profile details updated successfully!");
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
      toast.success(editingId ? "Address updated successfully" : "Address saved successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save address");
    } finally {
      setSavingAddress(false);
    }
  }

  async function removeAddress(id: string) {
    if (!window.confirm("Are you sure you want to remove this address?")) return;
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
      toast.error(err instanceof Error ? err.message : "Could not set default address");
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#c9a84c]" />
        <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">
          Loading personal information…
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-100">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] block mb-1">
          Account Settings
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
          Personal Details & Addresses
        </h2>
      </div>

      {/* Profile Contact Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-50/50 border border-stone-200/80 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200/60 pb-4">
          <div className="flex items-center gap-3 text-stone-900">
            <div className="p-2 rounded-xl bg-[#0B2516] text-[#c9a84c]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium">Contact Information</h3>
              <p className="text-xs text-stone-500">Manage your primary account details</p>
            </div>
          </div>
        </div>

        <form onSubmit={saveProfile} className="space-y-5" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Full Name"
              name="name"
              value={name}
              onChange={setName}
              error={profileErrors.name}
              placeholder="e.g. Priya Sharma"
              autoComplete="name"
              maxLength={80}
            />

            <label className="block space-y-1.5">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-stone-400" /> Email Address
              </span>
              <input
                value={profile.email}
                disabled
                readOnly
                className="w-full rounded-xl border border-stone-200 bg-stone-100/70 px-4 py-3 text-sm text-stone-500 cursor-not-allowed font-sans"
              />
              <span className="block text-[11px] text-stone-400 font-light">
                Email is linked to your account authentication and cannot be changed here.
              </span>
            </label>

            <div className="md:col-span-2">
              <Field
                label="Mobile Number"
                name="phone"
                value={phone}
                onChange={setPhone}
                error={profileErrors.phone}
                placeholder="10-digit Indian mobile number"
                autoComplete="tel"
                inputMode="tel"
                maxLength={16}
                hint="Format: 9876543210 or +91 98765 43210"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={savingProfile}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0B2516] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c9a84c] hover:text-[#0B2516] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Save Contact Details
            </button>
          </div>
        </form>
      </div>

      {/* Saved Addresses Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0B2516] text-[#c9a84c]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-stone-900">Saved Addresses</h3>
              <p className="text-xs text-stone-500">
                You have {addresses.length} saved address{addresses.length === 1 ? "" : "es"} (Max 8)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateAddress}
            disabled={addresses.length >= 8}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B2516] text-white text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#c9a84c] hover:text-[#0B2516] transition-all duration-300 shadow-md disabled:opacity-40"
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200/80 text-center space-y-3">
            <MapPin className="w-8 h-8 text-stone-300 mx-auto" />
            <h4 className="font-serif text-lg text-stone-800">No Saved Addresses</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              Add your home, office, or gift delivery locations for swift and seamless checkout experience.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {addresses.map((a, i) => (
              <div
                key={a.id ?? `${a.line1}-${i}`}
                className={`p-6 rounded-2xl border transition-all duration-300 relative space-y-4 flex flex-col justify-between ${
                  a.isDefault
                    ? "bg-white border-[#c9a84c] shadow-lg shadow-[#c9a84c]/10"
                    : "bg-stone-50/50 border-stone-200 hover:border-stone-300 hover:bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getAddressIcon(a.label)}
                      <span className="font-semibold text-stone-900 text-sm tracking-wide">
                        {a.label || "Address"}
                      </span>
                    </div>
                    
                    {a.isDefault && (
                      <span className="text-[9px] font-bold bg-[#c9a84c]/20 text-[#0B2516] px-2.5 py-1 rounded-full uppercase tracking-widest border border-[#c9a84c]/40">
                        Default Address
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-stone-600 leading-relaxed font-light space-y-1">
                    {a.fullName && (
                      <p className="font-semibold text-stone-900 font-sans">{a.fullName}</p>
                    )}
                    {a.phone && (
                      <p className="flex items-center gap-1.5 text-stone-500">
                        <Phone className="w-3 h-3 text-[#c9a84c]" /> {a.phone}
                      </p>
                    )}
                    <p className="pt-1">{a.line1}</p>
                    {a.line2 && <p>{a.line2}</p>}
                    <p className="font-medium text-stone-800">
                      {a.city}, {a.state} — {a.pincode}
                    </p>
                    <p className="text-[10px] tracking-widest text-stone-400 uppercase font-semibold">
                      {a.country ?? "IN"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-200/60">
                  {!a.isDefault && a.id ? (
                    <button
                      type="button"
                      onClick={() => void makeDefault(a.id!)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 hover:text-[#c9a84c] transition-colors uppercase tracking-wider"
                    >
                      <Star className="w-3.5 h-3.5" />
                      Make Default
                    </button>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      title="Edit Address"
                      onClick={() => openEditAddress(a)}
                      className="p-2 rounded-xl text-stone-500 hover:text-[#0B2516] hover:bg-stone-100 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {a.id && (
                      <button
                        type="button"
                        title="Delete Address"
                        onClick={() => void removeAddress(a.id!)}
                        className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Address Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={closeEditor}
          />
          <div className="relative w-full max-w-xl my-auto rounded-3xl bg-white shadow-2xl border border-stone-200 p-6 sm:p-10 space-y-6 z-10">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] block mb-1">
                  Delivery Destination
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-medium">
                  {editingId ? "Edit Saved Address" : "Add New Address"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                className="p-2.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveAddress} className="space-y-5" noValidate>
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
                  label="Recipient Full Name"
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
                    label="Mobile Number"
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
                    label="Address Line 1"
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
                    label="Address Line 2 (Optional)"
                    name="line2"
                    value={addressForm.line2}
                    onChange={(v) => setAddressForm((f) => ({ ...f, line2: v }))}
                    error={addressErrors.line2}
                    placeholder="Landmark, locality"
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
                  label="PIN Code"
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

              <label className="flex items-center gap-3 text-sm text-stone-700 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm((f) => ({ ...f, isDefault: e.target.checked }))}
                  className="w-4 h-4 rounded border-stone-300 text-[#0B2516] focus:ring-[#c9a84c]"
                />
                <span className="text-xs font-medium">Set as default shipping address</span>
              </label>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-6 py-3.5 rounded-full border border-stone-200 text-xs uppercase tracking-[0.18em] font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAddress}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0B2516] text-white text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#c9a84c] hover:text-[#0B2516] transition-all duration-300 shadow-md disabled:opacity-60"
                >
                  {savingAddress ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
