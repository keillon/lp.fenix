"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define types for your context
interface Admin {
  // Add properties based on your admin object structure
  id?: string;
  name?: string;
  email?: string;
  // Add other properties as needed
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, adminData: Admin) => void;
  logout: () => Promise<boolean>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for the provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verify authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          setIsAuthenticated(false);
          setAdmin(null);
          setIsLoading(false);
          return;
        }

        // Verify token with server
        const response = await fetch('/api/admin/verify-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const storedAdmin = localStorage.getItem('admin');
          setAdmin(data.admin || (storedAdmin ? JSON.parse(storedAdmin) : null));
          setIsAuthenticated(true);
        } else {
          // Invalid token - clear everything
          await logout();
        }
      } catch (error) {
        console.error('Error verifying authentication:', error);
        setIsAuthenticated(false);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = (token: string, adminData: Admin) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('admin', JSON.stringify(adminData));
    setAdmin(adminData);
    setIsAuthenticated(true);
  };

  // Enhanced logout function
  const logout = async (): Promise<boolean> => {
    // Clear localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    
    // Clear cookies
    document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Reset context state
    setAdmin(null);
    setIsAuthenticated(false);
    
    // Optional: notify server about logout
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error("Error notifying server about logout:", error);
      // Still return true since client-side logout was successful
    }
    
    return true; // Indicate logout was completed
  };

  return (
    <AuthContext.Provider value={{
      admin,
      isAuthenticated,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};