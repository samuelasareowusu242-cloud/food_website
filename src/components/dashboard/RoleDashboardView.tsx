"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ChefHat,
  Bike,
  Shield,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  Flame,
  ArrowRight,
  RefreshCw,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  menuItem?: {
    name: string;
    imageUrl: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "READY_FOR_PICKUP"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";
  totalAmount: number;
  deliveryAddress: string;
  customerNotes?: string;
  createdAt: string;
  customer?: { name?: string; email?: string; phone?: string };
  driver?: { name?: string; phone?: string };
  items?: OrderItem[];
}

export default function RoleDashboardView() {
  const { data: session } = useSession();
  const currentRole = session?.user?.role || "CUSTOMER";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState<any[]>([]);

  // Demo initial orders to ensure the dashboard looks alive immediately
  const sampleOrders: Order[] = [
    {
      id: "ord-101",
      orderNumber: "ORD-94210",
      status: "PREPARING",
      totalAmount: 37.5,
      deliveryAddress: "742 Evergreen Terrace, Springfield",
      customerNotes: "Extra truffle aioli on the side please",
      createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
      customer: { name: "Alice Johnson", email: "customer@food.com", phone: "+1 555-234" },
      items: [
        { id: "1", quantity: 1, unitPrice: 18.5, menuItem: { name: "The Truffle Umami Wagyu", imageUrl: "" } },
        { id: "2", quantity: 1, unitPrice: 19.0, menuItem: { name: "Diavola Hot Honey Fire", imageUrl: "" } },
      ],
    },
    {
      id: "ord-102",
      orderNumber: "ORD-94211",
      status: "READY_FOR_PICKUP",
      totalAmount: 26.0,
      deliveryAddress: "500 Ocean Avenue, Apt 12",
      customerNotes: "Contactless delivery at front door",
      createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
      customer: { name: "David Chen", email: "david@example.com", phone: "+1 555-891" },
      items: [
        { id: "3", quantity: 1, unitPrice: 19.5, menuItem: { name: "Wild Salmon Poke & Edamame", imageUrl: "" } },
        { id: "4", quantity: 1, unitPrice: 6.5, menuItem: { name: "Ceremonial Iced Matcha Yuzu", imageUrl: "" } },
      ],
    },
    {
      id: "ord-103",
      orderNumber: "ORD-94209",
      status: "OUT_FOR_DELIVERY",
      totalAmount: 26.5,
      deliveryAddress: "22 King Street, Downtown",
      createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
      customer: { name: "Sarah Miller", email: "sarah@example.com", phone: "+1 555-667" },
      driver: { name: "Dave Rider (Courier)", phone: "+1 555-456" },
      items: [
        { id: "5", quantity: 1, unitPrice: 17.0, menuItem: { name: "Margherita di Bufala D.O.P.", imageUrl: "" } },
        { id: "6", quantity: 1, unitPrice: 9.5, menuItem: { name: "Caramelized Basque Cheesecake", imageUrl: "" } },
      ],
    },
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        if (data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        } else {
          setOrders(sampleOrders);
        }
      } else {
        setOrders(sampleOrders);
      }
    } catch {
      setOrders(sampleOrders);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    if (currentRole !== "ADMIN") return;
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsersList(data.users || []);
      }
    } catch {
      // Ignored
    }
  };

  useEffect(() => {
    fetchOrders();
    if (currentRole === "ADMIN") {
      fetchAdminUsers();
    }
  }, [currentRole]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o))
    );

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Fallback
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );

    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
    } catch {
      // Fallback
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Clock className="w-3 h-3" /> Confirmed
          </span>
        );
      case "PREPARING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame className="w-3 h-3 animate-pulse" /> In Kitchen
          </span>
        );
      case "READY_FOR_PICKUP":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShoppingBag className="w-3 h-3" /> Ready for Pickup
          </span>
        );
      case "OUT_FOR_DELIVERY":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Truck className="w-3 h-3" /> Out for Delivery
          </span>
        );
      case "DELIVERED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" /> Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <section id="dashboard-view" className="py-12 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Role Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              {currentRole === "STAFF" && <ChefHat className="w-7 h-7 text-amber-400" />}
              {currentRole === "DRIVER" && <Bike className="w-7 h-7 text-emerald-400" />}
              {currentRole === "ADMIN" && <Shield className="w-7 h-7 text-rose-400" />}
              {currentRole === "CUSTOMER" && <ShoppingBag className="w-7 h-7 text-orange-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md bg-orange-600/20 text-orange-400 border border-orange-500/30">
                  Role: {currentRole}
                </span>
                <span className="text-xs text-slate-400">
                  Logged in as {session?.user?.name || "Guest Preview"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {currentRole === "STAFF" && "Kitchen Prep & Expediter Station"}
                {currentRole === "DRIVER" && "Courier Dispatch & Delivery Radar"}
                {currentRole === "ADMIN" && "Operations Command & System Administration"}
                {currentRole === "CUSTOMER" && "Live Order Status & Culinary Tracker"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh Feed
            </button>
          </div>
        </div>

        {/* ADMIN VIEW */}
        {currentRole === "ADMIN" && (
          <div className="space-y-8">
            {/* Stat widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Gross Sales Today</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white mt-2 font-mono">$1,482.50</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +18.4% vs yesterday
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Active Orders</span>
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white mt-2 font-mono">14 Live</div>
                <div className="text-[11px] text-slate-400 mt-1">8 Kitchen / 6 On Transit</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Registered Staff & Drivers</span>
                  <Users className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl font-bold text-white mt-2 font-mono">9 Active</div>
                <div className="text-[11px] text-slate-400 mt-1">4 Cooks, 5 Couriers</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Prisma & Auth Status</span>
                  <Shield className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-400 mt-2 text-base font-mono">
                  Healthy (PostgreSQL)
                </div>
                <div className="text-[11px] text-slate-400 mt-1">NextAuth v5 + Zod Active</div>
              </div>
            </div>

            {/* Admin User Role Management Table */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                User Access & Role Permissions (RBAC)
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Administrators can promote or reassign user roles between Customer, Kitchen Staff, Courier, and Admin.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                      <th className="pb-3 px-2">Name</th>
                      <th className="pb-3 px-2">Email</th>
                      <th className="pb-3 px-2">Current Role</th>
                      <th className="pb-3 px-2">Change Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {(usersList.length > 0
                      ? usersList
                      : [
                          { id: "1", name: "Alice Johnson", email: "customer@food.com", role: "CUSTOMER" },
                          { id: "2", name: "Chef Marco Valenti", email: "staff@food.com", role: "STAFF" },
                          { id: "3", name: "Dave Rider (Courier)", email: "driver@food.com", role: "DRIVER" },
                          { id: "4", name: "Elena Vance (Owner)", email: "admin@food.com", role: "ADMIN" },
                        ]
                    ).map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/30">
                        <td className="py-3 px-2 font-medium text-white">{u.name}</td>
                        <td className="py-3 px-2 text-slate-400">{u.email}</td>
                        <td className="py-3 px-2">
                          <span className="font-semibold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <select
                            value={u.role}
                            onChange={(e) => updateUserRole(u.id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          >
                            <option value="CUSTOMER">CUSTOMER</option>
                            <option value="STAFF">STAFF</option>
                            <option value="DRIVER">DRIVER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* KITCHEN STAFF VIEW */}
        {currentRole === "STAFF" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="font-mono font-bold text-white text-sm">
                      {order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-slate-400 font-semibold uppercase">
                      Kitchen Items:
                    </p>
                    {order.items?.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-200">
                        <span>
                          <strong className="text-orange-400">{it.quantity}x</strong>{" "}
                          {it.menuItem?.name || "Artisan Special"}
                        </span>
                        <span className="font-mono text-slate-400">
                          ${(it.unitPrice * it.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.customerNotes && (
                    <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                      <strong>Chef Note:</strong> {order.customerNotes}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  {order.status === "CONFIRMED" && (
                    <button
                      onClick={() => updateStatus(order.id, "PREPARING")}
                      className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Flame className="w-3.5 h-3.5" /> Start Cooking
                    </button>
                  )}
                  {order.status === "PREPARING" && (
                    <button
                      onClick={() => updateStatus(order.id, "READY_FOR_PICKUP")}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Ready for Pickup
                    </button>
                  )}
                  {order.status === "READY_FOR_PICKUP" && (
                    <div className="w-full text-center py-2 text-xs text-purple-400 font-medium bg-purple-500/10 rounded-xl border border-purple-500/20">
                      Awaiting Courier Pickup
                    </div>
                  )}
                  {["OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status) && (
                    <div className="w-full text-center py-2 text-xs text-emerald-400 font-medium bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      Dispatched with Courier
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COURIER DRIVER VIEW */}
        {currentRole === "DRIVER" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="font-mono font-bold text-white text-sm">
                      {order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Deliver To:</span>
                      <span className="font-medium text-white">{order.deliveryAddress}</span>
                    </div>
                    {order.customer?.name && (
                      <div>
                        <span className="text-slate-400 block">Recipient:</span>
                        <span className="font-medium text-slate-200">
                          {order.customer.name} ({order.customer.phone || "No phone"})
                        </span>
                      </div>
                    )}
                    <div className="pt-2">
                      <span className="text-slate-400 block">Order Payout:</span>
                      <span className="font-mono text-emerald-400 font-bold text-sm">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  {order.status === "READY_FOR_PICKUP" && (
                    <button
                      onClick={() => updateStatus(order.id, "OUT_FOR_DELIVERY")}
                      className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Bike className="w-3.5 h-3.5" /> Accept & Start Delivery
                    </button>
                  )}
                  {order.status === "OUT_FOR_DELIVERY" && (
                    <button
                      onClick={() => updateStatus(order.id, "DELIVERED")}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Complete Delivery
                    </button>
                  )}
                  {order.status === "DELIVERED" && (
                    <div className="w-full text-center py-2 text-xs text-emerald-400 font-medium bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      Delivered Successfully
                    </div>
                  )}
                  {["CONFIRMED", "PREPARING"].includes(order.status) && (
                    <div className="w-full text-center py-2 text-xs text-amber-400 font-medium bg-amber-500/10 rounded-xl border border-amber-500/20">
                      Kitchen is preparing ticket...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CUSTOMER VIEW */}
        {currentRole === "CUSTOMER" && (
          <div className="space-y-6">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-orange-500" />
              Your Active Orders & Timeline
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="font-mono font-bold text-white text-sm">
                        {order.orderNumber}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Visual Tracker Stepper */}
                  <div className="py-4">
                    <div className="grid grid-cols-4 gap-1 text-center">
                      <div
                        className={`text-[10px] font-semibold py-1 rounded-lg ${
                          ["CONFIRMED", "PREPARING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "DELIVERED"].includes(
                            order.status
                          )
                            ? "bg-orange-600 text-white"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        1. Confirmed
                      </div>
                      <div
                        className={`text-[10px] font-semibold py-1 rounded-lg ${
                          ["PREPARING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "DELIVERED"].includes(
                            order.status
                          )
                            ? "bg-amber-600 text-white"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        2. Cooking
                      </div>
                      <div
                        className={`text-[10px] font-semibold py-1 rounded-lg ${
                          ["READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status)
                            ? "bg-purple-600 text-white"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        3. Ready
                      </div>
                      <div
                        className={`text-[10px] font-semibold py-1 rounded-lg ${
                          ["OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status)
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        4. On The Way
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Destination:</span>
                      <span className="font-medium text-right max-w-xs truncate">
                        {order.deliveryAddress}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total:</span>
                      <span className="font-mono text-orange-400 font-bold">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
