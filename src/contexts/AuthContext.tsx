'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Mock user type, similar to Firebase User
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (provider: 'google' | 'github' | 'email', data?: any) => Promise<void>;
  signUp: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock implementation. In a real app, you would use Firebase SDK.
const mockAdminUid = 'ADMIN_USER_ID_12345'; // Hardcoded admin UID for demo

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking auth state on mount
    setLoading(true);
    const storedUser = sessionStorage.getItem('idemu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const timer = setTimeout(() => {
        setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const signIn = async (provider: 'google' | 'github' | 'email', data?: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 500));
    const mockUserData: MockUser = {
      uid: data?.email === 'admin@idemu.ai' ? mockAdminUid : `user_${Date.now()}`,
      email: data?.email || 'user@example.com',
      displayName: data?.name || 'Demo User',
      photoURL: `https://i.pravatar.cc/150?u=${data?.email || 'user@example.com'}`,
      isAdmin: data?.email === 'admin@idemu.ai',
    };
    setUser(mockUserData);
    sessionStorage.setItem('idemu_user', JSON.stringify(mockUserData));
    setLoading(false);
    router.push('/dashboard');
  };

  const signUp = async (data: any) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    const mockUserData: MockUser = {
      uid: data.email === 'admin@idemu.ai' ? mockAdminUid : `user_${Date.now()}`,
      email: data.email,
      displayName: data.name,
      photoURL: `https://i.pravatar.cc/150?u=${data.email}`,
      isAdmin: data.email === 'admin@idemu.ai',
    };
    setUser(mockUserData);
    sessionStorage.setItem('idemu_user', JSON.stringify(mockUserData));
    setLoading(false);
    router.push('/dashboard');
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    setUser(null);
    sessionStorage.removeItem('idemu_user');
    setLoading(false);
    router.push('/login');
  };

  const updateProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!user) return;
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    sessionStorage.setItem('idemu_user', JSON.stringify(updatedUser));
    setLoading(false);
  };
  
  const deleteAccount = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    setUser(null);
    sessionStorage.removeItem('idemu_user');
    setLoading(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
