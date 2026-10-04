import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TasteWave - Gourmet Kitchen & Delivery",
    short_name: "TasteWave",
    description:
      "Order artisan culinary dishes, track kitchen preparation, and manage role-based deliveries in real time.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#ea580c",
    orientation: "portrait",
    categories: ["food", "shopping", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
