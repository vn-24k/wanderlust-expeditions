import React, { useState } from "react";
import {
  X,
  Sliders,
  Cpu,
  Radio,
  Gauge,
  Layers,
  Sparkles,
  ToggleLeft,
  MousePointerClick,
  TextCursorInput,
  Loader2,
  HelpCircle,
  CreditCard,
  CheckSquare
} from "lucide-react";
import {
  UivSwitch1,
  UivSwitch2,
  UivSwitch3,
  UivSwitch4,
  UivBtn1,
  UivBtn2,
  UivBtn3,
  UivBtn4,
  UivInput1,
  UivInput2,
  UivInput3,
  UivLoader1,
  UivLoader2,
  UivLoader3,
  UivTooltip1,
  UivTooltip2,
  UivCard1,
  UivCard2,
  UivRadio1,
  UivRadio2,
  UivCheck1,
  UivCheck2,
} from "./uiverse-collection";

interface CockpitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CockpitDrawer: React.FC<CockpitDrawerProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<"switches" | "buttons" | "inputs" | "loaders" | "instruments">("switches");
  const [activeTelemetryLog, setActiveTelemetryLog] = useState<string>("SISTEMAS OPERACIONAIS NOMINAIS (22/22)");

  const logAction = (name: string) => {
    setActiveTelemetryLog(`INSTRUMENTO ACIONADO: ${name} [${new Date().toLocaleTimeString()}]`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Drawer Body */}
      <div className="relative z-50 w-full max-w-2xl h-full bg-[#07131b]/95 border-l border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4eedb8]/15 border border-[#4eedb8]/30 flex items-center justify-center text-[#4eedb8] shadow-inner">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white font-cinzel tracking-wider">
                  Central de Bordo & Instrumentação
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#4eedb8]/20 text-[#4eedb8] text-[10px] font-mono-tech">
                  22 Módulos
                </span>
              </div>
              <p className="text-xs font-mono-tech text-slate-400 mt-0.5">
                {activeTelemetryLog}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/15 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center gap-1.5 p-3 px-6 bg-black/40 border-b border-white/5 overflow-x-auto text-xs font-mono-tech">
          <button
            onClick={() => setActiveCategory("switches")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeCategory === "switches"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <ToggleLeft className="w-3.5 h-3.5" />
            <span>Sensores (4)</span>
          </button>
          <button
            onClick={() => setActiveCategory("buttons")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeCategory === "buttons"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>Atuadores (4)</span>
          </button>
          <button
            onClick={() => setActiveCategory("inputs")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeCategory === "inputs"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <TextCursorInput className="w-3.5 h-3.5" />
            <span>Telemetria (3)</span>
          </button>
          <button
            onClick={() => setActiveCategory("loaders")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeCategory === "loaders"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <Loader2 className="w-3.5 h-3.5" />
            <span>Radares (3)</span>
          </button>
          <button
            onClick={() => setActiveCategory("instruments")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeCategory === "instruments"
                ? "bg-[#4eedb8] text-slate-950 font-bold"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Instrumentos (8)</span>
          </button>
        </div>

        {/* Component Panels Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeCategory === "switches" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UivSwitch1 label="Estabilizador Giroscópico" onClick={() => logAction("Estabilizador Giroscópico")} />
              <UivSwitch2 label="Sensor Atmosférico" onClick={() => logAction("Sensor Atmosférico")} />
              <UivSwitch3 label="Travamento Orbital" onClick={() => logAction("Travamento Orbital")} />
              <UivSwitch4 label="Filtro Polarizador" onClick={() => logAction("Filtro Polarizador")} />
            </div>
          )}

          {activeCategory === "buttons" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UivBtn1 label="Disparo de Rota" onClick={() => logAction("Disparo de Rota")} />
              <UivBtn2 label="Iniciação de Voo" onClick={() => logAction("Iniciação de Voo")} />
              <UivBtn3 label="Enlace de Satélite" onClick={() => logAction("Enlace de Satélite")} />
              <UivBtn4 label="Propulsão Vetorial" onClick={() => logAction("Propulsão Vetorial")} />
            </div>
          )}

          {activeCategory === "inputs" && (
            <div className="grid grid-cols-1 gap-4">
              <UivInput1 label="Coordenadas GPS" onClick={() => logAction("Coordenadas GPS")} />
              <UivInput2 label="Terminal de Frequência" onClick={() => logAction("Terminal de Frequência")} />
              <UivInput3 label="Código de Manifesto" onClick={() => logAction("Código de Manifesto")} />
            </div>
          )}

          {activeCategory === "loaders" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <UivLoader1 label="Radar de Altitude" onClick={() => logAction("Radar de Altitude")} />
              <UivLoader2 label="Buffer de Satélite" onClick={() => logAction("Buffer de Satélite")} />
              <UivLoader3 label="Varredura Térmica" onClick={() => logAction("Varredura Térmica")} />
            </div>
          )}

          {activeCategory === "instruments" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UivCard1 label="Credencial de Voo" onClick={() => logAction("Credencial de Voo")} />
              <UivCard2 label="Status de Cabine" onClick={() => logAction("Status de Cabine")} />
              <UivTooltip1 label="Telemetria Barométrica" onClick={() => logAction("Telemetria Barométrica")} />
              <UivTooltip2 label="Sensor de Pressão" onClick={() => logAction("Sensor de Pressão")} />
              <UivRadio1 label="Modo Navegação" onClick={() => logAction("Modo Navegação")} />
              <UivRadio2 label="Sensibilidade Piloto" onClick={() => logAction("Sensibilidade Piloto")} />
              <UivCheck1 label="Oxigênio Suplementar" onClick={() => logAction("Oxigênio Suplementar")} />
              <UivCheck2 label="Carenagem Reforçada" onClick={() => logAction("Carenagem Reforçada")} />
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono-tech text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4eedb8] animate-ping" />
            <span>Todos os 22 módulos encapsulados com isolamento de escopo estrito</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};
