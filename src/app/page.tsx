import CinematicNavbar from "@/components/cinematic/Navbar";
import CinematicHero from "@/components/cinematic/Hero";
import CinematicFeatures from "@/components/cinematic/Features";
import CinematicPhilosophy from "@/components/cinematic/Philosophy";
import CinematicProtocol from "@/components/cinematic/Protocol";
import MenuSection from "@/components/menu/MenuSection";
import CinematicPricing from "@/components/cinematic/Pricing";
import RoleDashboardView from "@/components/dashboard/RoleDashboardView";
import CartDrawer from "@/components/cart/CartDrawer";
import CinematicFooter from "@/components/cinematic/Footer";
import PwaManager from "@/components/pwa/PwaManager";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D12] text-[#FAF8F5]">
      {/* PWA Lifecycle Manager */}
      <PwaManager />

      {/* Floating Island Navbar */}
      <CinematicNavbar />

      {/* Main Experience */}
      <main className="flex-1 w-full overflow-hidden">
        {/* The Opening Shot Hero */}
        <CinematicHero />

        {/* The Interactive Functional Artifacts (Features) */}
        <CinematicFeatures />

        {/* The Manifesto Philosophy */}
        <CinematicPhilosophy />

        {/* The Sticky Stacking Archive Protocol */}
        <CinematicProtocol />

        {/* Interactive Culinary Menu Catalog */}
        <MenuSection />

        {/* Membership & Pricing Tiers */}
        <CinematicPricing />

        {/* Live RBAC Role Operations Simulator */}
        <RoleDashboardView />
      </main>

      {/* Interactive Cart Slide-over */}
      <CartDrawer />

      {/* Cinematic Deep Dark Footer */}
      <CinematicFooter />
    </div>
  );
}
