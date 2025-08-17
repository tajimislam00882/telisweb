'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/20 bg-card">
      <div className="container py-12 text-foreground">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Logo />
            <p className="text-muted-foreground">
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
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
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
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                    {t('footer_dashboard')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t('footer_legal')}</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t('footer_terms')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                   {t('footer_privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t('footer_refund')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t('footer_support')}</h3>
               <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t('footer_help')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    {t('footer_faq')}
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
        <div className="mt-8 border-t border-border/20 pt-8 text-center text-muted-foreground">
          <p>{t('footer_copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
