/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { loginWithReqres, registerWithReqres } from '../services/authService';
import { readJson, removeStorageItem, writeJson } from '../utils/storage';

const AUTH_STORAGE_KEY = 'wanderlog-auth';

const AuthContext = createContext(null);

const initialAuthState = {
  user: null,
  token: null,
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedAuth = readJson(AUTH_STORAGE_KEY, initialAuthState);

    if (storedAuth?.token && storedAuth?.user?.email) {
      return storedAuth;
    }

    return initialAuthState;
  });

  const ready = true;

  const signIn = async ({ mode, email, password, name }) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const authResponse =
      mode === 'signup'
        ? await registerWithReqres(trimmedEmail, password)
        : await loginWithReqres(trimmedEmail, password);

    const nextAuth = {
      user: {
        name: trimmedName || trimmedEmail.split('@')[0],
        email: trimmedEmail,
      },
      token: authResponse.token,
    };

    setAuth(nextAuth);
    writeJson(AUTH_STORAGE_KEY, nextAuth);

    return nextAuth;
  };

  const signOut = () => {
    setAuth(initialAuthState);
    removeStorageItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        ready,
        signIn,
        signOut,
        isAuthenticated: Boolean(auth.token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}