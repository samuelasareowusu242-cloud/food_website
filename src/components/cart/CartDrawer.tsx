"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
  } = useCart();

  const [deliveryAddress, setDeliveryAddress] = useState(
    "124 Market Street, Apt 4B"
  );
  const [customerNotes, setCustomerNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isCartOpen) return null;

  const deliveryFee = cart.length > 0 ? 3.99 : 0;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const grandTotal = Number((subtotal + deliveryFee + tax).toFixed(2));

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!deliveryAddress.trim() || deliveryAddress.length < 5) {
      setErrorMessage("Please provide a valid delivery address (min 5 characters).");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        items: cart.map((c) => ({
          menuItemId: c.item.id,
          quantity: c.quantity,
        })),
        deliveryAddress,
        customerNotes: customerNotes || undefined,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Failed to place order.");
      } else {
        setOrderSuccess(data.order);
        clearCart();
      }
    } catch {
      setErrorMessage("Network error during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your Order</h3>
                <p className="text-xs text-slate-400">
                  {cart.length} {cart.length === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Order Confirmed!</h4>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  Your kitchen ticket has been dispatched. Order Number:
                </p>
                <div className="inline-block bg-slate-950 border border-orange-500/40 text-orange-400 font-mono font-bold px-4 py-2 rounded-xl text-lg">
                  {orderSuccess.orderNumber || "ORD-LIVE"}
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      setIsCartOpen(false);
                      window.location.reload();
                    }}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer text-sm"
                  >
                    View Status in Dashboard
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-slate-300 font-medium">Your cart is empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our gourmet chef specials and artisan creations to build your feast.
                </p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {cart.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center gap-3"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-semibold text-white truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs text-orange-400 font-mono font-medium">
                          ${(item.price * quantity).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-1 text-slate-200">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-red-400 p-2 cursor-pointer transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Delivery details */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Street, suite, postal code..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Kitchen Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="e.g. Extra sauce, ring bell twice"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-2.5 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-xl">
                    {errorMessage}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer calculation */}
          {cart.length > 0 && !orderSuccess && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/40 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-slate-200 font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Courier Delivery Fee</span>
                  <span className="text-slate-200 font-mono">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Grand Total</span>
                  <span className="text-orange-400 font-mono text-base">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 text-sm"
              >
                {loading ? (
                  "Processing Order..."
                ) : (
                  <>
                    <span>Confirm & Dispatch Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
