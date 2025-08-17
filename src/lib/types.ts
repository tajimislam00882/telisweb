import type { LucideIcon } from 'lucide-react';

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
  imageUrl: string;
  rating: number;
  reviews: number;
  tags: string[];
  fileType: string;
  fileSize: string;
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
}
