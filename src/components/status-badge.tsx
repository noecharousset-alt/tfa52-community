import { cn } from "@/lib/utils";
import { STATUS_CONFIG, type PostStatus } from "@/lib/mock-data";

interface StatusBadgeProps {
  status: PostStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        "bg-card border border-border"
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", config.color)} />
      {config.label}
    </span>
  );
}
