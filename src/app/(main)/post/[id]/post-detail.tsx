"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Flag, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { VoteButtons } from "@/components/vote-buttons";
import { StatusBadge } from "@/components/status-badge";
import { CommentThread } from "@/components/comment-thread";
import { UserBadge } from "@/components/user-badge";
import { posts, comments, CATEGORIES } from "@/lib/mock-data";

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

export function PostDetail({ id }: { id: string }) {
  const post = posts.find((p) => p.id === id) ?? posts[0];
  const postComments = comments[post.id] ?? [];
  const category = CATEGORIES.find((c) => c.value === post.category);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au feed
      </Link>

      <article>
        <div className="flex gap-4">
          <VoteButtons initialVotes={post.votes} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {category && (
                <span className="text-sm text-muted-foreground">
                  {category.emoji} {category.label}
                </span>
              )}
              <StatusBadge status={post.status} />
            </div>
            <h1 className="font-heading text-2xl font-bold mb-3">
              {post.title}
            </h1>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
              {post.body}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {post.isPoll && post.pollOptions && (
              <div className="mt-4 space-y-2">
                {post.pollOptions.map((option) => {
                  const total = post.pollOptions!.reduce(
                    (sum, o) => sum + o.votes,
                    0
                  );
                  const pct = Math.round((option.votes / total) * 100);
                  return (
                    <button
                      key={option.id}
                      className="w-full relative text-left"
                    >
                      <div className="flex items-center justify-between text-sm px-4 py-3 rounded-lg border border-border bg-muted/50 relative overflow-hidden hover:border-primary/30 transition-colors">
                        <div
                          className="absolute inset-0 bg-primary/10 rounded-lg"
                          style={{ width: `${pct}%` }}
                        />
                        <span className="relative z-10 font-medium">
                          {option.label}
                        </span>
                        <span className="relative z-10 text-muted-foreground font-mono">
                          {option.votes} votes ({pct}%)
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex items-center gap-4 mt-6">
              <Link
                href={`/profile/${post.author.id}`}
                className="flex items-center gap-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.author.karma} karma
                  </p>
                </div>
              </Link>
              <div className="flex gap-1 flex-wrap">
                {post.author.badges.slice(0, 2).map((badge) => (
                  <UserBadge key={badge} badge={badge} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-auto">
                {timeAgo(post.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                <Share2 className="h-3.5 w-3.5" />
                Partager
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
              >
                <Flag className="h-3.5 w-3.5" />
                Signaler
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Separator className="my-6" />

      <section>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold">
            {post.commentCount} commentaires
          </h2>
        </div>

        <div className="mb-6">
          <Textarea
            placeholder="Ajoute ton commentaire..."
            className="bg-card min-h-[80px] mb-2"
          />
          <div className="flex justify-end">
            <Button size="sm">Commenter</Button>
          </div>
        </div>

        {postComments.length > 0 ? (
          <CommentThread comments={postComments} />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              Pas encore de commentaires. Sois le premier !
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
