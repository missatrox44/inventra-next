'use client';

import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = ['admin'],
  redirectTo = '/auth' 
}: ProtectedRouteProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, hasRole, allowedRoles, router, redirectTo]);

  if (!isAuthenticated || (allowedRoles.length > 0 && !hasRole(allowedRoles))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}