"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SUGGESTED_TAGS = [
  "social",
  "ia",
  "mobile",
  "dev-tools",
  "gamification",
  "productivité",
  "no-code",
  "marketplace",
  "startup",
  "open-source",
  "design",
];

export default function NewPostPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au feed
      </Link>

      <h1 className="font-heading text-2xl font-bold mb-6">
        Poster une idée folle
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Titre</label>
          <Input
            placeholder="Un titre accrocheur pour ton idée..."
            className="bg-card"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            placeholder="Décris ton idée en détail. Problème, solution, pourquoi c'est génial..."
            className="bg-card min-h-[160px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Catégorie</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all",
                  selectedCategory === cat.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30"
                )}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tags{" "}
            <span className="text-muted-foreground font-normal">
              (optionnel)
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/20"
                )}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            Annuler
          </Link>
          <Button className="flex-1">Publier mon idée</Button>
        </div>
      </div>
    </div>
  );
}
