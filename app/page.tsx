"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { VersionFooter } from "@/components/version-footer";
import { Gamepad2, Zap, Trophy, Play, Cpu, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const games = [
  { name: "archive games", url: "https://thebasicss.vercel.app", description: "my own selection of games", category: "Premium", hot: true },
  { name: "babydoll games", url: "https://thebasicsss.vercel.app", description: "monkeygg", category: "=fun", hot: false },
  { name: "supernova", url: "https://sites.google.com/beaufortschools.org/supernova/home", description: "coming soon", category: "SCHOOL LOCATED", hot: true },
  { name: "Seraph", url: "https://basicsssss.vercel.app", description: "BEST OF THE BEST", category: "Premium", hot: true },
  { name: "games123", url: "https://notepad-40.a.ssl.fastly.net", description: "Fast-loading Nexora mirror with premium game collection", category: "New" },
  { name: "Geometry dash", url: "https://basicsssss.vercel.app/games/gdlite/index.html", description: "FAST GEOMETRY DASH", category: "Classic", hot: true },
  { name: "LUNAR", url: "https://lunar-nu.vercel.app", description: "Home of Retro Bowl and classic sports games", category: "Sports" },
  { name: "ROMS", url: "https://gba.vercel.app", description: "Play classic GBA and retro console games in your browser", category: "Retro" },
  { name: "COPPER", url: "https://clever-schools.vercel.app", description: "Clean interface with hand-picked quality games", category: "Premium" },
  { name: "SELENITE", url: "https://selenite-beta.vercel.app", description: "Huge library with hundreds of titles to explore", category: "Library" },
  { name: "MORE-LESS", url: "https://the-more-less-game-nuxt.vercel.app", description: "Challenging number guessing game - test your intuition", category: "Indie" },
  { name: "MINECRAFT", url: "https://supanoob.vercel.app", description: "Play Minecraft 1.9 directly in your browser", category: "Classic", hot: true },
  { name: "BEANSITE", url: "https://mb7.vercel.app", description: "Lightweight game portal with fast load times", category: "New" },
  { name: "???", url: "https://rule34dle.vercel.app", description: "Mystery guessing game with unique gameplay mechanics", category: "Indie" },
  { name: "PETEZAH", url: "https://thepetezah.vercel.app", description: "Community favorite with classic and modern games", category: "Classic" },
  { name: "STRANGE ROPE POLICE", url: "https://amazing-strange-rope-police.vercel.app", description: "Open-world action combining GTA with superhero powers", category: "Action", hot: true },
  { name: "VOTE", url: "https://gameboys.vercel.app/order/new", description: "Support the community - vote for your favorite games", category: "Social" },
  { name: "GN Math", url: "https://thebasic.vercel.app", description: "Has if not the best game catalog ever", category: "Premium", hot: true },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [engineStatus, setEngineStatus] = useState<"STABLE" | "UNSTABLE">("STABLE");

  // Terms popup state
  const [showTerms, setShowTerms] = useState(true);

  // Fake "searching the web" overlay state
  const [searching, setSearching] = useState(false);

  // Time gate – page only usable after 3:45 PM Eastern
  const [timeUnlocked, setTimeUnlocked] = useState(false);

  // 50/50 random engine status on load
  useEffect(() => {
    const randomStatus = Math.random() < 0.5 ? "STABLE" : "UNSTABLE";
    setEngineStatus(randomStatus);
  }, []);

  // Click trail (changed color + animation style)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 600);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Time gate: unlock at 3:45 PM Eastern (America/New_York)
  useEffect(() => {
    const checkUnlock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(now);

      const hourStr = parts.find((p) => p.type === "hour")?.value ?? "00";
      const minuteStr = parts.find((p) => p.type === "minute")?.value ?? "00";

      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      if (hour > 15 || (hour === 15 && minute >= 45)) {
        setTimeUnlocked(true);
      } else {
        setTimeUnlocked(false);
      }
    };

    checkUnlock();
    const interval = setInterval(checkUnlock, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const categories = ["All", "Premium", "Classic", "New", "Sports", "Retro"];

  const filteredGames = games.filter((game) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      game.name.toLowerCase().includes(q) ||
      game.description?.toLowerCase().includes(q);
    const matchesCategory = activeCategory === "All" || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-cyan-400 selection:text-slate-900">
      {/* CLICK TRAIL */}
      <div className="pointer-events-none fixed inset-0 z-[5]">
        <AnimatePresence>
          {clicks.map((click) => (
            <motion.div
              key={click.id}
              initial={{ opacity: 0.6, scale: 0.2, y: 0 }}
              animate={{ opacity: 0, scale: 1.5, y: -40 }}
              exit={{ opacity: 0 }}
              style={{ left: click.x - 10, top: click.y - 10, position: "absolute" }}
              className="text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            >
              <Star size={20} fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* BACKGROUND GRADIENTS */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-x-0 top-1/3 mx-auto h-40 w-[70%] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* TERMS POPUP */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="fixed inset-0 z-[50] flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              className="relative w-[95%] max-w-lg rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 sm:p-8 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                    System Notice
                  </p>
                  <p className="text-xs text-slate-400">Important terms before entering the SITE.</p>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-50 mb-3">
                Access Conditions
              </h2>

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-300 max-h-[50vh] overflow-y-auto pr-1">
                <p className="font-semibold text-cyan-300">Disclaimer</p>
                <p>
                  This portal is designed for independent use only. By continuing, you acknowledge
                  that you are responsible for how and where you access this content.
                </p>

                <p className="font-semibold text-cyan-300">Usage Restrictions</p>
                <p>
                  Do not present or distribute this portal in environments where it is not allowed.
                  Always follow your local rules and guidelines.
                </p>

                <p className="font-semibold text-cyan-300">Responsibility</p>
                <p>
                  You assume full responsibility for any consequences that may occur if these
                  conditions are ignored.
                </p>

                <p className="font-semibold text-cyan-300">Agreement</p>
                <p>
                  By selecting "Enter Vault", you confirm that you understand and agree to these
                  conditions.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => {
                    setShowTerms(false);
                    setSearching(true);
                    setTimeout(() => {
                      setSearching(false);
                    }, 4000);
                  }}
                  className="w-full sm:w-auto rounded-full bg-cyan-400 px-6 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-slate-900 shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:bg-cyan-300 transition-colors"
                >
                  Enter Site
                </button>

                <p className="text-[10px] text-slate-500 text-center sm:text-right">
                  If you disagree, close this tab.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAKE "SEARCHING" OVERLAY */}
      <AnimatePresence>
        {searching && (
          <motion.div
            className="fixed inset-0 z-[40] flex items-center justify-center bg-slate-950/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-[90%] max-w-md rounded-3xl border border-slate-700/60 bg-slate-900/90 p-7 shadow-[0_0_45px_rgba(15,23,42,0.9)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                  <Cpu className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
                    Network Check
                  </p>
                  <p className="text-xs text-slate-400">
                    Calibrating connection and scanning your environment…
                  </p>
                </div>
              </div>

              <div className="mt-2 mb-5">
                <p className="text-xs font-medium text-slate-200 mb-2">
                  Preparing secure tunnel for GAMES.
                </p>
                <div className="h-1.5 w-full rounded-full bg-slate-700/60 overflow-hidden">
                  <motion.div
                    className="h-full w-1/3 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-between text-[10px] text-slate-500">
                <span>Simulated scan</span>
                <span>Do not close this tab</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {timeUnlocked ? (
        <>
          <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

          <main className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
            {/* TOP SECTION */}
            <div className="mb-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] md:items-end">
              <div>
                <div className="hidden inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-3">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>Game Hub</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                  <span className="text-slate-50">Game</span>
                  <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
                    BOYS
                  </span>
                </h1>
                <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-400">
                  NOT FOR SCHOOL USAGE
                </p>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <div className="flex items-center gap-3 self-stretch md:self-auto">
                  <div className="flex-1 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4 shadow-inner">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="inline-flex items-center gap-1">
                        <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                        Engine
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        ?
                      </span>
                    </div>
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-[0.15em] uppercase",
                        engineStatus === "STABLE"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                          : "bg-red-500/15 text-red-300 border border-red-500/40 animate-pulse"
                      )}
                    >
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          engineStatus === "STABLE" ? "bg-emerald-400" : "bg-red-400"
                        )}
                      />
                      {engineStatus}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CATEGORY FILTERS */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Filters
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all",
                      activeCategory === cat
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                        : "border-slate-700/70 bg-slate-900/60 text-slate-400 hover:text-slate-100 hover:border-cyan-400/60"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* GAME GRID */}
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredGames.map((game) => (
                  <motion.div
                    layout
                    key={game.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.7)] transition-all hover:border-cyan-400/70 hover:bg-slate-900"
                  >
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cyan-500/15 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 text-cyan-300 shadow-inner">
                        <Gamepad2 className="h-7 w-7" />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {game.hot && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-orange-300 border border-orange-400/40">
                            <Zap className="h-3 w-3 fill-orange-300" /> HOT
                          </span>
                        )}
                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          {game.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-black tracking-tight text-slate-50 group-hover:text-cyan-100">
                        {game.name}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-400 group-hover:text-slate-200 line-clamp-3">
                        {game.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <a
                        href={game.url}
                        target="_blank"
                        className="group/play inline-flex items-center gap-2 rounded-lg bg-cyan-500/15 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-200 hover:bg-cyan-400 hover:text-slate-900 shadow-md transition-all"
                      >
                        <span>Play</span>
                        <Play className="h-3.5 w-3.5 group-hover/play:translate-x-0.5 transition-transform" />
                      </a>

                      <div className="flex flex-col items-end">
                        <span className="text-[9px] text-slate-500 uppercase tracking-[0.16em]">
                          Activity
                        </span>
                        <div className="mt-1 h-1.5 w-16 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 group-hover:w-full transition-all duration-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </main>

          <VersionFooter />
        </>
      ) : (
        // LOCKED SCREEN
        <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex items-center gap-3 text-cyan-300">
            <Gamepad2 className="h-7 w-7" />
            <span className="text-[11px] font-black uppercase tracking-[0.26em] text-cyan-400/80">
              Access Locked
            </span>
          </div>

          <h1 className="mb-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-50">
            Portal opens at
            <span className="ml-2 bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
              3:45 PM Eastern
            </span>
          </h1>

          <p className="mb-6 max-w-md text-sm sm:text-base text-slate-400">
            GAMEVAULT services are offline until the scheduled window. The index, search, and launch
            buttons will activate once the timer completes.
          </p>

          <div className="flex flex-col items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span>Waiting for boot sequence…</span>
            </div>

            <div className="h-1 w-44 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full w-1/2 bg-gradient-to-r from-cyan-400 to-sky-500"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
