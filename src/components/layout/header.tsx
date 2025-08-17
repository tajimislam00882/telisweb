'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, X, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import Logo from '@/components/shared/logo';
import type { NavItem } from '@/lib/types';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useState } from 'react';
import { ThemeToggle } from '../shared/theme-toggle';
import { useLanguage } from '@/context/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t, setLanguage, language } = useLanguage();

  const navItems: NavItem[] = [
    { href: '/', label: t('nav_home') },
    { href: '/shop', label: t('nav_shop') },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Left side: Logo and Nav */}
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Bar (Centered on Desktop) */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('search_placeholder')}
              className="w-full pl-10 bg-card border-border/20"
            />
          </div>
        </div>

        {/* Right side: Icons and Mobile Menu */}
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('bn')}>
                বাংলা
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button asChild>
            <Link href="/login">{t('login_button')}</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-card">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Logo />
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        'hover:text-primary',
                        pathname === item.href
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-background z-50 flex items-center justify-center md:hidden p-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('search_placeholder')}
              className="w-full pl-10 pr-10 bg-card border-border/20"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
