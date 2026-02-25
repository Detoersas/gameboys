"use client";

import { useState, useEffect } from "react";
import { Zap, Terminal, ShieldCheck } from "lucide-react";

export function VersionFooter() {
  const [version, setVersion] = useState("0.0.0");
  const [buildId, setBuildId] = useState(0);

  useEffect(() => {
    // Generates a random version number (e.g., 70.25.999)
    const major = Math.floor(Math.random() * 99) + 1;
    const minor = Math.floor(Math.random() * 99);
    const patch = Math.floor(Math.random() * 999);

    // Generates a random Build ID through 1,000,000
    const randomBuild = Math.floor(Math.random() * 1000000) + 1;

    setVersion(`${major}.${minor}.${patch}`);
    setBuildId(randomBuild);
  }, []);

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-800/80 bg-slate-950/95">
      {/* Background glow / grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-4rem] bottom-[-3rem] h-52 w-52 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-60" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand / description */}
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/80 px-2.5 py-1 shadow-[0_0_18px_rgba(15,23,42,0.9)]">
              <div className="relative flex h-6 w-6 items-center justify-center rounded-xl bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,#22d3ee44,transparent_55%)]" />
                <Zap className="relative h-3.5 w-3.5 text-cyan-300" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-300">
                game
                <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
                  boys
                </span>
                repo
              </span>
            </div>

            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
              Gateway to games • proxies • apps
            </p>
          </div>

          {/* Diagnostics */}
          <div className="flex flex-wrap justify-center gap-4 text-xs md:justify-end md:gap-6">
            <div className="flex flex-col items-center md:items-end">
              <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                <Terminal className="h-3 w-3" />
                System status
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 border border-emerald-500/40">
                Engine stable
              </span>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Build ID
              </span>
              <span className="rounded-md bg-slate-900/80 px-2 py-0.5 text-[11px] font-mono font-bold tracking-wide text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]">
                #{buildId.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Firmware
              </span>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-0.5">
                <span className="text-[11px] font-mono font-black text-slate-100">v.{version}</span>
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-5 border-t border-slate-800/80 pt-3">
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.24em] text-slate-500 md:text-left">
            &copy; {new Date().getFullYear()} Gameboys Network · All encrypted protocols active.
          </p>
        </div>
      </div>
    </footer>
  );
}
