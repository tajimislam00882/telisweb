'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { PopularCategory } from '@/lib/types';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: PopularCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { t } = useLanguage();

  return (
    <Link href={`/shop?category=${category.id}`} className="group">
      <Card className={cn(
        "h-40 rounded-2xl transition-all duration-300",
        "bg-white/5 dark:bg-white/10 backdrop-blur-lg",
        "border border-white/10 dark:border-white/20",
        "hover:bg-white/10 dark:hover:bg-white/20 hover:border-white/20 dark:hover:border-white/30"
      )}>
        <CardContent className="p-6 flex items-center justify-center h-full">
          <h3 className="text-xl font-semibold text-center text-foreground">{t(category.name)}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
