import type { LucideIcon } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export interface Category {
  id: string;
  name: string;
  productCount: number;
}

export interface PopularCategory extends Category {
    description: string;
    icon: LucideIcon;
    color: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  rating: number;
  reviews: number;
  sales?: number;
  tags: string[];
  fileType?: string | null;
  fileSize?: string | null;
  created_at?: string;

  // New fields for multi-business model
  business_model_id?: number;
  supplier_id?: number | null;
  affiliate_url?: string | null;
  commission_rate?: number | null; // For affiliate
  supplier_price?: number | null; // For dropshipping
  profit_margin?: number | null; // For dropshipping
  min_stock_alert?: number;
  auto_restock?: boolean;
  shipping_weight?: number | null;
  shipping_dimensions?: string | null;
}

export interface BusinessModel {
    id: number;
    name: 'digital' | 'dropship' | 'affiliate';
    status: 'active' | 'inactive';
}

export interface Supplier {
    id: number;
    company_name: string;
    contact_person?: string;
    email?: string;
    phone?: string;
    address?: string;
    api_endpoint?: string;
    status: 'active' | 'inactive' | 'pending';
    rating?: number;
}

export interface Order {
    id: number;
    user_id: string;
    total_amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    payment_method: string;
    created_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: string;
    quantity: number;
    price: number;
}


export interface DropshipOrder {
    id: number;
    order_id: number;
    supplier_id: number;
    supplier_order_id?: string;
    tracking_number?: string;
    supplier_status?: string;
    cost_price?: number;
    profit_amount?: number;
    shipped_at?: string;
    delivered_at?: string;
}

export interface Affiliate {
    id: number;
    user_id: string;
    affiliate_code: string;
    commission_rate: number;
    total_earnings: number;
    pending_earnings: number;
    paid_earnings: number;
    status: 'active' | 'inactive' | 'suspended';
    payment_method: 'bank' | 'bkash' | 'nagad' | 'rocket';
    payment_details?: any; // JSON
}

export interface Commission {
    id: number;
    affiliate_id: number;
    order_id: number;
    product_id: string;
    commission_amount: number;
    commission_rate: number;
    status: 'pending' | 'approved' | 'paid' | 'cancelled';
}

export interface Testimonial {
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
  rating: number;
}

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  badge?: number | string;
  className?: string;
  action?: () => void;
}
