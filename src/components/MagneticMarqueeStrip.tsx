import React from "react";
import { Compass, Globe2 } from "lucide-react";

export const MagneticMarqueeStrip: React.FC = () => {
  const routes = [
    { city: "BALI KELINGKING", coords: "8°45'S 115°29'E", status: "VENTOS CALMOS" },
    { city: "CALDERA SANTORINI", coords: "36°25'N 25°25'E", status: "VISIBILIDADE TOTAL" },
    { city: "ATOL VAADHOO", coords: "4°17'N 73°02'E", status: "BIOLUMINESCÊNCIA ATIVA" },
    { city: "PICO MATTERHORN", coords: "45°58'N 7°39'E", status: "VENTO ALPINO 24 NÓS" },
    { city: "PERITO MORENO", coords: "50°30'S 73°02'W", status: "TEMPERATURA -3°C" },
    { city: "BAMBOO KYOTO", coords: "35°01'N 135°40'E", status: "ROTA SERENA" },
    { city: "WADI RUM MARS", coords: "29°34'N 35°25'E", status: "TERRENO SECO 34°C" },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#03090d] border-y border-white/10 py-4 select-none">
      <div className="flex w-max animate-marquee space-x-12">
        {[...routes, ...routes].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4 text-xs font-mono-tech uppercase tracking-wider text-slate-300">
            <span className="flex items-center gap-1.5 text-[#4eedb8] font-bold">
              <Globe2 className="w-3.5 h-3.5" />
              {item.city}
            </span>
            <span className="text-white/40">[{item.coords}]</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
              {item.status}
            </span>
            <span className="text-[#4eedb8]/50">✦</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
      `}</style>
    </div>
  );
};
