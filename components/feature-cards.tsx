import Link from "next/link";
import { Gamepad2, Globe, AppWindow, ChevronRight } from "lucide-react";

export function FeatureCards() {
  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Feature Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {/* For Gamers Card */}
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center">
              <div className="relative">
                <div className="absolute -left-1 -top-1 h-10 w-10 rounded bg-[#00a651] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">GAME</span>
                </div>
                <div className="absolute left-3 top-3 h-10 w-10 rounded bg-[#f7c948] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#5a4a00]">HUB</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#00a651]">
                For serious gamers
              </h3>
              <p className="text-sm text-gray-600">
                Access the best unblocked games and create your own path to fun.
              </p>
              <Link
                href="/"
                className="mt-1 inline-flex items-center text-sm font-medium text-[#00a651] hover:underline"
              >
                Take a look
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* For Independent Users Card */}
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center">
              <div className="relative">
                <div className="absolute -left-1 -top-1 h-10 w-10 rounded bg-[#2196f3] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">PRO</span>
                </div>
                <div className="absolute left-3 top-3 h-10 w-10 rounded bg-[#4caf50] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">XY</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#00a651]">
                For independent users
              </h3>
              <p className="text-sm text-gray-600">
                Yes, dexterisntfunny is for everyone!
              </p>
              <Link
                href="/proxies"
                className="mt-1 inline-flex items-center text-sm font-medium text-[#00a651] hover:underline"
              >
                Take a look
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Games Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#9c27b0] text-sm font-bold text-white">
                G
              </div>
              <h3 className="text-xl font-bold text-[#9c27b0]">Games</h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Browser games, Minecraft, Retro Bowl, action games, puzzle games, and more.
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Action</span>
                <Link href="/" className="text-[#00a651] hover:underline">
                  19 games &gt;
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Puzzle</span>
                <Link href="/" className="text-[#00a651] hover:underline">
                  12 games &gt;
                </Link>
              </div>
            </div>
          </div>

          {/* Proxies Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#00bcd4] text-sm font-bold text-white">
                P
              </div>
              <h3 className="text-xl font-bold text-[#00bcd4]">Proxies</h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Fast proxies, web unblockers, VPN alternatives, and bypass tools.
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Fast</span>
                <Link href="/prox" className="text-[#00a651] hover:underline">
                  3 proxies &gt;
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tools</span>
                <Link href="/prox" className="text-[#00a651] hover:underline">
                  2 tools &gt;
                </Link>
              </div>
            </div>
          </div>

          {/* Apps Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#ff9800] text-sm font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold text-[#ff9800]">Apps</h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Movies, AI tools, ChatGPT alternatives, writing tools, and more.
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">AI</span>
                <Link href="/apps" className="text-[#00a651] hover:underline">
                  2 apps &gt;
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Media</span>
                <Link href="/apps" className="text-[#00a651] hover:underline">
                  2 apps &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
