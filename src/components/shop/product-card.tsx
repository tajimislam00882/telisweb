import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover"
            data-ai-hint="digital product"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Badge variant="secondary" className="capitalize">{product.category}</Badge>
        <CardTitle className="mt-2 text-lg">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-0.5">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{product.rating}</span>
          </div>
          <span>({product.reviews} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">${product.price}</p>
        <Button asChild variant="outline">
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
