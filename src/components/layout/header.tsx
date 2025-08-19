
'use client';

import Link from 'next/link';
import {
  Menu,
  Search,
  ShoppingCart,
  X,
  Languages,
  Loader2,
  Camera,
  User,
  LayoutDashboard,
  ChevronDown,
  Moon,
  Sun,
  LogIn,
  LogOut,
} from 'lucide-react';
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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useSearchSuggestions } from '@/hooks/use-search-suggestions';
import Image from 'next/image';
import { imageSearch } from '@/ai/flows/image-search-flow';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { useTheme } from 'next-themes';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isImageSearching, setIsImageSearching] = useState(false);
  const { t, setLanguage } = useLanguage();
  const { user, isAdmin, logout } = useAuth();
  const { cart } = useCart();
  const { toast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, setTheme } = useTheme();

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


  const handleSuggestionClick = () => {
    setIsSuggestionsVisible(false);
    setSearchQuery('');
  };

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageSearching(true);
    toast({
      title: 'Analyzing Image...',
      description: "Please wait while we figure out what's in your image.",
    });

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUri = reader.result as string;
        const result = await imageSearch({ imageDataUri });
        if (result.searchQuery) {
          router.push(`/shop?q=${encodeURIComponent(result.searchQuery)}`);
          toast({
            title: 'Search Complete!',
            description: `Showing results for: "${result.searchQuery}"`,
          });
        } else {
          throw new Error("AI couldn't generate a search query.");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image search failed:', error);
      toast({
        variant: 'destructive',
        title: 'Image Search Failed',
        description:
          "Sorry, we couldn't analyze that image. Please try another one.",
      });
    } finally {
      setIsImageSearching(false);
      // Reset file input
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm"
    >
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageFileChange}
        className="hidden"
        accept="image/*"
      />
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
                className="w-full pl-10 pr-10 bg-card border-border/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSuggestionsVisible(true)}
              />
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => imageInputRef.current?.click()}
              disabled={isImageSearching}
              aria-label="Search by image"
            >
              {isImageSearching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Camera className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
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
                            src={product.image_url!}
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
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
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
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.first_name || 'User'} />
                          <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard"><User className="mr-2 h-4 w-4" />Profile</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                      <DropdownMenuItem asChild>
                          <Link href="/admin"><LayoutDashboard className="mr-2 h-4 w-4" />Admin</Link>
                      </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">{t('login_button')}</Link>
              </Button>
            )}
          </div>
          
          {/* Language Toggle (Visible on all screen sizes) */}
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

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-card flex flex-col p-4">
              <Logo />
              <div className="mt-4 relative flex-1">
                <form onSubmit={handleSearchSubmit}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder={t('search_placeholder')}
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
              </div>
              <nav className="grid gap-4 text-lg font-medium">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-4 hover:text-primary',
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
              <Separator className="my-4" />
              <div className="grid gap-4">
                <SheetClose asChild>
                    <Link href="/cart" className="flex items-center gap-4 text-lg font-medium text-muted-foreground hover:text-primary">
                        <ShoppingCart className="h-5 w-5" />
                        Cart 
                        {totalCartItems > 0 && (
                            <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {totalCartItems}
                            </span>
                        )}
                    </Link>
                </SheetClose>
                 <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center gap-4 text-lg font-medium text-muted-foreground hover:text-primary"
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span>Toggle Theme</span>
                </button>
              </div>
              <div className="mt-auto">
                <Separator className="my-4" />
                {user ? (
                     <SheetClose asChild>
                        <Link href="/dashboard" className="flex items-center gap-4 text-lg font-medium text-muted-foreground hover:text-primary">
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.first_name || 'User'} />
                                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>Profile</span>
                        </Link>
                    </SheetClose>
                ) : (
                     <SheetClose asChild>
                        <Link href="/login" className="flex items-center gap-4 text-lg font-medium text-muted-foreground hover:text-primary">
                            <LogIn className="h-5 w-5" />
                            <span>{t('login_button')}</span>
                        </Link>
                    </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
