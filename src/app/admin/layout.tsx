'use client';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Home,
  LogOut,
  Search,
} from 'lucide-react';
import AppShell from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: 2 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  }

  const footerNavItems = [
    { href: '/', label: 'Back to Shop', icon: Home },
    { href: '#', label: 'Logout', icon: LogOut, className: 'text-red-500 hover:text-red-500 hover:bg-red-500/10', action: handleLogout },
  ];

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/login');
    }
  }, [user, isAdmin, loading, router]);

  if (loading || !isAdmin) {
    return null; // or a loading spinner
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
