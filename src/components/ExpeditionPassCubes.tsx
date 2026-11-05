import React, { useState } from "react";
import { CreditCard, Award, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const ExpeditionPassCubes: React.FC = () => {
  const [activeFlipped, setActiveFlipped] = useState<number | null>(null);

  const passes = [
    {
      id: 0,
      tier: "Expedição Polar",
      title: "Titânio Ártico",
      sub: "Acesso à Estação Svalbard e Glaciares Árticos",
      bgGradient: "from-cyan-900/60 to-slate-900/80",
      accent: "#7cf5ff",
      code: "POLAR-88X",
      perks: ["Aeronave turboélice equipada com esquis", "Guia glaciológico pessoal 24/7", "Traje térmico de sobrevivência de fibra de titânio"]
    },
    {
      id: 1,
      tier: "Arquipélago Privado",
      title: "Esmeralda Bali & Nusa",
      sub: "Acesso exclusivo aos penhascos e praias secretas",
      bgGradient: "from-emerald-950/70 to-teal-950/80",
      accent: "#4eedb8",
      code: "INDONESIA-04",
      perks: ["Iate privativo de exploração oceânica", "Mergulho noturno com arraias manta", "Lodge suspenso em falésias calcárias"]
    },
    {
      id: 2,
      tier: "Cadeia Alpina",
      title: "Mônaco & Zermatt Haute",
      sub: "Rotas de esqui helitransportadas na Suíça",
      bgGradient: "from-amber-950/60 to-slate-950/80",
      accent: "#f59e0b",
      code: "ALPIN-99Z",
      perks: ["Heli-drop diário nos picos de 4.000m", "Chalé privativo com chef estrelado", "Reserva prioritária em refúgios glaciais"]
    },
    {
      id: 3,
      tier: "Voo Suborbital",
      title: "Stratos Horizon VIP",
      sub: "Fronteira espacial e visão da curvatura terrestre",
      bgGradient: "from-indigo-950/70 to-slate-950/90",
      accent: "#a78bfa",
      code: "STRATOS-01",
      perks: ["Cápsula pressurizada a 32.000m de altitude", "Treinamento fisiológico aeroespacial", "Registro em vídeo 8K 360° da estratosfera"]
    }
  ];

  const toggleFlip = (index: number) => {
    setActiveFlipped(activeFlipped === index ? null : index);
  };

  return (
    <section className="relative w-full min-h-[78vh] bg-gradient-to-b from-[#040c11] via-[#06121a] to-[#050d12] py-20 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-between">
      <div className="relative z-10 text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#4eedb8]/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-widest text-[#4eedb8] mb-3">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Cubos de Perspectiva 3D (3D-CARDS Engine)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-bold text-white tracking-tight">
          Credenciais & Passaportes de Expedição
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 mt-2 font-light">
          Cartões volumétricos com rotação tridimensional de 6 faces e efeito giroscópio. Clique para virar e inspecionar os benefícios de cada classe de voo.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full perspective-[1200px]">
        {passes.map((pass) => {
          const isFlipped = activeFlipped === pass.id;
          return (
            <div
              key={pass.id}
              onClick={() => toggleFlip(pass.id)}
              className="relative w-full h-[380px] cursor-pointer group select-none transition-transform duration-300 hover:scale-[1.02]"
              style={{ perspective: "1000px" }}
            >
              <div
                className={`relative w-full h-full duration-700 transition-transform [transform-style:preserve-3d] ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front Face */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between border border-white/10 glass-panel bg-gradient-to-br ${pass.bgGradient} [backface-visibility:hidden] shadow-xl group-hover:border-[#4eedb8]/40 transition-colors`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400">
                        {pass.tier}
                      </span>
                      <h4 className="text-xl font-bold font-editorial text-white mt-1">
                        {pass.title}
                      </h4>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{ borderColor: `${pass.accent}40`, backgroundColor: `${pass.accent}15` }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: pass.accent }} />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed my-auto">
                    {pass.sub}
                  </p>

                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-[10px] font-mono-tech text-slate-400">ID: {pass.code}</span>
                    <span className="text-xs font-mono-tech text-white flex items-center gap-1 group-hover:text-[#4eedb8]">
                      <span>Virar Credencial</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Back Face */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between border border-white/15 glass-panel bg-slate-950/95 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl`}
                  style={{ borderColor: `${pass.accent}40` }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4" style={{ color: pass.accent }} />
                      <span className="text-xs font-mono-tech uppercase tracking-wider font-semibold" style={{ color: pass.accent }}>
                        Especificações Inclusas
                      </span>
                    </div>
                    <ul className="space-y-2.5 mt-4">
                      {pass.perks.map((perk, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: pass.accent }} />
                          <span className="leading-snug">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="w-full py-2.5 rounded-xl font-mono-tech text-xs uppercase tracking-wider font-semibold transition-all mt-4 text-slate-950"
                    style={{ backgroundColor: pass.accent }}
                  >
                    Confirmar Alocação
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
