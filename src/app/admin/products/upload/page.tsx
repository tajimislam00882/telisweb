'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, DollarSign, Percent, Package, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/data';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
  
  // Business model specific
  business_model_id: z.coerce.number(),
  affiliate_url: z.string().optional(),
  commission_rate: z.coerce.number().optional(),
  supplier_price: z.coerce.number().optional(),
  min_stock_alert: z.coerce.number().optional(),
  auto_restock: z.boolean().optional(),
  shipping_weight: z.coerce.number().optional(),
  
  // Files
  product_image: z.any().refine(file => file instanceof File, 'Product image is required.'),
  digital_file: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;
type BusinessModel = 'digital' | 'dropship' | 'affiliate';

export default function UploadProductPage() {
  const [model, setModel] = useState<BusinessModel>('digital');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      tags: '',
      business_model_id: 1, // Default to digital
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
        // 1. Handle image upload
        const imageFile = data.product_image as File;
        const imageExt = imageFile.name.split('.').pop();
        const imagePath = `products/${uuidv4()}.${imageExt}`;

        const { data: imageData, error: imageError } = await supabase.storage
            .from('products')
            .upload(imagePath, imageFile);

        if (imageError) throw new Error(`Image upload failed: ${imageError.message}`);

        const { data: { publicUrl: imageUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(imagePath);

        // 2. Prepare data for insertion
        const productData = {
            id: uuidv4(),
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            tags: data.tags?.split(',').map(tag => tag.trim()) || [],
            image_url: imageUrl,
            business_model_id: data.business_model_id,
            affiliate_url: data.affiliate_url,
            commission_rate: data.commission_rate,
            supplier_price: data.supplier_price,
            min_stock_alert: data.min_stock_alert,
            auto_restock: data.auto_restock,
            shipping_weight: data.shipping_weight,
        };

        // 3. Insert product data
        const { error: insertError } = await supabase.from('products').insert([productData]);

        if (insertError) throw new Error(`Failed to save product: ${insertError.message}`);

        toast({
            title: 'Product Saved!',
            description: 'Your new product has been successfully uploaded.',
        });
        router.push('/admin/products');

    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Upload Failed',
            description: error.message,
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleModelChange = (value: BusinessModel) => {
      setModel(value);
      const modelId = { digital: 1, dropship: 2, affiliate: 3 }[value];
      form.setValue('business_model_id', modelId);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Upload New Product
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" type="button" onClick={() => router.back()}>
            Discard
          </Button>
          <Button size="sm" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Product
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          {/* Business Model Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Business Model</CardTitle>
              <CardDescription>
                Select the type of product you are adding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={model}
                onValueChange={handleModelChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a business model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital">Digital Product</SelectItem>
                  <SelectItem value="dropship">Dropship Product</SelectItem>
                  <SelectItem value="affiliate">Affiliate Product</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Fill in the details for your new product.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="e.g., Pro UI Kit" {...form.register('name')} disabled={isLoading} />
                {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A short description of the product."
                  {...form.register('description')}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>

          {/* Conditional Affiliate Section */}
          <Card className={cn(model !== 'affiliate' && 'hidden')}>
            <CardHeader>
              <CardTitle>Affiliate Details</CardTitle>
              <CardDescription>
                Provide the affiliate link and commission rate.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="affiliate-url">Affiliate URL</Label>
                <Input
                  id="affiliate-url"
                  placeholder="https://example.com/product-link"
                  {...form.register('affiliate_url')}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission-rate">Commission Rate</Label>
                <div className="relative">
                  <Input
                    id="commission-rate"
                    type="number"
                    placeholder="5"
                    {...form.register('commission_rate')}
                    disabled={isLoading}
                  />
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Media */}
          <Card>
            <CardHeader>
              <CardTitle>Product Media</CardTitle>
              <CardDescription>Upload preview images for the product.</CardDescription>
            </CardHeader>
            <CardContent>
                <Label htmlFor="product-image">Product Image</Label>
                <Input 
                    id="product-image" 
                    type="file"
                    accept="image/*"
                    {...form.register('product_image')} 
                    disabled={isLoading}
                />
                {form.formState.errors.product_image && <p className="text-sm text-destructive">{form.formState.errors.product_image.message as string}</p>}
            </CardContent>
          </Card>

          {/* Digital File Upload */}
          <Card className={cn(model !== 'digital' && 'hidden')}>
            <CardHeader>
                <CardTitle>Digital File</CardTitle>
                <CardDescription>Upload the downloadable product file.</CardDescription>
            </CardHeader>
            <CardContent>
                <Label htmlFor="digital-file">Product File (.zip, .pdf, etc.)</Label>
                <Input 
                    id="digital-file" 
                    type="file"
                    {...form.register('digital_file')} 
                    disabled={isLoading}
                />
            </CardContent>
          </Card>
           
          {/* Shipping & Inventory Section */}
           <Card className={cn(model !== 'dropship' && 'hidden')}>
            <CardHeader>
                <CardTitle>Inventory & Shipping</CardTitle>
                <CardDescription>Manage stock and shipping details for dropshipping.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="supplier-price">Supplier Price</Label>
                     <div className="relative">
                        <Input id="supplier-price" type="number" placeholder="25.00" {...form.register('supplier_price')} disabled={isLoading} />
                        <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="shipping-weight">Shipping Weight (kg)</Label>
                    <div className="relative">
                        <Input id="shipping-weight" type="number" placeholder="0.5" {...form.register('shipping_weight')} disabled={isLoading} />
                         <Package className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="min-stock">Minimum Stock Alert</Label>
                    <Input id="min-stock" type="number" defaultValue="5" {...form.register('min_stock_alert')} disabled={isLoading} />
                </div>
                <Controller
                    control={form.control}
                    name="auto_restock"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-restock" checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        <Label htmlFor="auto-restock" className="text-sm font-medium">Auto-restock from supplier</Label>
                      </div>
                    )}
                 />
            </CardContent>
           </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Selling Price</Label>
                 <div className="relative">
                    <Input id="price" type="number" placeholder="49.99" {...form.register('price')} disabled={isLoading} />
                    <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                 {form.formState.errors.price && <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories
                            .filter((c) => c.id !== 'all')
                            .map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                />
                 {form.formState.errors.category && <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="web, react, tailwind" {...form.register('tags')} disabled={isLoading} />
                <p className="text-xs text-muted-foreground">
                  Comma-separated values.
                </p>
              </div>
            </CardContent>
          </Card>
          
           <Card className={cn(model !== 'dropship' && 'hidden')}>
            <CardHeader>
                <CardTitle>Supplier</CardTitle>
            </CardHeader>
            <CardContent>
                <Select disabled={isLoading}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a supplier" />
                    </SelectTrigger>
                    <SelectContent>
                       {/* This should be populated from the database */}
                       <SelectItem value="supplier-1">Supplier A</SelectItem>
                       <SelectItem value="supplier-2">Supplier B</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
           </Card>

        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm" type="button" onClick={() => router.back()}>
          Discard
        </Button>
        <Button size="sm" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Product
        </Button>
      </div>
    </form>
  );
}
