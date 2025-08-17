import { products } from '@/lib/data';
import ProductCard from '@/components/shop/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PopularProducts() {
  const popularProducts = products.slice(0, 4);

  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our handpicked best-selling products.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
                <Link href="/shop">View All Products</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
