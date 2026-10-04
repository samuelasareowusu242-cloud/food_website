"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicProtocol() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

      cards.forEach((card, index) => {
        if (!card) return;

        // Sticky pin each card
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          end: "+=100%",
        });

        // When the NEXT card scrolls over this card, scale down, blur, and fade out
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          if (nextCard) {
            gsap.to(card, {
              scale: 0.9,
              filter: "blur(20px)",
              opacity: 0.45,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: nextCard,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative w-full bg-[#0D0D12]">
      {/* Intro Header */}
      <div className="pt-24 pb-12 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5]/5 border border-[#C9A84C]/30 text-[#C9A84C] font-data text-xs mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>STICKY STACKING ARCHIVE</span>
        </div>
        <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#FAF8F5]">
          The 3-Step <span className="font-drama font-normal italic text-[#C9A84C]">Velocity Protocol</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Scroll to explore the sequential engineering pipeline that delivers hot gastronomy in sub-15 minutes.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* Card 01: Rotating Geometric Motif */}
      {/* ========================================================================= */}
      <div
        ref={card1Ref}
        className="w-full h-screen flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-[#0D0D12] border-t border-[#C9A84C]/20"
      >
        <div className="w-full max-w-5xl h-[80vh] luxe-card p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#161622] to-[#0D0D12]">
          <div className="space-y-6 max-w-md">
            <span className="font-data text-sm font-extrabold text-[#C9A84C] tracking-widest uppercase block">
              STEP // 01
            </span>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl text-[#FAF8F5] leading-tight">
              Micro-Hearth Induction Searing
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every dish is initiated with instant flame induction upon order confirmation. 
              Almond wood charcoal and high-output Japanese infrared guarantee intense crust caramelized within 180 seconds.
            </p>
            <div className="pt-4 border-t border-white/10 font-data text-xs text-[#C9A84C]">
              TELEMETRY: FLAME_CORE_TEMP_420C [LOCKED]
            </div>
          </div>

          {/* Unique SVG Animation 1: Rotating Concentric Gear / Celestial Motif */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center shrink-0">
            <svg
              className="w-full h-full animate-[spin_24s_linear_infinite]"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#C9A84C"
                strokeWidth="1"
                strokeDasharray="4 8"
                opacity="0.4"
              />
              <circle
                cx="100"
                cy="100"
                r="72"
                stroke="#C9A84C"
                strokeWidth="1.5"
                strokeDasharray="2 6"
                opacity="0.6"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                stroke="#C9A84C"
                strokeWidth="2"
                opacity="0.8"
              />
              {/* Radial Teeth / ticks */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="15"
                  x2="100"
                  y2="28"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  transform={`rotate(${i * 30} 100 100)`}
                  opacity="0.8"
                />
              ))}
            </svg>
            <svg
              className="absolute w-40 h-40 animate-[spin_12s_linear_infinite_reverse]"
              viewBox="0 0 100 100"
              fill="none"
            >
              <polygon
                points="50,15 85,75 15,75"
                stroke="#FAF8F5"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <circle cx="50" cy="50" r="10" fill="#C9A84C" opacity="0.9" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Card 02: Scanning Laser-Line Grid */}
      {/* ========================================================================= */}
      <div
        ref={card2Ref}
        className="w-full h-screen flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-[#0D0D12] border-t border-[#C9A84C]/20"
      >
        <div className="w-full max-w-5xl h-[80vh] luxe-card p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#161622] to-[#0D0D12]">
          <div className="space-y-6 max-w-md">
            <span className="font-data text-sm font-extrabold text-[#C9A84C] tracking-widest uppercase block">
              STEP // 02
            </span>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl text-[#FAF8F5] leading-tight">
              Nitrogen Thermal Encapsulation
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Meals are sealed in our vacuum hermetic vessel. Heat and vapor are balanced to prevent soggy crusts while locking core serving temperatures at precisely 68°C.
            </p>
            <div className="pt-4 border-t border-white/10 font-data text-xs text-[#C9A84C]">
              CONTAINMENT: 68.4°C ACTIVE_BARRIER [SEALED]
            </div>
          </div>

          {/* Unique SVG Animation 2: Scanning Laser Line across Dot Matrix */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-[#0D0D12] border border-[#C9A84C]/30 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
            {/* Dot Matrix */}
            <div className="grid grid-cols-8 grid-rows-8 gap-3 w-full h-full opacity-40">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              ))}
            </div>

            {/* Scanning Horizontal Laser Beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent shadow-[0_0_15px_#C9A84C] animate-[laserScan_3s_ease-in-out_infinite]" />

            <div className="absolute bottom-4 left-6 right-6 font-data text-[10px] text-[#C9A84C] flex justify-between">
              <span>SCANNING MATRIX</span>
              <span>100% PURITY</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Card 03: Pulsing Waveform (EKG Path Animation) */}
      {/* ========================================================================= */}
      <div
        ref={card3Ref}
        className="w-full h-screen flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-[#0D0D12] border-t border-[#C9A84C]/20"
      >
        <div className="w-full max-w-5xl h-[80vh] luxe-card p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#161622] to-[#0D0D12]">
          <div className="space-y-6 max-w-md">
            <span className="font-data text-sm font-extrabold text-[#C9A84C] tracking-widest uppercase block">
              STEP // 03
            </span>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl text-[#FAF8F5] leading-tight">
              White-Glove Hyper-Velocity Dispatch
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Our dedicated courier network routes directly to your door without bundled stops or intermediary handoffs. 
              The heartbeat of the city harnessed for pure speed.
            </p>
            <div className="pt-4 border-t border-white/10 font-data text-xs text-[#C9A84C]">
              DISPATCH: DIRECT_POINT_TO_POINT [ETA 12.8M]
            </div>
          </div>

          {/* Unique SVG Animation 3: Pulsing EKG Waveform */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-[#0D0D12] border border-[#C9A84C]/30 p-6 flex flex-col justify-center overflow-hidden shadow-inner">
            <svg viewBox="0 0 300 120" className="w-full overflow-visible">
              {/* Ghost background path */}
              <path
                d="M 10,60 L 60,60 L 80,20 L 100,100 L 120,40 L 140,80 L 160,60 L 210,60 L 225,10 L 240,95 L 255,60 L 290,60"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                opacity="0.2"
              />
              {/* Animated stroke-dashoffset wave */}
              <path
                d="M 10,60 L 60,60 L 80,20 L 100,100 L 120,40 L 140,80 L 160,60 L 210,60 L 225,10 L 240,95 L 255,60 L 290,60"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="400"
                strokeDashoffset="400"
                className="animate-[ekgPulse_2.5s_linear_infinite]"
              />
            </svg>

            <div className="font-data text-[10px] text-slate-400 flex justify-between mt-6 pt-3 border-t border-white/10">
              <span className="text-[#C9A84C]">HEARTBEAT FREQUENCY</span>
              <span>ZERO JITTER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
