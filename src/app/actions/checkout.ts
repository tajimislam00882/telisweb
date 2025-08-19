'use server';

import { createRouteHandlerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import type { CartItem } from '@/context/cart-context';
import {v4 as uuidv4} from 'uuid';

const checkoutSchema = z.object({
  cart: z.string(),
  userId: z.string().uuid(),
  totalAmount: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address: z.string(),
  paymentMethod: z.string(),
});

export async function handleCheckout(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const validatedFields = checkoutSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'error',
      error: 'Invalid form data. Please check your inputs.',
    };
  }

  const { userId, totalAmount, cart, paymentMethod } = validatedFields.data;
  const cartItems: CartItem[] = JSON.parse(cart);
  const orderId = uuidv4();

  // Here you would fetch payment gateway credentials from a secure table
  // For now, we simulate this.
  const isSslCommerz = paymentMethod === 'sslcommerz';
  const isPipraPay = paymentMethod === 'piprapay';
  
  if (isSslCommerz) {
      // TODO: Fetch credentials from DB
      const storeId = process.env.SSLCZ_STORE_ID;
      const storePassword = process.env.SSLCZ_STORE_PASSWORD;
      const isLive = false; // Set to true for production

      if (!storeId || !storePassword) {
         console.warn("SSL Commerz credentials not set. Skipping payment gateway. Order will be 'pending'.");
      } else {
        //  const sslcz = new SSLCommerz(storeId, storePassword, isLive);
         const paymentData = {
              total_amount: parseFloat(totalAmount),
              currency: 'BDT',
              tran_id: orderId, // use your transaction id
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
          
          //  const apiResponse = await sslcz.init(data);
          //  If successful, apiResponse.GatewayPageURL will contain the URL to redirect to.
          //  You would return this URL to the client to perform the redirect.
          //  For now, we will just log it and proceed as if payment is pending.
          console.log("Would redirect to SSL Commerz with data:", paymentData);
      }
  }

  if (isPipraPay) {
      // TODO: Fetch Pipra Pay credentials from DB
      console.warn("Pipra Pay selected, but integration is not yet live. Order will be 'pending'.");
      // Placeholder for Pipra Pay logic
  }


  // 1. Create a new order in the 'orders' table
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      id: orderId, // Use the generated UUID
      user_id: userId,
      total_amount: parseFloat(totalAmount),
      status: 'pending',
    })
    .select()
    .single();

  if (orderError) {
    console.error('Order creation error:', orderError);
    return { message: 'error', error: 'Could not create your order.' };
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
    // Optionally, delete the created order to avoid orphaned orders
    await supabase.from('orders').delete().eq('id', orderId);
    return { message: 'error', error: 'Could not save order details.' };
  }
  
  // 3. For now, since payment gateway is not live, we proceed directly to confirmation.
  // In a real scenario, you'd redirect to the payment gateway and handle the callback.

  return { message: 'success', orderId: orderId, error: null };
}
