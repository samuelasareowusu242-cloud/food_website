"use client";

import React from "react";
import { Sparkles, Shield, ArrowUpRight } from "lucide-react";

export default function CinematicFooter() {
  return (
    <footer className="w-full bg-[#08080C] text-[#FAF8F5] rounded-t-[3.5rem] sm:rounded-t-[4rem] border-t border-[#C9A84C]/25 pt-20 pb-12 px-6 sm:px-12 lg:px-20 mt-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-[#C9A84C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C9A84C] shadow-[0_0_10px_#C9A84C]" />
              <span className="font-heading font-black text-2xl tracking-tighter text-[#FAF8F5]">
                CHOP<span className="text-[#C9A84C]">RUSH</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-light">
              Fast, fresh meals delivered straight to your door. Operating high-velocity culinary dark kitchens powered by real-time telemetry and bespoke thermal encapsulation.
            </p>

            {/* System Operational Status Indicator */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#161622] border border-white/10 font-data text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-slate-300 font-semibold tracking-wide">
                  SYSTEM OPERATIONAL // SUB-15M RADAR
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div className="space-y-3">
              <h4 className="font-data font-bold text-[#C9A84C] uppercase tracking-wider">
                Gastronomy
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#menu-section" className="hover:text-white transition-colors">Artisan Wagyu</a></li>
                <li><a href="#menu-section" className="hover:text-white transition-colors">Neapolitan Hearth</a></li>
                <li><a href="#menu-section" className="hover:text-white transition-colors">Raw Poke & Bowls</a></li>
                <li><a href="#menu-section" className="hover:text-white transition-colors">Pastry & Sweets</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-data font-bold text-[#C9A84C] uppercase tracking-wider">
                Instruments
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Diagnostic Shuffler</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Live Telemetry Feed</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Protocol Scheduler</a></li>
                <li><a href="#protocol" className="hover:text-white transition-colors">Thermal Encapsulation</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-data font-bold text-[#C9A84C] uppercase tracking-wider">
                Ecosystem
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#dashboard-view" className="hover:text-white transition-colors">Kitchen Expediter</a></li>
                <li><a href="#dashboard-view" className="hover:text-white transition-colors">Courier Dispatch</a></li>
                <li><a href="#dashboard-view" className="hover:text-white transition-colors">Operations Command</a></li>
                <li><a href="#membership" className="hover:text-white transition-colors">Luxe Membership</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-data">
          <p>© {new Date().getFullYear()} ChopRush Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Dispatch</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
