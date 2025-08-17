'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { PopularCategory } from '@/lib/types';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

interface CategoryCardProps {
  category: PopularCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { t } = useLanguage();
  
  return (
    <Link href={`/shop?category=${category.id}`} className="group">
      <Card className="h-full bg-card border-border/20 text-foreground transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
        <CardContent className="p-6 flex items-center justify-center h-32">
          <h3 className="text-lg font-semibold text-center">{t(category.name)}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
