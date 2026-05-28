"use client";

import Link from "next/link";
import { Bell, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { users, notifications } from "@/lib/mock-data";

const currentUser = users[0];
const unreadCount = notifications.filter((n) => !n.read).length;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm">
            52
          </div>
          <span className="font-heading text-xl font-bold hidden sm:block">
            TFA52
          </span>
        </Link>

        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une idée, un membre..."
              className="pl-9 bg-card border-border"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/new"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 h-7 text-sm font-medium hover:bg-primary/80 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Poster</span>
          </Link>

          <Link href="/notifications" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-destructive text-white border-2 border-background">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href={`/profile/${currentUser.id}`}>
            <Avatar className="h-8 w-8 border-2 border-primary/50 cursor-pointer hover:border-primary transition-colors">
              <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
              <AvatarFallback>{currentUser.username[0]}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
