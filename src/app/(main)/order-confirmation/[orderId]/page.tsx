'use client';

import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId;

  return (
    <div className="container py-12 text-center">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="items-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold">Thank you for your order!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your order <span className="font-semibold text-primary">#{orderId?.toString().substring(0, 8)}</span> has been successfully placed.
          </p>
          <p className="text-muted-foreground">
            A confirmation email with your order details and download links (for digital products) has been sent to your email address.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild>
              <Link href="/dashboard/purchases">View Order History</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
