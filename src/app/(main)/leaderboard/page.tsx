import { Trophy, Medal, Crown, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserBadge } from "@/components/user-badge";
import { users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const sortedUsers = [...users].sort((a, b) => b.karma - a.karma);

const podiumIcons = [Crown, Trophy, Medal];
const podiumColors = ["text-yellow-400", "text-muted-foreground", "text-amber-600"];

export default function LeaderboardPage() {
  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="h-6 w-6 text-primary" />
          <h1 className="font-heading text-3xl font-bold">Leaderboard</h1>
        </div>
        <p className="text-muted-foreground">
          Les builders les plus actifs de la communauté
        </p>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[top3[1], top3[0], top3[2]].map((user, visualIndex) => {
          const rank = visualIndex === 1 ? 0 : visualIndex === 0 ? 1 : 2;
          const PodiumIcon = podiumIcons[rank];
          return (
            <Link
              key={user.id}
              href={`/profile/${user.id}`}
              className={cn(
                "flex flex-col items-center text-center p-4 rounded-xl border border-border bg-card transition-all hover:border-primary/30",
                rank === 0 && "ring-1 ring-primary/30 -mt-4"
              )}
            >
              <PodiumIcon className={cn("h-6 w-6 mb-2", podiumColors[rank])} />
              <Avatar
                className={cn(
                  "mb-2 border-2",
                  rank === 0
                    ? "h-16 w-16 border-primary"
                    : "h-12 w-12 border-border"
                )}
              >
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
              <p className="font-heading font-semibold text-sm">
                {user.username}
              </p>
              <p className="text-primary font-heading font-bold text-lg">
                {user.karma.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">karma</p>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {user.badges.slice(0, 2).map((badge) => (
                  <UserBadge key={badge} badge={badge} />
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <Separator className="mb-6" />

      {/* Rest of leaderboard */}
      <div className="space-y-2">
        {rest.map((user, index) => (
          <Link key={user.id} href={`/profile/${user.id}`}>
            <Card className="transition-all hover:border-primary/30">
              <CardContent className="flex items-center gap-4 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground font-heading font-bold text-sm">
                  {index + 4}
                </span>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{user.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.postsCount} posts &middot; {user.commentsCount}{" "}
                    commentaires
                  </p>
                </div>
                <div className="flex gap-1">
                  {user.badges.slice(0, 2).map((badge) => (
                    <UserBadge key={badge} badge={badge} />
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-primary">
                    {user.karma.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground">karma</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-8">
        {[
          {
            icon: Star,
            label: "Membres actifs",
            value: "1,247",
          },
          {
            icon: Trophy,
            label: "Idées postées",
            value: "342",
          },
          {
            icon: Medal,
            label: "Votes cette semaine",
            value: "8,921",
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex flex-col items-center text-center p-4">
              <stat.icon className="h-5 w-5 text-primary mb-1" />
              <p className="font-heading font-bold text-xl">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
