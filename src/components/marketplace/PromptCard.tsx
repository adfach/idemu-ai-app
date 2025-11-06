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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, GitFork, Star } from "lucide-react";
import Link from 'next/link';

interface PromptCardProps {
  id: number;
  title: string;
  author: string;
  likes: number;
  remixes: number;
  category: string;
  isPremium: boolean;
}

const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('');

export default function PromptCard({ title, author, likes, remixes, category, isPremium }: PromptCardProps) {
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
            <Avatar className="h-8 w-8">
                <AvatarImage src={`https://i.pravatar.cc/40?u=${author}`} />
                <AvatarFallback>{getInitials(author)}</AvatarFallback>
            </Avatar>
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
        <Button size="sm">
            Remix
        </Button>
      </CardFooter>
    </Card>
  );
}
