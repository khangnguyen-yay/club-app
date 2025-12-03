import { createContext } from 'react';

//Context and types live here (non-component) to satisfy react-refresh/only-export-components and avoid circular imports.
export type Theme = 'light' | 'dark';

export type ThemeContextValue = {
	theme: Theme;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);



