"use client";

import Link from "next/link";
import { MessageSquare, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VoteButtons } from "@/components/vote-buttons";
import { StatusBadge } from "@/components/status-badge";
import { CATEGORIES, type Post } from "@/lib/mock-data";

interface PostCardProps {
  post: Post;
}

function timeAgo(dateStr: string): string {
  const now = new Date("2026-05-28T12:00:00");
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "à l'instant";
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "hier";
  return `il y a ${days}j`;
}

export function PostCard({ post }: PostCardProps) {
  const category = CATEGORIES.find((c) => c.value === post.category);

  return (
    <div className="group flex gap-3 rounded-xl bg-card border border-border p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <VoteButtons initialVotes={post.votes} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          {category && (
            <span className="text-xs text-muted-foreground">
              {category.emoji} {category.label}
            </span>
          )}
          <StatusBadge status={post.status} />
        </div>

        <Link
          href={`/post/${post.id}`}
          className="block"
        >
          <h3 className="font-heading font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {post.body}
          </p>
        </Link>

        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs text-muted-foreground">
            <Link
              href={`/post/${post.id}`}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {post.commentCount}
            </Link>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo(post.createdAt)}
            </span>
            <Link
              href={`/profile/${post.author.id}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="text-[8px]">
                  {post.author.username[0]}
                </AvatarFallback>
              </Avatar>
              <span>{post.author.username}</span>
            </Link>
          </div>
        </div>

        {post.isPoll && post.pollOptions && (
          <div className="mt-3 space-y-2">
            {post.pollOptions.map((option) => {
              const total = post.pollOptions!.reduce(
                (sum, o) => sum + o.votes,
                0
              );
              const pct = Math.round((option.votes / total) * 100);
              return (
                <div key={option.id} className="relative">
                  <div className="flex items-center justify-between text-sm px-3 py-2 rounded-lg border border-border bg-muted/50 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      style={{ width: `${pct}%` }}
                    />
                    <span className="relative z-10 font-medium">
                      {option.label}
                    </span>
                    <span className="relative z-10 text-xs text-muted-foreground font-mono">
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
