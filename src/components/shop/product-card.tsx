'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg bg-card border-border/20 hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} className="block">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover rounded-t-lg"
            data-ai-hint="digital product"
          />
        </Link>
        <Badge variant="secondary" className="capitalize absolute top-3 left-3 bg-card/80 backdrop-blur-sm">{product.category}</Badge>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-2">
        <CardTitle className="text-base leading-tight">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-0.5">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
          <span>({product.reviews} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-lg font-bold text-primary">${product.price}</p>
        <Button asChild size="sm">
          <Link href={`/product/${product.id}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
