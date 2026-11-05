import React, { useState } from "react";
import { LayoutGrid, CheckCircle2, MapPin, Calendar, Users, PlaneTakeoff } from "lucide-react";

export const SpotlightFrameAccordions: React.FC = () => {
  const [activePanel, setActivePanel] = useState<number>(0);

  const itineraries = [
    {
      title: "Expedição Arquipélago de Raja Ampat",
      region: "Papua Ocidental • Indonésia",
      days: "10 Dias • 9 Noites",
      group: "Máximo 8 Exploradores",
      image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80",
      desc: "Navegação em catamarã polar privativo por ilhotas cársticas intocadas, cavernas com pinturas rupestres e recifes com a maior biodiversidade marinha do planeta.",
      highlights: ["Mergulho com mantas oceânicas", "Caiaque em lagoas escondidas", "Estadia em overwater lodge solar"]
    },
    {
      title: "Travessia dos Fiordes & Aurora Ártica",
      region: "Tromsø & Ilhas Lofoten • Noruega",
      days: "8 Dias • 7 Noites",
      group: "Máximo 6 Exploradores",
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
      desc: "Caçada guiada à Aurora Boreal com astrofotógrafos oficiais, trenós puxados por huskies em florestas boreais e hospedagem em domos geodésicos de vidro aquecido.",
      highlights: ["Domo panorâmico aquecido", "Navegação silenciosa em barco elétrico", "Safári de orcas nos fiordes"]
    },
    {
      title: "Rota Secreta dos Monastérios do Butão",
      region: "Paro & Vale de Punakha • Himalaia",
      days: "12 Dias • 11 Noites",
      group: "Máximo 8 Exploradores",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      desc: "Trekking de aclimatação com permissões especiais de acesso ao Ninho do Tigre e meditação privada conduzida pelos monges seniores do reino da felicidade interna.",
      highlights: ["Acesso exclusivo a templos sagrados", "Pensão completa em lodges ecológicos", "Cerimônia privativa de bênção do voo"]
    },
    {
      title: "Voo de Balão & Salar de Uyuni",
      region: "Altiplano Andino • Bolívia",
      days: "7 Dias • 6 Noites",
      group: "Máximo 6 Exploradores",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      desc: "Acampamento móvel de luxo no maior espelho natural da Terra. Observação astronômica sem poluição luminosa com telescópios catadióptricos de alta resolução.",
      highlights: ["Voo cativo de balão ao nascer do sol", "Airstreams climatizados sobre o sal", "Jantar com menu degustação andino"]
    }
  ];

  return (
    <section className="relative w-full min-h-[85vh] bg-[#050d12] py-20 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-between">
      <div className="relative z-10 text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#4eedb8]/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-widest text-[#4eedb8] mb-3">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Painéis de Foco Expansível (Accordions-Frames Engine)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-bold text-white tracking-tight">
          Itinerários de Alta Curadoria & Retiro Selvagem
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 mt-2 font-light">
          Estrutura modular de foco dinâmico que expande a lâmina de roteiro selecionada, revelando logística, acomodações e destaques operacionais.
        </p>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-4 max-w-7xl w-full h-[540px]">
        {itineraries.map((item, idx) => {
          const isFocused = activePanel === idx;
          return (
            <div
              key={idx}
              onClick={() => setActivePanel(idx)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-white/10 ${
                isFocused ? "lg:flex-[3.5] flex-[4]" : "lg:flex-[1] flex-[1] opacity-75 hover:opacity-100"
              }`}
            >
              {/* Background photo */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              {/* Collapsed view indicator (for narrow columns) */}
              {!isFocused && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs font-mono-tech text-[#4eedb8] mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="text-lg font-bold font-editorial text-white line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono-tech text-slate-400 mt-1 truncate">
                    {item.region}
                  </span>
                </div>
              )}

              {/* Expanded active view */}
              {isFocused && (
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent animate-fadeIn">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#4eedb8]/20 border border-[#4eedb8]/40 text-[#4eedb8] text-xs font-mono-tech uppercase">
                      Itinerário Ativo 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono-tech text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#4eedb8]" />
                      {item.days}
                    </span>
                    <span className="text-xs font-mono-tech text-slate-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#4eedb8]" />
                      {item.group}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold font-editorial text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm font-mono-tech text-slate-400 flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#4eedb8]" />
                    {item.region}
                  </p>

                  <p className="text-xs md:text-sm text-slate-200/90 font-light leading-relaxed max-w-2xl mb-4 line-clamp-3 md:line-clamp-none">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
                    {item.highlights.map((h, i) => (
                      <span key={i} className="glass-card px-3 py-1.5 rounded-xl text-xs font-mono-tech text-slate-300 flex items-center gap-1.5 border border-white/10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4eedb8]" />
                        {h}
                      </span>
                    ))}
                  </div>

                  <button className="self-start px-6 py-3 rounded-2xl bg-[#4eedb8] hover:bg-[#38d9a9] text-slate-950 font-semibold text-xs font-mono-tech uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#4eedb8]/20 transition-all hover:scale-105">
                    <PlaneTakeoff className="w-4 h-4" />
                    <span>Solicitar Manifesto Desta Rota</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
