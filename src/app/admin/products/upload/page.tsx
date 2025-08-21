
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
import { ArrowLeft, Loader2, DollarSign, Percent, Package } from 'lucide-react';
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
import { v4 as uuidv4 } from 'uuid';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
  
  business_model_id: z.coerce.number(),
  affiliate_url: z.string().optional(),
  commission_rate: z.coerce.number().optional(),
  supplier_price: z.coerce.number().optional(),
  min_stock_alert: z.coerce.number().optional(),
  auto_restock: z.boolean().optional(),
  shipping_weight: z.coerce.number().optional(),
  
  product_image: z.instanceof(FileList).refine(files => files.length > 0, 'Product image is required.'),
  digital_file: z.instanceof(FileList).optional(),
});

type FormData = z.infer<typeof formSchema>;
type BusinessModel = 'digital' | 'dropship' | 'affiliate';

export default function UploadProductPage() {
  const [model, setModel] = useState<BusinessModel>('digital');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      tags: '',
      business_model_id: 1, // Default to digital
      auto_restock: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('id', uuidv4());
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('price', String(data.price));
    formData.append('category', data.category);
    formData.append('tags', data.tags || '');
    formData.append('business_model_id', String(data.business_model_id));
    formData.append('affiliate_url', data.affiliate_url || '');
    formData.append('commission_rate', String(data.commission_rate || 0));
    formData.append('supplier_price', String(data.supplier_price || 0));
    formData.append('min_stock_alert', String(data.min_stock_alert || 0));
    formData.append('auto_restock', String(data.auto_restock || false));
    formData.append('shipping_weight', String(data.shipping_weight || 0));
    formData.append('rating', '0');
    formData.append('reviews', '0');
    
    if (data.product_image[0]) {
      formData.append('product_image', data.product_image[0]);
    }
     if (data.digital_file?.[0]) {
      formData.append('digital_file', data.digital_file[0]);
    }

    try {
        const response = await fetch('/api/admin/products', {
            method: 'POST',
            body: formData, // No Content-Type header needed, browser sets it for FormData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong');
        }

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
    <Form {...form}>
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
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
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                      <Input placeholder="e.g., Pro UI Kit" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short description of the product."
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                  )}
              />
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
               <FormField
                  control={form.control}
                  name="affiliate_url"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliate URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/product-link"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="commission_rate"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Rate</FormLabel>
                    <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="5"
                        {...field}
                        disabled={isLoading}
                      />
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                  )}
              />
            </CardContent>
          </Card>

          {/* Product Media */}
          <Card>
            <CardHeader>
              <CardTitle>Product Media</CardTitle>
              <CardDescription>Upload preview images for the product.</CardDescription>
            </CardHeader>
            <CardContent>
                 <FormField
                  control={form.control}
                  name="product_image"
                  render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                     <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <Input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => onChange(e.target.files)}
                          {...rest}
                          disabled={isLoading}
                      />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                  )}
              />
            </CardContent>
          </Card>

          {/* Digital File Upload */}
          <Card className={cn(model !== 'digital' && 'hidden')}>
            <CardHeader>
                <CardTitle>Digital File</CardTitle>
                <CardDescription>Upload the downloadable product file.</CardDescription>
            </CardHeader>
            <CardContent>
                <FormField
                  control={form.control}
                  name="digital_file"
                  render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Product File (.zip, .pdf, etc.)</FormLabel>
                    <FormControl>
                        <Input 
                            type="file"
                            onChange={(e) => onChange(e.target.files)}
                            {...rest}
                            disabled={isLoading}
                        />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                  )}
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
                 <FormField
                  control={form.control}
                  name="supplier_price"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Price</FormLabel>
                    <FormControl>
                     <div className="relative">
                        <Input type="number" placeholder="25.00" {...field} disabled={isLoading} />
                        <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     </div>
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                  )}
              />
                <FormField
                  control={form.control}
                  name="shipping_weight"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Weight (kg)</FormLabel>
                    <FormControl>
                    <div className="relative">
                        <Input type="number" placeholder="0.5" {...field} disabled={isLoading} />
                         <Package className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                  )}
              />
                 <FormField
                  control={form.control}
                  name="min_stock_alert"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Stock Alert</FormLabel>
                    <FormControl>
                      <Input type="number" defaultValue="5" {...field} disabled={isLoading} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                  )}
              />
                <FormField
                    control={form.control}
                    name="auto_restock"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 pt-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel htmlFor="auto-restock" className="text-sm font-medium leading-none !mt-0">Auto-restock from supplier</FormLabel>
                      </FormItem>
                    )}
                 />
            </CardContent>
           </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                          <Input type="number" placeholder="49.99" {...field} disabled={isLoading} />
                          <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
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
                        <FormMessage />
                    </FormItem>
                    )}
                />
              <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <Input placeholder="web, react, tailwind" {...field} disabled={isLoading} />
                    </FormControl>
                     <p className="text-xs text-muted-foreground">
                        Comma-separated values.
                    </p>
                    <FormMessage />
                  </FormItem>
                  )}
              />
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
    </Form>
  );
}
