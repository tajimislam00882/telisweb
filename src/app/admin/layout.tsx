'use client';
import {
  LayoutDashboard,
  Box,
  ShoppingCart,
  Users2,
  Settings,
  Home,
  LogOut,
  Search,
  Truck,
} from 'lucide-react';
import AppShell from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Box },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: 2 },
  { href: '/admin/users', label: 'Users', icon: Users2 },
  { href: '/admin/suppliers', label: 'Suppliers', icon: Truck },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const footerNavItems = [
    { href: '/', label: 'Back to Shop', icon: Home },
    {
      href: '#',
      label: 'Logout',
      icon: LogOut,
      className: 'text-red-500 hover:text-red-500 hover:bg-red-500/10',
      action: handleLogout,
    },
  ];

  useEffect(() => {
    // Don't redirect while loading or on the login page itself
    if (loading || pathname === '/admin/login') return;

    // Redirect if not an admin or no user at all
    if (!isAdmin || !user) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, loading, router, pathname]);

  // If it's the login page, don't render the shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // While loading, or if not an admin yet, show a loader
  if (loading || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <AppShell
      navItems={navItems}
      footerNavItems={footerNavItems}
      header={
        <div className="flex w-full flex-1 items-center gap-4">
          <form className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
          <Button asChild>
            <a href="/dashboard/profile">Account</a>
          </Button>
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
