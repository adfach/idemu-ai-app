"use client";

import Link from "next/link";
import { IdemuLogo } from "@/components/icons/IdemuLogo";
import { UserNav } from "@/components/layout/UserNav";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { user, loading } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <IdemuLogo className="h-6 w-6" />
          <span className="font-headline text-lg font-bold">IdemuAI</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/marketplace"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Marketplace
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <LanguageSwitcher />
          {loading ? (
             <div className="h-9 w-20 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <UserNav />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
