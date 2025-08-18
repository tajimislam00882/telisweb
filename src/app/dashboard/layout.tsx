'use client';
import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  UserCircle,
  Home,
  LogOut,
} from 'lucide-react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
    }

    const footerNavItems = [
        { href: '/', label: 'Back to Shop', icon: Home },
        { href: '#', label: 'Logout', icon: LogOut, className: 'text-red-500 hover:text-red-500 hover:bg-red-500/10', action: handleLogout },
    ];

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return null; // Or a loading spinner
    }

  return (
    <AppShell navItems={navItems} footerNavItems={footerNavItems}>
      {children}
    </AppShell>
  );
}
