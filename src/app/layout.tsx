import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Fraunces, Outfit } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const title = "Bellevue by SOBHA | 3 & 4 Bed Luxury Residences in Feroke, Kozhikode";
const description =
  "298 limited-edition 3 and 4 bed luxury residences in Feroke, Kozhikode, with views of the Chaliyar River, Beypore Beach, and the Western Ghats. From 2,243 Sq.Ft. Starting from INR 3.21 Cr.*";

const siteUrl = new URL(site.siteUrl);
const canonicalPath =
  siteUrl.pathname === "/" ? "/" : siteUrl.pathname.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.origin),
  title: {
    default: title,
    template: "%s | Bellevue by SOBHA",
  },
  description,
  keywords: [
    "Bellevue by SOBHA",
    "SOBHA Bellevue Kozhikode",
    "luxury apartments Feroke",
    "3 BHK flats Kozhikode",
    "4 BHK flats Kozhikode",
    "apartments in Feroke",
    "Chaliyar River residences",
  ],
  alternates: { canonical: canonicalPath },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: site.siteUrl,
    siteName: "Bellevue by SOBHA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: site.hero,
        width: 1200,
        height: 630,
        alt: "Front elevation of Bellevue by SOBHA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [site.hero],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = {
    "--font-display": "var(--font-fraunces)",
    "--font-body": "var(--font-outfit)",
  } as CSSProperties;

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-sand text-ink antialiased" style={fontVars}>
        {children}
      </body>
    </html>
  );
}
