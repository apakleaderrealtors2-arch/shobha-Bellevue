"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";
import { formatPhone, localNumberError } from "@/lib/phone";
import { PhoneField, defaultCountry } from "@/components/PhoneField";

type Form = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  consent: boolean;
  company: string;
};

const initial: Form = {
  name: "",
  email: "",
  phone: "",
  interest: "3 Bed Residences",
  message: "",
  consent: false,
  company: "",
};

export function EnquireForm() {
  const [form, setForm] = useState<Form>(initial);
  const [country, setCountry] = useState(defaultCountry);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    if (localNumberError(form.phone)) next.phone = localNumberError(form.phone);
    if (!form.consent) next.consent = "Consent is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: formatPhone(country, form.phone),
          project: site.name,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSubmitError(data.error || "Could not send your enquiry.");
        return;
      }
      setDone(true);
      setForm(initial);
    } catch {
      setSubmitError("Could not send your enquiry. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center">
        <h3 className="font-display text-3xl text-ink">Thank you</h3>
        <p className="mt-3 text-mute">
          We have received your enquiry. A Bellevue specialist will be in touch.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 text-sm text-teal underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative max-w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-white p-5 sm:p-6 md:p-8"
    >
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          value={form.name}
          error={errors.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />
        <Field
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <PhoneField
          label="Phone"
          iso={country}
          number={form.phone}
          error={errors.phone}
          onIso={setCountry}
          onNumber={(value) => setForm((current) => ({ ...current, phone: value }))}
        />
        <div className="min-w-0">
          <label className="text-sm text-mute">Interest</label>
          <select
            value={form.interest}
            onChange={(e) =>
              setForm((f) => ({ ...f, interest: e.target.value }))
            }
            className="mt-1.5 w-full min-w-0 rounded-lg border border-line bg-sand px-3 py-2.5 text-ink outline-none focus:border-teal"
          >
            <option>3 Bed Residences</option>
            <option>4 Bed Residences</option>
            <option>Site Visit</option>
            <option>Brochure</option>
          </select>
        </div>
      </div>
      <div className="sr-only" aria-hidden="true">
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          />
        </label>
      </div>
      <div className="mt-4 min-w-0">
        <label className="text-sm text-mute">Message</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-1.5 w-full min-w-0 resize-none rounded-lg border border-line bg-sand px-3 py-2.5 text-ink outline-none focus:border-teal"
        />
      </div>
      <label className="mt-4 flex items-start gap-3 text-sm text-mute">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) =>
            setForm((f) => ({ ...f, consent: e.target.checked }))
          }
          className="mt-1"
        />
        <span>I agree to be contacted about Bellevue by SOBHA.</span>
      </label>
      {errors.consent && (
        <p className="mt-1 text-xs text-red-600">{errors.consent}</p>
      )}
      {submitError && (
        <p className="mt-4 text-sm text-red-600">{submitError}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="mt-6 w-full rounded-full bg-teal py-3.5 text-sm font-medium text-white transition hover:bg-teal-deep disabled:opacity-60"
      >
        {sending ? "Sending…" : "Submit enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div className="min-w-0">
      <label className="text-sm text-mute">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full min-w-0 rounded-lg border border-line bg-sand px-3 py-2.5 text-ink outline-none focus:border-teal"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
