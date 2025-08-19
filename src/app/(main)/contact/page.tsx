'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 text-foreground">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          {t('contact_title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('contact_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card className="bg-card border-border/20">
          <CardHeader>
            <CardTitle>{t('contact_form_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact_form_name')}</Label>
                  <Input id="name" placeholder={t('contact_form_name_placeholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact_form_email')}</Label>
                  <Input id="email" type="email" placeholder={t('contact_form_email_placeholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('contact_form_message')}</Label>
                <Textarea id="message" placeholder={t('contact_form_message_placeholder')} rows={6} />
              </div>
              <Button type="submit" className="w-full">{t('contact_form_submit')}</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">{t('contact_email_title')}</h3>
                    <p className="text-muted-foreground">{t('contact_email_desc')}</p>
                    <a href="mailto:support@digitalemporium.com" className="text-primary hover:underline">support@digitalemporium.com</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">{t('contact_phone_title')}</h3>
                    <p className="text-muted-foreground">{t('contact_phone_desc')}</p>
                    <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">{t('contact_office_title')}</h3>
                    <p className="text-muted-foreground">123 Digital Avenue, Tech City, 12345</p>
                    <a href="#" className="text-primary hover:underline">{t('contact_office_link')}</a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
