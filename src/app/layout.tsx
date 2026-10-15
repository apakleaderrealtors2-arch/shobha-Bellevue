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

const title =
  "Bellevue by SOBHA | Luxury Apartments in Kozhikode (Kozhikkode) | Feroke";
const description = `Luxury 3 & 4 bed apartments in Feroke, Kozhikode (Kozhikkode), Kerala. 298 residences from 2,243 Sq.Ft., starting INR 3.21 Cr.* Call or WhatsApp ${site.phoneDisplay} for site visits and brochures.`;

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
    "apartments in Kozhikode",
    "apartments in Kozhikkode",
    "flats in Kozhikode",
    "luxury apartments Kozhikode",
    "3 BHK Kozhikode",
    "4 BHK Kozhikode",
    "Bellevue by SOBHA",
    "SOBHA Bellevue Kozhikode",
    "SOBHA Feroke",
    "apartments in Feroke",
    "Calicut apartments",
    "Chaliyar River residences",
    site.phoneDisplay,
  ],
  alternates: {
    canonical: canonicalPath,
    types: {
      "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title,
    description,
    url: site.siteUrl,
    siteName: "Bellevue by SOBHA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Night aerial view of Bellevue by SOBHA twin towers in Feroke, Kozhikode",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Night aerial view of Bellevue by SOBHA twin towers in Feroke, Kozhikode",
      },
    ],
  },
  other: {
    "ai-summary": `Bellevue by SOBHA — luxury apartments in Feroke, Kozhikode/Kozhikkode. Contact ${site.phoneDisplay}.`,
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
