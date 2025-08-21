
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
import { Globe, Palette, Wallet, Share2, Mail, KeyRound, Settings, Link as LinkIcon, Search as SearchIcon, Copy, RefreshCw, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const themeSchema = z.object({
  primary: z.string().regex(/^\d{1,3}\s\d{1,3}%\s\d{1,3}%$/, "Invalid HSL format"),
  background: z.string().regex(/^\d{1,3}\s\d{1,3}%\s\d{1,3}%$/, "Invalid HSL format"),
  accent: z.string().regex(/^\d{1,3}\s\d{1,3}%\s\d{1,3}%$/, "Invalid HSL format"),
});

type ThemeFormData = z.infer<typeof themeSchema>;

function hslStringToColor(hslString: string) {
    if (!hslString) return '#000000';
    const [h, s, l] = hslString.split(' ').map(val => parseFloat(val.replace('%', '')));
    let r, g, b;
    const saturation = s / 100;
    const lightness = l / 100;

    if (saturation === 0) {
        r = g = b = lightness;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        const hue = h / 360;
        r = hue2rgb(p, q, hue + 1 / 3);
        g = hue2rgb(p, q, hue);
        b = hue2rgb(p, q, hue - 1 / 3);
    }
    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function colorToHslString(hex: string): string {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return `${h} ${s}% ${l}%`;
}


export default function AdminSettingsPage() {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState('your-secret-api-key-placeholder');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThemeSubmitting, setIsThemeSubmitting] = useState(false);
  const { toast } = useToast();

  const themeForm = useForm<ThemeFormData>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      primary: "142 76% 43%",
      background: "220 20% 7%",
      accent: "220 20% 18%",
    },
  });

  const onThemeSubmit = async (data: ThemeFormData) => {
    setIsThemeSubmitting(true);
    try {
        const response = await fetch('/api/admin/theme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update theme.');
        }

        toast({
            title: 'Theme Updated',
            description: 'Your new color theme has been applied. You may need to refresh the page to see all changes.',
        });

    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Theme Update Failed',
            description: error.message,
        });
    } finally {
        setIsThemeSubmitting(false);
    }
  }

  const generateApiKey = () => {
    setIsGenerating(true);
    const newKey = `telis_sk_${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;
    setTimeout(() => {
        setApiKey(newKey);
        setIsGenerating(false);
        toast({
            title: "API Key Generated",
            description: "Your new API key has been successfully generated.",
        });
    }, 500);
  };
  
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
        title: "Copied to Clipboard",
        description: "The API key has been copied to your clipboard.",
    });
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('admin_settings_title')}</h1>
      <p className="text-muted-foreground">
        {t('admin_settings_subtitle')}
      </p>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
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
          <TabsTrigger value="api-keys">
            <KeyRound className="mr-2 h-4 w-4" /> API Keys
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
          <Form {...themeForm}>
            <form onSubmit={themeForm.handleSubmit(onThemeSubmit)}>
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
                    <div className="space-y-2">
                      <Label htmlFor="favicon">Favicon</Label>
                      <Input id="favicon" type="file" accept="image/x-icon, image/png, image/svg+xml" />
                      <p className="text-sm text-muted-foreground">Upload a new favicon (.ico, .png, .svg).</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">{t('admin_settings_appearance_colors')}</h4>
                    <p className="text-sm text-muted-foreground mb-4">Change the HSL values to update the site's theme. Use a tool like <a href="https://hslpicker.com/" target="_blank" rel="noopener noreferrer" className="underline text-primary">hslpicker.com</a> to find colors.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <FormField
                            control={themeForm.control}
                            name="primary"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t('admin_settings_appearance_primary')}</FormLabel>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="color"
                                        value={hslStringToColor(field.value)}
                                        onChange={(e) => field.onChange(colorToHslString(e.target.value))}
                                        className="p-1 h-10 w-10 flex-shrink-0"
                                    />
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={themeForm.control}
                            name="background"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t('admin_settings_appearance_background')}</FormLabel>
                                 <div className="flex items-center gap-2">
                                    <Input
                                        type="color"
                                        value={hslStringToColor(field.value)}
                                        onChange={(e) => field.onChange(colorToHslString(e.target.value))}
                                        className="p-1 h-10 w-10 flex-shrink-0"
                                    />
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={themeForm.control}
                            name="accent"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t('admin_settings_appearance_accent')}</FormLabel>
                                 <div className="flex items-center gap-2">
                                    <Input
                                        type="color"
                                        value={hslStringToColor(field.value)}
                                        onChange={(e) => field.onChange(colorToHslString(e.target.value))}
                                        className="p-1 h-10 w-10 flex-shrink-0"
                                    />
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isThemeSubmitting}>
                     {isThemeSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('admin_settings_save_button')}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
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

        {/* API Keys Tab */}
        <TabsContent value="api-keys">
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>API Key Management</CardTitle>
                    <CardDescription>Create and manage API keys for external services and automation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="api-key">Your API Key</Label>
                        <div className="flex items-center gap-2">
                            <Input id="api-key" value={apiKey} readOnly />
                            <Button variant="outline" size="icon" onClick={copyApiKey}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                         <p className="text-sm text-muted-foreground">
                            Keep this key secure. Do not expose it in client-side code.
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6 justify-between">
                    <p className="text-sm text-destructive">Generating a new key will invalidate the old one.</p>
                    <Button onClick={generateApiKey} disabled={isGenerating}>
                        {isGenerating && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                        Generate New API Key
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
