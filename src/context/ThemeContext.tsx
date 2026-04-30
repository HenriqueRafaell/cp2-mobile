import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { ThemeColors, ThemeContextType } from '../types';

const lightColors: ThemeColors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  primary: '#6C63FF',
  primaryLight: '#EDE9FF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  card: '#FFFFFF',
  tabBar: '#FFFFFF',
  tabBarActive: '#6C63FF',
  inputBackground: '#F9FAFB',
  placeholder: '#9CA3AF',
};

const darkColors: ThemeColors = {
  background: '#0F0F1A',
  surface: '#1A1A2E',
  primary: '#7C72FF',
  primaryLight: '#2D2B4E',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  border: '#374151',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  card: '#1E1E30',
  tabBar: '#1A1A2E',
  tabBarActive: '#7C72FF',
  inputBackground: '#252540',
  placeholder: '#6B7280',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
