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
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowVideo(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <>
      <Image
        src={poster}
        alt="Front elevation of Bellevue by SOBHA, twin towers in Feroke, Kozhikode"
        fill
        priority
        className="object-cover opacity-80"
        sizes="100vw"
      />
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          onError={() => setShowVideo(false)}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </>
  );
}
