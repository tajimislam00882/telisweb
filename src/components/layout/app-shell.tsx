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
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {item.badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[256px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <SidebarNav items={navItems} />
        </div>
        {footerNavItems && (
            <div className="mt-auto border-t p-4">
                <SidebarNav items={footerNavItems} />
            </div>
        )}
      </aside>

      <div className="flex flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-4">
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
          {header || <div className="w-full text-right lg:hidden"><Logo /></div>}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-muted/40">{children}</main>
      </div>
    </div>
  );
}
