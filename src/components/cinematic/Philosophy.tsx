"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the background texture
      gsap.to(bgImageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Word / line reveal on statements
      const statements = textContainerRef.current?.querySelectorAll(".reveal-text");
      if (statements) {
        gsap.fromTo(
          statements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center py-32 px-6 sm:px-12 lg:px-24 overflow-hidden bg-[#0D0D12]"
    >
      {/* Parallaxing organic dark marble/culinary smoke texture at low opacity */}
      <div
        ref={bgImageRef}
        className="absolute -top-[20%] left-0 right-0 h-[140%] pointer-events-none opacity-20 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Dark architectural marble and smoke texture"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D12] via-transparent to-[#0D0D12]" />
      </div>

      <div
        ref={textContainerRef}
        className="relative z-10 max-w-5xl mx-auto space-y-16 text-center sm:text-left"
      >
        <div className="reveal-text inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A24]/90 border border-[#C9A84C]/30 text-[#C9A84C] font-data text-xs">
          <Compass className="w-3.5 h-3.5" />
          <span>THE CHOPRUSH MANIFESTO</span>
        </div>

        {/* Statement 1: Common approach */}
        <div className="reveal-text space-y-3">
          <span className="font-data text-xs uppercase tracking-widest text-[#FAF8F5]/40 block">
            THE CURRENT COMPROMISE
          </span>
          <p className="font-heading font-medium text-xl sm:text-2xl lg:text-3xl text-slate-400 max-w-3xl leading-snug">
            Most food delivery focuses on:{" "}
            <span className="text-slate-300">
              mass-produced convenience, microwaved holding bins, and sluggish routing algorithms.
            </span>
          </p>
        </div>

        {/* Statement 2: Differentiated approach */}
        <div className="reveal-text space-y-4 pt-4 border-t border-white/10">
          <span className="font-data text-xs uppercase tracking-widest text-[#C9A84C] block font-bold">
            THE CHOPRUSH DOCTRINE
          </span>
          <h3 className="font-drama font-normal text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#FAF8F5] leading-[1.05] tracking-tight">
            We focus on:{" "}
            <span className="text-[#C9A84C] italic underline decoration-[#C9A84C]/30 underline-offset-8">
              uncompromising Michelin-grade execution
            </span>{" "}
            delivered in minutes.
          </h3>
          <p className="font-heading font-light text-base sm:text-xl text-slate-300 max-w-2xl pt-4 leading-relaxed">
            Every dish is treated like a time-sensitive instrument. Fired live when ordered, sealed in thermal vaults, and navigated through traffic via direct courier telemetry.
          </p>
        </div>
      </div>
    </section>
  );
}
