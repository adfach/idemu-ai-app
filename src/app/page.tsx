import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import {
  Zap,
  Languages,
  Users,
  LayoutDashboard,
  Sparkles,
  Bot,
} from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Optimization',
    description: 'Enhance your prompts with Gemini for better clarity and style.',
    data_ai_hint: 'AI optimization',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: 'Bilingual Interface',
    description: 'Seamlessly switch between Bahasa Indonesia and English.',
    data_ai_hint: 'language translation',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Prompt Marketplace',
    description: 'Explore, share, and remix prompts from a vibrant community.',
    data_ai_hint: 'community collaboration',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Mentor',
    description: 'Get guided help and improvement tips from our smart assistant.',
    data_ai_hint: 'AI assistant',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-grid-purple-500/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)] dark:[mask-image:linear-gradient(to_bottom,white_10%,transparent_60%)]"></div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80 via-background/50"></div>
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Craft the Perfect Prompt, Every Time with{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  IdemuAI
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Your bilingual AI-powered partner for creating, sharing, and
                optimizing high-quality prompts.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/signup">Start Creating for Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
              </div>
            </div>
            <div className="relative mt-16 sm:mt-20">
              <div className="absolute inset-x-0 -top-10 -bottom-20 bg-gradient-to-t from-background via-background/80 to-transparent dark:from-background dark:via-background/90 dark:to-transparent"></div>
              <Card className="glass-card relative shadow-2xl shadow-primary/10">
                <CardContent className="p-2">
                  <Image
                    src="https://picsum.photos/seed/idemu-dashboard/1200/650"
                    width={1200}
                    height={650}
                    alt="IdemuAI Dashboard Screenshot"
                    className="rounded-lg"
                    data-ai-hint="dashboard screenshot"
                    priority
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything You Need to Succeed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                IdemuAI provides a comprehensive suite of tools to elevate your
                prompt engineering.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="glass-card transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20"
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-headline text-xl font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 lg:py-28 bg-secondary/50 dark:bg-card/80">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Unleash Your Creativity?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of creators and build better AI interactions today.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/signup">Sign Up Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IdemuAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
