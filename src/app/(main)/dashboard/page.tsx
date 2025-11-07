'use client';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import PromptEditor from "@/components/dashboard/PromptEditor";
import PromptList from "@/components/dashboard/PromptList";
import { useLanguage } from "@/hooks/use-language";

export default function DashboardPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    
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
                    <PromptEditor />
                </div>
                <div className="lg:col-span-1">
                    <PromptList />
                </div>
            </div>
        </div>
    );
}
