"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function AmenityCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => {
      const isMobile = media.matches && !reduce.matches;
      setMobile(isMobile);
      setProgress(isMobile ? 0 : 1);
    };
    updateMode();
    media.addEventListener("change", updateMode);
    reduce.addEventListener("change", updateMode);
    return () => {
      media.removeEventListener("change", updateMode);
      reduce.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const el = ref.current;
    if (!el) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = Math.min(1, Math.max(0, entry.intersectionRatio / 0.72));
        setProgress(next);
      },
      { threshold: thresholds, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mobile]);

  const lift = 1 - progress;
  const style = mobile
    ? {
        transform: `translate3d(0, ${lift * 64}px, 0) rotateX(${lift * 18}deg) scale(${0.92 + progress * 0.08})`,
        opacity: 0.28 + progress * 0.72,
      }
    : undefined;

  return (
    <article
      ref={ref}
      className="amenity-card group"
      style={style}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-deep shadow-[0_18px_50px_rgba(26,26,24,0.16)] md:shadow-none"
        style={
          mobile
            ? {
                transform: `translateZ(${progress * 28}px)`,
              }
            : undefined
        }
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent md:hidden"
          style={{ opacity: 0.55 - progress * 0.35 }}
        />
      </div>
      <h3
        className="mt-3 font-display text-xl text-ink md:mt-3"
        style={
          mobile
            ? {
                transform: `translate3d(0, ${lift * 18}px, 0)`,
                opacity: 0.2 + progress * 0.8,
              }
            : undefined
        }
      >
        {title}
      </h3>
    </article>
  );
}
