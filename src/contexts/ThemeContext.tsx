import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ThemeMode = 'light' | 'dark' | 'system' | 'night';

interface ThemeContextType {
  themeMode: ThemeMode;
  effectiveTheme: 'light' | 'dark' | 'night';
  setThemeMode: (mode: ThemeMode) => void;
  isNightMode: boolean;
  // Legacy support
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('themeMode', 'system');

  const effectiveTheme = useMemo(() => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (themeMode === 'night') {
      return 'night';
    }
    return themeMode;
  }, [themeMode]);

  const isNightMode = effectiveTheme === 'night';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    
    // Remove all theme classes first
    document.documentElement.classList.remove('dark', 'night-mode');
    
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (effectiveTheme === 'night') {
      document.documentElement.classList.add('night-mode');
    }
  }, [effectiveTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(effectiveTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ 
      themeMode, 
      effectiveTheme, 
      setThemeMode,
      isNightMode,
      theme: effectiveTheme === 'night' ? 'dark' : effectiveTheme, 
      toggleTheme 
    }}>
      {children}
      {/* Blue light filter overlay for night mode */}
      {isNightMode && <div className="night-mode-filter" aria-hidden="true" />}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
