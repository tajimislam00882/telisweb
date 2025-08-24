'use client';
import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  UserCircle,
  Home,
  LogOut,
  Handshake,
} from 'lucide-react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const { t } = useLanguage();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    }

    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
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
    
    const navItems = [
      { href: '/dashboard', label: t('dashboard_nav_dashboard'), icon: LayoutDashboard },
      {
        href: '/dashboard/purchases',
        label: t('dashboard_nav_purchases'),
        icon: ShoppingBag,
      },
      { href: '/dashboard/downloads', label: t('dashboard_nav_downloads'), icon: Download },
       { href: '/dashboard/affiliate', label: t('dashboard_nav_affiliate'), icon: Handshake },
      { href: '/dashboard/profile', label: t('dashboard_nav_profile'), icon: UserCircle },
    ];

    const footerNavItems = [
        { href: '/', label: t('dashboard_nav_back_to_shop'), icon: Home },
        { href: '#', label: t('dashboard_nav_logout'), icon: LogOut, className: 'text-red-500 hover:text-red-500 hover:bg-red-500/10', action: handleLogout },
    ];


  return (
    <AppShell navItems={navItems} footerNavItems={footerNavItems}>
      {children}
    </AppShell>
  );
}
