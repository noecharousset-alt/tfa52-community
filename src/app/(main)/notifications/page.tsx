import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  MessageSquare,
  TrendingUp,
  Star,
  Award,
  AtSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeIcons = {
  reply: MessageSquare,
  "vote-threshold": TrendingUp,
  "idea-retained": Star,
  badge: Award,
  mention: AtSign,
};

const typeColors = {
  reply: "text-chart-5",
  "vote-threshold": "text-primary",
  "idea-retained": "text-success",
  badge: "text-purple",
  mention: "text-chart-4",
};

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

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au feed
      </Link>

      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-6 w-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Notifications</h1>
        {unread.length > 0 && (
          <span className="flex h-6 items-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
            {unread.length} nouvelles
          </span>
        )}
      </div>

      {unread.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Non lues
          </p>
          <div className="space-y-2">
            {unread.map((notif) => {
              const Icon = typeIcons[notif.type];
              return (
                <Link key={notif.id} href={notif.link}>
                  <Card className="transition-all hover:border-primary/30 border-primary/20 bg-primary/5">
                    <CardContent className="flex items-start gap-3 p-4">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card",
                          typeColors[notif.type]
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {timeAgo(notif.createdAt)}
                        </p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Lues
          </p>
          <div className="space-y-2">
            {read.map((notif) => {
              const Icon = typeIcons[notif.type];
              return (
                <Link key={notif.id} href={notif.link}>
                  <Card className="transition-all hover:border-primary/30">
                    <CardContent className="flex items-start gap-3 p-4">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card",
                          typeColors[notif.type]
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">
                          {notif.message}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          {timeAgo(notif.createdAt)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
