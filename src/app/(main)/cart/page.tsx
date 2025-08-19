
'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.00; // Example shipping cost
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container py-12 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-8">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Product</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 h-8 text-center"
                          />
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
           <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
            </div>
        </div>
        <aside className="sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}
