'use client';

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Wand2, Users, Flame, Star, Clock } from "lucide-react";
import PromptCard from "@/components/marketplace/PromptCard";

const mockPrompts = [
  { id: 1, title: 'E-commerce Product Description Generator', author: 'MarketingMaster', likes: 125, remixes: 42, category: 'Marketing', isPremium: false },
  { id: 2, title: 'Children\'s Bedtime Story Creator', author: 'StoryTeller', likes: 302, remixes: 88, category: 'Writing', isPremium: true },
  { id: 3, title: 'Generate SVG Wave Patterns', author: 'CodeWizard', likes: 450, remixes: 150, category: 'Developer Tools', isPremium: false },
  { id: 4, title: 'Minimalist Logo Design Concepts', author: 'DesignDiva', likes: 210, remixes: 60, category: 'Design', isPremium: false },
  { id: 5, title: 'Business Plan Outline Generator', author: 'BizGuru', likes: 98, remixes: 30, category: 'Business', isPremium: true },
  { id: 6, title: 'Lesson Plan Creator for Teachers', author: 'EduCreator', likes: 180, remixes: 75, category: 'Education', isPremium: false },
  { id: 7, 'title': 'Create a blog post about AI', 'author': 'WriterBot', 'likes': 250, 'remixes': 100, 'category': 'Writing', 'isPremium': false },
  { id: 8, 'title': 'Social media ad copy for a fashion brand', 'author': 'AdGenius', 'likes': 180, 'remixes': 70, 'category': 'Marketing', 'isPremium': true }
];

export default function MarketplacePage() {
  return (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
                Prompt Marketplace
            </h2>
            <p className="text-muted-foreground">Discover, share, and remix prompts from the IdemuAI community.</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search prompts..." className="pl-10" />
            </div>
            <div className="flex gap-4">
                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="developer">Developer Tools</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Sort by: Popular" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="popular">
                          <div className="flex items-center gap-2"><Flame className="h-4 w-4" /> Popular</div>
                        </SelectItem>
                        <SelectItem value="newest">
                           <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Newest</div>
                        </SelectItem>
                        <SelectItem value="top-rated">
                           <div className="flex items-center gap-2"><Star className="h-4 w-4" /> Top Rated</div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockPrompts.map(prompt => (
                <PromptCard key={prompt.id} {...prompt} />
            ))}
        </div>
    </div>
  );
}
