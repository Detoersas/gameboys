"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { VersionFooter } from "@/components/version-footer";
import { Sparkles } from "lucide-react";

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState("");
  const [percent, setPercent] = useState(0);
  const [tagline, setTagline] = useState("");
  const [quote, setQuote] = useState("");
  const [rgbMode, setRgbMode] = useState(false);
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showUI, setShowUI] = useState(false);

  const taglines = [
    "Igniting the next generation",
    "Where creativity meets velocity",
    "A universe of tools in one place",
    "Built for speed, designed for you",
    "The future is loading",
  ];

  const quotes = [
    "“The stars don’t look bigger, but they do look brighter.”",
    "“Somewhere, something incredible is waiting to be known.”",
    "“i dont goon. aiden b”",
    "“Go beyond what you know.”",
  ];

  // Random tagline + quote
  useEffect(() => {
    setTagline(taglines[Math.floor(Math.random() * taglines.length)]);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Countdown + progress bar
  useEffect(() => {
    const target = Date.now() + 47 * 60 * 60 * 1000;
    const total = 47 * 60 * 60 * 1000;

    const update = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Launching Now");
        setPercent(100);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      const progress = ((total - diff) / total) * 100;
      setPercent(progress);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // RGB MODE SECRET TRIGGER
  useEffect(() => {
    let buffer = "";

    const handler = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();

      if (buffer.includes("supernova")) {
        setRgbMode(true);
      }

      if (buffer.length > 12) buffer = buffer.slice(-12);

      if (e.key === "Escape") {
        setRgbMode(false);
        buffer = "";
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // CLICK‑TO‑SPAWN RED STAR
  const spawnStar = (e: React.MouseEvent) => {
    const id = Date.now();
    const x = e.clientX;
    const y = e.clientY;

    setStars((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setStars((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  };

  // SHOW UI WHEN CURSOR IS NEAR TOP OR BOTTOM
  const handleMouseMove = (e: React.MouseEvent) => {
    const threshold = 120;
    if (e.clientY < threshold || e.clientY > window.innerHeight - threshold) {
      setShowUI(true);
    } else {
      setShowUI(false);
    }
  };

  return (
    <div
      onClick={spawnStar}
      onMouseMove={handleMouseMove}
      className={`relative flex min-h-screen flex-col overflow-hidden text-white transition-all duration-500 ${
        rgbMode ? "animate-rgb" : ""
      }`}
    >
      {/* CLICK STARS */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-starburst"
          style={{
            top: star.y,
            left: star.x,
          }}
        >
          <div className="absolute inset-0 rotate-45 rounded-full bg-red-500 blur-sm opacity-80" />
          <div className="absolute inset-0 rounded-full bg-red-400 blur-md opacity-60" />
        </div>
      ))}

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#05050a]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/stars.png')",
            backgroundRepeat: "repeat",
            animation: "drift 120s linear infinite",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "url('/noise.png')",
            mixBlendMode: "overlay",
          }}
        />

        <div
          className="absolute left-1/2 top-1/2 h-[1400px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,0,150,0.25), transparent 70%)",
            animation: "pulse 12s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* AUTO-HIDE NAVBAR */}
      <div
        className={`transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
      </div>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div
          className={`transition-opacity duration-500 ${
            showUI ? "opacity-100" : "opacity-0"
          }`}
        >
          <PageHeader
            title="Supernova"
            description={tagline}
            icon={Sparkles}
          />
        </div>

        {/* Countdown */}
        <p className="mt-4 text-xl font-medium text-muted-foreground">
          Launching in{" "}
          <span className="font-semibold text-white drop-shadow">
            {timeLeft}
          </span>
        </p>

        {/* Progress Bar */}
        <div className="mt-6 w-full max-w-md">
          <div className="h-2 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-sm opacity-70">{percent.toFixed(1)}% complete</p>
        </div>

        {/* Glass Info Card */}
        <div className="mt-10 max-w-lg rounded-xl bg-white/10 p-6 backdrop-blur-xl">
          <p className="text-lg italic opacity-90">{quote}</p>
        </div>

        {/* Loader */}
        <div className="mt-10 h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      </main>

      {/* AUTO-HIDE FOOTER */}
      <div
        className={`transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0"
        }`}
      >
        <VersionFooter />
      </div>

      {/* RED STAR BUTTON (LINK TO MAIN SITE) */}
      <button
        onClick={() => (window.location.href = "https://yourwebsite.com")}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-red-600 shadow-xl hover:bg-red-700 transition-all flex items-center justify-center animate-pulse"
      >
        <span className="text-3xl">★</span>
      </button>

      {/* KEYFRAMES */}
      <style jsx global>{`
        @keyframes drift {
          from { transform: translate(0, 0); }
          to { transform: translate(-500px, -500px); }
        }
        @keyframes pulse {
          from { transform: scale(1); opacity: 0.4; }
          to { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes rgbCycle {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .animate-rgb {
          animation: rgbCycle 4s linear infinite;
        }
        @keyframes starburst {
          0% { transform: scale(0.2); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-starburst {
          animation: starburst 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
