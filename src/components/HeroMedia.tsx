"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroMedia({
  poster,
  video,
}: {
  poster: string;
  video: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    if (!next) el.volume = 1;
    setMuted(next);
  };

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
        ref={videoRef}
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
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute top-4 right-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-ink/55 text-white backdrop-blur-sm transition hover:bg-ink/75"
      >
        {muted ? <MuteIcon /> : <UnmuteIcon />}
      </button>
      {ended && <ScrollCue />}
    </>
  );
}

function ScrollCue() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-4 sm:bottom-7">
      <div className="scroll-cue-enter">
        <button
          type="button"
          onClick={() => {
            document.getElementById("hero-intro")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="scroll-cue-float pointer-events-auto flex max-w-[min(100%,20rem)] cursor-pointer items-center gap-3 rounded-full border border-white/70 bg-sand px-3 py-2 text-ink shadow-[0_16px_50px_rgba(0,0,0,0.45)] sm:gap-4 sm:px-4 sm:py-2.5"
        >
          <span className="pl-1.5 text-[10px] tracking-[0.28em] uppercase sm:pl-2 sm:text-[11px] sm:tracking-[0.32em]">
            Scroll to explore
          </span>
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal text-white sm:h-11 sm:w-11">
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

function MuteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M22 9l-6 6M16 9l6 6" />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
