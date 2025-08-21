
import type { SiteSettings } from './types';

// This file provides default settings for the site.
// In a real application, these values would be fetched from the database.
export const defaultSettings: SiteSettings = {
  general: {
    site_name: 'Telisweb',
    currency: 'USD',
    contact_email: 'support@telisweb.com',
    company_address: '123 Digital Avenue, Tech City, 12345',
  },
  appearance: {
    logo_url: '/logo.svg', // Assuming a default logo path
    favicon_url: '/favicon.ico',
    primary_color: '#22c55e', // Equivalent to green-500
    background_color: '#0f172a', // Equivalent to slate-900
    accent_color: '#334155', // Equivalent to slate-700
  },
  payment_gateways: {
    sslcommerz: {
      enabled: false,
      store_id: '',
      store_password: '',
    },
    piprapay: {
      enabled: false,
      api_key: '',
      api_secret: '',
    },
    stripe: {
        enabled: false,
        api_key: '',
        api_secret: ''
    }
  },
  social_links: {
    twitter_url: '',
    github_url: '',
    linkedin_url: '',
  },
  seo: {
    meta_title: 'Telisweb - Your one-stop shop for premium digital products.',
    meta_description: 'Discover high-quality digital assets, UI kits, templates, and e-books to supercharge your creative projects.',
    og_image_url: '',
  },
  integrations: {
    google_analytics_id: '',
    facebook_pixel_id: '',
    google_translate_api_key: '',
    api_key: '',
  },
  email: {
    admin_email: 'admin@telisweb.com',
    from_email: 'noreply@telisweb.com',
    send_order_confirmation: true,
  },
};
