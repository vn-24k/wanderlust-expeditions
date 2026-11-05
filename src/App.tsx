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
import { FooterWanderlust } from "./components/FooterWanderlust";
import confetti from "canvas-confetti";
import { CheckCircle2, X } from "lucide-react";

export function App() {
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
