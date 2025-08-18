'use client';

import { products } from '@/lib/data';
import ProductCard from '@/components/shop/product-card';
import Filters from '@/components/shop/filters';
import { useProductFilters } from '@/hooks/use-product-filters';
import SearchAndSort from '@/components/shop/search-and-sort';

export default function ShopPage() {
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
    selectedRating,
    setSelectedRating,
  } = useProductFilters(products);

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
          <div className="sticky top-24">
            <Filters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="mb-8">
            <SearchAndSort
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">No Products Found</h2>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
