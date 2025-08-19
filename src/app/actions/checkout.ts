'use server';

import { createRouteHandlerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import type { CartItem } from '@/context/cart-context';

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

  const { userId, totalAmount, cart } = validatedFields.data;
  const cartItems: CartItem[] = JSON.parse(cart);

  // 1. Create a new order in the 'orders' table
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
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

  const orderId = orderData.id;

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

  // 3. (Future Step) Initiate payment with the selected payment gateway
  // For now, we'll just return a success message with the order ID.

  return { message: 'success', orderId: orderId, error: null };
}
