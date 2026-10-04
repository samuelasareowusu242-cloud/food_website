"use client";

import React from "react";
import Image from "next/image";
import {
  Flame,
  ArrowRight,
  Shield,
  ChefHat,
  Bike,
  Sparkles,
  Smartphone,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/25 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Next.js 16 + PWA + PostgreSQL & Auth.js</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Artisan Flavors,{" "}
              <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Elevated
              </span>{" "}
              Kitchen Delivery.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience chef-crafted wagyu burgers, wood-fired Neapolitan pizzas, and vibrant fusion bowls. Powered by an installable PWA with role-based access for Customers, Kitchen Staff, Couriers, and Admins.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu-section"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3.5 px-7 rounded-2xl shadow-xl shadow-orange-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
              >
                <span>Browse Menu & Order</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#dashboard-view"
                className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold py-3.5 px-6 rounded-2xl border border-slate-700/80 hover:border-orange-500/40 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <ChefHat className="w-4 h-4 text-amber-400" />
                <span>Live Role Portals</span>
              </a>
            </div>

            {/* Feature bullets */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Installable PWA</p>
                  <p className="text-[11px] text-slate-400">Offline & Fast</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">4-Role RBAC</p>
                  <p className="text-[11px] text-slate-400">Staff, Driver, Admin</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">4.9 / 5.0 Rating</p>
                  <p className="text-[11px] text-slate-400">Over 1,200 reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main hero image container */}
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-orange-500/20 shadow-2xl shadow-orange-950/40">
                <Image
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
                  alt="Artisan Wagyu Burger Feast"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Floating badge 1: Kitchen Speed */}
                <div className="absolute top-6 left-6 glass-panel rounded-2xl p-3 border border-white/10 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                    <Flame className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">
                      Kitchen Expediter
                    </p>
                    <p className="text-xs font-black text-white">
                      12-14 Min Hot Prep
                    </p>
                  </div>
                </div>

                {/* Floating badge 2: Active Dispatch */}
                <div className="absolute bottom-6 right-6 glass-panel rounded-2xl p-3.5 border border-white/10 shadow-xl max-w-[220px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Bike className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">
                      Courier In Transit
                    </span>
                  </div>
                  <p className="text-xs font-medium text-white truncate">
                    742 Evergreen Terrace
                  </p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-3/4 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
