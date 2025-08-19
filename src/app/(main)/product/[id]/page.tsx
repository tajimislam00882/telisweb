
'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Zap, FileText, DownloadCloud } from 'lucide-react';
import ProductCard from '@/components/shop/product-card';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const router = useRouter();
  
  const productId = typeof params.id === 'string' ? params.id : '';
  // This is temporary, will be replaced with DB fetch
  const product = products.find((p) => p.id === productId);
  
  if (!product) {
    notFound();
  }
  
  const cartProduct = {
      ...product,
      imageUrl: product.image_url || 'https://placehold.co/600x400.png',
      fileType: product.file_type || 'N/A',
      fileSize: product.file_size || 'N/A',
  };

  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);


  const handleBuyNow = () => {
    addToCart(cartProduct);
    router.push('/cart');
  };

  return (
    <div className="container py-12 text-foreground">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Image
            src={cartProduct.imageUrl}
            alt={product.name}
            width={800}
            height={600}
            className="w-full rounded-lg object-cover shadow-lg border border-border/20"
            data-ai-hint="digital product"
          />
        </div>
        <div className="space-y-6">
          <Badge variant="outline" className="capitalize border-primary/50 text-primary">{product.category}</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            {product.name}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            <div className="h-6 border-l border-border/20"></div>
             <span className="text-sm text-green-500 font-medium">In Stock</span>
          </div>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          
          <div className="rounded-lg border border-border/20 bg-card p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>File Type: <span className="font-medium text-foreground">{cartProduct.fileType}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <DownloadCloud className="h-4 w-4 text-muted-foreground" />
                <span>File Size: <span className="font-medium text-foreground">{cartProduct.fileSize}</span></span>
            </div>
             <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span>Delivery: <span className="font-medium text-foreground">Instant Download</span></span>
            </div>
          </div>
          
          <p className="text-4xl font-bold text-primary">${product.price}</p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="w-full" onClick={() => addToCart(cartProduct)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight text-center sm:text-3xl font-headline mb-8">Related Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
