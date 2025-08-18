'use client';

import Link from 'next/link';
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
import { ArrowLeft, Upload, DollarSign, Percent, Package } from 'lucide-react';
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

type BusinessModel = 'digital' | 'dropship' | 'affiliate';

export default function UploadProductPage() {
  const [model, setModel] = useState<BusinessModel>('digital');

  return (
    <div className="space-y-6">
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
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
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
                onValueChange={(value: BusinessModel) => setModel(value)}
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
                <Input id="name" placeholder="e.g., Pro UI Kit" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A short description of the product."
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission-rate">Commission Rate</Label>
                <div className="relative">
                  <Input
                    id="commission-rate"
                    type="number"
                    placeholder="5"
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
              <div className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to upload
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital File Upload */}
          <Card className={cn(model !== 'digital' && 'hidden')}>
            <CardHeader>
                <CardTitle>Digital File</CardTitle>
                <CardDescription>Upload the downloadable product file.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed">
                    <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground"/>
                        <p className="text-sm text-muted-foreground">Upload a .zip file</p>
                    </div>
                </div>
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
                        <Input id="supplier-price" type="number" placeholder="25.00"/>
                        <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="shipping-weight">Shipping Weight (kg)</Label>
                    <div className="relative">
                        <Input id="shipping-weight" type="number" placeholder="0.5"/>
                         <Package className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="min-stock">Minimum Stock Alert</Label>
                    <Input id="min-stock" type="number" defaultValue="5"/>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="auto-restock" />
                    <Label htmlFor="auto-restock" className="text-sm font-medium">Auto-restock from supplier</Label>
                </div>
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
                    <Input id="price" type="number" placeholder="49.99" />
                    <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="web, react, tailwind" />
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
                <Select>
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
        <Button variant="outline" size="sm">
          Discard
        </Button>
        <Button size="sm">Save Product</Button>
      </div>
    </div>
  );
}
