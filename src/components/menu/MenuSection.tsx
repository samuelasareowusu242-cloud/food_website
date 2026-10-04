"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  type MenuItemData,
} from "@/lib/mockMenuData";
import {
  Search,
  Plus,
  Flame,
  Clock,
  Sparkles,
  UtensilsCrossed,
  Salad,
  Coffee,
  Check,
} from "lucide-react";

export default function MenuSection() {
  const { cart, addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="w-4 h-4" />;
      case "UtensilsCrossed":
        return <UtensilsCrossed className="w-4 h-4" />;
      case "Salad":
        return <Salad className="w-4 h-4" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "Coffee":
        return <Coffee className="w-4 h-4" />;
      default:
        return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  const filteredItems = INITIAL_MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ||
      INITIAL_CATEGORIES.find((c) => c.slug === activeCategory)?.id ===
        item.categoryId;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAdd = (item: MenuItemData) => {
    addToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  return (
    <section id="menu-section" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Crafted Fresh Daily
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              The Artisan <span className="text-orange-500">Kitchen</span> Catalog
            </h2>
            <p className="mt-3 text-base text-slate-400 max-w-xl">
              From slow-fermented wood-fired sourdough pizzas to A5 Wagyu truffle burgers, explore culinary excellence prepared on-demand.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, pizzas, bowls..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              activeCategory === "all"
                ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-600/30"
                : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            <span>All Specialties</span>
            <span className="text-[11px] opacity-75">
              ({INITIAL_MENU_ITEMS.length})
            </span>
          </button>
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                activeCategory === cat.slug
                  ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-600/30"
                  : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
            <UtensilsCrossed className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold text-lg">No dishes found</p>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
              Try adjusting your search criteria or explore another gourmet category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const inCartItem = cart.find((c) => c.item.id === item.id);
              const isAdded = recentlyAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="group bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-orange-950/20 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.isFeatured && (
                        <span className="bg-orange-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                          Chef Choice
                        </span>
                      )}
                      <span className="bg-slate-950/70 backdrop-blur-sm text-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                        {item.categoryName}
                      </span>
                    </div>

                    {/* Prep time */}
                    <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[11px] font-medium px-2 py-1 rounded-xl flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span>{item.preparationTime}m prep</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                          Price
                        </span>
                        <span className="font-mono text-xl font-black text-white">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : inCartItem
                            ? "bg-orange-600/20 text-orange-400 border border-orange-500/40 hover:bg-orange-600 hover:text-white"
                            : "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : inCartItem ? (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{inCartItem.quantity} in Bag</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
