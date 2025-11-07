"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wand2,
  Lightbulb,
  Save,
  Loader2,
  BrainCircuit,
  PlusCircle,
  X,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { optimizePromptWithGemini } from "@/ai/flows/optimize-prompt-with-gemini";
import { suggestPromptImprovements } from "@/ai/flows/suggest-prompt-improvements";
import { generatePromptIdeas } from "@/ai/flows/generate-prompt-ideas";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import type { Prompt } from "@/app/(main)/dashboard/page";

const categories = [
  "Writing",
  "Marketing",
  "Design",
  "Developer Tools",
  "Business",
  "Education",
];

interface PromptEditorProps {
    editingPrompt: Prompt | null;
    onSave: (prompt: Omit<Prompt, 'id'> & { id?: number }) => void;
}

export default function PromptEditor({ editingPrompt, onSave }: PromptEditorProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [promptText, setPromptText] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState<
    "optimize" | "suggestions" | "ideas" | "save" | null
  >(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [ideas, setIdeas] = useState<string[]>([]);
  
  useEffect(() => {
    if (editingPrompt) {
      setPromptText(editingPrompt.title);
      setCategory(editingPrompt.category);
    }
  }, [editingPrompt]);

  const handleOptimize = async () => {
    if (!promptText) return;
    setIsLoading("optimize");
    setSuggestions([]);
    setIdeas([]);
    try {
      const result = await optimizePromptWithGemini({ prompt: promptText });
      setPromptText(result.optimizedPrompt);
      toast({
        title: "Prompt Optimized!",
        description: "Your prompt has been enhanced by Gemini.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: "Could not optimize the prompt. Please try again.",
      });
    }
    setIsLoading(null);
  };

  const handleSuggestions = async () => {
    if (!promptText) return;
    setIsLoading("suggestions");
    setSuggestions([]);
    setIdeas([]);
    try {
      const result = await suggestPromptImprovements({ prompt: promptText });
      setSuggestions(result.suggestions);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to get suggestions",
        description: "Could not get suggestions. Please try again.",
      });
    }
    setIsLoading(null);
  };

  const handleGenerateIdeas = async () => {
    if (!promptText) return;
    setIsLoading("ideas");
    setSuggestions([]);
    setIdeas([]);
    try {
      const result = await generatePromptIdeas({ topic: promptText });
      setIdeas(result.ideas);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to generate ideas",
        description: "Could not generate ideas. Please try again.",
      });
    }
    setIsLoading(null);
  };
  
  const handleSave = async () => {
    if (!promptText || !category) {
        toast({
            variant: "destructive",
            title: "Save Failed",
            description: "Prompt text and category are required.",
        });
        return;
    }
    setIsLoading("save");
    await new Promise(res => setTimeout(res, 500)); // Simulate save
    onSave({ id: editingPrompt?.id, title: promptText, category });
    toast({
        title: editingPrompt ? "Prompt Updated" : "Prompt Saved",
        description: `Your prompt has been ${editingPrompt ? 'updated' : 'saved'}.`,
    });
    setPromptText("");
    setCategory("");
    setIsLoading(null);
  }

  const handleCancelEdit = () => {
      setPromptText("");
      setCategory("");
      // A bit of a hack to reset the parent state
      onSave({id: undefined, title: '', category: ''});
  }

  return (
    <Card className="glass-card w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline flex items-center gap-2">
            <PlusCircle className="h-6 w-6" /> {editingPrompt ? 'Edit Prompt' : t('dashboard.prompt_editor.title')}
            </CardTitle>
            {editingPrompt && (
                <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                    <X className="mr-2 h-4 w-4" /> Cancel Edit
                </Button>
            )}
        </div>
        <CardDescription>
          {editingPrompt ? `You are editing "${editingPrompt.title}"` : t('dashboard.prompt_editor.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={t('dashboard.prompt_editor.placeholder')}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="min-h-[150px] text-base"
        />
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger>
            <SelectValue placeholder={t('dashboard.prompt_editor.category_placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(suggestions.length > 0 || ideas.length > 0) && (
          <Alert className="glass-primary">
            <BrainCircuit className="h-4 w-4" />
            <AlertTitle className="font-headline">{t('dashboard.prompt_editor.ai_suggestions_title')}</AlertTitle>
            <AlertDescription>
              {(suggestions.length > 0 ? suggestions : ideas).map(
                (item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="mr-2 mb-2 cursor-pointer hover:bg-primary/20"
                    onClick={() => setPromptText(item)}
                  >
                    {item}
                  </Badge>
                )
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <div className="flex gap-2">
          <Button
            onClick={handleOptimize}
            disabled={!promptText || !!isLoading}
            variant="outline"
          >
            {isLoading === "optimize" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Wand2 />
            )}
            {t('dashboard.prompt_editor.optimize')}
          </Button>
          <Button
            onClick={handleSuggestions}
            disabled={!promptText || !!isLoading}
            variant="outline"
          >
            {isLoading === "suggestions" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Lightbulb />
            )}
            {t('dashboard.prompt_editor.suggestions')}
          </Button>
          <Button
            onClick={handleGenerateIdeas}
            disabled={!promptText || !!isLoading}
            variant="outline"
          >
            {isLoading === "ideas" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <BrainCircuit />
            )}
            {t('dashboard.prompt_editor.ideas')}
          </Button>
        </div>
        <Button onClick={handleSave} disabled={!promptText || !category || !!isLoading}>
          {isLoading === "save" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save />
          )}
          {editingPrompt ? 'Update Prompt' : t('dashboard.prompt_editor.save')}
        </Button>
      </CardFooter>
    </Card>
  );
}
