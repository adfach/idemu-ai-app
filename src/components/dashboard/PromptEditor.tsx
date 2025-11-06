"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { optimizePromptWithGemini } from "@/ai/flows/optimize-prompt-with-gemini";
import { suggestPromptImprovements } from "@/ai/flows/suggest-prompt-improvements";
import { generatePromptIdeas } from "@/ai/flows/generate-prompt-ideas";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const categories = [
  "Writing",
  "Marketing",
  "Design",
  "Developer Tools",
  "Business",
  "Education",
];

export default function PromptEditor() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState<
    "optimize" | "suggestions" | "ideas" | "save" | null
  >(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [ideas, setIdeas] = useState<string[]>([]);

  const handleOptimize = async () => {
    if (!prompt) return;
    setIsLoading("optimize");
    setSuggestions([]);
    setIdeas([]);
    try {
      const result = await optimizePromptWithGemini({ prompt });
      setPrompt(result.optimizedPrompt);
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
    if (!prompt) return;
    setIsLoading("suggestions");
    setSuggestions([]);
    setIdeas([]);
    try {
      const result = await suggestPromptImprovements({ prompt });
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
    if (!prompt) return;
    setIsLoading("ideas");
    setSuggestions([]);
    setIdeas([]);
    try {
      const result = await generatePromptIdeas({ topic: prompt });
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
    setIsLoading("save");
    await new Promise(res => setTimeout(res, 1000)); // Simulate save
    toast({
        title: "Prompt Saved",
        description: "Your new prompt has been added to your library.",
      });
    setIsLoading(null);
  }

  return (
    <Card className="glass-card w-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <PlusCircle className="h-6 w-6" /> Create a New Prompt
        </CardTitle>
        <CardDescription>
          Write your prompt below or generate ideas. Use our AI tools to refine
          it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., 'Generate a marketing slogan for a new coffee brand...'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[150px] text-base"
        />
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
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
            <AlertTitle className="font-headline">AI Suggestions</AlertTitle>
            <AlertDescription>
              {(suggestions.length > 0 ? suggestions : ideas).map(
                (item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="mr-2 mb-2 cursor-pointer hover:bg-primary/20"
                    onClick={() => setPrompt(item)}
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
            disabled={!prompt || !!isLoading}
            variant="outline"
          >
            {isLoading === "optimize" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Wand2 />
            )}
            Optimize
          </Button>
          <Button
            onClick={handleSuggestions}
            disabled={!prompt || !!isLoading}
            variant="outline"
          >
            {isLoading === "suggestions" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Lightbulb />
            )}
            Suggestions
          </Button>
          <Button
            onClick={handleGenerateIdeas}
            disabled={!prompt || !!isLoading}
            variant="outline"
          >
            {isLoading === "ideas" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <BrainCircuit />
            )}
            Ideas
          </Button>
        </div>
        <Button onClick={handleSave} disabled={!prompt || !category || isLoading}>
          {isLoading === "save" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save />
          )}
          Save Prompt
        </Button>
      </CardFooter>
    </Card>
  );
}
