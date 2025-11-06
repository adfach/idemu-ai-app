'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Star } from "lucide-react";
import { useState } from "react";

const freeFeatures = [
  "Up to 10 saved prompts",
  "Access to prompt marketplace",
  "Basic AI optimization",
  "Community support",
];

const proFeatures = [
  "Unlimited prompts",
  "Advanced Gemini optimization",
  "Remix any public prompt",
  "AI Mentor access",
  "Create public prompts",
  "Priority support",
];

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);
    
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline tracking-tight">
                    Find the Perfect Plan
                </h2>
                <p className="text-muted-foreground">Start for free and scale as you grow. No credit card required.</p>
            </div>

            <div className="flex items-center justify-center space-x-2">
                <Label htmlFor="billing-cycle">Monthly</Label>
                <Switch id="billing-cycle" checked={isYearly} onCheckedChange={setIsYearly} />
                <Label htmlFor="billing-cycle">Yearly (Save 20%)</Label>
            </div>
            
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="font-headline">Free</CardTitle>
                        <CardDescription>For individuals and hobbyists starting out with prompt engineering.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><span className="text-4xl font-bold font-headline">$0</span>/month</p>
                        <ul className="space-y-2">
                            {freeFeatures.map(feature => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Your Current Plan</Button>
                    </CardFooter>
                </Card>

                <Card className="glass-card border-primary shadow-primary/20 relative">
                    <div className="absolute top-0 right-4 -mt-3">
                        <div className="inline-flex items-center rounded-full border border-primary bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            Most Popular
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Star/> Pro</CardTitle>
                        <CardDescription>For professionals and teams who need advanced features and unlimited creativity.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            <span className="text-4xl font-bold font-headline">${isYearly ? '96' : '10'}</span>
                            <span className="text-muted-foreground">{isYearly ? '/year' : '/month'}</span>
                        </p>
                        <ul className="space-y-2">
                            {[...freeFeatures, ...proFeatures].map(feature => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Upgrade to Pro</Button>
                    </CardFooter>
                </Card>
            </div>
             <p className="text-center text-sm text-muted-foreground">
                Payments in Indonesia are processed via Midtrans.
            </p>
        </div>
    );
}
