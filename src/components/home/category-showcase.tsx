'use client';

import { popularCategories } from '@/lib/data';
import CategoryCard from './category-card';
import { useLanguage } from '@/context/language-context';

export default function CategoryShowcase() {
    const { t } = useLanguage();
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
           {t('popular_categories_title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('popular_categories_subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
