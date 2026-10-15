"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const nav = [
  { href: "#overview", label: "Overview" },
  { href: "#homes", label: "Homes" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#enquire", label: "Enquire" },
];

export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-film");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-sand/90 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-18">
        <a href="#top" className="leading-tight">
          <span className="block text-[10px] tracking-[0.28em] text-teal uppercase">
            {site.brand}
          </span>
          <span className="font-display text-xl text-ink">{site.shortName}</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-mute transition hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#enquire"
          className="rounded-full bg-teal px-4 py-2 text-sm text-white transition hover:bg-teal-deep"
        >
          Enquire
        </a>
      </div>
    </header>
  );
}
