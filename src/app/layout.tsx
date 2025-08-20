
import type { Metadata } from 'next';
import { Inter, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Preloader from '@/components/shared/preloader';
import { LanguageProvider } from '@/context/language-context';
import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-bengali',
});

export const metadata: Metadata = {
  title: 'Digital Emporium',
  description: 'Your one-stop shop for premium digital products.',
  keywords: 'digital products, software, ebooks, templates, assets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`font-body antialiased bg-background ${inter.variable} ${notoSerifBengali.variable}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
              <Preloader />
              <LanguageProvider>
                <CartProvider>
                    {children}
                    <div className="fixed bottom-4 right-4 z-50">
                    <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                        <MessageSquare className="h-6 w-6" />
                        <span className="sr-only">Live Chat</span>
                    </Button>
                    </div>
                    <Toaster />
                </CartProvider>
              </LanguageProvider>
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
