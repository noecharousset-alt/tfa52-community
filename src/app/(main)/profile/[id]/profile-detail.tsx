"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, MessageSquare, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { UserBadge } from "@/components/user-badge";
import { PostCard } from "@/components/post-card";
import { users, posts } from "@/lib/mock-data";

export function ProfileDetail({ id }: { id: string }) {
  const user = users.find((u) => u.id === id) ?? users[0];
  const userPosts = posts.filter((p) => p.author.id === user.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au feed
      </Link>

      <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
        <Avatar className="h-20 w-20 border-4 border-primary/30">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-2xl">{user.username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold">{user.username}</h1>
          <p className="text-muted-foreground text-sm mt-1">{user.bio}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Membre depuis{" "}
              {new Date(user.joinedAt).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {user.badges.map((badge) => (
              <UserBadge key={badge} badge={badge} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <Card>
          <CardContent className="text-center p-4">
            <p className="font-heading text-2xl font-bold text-primary">
              {user.karma.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Karma</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <p className="font-heading text-2xl font-bold">
              {user.postsCount}
            </p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <p className="font-heading text-2xl font-bold">
              {user.commentsCount}
            </p>
            <p className="text-xs text-muted-foreground">Commentaires</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-6" />

      <Tabs defaultValue="posts">
        <TabsList className="mb-4">
          <TabsTrigger value="posts" className="gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Posts ({userPosts.length})
          </TabsTrigger>
          <TabsTrigger value="comments" className="gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            Commentaires
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {userPosts.length > 0 ? (
            <div className="space-y-3">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Aucun post pour le moment.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="comments">
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              Les commentaires de {user.username} apparaîtront ici.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
