"use client";

import React, { useEffect, useState } from "react";
import { Zap, Activity, Calendar, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function CinematicFeatures() {
  // -------------------------------------------------------------
  // Card 1: Diagnostic Shuffler (Fast Delivery)
  // -------------------------------------------------------------
  const initialShufflerCards = [
    {
      id: "shuf-1",
      tag: "PHASE 01: INDUCTION",
      title: "Micro-Kitchen Hearth Dispatch",
      metric: "3.2m Prep avg",
      status: "Dispatched",
      color: "border-[#C9A84C]/50 bg-[#0D0D12] text-[#FAF8F5]",
    },
    {
      id: "shuf-2",
      tag: "PHASE 02: CONTAINMENT",
      title: "68°C Thermal-Lock Vault",
      metric: "0° Heat Loss",
      status: "Active",
      color: "border-[#C9A84C]/30 bg-[#161622] text-[#FAF8F5]",
    },
    {
      id: "shuf-3",
      tag: "PHASE 03: VELOCITY",
      title: "Point-to-Point Hyper Transit",
      metric: "11.4m To Door",
      status: "En Route",
      color: "border-[#C9A84C]/20 bg-[#1F1F2E] text-[#FAF8F5]",
    },
  ];

  const [shufflerStack, setShufflerStack] = useState(initialShufflerCards);

  useEffect(() => {
    const timer = setInterval(() => {
      setShufflerStack((prev) => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // -------------------------------------------------------------
  // Card 2: Telemetry Typewriter (Fresh & Quality Food)
  // -------------------------------------------------------------
  const telemetryFeeds = [
    "A5 Wagyu seared on almond wood embers at 420°C [BATCH: 902].",
    "Hydroponic micro-greens harvested at 06:14 this morning.",
    "Buffalo mozzarella flown directly from Campania overnight.",
    "Zero refrigeration after cooking. Fresh fire seal authenticated.",
    "San Marzano reduction cold-fermented 72 hours for umami purity.",
  ];

  const [currentFeedIndex, setCurrentFeedIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentTarget = telemetryFeeds[currentFeedIndex];

    if (charIndex < currentTarget.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentTarget.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const waitTimeout = setTimeout(() => {
        setCharIndex(0);
        setTypedText("");
        setCurrentFeedIndex((prev) => (prev + 1) % telemetryFeeds.length);
      }, 2200);
      return () => clearTimeout(waitTimeout);
    }
  }, [charIndex, currentFeedIndex]);

  // -------------------------------------------------------------
  // Card 3: Cursor Protocol Scheduler (Easy Ordering)
  // -------------------------------------------------------------
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [activeDayIndex, setActiveDayIndex] = useState(3); // Wednesday
  const [isSaved, setIsSaved] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 30, y: 40, pressing: false });

  useEffect(() => {
    // Loop animation simulating user setting their weekly dinner drop
    const interval = setInterval(() => {
      // Move to a target day
      const targetDay = (activeDayIndex + 1) % 7;
      setCursorPos({ x: 45 + (targetDay * 36), y: 35, pressing: false });

      setTimeout(() => {
        // Press
        setCursorPos((pos) => ({ ...pos, pressing: true }));
        setActiveDayIndex(targetDay);

        setTimeout(() => {
          setCursorPos((pos) => ({ ...pos, pressing: false }));

          // Move to Save button
          setTimeout(() => {
            setCursorPos({ x: 220, y: 110, pressing: false });

            setTimeout(() => {
              setCursorPos({ x: 220, y: 110, pressing: true });
              setIsSaved(true);

              setTimeout(() => {
                setCursorPos({ x: 220, y: 110, pressing: false });
                setTimeout(() => setIsSaved(false), 1200);
              }, 300);
            }, 400);
          }, 400);
        }, 300);
      }, 500);
    }, 4500);

    return () => clearInterval(interval);
  }, [activeDayIndex]);

  return (
    <section id="features" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5]/5 border border-[#C9A84C]/30 text-[#C9A84C] font-data text-xs mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>FUNCTIONAL MICRO-INSTRUMENTS</span>
        </div>
        <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#FAF8F5]">
          Architected for <span className="font-drama font-normal italic text-[#C9A84C]">Zero Friction</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Three precision pillars transforming how discerning diners experience high-end hot meals.
        </p>
      </div>

      {/* Grid of 3 Interactive Functional Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ========================================================= */}
        {/* Card 1: Diagnostic Shuffler (Fast Delivery) */}
        {/* ========================================================= */}
        <div className="luxe-card-ivory p-8 flex flex-col justify-between min-h-[460px] border border-[#C9A84C]/30 shadow-2xl relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <span className="font-data text-[10px] font-extrabold uppercase tracking-widest text-[#0D0D12]/60">
                PILLAR 01 // VELOCITY
              </span>
              <span className="font-data text-xs font-bold text-[#C9A84C]">12.4m AVG</span>
            </div>

            <h3 className="font-heading font-bold text-2xl text-[#0D0D12] mt-4">
              Fast Delivery Dispatch
            </h3>
            <p className="text-xs text-[#2A2A35]/80 mt-1">
              Diagnostic multi-tier transit shuffler synchronizing kitchen release with driver touchdown.
            </p>
          </div>

          {/* Micro-UI: Diagnostic Shuffler with spring-bounce transition */}
          <div className="relative h-56 my-4 w-full flex items-center justify-center">
            {shufflerStack.map((card, idx) => {
              const isTop = idx === 0;
              const isMiddle = idx === 1;
              const isBack = idx === 2;

              let translateY = "translate-y-0";
              let scale = "scale-100";
              let zIndex = "z-30";
              let opacity = "opacity-100";

              if (isMiddle) {
                translateY = "translate-y-4";
                scale = "scale-95";
                zIndex = "z-20";
                opacity = "opacity-80";
              } else if (isBack) {
                translateY = "translate-y-8";
                scale = "scale-90";
                zIndex = "z-10";
                opacity = "opacity-60";
              }

              return (
                <div
                  key={card.id}
                  style={{
                    transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  className={`absolute w-full max-w-[280px] p-4 rounded-2xl border shadow-xl ${card.color} ${translateY} ${scale} ${zIndex} ${opacity}`}
                >
                  <div className="flex items-center justify-between text-[10px] font-data text-[#C9A84C]">
                    <span>{card.tag}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#C9A84C]/20 border border-[#C9A84C]/40">
                      {card.status}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mt-2">
                    {card.title}
                  </h4>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between font-data text-xs text-slate-300">
                    <span>Telemetry Spec</span>
                    <span className="text-[#C9A84C] font-bold">{card.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#0D0D12]">
            <span className="font-semibold">Sub-15 Minute Precision SLA</span>
            <span className="font-data font-bold text-[#C9A84C]">ACTIVE</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Card 2: Telemetry Typewriter (Fresh & Quality Food) */}
        {/* ========================================================= */}
        <div className="luxe-card-ivory p-8 flex flex-col justify-between min-h-[460px] border border-[#C9A84C]/30 shadow-2xl relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <span className="font-data text-[10px] font-extrabold uppercase tracking-widest text-[#0D0D12]/60">
                PILLAR 02 // GASTRONOMY
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-data text-[11px] font-bold text-emerald-700">LIVE FEED</span>
              </div>
            </div>

            <h3 className="font-heading font-bold text-2xl text-[#0D0D12] mt-4">
              Fresh & Quality Food
            </h3>
            <p className="text-xs text-[#2A2A35]/80 mt-1">
              Real-time culinary ingredient telemetry streamed directly from our artisan kitchen pass.
            </p>
          </div>

          {/* Micro-UI: Monospace Telemetry Typewriter terminal */}
          <div className="my-4 p-4 rounded-2xl bg-[#0D0D12] border border-[#C9A84C]/25 text-[#FAF8F5] min-h-[170px] flex flex-col justify-between shadow-inner font-data">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 border-b border-white/10">
              <span>CHOPRUSH//ORIGIN_LOG</span>
              <span className="text-[#C9A84C]">SECURE-TLS</span>
            </div>

            <div className="py-2 text-xs leading-relaxed text-slate-200">
              <span className="text-[#C9A84C] font-bold mr-2">&gt;</span>
              <span>{typedText}</span>
              <span className="inline-block w-2 h-4 bg-[#C9A84C] ml-1 align-middle animate-pulse" />
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span>STATUS: AUTHENTICATED</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> VERIFIED ORIGIN
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#0D0D12]">
            <span className="font-semibold">Uncompromising Raw Standards</span>
            <span className="font-data font-bold text-[#C9A84C]">100% NON-GMO</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Card 3: Cursor Protocol Scheduler (Easy Ordering) */}
        {/* ========================================================= */}
        <div className="luxe-card-ivory p-8 flex flex-col justify-between min-h-[460px] border border-[#C9A84C]/30 shadow-2xl relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <span className="font-data text-[10px] font-extrabold uppercase tracking-widest text-[#0D0D12]/60">
                PILLAR 03 // SIMPLICITY
              </span>
              <span className="font-data text-xs font-bold text-[#C9A84C]">1-TAP FLOW</span>
            </div>

            <h3 className="font-heading font-bold text-2xl text-[#0D0D12] mt-4">
              Easy Ordering Routine
            </h3>
            <p className="text-xs text-[#2A2A35]/80 mt-1">
              Automated meal cadence scheduler with zero friction checkout and persistent taste preferences.
            </p>
          </div>

          {/* Micro-UI: Interactive Weekly Grid with simulated animated cursor */}
          <div className="relative my-4 p-4 rounded-2xl bg-[#0D0D12] border border-[#C9A84C]/25 text-[#FAF8F5] select-none">
            <div className="flex items-center justify-between text-[10px] font-data text-slate-400 mb-3">
              <span>WEEKLY DROP CADENCE</span>
              <span className="text-[#C9A84C]">RECURRING: ON</span>
            </div>

            {/* S M T W T F S Day row */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {days.map((day, idx) => {
                const isSelected = activeDayIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveDayIndex(idx)}
                    className={`py-2 rounded-xl text-xs font-data font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#C9A84C] text-[#0D0D12] scale-105 shadow-md shadow-[#C9A84C]/30"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Save Button */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-data">
                Selected: {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][activeDayIndex]}
              </span>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  isSaved
                    ? "bg-emerald-600 text-white scale-95"
                    : "bg-[#C9A84C] text-[#0D0D12]"
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Locked</span>
                  </>
                ) : (
                  <span>Save Plan</span>
                )}
              </button>
            </div>

            {/* Animated SVG Cursor */}
            <div
              style={{
                transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${
                  cursorPos.pressing ? 0.85 : 1
                })`,
                transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              className="absolute top-4 left-4 pointer-events-none z-30 drop-shadow-[0_2px_8px_rgba(201,168,76,0.6)]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                  fill="#C9A84C"
                  stroke="#FAF8F5"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#0D0D12]">
            <span className="font-semibold">Instant Frictionless Checkout</span>
            <span className="font-data font-bold text-[#C9A84C]">ONE CLICK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
