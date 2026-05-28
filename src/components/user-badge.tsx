"use client";

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { BADGES, type BadgeType } from "@/lib/mock-data";

interface UserBadgeProps {
  badge: BadgeType;
}

export function UserBadge({ badge }: UserBadgeProps) {
  const config = BADGES[badge];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-2 py-0.5 text-xs cursor-default">
          <span>{config.emoji}</span>
          <span className="font-medium">{config.label}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
