
import type { Metadata } from 'next';
import { Inter, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-context';
import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';
import Preloader from '@/components/shared/preloader';
import Chatbot from '@/components/shared/chatbot';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-bengali',
});

export const metadata: Metadata = {
  title: 'Telisweb',
  description: 'Your one-stop shop for premium digital products.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                    <Chatbot />
                    <Toaster />
                </CartProvider>
              </LanguageProvider>
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
