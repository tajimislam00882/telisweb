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

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: 2 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

const footerNavItems = [
  { href: '/', label: 'Back to Shop', icon: Home },
  { href: '/login', label: 'Logout', icon: LogOut, className: 'text-red-500 hover:text-red-500 hover:bg-red-500/10' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
