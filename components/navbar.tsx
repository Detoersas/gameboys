"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gamepad2, Globe, AppWindow, Menu, X, Search, User, LogOut, Bell, Zap } from "lucide-react"; // Fixed import
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

export function Navbar({ onSearch, searchQuery = "" }: { onSearch?: (q: string) => void; searchQuery?: string }) {
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

  // NAV ITEMS LIST - APPS IS HERE
  const navLinks = [
    { href: "/", icon: Gamepad2, label: "GAMES" }, 
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -110 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-[#00a651]/30 shadow-[0_0_20px_rgba(0,166,81,0.2)]" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-8">
          
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative overflow-hidden rounded-lg bg-[#00a651] p-1.5 transition-transform group-hover:scale-110 shadow-[0_0_15px_#00a651]">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="hidden text-xl font-black italic tracking-tighter text-white sm:block uppercase">
              Game<span className="text-[#00a651]">Boy</span>s
            </span>
          </Link>

          <div className="relative hidden flex-1 max-w-md md:block group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 group-focus-within:text-[#00a651]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-[#00a651] focus:outline-none transition-all"
            />
          </div>

          <nav className="flex items-center gap-4">
            <div className="hidden items-center gap-1 lg:flex mr-4">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-[11px] font-black tracking-widest transition-all rounded-md group",
                      isActive ? "text-[#00a651] bg-[#00a651]/10" : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {user ? (
              <UserMenu user={user} signOut={signOut} />
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => router.push("/signin")} className="text-[11px] font-black text-white/80 hover:text-white tracking-widest">
                  LOGIN
                </button>
                <button 
                  onClick={() => router.push("/signup")}
                  className="rounded bg-[#00a651] px-5 py-2 text-[11px] font-black uppercase text-white shadow-[0_0_15px_rgba(0,166,81,0.4)] hover:bg-[#00c862] tracking-widest transition-all"
                >
                  JOIN NOW
                </button>
              </div>
            )}

            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg text-white font-bold italic transition-colors hover:text-[#00a651]"
                >
                  <item.icon className="h-5 w-5 text-[#00a651]" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function UserMenu({ user, signOut }: { user: any, signOut: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pr-3 outline-none hover:bg-white/10 transition-all">
        <div className="h-8 w-8 rounded-full bg-[#00a651] flex items-center justify-center font-bold text-white">
          {user.name?.[0] || <User size={16} />}
        </div>
        <span className="text-sm font-bold text-white/80">{user.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-white/10 bg-black/90 text-white backdrop-blur-xl">
        <DropdownMenuItem className="focus:bg-[#00a651]/20 cursor-pointer font-bold py-2">
          PROFILE
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={signOut} className="text-red-400 focus:bg-red-500/10 cursor-pointer font-bold py-2">
          LOG OUT
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
