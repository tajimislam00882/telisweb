'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Preloader from '@/components/shared/preloader';
import { useRouter, usePathname } from 'next/navigation';

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      const userIsAdmin = user ? ADMIN_EMAILS.includes(user.email || '') : false;
      setIsAdmin(userIsAdmin);
      
      // Protection for admin routes
      if (!loading) {
         if (pathname.startsWith('/admin') && !userIsAdmin) {
            router.push('/login');
        }
        if ((pathname.startsWith('/dashboard') || pathname.startsWith('/cart')) && !user) {
            router.push('/login');
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [loading, pathname, router]);
  
  const logout = async () => {
      await signOut(auth);
      router.push('/login');
  }

  if (loading) {
    return <Preloader />;
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
