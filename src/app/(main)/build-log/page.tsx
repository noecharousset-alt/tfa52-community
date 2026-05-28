"use client";

import { useState } from "react";
import { BookOpen, Hammer, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { buildLogEntries, type PollOption } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function PollWidget({
  question,
  options,
}: {
  question: string;
  options: PollOption[];
}) {
  const [votedId, setVotedId] = useState<string | null>(null);
  const total = options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
      <p className="text-sm font-semibold mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((option) => {
          const pct = Math.round((option.votes / total) * 100);
          return (
            <button
              key={option.id}
              onClick={() => setVotedId(option.id)}
              className={cn(
                "w-full relative text-left transition-all",
                votedId === option.id && "scale-[1.02]"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between text-sm px-3 py-2 rounded-lg border relative overflow-hidden transition-colors",
                  votedId === option.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div
                  className="absolute inset-0 bg-primary/5 rounded-lg"
                  style={{ width: `${pct}%` }}
                />
                <span className="relative z-10 font-medium">
                  {option.label}
                </span>
                <span className="relative z-10 text-xs text-muted-foreground font-mono">
                  {pct}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {total} votes au total
      </p>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BuildLogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="font-heading text-3xl font-bold">Build Log</h1>
        </div>
        <p className="text-muted-foreground">
          Les coulisses des sprints. Transparence totale.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />

        <div className="space-y-6">
          {buildLogEntries.map((entry) => (
            <div key={entry.id} className="relative flex gap-4">
              <div className="hidden sm:flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card border border-border z-10">
                  <Hammer className="h-5 w-5 text-primary" />
                </div>
              </div>
              <Card className="flex-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant="secondary" className="gap-1">
                      Sprint #{entry.sprintNumber}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(entry.createdAt)}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-lg">
                    {entry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                    {entry.body}
                  </p>

                  {entry.poll && (
                    <PollWidget
                      question={entry.poll.question}
                      options={entry.poll.options}
                    />
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={entry.author.avatar} />
                      <AvatarFallback className="text-[10px]">
                        {entry.author.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {entry.author.username}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
