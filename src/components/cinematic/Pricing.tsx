"use client";

import React from "react";
import { Check, Sparkles, Crown, Zap } from "lucide-react";

export default function CinematicPricing() {
  const tiers = [
    {
      name: "Rush Essential",
      description: "For spontaneous evening cravings and single gourmet drops.",
      price: "$0",
      period: "/month",
      badge: "ON-DEMAND",
      isPopular: false,
      features: [
        "Full access to artisan menu catalog",
        "Sub-20 minute dispatch priority",
        "Standard thermal packaging",
        "1-click reorder routine",
      ],
      ctaText: "Order Now",
      ctaHref: "#menu-section",
    },
    {
      name: "Luxe Culinary Pass",
      description: "The complete white-glove dining subscription for discerning epicures.",
      price: "$29",
      period: "/month",
      badge: "MOST POPULAR",
      isPopular: true,
      features: [
        "Guaranteed sub-14 minute lightning transit",
        "Zero delivery fees on all orders",
        "Priority reservation of limited daily specials",
        "Complimentary seasonal pastry pairing monthly",
        "Dedicated VIP expediter support line",
      ],
      ctaText: "Claim Luxe Membership",
      ctaHref: "#menu-section",
    },
    {
      name: "Atelier Private Club",
      description: "Bespoke culinary concierge with custom chef off-menu creations.",
      price: "$99",
      period: "/month",
      badge: "BY INVITATION",
      isPopular: false,
      features: [
        "Unrestricted access to private off-menu cellar cuts",
        "Sub-10 minute dedicated courier escort",
        "Heated bespoke titanium case deliveries",
        "Monthly private tasting menu box",
        "Direct chat with executive chef",
      ],
      ctaText: "Request Access",
      ctaHref: "#menu-section",
    },
  ];

  return (
    <section id="membership" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5]/5 border border-[#C9A84C]/30 text-[#C9A84C] font-data text-xs mb-3">
          <Crown className="w-3.5 h-3.5" />
          <span>ELEVATED PATRONAGE</span>
        </div>
        <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#FAF8F5]">
          Membership & <span className="font-drama font-normal italic text-[#C9A84C]">Culinary Tiers</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Select your level of speed, exclusivity, and personalized gastronomy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {tiers.map((tier) => {
          return (
            <div
              key={tier.name}
              className={`rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? "bg-gradient-to-b from-[#181824] to-[#0D0D12] border-2 border-[#C9A84C] shadow-2xl shadow-[#C9A84C]/20 lg:-translate-y-4 ring-4 ring-[#C9A84C]/10"
                  : "bg-[#11111A] border border-white/10 hover:border-[#C9A84C]/30"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#0D0D12] text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="font-heading font-bold text-xl text-[#FAF8F5]">
                    {tier.name}
                  </span>
                  {!tier.isPopular && (
                    <span className="font-data text-[10px] text-[#C9A84C] px-2 py-0.5 rounded-full border border-[#C9A84C]/30">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-drama text-5xl sm:text-6xl text-[#FAF8F5]">
                    {tier.price}
                  </span>
                  <span className="font-data text-xs text-slate-400">
                    {tier.period}
                  </span>
                </div>

                {/* Feature list */}
                <div className="mt-8 space-y-3.5">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action button */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <a
                  href={tier.ctaHref}
                  className={`btn-magnetic w-full py-3.5 text-xs font-bold uppercase tracking-wider text-center ${
                    tier.isPopular
                      ? "bg-[#C9A84C] text-[#0D0D12] shadow-xl shadow-[#C9A84C]/25"
                      : "bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/10"
                  }`}
                >
                  <span className="sliding-layer bg-[#E0C878]" />
                  <span>{tier.ctaText}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
