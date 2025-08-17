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
  
  const cardColors: { [key: string]: string } = {
    'ebooks': 'bg-[#082213] text-[#36d390]',
    'templates': 'bg-[#102a1c]',
    'software': 'bg-[#18192E]',
    'course': 'bg-[#18192E]',
  };

  return (
    <Link href={`/shop?category=${category.id}`} className="group">
      <Card className={cn(
        "h-40 rounded-2xl border-0 text-white transition-all duration-300",
         cardColors[category.id] || 'bg-gray-800'
      )}>
        <CardContent className="p-6 flex items-center justify-center h-full">
          <h3 className="text-xl font-semibold text-center">{t(category.name)}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
