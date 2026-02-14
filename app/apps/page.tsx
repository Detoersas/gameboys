"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { VersionFooter } from "@/components/version-footer";
import { 
  AppWindow, Search, TrendingUp, Sparkles, 
  Info, Play, Star, ShieldCheck, ShieldAlert 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const apps = [
  { id: "1", name: "MOVIES", url: "https://dexterisntfunny.carrd.co/#movies", description: "Stream movies and shows for free - regularly updated library", category: "Entertainment", hot: true },
  { id: "2", name: "Music", url: "https://dexteristalentedmusic.vercel.app", description: "Free music ported from spotify - no account required", category: "Entertainment" },
  { id: "3", name: "CHATGPT", url: "https://gptlite.vercel.app", description: "Free AI chatbot alternative - no account required", category: "AI Tools", new: true },
  { id: "4", name: "AI WRITER", url: "https://ahrefs.com", description: "Rewrite and improve paragraphs with AI-powered suggestions", category: "Productivity" },
  { id: "5", name: "HUMANIZER", url: "https://www.summarizer.org", description: "Transform AI-generated text into natural human writing", category: "Productivity" },
];

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  
  // State for IDs that should be hidden
  const [blockedIds, setBlockedIds] = useState<string[]>([]);

  // Load blocked IDs from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem("blocked-apps");
    if (saved) setBlockedIds(JSON.parse(saved));
  }, []);

  // Function to block and remove an app
  const handleBlockApp = (id: string) => {
    const updatedBlocked = [...blockedIds, id];
    setBlockedIds(updatedBlocked);
    localStorage.setItem("blocked-apps", JSON.stringify(updatedBlocked));
  };

  const categories = ["All", "Entertainment", "AI Tools", "Productivity"];

  // Filter out apps that are in the blockedIds list
  const filteredApps = apps.filter((app) => {
    if (blockedIds.includes(app.id)) return false;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // STAR EFFECT LOGIC (Keep original)
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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00a651] selection:text-black overflow-x-hidden">
      
      {/* STAR LAYER */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {clicks.map((click) => (
            <motion.div key={click.id} initial={{ opacity: 1, scale: 0, y: 0 }} animate={{ opacity: 0, scale: 1.5, y: -100 }} exit={{ opacity: 0 }} style={{ left: click.x - 12, top: click.y - 12, position: "absolute" }} className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.9)]">
              <Star size={24} fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
        
        {/* Header Section (Same Design) */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[#00a651]">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">Premium Collection</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter sm:text-6xl">
              APP<span className="text-[#00a651]">VAULT</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-md border-b-2 border-[#00a651]">
              <div className="text-xs font-bold text-white/40 uppercase tracking-tighter">Live Tools</div>
              <div className="text-2xl font-black text-[#00a651]">{filteredApps.length}</div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Same Design) */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("rounded-full px-6 py-2 text-xs font-black tracking-tighter uppercase transition-all border border-white/5", activeCategory === cat ? "bg-[#00a651] text-white shadow-[0_0_15px_rgba(0,166,81,0.5)] border-[#00a651]" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white")}>
              {cat}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => (
              <motion.div
                layout
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 backdrop-blur-md transition-all hover:border-[#00a651]/50"
              >
                <div className="absolute right-4 top-4 flex gap-2">
                  {app.hot && <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-400 border border-orange-500/30">HOT</span>}
                  {app.new && <span className="rounded-full bg-[#00a651]/20 px-2 py-0.5 text-[10px] font-bold text-[#00a651] border border-[#00a651]/30">NEW</span>}
                </div>

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a651]/20 text-[#00a651] shadow-inner">
                  <AppWindow className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-black italic tracking-tight group-hover:text-[#00a651] transition-colors">{app.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50 italic">{app.description}</p>

                {/* THE BUTTONS */}
                <div className="mt-6 flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-green-500/30 bg-green-500/10 py-2 text-[10px] font-black uppercase text-green-500 transition-all hover:bg-green-500 hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                    <ShieldCheck size={12} /> Working
                  </button>
                  
                  <button 
                    onClick={() => handleBlockApp(app.id)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 py-2 text-[10px] font-black uppercase text-red-500 transition-all hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  >
                    <ShieldAlert size={12} /> Blocked
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <a href={app.url} target="_blank" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00a651] hover:text-white transition-colors">
                    Launch App <Play className="h-3 w-3 fill-current" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
      <VersionFooter />
    </div>
  );
}
