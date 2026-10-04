"use client";

import React from "react";
import {
  Users,
  ChefHat,
  Bike,
  Shield,
  Smartphone,
  Database,
  Zap,
  CheckCircle,
} from "lucide-react";

export default function FeaturesSection() {
  const roles = [
    {
      title: "Customer Portal",
      role: "CUSTOMER",
      icon: Users,
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/25",
      description:
        "Seamlessly browse artisan items, filter by allergies and preferences, place custom kitchen orders, and track preparation status in real-time.",
      perks: ["Instant Cart & Checkout", "Custom Chef Notes", "Live Order Stepper Tracker"],
    },
    {
      title: "Kitchen Station",
      role: "STAFF",
      icon: ChefHat,
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/25",
      description:
        "Dedicated ticket interface for cooks and expediter. Change status from Confirmed to In Kitchen, track prep times, and alert couriers when orders are ready.",
      perks: ["Live Ticket Feed", "One-Touch Status Toggle", "Kitchen Notes Visibility"],
    },
    {
      title: "Courier Dispatch",
      role: "DRIVER",
      icon: Bike,
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
      description:
        "Optimized mobile-friendly view for couriers. Accept ready-for-pickup packages, view delivery addresses and contact information, and mark orders delivered.",
      perks: ["Ready-Orders Radar", "Address & Phone Access", "Single-Tap Delivery Complete"],
    },
    {
      title: "Command Admin",
      role: "ADMIN",
      icon: Shield,
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/25",
      description:
        "Complete platform governance. Real-time sales analytics, role modification for all users, menu catalog management, and PostgreSQL database oversight.",
      perks: ["Live User Role Assignment", "Sales & Throughput Metrics", "Full System Authority"],
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/25 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            End-To-End Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Role-Based Access for Every Link in the Chain
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            TasteWave connects the entire restaurant ecosystem into an installable PWA powered by NextAuth v5 role management and Prisma ORM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-white">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <span
                      className={`text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full border uppercase ${item.badgeColor}`}
                    >
                      {item.role}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  {item.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
