import { useState } from 'react';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

export const HomePage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="container">
      <h1>Welcome to the application</h1>
      
      {showSignUp ? (
        <SignUp onToggleForm={toggleForm} />
      ) : (
        <SignIn onToggleForm={toggleForm} />
      )}
    </div>
  );
};
