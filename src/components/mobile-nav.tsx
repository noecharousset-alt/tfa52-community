"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Zap,
  Trophy,
  BookOpen,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/sprint-vote", label: "Vote", icon: Zap },
  { href: "/new", label: "Poster", icon: Plus, accent: true },
  { href: "/leaderboard", label: "Top", icon: Trophy },
  { href: "/build-log", label: "Log", icon: BookOpen },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-border bg-background/90 backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors",
              item.accent
                ? "text-primary-foreground"
                : pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
            )}
          >
            {item.accent ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary -mt-5 shadow-lg shadow-primary/25">
                <item.icon className="h-5 w-5" />
              </div>
            ) : (
              <item.icon className="h-5 w-5" />
            )}
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
