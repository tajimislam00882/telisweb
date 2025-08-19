'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Landmark, Loader2 } from 'lucide-react';
import { handleCheckout } from '@/app/actions/checkout';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? 'Processing...' : 'Proceed to Payment'}
        </Button>
    );
}

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    
    const initialState = { message: '', orderId: null, error: null };

    const [state, formAction] = useFormState(handleCheckout, initialState);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login?redirect=/checkout');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (state.message === 'success' && state.orderId) {
            toast({
                title: "Order Placed!",
                description: "You are being redirected to confirmation."
            });
            clearCart();
            router.push(`/order-confirmation/${state.orderId}`);
        } else if (state.error) {
             toast({
                variant: 'destructive',
                title: "Checkout Failed",
                description: state.error
            });
        }
    }, [state, router, clearCart, toast]);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    if (authLoading || !user) {
        return (
            <div className="container py-12 text-center flex justify-center items-center h-[60vh]">
                 <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (cart.length === 0 && !state?.orderId) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-3xl font-bold">Your cart is empty</h1>
                <p className="mt-2 text-muted-foreground">Add items to your cart to proceed to checkout.</p>
                <Button onClick={() => router.push('/shop')} className="mt-4">
                    Continue Shopping
                </Button>
            </div>
        );
    }
    

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <form action={formAction}>
                {/* Hidden input for cart data */}
                <input type="hidden" name="cart" value={JSON.stringify(cart)} />
                <input type="hidden" name="userId" value={user.id} />
                <input type="hidden" name="totalAmount" value={total} />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" name="firstName" defaultValue={user.user_metadata?.first_name || ''} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" name="lastName" defaultValue={user.user_metadata?.last_name || ''} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" defaultValue={user.email || ''} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Shipping Address</Label>
                                    <Input id="address" name="address" placeholder="1234 Main St" required />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup defaultValue="sslcommerz" name="paymentMethod" className="space-y-4">
                                    <Label htmlFor="sslcommerz" className="flex items-center gap-4 p-4 rounded-lg border has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer">
                                        <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                                        <CreditCard className="h-6 w-6" />
                                        <div className="flex-1">
                                            <p className="font-semibold">SSL Commerz</p>
                                            <p className="text-sm text-muted-foreground">Pay with bKash, Nagad, Rocket, or Card</p>
                                        </div>
                                    </Label>
                                     <Label htmlFor="stripe" className="flex items-center gap-4 p-4 rounded-lg border has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer">
                                        <RadioGroupItem value="stripe" id="stripe" />
                                        <Landmark className="h-6 w-6" />
                                        <div className="flex-1">
                                            <p className="font-semibold">Stripe / PayPal</p>
                                            <p className="text-sm text-muted-foreground">Pay with International Credit/Debit Card</p>
                                        </div>
                                    </Label>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </div>
                    <aside>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="rounded-md"/>
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                                <Separator />
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <SubmitButton />
                            </CardFooter>
                        </Card>
                    </aside>
                </div>
            </form>
        </div>
    );
}