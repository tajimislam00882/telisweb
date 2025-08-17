import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-secondary dark:bg-muted/40">
      <div className="container py-20 text-center lg:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Premium Digital Products, Instantly.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Discover top-quality UI kits, templates, icons, and e-books to
          supercharge your creative projects.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/shop">
              Browse Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
