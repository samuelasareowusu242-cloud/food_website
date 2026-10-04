"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { X, Lock, Mail, User, Shield, ChefHat, Bike, KeyRound, Sparkles } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "register";
}

export default function AuthModal({ isOpen, onClose, defaultMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "register">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleSignIn = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const targetEmail = customEmail || email;
    const targetPassword = customPass || password;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: targetEmail,
        password: targetPassword,
      });

      if (result?.error) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setSuccessMessage("Signed in successfully!");
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 600);
      }
    } catch (err) {
      setErrorMessage("An unexpected authentication error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Registration failed");
      } else {
        setSuccessMessage("Account created! Signing you in...");
        await handleSignIn(undefined, email, password);
      }
    } catch {
      setErrorMessage("Network error during registration.");
    } finally {
      setLoading(false);
    }
  };

  const quickLoginAs = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    handleSignIn(undefined, demoEmail, "password123");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-orange-950/30 text-slate-100 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              {mode === "signin" ? "Sign In to TasteWave" : "Join TasteWave"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              NextAuth Role-Based Access Control
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Role Logins */}
        <div className="mt-4 p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            Quick Test Roles (1-Click Switch)
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => quickLoginAs("customer@food.com")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-lg border border-slate-700/60 hover:border-orange-500/40 transition-colors cursor-pointer text-left"
            >
              <User className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">Customer</span>
            </button>
            <button
              type="button"
              onClick={() => quickLoginAs("staff@food.com")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-lg border border-slate-700/60 hover:border-amber-500/40 transition-colors cursor-pointer text-left"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Kitchen Staff</span>
            </button>
            <button
              type="button"
              onClick={() => quickLoginAs("driver@food.com")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-lg border border-slate-700/60 hover:border-emerald-500/40 transition-colors cursor-pointer text-left"
            >
              <Bike className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Courier Driver</span>
            </button>
            <button
              type="button"
              onClick={() => quickLoginAs("admin@food.com")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-lg border border-slate-700/60 hover:border-rose-500/40 transition-colors cursor-pointer text-left"
            >
              <Shield className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">Administrator</span>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl mt-4 border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === "signin"
                ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === "register"
                ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-xl">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl">
            {successMessage}
          </div>
        )}

        {/* Forms */}
        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="mt-4 space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-orange-600/30 transition-all cursor-pointer disabled:opacity-50 text-sm"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (min 6 chars)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="CUSTOMER">Customer (Order & Dine)</option>
                <option value="STAFF">Staff (Kitchen Ticket Manager)</option>
                <option value="DRIVER">Driver (Courier Dispatch)</option>
                <option value="ADMIN">Admin (Full Control)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-orange-600/30 transition-all cursor-pointer disabled:opacity-50 text-sm"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
