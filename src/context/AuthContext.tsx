import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  id: number;
  username: string;
  email: string;
  isConfirmed: boolean;
  exp: number;
}

interface AuthContextType {
  user: JwtPayload | null;
  IsAuthenticated: () => Promise<boolean>;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  refreshAuthToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  const loadUserFromCookie = useCallback(async () => {
    let token = Cookies.get("token");
    const refreshToken = Cookies.get("refreshToken");

    if (token) {
      try {
        let decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now && refreshToken) {
          await refreshAuthToken();
          token = Cookies.get("token") || "";
          decoded = jwtDecode<JwtPayload>(token);
        }

        if (decoded.exp > now) {
          setUser(decoded);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token invalide");
        logout();
      }
    }
  }, []);

  const refreshAuthToken = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) return logout();

    try {
      const response = await fetch("/refresh", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) throw new Error("Refresh failed");

      const { token: newToken } = await response.json();
      Cookies.set("token", newToken, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });

      const decoded = jwtDecode<JwtPayload>(newToken);
      setUser(decoded);
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
  };

  useEffect(() => {
    loadUserFromCookie();
  }, [loadUserFromCookie]);

  const login = (token: string, refreshToken: string) => {
    Cookies.set("token", token, {
      expires: new Date(Date.now() + 30 * 60 * 1000),
    });
    Cookies.set("refreshToken", refreshToken, { expires: 7 }); // expires in 7 days for example
    loadUserFromCookie();
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        IsAuthenticated: async () => {
          const token = Cookies.get("token");
          if (token) {
            try {
              const decoded = jwtDecode<JwtPayload>(token);
              return decoded.exp > Date.now() / 1000;
            } catch {
              return false;
            }
          }
          return false;
        },
        login,
        logout,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
