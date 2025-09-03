import { useState } from 'react';
import { authService } from '../services/authService';
import type { SignUpData } from '../types/auth.ts';

interface SignUpProps {
  onToggleForm: () => void;
}

export const SignUp = ({ onToggleForm }: SignUpProps) => {
  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      setIsLoading(true);
      await authService.signUp(formData);
      onToggleForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
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
      <h2>Sign Up</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

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
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>

      <div className="toggle-form">
        <button type="button" onClick={onToggleForm}>
          Already have an account? Sign In
        </button>
      </div>
    </form>
  );
};
