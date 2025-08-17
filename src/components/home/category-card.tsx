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
    'from-green-400 to-green-600': 'text-green-200',
    'from-blue-400 to-blue-600': 'text-blue-200',
    'from-purple-400 to-purple-600': 'text-purple-200',
    'from-yellow-400 to-yellow-600': 'text-yellow-200',
  }

  return (
    <Link href={`/shop?category=${category.id}`} className="group block">
      <Card className={cn(
        "h-40 rounded-2xl transition-all duration-300",
        "relative overflow-hidden",
        "border border-white/10 group-hover:border-white/20"
      )}>
        <div className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-300 opacity-20 group-hover:opacity-30",
            category.color
        )}></div>
         <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
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
