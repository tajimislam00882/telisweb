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
import { Star } from 'lucide-react';

function renderStars(rating: number) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} />
        );
    }
    return stars;
}

export default function Testimonials() {
  return (
    <section className="bg-background py-20">
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
          className="mx-auto mt-12 w-full max-w-6xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="h-full bg-card border-border/20">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                        <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                      <p className="mb-6 text-muted-foreground flex-grow">
                        "{testimonial.quote}"
                      </p>
                      <div className='flex items-center gap-4'>
                         <Image
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full"
                            data-ai-hint="person"
                        />
                        <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {testimonial.role}
                            </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-foreground" />
          <CarouselNext className="text-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
