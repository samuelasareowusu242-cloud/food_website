"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Sparkles, Clock, Flame } from "lucide-react";

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlinePreRef = useRef<HTMLDivElement>(null);
  const headlineDramaRef = useRef<HTMLHeadingElement>(null);
  const descriptorRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        telemetryRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headlinePreRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          headlineDramaRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.7"
        )
        .fromTo(
          descriptorRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ctaGroupRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] flex flex-col justify-end overflow-hidden pb-16 sm:pb-24 px-6 sm:px-12 lg:px-20"
    >
      {/* Background imagery: Dark luxury marble & gourmet culinary smoke */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="ChopRush Dark Luxury Culinary Backdrop"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Heavy primary-to-black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/75 to-[#0D0D12]/30" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0D0D12]/50 to-[#0D0D12]" />
      </div>

      {/* Hero Content pushed to the bottom-left third */}
      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Monospace Telemetry Pill */}
        <div
          ref={telemetryRef}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1A1A24]/80 border border-[#C9A84C]/30 backdrop-blur-md text-[#C9A84C] font-data text-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="tracking-wider uppercase">
            Hyper-Velocity Gourmet Dispatch • Sub-15 Min Active
          </span>
        </div>

        {/* Hero Line Pattern: [Aspirational noun] meets / [Precision word]. */}
        <div className="space-y-1">
          <div
            ref={headlinePreRef}
            className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tighter text-[#FAF8F5]/90"
          >
            Culinary Velocity meets
          </div>

          <h1
            ref={headlineDramaRef}
            className="font-drama font-normal text-6xl sm:text-8xl lg:text-9xl tracking-tight text-[#FAF8F5] leading-[0.92]"
          >
            Gastronomic{" "}
            <span className="text-[#C9A84C] italic underline decoration-[#C9A84C]/40 underline-offset-8">
              Perfection.
            </span>
          </h1>
        </div>

        {/* Descriptor */}
        <p
          ref={descriptorRef}
          className="text-base sm:text-xl text-[#FAF8F5]/75 max-w-2xl font-light leading-relaxed pt-2"
        >
          ChopRush delivers chef-fired wagyu, artisanal Neapolitan crusts, and hand-cut poke directly to your threshold in bespoke thermal vaults — faster than you thought possible.
        </p>

        {/* Primary CTA button with magnetic feel */}
        <div ref={ctaGroupRef} className="pt-4 flex flex-wrap items-center gap-5">
          <a
            href="#menu-section"
            className="btn-magnetic px-8 sm:px-10 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-[#0D0D12] bg-[#C9A84C] shadow-2xl shadow-[#C9A84C]/30"
          >
            <span className="sliding-layer bg-[#E0C878]" />
            <span className="flex items-center gap-2.5">
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 text-[#0D0D12]" />
            </span>
          </a>

          <a
            href="#protocol"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors py-3 px-2 interactive-lift"
          >
            <span>Explore The Protocol</span>
            <span className="text-[#C9A84C]">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
