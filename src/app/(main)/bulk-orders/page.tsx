'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import { ShoppingCart } from 'lucide-react';

export default function BulkOrdersPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 text-foreground">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          {t('bulk_title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('bulk_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{t('bulk_why_order')}</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{t('bulk_benefit1_title')}</h4>
                <p className="text-muted-foreground">{t('bulk_benefit1_desc')}</p>
              </div>
            </li>
             <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{t('bulk_benefit2_title')}</h4>
                <p className="text-muted-foreground">{t('bulk_benefit2_desc')}</p>
              </div>
            </li>
             <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{t('bulk_benefit3_title')}</h4>
                <p className="text-muted-foreground">{t('bulk_benefit3_desc')}</p>
              </div>
            </li>
          </ul>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t('bulk_form_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('bulk_form_name')}</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('bulk_form_email')}</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="products">{t('bulk_form_products')}</Label>
                <Input id="products" placeholder="e.g., Pro UI Kit, All Icon Sets" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="quantity">{t('bulk_form_quantity')}</Label>
                <Input id="quantity" type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('bulk_form_message')}</Label>
                <Textarea id="message" placeholder="Tell us about your needs..." />
              </div>
              <Button type="submit" className="w-full">
                {t('bulk_form_submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
