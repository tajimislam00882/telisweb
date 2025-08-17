import type { Product, Category, Testimonial, PopularCategory } from './types';
import { Book, Brush, Code, Film, Smartphone } from 'lucide-react';

export const categories: Category[] = [
  { id: 'all', name: 'All Categories', productCount: 12 },
  { id: 'ui-kits', name: 'UI Kits', productCount: 4 },
  { id: 'icons', name: 'Icons', productCount: 3 },
  { id: 'templates', name: 'Templates', productCount: 3 },
  { id: 'ebooks', name: 'E-books', productCount: 2 },
];

export const popularCategories: PopularCategory[] = [
    { id: 'ebooks', name: 'E-book', description: 'High quality books', productCount: 100, icon: Book },
    { id: 'templates', name: 'Photoshop Template', description: 'Professional digital templates', productCount: 500, icon: Brush },
    { id: 'software', name: 'Software', description: 'Ready software and scripts', productCount: 150, icon: Code },
    { id: 'video-course', name: 'Video Course', description: 'Educational video courses', productCount: 200, icon: Film },
    { id: 'mobile-app', name: 'Mobile App', description: 'Ready made app source code', productCount: 80, icon: Smartphone },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Pro UI Kit',
    description: 'A professional UI kit for modern web applications.',
    price: 49.99,
    category: 'ui-kits',
    imageUrl: 'https://placehold.co/600x400/1DB954/FFFFFF.png',
    rating: 4.8,
    reviews: 120,
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
    imageUrl: 'https://placehold.co/600x400/1DB954/FFFFFF.png',
    rating: 4.9,
    reviews: 250,
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
    imageUrl: 'https://placehold.co/600x400/1DB954/FFFFFF.png',
    rating: 4.7,
    reviews: 80,
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
    imageUrl: 'https://placehold.co/600x400/1DB954/FFFFFF.png',
    rating: 4.9,
    reviews: 450,
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
    imageUrl: 'https://placehold.co/600x400/1DB954/FFFFFF.png',
    rating: 4.8,
    reviews: 150,
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
    imageUrl: 'https://placehold.co/600x400/1DB954/FFFFFF.png',
    rating: 4.6,
    reviews: 75,
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
    imageUrl: 'https://placehold.co/600x400/1DB954/FFFFFF.png',
    rating: 4.9,
    reviews: 180,
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
    imageUrl: 'https://placehold.co/600x400/1DB954/FFFFFF.png',
    rating: 4.9,
    reviews: 210,
    tags: ['saas', 'dashboard', 'analytics'],
    fileType: 'Figma, Adobe XD',
    fileSize: '250MB',
  },
];

export const testimonials: Testimonial[] = [
    {
        name: 'Sarah Johnson',
        role: 'Founder of TechCo',
        avatarUrl: 'https://placehold.co/100x100.png',
        quote: "Digital Emporium has the best selection of digital assets. The quality is unmatched and has saved my team hundreds of hours.",
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Freelance Designer',
        avatarUrl: 'https://placehold.co/100x100.png',
        quote: "I found the perfect UI kit for my project in minutes. The instant download feature is a lifesaver. Highly recommended!",
        rating: 5,
    },
    {
        name: 'Emily Rodriguez',
        role: 'Marketing Manager',
        avatarUrl: 'https://placehold.co/100x100.png',
        quote: "The e-books available here are incredibly insightful. Digital Emporium is my go-to place for learning and growing my skills.",
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

export const adminProducts = [
  ...products.slice(0, 5),
];

export const adminOrders = [
  { orderId: '#DE80123', date: '2023-11-05', customer: 'John Doe', total: 79.99, status: 'Completed', paymentMethod: 'Bkash' },
  { orderId: '#DE80124', date: '2023-11-05', customer: 'Jane Smith', total: 29.99, status: 'Pending', paymentMethod: 'Manual' },
  { orderId: '#DE80125', date: '2023-11-04', customer: 'Sam Wilson', total: 89.99, status: 'Completed', paymentMethod: 'Nagad' },
];

export const adminUsers = [
  { id: 'user-001', name: 'John Doe', email: 'john@example.com', registered: '2023-01-15', totalSpent: 150.50 },
  { id: 'user-002', name: 'Jane Smith', email: 'jane@example.com', registered: '2023-02-20', totalSpent: 29.99 },
  { id: 'user-003', name: 'Sam Wilson', email: 'sam@example.com', registered: '2023-03-10', totalSpent: 89.99 },
];
