import { useContext } from 'react';
import { ThemeContext } from './context';

//Hook lives outside the component file to satisfy react-refresh/only-export-components.
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}


