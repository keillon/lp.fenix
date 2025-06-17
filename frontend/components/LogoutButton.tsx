"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  className?: string;
  redirectTo?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  className = 'btn btn-danger', 
  redirectTo = '/login'
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const success = await logout();
      
      if (success) {
        // Navigate to login or home page after successful logout
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Show error message to user if needed
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button 
      className={className}
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;