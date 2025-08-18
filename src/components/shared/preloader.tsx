'use client';

import { useState, useEffect } from 'react';
import Logo from './logo';
import { cn } from '@/lib/utils';

export default function Preloader() {
  const [show, setShow] = useState(true);

  // This effect will run once on mount, and since there is no dependency,
  // the preloader will be tied to the loading state of the component that uses it (e.g. AuthProvider)
  useEffect(() => {
     // We can keep a minimal delay for aesthetic reasons if needed, but it's better to remove it for performance.
     // For now, let's keep it simple and just control the visibility via parent component's loading state.
     // The parent (AuthProvider) will unmount this component when loading is false.
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500',
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  );
}
