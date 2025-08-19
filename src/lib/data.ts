import type { Product, Category, Testimonial, PopularCategory } from './types';
import { Book, Brush, Code, Film, Smartphone } from 'lucide-react';

export const categories: Category[] = [
  { id: 'all', name: 'cat_all', productCount: 12 },
  { id: 'ui-kits', name: 'cat_ui_kits', productCount: 4 },
  { id: 'icons', name: 'cat_icons', productCount: 3 },
  { id: 'templates', name: 'cat_templates', productCount: 3 },
  { id: 'ebooks', name: 'cat_ebooks', productCount: 2 },
];

export const popularCategories: PopularCategory[] = [
    { id: 'ebooks', name: 'pop_cat_ebook_name', description: 'pop_cat_ebook_desc', productCount: 100, icon: Book, color: 'from-green-400 to-green-600' },
    { id: 'software', name: 'pop_cat_software_name', description: 'pop_cat_software_desc', productCount: 150, icon: Code, color: 'from-purple-400 to-purple-600' },
    { id: 'templates', name: 'pop_cat_template_name', description: 'pop_cat_template_desc', productCount: 500, icon: Brush, color: 'from-blue-400 to-blue-600' },
    { id: 'course', name: 'pop_cat_course_name', description: 'pop_cat_course_desc', productCount: 200, icon: Film, color: 'from-yellow-400 to-yellow-600' },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Pro UI Kit',
    description: 'A professional UI kit for modern web applications.',
    price: 49.99,
    category: 'ui-kits',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.8,
    reviews: 120,
    sales: 500,
    tags: ['web', 'react', 'tailwind'],
    fileType: 'Figma, Sketch',
    fileSize: '120MB',
  },
  {
    id: 'prod-002',
    name: 'Minimalist Icon Set',
    description: 'A set of 200+ minimalist icons for any project.',
    price: 19.99,
    category: 'icons',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.9,
    reviews: 250,
    sales: 1200,
    tags: ['icons', 'minimal', 'svg'],
    fileType: 'SVG, PNG',
    fileSize: '15MB',
  },
  {
    id: 'prod-003',
    name: 'Agency Website Template',
    description: 'A complete Next.js template for creative agencies.',
    price: 79.99,
    category: 'templates',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.7,
    reviews: 80,
    sales: 300,
    tags: ['nextjs', 'agency', 'portfolio'],
    fileType: 'Next.js Project',
    fileSize: '25MB',
  },
  {
    id: 'prod-004',
    name: 'The Art of Digital Sales',
    description: 'An e-book on mastering digital product sales.',
    price: 29.99,
    category: 'ebooks',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.9,
    reviews: 450,
    sales: 2500,
    tags: ['business', 'marketing', 'sales'],
    fileType: 'PDF, EPUB',
    fileSize: '5MB',
  },
  {
    id: 'prod-005',
    name: 'Mobile App UI Kit',
    description: 'Design your next mobile app with this extensive UI kit.',
    price: 59.99,
    category: 'ui-kits',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.8,
    reviews: 150,
    sales: 450,
    tags: ['mobile', 'ios', 'android'],
    fileType: 'Figma',
    fileSize: '180MB',
  },
  {
    id: 'prod-006',
    name: 'Landing Page Template Pack',
    description: 'A pack of 5 high-converting landing page templates.',
    price: 69.99,
    category: 'templates',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.6,
    reviews: 75,
    sales: 250,
    tags: ['landing page', 'conversion', 'html'],
    fileType: 'HTML, CSS, JS',
    fileSize: '10MB',
  },
  {
    id: 'prod-007',
    name: 'Data Visualization Icons',
    description: 'A unique set of icons for charts and graphs.',
    price: 24.99,
    category: 'icons',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.9,
    reviews: 180,
    sales: 800,
    tags: ['data', 'charts', 'icons'],
    fileType: 'SVG',
    fileSize: '8MB',
  },
  {
    id: 'prod-008',
    name: 'SaaS Dashboard UI Kit',
    description: 'A complete UI kit for building SaaS dashboards.',
    price: 89.99,
    category: 'ui-kits',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 3.9,
    reviews: 210,
    sales: 600,
    tags: ['saas', 'dashboard', 'analytics'],
    fileType: 'Figma, Adobe XD',
    fileSize: '250MB',
  },
];

export const testimonials: Testimonial[] = [
    {
        name: 'testimonial_sarah_name',
        role: 'testimonial_sarah_role',
        avatarUrl: 'https://placehold.co/100x100.png',
        quote: "testimonial_sarah_quote",
        rating: 5,
    },
    {
        name: 'testimonial_michael_name',
        role: 'testimonial_michael_role',
        avatarUrl: 'https://placehold.co/100x100.png',
        quote: "testimonial_michael_quote",
        rating: 5,
    },
    {
        name: 'testimonial_emily_name',
        role: 'testimonial_emily_role',
        avatarUrl: 'https://placehold.co/100x100.png',
        quote: "testimonial_emily_quote",
        rating: 4,
    }
];

export const trustLogos = [
    { src: 'https://placehold.co/150x50.png', alt: 'Company 1' },
    { src: 'https://placehold.co/150x50.png', alt: 'Company 2' },
    { src: 'https://placehold.co/150x50.png', alt: 'Company 3' },
    { src: 'https://placehold.co/150x50.png', alt: 'Company 4' },
    { src: 'https://placehold.co/150x50.png', alt: 'Company 5' },
    { src: 'https://placehold.co/150x50.png', alt: 'Company 6' },
];

export const purchaseHistory = [
    { orderId: '#DE78923', date: '2023-10-15', total: 49.99, status: 'Completed', product: 'Pro UI Kit' },
    { orderId: '#DE78922', date: '2023-09-28', total: 19.99, status: 'Completed', product: 'Minimalist Icon Set' },
];

export const downloadItems = [
    { id: 'prod-001', name: 'Pro UI Kit', downloadUrl: '#', purchaseDate: '2023-10-15' },
    { id: 'prod-002', name: 'Minimalist Icon Set', downloadUrl: '#', purchaseDate: '2023-09-28' },
];

export const adminOrders = [
  { orderId: '#DE80123', date: '2023-11-05', customer: 'John Doe', total: 79.99, status: 'Completed', paymentMethod: 'Bkash' },
  { orderId: '#DE80124', date: '2023-11-05', customer: 'Jane Smith', total: 29.99, status: 'Pending', paymentMethod: 'Manual' },
  { orderId: '#DE80125', date: '2023-11-04', customer: 'Sam Wilson', total: 89.99, status: 'Completed', paymentMethod: 'Nagad' },
];
