
'use client';

import {
  Card,
  CardContent,
  CardDescription,
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
import { Home, LayoutTemplate, Palette } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CustomizePage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">Website Customization</h1>
       <p className="text-muted-foreground">
        Control your website's content and appearance from here.
      </p>

       <Tabs defaultValue="homepage" className="w-full">
         <TabsList>
            <TabsTrigger value="homepage"><Home className="mr-2 h-4 w-4"/> Homepage</TabsTrigger>
            <TabsTrigger value="header-footer"><LayoutTemplate className="mr-2 h-4 w-4"/> Header & Footer</TabsTrigger>
            <TabsTrigger value="theme"><Palette className="mr-2 h-4 w-4"/> Theme</TabsTrigger>
         </TabsList>
         
         <TabsContent value="homepage">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-2 space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                            <CardDescription>Customize the main section of your homepage.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="hero-title">Title</Label>
                                <Input id="hero-title" placeholder="Enter main headline" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hero-subtitle">Subtitle</Label>
                                <Textarea id="hero-subtitle" placeholder="Enter subtitle or description"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hero-cta">Call to Action Button Text</Label>
                                <Input id="hero-cta" placeholder="e.g., Start Shopping" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="hero-image">Banner Image</Label>
                                <Input id="hero-image" type="file" />
                                <p className="text-xs text-muted-foreground">Recommended size: 1400x800px.</p>
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Featured Products Section</CardTitle>
                            <CardDescription>Select which products to highlight on the homepage.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Product selection component will be here.</p>
                        </CardContent>
                    </Card>
                </div>
                 <div className="md:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>Testimonials Section</CardTitle>
                            <CardDescription>Manage customer testimonials shown on the homepage.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground">Testimonial management component will be here.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
         </TabsContent>

         <TabsContent value="header-footer">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Header Settings</CardTitle>
                        <CardDescription>Manage navigation menu items.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Navigation Links</Label>
                            <div className="space-y-2">
                                <Input defaultValue="Home" />
                                <Input defaultValue="Shop" />
                                <Input defaultValue="Contact" />
                            </div>
                             <Button variant="outline" size="sm">Add Menu Item</Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Header</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Footer Settings</CardTitle>
                        <CardDescription>Manage all footer links and content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                             <Label className="font-semibold">Quick Links</Label>
                              <div className="space-y-2 mt-2">
                                <Input defaultValue="Home" />
                                <Input defaultValue="Shop" />
                                <Input defaultValue="Contact" />
                                <Input defaultValue="Dashboard" />
                            </div>
                        </div>
                        <Separator />
                         <div>
                             <Label className="font-semibold">Partnership</Label>
                              <div className="space-y-2 mt-2">
                                <Input defaultValue="Affiliate Program" />
                                <Input defaultValue="Become a Supplier" />
                                <Input defaultValue="Influencer Program" />
                            </div>
                        </div>
                         <Separator />
                        <div>
                            <Label className="font-semibold">Social Media Links</Label>
                             <div className="space-y-2 mt-2">
                                <Input placeholder="Twitter URL" />
                                <Input placeholder="GitHub URL" />
                                <Input placeholder="LinkedIn URL" />
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button>Save Footer</Button>
                    </CardFooter>
                </Card>
             </div>
         </TabsContent>
          <TabsContent value="theme">
            <Card className="mt-6">
                 <CardHeader>
                    <CardTitle>Theme Settings</CardTitle>
                    <CardDescription>This section is under construction.</CardDescription>
                </CardHeader>
            </Card>
          </TabsContent>
       </Tabs>
    </div>
  );
}
