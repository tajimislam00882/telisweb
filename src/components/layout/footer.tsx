
'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';

export default function Footer() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <footer className="border-t border-border/20 bg-card">
      <div className="container py-12 text-foreground">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-5">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              {t('footer_tagline')}
            </p>
             <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5 text-muted-foreground" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="GitHub">
                    <Github className="h-5 w-5 text-muted-foreground" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5 text-muted-foreground" />
                  </a>
                </Button>
              </div>
          </div>
          <div className="md:col-span-8 lg:col-span-7">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                 <div>
                    <h3 className="font-semibold text-foreground">{t('footer_quick_links')}</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                        <Link href="/" className="text-muted-foreground hover:text-primary">
                            {t('nav_home')}
                        </Link>
                        </li>
                        <li>
                        <Link href="/shop" className="text-muted-foreground hover:text-primary">
                            {t('nav_shop')}
                        </Link>
                        </li>
                        <li>
                        <Link href="/contact" className="text-muted-foreground hover:text-primary">
                            {t('nav_contact')}
                        </Link>
                        </li>
                        {user && (
                            <li>
                                <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                                {t('footer_dashboard')}
                                </Link>
                            </li>
                        )}
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-semibold text-foreground">Partnership</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                        <Link href="/affiliate-marketing" className="text-muted-foreground hover:text-primary">
                            Affiliate Program
                        </Link>
                        </li>
                        <li>
                        <Link href="/dropshipping" className="text-muted-foreground hover:text-primary">
                            Become a Supplier
                        </Link>
                        </li>
                        <li>
                        <Link href="/influencer-program" className="text-muted-foreground hover:text-primary">
                            Influencer Program
                        </Link>
                        </li>
                        <li>
                        <Link href="/bulk-orders" className="text-muted-foreground hover:text-primary">
                            Bulk Orders
                        </Link>
                        </li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-semibold text-foreground">{t('footer_support')}</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                        <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">
                            {t('footer_terms')}
                        </Link>
                        </li>
                        <li>
                        <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">
                        {t('footer_privacy')}
                        </Link>
                        </li>
                        <li>
                        <Link href="/contact" className="text-muted-foreground hover:text-primary">
                            {t('footer_contact_us')}
                        </Link>
                        </li>
                    </ul>
                    </div>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/20 pt-8 text-center text-muted-foreground">
          <p>{t('footer_copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
