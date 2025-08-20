
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
import { Globe, Palette, Wallet, Share2, Mail, KeyRound, Settings, Link as LinkIcon, Search as SearchIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AdminSettingsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('admin_settings_title')}</h1>
      <p className="text-muted-foreground">
        {t('admin_settings_subtitle')}
      </p>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" /> {t('admin_settings_tab_general')}
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" /> {t('admin_settings_tab_appearance')}
          </TabsTrigger>
          <TabsTrigger value="payment">
            <Wallet className="mr-2 h-4 w-4" /> {t('admin_settings_tab_payment')}
          </TabsTrigger>
           <TabsTrigger value="social">
            <LinkIcon className="mr-2 h-4 w-4" /> Social Links
          </TabsTrigger>
          <TabsTrigger value="seo">
            <SearchIcon className="mr-2 h-4 w-4" /> SEO
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Share2 className="mr-2 h-4 w-4" /> {t('admin_settings_tab_integrations')}
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" /> {t('admin_settings_tab_email')}
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t('admin_settings_general_title')}</CardTitle>
              <CardDescription>
                {t('admin_settings_general_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">{t('admin_settings_general_site_name')}</Label>
                <Input id="site-name" defaultValue="Telisweb" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-currency">{t('admin_settings_general_currency')}</Label>
                <Input id="site-currency" defaultValue="USD" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">{t('admin_settings_general_contact_email')}</Label>
                <Input id="contact-email" type="email" defaultValue="support@telisweb.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">{t('admin_settings_general_address')}</Label>
                <Textarea id="company-address" defaultValue="123 Digital Avenue, Tech City, 12345" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>{t('admin_settings_save_button')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings Tab */}
        <TabsContent value="appearance">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t('admin_settings_appearance_title')}</CardTitle>
              <CardDescription>
                {t('admin_settings_appearance_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="logo">{t('admin_settings_appearance_logo')}</Label>
                  <Input id="logo" type="file" />
                  <p className="text-sm text-muted-foreground">{t('admin_settings_appearance_logo_desc')}</p>
               </div>
               <div>
                <h4 className="font-medium mb-2">{t('admin_settings_appearance_colors')}</h4>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="primary-color">{t('admin_settings_appearance_primary')}</Label>
                        <Input id="primary-color" type="color" defaultValue="#22c55e" className="p-1"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="background-color">{t('admin_settings_appearance_background')}</Label>
                        <Input id="background-color" type="color" defaultValue="#0f172a" className="p-1"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="accent-color">{t('admin_settings_appearance_accent')}</Label>
                        <Input id="accent-color" type="color" defaultValue="#334155" className="p-1"/>
                    </div>
                 </div>
               </div>
            </CardContent>
             <CardFooter>
              <Button>{t('admin_settings_save_button')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payment Gateway Tab */}
        <TabsContent value="payment">
          <div className="grid gap-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <CardTitle>SSL Commerz</CardTitle>
                        <CardDescription>
                          {t('admin_settings_payment_ssl_desc')}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="ssl-enable">{t('admin_settings_payment_enable')}</Label>
                        <Switch id="ssl-enable" />
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="ssl-store-id">{t('admin_settings_payment_store_id')}</Label>
                        <Input id="ssl-store-id" placeholder="Your Store ID" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ssl-store-password">{t('admin_settings_payment_store_pass')}</Label>
                        <Input id="ssl-store-password" type="password" placeholder="Your Store Password" />
                    </div>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <CardTitle>Pipra Pay</CardTitle>
                        <CardDescription>
                           {t('admin_settings_payment_piprapay_desc')}
                        </CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <Label htmlFor="piprapay-enable">{t('admin_settings_payment_enable')}</Label>
                        <Switch id="piprapay-enable" />
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="piprapay-api-key">{t('admin_settings_payment_api_key')}</Label>
                        <Input id="piprapay-api-key" placeholder="Your Pipra Pay API Key" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="piprapay-api-secret">{t('admin_settings_payment_api_secret')}</Label>
                        <Input id="piprapay-api-secret" type="password" placeholder="Your API Secret" />
                    </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>{t('admin_settings_payment_manual_title')}</CardTitle>
                    <CardDescription>
                      {t('admin_settings_payment_manual_desc')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="manual-instructions">{t('admin_settings_payment_manual_instructions')}</Label>
                        <Textarea id="manual-instructions" placeholder="e.g., 'Please send payment to bKash number 01xxxxxxxxx and enter the transaction ID below.'" rows={5}/>
                    </div>
                </CardContent>
            </Card>
             <CardFooter className="border-t pt-6">
                <Button>{t('admin_settings_save_button')}</Button>
              </CardFooter>
          </div>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social">
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Social Media Links</CardTitle>
                    <CardDescription>Manage the social media links that appear in your site's header and footer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="twitter-url">Twitter URL</Label>
                        <Input id="twitter-url" placeholder="https://twitter.com/yourprofile" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github-url">GitHub URL</Label>
                        <Input id="github-url" placeholder="https://github.com/yourprofile" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                        <Input id="linkedin-url" placeholder="https://linkedin.com/in/yourprofile" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>{t('admin_settings_save_button')}</Button>
                </CardFooter>
            </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo">
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Global SEO Settings</CardTitle>
                    <CardDescription>Manage default SEO settings for your entire website.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="meta-title">Meta Title</Label>
                        <Input id="meta-title" placeholder="Your Awesome Website Title" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="meta-description">Meta Description</Label>
                        <Textarea id="meta-description" placeholder="A brief, compelling description of your website." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="og-image">Open Graph (OG) Image</Label>
                        <Input id="og-image" type="file" />
                        <p className="text-sm text-muted-foreground">Recommended size: 1200x630px. This image appears when you share links on social media.</p>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button>{t('admin_settings_save_button')}</Button>
                </CardFooter>
            </Card>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations">
             <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t('admin_settings_integrations_title')}</CardTitle>
                <CardDescription>
                  {t('admin_settings_integrations_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ga-id">{t('admin_settings_integrations_ga_id')}</Label>
                  <Input id="ga-id" placeholder="UA-12345678-1" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="fb-pixel-id">{t('admin_settings_integrations_fb_pixel')}</Label>
                  <Input id="fb-pixel-id" placeholder="Your Pixel ID" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t('admin_settings_save_button')}</Button>
              </CardFooter>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                  <div className='flex items-center gap-2'>
                    <KeyRound className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>{t('admin_settings_api_title')}</CardTitle>
                  </div>
                <CardDescription>
                  {t('admin_settings_api_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translate-api-key">{t('admin_settings_api_translate_key')}</Label>
                  <Input id="translate-api-key" type="password" placeholder="Enter your Google Translate API Key" />
                   <p className="text-sm text-muted-foreground">
                    {t('admin_settings_api_translate_desc')}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t('admin_settings_save_button')}</Button>
              </CardFooter>
            </Card>
        </TabsContent>

        {/* Email Tab */}
         <TabsContent value="email">
             <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t('admin_settings_email_title')}</CardTitle>
                <CardDescription>
                  {t('admin_settings_email_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">{t('admin_settings_email_admin_email')}</Label>
                  <Input id="admin-email" type="email" placeholder="admin@example.com" />
                   <p className="text-sm text-muted-foreground">{t('admin_settings_email_admin_email_desc')}</p>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="from-email">{t('admin_settings_email_from_email')}</Label>
                  <Input id="from-email" type="email" placeholder="noreply@telisweb.com" />
                   <p className="text-sm text-muted-foreground">{t('admin_settings_email_from_email_desc')}</p>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="order-confirmation-email" defaultChecked/>
                    <Label htmlFor="order-confirmation-email">{t('admin_settings_email_send_confirmation')}</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t('admin_settings_save_button')}</Button>
              </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    