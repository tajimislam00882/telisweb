
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Suspense fallback={<Skeleton className="h-16 w-full" />}>
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
