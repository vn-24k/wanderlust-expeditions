import React, { useState } from "react";
import { HeroWanderlust } from "./components/HeroWanderlust";
import { MagneticMarqueeStrip } from "./components/MagneticMarqueeStrip";
import { WobbleSpiralSection } from "./components/WobbleSpiralSection";
import { StarfieldWarpCanvas } from "./components/StarfieldWarpCanvas";
import { AsciiTopographyRadar } from "./components/AsciiTopographyRadar";
import { CylinderExpeditionGallery } from "./components/CylinderExpeditionGallery";
import { ExpeditionDialTelemetry } from "./components/ExpeditionDialTelemetry";
import { SpotlightFrameAccordions } from "./components/SpotlightFrameAccordions";
import { ExpeditionPassCubes } from "./components/ExpeditionPassCubes";
import { CockpitDrawer } from "./components/CockpitDrawer";
import { FooterWanderlust } from "./components/FooterWanderlust";
import confetti from "canvas-confetti";
import { SlidersHorizontal, CheckCircle2, X } from "lucide-react";

export function App() {
  const [isCockpitOpen, setIsCockpitOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleBookingCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4eedb8", "#7cf5ff", "#ffffff", "#f59e0b"]
    });
    setNotification("Plano de Voo Registrado com Sucesso! Telemetria Atribuída.");
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050d12] text-white selection:bg-[#4eedb8]/20 selection:text-[#4eedb8]">
      {/* 1. Hero 1:1 Reference Replication */}
      <section id="hero">
        <HeroWanderlust
          onOpenCockpit={() => setIsCockpitOpen(true)}
          onExploreClick={() => {
            scrollToSection("vortex");
            handleBookingCelebration();
          }}
        />
      </section>

      {/* 2. Magnetic Marquee Telemetry Strip (magnetic-marquee) */}
      <MagneticMarqueeStrip />

      {/* 3. 3D Helical Vortex Gallery (wobble-scroll GLSL) */}
      <section id="vortex">
        <WobbleSpiralSection />
      </section>

      {/* 4. Atmospheric Starfield Warp Engine (Starfield-Scroll-Animation) */}
      <section id="starfield">
        <StarfieldWarpCanvas />
      </section>

      {/* 5. Interactive ASCII Topography Radar (Interactive-ASCII / ascii-reveal) */}
      <section id="topography">
        <AsciiTopographyRadar />
      </section>

      {/* 6. Sliced 3D Cylindrical Gallery (cylinder-gallery / canvas-gallery) */}
      <section id="commanders">
        <CylinderExpeditionGallery />
      </section>

      {/* 7. Mineral Dial & Barometric Telemetry (mineral-dial) */}
      <section id="dial">
        <ExpeditionDialTelemetry />
      </section>

      {/* 8. Spotlight Frame Accordions (accordions-frames) */}
      <section id="itineraries">
        <SpotlightFrameAccordions />
      </section>

      {/* 9. 3D Perspective Card Cubes (3D-CARDS) */}
      <section id="passes">
        <ExpeditionPassCubes />
      </section>

      {/* 10. Footer */}
      <FooterWanderlust />

      {/* Retractable Engineering Drawer (22 strictly scoped Uiverse components) */}
      <CockpitDrawer
        isOpen={isCockpitOpen}
        onClose={() => setIsCockpitOpen(false)}
      />

      {/* Floating Cockpit Trigger Button (Quick access to 22 Uiverse instruments) */}
      <button
        onClick={() => setIsCockpitOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-[#091822]/90 hover:bg-[#0c202d] text-[#4eedb8] border border-[#4eedb8]/40 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 font-mono-tech text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 group"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#4eedb8] animate-ping" />
        <SlidersHorizontal className="w-4 h-4 text-[#4eedb8]" />
        <span className="hidden sm:inline font-bold">Painel de Bordo (22)</span>
      </button>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl glass-panel border border-[#4eedb8]/50 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-[#4eedb8] shrink-0" />
          <span className="text-xs font-mono-tech">{notification}</span>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
