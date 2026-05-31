import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CountriesProvider } from './context/CountryContext';
import { BucketListScope } from './components/BucketListScope';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CountriesProvider>
          <BucketListScope>
            <App />
          </BucketListScope>
        </CountriesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);