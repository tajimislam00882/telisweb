
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
  created_at: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  tags: string[];
  rating: number;
  reviews: number;
  sales?: number;
  file_type?: string | null;
  file_size?: string | null;
  digital_file_url?: string | null;
  
  // Business model specific fields
  business_model_id?: number;
  supplier_id?: string | null; 
  affiliate_url?: string | null;
  commission_rate?: number | null;
  supplier_price?: number | null;
  profit_margin?: number | null;
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
    id: string; 
    company_name: string;
    contact_person?: string;
    email?: string;
    phone?: string;
    address?: string;
    api_endpoint?: string;
    status: 'active' | 'inactive' | 'pending';
    rating?: number;
    created_at?: string;
    payment_terms?: string;
    shipping_policy?: string;
}

export interface Order {
    id: string;
    user_id: string;
    total_amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    payment_method: string;
    created_at: string;
    users?: { // For fetching user metadata
        raw_user_meta_data?: {
            first_name?: string;
            last_name?: string;
        }
    } | null;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price_at_purchase: number;
    products?: { // For joining with products table
      name: string;
      image_url: string | null;
      digital_file_url: string | null;
    }
}


export interface DropshipOrder {
    id: string;
    order_id: string;
    supplier_id: string;
    supplier_order_id?: string;
    tracking_number?: string;
    supplier_status?: string;
    cost_price?: number;
    profit_amount?: number;
    shipped_at?: string;
    delivered_at?: string;
}

export interface Affiliate {
    id: string;
    user_id: string;
    affiliate_code: string;
    commission_rate: number;
    total_earnings: number;
    pending_earnings: number;
    paid_earnings: number;
    status: 'active' | 'inactive' | 'pending' | 'suspended';
    payment_method: 'bank' | 'bkash' | 'nagad' | 'rocket';
    payment_details?: any; // JSON
    created_at: string;
    users: { // This structure matches the actual Supabase response
        raw_user_meta_data?: {
            first_name?: string;
            last_name?: string;
        }
    } | null;
}

export interface Commission {
    id: string;
    affiliate_id: string;
    order_id: string;
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

export interface SiteSettings {
  general: {
    site_name: string;
    currency: string;
    contact_email: string;
    company_address: string;
  };
  appearance: {
    logo_url: string;
    favicon_url: string;
    primary_color: string;
    background_color: string;
    accent_color: string;
  };
  payment_gateways: {
    [key: string]: {
      enabled: boolean;
      api_key?: string;
      api_secret?: string;
      store_id?: string;
      store_password?: string;
    };
  };
  social_links: {
      twitter_url: string;
      github_url: string;
      linkedin_url: string;
  };
  seo: {
      meta_title: string;
      meta_description: string;
      og_image_url: string;
  };
  integrations: {
    google_analytics_id?: string;
    facebook_pixel_id?: string;
    google_translate_api_key?: string;
    api_key?: string;
  };
  email: {
    admin_email: string;
    from_email: string;
    send_order_confirmation: boolean;
  }
}
