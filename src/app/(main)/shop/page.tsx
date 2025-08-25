
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ShopContent from '@/components/shop/shop-content';

function ShopPageSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <aside className="lg:col-span-1">
                <div className="sticky top-24">
                   <Skeleton className="h-[500px] w-full" />
                </div>
            </aside>
            <main className="lg:col-span-3">
                <div className="mb-8">
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-80 w-full" />
                    ))}
                </div>
            </main>
        </div>
    )
}


export default function ShopPage() {
  return (
    <div className="container py-12 text-foreground">
        <Suspense fallback={<ShopPageSkeleton />}>
            <ShopContent />
        </Suspense>
    </div>
  );
}
