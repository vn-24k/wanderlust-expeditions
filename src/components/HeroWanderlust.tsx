import React, { useState } from "react";
import {
  Compass,
  Search,
  Globe,
  ArrowRight,
  Play,
  Plane,
  Building2,
  Sparkles,
  ArrowUpDown,
  Calendar,
  Users,
  Star,
  ShieldCheck,
  Headphones,
  CalendarCheck2,
  Lock,
  ChevronRight,
  SlidersHorizontal,
  X
} from "lucide-react";

interface HeroWanderlustProps {
  onOpenCockpit: () => void;
  onExploreClick: () => void;
}

export const HeroWanderlust: React.FC<HeroWanderlustProps> = ({ onOpenCockpit, onExploreClick }) => {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "experiences">("flights");
  const [fromCity, setFromCity] = useState("New York (JFK)");
  const [toCity, setToCity] = useState("Bali, Indonesia");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const destinations = [
    {
      name: "Santorini",
      country: "Greece",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Maldives",
      country: "Indian Ocean",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Swiss Alps",
      country: "Switzerland",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Bali",
      country: "Indonesia",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050d12] flex flex-col justify-between overflow-hidden">
      {/* Background Image: Aerial tropical cliffs with turquoise lagoon & golden horizon */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2560&q=85"
          alt="Coastal cliffs and ocean"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.88] contrast-[1.05]"
        />
        {/* Subtle cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d12] via-slate-950/20 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/60" />
      </div>

      {/* Flight Route Path SVG Overlay (exact dotted line from reference) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block" viewBox="0 0 1440 900" fill="none">
        <path
          d="M 680 200 Q 750 320 640 480 Q 560 600 680 720"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="route-path"
        />
        {/* Small airplane on path */}
        <g transform="translate(675, 205) rotate(45)">
          <path d="M0 0 L12 4 L6 6 L4 12 Z" fill="#4eedb8" />
        </g>
        {/* Destination Pin marker */}
        <g transform="translate(625, 470)">
          <circle cx="15" cy="15" r="14" fill="#4eedb8" fillOpacity="0.2" className="animate-ping" />
          <circle cx="15" cy="15" r="10" fill="#4eedb8" />
          <circle cx="15" cy="15" r="4" fill="#050d12" />
        </g>
      </svg>

      {/* 1. TOP NAVIGATION BAR */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-9 h-9 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/20 flex items-center justify-center text-[#4eedb8] shadow-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-[0.2em] text-white font-cinzel leading-none">
              WANDERLUST
            </span>
            <span className="text-[9px] font-mono-tech tracking-[0.3em] text-slate-300 uppercase mt-0.5 opacity-80">
              EXPLORE. DREAM. DISCOVER.
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
          <a href="#destinations" className="hover:text-[#4eedb8] transition-colors flex items-center gap-1">
            <span>Destinations</span>
            <ChevronRight className="w-3 h-3 rotate-90 opacity-60" />
          </a>
          <a href="#experiences" className="hover:text-[#4eedb8] transition-colors flex items-center gap-1">
            <span>Experiences</span>
            <ChevronRight className="w-3 h-3 rotate-90 opacity-60" />
          </a>
          <a href="#trips" className="hover:text-[#4eedb8] transition-colors">Trips</a>
          <a href="#about" className="hover:text-[#4eedb8] transition-colors">About Us</a>
          <a href="#blog" className="hover:text-[#4eedb8] transition-colors">Blog</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="text-slate-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
            <Search className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center gap-1 text-xs font-mono-tech text-slate-300 px-2.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-[#4eedb8]" />
            <span>EN</span>
            <ChevronRight className="w-3 h-3 rotate-90 opacity-60" />
          </div>

          {/* Cockpit Drawer Trigger (Organized Subsystem Drawer) */}
          <button
            onClick={onOpenCockpit}
            className="px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 backdrop-blur-md text-xs font-mono-tech text-[#4eedb8] flex items-center gap-2 transition-all hover:scale-105"
            title="Abrir Central de Telemetria e Instrumentação de Voo"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Painel de Bordo (22)</span>
          </button>

          {/* Plan Your Trip CTA */}
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 rounded-full bg-[#4eedb8] hover:bg-[#3de2ad] text-slate-950 font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#4eedb8]/25 transition-all hover:scale-105"
          >
            <span>Plan Your Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. HERO MAIN CONTENT & SEARCH WIDGET */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono-tech uppercase tracking-[0.25em] text-[#4eedb8] mb-4">
            <span className="w-6 h-[1.5px] bg-[#4eedb8]" />
            <span>THE WORLD IS WAITING</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-editorial font-bold text-white leading-[1.05] tracking-tight mb-6">
            Adventures <br />
            <span className="italic font-normal">That Stay</span> <br />
            With You
          </h1>

          <p className="text-base sm:text-lg text-slate-200/90 font-light max-w-xl leading-relaxed mb-8">
            Discover breathtaking destinations, unique experiences and unforgettable memories across the globe with our precision flight logistics.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-full bg-[#4eedb8] hover:bg-[#3de2ad] text-slate-950 font-bold text-sm tracking-wide flex items-center gap-2 shadow-xl shadow-[#4eedb8]/30 transition-all hover:scale-105"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-3.5 text-white group p-2 rounded-full hover:bg-white/5 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-white/[0.1] backdrop-blur-md border border-white/20 flex items-center justify-center text-[#4eedb8] group-hover:scale-110 group-hover:bg-[#4eedb8] group-hover:text-slate-950 transition-all shadow-md">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold tracking-wide text-white group-hover:text-[#4eedb8] transition-colors">
                  Watch Video
                </span>
                <span className="text-[11px] font-mono-tech text-slate-300/80">
                  See Wanderlust in action
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Floating Frosted Glass Search Widget */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-[420px] rounded-3xl p-6 glass-panel border border-white/15 shadow-2xl shadow-black/60 relative">
            <h3 className="text-2xl font-bold font-editorial text-white">
              Where to next?
            </h3>
            <p className="text-xs text-slate-300 font-light mt-0.5 mb-5">
              Find your perfect escape
            </p>

            {/* Segmented Picker Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-black/40 border border-white/10 mb-5">
              <button
                onClick={() => setActiveTab("flights")}
                className={`py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === "flights"
                    ? "bg-white/15 text-white font-semibold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Flights</span>
              </button>
              <button
                onClick={() => setActiveTab("hotels")}
                className={`py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === "hotels"
                    ? "bg-white/15 text-white font-semibold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Hotels</span>
              </button>
              <button
                onClick={() => setActiveTab("experiences")}
                className={`py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === "experiences"
                    ? "bg-white/15 text-white font-semibold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Experiences</span>
              </button>
            </div>

            {/* From & To inputs with Swap Button */}
            <div className="relative flex flex-col gap-3 mb-4">
              <div className="flex flex-col p-3 rounded-2xl bg-black/30 border border-white/10 focus-within:border-[#4eedb8]/50 transition-colors">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4eedb8]" />
                  From
                </span>
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-white focus:outline-none mt-1"
                />
              </div>

              {/* Swap Button */}
              <button
                onClick={swapCities}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-slate-300 hover:text-[#4eedb8] hover:border-[#4eedb8]/40 transition-all shadow-md z-10"
                title="Inverter origem e destino"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>

              <div className="flex flex-col p-3 rounded-2xl bg-black/30 border border-white/10 focus-within:border-[#4eedb8]/50 transition-colors">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  To
                </span>
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-white focus:outline-none mt-1"
                />
              </div>
            </div>

            {/* Dates & Travelers */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-2xl bg-black/30 border border-white/10 flex flex-col">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#4eedb8]" />
                  Dates
                </span>
                <span className="text-xs font-semibold text-white mt-1">May 20 - May 30</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-white/10 flex flex-col">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-[#4eedb8]" />
                  Travelers
                </span>
                <span className="text-xs font-semibold text-white mt-1">2 Adults</span>
              </div>
            </div>

            {/* Search Flights CTA */}
            <button
              onClick={onExploreClick}
              className="w-full py-3.5 rounded-2xl bg-[#4eedb8] hover:bg-[#3de2ad] text-slate-950 font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#4eedb8]/20 transition-all hover:scale-[1.02]"
            >
              <span>Search Flights</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* 3. POPULAR DESTINATIONS & TRUST INDICATORS (BOTTOM HERO BAR) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Left: Popular Destinations Carousel Preview */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-white tracking-wide">
                Popular Destinations
              </span>
              <a href="#destinations" className="text-xs font-mono-tech text-[#4eedb8] hover:underline">
                View all
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {destinations.map((dest, i) => (
                <div
                  key={i}
                  className="relative h-28 rounded-2xl overflow-hidden border border-white/15 glass-card group cursor-pointer"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono-tech text-white flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h5 className="text-xs font-bold text-white truncate">{dest.name}</h5>
                    <span className="text-[10px] text-slate-300 font-mono-tech truncate block">{dest.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Trust Badges in Frosted Capsule */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-2xl glass-panel border border-white/10">
              <div className="flex flex-col items-center text-center p-2 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#4eedb8] mb-1.5" />
                <span className="text-[10px] font-medium text-slate-200 leading-tight">Best Price Guarantee</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl">
                <Headphones className="w-5 h-5 text-[#4eedb8] mb-1.5" />
                <span className="text-[10px] font-medium text-slate-200 leading-tight">24/7 Travel Support</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl">
                <CalendarCheck2 className="w-5 h-5 text-[#4eedb8] mb-1.5" />
                <span className="text-[10px] font-medium text-slate-200 leading-tight">Flexible Bookings</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl">
                <Lock className="w-5 h-5 text-[#4eedb8] mb-1.5" />
                <span className="text-[10px] font-medium text-slate-200 leading-tight">Secure Payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. STATS STRIP (At very bottom) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold font-editorial text-white">500+</span>
            <span className="text-xs font-mono-tech text-slate-400 mt-0.5">Destinations</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold font-editorial text-white">10K+</span>
            <span className="text-xs font-mono-tech text-slate-400 mt-0.5">Happy Travelers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold font-editorial text-white">150+</span>
            <span className="text-xs font-mono-tech text-slate-400 mt-0.5">Travel Experts</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl md:text-3xl font-bold font-editorial text-white">4.9</span>
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <span className="text-xs font-mono-tech text-slate-400 mt-0.5">Average Rating</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden glass-panel border border-white/20 p-2 shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#4eedb8] hover:text-slate-950 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Wanderlust Expedition Reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
