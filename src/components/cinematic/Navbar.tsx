"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Sparkles, User, LogOut } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

export default function CinematicNavbar() {
  const { data: session } = useSession();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header
          className={`pointer-events-auto transition-all duration-500 rounded-full px-5 sm:px-7 py-3 flex items-center gap-6 sm:gap-10 border ${
            isScrolled
              ? "bg-[#FAF8F5]/85 text-[#0D0D12] border-[#C9A84C]/30 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "bg-[#0D0D12]/40 text-[#FAF8F5] border-white/10 backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group interactive-lift">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9A84C] group-hover:scale-125 transition-transform shadow-[0_0_8px_#C9A84C]" />
            <span className="font-heading font-black tracking-tighter text-base sm:text-lg">
              CHOP<span className="text-[#C9A84C]">RUSH</span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest">
            <a
              href="#protocol"
              className={`interactive-lift transition-colors ${
                isScrolled ? "text-[#2A2A35] hover:text-[#C9A84C]" : "text-slate-300 hover:text-[#C9A84C]"
              }`}
            >
              Protocol
            </a>
            <a
              href="#features"
              className={`interactive-lift transition-colors ${
                isScrolled ? "text-[#2A2A35] hover:text-[#C9A84C]" : "text-slate-300 hover:text-[#C9A84C]"
              }`}
            >
              Features
            </a>
            <a
              href="#manifesto"
              className={`interactive-lift transition-colors ${
                isScrolled ? "text-[#2A2A35] hover:text-[#C9A84C]" : "text-slate-300 hover:text-[#C9A84C]"
              }`}
            >
              Manifesto
            </a>
            <a
              href="#membership"
              className={`interactive-lift transition-colors ${
                isScrolled ? "text-[#2A2A35] hover:text-[#C9A84C]" : "text-slate-300 hover:text-[#C9A84C]"
              }`}
            >
              Membership
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition-all interactive-lift ${
                isScrolled
                  ? "bg-[#0D0D12]/5 text-[#0D0D12] hover:bg-[#0D0D12]/10"
                  : "bg-white/10 text-[#FAF8F5] hover:bg-white/20"
              }`}
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#C9A84C]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A84C] text-[#0D0D12] text-[10px] font-black flex items-center justify-center shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Session / Role button */}
            {session?.user ? (
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold font-data px-2 py-0.5 rounded-full border ${
                    isScrolled
                      ? "border-[#0D0D12]/20 text-[#0D0D12]"
                      : "border-[#C9A84C]/40 text-[#C9A84C]"
                  }`}
                >
                  {session.user.role || "MEMBER"}
                </span>
                <button
                  onClick={() => signOut()}
                  className="p-1.5 rounded-full hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold opacity-80 hover:opacity-100 transition-opacity interactive-lift"
              >
                <User className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Portal</span>
              </button>
            )}

            {/* Primary CTA */}
            <a
              href="#menu-section"
              className="btn-magnetic px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#0D0D12] bg-[#C9A84C] shadow-lg shadow-[#C9A84C]/25"
            >
              <span className="sliding-layer bg-[#E0C878]" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#0D0D12]" />
                <span>Order Now</span>
              </span>
            </a>
          </div>
        </header>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
