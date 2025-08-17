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
    <Link href={`/shop?category=${category.id}`} className="group block">
      <Card className={cn(
        "h-40 rounded-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl",
        "bg-gradient-to-br",
        category.color
      )}>
        <CardContent className="p-6 flex items-center justify-center h-full">
          <h3 className="text-xl font-bold text-center text-white drop-shadow-md">{t(category.name)}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
