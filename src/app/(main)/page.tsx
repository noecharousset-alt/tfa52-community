"use client";

import { useState } from "react";
import { Flame, Clock, TrendingUp } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { posts, type Post } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type SortMode = "hot" | "new" | "top";

const sortTabs: { value: SortMode; label: string; icon: typeof Flame }[] = [
  { value: "hot", label: "Hot", icon: Flame },
  { value: "new", label: "New", icon: Clock },
  { value: "top", label: "Top", icon: TrendingUp },
];

function sortPosts(items: Post[], mode: SortMode): Post[] {
  const sorted = [...items];
  switch (mode) {
    case "hot":
      return sorted.sort((a, b) => {
        const aScore =
          a.votes / (Date.now() - new Date(a.createdAt).getTime());
        const bScore =
          b.votes / (Date.now() - new Date(b.createdAt).getTime());
        return bScore - aScore;
      });
    case "new":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "top":
      return sorted.sort((a, b) => b.votes - a.votes);
  }
}

export default function FeedPage() {
  const [sortMode, setSortMode] = useState<SortMode>("hot");
  const sortedPosts = sortPosts(posts, sortMode);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold mb-1">
          Bienvenue sur TFA52
        </h1>
        <p className="text-muted-foreground text-sm">
          Donne-nous tes idées les plus folles, on les réalise.
        </p>
      </div>

      <div className="flex items-center gap-1 mb-6 bg-card rounded-lg p-1 border border-border w-fit">
        {sortTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSortMode(tab.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
              sortMode === tab.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
