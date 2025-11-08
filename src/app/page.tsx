'use client';

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
import { useLanguage } from '@/hooks/use-language';

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
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative flex h-[calc(100vh-4rem)] w-full items-center">
          <div className="absolute inset-0 bg-grid-purple-500/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)] dark:[mask-image:linear-gradient(to_bottom,white_10%,transparent_60%)]"></div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80 via-background/50"></div>
          <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 lg:gap-16">
            <div className="text-center md:text-left">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t('home.hero_title_part1')}{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  IdemuAI
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                {t('home.hero_subtitle')}
              </p>
              <div className="mt-10 flex justify-center gap-4 md:justify-start">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/login">{t('auth.login_button')}</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto max-w-md">
              <Card className="glass-card relative shadow-2xl shadow-primary/10">
                <CardContent className="p-2">
                  <Image
                    src="https://picsum.photos/seed/prompt-result/400/400"
                    width={400}
                    height={400}
                    alt="Hasil generate prompt"
                    className="aspect-square w-full rounded-lg object-cover"
                    data-ai-hint="abstract art"
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
                {t('home.features_title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('home.features_subtitle')}
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
                      {t(`home.feature_list.${feature.title.replace(/ /g, '_').toLowerCase()}`)}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                       {t(`home.feature_list.${feature.description.replace(/ /g, '_').toLowerCase().replace(/[.]/g, '')}`)}
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
                {t('home.cta_final_title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('home.cta_final_subtitle')}
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/signup">{t('home.cta_final_button')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Fakhri Chusain EDUCATION
          </p>
        </div>
      </footer>
    </div>
  );
}
