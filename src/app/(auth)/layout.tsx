import Link from "next/link";
import { IdemuLogo } from "@/components/icons/IdemuLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
       <header className="absolute top-0 z-50 w-full">
         <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <IdemuLogo className="h-6 w-6" />
            <span className="font-headline text-lg font-bold">IdemuAI</span>
          </Link>
         </div>
       </header>
       <main className="flex flex-1 items-center justify-center p-4">
         <div className="relative w-full max-w-md">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-accent opacity-25 blur-lg"></div>
            {children}
         </div>
       </main>
    </div>
  );
}
