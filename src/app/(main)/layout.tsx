'use client';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { IdemuLogo } from '@/components/icons/IdemuLogo';
import {
  LayoutDashboard,
  Store,
  Star,
  User,
  ShieldCheck,
  Settings,
  Library,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from '@/components/layout/UserNav';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import AiMentor from '@/components/AiMentor';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/marketplace', icon: Store, label: 'Marketplace' },
  { href: '/library', icon: Library, label: 'Library' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex items-center gap-2">
            <IdemuLogo className="h-8 w-8 animate-spin" />
            <p className="font-headline text-lg">Loading IdemuAI...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <IdemuLogo className="h-8 w-8" />
            <span className="font-headline text-xl font-bold text-foreground">
              IdemuAI
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            {user.isAdmin && (
              <SidebarMenuItem>
                <Link href="/admin" className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === '/admin'}
                    tooltip={{ children: 'Admin' }}
                  >
                    <ShieldCheck />
                    <span>Admin</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
           <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/settings" className="w-full">
                    <SidebarMenuButton isActive={pathname === '/settings'} tooltip={{children: 'Settings'}}>
                        <Settings/>
                        <span>Settings</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="font-headline text-2xl font-bold capitalize">
              {pathname.split('/').pop() || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
        <AiMentor />
      </SidebarInset>
    </SidebarProvider>
  );
}
