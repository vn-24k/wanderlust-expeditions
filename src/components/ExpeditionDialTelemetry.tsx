import React, { useState } from "react";
import { Gauge, Navigation, Compass, MapPin, Wind, Thermometer, Radio } from "lucide-react";

export const ExpeditionDialTelemetry: React.FC = () => {
  const [angle, setAngle] = useState(42);
  const [activeZone, setActiveZone] = useState(0);

  const zones = [
    {
      name: "Santuário de Kelingking",
      coords: "8°45'06\" S 115°29'23\" E",
      altitude: "240 m",
      temp: "29°C",
      wind: "14 nós SSE",
      pressure: "1012 hPa",
      status: "ÓTIMO PARA VOO"
    },
    {
      name: "Caldera de Santorini",
      coords: "36°25'12\" N 25°25'54\" E",
      altitude: "310 m",
      temp: "22°C",
      wind: "18 nós N",
      pressure: "1018 hPa",
      status: "VISIBILIDADE TOTAL"
    },
    {
      name: "Atol Bioluminescente Vaadhoo",
      coords: "4°17'40\" N 73°02'28\" E",
      altitude: "2 m",
      temp: "31°C",
      wind: "8 nós ENE",
      pressure: "1009 hPa",
      status: "BRILHO MARINHO ATIVO"
    },
    {
      name: "Pico de Matterhorn",
      coords: "45°58'35\" N 7°39'30\" E",
      altitude: "4.478 m",
      temp: "-6°C",
      wind: "28 nós W",
      pressure: "590 hPa",
      status: "VENTOS ALPINOS"
    }
  ];

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setAngle(val);
    const z = Math.min(zones.length - 1, Math.floor((val / 360) * zones.length));
    setActiveZone(z);
  };

  const current = zones[activeZone];

  return (
    <section className="relative w-full min-h-[75vh] bg-[#040c11] py-16 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-between">
      <div className="relative z-10 text-center max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#4eedb8]/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-widest text-[#4eedb8] mb-3">
          <Gauge className="w-3.5 h-3.5" />
          <span>Mostrador Mineral & Giroscópio Vetorial (Mineral-Dial Engine)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-bold text-white tracking-tight">
          Mostrador de Azimute & Instrumentação Barométrica
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 mt-2 font-light">
          Ajuste o anel gradativo com 180 divisões radiais para alinhar os sensores de voo e obter a telemetria climática em tempo real.
        </p>
      </div>

      <div className="relative w-full max-w-5xl glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Telemetry Readout */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#4eedb8] tracking-widest uppercase">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Frequência Satélite Travada</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-editorial font-bold text-white leading-tight">
            {current.name}
          </h3>
          <p className="text-xs font-mono-tech text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#4eedb8]" />
            <span>{current.coords}</span>
          </p>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="glass-card p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Altitude Barométrica</span>
              <p className="text-base font-bold text-white font-mono-tech mt-0.5">{current.altitude}</p>
            </div>
            <div className="glass-card p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Temperatura de Solo</span>
              <p className="text-base font-bold text-white font-mono-tech mt-0.5">{current.temp}</p>
            </div>
            <div className="glass-card p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Vetor de Vento</span>
              <p className="text-base font-bold text-white font-mono-tech mt-0.5">{current.wind}</p>
            </div>
            <div className="glass-card p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase">Pressão QNH</span>
              <p className="text-base font-bold text-white font-mono-tech mt-0.5">{current.pressure}</p>
            </div>
          </div>

          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4eedb8]/10 border border-[#4eedb8]/20 text-[#4eedb8] text-xs font-mono-tech">
            <span className="w-2 h-2 rounded-full bg-[#4eedb8]" />
            <span>Condição Operacional: {current.status}</span>
          </div>
        </div>

        {/* Center/Right Dial Widget */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* SVG Tick Ring */}
            <svg
              className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
              viewBox="0 0 320 320"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <circle cx="160" cy="160" r="132" fill="none" stroke="rgba(78,237,184,0.18)" strokeWidth="1" strokeDasharray="3 3" />
              {Array.from({ length: 60 }).map((_, i) => {
                const a = (i * 6 * Math.PI) / 180;
                const r1 = i % 5 === 0 ? 148 : 144;
                const r2 = 136;
                const x1 = 160 + r1 * Math.cos(a);
                const y1 = 160 + r1 * Math.sin(a);
                const x2 = 160 + r2 * Math.cos(a);
                const y2 = 160 + r2 * Math.sin(a);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 5 === 0 ? "#4eedb8" : "rgba(255,255,255,0.25)"}
                    strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
                  />
                );
              })}
            </svg>

            {/* Inner Ring with Target Arrow */}
            <div className="relative w-40 h-40 rounded-full glass-card border border-[#4eedb8]/30 flex flex-col items-center justify-center shadow-inner">
              <Compass className="w-8 h-8 text-[#4eedb8] mb-1 animate-spin" style={{ animationDuration: "30s" }} />
              <span className="text-2xl font-bold font-mono-tech text-white">{angle}°</span>
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest">Azimute</span>
            </div>
          </div>

          {/* Slider input */}
          <div className="w-full max-w-sm mt-6 flex flex-col items-center gap-2">
            <input
              type="range"
              min="0"
              max="359"
              value={angle}
              onChange={handleAngleChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#4eedb8]"
            />
            <div className="w-full flex justify-between text-[10px] font-mono-tech text-slate-400">
              <span>0° Norte</span>
              <span>90° Leste</span>
              <span>180° Sul</span>
              <span>270° Oeste</span>
              <span>360°</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
