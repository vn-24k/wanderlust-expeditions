import React, { useEffect, useRef, useState } from "react";
import { Zap, Moon, Orbit, Compass } from "lucide-react";

export const StarfieldWarpCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHyperdrive, setIsHyperdrive] = useState(false);
  const [velocityVal, setVelocityVal] = useState("Mach 4.2");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const settings = {
      starCount: 800,
      palette: ["#7CF5FF", "#8CE0FF", "#9D7CFF", "#4eedb8", "#FF7CE8", "#5ce5b4"],
      paletteWeights: [0.35, 0.25, 0.15, 0.15, 0.05, 0.05],
      holeRadius: 40,
      reachScale: 1.25,
      minStreakLength: 20,
      maxStreakLength: isHyperdrive ? 480 : 160,
      minStreakWidth: 2.0,
      maxStreakWidth: isHyperdrive ? 4.5 : 3.0,
      layers: 4,
      glowRadius: 280,
      glowSoftness: 2.8,
      acceleration: isHyperdrive ? 3.8 : 1.4,
      tailFade: 0.25,
      restingFill: isHyperdrive ? 0.85 : 0.35,
    };

    function hexToRgb(hex: string) {
      const clean = hex.replace("#", "");
      return [
        parseInt(clean.slice(0, 2), 16),
        parseInt(clean.slice(2, 4), 16),
        parseInt(clean.slice(4, 6), 16),
      ];
    }

    function pickWeightedColor() {
      let roll = Math.random();
      for (let i = 0; i < settings.palette.length; i++) {
        roll -= settings.paletteWeights[i];
        if (roll <= 0) return hexToRgb(settings.palette[i]);
      }
      return hexToRgb(settings.palette[0]);
    }

    let stars: any[] = [];
    for (let i = 0; i < settings.starCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      stars.push({
        dirX: Math.cos(angle),
        dirY: Math.sin(angle),
        offset: Math.random(),
        length: settings.minStreakLength + Math.random() * (settings.maxStreakLength - settings.minStreakLength),
        width: settings.minStreakWidth + Math.random() * (settings.maxStreakWidth - settings.minStreakWidth),
        color: pickWeightedColor(),
      });
    }

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let maxDistance = 0;
    let progress = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      centerX = width / 2;
      centerY = height / 2;
      maxDistance = Math.hypot(width / 2, height / 2) * settings.reachScale;
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      animId = requestAnimationFrame(render);
      progress += isHyperdrive ? 0.015 : 0.004;
      if (progress > 1) progress = 0;

      ctx.fillStyle = "rgba(4, 11, 16, 0.4)";
      ctx.fillRect(0, 0, width, height);
      ctx.lineCap = "round";

      const filled = settings.restingFill + progress * (1 - settings.restingFill);
      const speed = Math.pow(filled, 1 / settings.acceleration);

      for (const star of stars) {
        const travel = Math.max(0, (speed * settings.layers - star.offset) % 1);
        const headDistance = settings.holeRadius + travel * (maxDistance - settings.holeRadius);
        const streakLength = star.length * (0.2 + travel * 0.8);
        const tailDistance = Math.max(settings.holeRadius, headDistance - streakLength);

        const tailX = centerX + star.dirX * tailDistance;
        const tailY = centerY + star.dirY * tailDistance;
        const headX = centerX + star.dirX * headDistance;
        const headY = centerY + star.dirY * headDistance;

        let opacity = 1;
        if (headDistance < settings.glowRadius) {
          const t = (headDistance - settings.holeRadius) / (settings.glowRadius - settings.holeRadius);
          opacity = Math.pow(Math.max(0, t), settings.glowSoftness);
        }
        if (opacity <= 0.01) continue;

        const [r, g, b] = star.color;
        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, `rgba(${r},${g},${b},0)`);
        gradient.addColorStop(settings.tailFade, `rgba(${r},${g},${b},${opacity})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},${opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.width * (0.5 + travel * 0.9);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isHyperdrive]);

  const toggleHyperdrive = () => {
    setIsHyperdrive(!isHyperdrive);
    setVelocityVal(!isHyperdrive ? "Sub-Luz 0.88c" : "Mach 4.2");
  };

  return (
    <section className="relative w-full min-h-[85vh] bg-[#040b10] py-16 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-between">
      <div className="relative z-10 text-center max-w-2xl mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-cyan-400/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-widest text-cyan-300 mb-3">
          <Orbit className="w-3.5 h-3.5 animate-spin" />
          <span>Voo Atmosférico & Vetor Estelar (Starfield Warp Engine)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-bold text-white tracking-tight">
          Navegação Noturna & Trânsito Transcontinental
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 mt-2 font-light">
          Simulador de aceleração em camadas de plasma e gradientes de cauda estelar. Experimente o modo de propulsão sub-luz entre fusos horários.
        </p>
      </div>

      <div className="relative w-full max-w-6xl h-[560px] rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Telemetry overlay */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
          <div className="glass-card px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-white/10">
            <Compass className="w-4 h-4 text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono-tech text-cyan-300 uppercase tracking-wider">Telemetria de Propulsão</span>
              <span className="text-xs font-semibold text-white font-mono-tech">{velocityVal} • Vetor Azimute 312°</span>
            </div>
          </div>
        </div>

        {/* Interactive toggle */}
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={toggleHyperdrive}
            className={`px-5 py-3 rounded-2xl font-mono-tech text-xs tracking-wider uppercase font-semibold flex items-center gap-2.5 shadow-xl transition-all duration-300 ${
              isHyperdrive
                ? "bg-cyan-400 text-slate-950 shadow-cyan-400/30 scale-105"
                : "glass-card text-white hover:bg-cyan-400/10 border border-cyan-400/30"
            }`}
          >
            <Zap className={`w-4 h-4 ${isHyperdrive ? "fill-current animate-bounce" : "text-cyan-400"}`} />
            <span>{isHyperdrive ? "Desativar Hiperdrive" : "Acionar Propulsão Estelar"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
