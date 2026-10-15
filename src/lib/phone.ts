export const countryCodes = [
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "QA", name: "Qatar", dial: "+974" },
  { iso: "KW", name: "Kuwait", dial: "+965" },
  { iso: "OM", name: "Oman", dial: "+968" },
  { iso: "BH", name: "Bahrain", dial: "+973" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "SG", name: "Singapore", dial: "+65" },
  { iso: "MY", name: "Malaysia", dial: "+60" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "NZ", name: "New Zealand", dial: "+64" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "CH", name: "Switzerland", dial: "+41" },
  { iso: "SE", name: "Sweden", dial: "+46" },
  { iso: "NO", name: "Norway", dial: "+47" },
  { iso: "IE", name: "Ireland", dial: "+353" },
  { iso: "ZA", name: "South Africa", dial: "+27" },
  { iso: "KE", name: "Kenya", dial: "+254" },
  { iso: "NG", name: "Nigeria", dial: "+234" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "CN", name: "China", dial: "+86" },
  { iso: "HK", name: "Hong Kong", dial: "+852" },
  { iso: "KR", name: "South Korea", dial: "+82" },
  { iso: "TH", name: "Thailand", dial: "+66" },
  { iso: "ID", name: "Indonesia", dial: "+62" },
  { iso: "PH", name: "Philippines", dial: "+63" },
  { iso: "LK", name: "Sri Lanka", dial: "+94" },
  { iso: "NP", name: "Nepal", dial: "+977" },
  { iso: "BD", name: "Bangladesh", dial: "+880" },
  { iso: "PK", name: "Pakistan", dial: "+92" },
] as const;

export const defaultCountry = "IN";

export function dialCode(iso: string) {
  return countryCodes.find((country) => country.iso === iso)?.dial ?? "+91";
}

export function localNumberError(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 4 || digits.length > 14) return "Enter a valid phone number";
  return "";
}

export function fullPhoneError(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 6 || digits.length > 15) return "Enter a valid phone number";
  return "";
}

export function formatPhone(iso: string, local: string) {
  return `${dialCode(iso)} ${local.trim()}`;
}
