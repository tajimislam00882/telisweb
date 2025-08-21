'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { popularCategories } from '@/lib/data';
import CategoryCard from './category-card';

export default function HeroSection() {
  const { t } = useLanguage();
  const displayCategories = popularCategories.slice(0, 4);

  return (
    <section className="relative bg-background overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-primary/10 rounded-full blur-3xl" />
        </div>
      <div className="container grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32 relative z-10">
        <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            {t('hero_title')}
            </h1>
            <p className="mx-auto lg:mx-0 mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {t('hero_subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400"/>
                    <p><span className="font-bold text-foreground">4.8★</span> {t('hero_rating')}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p><span className="font-bold text-foreground">1000+</span> {t('hero_products')}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p><span className="font-bold text-foreground">500+</span> {t('hero_customers')}</p>
                </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center lg:justify-start gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/shop">
                {t('start_shopping_button')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
              {displayCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
              ))}
        </div>
      </div>
    </section>
  );
}
