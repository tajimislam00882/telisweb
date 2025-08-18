'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, X, Languages, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import Logo from '@/components/shared/logo';
import type { NavItem } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '../shared/theme-toggle';
import { useLanguage } from '@/context/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useSearchSuggestions } from '@/hooks/use-search-suggestions';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { t, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const {
    suggestions,
    isLoading,
    isSuggestionsVisible,
    setIsSuggestionsVisible,
  } = useSearchSuggestions(searchQuery, headerRef);

  const navItems: NavItem[] = [
    { href: '/', label: t('nav_home') },
    { href: '/shop', label: t('nav_shop') },
    { href: '/contact', label: t('nav_contact') },
  ];

  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const newSearchQuery = searchParams.get('q') || '';
    setSearchQuery(newSearchQuery);
    if (newSearchQuery) {
      setIsSuggestionsVisible(false);
    }
  }, [searchParams, setIsSuggestionsVisible]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuggestionsVisible(false);
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/shop?q=${trimmedQuery}`);
    } else {
      router.push('/shop');
    }
    setIsSearchOpen(false);
    if (searchInputRef.current) {
        searchInputRef.current.blur();
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  
  const handleSuggestionClick = () => {
    setIsSuggestionsVisible(false);
    setSearchQuery('');
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm"
    >
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
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('search_placeholder')}
                className="w-full pl-10 bg-card border-border/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSuggestionsVisible(true)}
              />
            </form>
            {isSuggestionsVisible && searchQuery && (
              <div className="absolute top-full mt-2 w-full rounded-md border bg-card shadow-lg">
                {isLoading ? (
                  <div className="p-4 text-center text-muted-foreground flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : suggestions.length > 0 ? (
                  <ul>
                    {suggestions.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/product/${product.id}`}
                          onClick={handleSuggestionClick}
                          className="flex items-center gap-4 p-3 hover:bg-accent"
                        >
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {product.name}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-primary">
                            ${product.price}
                          </p>
                        </Link>
                      </li>
                    ))}
                     <li className="border-t">
                      <Link
                        href={`/shop?q=${searchQuery}`}
                        onClick={handleSuggestionClick}
                        className="block w-full p-3 text-center font-medium text-primary hover:bg-accent"
                      >
                       View all results for &quot;{searchQuery}&quot;
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No results found.
                  </div>
                )}
              </div>
            )}
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
            onClick={() => {
              setIsSearchOpen(true);
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <img
                    src={user.photoURL || 'https://placehold.co/32x32.png'}
                    alt="user"
                    className="rounded-full h-8 w-8"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">{t('login_button')}</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
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
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-md"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder={t('search_placeholder')}
              className="w-full pl-10 pr-10 bg-card border-border/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
