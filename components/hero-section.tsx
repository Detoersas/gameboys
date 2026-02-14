"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87ceeb] via-[#b0e0e6] to-[#98d8a0]" />
      
      {/* Clouds */}
      <div className="absolute top-8 left-[10%] h-12 w-24 rounded-full bg-white/80 blur-sm" />
      <div className="absolute top-12 left-[15%] h-8 w-16 rounded-full bg-white/80 blur-sm" />
      <div className="absolute top-6 right-[20%] h-10 w-20 rounded-full bg-white/80 blur-sm" />
      <div className="absolute top-10 right-[25%] h-6 w-12 rounded-full bg-white/80 blur-sm" />
      
      {/* Hills */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#7cb342]" />
      <div className="absolute bottom-20 left-[5%] h-24 w-48 rounded-t-full bg-[#8bc34a]" />
      <div className="absolute bottom-16 right-[10%] h-20 w-40 rounded-t-full bg-[#9ccc65]" />
      
      {/* Water */}
      <div className="absolute bottom-8 left-[30%] h-8 w-[40%] rounded-full bg-[#4fc3f7]/60" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Main Heading */}
        <h1 className="mb-8 text-center">
          <span className="text-2xl font-bold text-[#00a651] sm:text-3xl md:text-4xl">
            dexterisntfunny
          </span>
          <span className="text-2xl font-light text-[#00a651] sm:text-3xl md:text-4xl">
            {" "}is your gaming hub
          </span>
        </h1>
        
        {/* Feature Bubbles */}
        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {/* Bubble 1 */}
          <div className="w-full max-w-[220px] rounded-2xl bg-white/95 p-4 text-center shadow-lg backdrop-blur-sm">
            <h3 className="mb-2 text-base font-bold text-[#00a651] sm:text-lg">
              Huge Game Library
            </h3>
            <p className="text-xs text-gray-600 sm:text-sm">
              Games - Proxies - Apps
            </p>
            <p className="mt-1 text-xs text-gray-500">
              All your favorites
            </p>
            <ChevronDown className="mx-auto mt-2 h-5 w-5 text-[#00a651]" />
          </div>
          
          {/* Bubble 2 */}
          <div className="w-full max-w-[220px] rounded-2xl border-2 border-[#00a651] bg-white/95 p-4 text-center shadow-lg backdrop-blur-sm">
            <h3 className="mb-2 text-base font-bold text-[#00a651] sm:text-lg">
              Trusted by students
            </h3>
            <p className="text-xs text-gray-600 sm:text-sm">
              Over <strong>100+</strong> games available
            </p>
            <p className="text-xs text-gray-600 sm:text-sm">
              More than <strong>1000</strong> users
            </p>
            <ChevronDown className="mx-auto mt-2 h-5 w-5 text-[#00a651]" />
          </div>
          
          {/* Bubble 3 */}
          <div className="w-full max-w-[220px] rounded-2xl bg-white/95 p-4 text-center shadow-lg backdrop-blur-sm">
            <h3 className="mb-2 text-base font-bold text-[#00a651] sm:text-lg">
              Always Updated
            </h3>
            <p className="text-xs text-gray-600 sm:text-sm">
              New Games - Working Proxies
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Daily Updates
            </p>
            <ChevronDown className="mx-auto mt-2 h-5 w-5 text-[#00a651]" />
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-[#00a651] px-8 py-3 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#008c45] sm:text-lg"
          >
            Welcome
          </Link>
        </div>
      </div>
      
      {/* Decorative Elements */}
      {/* Hot Air Balloon */}
      <div className="absolute left-[8%] top-[20%] hidden sm:block">
        <div className="h-16 w-12 rounded-t-full bg-[#f7c948]" />
        <div className="mx-auto h-4 w-6 bg-[#8b4513]" />
      </div>
      
      {/* Kite */}
      <div className="absolute right-[12%] top-[15%] hidden sm:block">
        <div className="h-8 w-8 rotate-45 bg-[#ff6b6b]" />
      </div>
      
      {/* Paper Plane */}
      <div className="absolute right-[30%] top-[25%] hidden sm:block">
        <div className="h-0 w-0 border-b-[12px] border-l-[20px] border-b-transparent border-l-[#f7c948]" />
      </div>
    </section>
  );
}
