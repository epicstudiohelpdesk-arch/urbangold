import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BriefcaseBusiness,
  ClipboardCheck,
  FlaskConical,
  HandCoins,
  Home,
  Info,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Moon,
  Route,
  Shield,
  Sun,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MOBILE_DRAWER_ENTER_MS = 300;

const navLinks = [
  { name: 'Home',       path: '/',            icon: Home },
  { name: 'About',      path: '/about',        icon: Info },
  { name: 'Opportunity',path: '/opportunity',  icon: BriefcaseBusiness },
  { name: 'Technology', path: '/technology',   icon: FlaskConical },
  { name: 'Roadmap',    path: '/roadmap',      icon: Route },
  { name: 'Governance', path: '/governance',   icon: ClipboardCheck },
  { name: 'Investors',  path: '/investors',    icon: HandCoins },
  { name: 'Contact',    path: '/contact',      icon: Mail },
];

const Navbar = ({ isAuthenticated = false, onLogout = () => {} }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCloseReady, setMobileCloseReady] = useState(false);
  const [desktopNavScrollIndicator, setDesktopNavScrollIndicator] = useState({
    visible: false,
    thumbTop: 0,
    thumbHeight: 28,
  });
  const [desktopExpanded, setDesktopExpanded] = useState(false);
  const desktopNavRef = useRef(null);
  const desktopNavScrollRef = useRef(null);
  const desktopCollapseLockRef = useRef(false);
  const desktopCollapseTimeoutRef = useRef(null);
  const authDestination = isAuthenticated ? '/backend' : '/login';
  const authLabel = isAuthenticated ? 'BACKEND' : 'LOGIN';
  const AuthIcon = isAuthenticated ? Shield : LogIn;
  const authReturnTo = `${location.pathname}${location.search}${location.hash}`;
  const authLinkTarget = isAuthenticated
    ? authDestination
    : {
        pathname: '/login',
        search: authReturnTo ? `?returnTo=${encodeURIComponent(authReturnTo)}` : '',
      };
  const authLinkState = isAuthenticated ? undefined : { from: location };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!desktopExpanded || !isDesktop) return undefined;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [desktopExpanded]);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const scrollY = window.scrollY;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPosition = document.body.style.position;
    const prevBodyTop = document.body.style.top;
    const prevBodyWidth = document.body.style.width;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.position = prevBodyPosition;
      document.body.style.top = prevBodyTop;
      document.body.style.width = prevBodyWidth;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.documentElement.style.overscrollBehavior = prevHtmlOverscroll;
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      setMobileCloseReady(false);
      return undefined;
    }

    const mobileCloseTimer = window.setTimeout(() => {
      setMobileCloseReady(true);
    }, MOBILE_DRAWER_ENTER_MS);

    return () => window.clearTimeout(mobileCloseTimer);
  }, [mobileOpen]);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) {
      setDesktopNavScrollIndicator({ visible: false, thumbTop: 0, thumbHeight: 28 });
      return undefined;
    }

    const scrollContainer = desktopNavScrollRef.current;
    if (!scrollContainer) return undefined;

    let frameId = null;
    let resizeObserver = null;

    const updateIndicator = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 20) {
        setDesktopNavScrollIndicator((prev) =>
          prev.visible ? { visible: false, thumbTop: 0, thumbHeight: 28 } : prev
        );
        return;
      }

      const rawThumbHeight = Math.round((clientHeight / scrollHeight) * clientHeight);
      const thumbHeight = Math.min(46, Math.max(16, rawThumbHeight));
      const maxThumbTop = Math.max(0, clientHeight - thumbHeight);
      const thumbTop = Math.round((scrollTop / maxScroll) * maxThumbTop);

      setDesktopNavScrollIndicator((prev) => {
        if (prev.visible && prev.thumbTop === thumbTop && prev.thumbHeight === thumbHeight) {
          return prev;
        }
        return { visible: true, thumbTop, thumbHeight };
      });
    };

    const scheduleIndicatorUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateIndicator();
      });
    };

    scheduleIndicatorUpdate();

    scrollContainer.addEventListener('scroll', scheduleIndicatorUpdate, { passive: true });
    window.addEventListener('resize', scheduleIndicatorUpdate);

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleIndicatorUpdate);
      resizeObserver.observe(scrollContainer);
    }

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      scrollContainer.removeEventListener('scroll', scheduleIndicatorUpdate);
      window.removeEventListener('resize', scheduleIndicatorUpdate);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [desktopExpanded]);

  useEffect(() => {
    if (!desktopExpanded) return undefined;

    const handlePointerDown = (event) => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      if (!isDesktop) return;

      if (desktopNavRef.current && desktopNavRef.current.contains(event.target)) return;
      setDesktopExpanded(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [desktopExpanded]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDesktopExpanded(false);
      } else {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (desktopCollapseTimeoutRef.current) {
        window.clearTimeout(desktopCollapseTimeoutRef.current);
      }
    };
  }, []);

  const lockDesktopCollapseDuringThemeSwitch = () => {
    desktopCollapseLockRef.current = true;
    if (desktopCollapseTimeoutRef.current) {
      window.clearTimeout(desktopCollapseTimeoutRef.current);
    }

    desktopCollapseTimeoutRef.current = window.setTimeout(() => {
      desktopCollapseLockRef.current = false;
      desktopCollapseTimeoutRef.current = null;
    }, 420);
  };

  const handleDesktopThemeToggle = () => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop && desktopExpanded) {
      lockDesktopCollapseDuringThemeSwitch();
      setDesktopExpanded(true);
    }
    toggleTheme();
  };

  return (
    <>
      {desktopExpanded && (
        <div className="hidden md:block fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm dark:bg-black/70 pointer-events-auto" />
      )}

      {/* Desktop Vertical Sidebar */}
      <nav
        ref={desktopNavRef}
        onMouseEnter={() => setDesktopExpanded(true)}
        onMouseLeave={() => {
          if (desktopCollapseLockRef.current) return;
          setDesktopExpanded(false);
        }}
        className={[
          'group/sidebar',
          'fixed left-2 top-7 bottom-7 h-[calc(100vh-3.5rem)] z-[60]',
          'hidden md:flex flex-col',
          desktopExpanded ? 'md:w-[252px] lg:w-[236px]' : 'md:w-[74px] lg:w-[68px]',
          'overflow-x-hidden rounded-[22px] border',
          'transition-[width,box-shadow,background-color,border-color] duration-300 ease-out',
          desktopExpanded
            ? 'bg-white dark:bg-slate-950 border-slate-300/80 dark:border-emerald-900/50'
            : 'bg-white dark:bg-slate-950 border-slate-200/85 dark:border-slate-800/80',
          'shadow-[0_18px_46px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_46px_rgba(0,0,0,0.52)]',
          'hover:shadow-[0_22px_54px_rgba(15,23,42,0.18)] dark:hover:shadow-[0_22px_54px_rgba(0,0,0,0.58)]',
        ].join(' ')}
      >
        {/* Logo / Brand */}
        <div className="relative flex items-center h-[80px] px-[14px] shrink-0 border-b border-slate-200/70 dark:border-slate-800/75">
          <Link
            to="/"
            className={`flex w-full min-w-0 items-center group/logo transition-all duration-200 ${
              desktopExpanded ? 'justify-start gap-3.5' : 'justify-center gap-0'
            }`}
          >
            <div className="relative w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-lime-500 text-white flex items-center justify-center font-black text-[12px] tracking-[0.03em] shadow-lg shadow-emerald-500/30 dark:shadow-emerald-900/70 transition-transform duration-300 group-hover/logo:scale-105">
              UG
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white dark:border-slate-900" />
            </div>
            <div
              className={`min-w-0 overflow-hidden transition-all duration-200 ${
                desktopExpanded ? 'max-w-[170px] opacity-100' : 'max-w-0 opacity-0'
              }`}
            >
              <p className="text-[13px] font-black tracking-[0.04em] uppercase text-slate-900 dark:text-white leading-tight whitespace-nowrap flex items-center gap-1.5">
                Urban Gold
                <span className="text-[9px] font-black tracking-[0.18em] text-emerald-500 dark:text-emerald-400 border border-emerald-400/60 dark:border-emerald-500/50 rounded px-1 py-px leading-none">
                  INDIA
                </span>
              </p>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 whitespace-nowrap">
                Resource Systems
              </p>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <div className="relative flex-1 min-h-0">
          <div
            ref={desktopNavScrollRef}
            className="h-full overflow-y-auto py-4 pl-[10px] pr-[14px]"
          >
            <div className="flex flex-col">
              <p
                className={`pl-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 min-w-0 overflow-hidden transition-all duration-200 ${
                  desktopExpanded ? 'max-w-[140px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                Navigation
              </p>
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={[
                    'group/nav relative flex items-center h-12 px-[8px] rounded-2xl mb-1',
                    desktopExpanded ? 'justify-start gap-2.5' : 'justify-center gap-0',
                    'text-[13px] font-semibold transition-all duration-200',
                    isActive(path)
                      ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-[0_10px_26px_rgba(15,23,42,0.25)] dark:shadow-[0_10px_26px_rgba(114,191,0,0.34)]'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:-translate-y-[1px] hover:border-slate-200/90 dark:hover:border-emerald-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)] dark:hover:shadow-[0_8px_18px_rgba(0,0,0,0.32)]',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200',
                      isActive(path)
                        ? 'bg-white/18 dark:bg-black/15'
                        : 'bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-300 group-hover/nav:bg-white dark:group-hover/nav:bg-slate-700/70 group-hover/nav:text-emerald-600 dark:group-hover/nav:text-emerald-300'
                    ].join(' ')}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                  </span>
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                      desktopExpanded ? 'max-w-[144px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    {name}
                  </span>
                  {isActive(path) && (
                    <span
                      className={`absolute right-3 h-1.5 w-1.5 rounded-full bg-emerald-300 dark:bg-lime-300 ${
                        desktopExpanded ? 'block' : 'hidden'
                      }`}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 right-[4px] top-3 bottom-3 w-[2px] rounded-full bg-slate-300/45 dark:bg-slate-700/45 transition-opacity duration-200"
            style={{ opacity: desktopNavScrollIndicator.visible ? 1 : 0 }}
          >
            <span
              className="absolute inset-x-0 rounded-full bg-slate-500/70 dark:bg-slate-200/65 transition-[height,transform] duration-150"
              style={{
                height: `${desktopNavScrollIndicator.thumbHeight}px`,
                transform: `translateY(${desktopNavScrollIndicator.thumbTop}px)`
              }}
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="relative px-[10px] pb-5 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col gap-1.5 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={handleDesktopThemeToggle}
            className={`group/action flex items-center h-12 px-[8px] rounded-2xl w-full text-[13px] font-semibold border border-transparent text-slate-600 dark:text-slate-300 hover:-translate-y-[1px] hover:border-slate-200/90 dark:hover:border-slate-700/85 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)] dark:hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] transition-all duration-200 ${
              desktopExpanded ? 'justify-start gap-2.5' : 'justify-center gap-0'
            }`}
            aria-label="Toggle theme"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-300 group-hover/action:bg-white dark:group-hover/action:bg-slate-700/70 group-hover/action:text-emerald-600 dark:group-hover/action:text-emerald-300 transition-colors duration-200">
              {theme === 'light'
                ? <Moon className="h-[18px] w-[18px] shrink-0" />
                : <Sun className="h-[18px] w-[18px] shrink-0" />
              }
            </span>
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                desktopExpanded ? 'max-w-[148px] opacity-100' : 'max-w-0 opacity-0'
              }`}
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>

          {/* Login / Backend CTA */}
          <Link
            to={authLinkTarget}
            state={authLinkState}
            className={`flex items-center h-12 px-[8px] rounded-2xl text-[12px] font-semibold uppercase tracking-[0.12em] border border-slate-300/85 dark:border-slate-700/85 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-[0_8px_20px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.34)] transition-all duration-200 ${
              desktopExpanded ? 'justify-start gap-2.5' : 'justify-center gap-0'
            }`}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-300/85 dark:border-slate-700/85 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
              <AuthIcon className="h-[17px] w-[17px] shrink-0" />
            </span>
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                desktopExpanded ? 'max-w-[148px] opacity-100' : 'max-w-0 opacity-0'
              }`}
            >
              {authLabel}
            </span>
          </Link>

          {isAuthenticated && (
            <button
              type="button"
              onClick={onLogout}
              className={`flex items-center h-12 px-[8px] rounded-2xl text-[12px] font-semibold uppercase tracking-[0.12em] border border-slate-200/90 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 ${
                desktopExpanded ? 'justify-start gap-2.5' : 'justify-center gap-0'
              }`}
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200/80 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200">
                <LogOut className="h-[17px] w-[17px] shrink-0" />
              </span>
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                  desktopExpanded ? 'max-w-[148px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                LOGOUT
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-2 left-2 right-2 z-[60] px-1">
        <div className="mobile-brand-shell relative h-[3.85rem] rounded-[1.1rem] border border-white/70 dark:border-slate-700/70 overflow-hidden flex items-center px-2.5">
          <div className="mobile-brand-pulse pointer-events-none absolute -top-16 -right-10 h-28 w-28 rounded-full bg-emerald-300/50 dark:bg-emerald-500/30 blur-2xl" />
          <div className="mobile-brand-pulse pointer-events-none absolute -bottom-14 -left-8 h-24 w-24 rounded-full bg-teal-300/45 dark:bg-cyan-500/20 blur-2xl" />

          <button
            onClick={() => setMobileOpen(true)}
            className="mobile-header-control relative h-9 w-9 inline-flex items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-[0_8px_20px_rgba(15,23,42,0.14)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.38)]"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link to="/" className="relative ml-2.5 flex items-center gap-2.5 min-w-0 pr-2">
            <div className="mobile-brand-mark relative w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-lime-500 text-white flex items-center justify-center font-black text-[10px] tracking-[0.03em] shadow-[0_8px_18px_rgba(16,185,129,0.36)]">
              UG
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-300 border border-white dark:border-slate-900" />
            </div>
            <div className="min-w-0">
              <p className="mobile-brand-title mobile-display-type text-[12px] font-black tracking-[0.04em] uppercase text-slate-900 dark:text-white leading-none flex items-center gap-1">
                Urban Gold
                <span className="text-[7px] font-black tracking-[0.14em] text-emerald-500 dark:text-emerald-300 border border-emerald-400/60 dark:border-emerald-500/50 rounded px-1 py-px leading-none">
                  INDIA
                </span>
              </p>
              <p className="mobile-brand-caption mt-1 text-[8px] font-semibold uppercase tracking-[0.17em] text-slate-600 dark:text-slate-300 truncate">
                Circular Recovery Intelligence
              </p>
            </div>
          </Link>

          <button
            onClick={toggleTheme}
            className="mobile-header-control relative ml-auto h-9 w-9 inline-flex items-center justify-center rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-[0_8px_20px_rgba(15,23,42,0.14)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.38)]"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-In Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative ml-2 mt-4 mb-[calc(env(safe-area-inset-bottom)+1rem)] w-[236px] max-w-[84vw] h-[calc(100vh-5rem)] h-[calc(100dvh-5rem-env(safe-area-inset-bottom))]">
            {/* Close Button - Outside drawer on top-right */}
              <button
                onClick={() => setMobileOpen(false)}
                className={[
                  'absolute top-3 -right-12 z-[70] h-9 w-9 inline-flex items-center justify-center rounded-xl border border-slate-200/95 dark:border-slate-700/90 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-[0_10px_24px_rgba(15,23,42,0.22)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-all duration-200 ease-out',
                  mobileCloseReady
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
                ].join(' ')}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>

            <div className="h-full overflow-hidden rounded-[22px] border border-slate-300/80 dark:border-emerald-900/50 bg-white dark:bg-slate-950 shadow-[0_18px_46px_rgba(15,23,42,0.16)] dark:shadow-[0_18px_46px_rgba(0,0,0,0.58)] flex flex-col animate-in slide-in-from-left duration-300">
              <div className="relative flex items-center h-[74px] px-[12px] shrink-0 border-b border-slate-200/70 dark:border-slate-800/75">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full min-w-0 items-center justify-start gap-3 pr-10 group/logo transition-all duration-200"
                >
                <div className="relative w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-lime-500 text-white flex items-center justify-center font-black text-[11px] tracking-[0.03em] shadow-lg shadow-emerald-500/30 dark:shadow-emerald-900/70">
                  UG
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white dark:border-slate-900" />
                </div>
                <div className="min-w-0 overflow-hidden max-w-[156px] opacity-100">
                  <p className="text-[12px] font-black tracking-[0.03em] uppercase text-slate-900 dark:text-white leading-tight whitespace-nowrap flex items-center gap-1">
                    Urban Gold
                    <span className="text-[8px] font-black tracking-[0.16em] text-emerald-500 dark:text-emerald-400 border border-emerald-400/60 dark:border-emerald-500/50 rounded px-1 py-px leading-none">
                      INDIA
                    </span>
                  </p>
                  <p className="text-[9px] font-semibold tracking-[0.16em] uppercase text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    Resource Systems
                  </p>
                </div>
              </Link>
            </div>

            <div className="relative flex-1 min-h-0 overflow-y-auto py-4 px-[10px]">
                <div className="flex flex-col">
                  <p className="pl-2 pb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Navigation
                  </p>
                  {navLinks.map(({ name, path, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'group/mobile-nav relative flex items-center h-11 px-[8px] rounded-2xl mb-1 justify-start gap-2',
                        'text-[12px] font-semibold transition-all duration-200',
                        isActive(path)
                          ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-[0_10px_26px_rgba(15,23,42,0.25)] dark:shadow-[0_10px_26px_rgba(114,191,0,0.34)]'
                          : 'border border-transparent text-slate-600 dark:text-slate-300 hover:-translate-y-[1px] hover:border-slate-200/90 dark:hover:border-emerald-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)] dark:hover:shadow-[0_8px_18px_rgba(0,0,0,0.32)]'
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-200',
                          isActive(path)
                            ? 'bg-white/18 dark:bg-black/15'
                            : 'bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-300 group-hover/mobile-nav:bg-white dark:group-hover/mobile-nav:bg-slate-700/70 group-hover/mobile-nav:text-emerald-600 dark:group-hover/mobile-nav:text-emerald-300'
                        ].join(' ')}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                      </span>
                      <span className="overflow-hidden whitespace-nowrap max-w-[132px] opacity-100">
                        {name}
                      </span>
                      {isActive(path) && (
                        <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-emerald-300 dark:bg-lime-300" />
                      )}
                    </Link>
                  ))}
                </div>
            </div>

            <div className="relative px-[10px] pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col gap-1.5 shrink-0">
              <button
                onClick={toggleTheme}
                className="group/action flex items-center h-11 px-[8px] rounded-2xl w-full text-[12px] font-semibold border border-transparent text-slate-600 dark:text-slate-300 hover:-translate-y-[1px] hover:border-slate-200/90 dark:hover:border-emerald-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)] dark:hover:shadow-[0_8px_18px_rgba(0,0,0,0.32)] transition-all duration-200 justify-start gap-2"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-300 group-hover/action:bg-white dark:group-hover/action:bg-slate-700/70 group-hover/action:text-emerald-600 dark:group-hover/action:text-emerald-300 transition-colors duration-200">
                  {theme === 'light'
                    ? <Moon className="h-4 w-4 shrink-0" />
                    : <Sun className="h-4 w-4 shrink-0" />
                  }
                </span>
                <span className="overflow-hidden whitespace-nowrap max-w-[136px] opacity-100">
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </button>

              <Link
                to={authLinkTarget}
                state={authLinkState}
                onClick={() => setMobileOpen(false)}
                className="flex items-center h-11 px-[8px] rounded-2xl text-[11px] font-semibold uppercase tracking-[0.1em] border border-slate-300/85 dark:border-slate-700/85 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-[0_8px_20px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.34)] transition-all duration-200 justify-start gap-2"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-300/85 dark:border-slate-700/85 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                  <AuthIcon className="h-4 w-4 shrink-0" />
                </span>
                <span className="overflow-hidden whitespace-nowrap max-w-[136px] opacity-100">
                  {authLabel}
                </span>
              </Link>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onLogout?.();
                  }}
                  className="flex items-center h-11 px-[8px] rounded-2xl text-[11px] font-semibold uppercase tracking-[0.1em] border border-slate-200/90 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 justify-start gap-2"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200/80 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200">
                    <LogOut className="h-4 w-4 shrink-0" />
                  </span>
                  <span className="overflow-hidden whitespace-nowrap max-w-[136px] opacity-100">
                    LOGOUT
                  </span>
                </button>
              )}
            </div>
          </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;


