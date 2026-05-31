import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="screen-center">
      <div className="status-card">
        <p>This page does not exist.</p>
        <Link to="/" className="button button-primary">
          Go home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;