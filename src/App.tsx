import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage, NotFoundPage, UserPage } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/user" 
        element={
          <ProtectedRoute>
            {(user) => <UserPage user={user} />}
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
