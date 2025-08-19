'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, Instagram, Twitch, Check } from 'lucide-react';
import Link from 'next/link';

export default function InfluencerProgramPage() {
  return (
    <div className="container py-12 text-foreground">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
          🌟 Join Our Influencer Program
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Are you a content creator? Partner with us to bring amazing digital products to your audience and earn rewards.
        </p>
        <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
          <Link href="#apply">Apply Now</Link>
        </Button>
      </section>

      {/* Who we are looking for */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold">Who We're Looking For</h3>
          <p className="text-muted-foreground mt-2">We love to partner with creators who are passionate about quality and design.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Youtube className="h-10 w-10 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">YouTubers</h4>
            <p className="text-muted-foreground">
              Tech reviewers, designers, and educators who can showcase our products in action.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Instagram className="h-10 w-10 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Instagrammers</h4>
            <p className="text-muted-foreground">
              Creators with a strong following in the design, tech, or entrepreneurial space.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Twitch className="h-10 w-10 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Streamers & Bloggers</h4>
            <p className="text-muted-foreground">
              Live streamers and writers who can provide in-depth reviews and tutorials.
            </p>
          </div>
        </div>
      </section>

      {/* Program Perks */}
      <section id="apply" className="text-center bg-card p-12 rounded-lg border">
        <h3 className="text-3xl font-bold mb-4">Influencer Perks</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          As a partner, you'll get access to exclusive benefits.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto mb-10">
           <div className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <p>Free access to our entire product library.</p>
          </div>
          <div className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <p>Exclusive commission rates through our affiliate program.</p>
          </div>
          <div className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <p>Early access to new products before they launch.</p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="mailto:influencers@digitalemporium.com">Contact Us to Apply</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
