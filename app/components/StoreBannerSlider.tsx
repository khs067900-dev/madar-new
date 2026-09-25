"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
}

export default function StoreBannerSlider({ images }: Props) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const total = images.length;

  const go = (idx: number) => setCurrent((idx + total) % total);

  // Auto-advance
  useEffect(() => {
    if (total <= 1) return;
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 4500);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    if (total <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 4500);
  };

  if (!total) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ borderRadius: "0 0 24px 24px" }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* الصور */}
      <div className="relative w-full" style={{ aspectRatio: "16/6" }}>
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            <Image
              src={src}
              alt={`banner-${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          </div>
        ))}

        {/* overlay ناعم من الأسفل */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)" }}
        />
      </div>

      {/* أسهم التنقل */}
      {total > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 2px 12px rgba(0,0,0,0.12)", border: "1px solid rgba(0,48,72,0.1)" }}
            aria-label="السابق"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button
            onClick={() => go(current + 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 2px 12px rgba(0,0,0,0.12)", border: "1px solid rgba(0,48,72,0.1)" }}
            aria-label="التالي"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </>
      )}

      {/* نقاط */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 20 : 7,
                height: 7,
                background: i === current ? "#0889A2" : "rgba(0,48,72,0.25)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
