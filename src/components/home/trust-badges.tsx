import Image from 'next/image';
import { trustLogos } from '@/lib/data';

export default function TrustBadges() {
  return (
    <section className="py-16">
      <div className="container">
        <h3 className="text-center text-lg font-semibold text-muted-foreground">
          Trusted by the world's best companies
        </h3>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          {trustLogos.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={50}
              className="object-contain"
              data-ai-hint="logo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
