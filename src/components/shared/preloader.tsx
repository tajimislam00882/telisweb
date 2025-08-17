'use client';

import { useState, useEffect } from 'react';
import Logo from './logo';
import { cn } from '@/lib/utils';

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timeout);
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
