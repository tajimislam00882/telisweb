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

  const textColors: { [key: string]: string } = {
    'from-green-400 to-green-600': 'text-white',
    'from-blue-400 to-blue-600': 'text-white',
    'from-purple-400 to-purple-600': 'text-white',
    'from-yellow-400 to-yellow-600': 'text-white',
  }

  return (
    <Link href={`/shop?category=${category.id}`} className="group block">
      <Card className={cn(
        "h-40 rounded-2xl",
        "relative overflow-hidden",
        "border-0"
      )}>
        <div className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-300 group-hover:scale-110",
            category.color
        )}></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <CardContent className="relative p-6 flex items-center justify-center h-full">
          <h3 className={cn(
              "text-xl font-bold text-center",
               textColors[category.color] || 'text-white'
            )}>
              {t(category.name)}
            </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
