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
import { useToast } from '@/hooks/use-toast';

function PipraPayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M972.8 384H51.2C22.9248 384 0 406.925 0 435.2V588.8C0 617.075 22.9248 640 51.2 640H972.8C1001.08 640 1024 617.075 1024 588.8V435.2C1024 406.925 1001.08 384 972.8 384Z" fill="#2D3748"/>
        <path d="M128 471.04L323.84 471.04C327.258 471.04 330.579 469.939 333.331 467.936C336.083 465.933 338.125 463.123 339.168 459.872L390.4 291.84C392.499 285.587 398.502 281.6 405.011 281.6H618.989C625.498 281.6 631.501 285.587 633.6 291.84L684.832 459.872C685.875 463.123 687.917 465.933 690.669 467.936C693.421 469.939 696.742 471.04 700.16 471.04L896 471.04L896 552.96L700.16 552.96C696.742 552.96 693.421 554.061 690.669 556.064C687.917 558.067 685.875 560.877 684.832 564.128L633.6 732.16C631.501 738.413 625.498 742.4 618.989 742.4H405.011C398.502 742.4 392.499 738.413 390.4 732.16L339.168 564.128C338.125 560.877 336.083 558.067 333.331 556.064C330.579 554.061 327.258 552.96 323.84 552.96L128 552.96L128 471.04Z" fill="white"/>
    </svg>
  );
}


export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login?redirect=/checkout');
        }
    }, [user, authLoading, router]);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 5.00;
    const total = subtotal + shipping;
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsProcessing(true);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            ...data,
            cart: cart,
            userId: user?.id,
            totalAmount: total,
        };

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'An unknown error occurred.');
            }

            toast({
                title: "Order Placed!",
                description: "You are being redirected to confirmation."
            });
            clearCart();
            router.push(`/order-confirmation/${result.orderId}`);

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Checkout Failed",
                description: error.message,
            });
        } finally {
            setIsProcessing(false);
        }
    };


    if (authLoading || !user) {
        return (
            <div className="container py-12 text-center flex justify-center items-center h-[60vh]">
                 <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (cart.length === 0) {
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
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" name="firstName" defaultValue={user.user_metadata?.first_name || ''} required disabled={isProcessing}/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" name="lastName" defaultValue={user.user_metadata?.last_name || ''} required disabled={isProcessing}/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" defaultValue={user.email || ''} required disabled={isProcessing}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Shipping Address</Label>
                                    <Input id="address" name="address" placeholder="1234 Main St" required disabled={isProcessing}/>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup defaultValue="sslcommerz" name="paymentMethod" className="space-y-4">
                                    <Label htmlFor="sslcommerz" className="flex items-center gap-4 p-4 rounded-lg border has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer transition-colors">
                                        <RadioGroupItem value="sslcommerz" id="sslcommerz" disabled={isProcessing}/>
                                        <CreditCard className="h-6 w-6" />
                                        <div className="flex-1">
                                            <p className="font-semibold">SSL Commerz</p>
                                            <p className="text-sm text-muted-foreground">Pay with bKash, Nagad, Rocket, or Card</p>
                                        </div>
                                    </Label>
                                     <Label htmlFor="stripe" className="flex items-center gap-4 p-4 rounded-lg border has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer transition-colors">
                                        <RadioGroupItem value="stripe" id="stripe" disabled={isProcessing}/>
                                        <Landmark className="h-6 w-6" />
                                        <div className="flex-1">
                                            <p className="font-semibold">Stripe / PayPal</p>
                                            <p className="text-sm text-muted-foreground">Pay with International Credit/Debit Card</p>
                                        </div>
                                    </Label>
                                     <Label htmlFor="piprapay" className="flex items-center gap-4 p-4 rounded-lg border has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer transition-colors">
                                        <RadioGroupItem value="piprapay" id="piprapay" disabled={isProcessing}/>
                                        <PipraPayIcon className="h-6 w-6" />
                                        <div className="flex-1">
                                            <p className="font-semibold">Pipra Pay</p>
                                            <p className="text-sm text-muted-foreground">Another popular payment gateway</p>
                                        </div>
                                    </Label>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </div>
                    <aside className="sticky top-24">
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
                                <Button className="w-full" type="submit" disabled={isProcessing}>
                                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </aside>
                </div>
            </form>
        </div>
    );
}
