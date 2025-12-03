import React, { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './context';
import type { Theme } from './context';

// ThemeContext lives in './context' and the hook in './useTheme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useMemo(
    () => () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


