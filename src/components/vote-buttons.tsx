"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  initialVotes: number;
  direction?: "vertical" | "horizontal";
  size?: "sm" | "md";
}

export function VoteButtons({
  initialVotes,
  direction = "vertical",
  size = "md",
}: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null);
      setVotes(initialVotes);
    } else {
      setUserVote(type);
      setVotes(initialVotes + (type === "up" ? 1 : -1));
    }
  };

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div
      className={cn(
        "flex items-center gap-0.5",
        direction === "vertical" ? "flex-col" : "flex-row"
      )}
    >
      <button
        onClick={() => handleVote("up")}
        className={cn(
          "rounded-md p-1 transition-all hover:bg-success/20",
          userVote === "up"
            ? "text-success scale-110"
            : "text-muted-foreground hover:text-success"
        )}
      >
        <ChevronUp className={iconSize} strokeWidth={userVote === "up" ? 3 : 2} />
      </button>
      <span
        className={cn(
          "font-heading font-bold tabular-nums",
          size === "sm" ? "text-sm" : "text-base",
          userVote === "up" && "text-success",
          userVote === "down" && "text-destructive",
          !userVote && "text-foreground"
        )}
      >
        {votes}
      </span>
      <button
        onClick={() => handleVote("down")}
        className={cn(
          "rounded-md p-1 transition-all hover:bg-destructive/20",
          userVote === "down"
            ? "text-destructive scale-110"
            : "text-muted-foreground hover:text-destructive"
        )}
      >
        <ChevronDown className={iconSize} strokeWidth={userVote === "down" ? 3 : 2} />
      </button>
    </div>
  );
}
