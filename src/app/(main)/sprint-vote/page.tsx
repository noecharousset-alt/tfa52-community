"use client";

import { useState, useEffect } from "react";
import { Zap, Trophy, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sprintCandidates, type SprintCandidate } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function SprintVotePage() {
  const [votedId, setVotedId] = useState<string | null>(null);
  const countdown = useCountdown("2026-06-01T00:00:00");

  const sorted = [...sprintCandidates].sort(
    (a, b) => b.totalVotes - a.totalVotes
  );
  const totalVotes = sorted.reduce((sum, c) => sum + c.totalVotes, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="font-heading text-3xl font-bold">Sprint Vote</h1>
        </div>
        <p className="text-muted-foreground">
          Vote pour la prochaine app que l&apos;équipe va builder en sprint !
        </p>

        <div className="flex items-center justify-center gap-6 mt-6">
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit} className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-card border border-border">
                <span className="font-heading text-2xl font-bold text-primary">
                  {String(countdown[unit]).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                {unit === "days"
                  ? "jours"
                  : unit === "hours"
                    ? "heures"
                    : unit === "minutes"
                      ? "min"
                      : "sec"}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          <Clock className="inline h-3 w-3 mr-1" />
          Le vote se termine le 1er juin 2026
        </p>
      </div>

      <Separator className="mb-6" />

      <div className="space-y-3">
        {sorted.map((candidate, index) => {
          const pct = Math.round((candidate.totalVotes / totalVotes) * 100);
          const isFirst = index === 0;

          return (
            <Card
              key={candidate.id}
              className={cn(
                "transition-all overflow-hidden",
                votedId === candidate.id && "border-primary ring-1 ring-primary",
                isFirst && "border-primary/50"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full font-heading font-bold text-sm",
                        isFirst
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </span>
                    {isFirst && (
                      <Trophy className="h-4 w-4 text-primary" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-base">
                      {candidate.post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {candidate.post.body}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        par {candidate.post.author.username}
                      </span>
                      <div className="flex gap-1">
                        {candidate.post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[10px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium">
                          {candidate.totalVotes} votes
                        </span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isFirst ? "bg-primary" : "bg-purple"
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={votedId === candidate.id ? "default" : "secondary"}
                    className="shrink-0 gap-1.5"
                    onClick={() =>
                      setVotedId(
                        votedId === candidate.id ? null : candidate.id
                      )
                    }
                  >
                    {votedId === candidate.id ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Voté
                      </>
                    ) : (
                      "Voter"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
