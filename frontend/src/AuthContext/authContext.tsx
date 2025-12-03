import React, { createContext, useContext, useEffect, useState } from "react";

 /* USER TYPE OBJECT FROM BACKEND */
type User = {
  google_id: string;
  name: string;
  email: string;
};

/* Gives context on User Authentication status */
type AuthContextType = {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
};

// Creating context to receive data from backend
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_ORIGIN = "http://localhost:3000";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Checking auth status on refreshing and log in/out
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${BACKEND_ORIGIN}/auth/status`, {
          method: "GET",
          credentials: "include", // send cookies IMPORTANT FOR AUTH!
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginWithGoogle = () => {
    // full redirect to backend OAuth route
    window.location.href = `${BACKEND_ORIGIN}/auth/google`;
  };

  const logout = async () => {
    try {
      await fetch(`${BACKEND_ORIGIN}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      // ignore errors
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
