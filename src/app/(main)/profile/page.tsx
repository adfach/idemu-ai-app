'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProfilePage() {
    const { user, updateProfile, loading, deleteAccount } = useAuth();
    const { toast } = useToast();
    const { t } = useLanguage();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user?.displayName) {
            setDisplayName(user.displayName);
        }
    }, [user?.displayName]);
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).slice(0, 2).join('');
    }

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            await updateProfile({ displayName });
            toast({
                title: t('profile.update_success_title'),
                description: t('profile.update_success_desc'),
            });
        } catch (error) {
             toast({
                variant: "destructive",
                title: t('profile.update_failed_title'),
                description: t('profile.update_failed_desc'),
            });
        }
        setIsSaving(false);
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsSaving(true);
        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const photoURL = reader.result as string;
                await updateProfile({ photoURL });
                toast({
                    title: t('profile.update_success_title'),
                    description: t('profile.photo_update_success_desc'),
                });
                setIsSaving(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast({
                variant: "destructive",
                title: t('profile.update_failed_title'),
                description: t('profile.photo_update_failed_desc'),
            });
            setIsSaving(false);
        }
    };
    
    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            toast({
                title: t('profile.delete_account_success_title'),
                description: t('profile.delete_account_success_desc'),
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: t('profile.delete_account_failed_title'),
                description: t('profile.delete_account_failed_desc'),
            });
        }
    }


    return (
        <div className="space-y-8">
             <div>
                <h2 className="text-3xl font-bold font-headline tracking-tight">
                    {t('profile.title')}
                </h2>
                <p className="text-muted-foreground">{t('profile.subtitle')}</p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>{t('profile.personal_info_title')}</CardTitle>
                    <CardDescription>{t('profile.personal_info_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user?.photoURL ?? ''} />
                                <AvatarFallback className="text-2xl">{getInitials(user?.displayName)}</AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-7 w-7 rounded-full" onClick={handleCameraClick} disabled={isSaving}>
                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                        </div>
                        <div className="flex-1">
                             <h3 className="text-lg font-semibold">{user?.displayName}</h3>
                             <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="name">{t('auth.full_name')}</Label>
                        <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} disabled={isSaving || loading} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">{t('auth.email')}</Label>
                        <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSaveChanges} disabled={isSaving || loading || displayName === user?.displayName}>
                        {isSaving && !fileInputRef.current?.files?.length ? <Loader2 className="animate-spin" /> : null}
                        {isSaving && !fileInputRef.current?.files?.length ? t('profile.saving') : t('profile.save_changes')}
                    </Button>
                </CardFooter>
            </Card>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>{t('profile.danger_zone_title')}</CardTitle>
                    <CardDescription>{t('profile.danger_zone_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">{t('profile.delete_account_button')}</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>{t('profile.delete_confirmation.title')}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {t('profile.delete_confirmation.description')}
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>{t('profile.delete_confirmation.cancel')}</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                                {t('profile.delete_confirmation.confirm')}
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <p className="text-sm text-muted-foreground mt-2">{t('profile.delete_account_warning')}</p>
                </CardContent>
            </Card>
        </div>
    );
}
