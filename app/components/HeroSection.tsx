"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const badges = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    label: "شحن سريع",
    sub: "لكل مناطق المملكة",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    label: "ضمان رسمي",
    sub: "على جميع الأجهزة",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    label: "دعم سعودي",
    sub: "فريق متخصص",
  },
];

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const bgSrc = isMobile ? "/hero-mobile.webp" : "/hero.png";


  return (
    <section className="relative overflow-hidden" dir="rtl">

      {/* ── Background ── */}
      <Image
        key={bgSrc}
        src={bgSrc}
        alt="مدار للإلكترونيات"
        fill
        priority
        className="object-cover object-center -z-10"
        sizes="100vw"
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-20">
        <div className="max-w-xl">

          {/* ── Headline ── */}
          <h1 className="font-black leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>

            {/* line 1 */}
            <span className="block" style={{
              color: "#003048",
              WebkitTextStroke: isMobile ? "0.3px #003048" : "0",
              textShadow: "0 0 40px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.9), 0 2px 6px rgba(255,255,255,0.8)",
            }}>
              ايفونك الآن
            </span>

            {/* line 2 — gradient, مضمون يبان على أي خلفية */}
            <span className="block mt-1" style={{
              fontSize: "clamp(1.35rem, 3.2vw, 2.6rem)",
              fontWeight: 700,
              background: "linear-gradient(90deg, #024A65, #0889A2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              /* drop-shadow بدل text-shadow لأن gradient text ما بيدعم text-shadow */
              filter: "drop-shadow(0 0 12px rgba(255,255,255,1)) drop-shadow(0 1px 4px rgba(255,255,255,0.9))",
            }}>
              وبالأقساط المريحة
            </span>
          </h1>

          {/* ── Description ── */}
          <p className="text-sm sm:text-base font-semibold leading-relaxed mb-7 max-w-lg" style={{
            color: "#003048",
            textShadow: "0 0 30px rgba(255,255,255,1), 0 0 15px rgba(255,255,255,0.9), 0 1px 4px rgba(255,255,255,0.8)",
            WebkitTextStroke: isMobile ? "0.2px #003048" : "0",
          }}>
            امتلك أحدث أجهزة آيفون من مدار بخطط تقسيط تناسبك بدون تعقيد —{" "}
            <span style={{ color: "#024A65", fontWeight: 800 }}>
              بدفعة أولى فقط 1000 ريال
            </span>
          </p>

          {/* ── CTAs ── */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
              style={{ background: "#0889A2", boxShadow: "0 4px 20px rgba(8,137,162,0.45)" }}
            >
              تسوق الآن
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.75)",
                color: "#003048",
                border: "1.5px solid rgba(0,48,72,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              اكتشف عروضنا
            </Link>
          </div>

          {/* ── Badges — icon on top, label below ── */}
          <div className="flex flex-wrap gap-5 sm:gap-7">
            {badges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1.5 text-center">
                <span className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(6px)",
                  color: "#0889A2",
                  border: "1px solid rgba(8,137,162,0.25)",
                }}>
                  {b.icon}
                </span>
                <p className="text-xs font-bold" style={{
                  color: "#003048",
                  textShadow: "0 0 20px rgba(255,255,255,1), 0 1px 4px rgba(255,255,255,0.9)",
                  WebkitTextStroke: isMobile ? "0.2px #003048" : "0",
                }}>{b.label}</p>
                <p className="text-[10px] font-semibold" style={{
                  color: "#024A65",
                  textShadow: "0 0 16px rgba(255,255,255,1), 0 1px 3px rgba(255,255,255,0.9)",
                  WebkitTextStroke: isMobile ? "0.15px #024A65" : "0",
                }}>{b.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
