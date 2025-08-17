import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-background">
      <div className="container py-20 text-center lg:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Bangladesh's Best Digital Product Shop
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Get quality e-books, software, templates and much more here.
        </p>
         <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="text-center">
                <p className="text-2xl font-bold text-foreground">1000+</p>
                <p>Products</p>
            </div>
             <div className="text-center">
                <p className="text-2xl font-bold text-foreground">500+</p>
                <p>Customers</p>
            </div>
             <div className="text-center">
                <p className="text-2xl font-bold text-foreground">4.8★</p>
                <p>Rating</p>
            </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-8 text-base">
            <Link href="/shop">
              Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
            <Link href="#features">
              <Download className="mr-2 h-5 w-5" />
              Free Items
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
