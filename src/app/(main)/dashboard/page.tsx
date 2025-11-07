'use client';
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import PromptEditor from "@/components/dashboard/PromptEditor";
import PromptList from "@/components/dashboard/PromptList";
import { useLanguage } from "@/hooks/use-language";
import { usePrompts } from "@/hooks/use-prompts";
import { Prompt } from "@/types/prompt";


export default function DashboardPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { prompts, addPrompt, updatePrompt, deletePrompt } = usePrompts();
    const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

    const handleSavePrompt = (prompt: Omit<Prompt, 'id'> & { id?: number }) => {
        if (prompt.id) {
            updatePrompt({ ...prompt, id: prompt.id });
        } else {
            addPrompt(prompt);
        }
        setEditingPrompt(null);
    };

    const handleDeletePrompt = (id: number) => {
        deletePrompt(id);
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
                        setEditingPrompt={setEditingPrompt}
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
