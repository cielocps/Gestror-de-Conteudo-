'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (!res.ok) throw new Error('Session check failed');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        setUser(data.tokens);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!mounted) return;
      await checkSession();
    }

    init();

    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setIsAuthenticated(true);
        setUser(event.data.tokens);
        checkSession();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      mounted = false;
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const login = async () => {
    try {
      const res = await fetch('/api/auth/x/url');
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Falha ao iniciar login');
      }
      
      const { url } = await res.json();
      
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.innerWidth - width) / 2;
      const top = window.screenY + (window.innerHeight - height) / 2;
      
      const popup = window.open(
        url,
        'twitter_oauth',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        alert('Por favor, habilite popups para realizar o login com o X.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert(error instanceof Error ? error.message : 'Erro ao conectar. Verifique suas chaves no Settings.');
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/x/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
