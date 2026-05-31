import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import CountryDetailPage from './pages/CountryDetailPage';
import ExplorePage from './pages/ExplorePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function HomeRedirect() {
  const { ready, isAuthenticated } = useAuth();

  if (!ready) {
    return (
      <div className="screen-center">
        <div className="status-card">Loading WanderLog...</div>
      </div>
    );
  }

  return <Navigate to={isAuthenticated ? '/explore' : '/auth'} replace />;
}

function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <AppShell>
                <ExplorePage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/country/:code"
          element={
            <ProtectedRoute>
              <AppShell>
                <CountryDetailPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;