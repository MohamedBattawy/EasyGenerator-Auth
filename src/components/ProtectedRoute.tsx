import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import type { User } from '../types/auth';

interface ProtectedRouteProps {
  children: (user: User) => React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);
      } catch {
        // User is not authenticated, redirect to home
        navigate('/', { replace: true });
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <>{children(user)}</>;
  }
};
