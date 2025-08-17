'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/shared/logo';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';
import { Badge } from '../ui/badge';

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  footerNavItems?: NavItem[];
  header?: React.ReactNode;
}

export default function AppShell({
  children,
  navItems,
  footerNavItems,
  header,
}: AppShellProps) {
  const pathname = usePathname();

  const SidebarNav = ({ items, className }: { items: NavItem[], className?: string }) => (
    <nav className={cn('grid items-start text-sm font-medium', className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === item.href && 'bg-muted text-primary',
            item.className
          )}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
          {item.badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {item.badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4 lg:px-6">
             <Logo />
          </div>
          <div className="flex-1 overflow-auto py-2">
            <SidebarNav items={navItems} className="px-2 lg:px-4" />
          </div>
          {footerNavItems && (
            <div className="mt-auto border-t p-4">
                <SidebarNav items={footerNavItems} />
            </div>
        )}
        </div>
      </aside>

      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-4 bg-card">
               <div className="mb-4">
                <Logo />
              </div>
              <SidebarNav items={navItems} className="gap-2 text-lg" />
              {footerNavItems && (
                <div className="mt-auto">
                    <SidebarNav items={footerNavItems} className="gap-2 text-lg" />
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Header Content */}
          <div className="w-full flex-1">
             {header || <div className="ml-auto md:hidden"><Logo /></div>}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
        </main>
      </div>
    </div>
  );
}
