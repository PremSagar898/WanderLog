import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AppShell({ children }) {
  const { auth, signOut } = useAuth();

  return (
    <div className="app-shell">
      <header className="shell-header">
        <div>
          <Link to="/explore" className="brand-link">
            WanderLog
          </Link>
          <p className="shell-subtitle">Your travel bucket list, powered by live country data.</p>
        </div>

        <div className="shell-actions">
          <span className="user-chip">{auth.user?.name}</span>
          <button type="button" className="button button-ghost" onClick={signOut}>
            Sign out
          </button>
        </div>
      </header>

      <main className="shell-main">{children}</main>
    </div>
  );
}

export default AppShell;