'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  updateUser: (credentials: { email?: string; password?: string; data?: object; }) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  supabase: SupabaseClient;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
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
  };

  const updateUser = async (credentials: { email?: string; password?: string; data?: object; }) => {
    const { data, error } = await supabase.auth.updateUser(credentials);
    if (error) throw error;
    setUser(data.user);
  };
  
  const uploadAvatar = async (file: File) => {
    if (!user) throw new Error("User not authenticated.");

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);

    await updateUser({ data: { avatar_url: publicUrl } });
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout, updateUser, uploadAvatar, supabase }}>
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
