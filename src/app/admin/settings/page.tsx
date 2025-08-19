'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Globe, Palette, Wallet, Share2, Mail } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Site Settings</h1>
      <p className="text-muted-foreground">
        Manage your website's configuration from a central place.
      </p>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="general">
            <Globe className="mr-2 h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="payment">
            <Wallet className="mr-2 h-4 w-4" /> Payments
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Share2 className="mr-2 h-4 w-4" /> Integrations
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" /> Email
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your store's name, currency, and basic information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Store Name</Label>
                <Input id="site-name" defaultValue="Digital Emporium" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-currency">Currency</Label>
                <Input id="site-currency" defaultValue="USD" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="support@digitalemporium.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Company Address</Label>
                <Textarea id="company-address" defaultValue="123 Digital Avenue, Tech City, 12345" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save General Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings Tab */}
        <TabsContent value="appearance">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize your store's look and feel, including logo and colors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <Input id="logo" type="file" />
                  <p className="text-sm text-muted-foreground">Upload a new logo (PNG, JPG, SVG).</p>
               </div>
               <div>
                <h4 className="font-medium mb-2">Color Scheme</h4>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="primary-color">Primary</Label>
                        <Input id="primary-color" type="color" defaultValue="#22c55e" className="p-1"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="background-color">Background</Label>
                        <Input id="background-color" type="color" defaultValue="#0f172a" className="p-1"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="accent-color">Accent</Label>
                        <Input id="accent-color" type="color" defaultValue="#334155" className="p-1"/>
                    </div>
                 </div>
               </div>
            </CardContent>
             <CardFooter>
              <Button>Save Appearance Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payment Gateway Tab */}
        <TabsContent value="payment">
          <div className="grid gap-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>SSL Commerz</CardTitle>
                        <CardDescription>
                        Configuration for Bangladeshi local payments.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="ssl-enable">Enable</Label>
                        <Switch id="ssl-enable" />
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="ssl-store-id">Store ID</Label>
                        <Input id="ssl-store-id" placeholder="Your Store ID" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ssl-store-password">Store Password</Label>
                        <Input id="ssl-store-password" type="password" placeholder="Your Store Password" />
                    </div>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Pipra Pay</CardTitle>
                        <CardDescription>
                        Configuration for Pipra Pay gateway.
                        </CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <Label htmlFor="piprapay-enable">Enable</Label>
                        <Switch id="piprapay-enable" />
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="piprapay-api-key">API Key</Label>
                        <Input id="piprapay-api-key" placeholder="Your Pipra Pay API Key" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="piprapay-api-secret">API Secret</Label>
                        <Input id="piprapay-api-secret" type="password" placeholder="Your API Secret" />
                    </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Manual Payment Instructions</CardTitle>
                    <CardDescription>
                    Provide instructions for manual payments like bKash or Nagad.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="manual-instructions">Instructions</Label>
                        <Textarea id="manual-instructions" placeholder="e.g., 'Please send payment to bKash number 01xxxxxxxxx and enter the transaction ID below.'" rows={5}/>
                    </div>
                </CardContent>
            </Card>
             <CardFooter className="border-t pt-6">
                <Button>Save Payment Settings</Button>
              </CardFooter>
          </div>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations">
             <Card className="mt-6">
              <CardHeader>
                <CardTitle>Third-Party Integrations</CardTitle>
                <CardDescription>
                  Connect your store with analytics and marketing tools.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ga-id">Google Analytics ID</Label>
                  <Input id="ga-id" placeholder="UA-12345678-1" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="fb-pixel-id">Facebook Pixel ID</Label>
                  <Input id="fb-pixel-id" placeholder="Your Pixel ID" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Integrations</Button>
              </CardFooter>
            </Card>
        </TabsContent>

        {/* Email Tab */}
         <TabsContent value="email">
             <Card className="mt-6">
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Manage email notifications sent to customers and admins.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Notification Email</Label>
                  <Input id="admin-email" type="email" placeholder="admin@example.com" />
                   <p className="text-sm text-muted-foreground">This email will receive notifications for new orders and other important events.</p>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="from-email">"From" Email Address</Label>
                  <Input id="from-email" type="email" placeholder="noreply@digitalemporium.com" />
                   <p className="text-sm text-muted-foreground">Emails sent to customers will appear to be from this address.</p>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="order-confirmation-email" defaultChecked/>
                    <Label htmlFor="order-confirmation-email">Send order confirmation emails to customers</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Email Settings</Button>
              </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
