"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import {
  Flame,
  ShoppingBag,
  User,
  LogOut,
  Shield,
  ChefHat,
  Bike,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

export default function Navbar() {
  const { data: session } = useSession();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = session?.user?.role || "CUSTOMER";

  const getRoleIcon = () => {
    switch (role) {
      case "STAFF":
        return <ChefHat className="w-3.5 h-3.5 text-amber-400" />;
      case "DRIVER":
        return <Bike className="w-3.5 h-3.5 text-emerald-400" />;
      case "ADMIN":
        return <Shield className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <User className="w-3.5 h-3.5 text-orange-400" />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 fill-white text-transparent" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  Taste<span className="text-orange-500">Wave</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  Gourmet Kitchen & Delivery
                </span>
              </div>
            </Link>

            {/* Nav links desktop */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#menu-section" className="hover:text-orange-400 transition-colors">
                Artisan Menu
              </a>
              <a href="#features-section" className="hover:text-orange-400 transition-colors">
                Why TasteWave
              </a>
              <a href="#dashboard-view" className="hover:text-orange-400 transition-colors">
                Live Operations
              </a>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart Drawer Toggle */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white transition-all cursor-pointer"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-orange-400" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-in zoom-in-50">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* User Session / Auth Trigger */}
              {session?.user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                      {getRoleIcon()}
                      <span>{session.user.name?.split(" ")[0] || "User"}</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 uppercase">
                      {role}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/80 transition-colors cursor-pointer"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-600/25 transition-all cursor-pointer"
                >
                  Sign In / Roles
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#menu-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 font-medium py-1"
            >
              Artisan Menu
            </a>
            <a
              href="#features-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 font-medium py-1"
            >
              Why TasteWave
            </a>
            <a
              href="#dashboard-view"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 font-medium py-1"
            >
              Live Operations
            </a>
            {!session && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="w-full mt-2 bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-xs"
              >
                Sign In or Switch Roles
              </button>
            )}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
