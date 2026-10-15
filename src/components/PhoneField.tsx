"use client";

import { countryCodes, defaultCountry } from "@/lib/phone";

const controlClass =
  "min-w-0 rounded-lg border border-line bg-sand px-3 py-2.5 text-ink outline-none focus:border-teal";

export function PhoneField({
  label,
  iso,
  number,
  error,
  onIso,
  onNumber,
}: {
  label: string;
  iso: string;
  number: string;
  error?: string;
  onIso: (iso: string) => void;
  onNumber: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label className="text-sm text-mute">{label}</label>
      <div className="mt-1.5 flex min-w-0 gap-2">
        <select
          aria-label="Country code"
          value={iso}
          onChange={(event) => onIso(event.target.value)}
          className={`${controlClass} w-[6.75rem] shrink-0`}
        >
          {countryCodes.map((country) => (
            <option key={country.iso} value={country.iso}>
              {country.dial} {country.iso}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={number}
          onChange={(event) => onNumber(event.target.value)}
          className={`${controlClass} flex-1`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export { defaultCountry };
