'use client';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import PromptEditor from "@/components/dashboard/PromptEditor";
import PromptList from "@/components/dashboard/PromptList";

export default function DashboardPage() {
    const { user } = useAuth();
    
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold font-headline tracking-tight">
                    Welcome back, {user?.displayName?.split(' ')[0] || 'Creator'}!
                </h2>
                <p className="text-muted-foreground">Here's where your creative journey begins. Create, manage, and optimize your AI prompts.</p>
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
