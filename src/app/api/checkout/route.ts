import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { CartItem } from '@/context/cart-context';
import { v4 as uuidv4 } from 'uuid';

const checkoutSchema = z.object({
  cart: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    category: z.string(),
    quantity: z.number(),
    // Add other fields from CartItem if they exist and are sent from client
    fileType: z.string().optional(),
    fileSize: z.string().optional(),
  })),
  userId: z.string().uuid(),
  totalAmount: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address: z.string(),
  paymentMethod: z.string(),
});

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  );

  try {
    const body = await request.json();
    const validatedFields = checkoutSchema.safeParse(body);

    if (!validatedFields.success) {
      console.error('Checkout validation error:', validatedFields.error.errors);
      return NextResponse.json({ error: 'Invalid form data. Please check your inputs.' }, { status: 400 });
    }

    const { userId, totalAmount, cart, paymentMethod } = validatedFields.data;
    const cartItems: CartItem[] = cart;
    const orderId = uuidv4();

    // Here you would fetch payment gateway credentials from a secure table
    // For now, we simulate this.
    const isSslCommerz = paymentMethod === 'sslcommerz';
    const isPipraPay = paymentMethod === 'piprapay';
    
    const storeId = process.env.SSLCZ_STORE_ID;
    const storePassword = process.env.SSLCZ_STORE_PASSWORD;
    const isLive = false; // Set to true for production


    if (isSslCommerz && storeId && storePassword) {
        //  const sslcz = new SSLCommerz(storeId, storePassword, isLive);
        const paymentData = {
          total_amount: totalAmount,
          currency: 'BDT',
          tran_id: orderId,
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
          fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`,
          ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/ipn`,
          shipping_method: 'Courier',
          product_name: cartItems.map(item => item.name).join(', '),
          product_category: 'Digital Goods',
          product_profile: 'general',
          cus_name: `${validatedFields.data.firstName} ${validatedFields.data.lastName}`,
          cus_email: validatedFields.data.email,
          cus_add1: validatedFields.data.address,
          cus_city: 'N/A',
          cus_state: 'N/A',
          cus_postcode: 'N/A',
          cus_country: 'Bangladesh',
          cus_phone: 'N/A',
        };
        console.log("Would redirect to SSL Commerz with data:", paymentData);
      
    } else if (isSslCommerz) {
         console.warn("SSL Commerz credentials not set. Skipping payment gateway. Order will be 'pending'.");
    }

    if (isPipraPay) {
      console.warn("Pipra Pay selected, but integration is not yet live. Order will be 'pending'.");
    }

    // 1. Create a new order in the 'orders' table
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        user_id: userId,
        total_amount: totalAmount,
        status: 'pending', // Default status
        payment_method: paymentMethod,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return NextResponse.json({ error: 'Could not create your order.' }, { status: 500 });
    }

    // 2. Insert items into the 'order_items' table
    const orderItemsData = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (itemsError) {
      console.error('Order items insertion error:', itemsError);
      await supabase.from('orders').delete().eq('id', orderId);
      return NextResponse.json({ error: 'Could not save order details.' }, { status: 500 });
    }

    // 3. For now, since payment gateway is not live, we proceed directly to confirmation.
    return NextResponse.json({ message: 'success', orderId: orderId });

  } catch (e: any) {
    console.error('Checkout API error:', e);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
