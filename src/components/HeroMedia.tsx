"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroMedia({
  poster,
  video,
}: {
  poster: string;
  video: string;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reduceMotion || failed) {
    return (
      <>
        <Image
          src={poster}
          alt="Front elevation of Bellevue by SOBHA, twin towers in Feroke, Kozhikode"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <ScrollCue />
      </>
    );
  }

  return (
    <>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
        onError={() => setFailed(true)}
      >
        <source src={video} type="video/mp4" />
      </video>
      {ended && <ScrollCue />}
    </>
  );
}

function ScrollCue() {
  const [onFilm, setOnFilm] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero-film");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnFilm(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!onFilm) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-7 z-40 flex justify-center px-5">
      <div className="scroll-cue-enter">
        <button
          type="button"
          onClick={() => {
            document.getElementById("hero-intro")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="scroll-cue-float pointer-events-auto flex cursor-pointer items-center gap-4 rounded-full border border-white/70 bg-sand px-4 py-2.5 text-ink shadow-[0_16px_50px_rgba(0,0,0,0.45)]"
        >
          <span className="pl-2 text-[11px] tracking-[0.32em] uppercase">
            Scroll to explore
          </span>
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-teal text-white">
            <span
              aria-hidden
              className="scroll-ring absolute inset-0 rounded-full border border-sand"
            />
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="scroll-chevron h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
