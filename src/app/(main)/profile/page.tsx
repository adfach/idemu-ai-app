'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { Camera } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).slice(0, 2).join('');
    }

    return (
        <div className="space-y-8">
             <div>
                <h2 className="text-3xl font-bold font-headline tracking-tight">
                    Your Profile
                </h2>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your photo and personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user?.photoURL ?? ''} />
                                <AvatarFallback className="text-2xl">{getInitials(user?.displayName)}</AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-7 w-7 rounded-full">
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex-1">
                             <h3 className="text-lg font-semibold">{user?.displayName}</h3>
                             <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user?.displayName || ''} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>Manage your account deletion settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                    <p className="text-sm text-muted-foreground mt-2">Once you delete your account, there is no going back. Please be certain.</p>
                </CardContent>
            </Card>
        </div>
    );
}
