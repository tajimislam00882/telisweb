'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';
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
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const userIsAdmin = user ? ADMIN_EMAILS.includes(user.email || '') : false;
      setIsAdmin(userIsAdmin);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      const userIsAdmin = currentUser ? ADMIN_EMAILS.includes(currentUser.email || '') : false;
      setIsAdmin(userIsAdmin);
      
      if (!loading) {
         if (pathname.startsWith('/admin') && !userIsAdmin) {
            router.push('/login');
        }
        if ((pathname.startsWith('/dashboard') || pathname.startsWith('/cart')) && !currentUser) {
            router.push('/login');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loading, pathname, router, supabase.auth]);
  
  const logout = async () => {
      await supabase.auth.signOut();
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
