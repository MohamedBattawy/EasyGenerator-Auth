import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import type { User } from '../types/auth';

interface UserPageProps {
  user: User;
}

export const UserPage = ({ user }: UserPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearError = () => {
    setError(null);
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      clearError();
      await authService.logout();
      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Welcome!</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="user-info">
        <h3>User Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.userId}</p>
      </div>

      <div className="actions">
        <button 
          className="btn" 
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? 'Logging Out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};
