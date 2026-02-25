"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { VersionFooter } from "@/components/version-footer";
import { Gamepad2, Zap, Trophy, Play, Cpu, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const games = [
  { name: "request new game or get custom domain or website", url: "https://gameboys.vercel.app/order/new", description: "make order now", category: "Premium", hot: true },
  { name: "archive games", url: "thebasicss.vercel.app", description: "my own selection of games", category: "Premium", hot: true },
  { name: "babydoll games", url: "thebasicsss.vercel.app", description: "monkeygg", category: "=fun", hot: false },
  { name: "supernova", url: "https://sites.google.com/beaufortschools.org/supernova/home", description: "coming soon", category: "SCHOOL LOCATED", hot: true },
  { name: "Seraph", url: "basicsssss.vercel.app", description: "BEST OF THE BEST", category: "Premium", hot: true },
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
  { name: "PETEZAH", url: "thepetezah.vercel.app", description: "Community favorite with classic and modern games", category: "Classic" },
  { name: "STRANGE ROPE POLICE", url: "https://amazing-strange-rope-police.vercel.app", description: "Open-world action combining GTA with superhero powers", category: "Action", hot: true },
  { name: "VOTE", url: "https://gameboys.vercel.app/order/new", description: "Support the community - vote for your favorite games", category: "Social" },
  { name: "GN Math", url: "thebasic.vercel.app", description: "Has if not the best game catalog ever", category: "Premium", hot: true },
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

  // Click star trail
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

  // Time gate: unlock at 3:45 PM Eastern (approx, UTC-5)
 useEffect(() => {
  const checkUnlock = () => {
    // Get the current time in America/New_York, including DST
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

    // Unlock when time in Eastern is 15:45 (3:45 PM) or later
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
    const matchesSearch =
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00a651] selection:text-black overflow-x-hidden">
      {/* TERMS POPUP OVERLAY */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-[95%] max-w-xl rounded-2xl border border-emerald-400/40 bg-[#020202] p-6 sm:p-8 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              <div className="mb-4 flex items-center gap-2 text-emerald-300">
                <Star className="h-6 w-6 text-emerald-400" fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-[0.25em]">
                  System Access Notice
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-300 mb-3 uppercase">
                School Use Prohibited
              </h2>

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-white/80 max-h-[55vh] overflow-y-auto pr-1">
                <p className="font-semibold text-emerald-300">Disclaimer & Terms of Use</p>
                <p>
                  This material is provided strictly for independent educational purposes only. It is
                  intended for personal study, review, or private, home-based learning.
                </p>

                <p className="font-semibold text-emerald-300">Forbidden Use</p>
                <p>
                  DO NOT use, display, distribute, or present this material within any school,
                  classroom, school-sponsored activity, or academic institution.
                </p>

                <p className="font-semibold text-emerald-300">Penalties for Violation</p>
                <p>
                  If this material is used in violation of this policy within a school setting, the
                  user assumes all personal responsibility for the consequences. Such action may
                  result in:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-white/80">
                  <li>Immediate confiscation of the material.</li>
                  <li>
                    Disciplinary action, punishment, or fines imposed by the school administration,
                    according to their internal policies.
                  </li>
                  <li>
                    Liability for any legal or administrative costs incurred by the school due to this
                    unauthorized use.
                  </li>
                </ul>

                <p className="font-semibold text-emerald-300">Agreement</p>
                <p>
                  By accessing this material, you agree to these terms and confirm that you are not
                  using this site in any school or school-related environment.
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => {
                    // hide terms + show fake searching overlay for 4s
                    setShowTerms(false);
                    setSearching(true);
                    setTimeout(() => {
                      setSearching(false);
                    }, 4000);
                  }}
                  className="w-full sm:w-auto rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-black shadow-[0_0_25px_rgba(16,185,129,0.7)] hover:bg-emerald-300 transition-colors"
                >
                  Accept & Continue
                </button>

                <p className="text-[10px] text-white/40 text-center sm:text-right">
                  If you do not agree, close this tab immediately.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAKE "SEARCHING THE WEB" OVERLAY */}
      <AnimatePresence>
        {searching && (
          <motion.div
            className="fixed inset-0 z-[190] flex items-center justify-center bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-[90%] max-w-md rounded-3xl border border-emerald-400/40 bg-[#020202] p-8 shadow-[0_0_50px_rgba(16,185,129,0.5)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Cpu className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
                    Verifying IP ADDRESS
                  </p>
                  <p className="text-xs text-white/50">
                    Checking if you are located in the School…
                  </p>
                </div>
              </div>

              <div className="mt-2 mb-4">
                <p className="text-xs font-medium text-white/70 mb-2">
                  This is an extremely advanced system…
                </p>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full w-1/3 bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-400"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-between text-[10px] text-white/40">
                <span>Simulated network scan</span>
                <span>Do not close this tab</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[45%] w-[45%] rounded-full bg-[#00a651]/10 blur-[140px]" />
        <div className="absolute bottom-[5%] -right-[5%] h-[35%] w-[35%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      {/* MAIN CONTENT – GATED BY TIME */}
      {timeUnlocked ? (
        <>
          <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

          <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[#00a651]">
                  <Trophy className="h-5 w-5 animate-bounce" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#00a651]/80">
                    Elite Gaming Portal
                  </span>
                </div>
                <h1 className="text-5xl font-black italic tracking-tighter sm:text-7xl">
                  GAME<span className="text-[#00a651]">VAULT</span>
                </h1>
                <p className="mt-2 max-w-md text-white/40 font-medium italic leading-relaxed">
                  Unrestricted access to the world's most popular titles, optimized for zero-latency
                  performance.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="hidden rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-md border-b-2 border-b-[#00a651] sm:block">
                  <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase">
                    <Cpu className="h-3 w-3 text-[#00a651]" /> Engine Status
                  </div>
                  <div
                    className={cn(
                      "text-2xl font-black uppercase tracking-tighter",
                      engineStatus === "STABLE" ? "text-white" : "text-red-500 animate-pulse"
                    )}
                  >
                    {engineStatus}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-6 py-2 text-xs font-black tracking-tighter uppercase transition-all border border-white/5",
                    activeCategory === cat
                      ? "bg-[#00a651] text-white shadow-[0_0_20px_rgba(0,166,81,0.5)] border-[#00a651]"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game) => (
                  <motion.div
                    layout
                    key={game.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-md transition-all hover:border-[#00a651]/50 hover:shadow-[0_0_40px_rgba(0,166,81,0.2)]"
                  >
                    <div className="absolute right-4 top-4 flex gap-2">
                      {game.hot && (
                        <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-black text-orange-400 border border-orange-500/20 uppercase tracking-tighter">
                          <Zap className="h-3 w-3 fill-orange-400" /> HOT
                        </span>
                      )}
                    </div>

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00a651]/30 to-[#00a651]/5 text-[#00a651] transition-all group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                      <Gamepad2 className="h-8 w-8" />
                    </div>

                    <h3 className="text-2xl font-black italic tracking-tight group-hover:text-[#00a651] transition-colors uppercase">
                      {game.name}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/30 group-hover:text-white/60 transition-colors line-clamp-2 italic">
                      {game.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <a
                        href={game.url}
                        target="_blank"
                        className="group/btn flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#00a651] transition-all bg-[#00a651]/10 px-4 py-2 rounded-lg hover:bg-[#00a651] hover:text-white shadow-lg"
                      >
                        PLAY NOW <Play className="h-3 w-3 fill-current" />
                      </a>

                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.1em]">
                          {game.category}
                        </span>
                        <div className="mt-1 h-1 w-8 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full w-2/3 bg-[#00a651] group-hover:w-full transition-all duration-500" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#00a651]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </main>

          <VersionFooter />
        </>
      ) : (
        // LOCKED SCREEN BEFORE 3:45 PM EASTERN
        <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex items-center gap-3 text-[#00a651]">
            <Gamepad2 className="h-7 w-7" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#00a651]/80">
              Access Locked
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Portal opens at <span className="text-[#00a651]">3:45 PM Eastern</span>
          </h1>

          <p className="text-sm sm:text-base text-white/50 max-w-md mb-6">
            GAMEVAULT engines are currently offline. Check back at the scheduled unlock time. Until
            then, the game index, search, and links remain disabled.
          </p>

          <div className="flex flex-col items-center gap-3 text-xs text-white/30">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#00a651]" />
              <span>Waiting for scheduled boot sequence…</span>
            </div>

            <div className="h-1 w-40 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full w-1/2 bg-[#00a651]"
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
