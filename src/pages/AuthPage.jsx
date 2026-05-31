import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const loginDefaults = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
  name: '',
};

function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(loginDefaults);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await signIn({
        mode: 'login',
        email: formValues.email,
        password: formValues.password,
        name: formValues.name,
      });

      const destination = location.state?.from || '/explore';
      navigate(destination, { replace: true });
    } catch (submitError) {
      setError(submitError.message || 'Sign in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const emailIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.2 7.4 12 12.6l6.8-5.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const lockIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );

  const eyeIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.7-6 9.5-6 9.5 6 9.5 6-3.7 6-9.5 6S2.5 12 2.5 12Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );

  return (
    <div className="auth-page">
      <section className="auth-card panel">
        <div className="auth-brand-block">
          <div className="auth-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <h1>WanderLog</h1>
          <p>Your journey. Your bucket list.</p>
        </div>

        <div className="auth-content">
          <div className="auth-heading">
            <h2>Welcome back!</h2>
            <p>Sign in to continue your adventures.</p>
          </div>

          <form className="auth-form auth-form-login" onSubmit={handleSubmit}>
            <label className="field">
              <span>Email</span>
              <div className="input-shell">
                <span className="input-icon" aria-hidden="true">
                  {emailIcon}
                </span>
                <input name="email" type="email" value={formValues.email} onChange={handleChange} placeholder="you@example.com" required />
              </div>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-shell">
                <span className="input-icon" aria-hidden="true">
                  {lockIcon}
                </span>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  className="input-action"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((currentValue) => !currentValue)}
                >
                  {eyeIcon}
                </button>
              </div>
            </label>

            <button type="button" className="link-button auth-forgot" onClick={() => {}}>
              Forgot password?
            </button>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="button button-primary auth-submit" disabled={submitting}>
              {submitting ? 'Please wait...' : 'Sign In'}
            </button>

            <div className="auth-divider">or</div>

            <button type="button" className="button button-ghost auth-google" onClick={() => {}}>
              <span className="google-icon" aria-hidden="true">
                G
              </span>
              Continue with Google
            </button>

            <p className="auth-footer-link">
              Don’t have an account? <button type="button" onClick={() => navigate('/auth')}>Create account</button>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AuthPage;