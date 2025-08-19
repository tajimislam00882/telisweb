'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, BarChart, Gift } from 'lucide-react';
import Link from 'next/link';

export default function AffiliateMarketingPage() {
  return (
    <div className="container py-12 text-foreground">
        {/* Hero Section */}
        <section className="text-center mb-20">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
                🤝 Join Our Affiliate Program
            </h1>
            <h2 className="text-2xl font-semibold text-primary mt-2">আমাদের Affiliate Program এ যোগ দিয়ে আয় করুন</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Earn up to 15% commission on every sale. Join a community of creators and entrepreneurs who are passionate about quality digital products.
            </p>
            <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
                <Link href="/register">Start Earning Today</Link>
            </Button>
        </section>

        {/* Benefits Section */}
        <section className="mb-20">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold">Why Join Our Affiliate Program?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <DollarSign className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">💰 High Commission Rates</h4>
                    <p className="text-muted-foreground">
                        5% - 15% commission based on your performance and sales volume. The more you sell, the more you earn.
                    </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Gift className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">🎯 Marketing Support</h4>
                    <p className="text-muted-foreground">
                        Get access to free banners, custom links, and a library of promotional materials to help you succeed.
                    </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <BarChart className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">📊 Real-time Analytics</h4>
                    <p className="text-muted-foreground">
                        Use your dedicated dashboard to track your clicks, conversions, and earnings in real-time.
                    </p>
                </div>
            </div>
        </section>
        
        {/* Registration CTA */}
        <section className="text-center bg-card p-12 rounded-lg border">
             <h3 className="text-3xl font-bold mb-4">Ready to Start?</h3>
             <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Become a part of our success story. It's free to join, and you can start earning immediately.
             </p>
            <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                    <Link href="/register">Register as Affiliate</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                     <Link href="/login">Already a Member? Login</Link>
                </Button>
            </div>
        </section>
    </div>
  );
}
