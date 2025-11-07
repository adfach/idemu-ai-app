'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, GitFork, Star } from "lucide-react";
import Link from 'next/link';
import { useLanguage } from "@/hooks/use-language";

interface PromptCardProps {
  id: number;
  title: string;
  author: string;
  likes: number;
  remixes: number;
  category: string;
  isPremium: boolean;
}

export default function PromptCard({ title, author, likes, remixes, category, isPremium }: PromptCardProps) {
  const { t } = useLanguage();
  return (
    <Card className="glass-card flex h-full flex-col transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
            <Badge variant="secondary">{category}</Badge>
            {isPremium && (
                <Badge variant="default" className="bg-gradient-to-r from-primary to-purple-500">
                    <Star className="mr-1 h-3 w-3" />
                    Premium
                </Badge>
            )}
        </div>
        <CardTitle className="font-headline pt-2 text-lg h-14 overflow-hidden">
            {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">by {author}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                <span>{remixes}</span>
            </div>
        </div>
        <Button asChild size="sm">
          <Link href="/dashboard">{t('prompt_card.remix')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
