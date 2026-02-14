"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { VersionFooter } from "@/components/version-footer";
import { 
  Globe, Search, Zap, Shield, Play, Activity, Star 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// UPDATED LINKS RESTORED
const proxies = [
  {
    name: "RAMMERHEAD",
    url: "https://rammerheaddnssucks.infotechnology.com/",
    description: "High-performance browser-based proxy with unique session persistence.",
    category: "High Speed",
    hot: true,
  },
  {
    name: "Shadow",
    url: "https://novalogic.tejidosdedignidad.org/",
    description: "The gold standard for school unblocking. Highly customizable and fast.",
    category: "Stealth",
    new: true,
  },
  {
    name: "overclocked",
    url: "https://watch.national-birdshow.com/",
    description: "V4 Galactic routing for bypassing the toughest firewalls and filters.",
    category: "Premium",
  },
  {
    name: "quazar",
    url: "https://quasarwithskbyte.infotechnology.com/",
    description: "Reliable web proxy that supports YouTube and modern web apps perfectly.",
    category: "High Speed",
  },
  {
    name: "quazar",
    url: "https://learnskquasar-tech.infotechnology.com/",
    description: "Legacy stealth technology optimized for privacy and anonymous surfing.",
    category: "Stealth",
  },
  {
    name: "PROXY FINDER",
    url: "https://sites.google.com/beaufortschools.org/geodash-funds/proxy-finder-1",
    description: "Sleek, minimalist gateway built for speed and low-latency web gaming.",
    category: "Premium",
  },
];

export default function ProxiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  // RED STAR CLICK LOGIC
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 800);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const categories = ["All", "High Speed", "Stealth", "Premium"];

  const filteredProxies = proxies.filter((prox) => {
    const matchesSearch = prox.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prox.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || prox.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00a651] selection:text-black font-sans overflow-x-hidden">
      
      {/* RED STAR POPUPS */}
      <div className="pointer-events-none fixed inset-0 z-[100]">
        <AnimatePresence>
          {clicks.map((click) => (
            <motion.div
              key={click.id}
              initial={{ opacity: 1, scale: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 0, scale: 1.5, y: -100, rotate: 45 }}
              exit={{ opacity: 0 }}
              style={{ left: click.x - 10, top: click.y - 10, position: "absolute" }}
              className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
            >
              <Star size={24} fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-[#00a651]/10 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] h-[30%] w-[30%] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[#00a651]">
              <Shield className="h-5 w-5 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">Encrypted Gateways</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter sm:text-6xl">
              PROX<span className="text-[#00a651]">FLOW</span>
            </h1>
            <p className="mt-2 max-w-md text-white/50 italic leading-relaxed">
              Bypass school restrictions with our collection of high-performance stealth proxies.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-md border-b-2 border-b-[#00a651]">
              <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase">
                <Activity className="h-3 w-3 text-[#00a651]" /> Network Load
              </div>
              <div className="text-2xl font-black text-white uppercase tracking-widest">MINIMAL</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-6 py-2 text-xs font-bold tracking-tighter uppercase transition-all border border-white/5",
                activeCategory === cat 
                  ? "bg-[#00a651] text-white shadow-[0_0_20px_rgba(0,166,81,0.4)] border-[#00a651]" 
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Proxy Card Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProxies.map((prox) => (
              <motion.div
                layout
                key={prox.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-md transition-all hover:border-[#00a651]/50 hover:shadow-[0_0_30px_rgba(0,166,81,0.15)]"
              >
                <div className="absolute right-4 top-4 flex gap-2">
                  {prox.hot && (
                    <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-black text-orange-400 border border-orange-500/20 uppercase tracking-tighter">
                      <Zap className="h-3 w-3 fill-orange-400" /> ULTRA
                    </span>
                  )}
                  {prox.new && (
                    <span className="rounded-full bg-[#00a651]/10 px-2 py-0.5 text-[10px] font-black text-[#00a651] border border-[#00a651]/20 animate-pulse uppercase tracking-tighter">
                      FRESH
                    </span>
                  )}
                </div>

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00a651]/20 to-[#00a651]/5 text-[#00a651] shadow-inner">
                  <Globe className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-black italic tracking-tight group-hover:text-[#00a651] transition-colors uppercase">
                  {prox.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40 group-hover:text-white/70 transition-colors italic">
                  {prox.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={prox.url}
                    target="_blank"
                    className="group/btn flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#00a651] transition-all bg-[#00a651]/10 px-4 py-2 rounded-lg hover:bg-[#00a651] hover:text-white"
                  >
                    CONNECT <Play className="h-3 w-3 fill-current" />
                  </a>
                  <div className="flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00a651] shadow-[0_0_8px_#00a651]" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-tighter">SECURE</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProxies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Globe className="h-16 w-16 text-white/10 mb-4" />
            <h2 className="text-2xl font-black italic uppercase text-white/20 tracking-widest">Node Not Found</h2>
          </div>
        )}
      </main>

      <VersionFooter />
    </div>
  );
}
