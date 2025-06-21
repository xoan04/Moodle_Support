"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TokenManager from '@/utils/cookies_standart';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = TokenManager.getToken();
      const isExpired = TokenManager.isTokenExpired();
      
      if (!token || isExpired) {
        setIsAuthenticated(false);
        router.push('/');
        return;
      }
      
      setIsAuthenticated(true);
    };

    checkAuth();
  }, [router]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return fallback || (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-olive-dark"></div>
          <p className="mt-4 text-olive-dark">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Show children only if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Return null if not authenticated (will redirect)
  return null;
} 