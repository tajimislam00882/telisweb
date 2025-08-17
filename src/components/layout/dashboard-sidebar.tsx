'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  UserCircle,
  LogOut,
  Home,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '../shared/logo';
import { Separator } from '../ui/separator';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/purchases', label: 'Purchase History', icon: ShoppingBag },
  { href: '/dashboard/downloads', label: 'Downloads', icon: Download },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
];

export default function DashboardSidebar() {
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
