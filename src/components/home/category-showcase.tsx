import { popularCategories } from '@/lib/data';
import CategoryCard from './category-card';

export default function CategoryShowcase() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Popular Categories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore a wide range of digital products.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
