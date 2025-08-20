'use client';

import { useAuth } from '@/context/auth-context';
import Logo from './logo';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const { loading } = useAuth();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShow(false), 500); // Wait for fade out animation
      return () => clearTimeout(timer);
    } else {
        setShow(true);
    }
  }, [loading]);

  if (!show && !loading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500',
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  );
}
