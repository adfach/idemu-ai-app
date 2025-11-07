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
import { useLanguage } from "@/hooks/use-language";
import type { Prompt } from "@/app/(main)/dashboard/page";

interface PromptListProps {
    prompts: Prompt[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function PromptList({ prompts, onEdit, onDelete }: PromptListProps) {
  const { t } = useLanguage();
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Library className="h-6 w-6" /> {t('dashboard.prompt_list.title')}
        </CardTitle>
        <CardDescription>
          {t('dashboard.prompt_list.description', { count: prompts.length })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {prompts.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
                {prompts.map((prompt) => (
                <div key={prompt.id} className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
                    <div className="flex-1">
                    <p className="font-medium">{prompt.title}</p>
                    <Badge variant="secondary" className="mt-1">{prompt.category}</Badge>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(prompt.id)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(prompt.id)}>
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
                <h3 className="mt-4 text-lg font-semibold">{t('dashboard.prompt_list.empty_title')}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t('dashboard.prompt_list.empty_description')}</p>
                 <p className="mt-4 text-sm text-muted-foreground">Start by creating one in the editor!</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
