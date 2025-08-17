import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-xl font-bold text-primary',
        className
      )}
    >
      <ShoppingBag className="h-6 w-6" />
      <span className="text-foreground">
        Digital<span className="text-primary">Emporium</span>
      </span>
    </Link>
  );
}
