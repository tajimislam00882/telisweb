'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { Youtube, Instagram, Twitch, Check } from 'lucide-react';
import Link from 'next/link';

export default function InfluencerProgramPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 text-foreground">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
          🌟 {t('influencer_title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('influencer_subtitle')}
        </p>
        <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
          <Link href="#apply">{t('influencer_apply_now')}</Link>
        </Button>
      </section>

      {/* Who we are looking for */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold">{t('influencer_who_we_look_for')}</h3>
          <p className="text-muted-foreground mt-2">{t('influencer_who_we_look_for_desc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Youtube className="h-10 w-10 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">{t('influencer_platform1_title')}</h4>
            <p className="text-muted-foreground">
              {t('influencer_platform1_desc')}
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Instagram className="h-10 w-10 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">{t('influencer_platform2_title')}</h4>
            <p className="text-muted-foreground">
              {t('influencer_platform2_desc')}
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Twitch className="h-10 w-10 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">{t('influencer_platform3_title')}</h4>
            <p className="text-muted-foreground">
              {t('influencer_platform3_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Program Perks */}
      <section id="apply" className="text-center bg-card p-8 sm:p-12 rounded-lg border">
        <h3 className="text-3xl font-bold mb-4">{t('influencer_perks_title')}</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('influencer_perks_desc')}
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto mb-10">
           <div className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <p>{t('influencer_perk1')}</p>
          </div>
          <div className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <p>{t('influencer_perk2')}</p>
          </div>
          <div className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <p>{t('influencer_perk3')}</p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="mailto:influencers@digitalemporium.com">{t('influencer_contact_us_button')}</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
