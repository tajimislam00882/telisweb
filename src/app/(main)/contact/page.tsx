import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="container py-12">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          Get In Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We'd love to hear from you. Fill out the form below or use our contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={6} />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <p className="text-muted-foreground">Our support team is here to help.</p>
                    <a href="mailto:support@digitalemporium.com" className="text-primary hover:underline">support@digitalemporium.com</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Phone</h3>
                    <p className="text-muted-foreground">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Office</h3>
                    <p className="text-muted-foreground">123 Digital Avenue, Tech City, 12345</p>
                    <a href="#" className="text-primary hover:underline">View on map</a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
