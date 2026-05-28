"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Trophy,
  Zap,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/mock-data";

const navItems = [
  { href: "/", label: "Feed", icon: LayoutDashboard },
  { href: "/sprint-vote", label: "Sprint Vote", icon: Zap },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/build-log", label: "Build Log", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar shrink-0">
      <nav className="flex flex-col gap-1 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
          Navigation
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-card hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border" />

      <nav className="flex flex-col gap-1 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
          Channels
        </p>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={`/?channel=${cat.value}`}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "text-muted-foreground hover:bg-card hover:text-foreground"
            )}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-border p-4">
        <div className="rounded-lg bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Sprint #04</p>
          </div>
          <p className="text-xs text-muted-foreground">
            App communautaire TFA52. 5 jours restants.
          </p>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[30%] rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </aside>
  );
}
