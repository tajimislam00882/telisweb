import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PopularCategory } from '@/lib/types';
import Link from 'next/link';

interface CategoryCardProps {
  category: PopularCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;
  return (
    <Link href={`/shop?category=${category.id}`} className="group">
      <Card className="h-full bg-card border-border/20 text-foreground transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
        <CardHeader>
          <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-lg">{category.name}</CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-primary group-hover:underline">
            {category.productCount}+ Products
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
