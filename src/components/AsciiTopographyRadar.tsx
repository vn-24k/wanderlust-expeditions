import React, { useEffect, useRef, useState } from "react";
import { Cpu, RefreshCw, ScatterChart, ShieldAlert, Sparkles } from "lucide-react";

export const AsciiTopographyRadar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"radar" | "scattered" | "gravity" | "returning">("radar");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const CELL_SIZE = 8;
    const CELL_GAP = 3;
    const CELL_STEP = CELL_SIZE + CELL_GAP;
    const ASCII_CHARS = "0123456789WANDERLUST•EXPEDITION•TERRA•ELEVATION";
    const HOVER_RADIUS = 7;
    const HOVER_PUSH = 5;
    const HOVER_EASE = 0.12;
    const SCATTER_RANGE = 28;
    const SCATTER_EASE = 0.08;
    const GRAVITY = 0.06;
    const BOUNCE = 0.28;
    const RESET_EASE = 0.06;

    let gridCols = 0;
    let gridRows = 0;
    let asciiCells: any[] = [];
    const cursor = { col: -999, row: -999 };

    function randomAsciiChar() {
      return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gridCols = Math.floor(rect.width / CELL_STEP);
      gridRows = Math.floor(rect.height / CELL_STEP);

      // Generate topographic terrain matrix (elevation contour waves)
      asciiCells = [];
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const nx = c / gridCols - 0.5;
          const ny = r / gridRows - 0.5;
          const dist = Math.hypot(nx, ny);
          const elev = Math.sin(nx * 14) * Math.cos(ny * 14) + Math.cos(dist * 18);

          if (elev > 0.15 || dist < 0.38) {
            asciiCells.push({
              col: c,
              row: r,
              char: randomAsciiChar(),
              offsetX: 0,
              offsetY: 0,
              fallSpeed: 0,
              scatterX: (Math.random() - 0.5) * SCATTER_RANGE,
              scatterY: (Math.random() - 0.5) * SCATTER_RANGE,
              color: dist < 0.2 ? "#4eedb8" : elev > 0.6 ? "#7cf5ff" : "#5d8a9e",
            });
          }
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.col = Math.floor((e.clientX - rect.left) / CELL_STEP);
      cursor.row = Math.floor((e.clientY - rect.top) / CELL_STEP);
    };

    const handleMouseLeave = () => {
      cursor.col = -999;
      cursor.row = -999;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      animId = requestAnimationFrame(render);
      const rect = canvas.getBoundingClientRect();
      ctx.fillStyle = "#050d12";
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.font = `600 ${CELL_SIZE}px 'DM Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const cell of asciiCells) {
        if (phase === "scattered") {
          cell.offsetX += (cell.scatterX - cell.offsetX) * SCATTER_EASE;
          cell.offsetY += (cell.scatterY - cell.offsetY) * SCATTER_EASE;
        } else if (phase === "gravity") {
          const floorOffset = gridRows - 1 - cell.row;
          cell.fallSpeed += GRAVITY;
          cell.offsetY += cell.fallSpeed;
          if (cell.offsetY > floorOffset) {
            cell.offsetY = floorOffset;
            cell.fallSpeed *= -BOUNCE;
          }
        } else if (phase === "returning" || phase === "radar") {
          cell.offsetX += (0 - cell.offsetX) * RESET_EASE;
          cell.offsetY += (0 - cell.offsetY) * RESET_EASE;

          if (cursor.col >= 0 && cursor.row >= 0) {
            const dx = cell.col - cursor.col;
            const dy = cell.row - cursor.row;
            const dist = Math.hypot(dx, dy);
            if (dist < HOVER_RADIUS && dist > 0) {
              const force = (1 - dist / HOVER_RADIUS) * HOVER_PUSH;
              cell.offsetX += (dx / dist) * force * HOVER_EASE;
              cell.offsetY += (dy / dist) * force * HOVER_EASE;
            }
          }
        }

        const renderX = (cell.col + cell.offsetX + 0.5) * CELL_STEP;
        const renderY = (cell.row + cell.offsetY + 0.5) * CELL_STEP;

        ctx.fillStyle = cell.color;
        ctx.fillText(cell.char, renderX, renderY);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [phase]);

  return (
    <section className="relative w-full min-h-[82vh] bg-gradient-to-b from-[#050d12] via-[#07141b] to-[#050d12] py-16 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-between">
      <div className="relative z-10 text-center max-w-3xl mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#4eedb8]/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-widest text-[#4eedb8] mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Matriz Topográfica & LiDAR Interativo (Interactive-ASCII Engine)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-bold text-white tracking-tight">
          Varredura Topográfica de Alta Altitude
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 mt-2 font-light">
          Mapeamento vetorial de relevo renderizado caractere por caractere. Passe o cursor para dispersar o campo de partículas ou acione físicas gravitacionais.
        </p>
      </div>

      <div className="relative w-full max-w-6xl h-[520px] rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

        {/* Phase selector bar */}
        <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
          <button
            onClick={() => setPhase("radar")}
            className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs tracking-wider uppercase transition-all ${
              phase === "radar"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "glass-card text-white hover:bg-white/10"
            }`}
          >
            Modo Radar Topográfico
          </button>
          <button
            onClick={() => setPhase("scattered")}
            className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs tracking-wider uppercase transition-all ${
              phase === "scattered"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "glass-card text-white hover:bg-white/10"
            }`}
          >
            Dispersão de Pulso
          </button>
          <button
            onClick={() => setPhase("gravity")}
            className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs tracking-wider uppercase transition-all ${
              phase === "gravity"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "glass-card text-white hover:bg-white/10"
            }`}
          >
            Colapso Gravitacional
          </button>
          <button
            onClick={() => setPhase("returning")}
            className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs tracking-wider uppercase transition-all ${
              phase === "returning"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "glass-card text-white hover:bg-white/10"
            }`}
          >
            Reconstrução Vetorial
          </button>
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-5 right-6 z-20 glass-card px-4 py-2 rounded-xl text-[11px] font-mono-tech text-slate-400 border border-white/10 hidden sm:block">
          Passe o cursor sobre as letras para induzir dispersão cinemática
        </div>
      </div>
    </section>
  );
};
