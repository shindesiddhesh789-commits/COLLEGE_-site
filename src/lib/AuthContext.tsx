import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  email: string;
  name: string;
  role: 'Admin' | 'Supervisor' | 'Housekeeping Staff';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginPassword: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerRequest: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }) => Promise<{ success: boolean; message: string }>;
  registerVerify: (email: string, code: string) => Promise<{ success: boolean }>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user on startup
  useEffect(() => {
    async function loadUser() {
      const storedToken = localStorage.getItem('xelco_auth_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        setToken(storedToken);
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });

        if (res.ok) {
          let data: any = {};
          try {
            const text = await res.text();
            data = text ? JSON.parse(text) : {};
          } catch (e) {}
          
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            // Token invalid
            localStorage.removeItem('xelco_auth_token');
            setToken(null);
          }
        } else {
          localStorage.removeItem('xelco_auth_token');
          setToken(null);
        }
      } catch (err) {
        console.error('Failed to load user session:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const loginPassword = async (email: string, password: string) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        throw new Error(`Server connection failed (status ${res.status}). Ensure backend server is running.`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate.');
      }

      if (data.success && data.token && data.user) {
        localStorage.setItem('xelco_auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }

      throw new Error('Invalid authentication response.');
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const registerRequest = async (payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/register-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        throw new Error(`Server connection failed (status ${res.status}). Ensure backend server is running.`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to request operator provisioning.');
      }

      return {
        success: true,
        message: data.message || 'OTP verification code sent.',
      };
    } catch (err: any) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const registerVerify = async (email: string, code: string) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/register-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        throw new Error(`Server connection failed (status ${res.status}). Ensure backend server is running.`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify verification code.');
      }

      if (data.success && data.token && data.user) {
        localStorage.setItem('xelco_auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }

      throw new Error('Invalid registration response.');
    } catch (err: any) {
      setError(err.message);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('xelco_auth_token');
    setToken(null);
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        error,
        loginPassword,
        registerRequest,
        registerVerify,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
