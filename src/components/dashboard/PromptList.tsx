'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2, Library, PlusCircle } from "lucide-react";

const mockPrompts = [
  { id: 1, title: 'Generate a marketing slogan for a new coffee brand.', category: 'Marketing' },
  { id: 2, title: 'Write a short story in the style of Edgar Allan Poe.', category: 'Writing' },
  { id: 3, title: 'Create a responsive navigation bar using Flexbox.', category: 'Developer Tools' },
  { id: 4, title: 'Design a logo for a tech startup named "Innovate".', category: 'Design' },
  { id: 5, title: 'Explain the concept of photosynthesis to a 5th grader.', category: 'Education' },
];

export default function PromptList() {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Library className="h-6 w-6" /> Your Prompts
        </CardTitle>
        <CardDescription>
          A library of your saved prompts. You have used {mockPrompts.length}/10 free slots.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mockPrompts.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
                {mockPrompts.map((prompt) => (
                <div key={prompt.id} className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
                    <div className="flex-1">
                    <p className="font-medium">{prompt.title}</p>
                    <Badge variant="secondary" className="mt-1">{prompt.category}</Badge>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    </div>
                </div>
                ))}
            </div>
            </ScrollArea>
        ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center">
                <Library className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Prompts Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Start by creating a new prompt to see it here.</p>
                <Button className="mt-4" variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Create Prompt</Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
