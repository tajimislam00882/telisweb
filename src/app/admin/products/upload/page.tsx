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
import { ArrowLeft, Upload } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/data';

export default function UploadProductPage() {
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
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Fill in the details for your new digital product.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="e.g., Pro UI Kit" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="A short description of the product." />
              </div>
            </CardContent>
          </Card>
           <Card>
                <CardHeader>
                  <CardTitle>Product Media</CardTitle>
                  <CardDescription>Upload preview images and the product file.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Preview Images</Label>
                        <div className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed">
                            <div className="text-center">
                                <Upload className="mx-auto h-8 w-8 text-muted-foreground"/>
                                <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Product File</Label>
                        <div className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed">
                             <div className="text-center">
                                <Upload className="mx-auto h-8 w-8 text-muted-foreground"/>
                                <p className="text-sm text-muted-foreground">Upload a .zip file</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="49.99" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c=>c.id !== 'all').map(cat => (
                         <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="web, react, tailwind" />
                <p className="text-xs text-muted-foreground">Comma-separated values.</p>
              </div>
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
