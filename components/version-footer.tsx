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
    <footer className="relative mt-auto border-t border-[#00a651]/20 bg-black py-8 overflow-hidden">
      {/* Subtle scanline effect overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Brand Side */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#00a651] fill-[#00a651]" />
              <span className="text-sm font-black italic tracking-widest text-white uppercase">
                DEXTER<span className="text-[#00a651]">ISNT</span>FUNNY
              </span>
            </div>
            <p className="text-xs font-medium text-white/30 tracking-tight">
              GATEWAY TO GAMES • PROXIES • APPS
            </p>
          </div>

          {/* Diagnostic Side */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[10px] font-bold text-[#00a651] uppercase tracking-[0.2em] mb-1 flex items-center gap-1">
                <Terminal className="h-3 w-3" /> System Status
              </span>
              <span className="text-xs font-black text-white uppercase">Engine Stable</span>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">
                Build ID
              </span>
              <span className="text-xs font-mono font-bold text-[#00a651] drop-shadow-[0_0_5px_#00a651]">
                #{buildId.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">
                Firmware
              </span>
              <div className="flex items-center gap-2 rounded bg-white/5 px-2 py-0.5 border border-white/10">
                <span className="text-[10px] font-mono font-black text-white">v.{version}</span>
                <ShieldCheck className="h-3 w-3 text-[#00a651]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright/legal */}
        <div className="mt-8 text-center md:text-left border-t border-white/5 pt-4">
          <p className="text-[9px] font-medium text-white/20 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} DEXTER NETWORK. ALL ENCRYPTED PROTOCOLS ACTIVE.
          </p>
        </div>
      </div>
    </footer>
  );
}
