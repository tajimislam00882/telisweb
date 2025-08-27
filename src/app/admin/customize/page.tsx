
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Home, LayoutTemplate, Palette, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


const heroSchema = z.object({
  hero_title: z.string().min(1, 'Title is required'),
  hero_subtitle: z.string().min(1, 'Subtitle is required'),
  hero_cta_text: z.string().min(1, 'Button text is required'),
});

type HeroFormData = z.infer<typeof heroSchema>;

function HeroSectionForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const { toast } = useToast();

    const form = useForm<HeroFormData>({
        resolver: zodResolver(heroSchema),
        defaultValues: {
            hero_title: '',
            hero_subtitle: '',
            hero_cta_text: '',
        }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            setIsFetching(true);
            try {
                const response = await fetch('/api/admin/homepage-settings');
                if (!response.ok) throw new Error('Failed to fetch settings');
                const data = await response.json();
                form.reset(data.settings);
            } catch (error) {
                toast({ variant: 'destructive', title: 'Error', description: 'Could not load homepage settings.' });
            } finally {
                setIsFetching(false);
            }
        };
        fetchSettings();
    }, [form, toast]);
    

    const onSubmit = async (data: HeroFormData) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/homepage-settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save settings');
            }

            toast({ title: 'Success', description: 'Homepage settings saved successfully.' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>Customize the main section of your homepage.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isFetching ? (
                         <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <div className="h-10 w-full bg-muted rounded-md animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <Label>Subtitle</Label>
                                 <div className="h-20 w-full bg-muted rounded-md animate-pulse"></div>
                            </div>
                             <div className="space-y-2">
                                <Label>Call to Action Button Text</Label>
                                <div className="h-10 w-full bg-muted rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <FormField
                                control={form.control}
                                name="hero_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter main headline" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hero_subtitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subtitle</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter subtitle or description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hero_cta_text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Call to Action Button Text</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Start Shopping" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading || isFetching}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </form>
      </Form>
    );
}


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
            <TabsTrigger value="header-footer" disabled><LayoutTemplate className="mr-2 h-4 w-4"/> Header & Footer</TabsTrigger>
            <TabsTrigger value="theme" disabled><Palette className="mr-2 h-4 w-4"/> Theme</TabsTrigger>
         </TabsList>
         
         <TabsContent value="homepage">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-2 space-y-6">
                    <HeroSectionForm />
                     <Card>
                        <CardHeader>
                            <CardTitle>Featured Products Section</CardTitle>
                            <CardDescription>Select which products to highlight on the homepage.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">This section is under construction.</p>
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
                             <p className="text-sm text-muted-foreground">This section is under construction.</p>
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
                       <p className="text-sm text-muted-foreground">This section is under construction.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Footer Settings</CardTitle>
                        <CardDescription>Manage all footer links and content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-sm text-muted-foreground">This section is under construction.</p>
                    </CardContent>
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
