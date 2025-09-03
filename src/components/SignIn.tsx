import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import type { SignInData } from '../types/auth.ts';

interface SignInProps {
  onToggleForm: () => void;
}

export const SignIn = ({ onToggleForm }: SignInProps) => {
  const [formData, setFormData] = useState<SignInData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearError = () => {
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      setIsLoading(true);
      await authService.signIn(formData);
      navigate('/user');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>

      <div className="toggle-form">
        <button type="button" onClick={onToggleForm}>
          Don't have an account? Sign Up
        </button>
      </div>
    </form>
  );
};
