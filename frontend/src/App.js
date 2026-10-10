import "@/App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import CinematicLoader from "./components/CinematicLoader";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Toaster } from './components/ui/sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingRecycleBin from './components/FloatingRecycleBin';
import Home from './pages/Home';

// Pre-define lazy imports for route-based code splitting
const lazyRoutes = {
  '/about': () => import('./pages/About'),
  '/opportunity': () => import('./pages/Opportunity'),
  '/technology': () => import('./pages/Technology'),
  '/roadmap': () => import('./pages/Roadmap'),
  '/governance': () => import('./pages/Governance'),
  '/investors': () => import('./pages/Investors'),
  '/contact': () => import('./pages/Contact'),
  '/login': () => import('./pages/Login'),
  '/backend': () => import('./pages/BackendPortal'),
};

// Pre-create lazy components
const About = lazy(lazyRoutes['/about']);
const Opportunity = lazy(lazyRoutes['/opportunity']);
const Technology = lazy(lazyRoutes['/technology']);
const Roadmap = lazy(lazyRoutes['/roadmap']);
const Governance = lazy(lazyRoutes['/governance']);
const Investors = lazy(lazyRoutes['/investors']);
const Contact = lazy(lazyRoutes['/contact']);
const Login = lazy(lazyRoutes['/login']);
const BackendPortal = lazy(lazyRoutes['/backend']);

// Array of prefetch functions for idle-time loading
const lazyRouteImporters = Object.values(lazyRoutes);
const AUTH_SESSION_STORAGE_KEY = 'ug_auth_session_v1';

function getAuthSessionExpiryMs(session) {
  const raw = session?.expiresAt;
  if (!raw) return null;
  const parsedMs = Date.parse(String(raw));
  return Number.isFinite(parsedMs) ? parsedMs : null;
}

function isAuthSessionExpired(session, nowMs = Date.now()) {
  const expiryMs = getAuthSessionExpiryMs(session);
  if (!expiryMs) return false;
  return nowMs >= expiryMs;
}

function readStoredAuthSession() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.token || !parsed?.user) return null;
    if (isAuthSessionExpired(parsed)) {
      window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    return null;
  }
}

function writeStoredAuthSession(session) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    // Ignore storage restrictions.
  }
}

function clearStoredAuthSession() {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  } catch (error) {
    // Ignore storage restrictions.
  }
}

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function AppShell({
  authSession,
  isAuthenticated,
  onLoginSuccess,
  onLogout,
  onLoadComplete,
}) {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const hideFooter = pathname === '/login' || pathname === '/backend';
  const hideNavbar = pathname === '/backend';
  const isBackendUiRoute = pathname === '/backend';
  const [showFloatingBin, setShowFloatingBin] = useState(false);
  const contentShellClass = hideNavbar
    ? 'pt-0'
    : 'md:ml-[88px] lg:ml-[84px] pt-16 md:pt-0';

  useEffect(() => {
    const root = document.documentElement;
    const shouldUseDarkMode = !isBackendUiRoute && theme === 'dark';
    root.classList.toggle('dark', shouldUseDarkMode);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', shouldUseDarkMode ? '#0f172a' : '#ffffff');
    }
  }, [isBackendUiRoute, theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (hideFooter) {
      setShowFloatingBin(false);
      return undefined;
    }
    if (pathname !== '/') {
      setShowFloatingBin(true);
      return undefined;
    }

    const handleHeroEnd = (event) => {
      setShowFloatingBin(Boolean(event?.detail?.passed));
    };

    setShowFloatingBin(false);
    window.addEventListener('ug-hero-end', handleHeroEnd);

    return () => {
      window.removeEventListener('ug-hero-end', handleHeroEnd);
    };
  }, [hideFooter, pathname]);

  useEffect(() => {
    // onLoadComplete timing handled in App function (40s timeout)
  }, []);

  return (
    <>
      <ScrollToTopOnRouteChange />
      {showFloatingBin && <FloatingRecycleBin />}
      {!hideNavbar && <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />}
      <div className="app-entry-shell">
        {/* Offset content: left margin for the collapsed sidebar (desktop), top padding for the mobile top bar */}
        <div className={contentShellClass}>
          <Suspense fallback={<div className="min-h-[32vh] sm:min-h-[38vh] lg:min-h-[44vh]" aria-hidden="true" />}>
            <Routes>
              <Route
                path="/login"
                element={
                  <Login
                    isAuthenticated={isAuthenticated}
                    onLoginSuccess={onLoginSuccess}
                  />
                }
              />
              <Route
                path="/backend"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <BackendPortal authSession={authSession} onLogout={onLogout} />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/opportunity" element={<Opportunity />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
          {!hideFooter && <Footer />}
        </div>
      </div>
    </>
  );
}

function App() {
  const [authSession, setAuthSession] = useState(() => readStoredAuthSession());
  const isAuthenticated = Boolean(authSession?.token) && !isAuthSessionExpired(authSession);




  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const root = document.documentElement;
    const mobileQuery = window.matchMedia('(max-width: 1023px), (pointer: coarse)');

    const applyMobilePerfMode = () => {
      root.classList.toggle('ug-mobile-optimized', mobileQuery.matches);
    };

    applyMobilePerfMode();

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', applyMobilePerfMode);
      return () => {
        mobileQuery.removeEventListener('change', applyMobilePerfMode);
        root.classList.remove('ug-mobile-optimized');
      };
    }

    mobileQuery.addListener(applyMobilePerfMode);
    return () => {
      mobileQuery.removeListener(applyMobilePerfMode);
      root.classList.remove('ug-mobile-optimized');
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(connection?.saveData);
    const effectiveType = String(connection?.effectiveType || '').toLowerCase();
    const slowConnection = effectiveType.includes('2g') || effectiveType.includes('3g');
    const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;

    if (saveData || slowConnection || lowCpu || lowMemory) return undefined;

    const prefetchQueue = [...lazyRouteImporters];
    let idleHandle = null;
    let fallbackTimeout = null;
    let kickoffTimer = null;
    let cancelled = false;

    const runPrefetchQueue = (deadline) => {
      if (cancelled || prefetchQueue.length === 0) return;

      if (!deadline || deadline.timeRemaining() > 12 || deadline.didTimeout) {
        const importPage = prefetchQueue.shift();
        importPage?.();
      }

      if (prefetchQueue.length === 0 || cancelled) return;
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(runPrefetchQueue, { timeout: 2200 });
      } else {
        fallbackTimeout = window.setTimeout(() => runPrefetchQueue(), 240);
      }
    };

    kickoffTimer = window.setTimeout(() => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(runPrefetchQueue, { timeout: 2400 });
      } else {
        fallbackTimeout = window.setTimeout(() => runPrefetchQueue(), 280);
      }
    }, 650);

    return () => {
      cancelled = true;
      if (kickoffTimer !== null) {
        window.clearTimeout(kickoffTimer);
      }
      if (idleHandle !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (fallbackTimeout !== null) {
        window.clearTimeout(fallbackTimeout);
      }
    };
  }, []);

  useEffect(() => {
    if (!authSession?.token) return undefined;

    const expiryMs = getAuthSessionExpiryMs(authSession);
    if (!expiryMs) return undefined;

    const remainingMs = expiryMs - Date.now();
    if (remainingMs <= 0) {
      setAuthSession(null);
      clearStoredAuthSession();
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setAuthSession(null);
      clearStoredAuthSession();
    }, remainingMs + 250);

    return () => window.clearTimeout(timerId);
  }, [authSession]);

  const handleLoginSuccess = (sessionPayload) => {
    const nextSession = {
      token: sessionPayload.access_token,
      user: sessionPayload.user,
      expiresAt: sessionPayload.expires_at ?? null,
      apiBaseUrl: sessionPayload.apiBaseUrl ?? null,
    };

    setAuthSession(nextSession);
    writeStoredAuthSession(nextSession);
  };

  const handleLogout = () => {
    setAuthSession(null);
    clearStoredAuthSession();
  };

  return (
    <ThemeProvider>
      <CinematicLoader />
      <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <BrowserRouter>
          <AppShell
            authSession={authSession}
            isAuthenticated={isAuthenticated}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        </BrowserRouter>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
