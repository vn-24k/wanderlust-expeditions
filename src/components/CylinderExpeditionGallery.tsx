import React, { useEffect, useRef, useState } from "react";
import { Layers, Shield, Sparkles } from "lucide-react";

export const CylinderExpeditionGallery: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedGuide, setSelectedGuide] = useState<string>("Comandante Elena Marchetti • Rota Polar");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const guides = [
      { name: "Elena Marchetti", role: "Especialista Alpina", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
      { name: "Kofi Mensah", role: "Navegador de Fissuras", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { name: "Ines Laurent", role: "Bióloga de Recifes", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
      { name: "Julian Hart", role: "Guia Glaciológico", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
      { name: "Mei Tanaka", role: "Meteorologista de Voo", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
      { name: "Omar Haddad", role: "Cartógrafo do Deserto", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
    ];

    const slicesPerCard = 48;
    const gap = 0.16;
    const normalSpeed = 0.003;

    const ring = {
      angle: 0,
      speed: normalSpeed,
      tilt: -0.22,
      isDragging: false,
      lastX: 0,
    };

    const loadedCards: { canvas: HTMLCanvasElement; name: string; role: string }[] = [];

    guides.forEach((g) => {
      const c = document.createElement("canvas");
      c.width = 400;
      c.height = 540;
      const cctx = c.getContext("2d");
      if (cctx) {
        cctx.fillStyle = "#091720";
        cctx.fillRect(0, 0, 400, 540);

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = g.photo;
        img.onload = () => {
          cctx.drawImage(img, 20, 20, 360, 400);
          cctx.fillStyle = "#4eedb8";
          cctx.font = "700 24px 'Plus Jakarta Sans', sans-serif";
          cctx.fillText(g.name, 25, 465);
          cctx.fillStyle = "#94a3b8";
          cctx.font = "400 16px 'DM Mono', monospace";
          cctx.fillText(g.role, 25, 500);
        };
      }
      loadedCards.push({ canvas: c, name: g.name, role: g.role });
    });

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    function pointOnRing(angle: number, radius: number) {
      const depth = Math.cos(angle);
      const scale = 1 + depth * 0.28;
      return {
        x: Math.sin(angle) * radius * scale + width / 2,
        y: depth * radius * ring.tilt + height / 2,
        scale,
      };
    }

    const onPointerDown = (e: PointerEvent) => {
      ring.isDragging = true;
      ring.lastX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!ring.isDragging) return;
      const dx = e.clientX - ring.lastX;
      ring.lastX = e.clientX;
      ring.angle += dx * 0.006;
    };
    const onPointerUp = () => {
      ring.isDragging = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!ring.isDragging) {
        ring.angle += ring.speed;
      }

      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width * 0.38, height * 0.44);
      const slotAngle = (Math.PI * 2) / loadedCards.length;
      const cardAngle = slotAngle * (1 - gap);
      const sliceAngle = cardAngle / slicesPerCard;
      const cardHeight = radius * cardAngle * 1.35;

      // Draw cards in two passes (back then front for correct 3D occlusions)
      ["back", "front"].forEach((side) => {
        loadedCards.forEach((item, cardIdx) => {
          const sliceWidth = item.canvas.width / slicesPerCard;

          for (let slice = 0; slice < slicesPerCard; slice++) {
            const angle = ring.angle + cardIdx * slotAngle + slice * sliceAngle;
            const start = pointOnRing(angle, radius);
            const end = pointOnRing(angle + sliceAngle, radius);
            const sliceH = cardHeight * start.scale;
            const top = start.y - sliceH / 2;

            if (side === "front" && end.x > start.x) {
              ctx.drawImage(
                item.canvas,
                slice * sliceWidth,
                0,
                sliceWidth,
                item.canvas.height,
                start.x,
                top,
                end.x - start.x + 1,
                sliceH
              );
            }
            if (side === "back" && end.x < start.x) {
              ctx.fillStyle = "rgba(10, 25, 35, 0.65)";
              ctx.fillRect(end.x, top, start.x - end.x + 1, sliceH);
            }
          }
        });
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] bg-[#050d12] py-16 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-between">
      <div className="relative z-10 text-center max-w-2xl mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#4eedb8]/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-widest text-[#4eedb8] mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Carrossel Cilíndrico 3D Fatiado (Cylinder-Gallery Engine)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-bold text-white tracking-tight">
          Líderes de Expedição & Oficiais de Rota
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 mt-2 font-light">
          Projeção cilíndrica de curvatura espacial com 48 fatias geométricas por lâmina e cálculo contínuo de oclusão frontal/traseira.
        </p>
      </div>

      <div className="relative w-full max-w-5xl h-[520px] rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-6 left-6 z-20 glass-card px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono-tech text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4eedb8] animate-pulse" />
          <span>Arraste horizontalmente para girar o anel de comando</span>
        </div>
      </div>
    </section>
  );
};
