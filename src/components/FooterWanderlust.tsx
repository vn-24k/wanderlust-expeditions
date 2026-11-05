import React, { useState } from "react";
import { Compass, Send, CheckCircle2, Globe, Shield, ArrowUpRight } from "lucide-react";

export const FooterWanderlust: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative w-full bg-[#03080c] border-t border-white/10 pt-20 pb-12 px-6 md:px-12 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
        {/* Brand info */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 select-none mb-4">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/20 flex items-center justify-center text-[#4eedb8] shadow-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-[0.2em] text-white font-cinzel leading-none">
                  WANDERLUST
                </span>
                <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#4eedb8] uppercase mt-1">
                  EXPLORE. DREAM. DISCOVER.
                </span>
              </div>
            </div>
            <p className="text-sm font-light text-slate-400 max-w-sm leading-relaxed mb-6">
              Plataforma global de logística expedicionária de alto padrão. Unindo aviação executiva, expedições selvagens remotas e instrumentação de precisão náutica e aeroespacial.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#4eedb8]" />
            <span>Operações Globais de Voo Ativas em 5 Continentes</span>
          </div>
        </div>

        {/* Destinos */}
        <div>
          <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white mb-4">
            Destinos de Elite
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Santorini & Mar Egeu</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Bali & Nusa Penida</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Atol Vaadhoo Maldivas</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Alpes Suíços & Zermatt</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Glaciares da Patagônia</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Santuários de Kyoto</a></li>
          </ul>
        </div>

        {/* Expedições */}
        <div>
          <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white mb-4">
            Sistemas & Serviços
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Fretamento Executivo</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Voo Suborbital Stratos</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Telemetria de Azimute</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Mapeamento Topográfico</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Protocolos de Segurança</a></li>
            <li><a href="#destinations" className="hover:text-[#4eedb8] transition-colors">Permissões de Pouso Remoto</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white mb-4">
            Despachos de Voo
          </h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Receba coordenadas de novas janelas de expedição e relatórios de telemetria climática em primeira mão.
          </p>
          {isSubscribed ? (
            <div className="p-3 rounded-xl bg-[#4eedb8]/15 border border-[#4eedb8]/30 text-[#4eedb8] text-xs font-mono-tech flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Coordenadas cadastradas com sucesso!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Seu endereço corporativo..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4eedb8]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#4eedb8] text-slate-950 hover:bg-[#3de2ad] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar: Human authorship signed by user */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-400">
        <p>© 2026 WANDERLUST EXPEDITIONS. Engenharia e concepção autoral desenvolvida por vn-24k.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Termos de Navegação</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade Aérea</a>
          <a href="#" className="hover:text-white transition-colors">Certificações ICAO</a>
        </div>
      </div>
    </footer>
  );
};
