"use client";

import { useState } from "react";
import { MessageSquare, Flag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { VoteButtons } from "@/components/vote-buttons";
import type { Comment } from "@/lib/mock-data";

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

interface CommentItemProps {
  comment: Comment;
  depth?: number;
}

function CommentItem({ comment, depth = 0 }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="group">
      <div className="flex gap-3">
        {depth > 0 && (
          <div className="flex flex-col items-center">
            <div className="w-px flex-1 bg-border" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex gap-3">
            <VoteButtons initialVotes={comment.votes} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback className="text-[8px]">
                    {comment.author.username[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {comment.author.username}
                </span>
                <span className="text-xs text-muted-foreground">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {comment.body}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1"
                  onClick={() => setShowReply(!showReply)}
                >
                  <MessageSquare className="h-3 w-3" />
                  Répondre
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-destructive gap-1"
                >
                  <Flag className="h-3 w-3" />
                  Signaler
                </Button>
              </div>
              {showReply && (
                <div className="mt-2 flex gap-2">
                  <Textarea
                    placeholder="Votre réponse..."
                    className="text-sm min-h-[60px] bg-muted/50"
                  />
                  <Button size="sm" className="self-end">
                    Envoyer
                  </Button>
                </div>
              )}
            </div>
          </div>
          {comment.replies.length > 0 && (
            <div className="ml-6 mt-3 space-y-3 border-l-2 border-border pl-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CommentThreadProps {
  comments: Comment[];
}

export function CommentThread({ comments }: CommentThreadProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
