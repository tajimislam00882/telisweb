'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Bell,
  Home,
  LogOut,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import Logo from '../shared/logo';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: 2 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-4 py-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === item.href && 'bg-muted text-primary'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.badge && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
       <div className="mt-auto border-t p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 px-3">
            <Home className="h-4 w-4" />
            Back to Shop
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-red-500 hover:text-red-500 hover:bg-red-500/10">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
