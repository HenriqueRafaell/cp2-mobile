import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { AuthContextType, User } from '../types';
import { AuthService } from '../services/authService';
import { StorageService } from '../services/storageService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedUser = await StorageService.loadUser();
        if (savedUser) {
          setUser(savedUser);
        }
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const authenticated = AuthService.authenticate(username, password);
      if (!authenticated) {
        return false;
      }
      await StorageService.saveUser(authenticated);
      setUser(authenticated);
      return true;
    },
    [],
  );

  const logout = useCallback(async () => {
    await StorageService.clearUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
