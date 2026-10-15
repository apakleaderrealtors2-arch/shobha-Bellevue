"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const READY_RATIO = 0.3;
const FORCE_START_MS = 14000;
const DESKTOP_QUERY = "(min-width: 768px)";

function bufferedRatio(video: HTMLVideoElement) {
  const duration = video.duration;
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const { buffered, currentTime } = video;
  if (!buffered.length) return 0;
  let end = 0;
  for (let i = 0; i < buffered.length; i += 1) {
    if (buffered.start(i) <= currentTime + 0.25) {
      end = Math.max(end, buffered.end(i));
    }
  }
  return Math.min(1, end / duration);
}

export function HeroMedia({
  poster,
  mobileVideo,
  desktopVideo,
}: {
  poster: string;
  mobileVideo: string;
  desktopVideo: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeVideo =
    isDesktop === null ? null : isDesktop ? desktopVideo : mobileVideo;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const updateMotion = () => setReduceMotion(motion.matches);
    const updateDesktop = () => setIsDesktop(desktop.matches);
    updateMotion();
    updateDesktop();
    motion.addEventListener("change", updateMotion);
    desktop.addEventListener("change", updateDesktop);
    return () => {
      motion.removeEventListener("change", updateMotion);
      desktop.removeEventListener("change", updateDesktop);
    };
  }, []);

  useEffect(() => {
    setFailed(false);
    setEnded(false);
    setReady(false);
    setProgress(0);
    setMuted(true);
    startedRef.current = false;
  }, [activeVideo]);

  useEffect(() => {
    if (reduceMotion || failed || !activeVideo) return;
    const el = videoRef.current;
    if (!el) return;

    startedRef.current = false;

    const startPlayback = async () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setProgress(1);
      setReady(true);
      el.muted = true;
      try {
        await el.play();
      } catch {
        // Autoplay can still fail on some browsers; keep the first frame visible.
      }
    };

    const syncBuffer = () => {
      const ratio = bufferedRatio(el);
      setProgress((current) => Math.max(current, Math.min(1, ratio / READY_RATIO)));
      if (ratio >= READY_RATIO) {
        void startPlayback();
      }
    };

    el.pause();
    el.preload = "auto";
    el.load();

    const onCanPlayThrough = () => {
      void startPlayback();
    };

    el.addEventListener("progress", syncBuffer);
    el.addEventListener("loadeddata", syncBuffer);
    el.addEventListener("canplay", syncBuffer);
    el.addEventListener("canplaythrough", onCanPlayThrough);

    const force = window.setTimeout(() => {
      void startPlayback();
    }, FORCE_START_MS);

    syncBuffer();

    return () => {
      window.clearTimeout(force);
      el.removeEventListener("progress", syncBuffer);
      el.removeEventListener("loadeddata", syncBuffer);
      el.removeEventListener("canplay", syncBuffer);
      el.removeEventListener("canplaythrough", onCanPlayThrough);
    };
  }, [activeVideo, reduceMotion, failed]);

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
      <Image
        src={poster}
        alt=""
        fill
        priority
        aria-hidden
        className={`object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
      />
      {activeVideo && (
        <video
          key={activeVideo}
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          preload="auto"
          onEnded={() => setEnded(true)}
          onError={() => setFailed(true)}
        >
          <source src={activeVideo} type="video/mp4" />
        </video>
      )}

      {!ready && <VideoLoader progress={progress} />}

      {ready && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute top-4 right-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-ink/55 text-white backdrop-blur-sm transition hover:bg-ink/75"
        >
          {muted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      )}
      {ended && <ScrollCue />}
    </>
  );
}

function VideoLoader({ progress }: { progress: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);

  return (
    <div
      className="hero-loader absolute inset-0 z-10 flex items-center justify-center bg-ink/35"
      role="status"
      aria-live="polite"
      aria-label={`Loading film ${pct}%`}
    >
      <div className="hero-loader-panel mx-6 flex w-full max-w-[16rem] flex-col items-center text-center text-sand">
        <p className="text-[10px] tracking-[0.42em] text-sand/70 uppercase">
          Bellevue
        </p>
        <p className="mt-3 font-display text-2xl tracking-[0.04em] text-sand">
          Preparing the film
        </p>
        <div className="mt-6 h-px w-full overflow-hidden bg-sand/20">
          <div
            className="hero-loader-bar h-full bg-sand"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-[11px] tracking-[0.28em] text-sand/65 uppercase">
          {pct < 100 ? `${pct}%` : "Starting"}
        </p>
      </div>
    </div>
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
