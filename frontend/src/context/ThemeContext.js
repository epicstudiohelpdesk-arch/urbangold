import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext();
const DEFAULT_THEME = 'light';

const normalizeTheme = (value) => (value === 'dark' ? 'dark' : DEFAULT_THEME);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const transitionTimeoutRef = useRef(null);

  const applyTheme = (nextTheme) => {
    const normalizedTheme = normalizeTheme(nextTheme);
    setTheme(normalizedTheme);

    try {
      localStorage.setItem('theme', normalizedTheme);
    } catch (error) {
      // Ignore storage restrictions.
    }
  };

  useEffect(() => {
    let savedTheme = DEFAULT_THEME;

    try {
      savedTheme = normalizeTheme(localStorage.getItem('theme'));
    } catch (error) {
      // Ignore storage restrictions.
    }

    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      applyTheme(newTheme);
      return;
    }

    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        applyTheme(newTheme);
      });
      return;
    }

    root.classList.add('theme-transitioning');
    applyTheme(newTheme);
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
      transitionTimeoutRef.current = null;
    }, 360);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
