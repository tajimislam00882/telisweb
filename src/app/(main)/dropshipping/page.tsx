'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { Rocket, BarChart, Handshake } from 'lucide-react';
import Link from 'next/link';

export default function DropshippingPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 text-foreground">
      {/* Hero Section */}
      <section className="text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
              📦 {t('dropship_title')}
          </h1>
          <h2 className="text-2xl font-semibold text-primary mt-2">{t('dropship_title_bn')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {t('dropship_subtitle')}
          </p>
          <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
              <Link href="/register">{t('dropship_apply_now')}</Link>
          </Button>
      </section>

      {/* Benefits for Suppliers Section */}
      <section className="mb-20">
          <div className="text-center mb-12">
              <h3 className="text-3xl font-bold">{t('dropship_benefits_title')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Rocket className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">🚀 {t('dropship_benefit1_title')}</h4>
                  <p className="text-muted-foreground">
                    {t('dropship_benefit1_desc')}
                  </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <BarChart className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">📈 {t('dropship_benefit2_title')}</h4>
                  <p className="text-muted-foreground">
                      {t('dropship_benefit2_desc')}
                  </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Handshake className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">💸 {t('dropship_benefit3_title')}</h4>
                  <p className="text-muted-foreground">
                      {t('dropship_benefit3_desc')}
                  </p>
              </div>
          </div>
      </section>
       {/* How it works */}
       <section className="text-center bg-card p-8 sm:p-12 rounded-lg border">
             <h3 className="text-3xl font-bold mb-4">{t('dropship_how_it_works_title')}</h3>
             <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t('dropship_how_it_works_subtitle')}
             </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="flex gap-4 items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">1</div>
                    <div>
                        <h4 className="font-semibold text-lg">{t('dropship_step1_title')}</h4>
                        <p className="text-muted-foreground text-sm">{t('dropship_step1_desc')}</p>
                    </div>
                </div>
                 <div className="flex gap-4 items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">2</div>
                    <div>
                        <h4 className="font-semibold text-lg">{t('dropship_step2_title')}</h4>
                        <p className="text-muted-foreground text-sm">{t('dropship_step2_desc')}</p>
                    </div>
                </div>
                 <div className="flex gap-4 items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">3</div>
                    <div>
                        <h4 className="font-semibold text-lg">{t('dropship_step3_title')}</h4>
                        <p className="text-muted-foreground text-sm">{t('dropship_step3_desc')}</p>
                    </div>
                </div>
            </div>
             <div className="mt-10">
                <Button size="lg" asChild>
                    <Link href="/register">{t('dropship_become_supplier_button')}</Link>
                </Button>
            </div>
        </section>
    </div>
  );
}
