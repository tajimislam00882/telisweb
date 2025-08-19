'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingCart } from 'lucide-react';

export default function BulkOrdersPage() {
  return (
    <div className="container py-12 text-foreground">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          Bulk & Wholesale Orders
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Looking to purchase our digital products in large quantities? We offer special discounts and dedicated support for bulk orders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Why Order in Bulk?</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Significant Discounts</h4>
                <p className="text-muted-foreground">The more you buy, the more you save. Get access to our exclusive wholesale pricing.</p>
              </div>
            </li>
             <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Simplified Licensing</h4>
                <p className="text-muted-foreground">Easy-to-manage licenses for teams, educational institutions, or client projects.</p>
              </div>
            </li>
             <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Dedicated Support</h4>
                <p className="text-muted-foreground">Receive priority support from a dedicated account manager to assist you with your purchase.</p>
              </div>
            </li>
          </ul>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Request a Quote</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="products">Products of Interest</Label>
                <Input id="products" placeholder="e.g., Pro UI Kit, All Icon Sets" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="quantity">Estimated Quantity</Label>
                <Input id="quantity" type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea id="message" placeholder="Tell us about your needs..." />
              </div>
              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
