import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 md:py-20">
                <div className="container mx-auto max-w-3xl px-4">
                    <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Your privacy is important to us.
                    </p>

                    <div className="mt-12 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">English Version</CardTitle>
                            </CardHeader>
                            <CardContent className="prose dark:prose-invert">
                                <p>By using Idemu, you agree that any data you store (such as prompts, profile, and language preferences) is used solely for functional purposes of the app. Idemu does not share personal data with third parties without your consent. All data is encrypted and securely stored on Google Firebase servers.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Versi Bahasa Indonesia</CardTitle>
                            </CardHeader>
                            <CardContent className="prose dark:prose-invert">
                                <p>Dengan menggunakan Idemu, Anda menyetujui bahwa data yang Anda simpan (seperti prompt, profil, dan preferensi bahasa) hanya digunakan untuk keperluan fungsional aplikasi. Idemu tidak membagikan data pribadi ke pihak ketiga tanpa izin Anda. Data terenkripsi dan disimpan di server Firebase milik Google.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
