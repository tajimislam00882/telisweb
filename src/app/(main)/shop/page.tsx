import { products } from '@/lib/data';
import ProductCard from '@/components/shop/product-card';
import SearchBar from '@/components/shop/search-bar';
import Filters from '@/components/shop/filters';

export default function ShopPage() {
  return (
    <div className="container py-12 text-foreground">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          Our Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore our curated collection of high-quality digital assets.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="sticky top-28">
            <Filters />
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="mb-8">
            <SearchBar />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
