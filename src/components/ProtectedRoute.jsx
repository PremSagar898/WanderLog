import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { ready, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="screen-center">
        <div className="status-card">Loading session...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;