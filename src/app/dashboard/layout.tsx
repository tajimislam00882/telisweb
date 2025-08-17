import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  UserCircle,
  Home,
  LogOut,
} from 'lucide-react';
import AppShell from '@/components/layout/app-shell';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    href: '/dashboard/purchases',
    label: 'Purchase History',
    icon: ShoppingBag,
  },
  { href: '/dashboard/downloads', label: 'Downloads', icon: Download },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
];

const footerNavItems = [
    { href: '/', label: 'Back to Shop', icon: Home },
    { href: '/login', label: 'Logout', icon: LogOut, className: 'text-red-500 hover:text-red-500 hover:bg-red-500/10' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell navItems={navItems} footerNavItems={footerNavItems}>
      {children}
    </AppShell>
  );
}
