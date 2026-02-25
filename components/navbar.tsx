"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gamepad2, Menu, X, Search, User, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-context";

export function Navbar({
  onSearch,
  searchQuery = "",
}: {
  onSearch?: (q: string) => void;
  searchQuery?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsScrolled(true);
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // NAV ITEMS LIST
  const navLinks = [
    { href: "/", icon: Gamepad2, label: "GAMES" },
    { href: "/order", icon: Gamepad2, label: "view orders" },
    { href: "/order/new", icon: Gamepad2, label: "make order" },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -110 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-slate-800/80 bg-slate-950/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.9)]"
          : "border-transparent bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: LOGO */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 shadow-[0_0_20px_rgba(15,23,42,1)] ring-1 ring-cyan-400/40 group-hover:ring-cyan-300/80 group-hover:shadow-[0_0_28px_rgba(34,211,238,0.8)] transition-all">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,#22d3ee33,transparent_55%),radial-gradient(circle_at_100%_100%,#38bdf833,transparent_55%)]" />
              <Zap className="relative h-5 w-5 text-cyan-300" />
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="hidden text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Detoersas
              </span>
              <span className="text-xl font-black tracking-tight text-slate-50">
                Game
                <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
                  Boys
                </span>
              </span>
            </div>
          </Link>

          {/* CENTER: SEARCH (DESKTOP) */}
          <div className="relative hidden flex-1 max-w-md md:block group">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search games, mirrors, or orders…"
              className="w-full rounded-full border border-slate-800 bg-slate-900/80 py-2 pl-10 pr-4 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/70 transition-all shadow-[0_0_18px_rgba(15,23,42,0.9)]"
            />
          </div>

          {/* RIGHT: NAV + AUTH + MOBILE TOGGLE */}
          <nav className="flex items-center gap-3">
            {/* DESKTOP LINKS */}
            <div className="hidden items-center gap-1 rounded-full bg-slate-900/60 px-1.5 py-1 lg:flex border border-slate-800/80 shadow-[0_10px_30px_rgba(15,23,42,0.9)]">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all",
                      isActive
                        ? "bg-cyan-500/20 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.45)] border border-cyan-400/60"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border border-transparent hover:border-cyan-400/40"
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5 text-cyan-300" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* AUTH */}
            {user ? (
              <UserMenu user={user} signOut={signOut} />
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  onClick={() => router.push("/signin")}
                  className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300 hover:text-slate-50"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.8)] hover:from-cyan-300 hover:to-sky-300 transition-colors"
                >
                  Join now
                </button>
              </div>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200 lg:hidden transition-colors"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6">
              {/* Mobile search */}
              <div className="relative mb-3 group">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch?.(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-full border border-slate-800 bg-slate-900/80 py-2 pl-10 pr-4 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/70 transition-all"
                />
              </div>

              <div className="space-y-1">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold tracking-wide transition-colors",
                        isActive
                          ? "bg-cyan-500/20 text-cyan-100 border border-cyan-400/60"
                          : "text-slate-200 hover:bg-slate-900/80 border border-transparent hover:border-cyan-400/40"
                      )}
                    >
                      <item.icon className="h-5 w-5 text-cyan-300" />
                      <span className="uppercase text-[11px] tracking-[0.14em]">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {!user && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      router.push("/signin");
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 hover:border-cyan-400/60 hover:text-cyan-100"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      router.push("/signup");
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.8)] hover:from-cyan-300 hover:to-sky-300"
                  >
                    Join
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function UserMenu({ user, signOut }: { user: any; signOut: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 p-1 pr-3 outline-none hover:border-cyan-400/70 hover:bg-slate-900 transition-all shadow-[0_0_18px_rgba(15,23,42,0.9)]">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-sky-400 text-slate-950 font-bold text-sm shadow-[0_0_18px_rgba(34,211,238,0.8)]">
          {user.name?.[0] || <User size={16} />}
        </div>
        <span className="max-w-[120px] truncate text-sm font-semibold text-slate-100">
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 border border-slate-800 bg-slate-950/95 text-slate-100 backdrop-blur-xl shadow-[0_20px_45px_rgba(15,23,42,1)]"
      >
        <DropdownMenuItem className="cursor-pointer gap-2 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 focus:bg-slate-900/80">
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-800" />
        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer gap-2 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-400 focus:bg-red-500/10"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
