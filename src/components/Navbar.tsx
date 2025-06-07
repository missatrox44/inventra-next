'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Package, User, Home } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Inventra</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/inventory" className="text-gray-700 hover:text-blue-600 transition-colors">
              View Inventory
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role && ['admin', 'editor'].includes(user.role) && (
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                      <Home className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {user?.role}
                  </span>
                </div>
                <Button variant="ghost" onClick={logout} className="text-red-600 hover:text-red-700">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}