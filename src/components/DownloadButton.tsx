"use client";

import { FormEvent, useEffect, useState } from "react";
import { site } from "@/lib/content";
import { formatPhone, localNumberError } from "@/lib/phone";
import { PhoneField, defaultCountry } from "@/components/PhoneField";

type DocumentKey = keyof typeof site.documents;

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-line bg-sand px-3 py-2.5 text-ink outline-none focus:border-teal";

export function DownloadButton({
  document,
  variant = "link",
}: {
  document: DocumentKey;
  variant?: "link" | "hero";
}) {
  const [open, setOpen] = useState(false);
  const label = site.documents[document].label;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === "hero"
            ? "rounded-full border border-white/40 px-6 py-3 text-sm text-white transition hover:border-white"
            : "text-teal underline decoration-line underline-offset-4 hover:decoration-teal"
        }
      >
        {variant === "hero" ? `Download ${label.toLowerCase()}` : label}
      </button>
      {open && (
        <DownloadDialog
          document={document}
          label={label}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function DownloadDialog({
  document,
  label,
  onClose,
}: {
  document: DocumentKey;
  label: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(defaultCountry);
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email";
    if (localNumberError(phone)) next.phone = localNumberError(phone);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setSending(true);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: formatPhone(country, phone),
          document,
          company,
        }),
      });
      const type = response.headers.get("content-type") || "";
      if (!response.ok || !type.includes("pdf")) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
          errors?: Record<string, string>;
        };
        if (data.errors) setErrors(data.errors);
        setSubmitError(data.error || "The download could not be started.");
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;
      link.download = site.documents[document].file;
      link.click();
      URL.revokeObjectURL(url);
      onClose();
    } catch {
      setSubmitError("The download could not be started. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0"
        onClick={onClose}
      />
      <form
        onSubmit={onSubmit}
        noValidate
        className="relative w-full max-w-md rounded-2xl bg-sand p-6 shadow-xl"
      >
        <p className="text-sm tracking-[0.18em] text-teal uppercase">Download</p>
        <h3 className="mt-2 font-display text-3xl text-ink">{label}</h3>
        <p className="mt-2 text-sm text-mute">
          Share your details and the file will download.
        </p>
        <div className="mt-5 grid gap-4">
          <Field
            label="Full name"
            value={name}
            error={errors.name}
            onChange={setName}
          />
          <Field
            label="Email"
            type="email"
            value={email}
            error={errors.email}
            onChange={setEmail}
          />
          <PhoneField
            label="Mobile number"
            iso={country}
            number={phone}
            error={errors.phone}
            onIso={setCountry}
            onNumber={setPhone}
          />
        </div>
        <div className="sr-only" aria-hidden="true">
          <label>
            Company
            <input
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </label>
        </div>
        {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line px-5 py-3 text-sm text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={sending}
            className="flex-1 rounded-full bg-teal py-3 text-sm font-medium text-white transition hover:bg-teal-deep disabled:opacity-60"
          >
            {sending ? "Sending…" : "Submit and download"}
          </button>
        </div>
      </form>
    </div>
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
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm text-mute">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
