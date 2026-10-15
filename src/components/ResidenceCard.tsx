"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ResidenceCard({
  title,
  size,
  image,
  points,
  index = 0,
}: {
  title: string;
  size: string;
  image: string;
  points: readonly string[];
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (reduce.matches) {
        setAnimate(false);
        setProgress(1);
      } else {
        setAnimate(true);
        setProgress(0);
      }
    };
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = Math.min(1, Math.max(0, entry.intersectionRatio / 0.55));
        setProgress((current) => Math.max(current, next));
      },
      { threshold: thresholds, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  const ease = progress * progress * (3 - 2 * progress);
  const rise = (1 - ease) * (28 + index * 8);
  const imageScale = 1.06 - ease * 0.06;

  return (
    <article
      ref={ref}
      className="residence-card group overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_22px_60px_rgba(26,26,24,0.1)]"
      style={
        animate
          ? {
              opacity: 0.2 + ease * 0.8,
              transform: `translate3d(0, ${rise}px, 0)`,
            }
          : undefined
      }
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          style={
            animate
              ? {
                  transform: `scale(${imageScale})`,
                }
              : undefined
          }
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
          style={{ opacity: 0.45 - ease * 0.3 }}
        />
      </div>
      <div className="p-6 md:p-8">
        <h3
          className="font-display text-3xl text-ink"
          style={
            animate
              ? {
                  opacity: Math.min(1, ease * 1.2),
                  transform: `translate3d(0, ${(1 - ease) * 14}px, 0)`,
                }
              : undefined
          }
        >
          {title}
        </h3>
        <p
          className="mt-2 text-teal"
          style={
            animate
              ? {
                  opacity: Math.min(1, Math.max(0, ease * 1.35 - 0.15)),
                  transform: `translate3d(0, ${(1 - ease) * 12}px, 0)`,
                }
              : undefined
          }
        >
          {size}
        </p>
        <ul className="mt-5 space-y-2 text-sm text-mute">
          {points.map((point, pointIndex) => {
            const pointEase = Math.min(
              1,
              Math.max(0, ease * 1.4 - 0.12 - pointIndex * 0.08),
            );
            return (
              <li
                key={point}
                className="flex gap-2"
                style={
                  animate
                    ? {
                        opacity: pointEase,
                        transform: `translate3d(0, ${(1 - pointEase) * 10}px, 0)`,
                      }
                    : undefined
                }
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                {point}
              </li>
            );
          })}
        </ul>
        <a
          href="#enquire"
          className="mt-6 inline-block text-sm font-medium text-ink underline decoration-line underline-offset-4 transition hover:decoration-teal"
          style={
            animate
              ? {
                  opacity: Math.min(1, Math.max(0, ease * 1.5 - 0.35)),
                }
              : undefined
          }
        >
          Request details
        </a>
      </div>
    </article>
  );
}
