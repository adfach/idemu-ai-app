'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

function GoogleIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
      <title>Google</title>
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.08-2.58 1.98-4.48 1.98-3.62 0-6.57-3.03-6.57-6.75s2.95-6.75 6.57-6.75c2.08 0 3.39.81 4.24 1.62l2.35-2.35C18.27.75 15.75 0 12.48 0 5.88 0 0 5.88 0 12s5.88 12 12.48 12c7.25 0 12.09-4.76 12.09-12.25 0-.76-.08-1.49-.2-2.25h-11.9z"
        fill="currentColor"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
      <title>GitHub</title>
      <path
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SignupPage() {
  const { t } = useLanguage();
  const { signUp, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signUp({ name, email, password });
  };

  return (
    <Card className="relative w-full shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl">{t('auth.create_account')}</CardTitle>
        <CardDescription>{t('auth.signup_prompt')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('auth.full_name')}</Label>
            <Input id="name" required value={name} onChange={e => setName(e.target.value)} disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('auth.creating_account') : t('auth.signup_button')}
          </Button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {t('auth.or_continue_with')}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" disabled={loading}><GoogleIcon /> Google</Button>
          <Button variant="outline" disabled={loading}><GithubIcon /> GitHub</Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2 text-center text-sm">
        <p className="text-muted-foreground">
          {t('auth.login_redirect')}{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            {t('auth.login_button')}
          </Link>
        </p>
        <p className="px-4 text-xs text-muted-foreground">
            {t('auth.terms_agreement')}{' '}
            <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
        </p>
      </CardFooter>
    </Card>
  );
}
