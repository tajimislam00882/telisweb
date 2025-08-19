'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, BarChart, Gift } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export default function AffiliateMarketingPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 text-foreground">
        {/* Hero Section */}
        <section className="text-center mb-20">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
                🤝 {t('affiliate_title')}
            </h1>
            <h2 className="text-2xl font-semibold text-primary mt-2">{t('affiliate_title_bn')}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                {t('affiliate_subtitle')}
            </p>
            <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
                <Link href="/register">{t('affiliate_start_earning')}</Link>
            </Button>
        </section>

        {/* Benefits Section */}
        <section className="mb-20">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold">{t('affiliate_why_join')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <DollarSign className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">💰 {t('affiliate_benefit1_title')}</h4>
                    <p className="text-muted-foreground">
                        {t('affiliate_benefit1_desc')}
                    </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Gift className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">🎯 {t('affiliate_benefit2_title')}</h4>
                    <p className="text-muted-foreground">
                        {t('affiliate_benefit2_desc')}
                    </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <BarChart className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">📊 {t('affiliate_benefit3_title')}</h4>
                    <p className="text-muted-foreground">
                        {t('affiliate_benefit3_desc')}
                    </p>
                </div>
            </div>
        </section>
        
        {/* Registration CTA */}
        <section className="text-center bg-card p-12 rounded-lg border">
             <h3 className="text-3xl font-bold mb-4">{t('affiliate_ready_to_start')}</h3>
             <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t('affiliate_cta_desc')}
             </p>
            <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                    <Link href="/register">{t('affiliate_register_button')}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                     <Link href="/login">{t('affiliate_login_button')}</Link>
                </Button>
            </div>
        </section>
    </div>
  );
}
