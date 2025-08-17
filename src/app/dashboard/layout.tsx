import DashboardSidebar from '@/components/layout/dashboard-sidebar';
import Header from '@/components/layout/header'; // Using same header for now
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Logo from '@/components/shared/logo';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  UserCircle,
} from 'lucide-react';

const mobileNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/purchases', label: 'Purchase History', icon: ShoppingBag },
    { href: '/dashboard/downloads', label: 'Downloads', icon: Download },
    { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[256px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Logo />
                </Link>
                {mobileNavItems.map(item => (
                    <Link key={item.href} href={item.href} className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex-1 text-right">
              <Logo />
          </div>
        </header>
        <main className="flex-1 bg-muted/40 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
