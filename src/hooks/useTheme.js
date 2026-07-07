import { useState, useEffect, useCallback } from 'react';

// localStorage key — also read synchronously by the inline FOUC script in index.html
const STORAGE_KEY = 'theme';
const VALID_VALUES = new Set(['light', 'dark', 'system']);

// Safe storage helpers — guard against SSR, private browsing, sandboxed iframes
function readStoredTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (VALID_VALUES.has(v)) return v;
  } catch {
    /* localStorage blocked */
  }
  return 'system';
}

function writeStoredTheme(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* localStorage blocked */
  }
}

// Resolve the user-facing theme (which may be 'system') to an actual rendered
// class ('light' or 'dark'). Per design §0 we never put 'system' on <html>.
function resolve(theme) {
  if (theme === 'light' || theme === 'dark') return theme;
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch {
      /* matchMedia threw */
    }
  }
  return 'light';
}

function applyClass(resolved) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(resolved);
}

/**
 * Tri-state theme hook. Returned API:
 *  - theme:    user intent, 'light' | 'dark' | 'system'
 *  - resolved: what is actually rendered on <html>, 'light' | 'dark'
 *  - setTheme: explicit setter
 *  - cycle:    convenience — light → dark → system → light
 *
 * Per REQ-9 (strict), `<html>` always carries `light` or `dark`, never `system`.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    const initial = readStoredTheme();
    // Mirror FOUC script: apply class on first render so React state matches DOM.
    applyClass(resolve(initial));
    return initial;
  });

  // Hydrate from localStorage on mount (covers HMR / first load where initial
  // happened before localStorage was readable).
  useEffect(() => {
    const stored = readStoredTheme();
    setThemeState(prev => (prev === stored ? prev : stored));
    // Run once on mount — intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever user intent changes, persist + apply resolved class to <html>.
  useEffect(() => {
    applyClass(resolve(theme));
    writeStoredTheme(theme);
  }, [theme]);

  // Subscribe to OS preference flips while in 'system' mode. Re-resolve in
  // place — no need to touch `theme` since user intent stays 'system'.
  useEffect(() => {
    if (theme !== 'system') return undefined;
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyClass(resolve('system'));
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  // Cross-tab sync — a toggle in another tab updates this one.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handler = (e) => {
      if (e.key === STORAGE_KEY && VALID_VALUES.has(e.newValue || 'system')) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next);
  }, []);

  const cycle = useCallback(() => {
    setThemeState(t => (t === 'light' ? 'dark' : t === 'dark' ? 'system' : 'light'));
  }, []);

  return { theme, setTheme, cycle, resolved: resolve(theme) };
}
