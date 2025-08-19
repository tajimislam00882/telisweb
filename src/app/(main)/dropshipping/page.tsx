'use client';

import { Button } from '@/components/ui/button';
import { Rocket, BarChart, Handshake } from 'lucide-react';
import Link from 'next/link';

export default function DropshippingPage() {
  return (
    <div className="container py-12 text-foreground">
      {/* Hero Section */}
      <section className="text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
              📦 Become Our Dropshipping Partner
          </h1>
          <h2 className="text-2xl font-semibold text-primary mt-2">আমাদের Dropshipping Partner হয়ে ব্যবসা বাড়ান</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Expand your business reach without the hassle of inventory or marketing costs. We handle the rest.
          </p>
          <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
              <Link href="/register">Apply Now</Link>
          </Button>
      </section>

      {/* Benefits for Suppliers Section */}
      <section className="mb-20">
          <div className="text-center mb-12">
              <h3 className="text-3xl font-bold">Partner Benefits</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Rocket className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">🚀 Increased Sales</h4>
                  <p className="text-muted-foreground">
                    Get your products in front of our large and growing customer base without any effort.
                  </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <BarChart className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">📈 No Marketing Cost</h4>
                  <p className="text-muted-foreground">
                      We handle all the marketing and advertising, so you can focus on what you do best: sourcing great products.
                  </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Handshake className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">💸 Fast Payments</h4>
                  <p className="text-muted-foreground">
                      Receive your payments quickly and reliably through weekly cycles via bKash, Nagad, or Bank Transfer.
                  </p>
              </div>
          </div>
      </section>
       {/* How it works */}
       <section className="text-center bg-card p-12 rounded-lg border">
             <h3 className="text-3xl font-bold mb-4">How It Works</h3>
             <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Joining our dropshipping program is simple.
             </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="flex gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">1</div>
                    <div>
                        <h4 className="font-semibold text-lg">Apply Online</h4>
                        <p className="text-muted-foreground text-sm">Fill out our supplier registration form with your business and product details.</p>
                    </div>
                </div>
                 <div className="flex gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">2</div>
                    <div>
                        <h4 className="font-semibold text-lg">Get Approved</h4>
                        <p className="text-muted-foreground text-sm">Our team will review your application and products. Once approved, we integrate your products.</p>
                    </div>
                </div>
                 <div className="flex gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">3</div>
                    <div>
                        <h4 className="font-semibold text-lg">Fulfill Orders</h4>
                        <p className="text-muted-foreground text-sm">When a customer buys your product, we send you the order. You ship it, we pay you.</p>
                    </div>
                </div>
            </div>
             <div className="mt-10">
                <Button size="lg" asChild>
                    <Link href="/register">Become a Supplier Today</Link>
                </Button>
            </div>
        </section>
    </div>
  );
}
