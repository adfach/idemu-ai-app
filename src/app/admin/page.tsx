'use client';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IdemuLogo } from '@/components/icons/IdemuLogo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, FileText, BarChart } from 'lucide-react';

const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', plan: 'Pro', prompts: 25 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', plan: 'Free', prompts: 8 },
    { id: '3', name: 'AI Enthusiast', email: 'ai@example.com', plan: 'Free', prompts: 2 },
    { id: '4', name: 'Power User', email: 'power@example.com', plan: 'Pro', prompts: 150 },
];

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user || !user.isAdmin) {
                router.push('/dashboard');
            }
        }
    }, [user, loading, router]);
    
    if (loading || !user || !user.isAdmin) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="flex items-center gap-2">
                    <IdemuLogo className="h-8 w-8 animate-spin" />
                    <p className="font-headline text-lg">Verifying access...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/40 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex items-center justify-between">
                     <div>
                        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Platform overview and management.</p>
                    </div>
                    <IdemuLogo className="h-10 w-10"/>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15,830</div>
                            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">+201 since last hour</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Prompts Created</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockUsers.map(u => (
                                <TableRow key={u.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="font-medium">{u.name}</p>
                                                <p className="text-sm text-muted-foreground">{u.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{u.plan}</TableCell>
                                    <TableCell>{u.prompts}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">Manage</Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
