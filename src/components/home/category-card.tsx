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
  
  const cardStyles: { [key: string]: string } = {
    'ebooks': 'bg-[#0a2a16] text-[#36d390] hover:bg-[#103A20]',
    'software': 'bg-[#18192E] text-white hover:bg-[#20223e]',
    'templates': 'bg-[#102a1c] text-gray-300 hover:bg-[#183a2a]',
    'course': 'bg-[#18192E] text-white hover:bg-[#20223e]',
  };

  return (
    <Link href={`/shop?category=${category.id}`} className="group">
      <Card className={cn(
        "h-40 rounded-2xl border-0 transition-all duration-300",
         cardStyles[category.id] || 'bg-gray-800'
      )}>
        <CardContent className="p-6 flex items-center justify-center h-full">
          <h3 className="text-xl font-semibold text-center">{t(category.name)}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
