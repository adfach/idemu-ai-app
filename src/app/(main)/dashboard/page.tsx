'use client';
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import PromptEditor from "@/components/dashboard/PromptEditor";
import PromptList from "@/components/dashboard/PromptList";
import { useLanguage } from "@/hooks/use-language";

export interface Prompt {
  id: number;
  title: string;
  category: string;
}

const initialPrompts: Prompt[] = [
  { id: 1, title: 'Generate a marketing slogan for a new coffee brand.', category: 'Marketing' },
  { id: 2, title: 'Write a short story in the style of Edgar Allan Poe.', category: 'Writing' },
  { id: 3, title: 'Create a responsive navigation bar using Flexbox.', category: 'Developer Tools' },
  { id: 4, title: 'Design a logo for a tech startup named "Innovate".', category: 'Design' },
  { id: 5, title: 'Explain the concept of photosynthesis to a 5th grader.', category: 'Education' },
];

export default function DashboardPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
    const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

    const handleSavePrompt = (prompt: Omit<Prompt, 'id'> & { id?: number }) => {
        if (prompt.id) {
            // Update existing prompt
            setPrompts(prompts.map(p => p.id === prompt.id ? { ...p, ...prompt } : p));
        } else {
            // Add new prompt
            const newPrompt = { ...prompt, id: Date.now() };
            setPrompts([newPrompt, ...prompts]);
        }
        setEditingPrompt(null);
    };

    const handleDeletePrompt = (id: number) => {
        setPrompts(prompts.filter(p => p.id !== id));
    };

    const handleEditPrompt = (id: number) => {
        const promptToEdit = prompts.find(p => p.id === id);
        if (promptToEdit) {
            setEditingPrompt(promptToEdit);
        }
    };
    
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold font-headline tracking-tight">
                    {t('dashboard.welcome')}, {user?.displayName?.split(' ')[0] || 'Creator'}!
                </h2>
                <p className="text-muted-foreground">{t('dashboard.welcome_subtitle')}</p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <PromptEditor 
                        onSave={handleSavePrompt} 
                        editingPrompt={editingPrompt}
                        key={editingPrompt?.id} // Re-mount component when editing prompt changes
                    />
                </div>
                <div className="lg:col-span-1">
                    <PromptList 
                        prompts={prompts}
                        onEdit={handleEditPrompt}
                        onDelete={handleDeletePrompt}
                    />
                </div>
            </div>
        </div>
    );
}
