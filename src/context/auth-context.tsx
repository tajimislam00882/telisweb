'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';
import Preloader from '@/components/shared/preloader';

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  supabase: SupabaseClient;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Initialize Supabase client using useMemo to ensure it's created only on the client-side.
  const supabase = useMemo(() => createClient(), []);

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
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);
  
  const logout = async () => {
    await supabase.auth.signOut();
    // No need to redirect here, the onAuthStateChange will handle it.
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout, supabase }}>
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
