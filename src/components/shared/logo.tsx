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
      <div className="bg-primary rounded-md p-1.5">
        <ShoppingBag className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-foreground">
        Telis<span className="text-primary">web</span>
      </span>
    </Link>
  );
}
