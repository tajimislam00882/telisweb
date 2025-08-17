import Image from 'next/image';
import { testimonials } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Testimonials() {
  return (
    <section className="bg-secondary dark:bg-muted/40 py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real stories from satisfied creators and entrepreneurs.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto mt-12 w-full max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="mb-4 rounded-full"
                        data-ai-hint="person"
                      />
                      <p className="mb-4 text-muted-foreground">
                        "{testimonial.quote}"
                      </p>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
