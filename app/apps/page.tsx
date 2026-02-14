"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { VersionFooter } from "@/components/version-footer";
import { 
  AppWindow, Search, TrendingUp, Sparkles, 
  Info, Play, Star, ShieldCheck, ShieldAlert, RotateCcw, Save, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const apps =;

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [blockedIds, setBlockedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("blocked-apps");
    if (saved) setBlockedIds(JSON.parse(saved));
  }, []);

  const handleBlockApp = (id: string) => {
    const updatedBlocked = [...blockedIds, id];
    setBlockedIds(updatedBlocked);
    localStorage.setItem("blocked-apps", JSON.stringify(updatedBlocked));
  };

  const resetVault = () => {
    setBlockedIds([]);
    localStorage.removeItem("blocked-apps");
  };

  const filteredApps = apps.filter((app) => {
    if (blockedIds.includes(app.id)) return false;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // STAR EFFECT
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => setClicks((prev) => prev.filter((c) => c.id !== newClick.id)), 800);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00a651] overflow-x-hidden pb-24">
      
      {/* STAR LAYER */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {clicks.map((click) => (
            <motion.div key={click.id} initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 1.5, y: -100 }} style={{ left: click.x - 12, top: click.y - 12, position: "absolute" }} className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.9)]">
              <Star size={24} fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="relative mx-auto max-w-7xl px-4 py-12">
        {/* Header and Filter Pills (Keep your existing code here) */}
        
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => (
              <motion.div
                layout
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 backdrop-blur-md transition-all hover:border-[#00a651]/50"
              >
                <h3 className="text-xl font-black italic tracking-tight">{app.name}</h3>
                <p className="mt-2 text-sm text-white/50 italic">{app.description}</p>

                <div className="mt-6 flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-green-500/30 bg-green-500/10 py-2 text-[10px] font-black uppercase text-green-500 hover:bg-green-500 hover:text-white transition-all">
                    <ShieldCheck size={12} /> Working
                  </button>
                  <button 
                    onClick={() => handleBlockApp(app.id)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 py-2 text-[10px] font-black uppercase text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <ShieldAlert size={12} /> Blocked
                  </button>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <a href={app.url} target="_blank" className="flex items-center gap-2 text-xs font-black uppercase text-[#00a651] hover:text-white transition-colors">
                    Launch App <Play className="h-3 w-3 fill-current" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* MODIFIED VAULT CONTROL BAR */}
      <AnimatePresence>
        {blockedIds.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-[#00a651]/30 bg-black/80 p-2 pr-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-2 px-4 py-2 text-[#00a651]">
              <AlertTriangle size={16} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Modified Vault View</span>
            </div>

            <div className="h-6 w-[1px] bg-white/10" />

            <button 
              onClick={resetVault}
              className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <RotateCcw size={14} /> Reset
            </button>

            <button 
              className="flex items-center gap-2 rounded-xl bg-[#00a651] px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(0,166,81,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <Save size={14} /> Saved
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <VersionFooter />
    </div>
  );
}
