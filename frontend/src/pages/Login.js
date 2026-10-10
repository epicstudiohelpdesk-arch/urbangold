import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  buildApiUrl,
  getApiBaseCandidates,
  getApiBaseUrl,
  persistApiBaseUrl,
} from '../lib/api';

const MODES = {
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
  FORGOT: 'forgot',
  RESET: 'reset',
};

const MODE_SET = new Set(Object.values(MODES));
const FOUNDER_ACCOUNT_TYPE = 'FOUNDER';
const ALL_ACCOUNT_TYPES = [
  FOUNDER_ACCOUNT_TYPE,
  'Management',
  'Investor',
  'Scrap Supplier',
  'Chemical Supplier',
];
const SIGNIN_ACCOUNT_TYPES = [...ALL_ACCOUNT_TYPES];
const SIGNUP_ACCOUNT_TYPES = ALL_ACCOUNT_TYPES.filter(
  (accountType) => accountType !== FOUNDER_ACCOUNT_TYPE
);
const FORGOT_ACCOUNT_TYPES = [
  ...ALL_ACCOUNT_TYPES,
];
const ACCOUNT_TYPE_PLACEHOLDER = 'Select account type';

const MODE_META = {
  [MODES.SIGN_IN]: {
    title: 'Sign In',
    subtitle: 'Welcome back. Access your workspace securely.',
    badge: 'Protected Access',
  },
  [MODES.SIGN_UP]: {
    title: 'Create Account',
    subtitle: 'Set up a new workspace account.',
    badge: 'New Registration',
  },
  [MODES.FORGOT]: {
    title: 'Forgot Password',
    subtitle: 'Request reset instructions for your account.',
    badge: 'Recovery Flow',
  },
  [MODES.RESET]: {
    title: 'Reset Password',
    subtitle: 'Choose a strong new password to continue.',
    badge: 'Secure Reset',
  },
};

function parseMode(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return MODE_SET.has(normalized) ? normalized : MODES.SIGN_IN;
}

function normalizeReturnPath(value) {
  const raw = String(value || '').trim();
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '';
  if (raw.startsWith('/login')) return '';
  if (raw === '/backend' || raw.startsWith('/backend?')) return '';
  return raw;
}

function passwordStrength(password) {
  const value = String(password || '');
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  if (score <= 1) return { label: 'Weak', width: '25%', color: 'bg-rose-500' };
  if (score <= 2) return { label: 'Medium', width: '55%', color: 'bg-amber-500' };
  return { label: 'Strong', width: '100%', color: 'bg-emerald-500' };
}

const Login = ({ isAuthenticated, onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = parseMode(searchParams.get('mode'));
  const resetToken = String(searchParams.get('token') || '').trim();
  const stateReturnPath = normalizeReturnPath(
    `${location.state?.from?.pathname || ''}${location.state?.from?.search || ''}${location.state?.from?.hash || ''}`
  );
  const queryReturnPath = normalizeReturnPath(searchParams.get('returnTo'));
  const backTargetPath = stateReturnPath || queryReturnPath;
  const modeMeta = MODE_META[mode] || MODE_META[MODES.SIGN_IN];
  const isSignInMode = mode === MODES.SIGN_IN;
  const isSignUpMode = mode === MODES.SIGN_UP;
  const redirectPath = '/backend';
  const showIdleLogoutNotice = location.state?.reason === 'idle-timeout';
  const idleTimeoutMinutes = Math.max(1, Math.round(Number(location.state?.idleTimeoutMinutes) || 30));
  const apiBaseUrl = getApiBaseUrl() || window.location.origin;

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugResetToken, setDebugResetToken] = useState('');
  const [isSignInAccountTypeMenuOpen, setIsSignInAccountTypeMenuOpen] = useState(false);
  const signInAccountTypeMenuRef = useRef(null);
  const [isSignUpAccountTypeMenuOpen, setIsSignUpAccountTypeMenuOpen] = useState(false);
  const signUpAccountTypeMenuRef = useRef(null);
  const [isForgotAccountTypeMenuOpen, setIsForgotAccountTypeMenuOpen] = useState(false);
  const forgotAccountTypeMenuRef = useRef(null);

  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);

  const [signInForm, setSignInForm] = useState({
    identifier: '',
    password: '',
    accountType: '',
  });
  const [signUpForm, setSignUpForm] = useState({
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    agree: true,
  });
  const [forgotForm, setForgotForm] = useState({
    email: '',
    accountType: '',
  });
  const [resetForm, setResetForm] = useState({ password: '', confirmPassword: '' });

  const signUpStrength = useMemo(() => passwordStrength(signUpForm.password), [signUpForm.password]);
  const resetStrength = useMemo(() => passwordStrength(resetForm.password), [resetForm.password]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!signInAccountTypeMenuRef.current?.contains(event.target)) setIsSignInAccountTypeMenuOpen(false);
      if (!signUpAccountTypeMenuRef.current?.contains(event.target)) setIsSignUpAccountTypeMenuOpen(false);
      if (!forgotAccountTypeMenuRef.current?.contains(event.target)) setIsForgotAccountTypeMenuOpen(false);
    };
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsSignInAccountTypeMenuOpen(false);
        setIsSignUpAccountTypeMenuOpen(false);
        setIsForgotAccountTypeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const clearFeedback = useCallback(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, []);

  const selectSignInAccountType = useCallback((accountType) => {
    setSignInForm((prev) => ({ ...prev, accountType }));
    setIsSignInAccountTypeMenuOpen(false);
  }, []);

  const selectSignUpAccountType = useCallback((accountType) => {
    setSignUpForm((prev) => ({ ...prev, accountType }));
    setIsSignUpAccountTypeMenuOpen(false);
  }, []);

  const selectForgotAccountType = useCallback((accountType) => {
    setForgotForm((prev) => ({ ...prev, accountType }));
    setIsForgotAccountTypeMenuOpen(false);
  }, []);

  const switchMode = useCallback((nextMode, tokenOverride = '') => {
    const normalizedMode = parseMode(nextMode);
    const next = new URLSearchParams();
    const preservedReturnTo = backTargetPath || queryReturnPath;

    if (normalizedMode !== MODES.SIGN_IN) {
      next.set('mode', normalizedMode);
    }
    if (preservedReturnTo) {
      next.set('returnTo', preservedReturnTo);
    }

    if (normalizedMode === MODES.RESET) {
      const nextToken = String(tokenOverride || resetToken).trim();
      if (nextToken) next.set('token', nextToken);
    }

    setSearchParams(next);
    clearFeedback();
  }, [backTargetPath, clearFeedback, queryReturnPath, resetToken, setSearchParams]);

  const handleBackButtonPress = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      navigate(-1);
      return;
    }

    if (mode !== MODES.SIGN_IN) {
      const next = new URLSearchParams();
      const preservedReturnTo = backTargetPath || queryReturnPath;
      if (preservedReturnTo) {
        next.set('returnTo', preservedReturnTo);
      }
      setSearchParams(next);
      clearFeedback();
      return;
    }

    if (backTargetPath) {
      navigate(backTargetPath, { replace: true });
      return;
    }

    navigate('/', { replace: true });
  }, [backTargetPath, clearFeedback, mode, navigate, queryReturnPath, setSearchParams]);

  const requestAuthEndpoint = useCallback(async ({ path, method = 'POST', payload = null }) => {
    const candidates = getApiBaseCandidates();
    if (!candidates.length) {
      candidates.push(getApiBaseUrl() || window.location.origin);
    }

    const tried = [];
    let sawMethodNotAllowed = false;
    let lastFailure = null;

    for (const candidate of candidates) {
      const endpoint = buildApiUrl(path, candidate);
      tried.push(endpoint);

      const options = {
        method,
        headers: {
          Accept: 'application/json',
        },
      };

      if (payload !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(payload);
      }

      let response;
      try {
        response = await fetch(endpoint, options);
      } catch (error) {
        continue;
      }

      if (response.status === 404 || response.status === 405) {
        if (response.status === 405) {
          sawMethodNotAllowed = true;
        }
        continue;
      }

      const contentType = response.headers.get('content-type') || '';
      const isJsonResponse = contentType.toLowerCase().includes('application/json');

      if (!isJsonResponse) {
        if (response.ok) {
          // Likely hit a non-API/static route. Try next candidate base URL.
          continue;
        }

        lastFailure = {
          ok: false,
          status: response.status,
          data: {
            detail: `Auth request failed with status ${response.status} at ${endpoint}.`,
          },
          candidate,
          tried,
        };
        continue;
      }

      let data = {};
      try {
        data = await response.json();
      } catch (error) {
        data = {};
      }

      return {
        ok: response.ok,
        status: response.status,
        data,
        candidate,
        tried,
      };
    }

    if (lastFailure) {
      return {
        ...lastFailure,
        data: {
          detail: `${lastFailure.data.detail} Tried: ${tried.join(' | ')}${
            sawMethodNotAllowed
              ? ' A 405 response usually means the frontend is calling the wrong service. Configure REACT_APP_BACKEND_URL to your backend URL and redeploy frontend.'
              : ''
          }`,
        },
        tried,
      };
    }

    return {
      ok: false,
      status: 0,
      data: {
        detail: `Auth service unreachable. Tried: ${tried.join(' | ')}${
          sawMethodNotAllowed
            ? ' A 405 response usually means the frontend is calling the wrong service. Configure REACT_APP_BACKEND_URL to your backend URL and redeploy frontend.'
            : ''
        }`,
      },
      candidate: '',
      tried,
    };
  }, []);

  const completeAuth = useCallback((sessionData, candidateBaseUrl) => {
    persistApiBaseUrl(candidateBaseUrl);
    onLoginSuccess({ ...sessionData, apiBaseUrl: candidateBaseUrl });
    navigate(redirectPath, { replace: true });
  }, [navigate, onLoginSuccess, redirectPath]);

  const formatAuthError = useCallback((result, fallbackMessage) => {
    const retrySeconds = Number(result?.data?.retry_seconds || 0);
    if (result?.status === 429 && retrySeconds > 0) {
      const detail = result?.data?.detail || 'Too many attempts.';
      return `${detail} Try again in ${retrySeconds}s.`;
    }

    if (result?.data?.detail) {
      return result.data.detail;
    }

    if (result?.status) {
      return `${fallbackMessage} (status ${result.status}).`;
    }

    return fallbackMessage;
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/backend" replace />;
  }

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!signInForm.accountType) {
      clearFeedback();
      setErrorMessage('Select an account type to continue.');
      return;
    }

    setIsSubmitting(true);
    clearFeedback();

    const result = await requestAuthEndpoint({
      path: '/api/auth/login',
      method: 'POST',
      payload: {
        identifier: signInForm.identifier.trim(),
        password: signInForm.password,
        account_type: signInForm.accountType,
      },
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage(formatAuthError(result, `Unable to sign in at ${apiBaseUrl}.`));
      return;
    }

    if (!result.data?.access_token || !result.data?.user) {
      setErrorMessage('Backend returned an incomplete session payload.');
      return;
    }

    completeAuth(result.data, result.candidate);
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!signUpForm.agree) {
      setErrorMessage('You must agree to the security policy before creating an account.');
      return;
    }
    if (!signUpForm.accountType) {
      setErrorMessage('Select an account type to continue.');
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setErrorMessage('Password and confirm password do not match.');
      return;
    }

    setIsSubmitting(true);
    clearFeedback();

    const result = await requestAuthEndpoint({
      path: '/api/auth/signup',
      method: 'POST',
      payload: {
        username: signUpForm.username.trim(),
        email: signUpForm.email.trim(),
        account_type: signUpForm.accountType,
        password: signUpForm.password,
      },
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage(formatAuthError(result, 'Unable to create account.'));
      return;
    }

    // Do not auto-login after signup; require explicit sign-in.
    // Pre-fill sign-in with the same identity context to reduce mismatch errors.
    persistApiBaseUrl(result.candidate);
    setSignInForm({
      identifier: signUpForm.email.trim(),
      password: '',
      accountType: signUpForm.accountType,
    });
    switchMode(MODES.SIGN_IN);
    setSuccessMessage('Account created. Sign in to continue.');
  };

  const handleForgotSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!forgotForm.accountType) {
      clearFeedback();
      setErrorMessage('Select an account type to continue.');
      return;
    }

    setIsSubmitting(true);
    clearFeedback();
    setDebugResetToken('');

    const result = await requestAuthEndpoint({
      path: '/api/auth/forgot-password',
      method: 'POST',
      payload: {
        email: forgotForm.email.trim(),
        account_type: forgotForm.accountType,
      },
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage(formatAuthError(result, 'Unable to request password reset.'));
      return;
    }

    setSuccessMessage(result.data?.message || 'Reset instructions have been sent to your email.');
    if (result.data?.reset_token) {
      setDebugResetToken(String(result.data.reset_token));
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!resetToken) {
      setErrorMessage('Reset token is missing. Request a new reset link.');
      return;
    }

    if (resetForm.password !== resetForm.confirmPassword) {
      setErrorMessage('Password and confirm password do not match.');
      return;
    }

    setIsSubmitting(true);
    clearFeedback();

    const result = await requestAuthEndpoint({
      path: '/api/auth/reset-password',
      method: 'POST',
      payload: {
        token: resetToken,
        password: resetForm.password,
      },
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage(formatAuthError(result, 'Unable to reset password.'));
      return;
    }

    setResetForm({ password: '', confirmPassword: '' });
    switchMode(MODES.SIGN_IN);
    setSuccessMessage(result.data?.message || 'Password reset successful. Please sign in.');
  };

  return (
    <section className="ug-auth-page relative min-h-screen overflow-hidden bg-[#e6ecef] px-3 pb-3 pt-6 sm:px-5 sm:pb-6 sm:pt-9 lg:px-8 lg:pb-10 lg:pt-12">
      <div className="ug-auth-shell relative mx-auto w-full max-w-[1220px] overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-white/95 p-2.5 shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:rounded-[1.8rem] sm:p-4 lg:p-5">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          <aside
            className={`ug-auth-aside hidden overflow-hidden rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(145deg,#0f172a,#0a4f38,#0f766e)] p-6 text-white sm:p-8 lg:z-10 lg:flex lg:flex-col lg:transition-transform lg:duration-700 lg:ease-in-out lg:will-change-transform motion-reduce:transform-none motion-reduce:transition-none ${
              isSignUpMode ? 'lg:translate-x-[calc(100%+1rem)]' : 'lg:translate-x-0'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-sm font-black">UG</span>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.08em]">Urban Gold</p>
                  <p className="text-[11px] text-white/80">Identity Layer</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleBackButtonPress}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/45 bg-white/10 px-3 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            </div>

            <div className="mt-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Authentication Suite
              </p>
              <h1 className="mt-4 text-[2rem] font-black leading-tight tracking-tight sm:text-[2.25rem]">
                Professional sign-in, sign-up, and recovery workflow.
              </h1>
              <p className="mt-3 text-sm text-white/90">
                This portal supports secure account creation, password recovery, and token-based reset.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-white/25 bg-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/80">Flows</p>
                <p className="mt-1 text-sm font-semibold">Sign In / Up</p>
              </article>
              <article className="rounded-xl border border-white/25 bg-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/80">Recovery</p>
                <p className="mt-1 text-sm font-semibold">Forgot / Reset</p>
              </article>
            </div>
          </aside>

          <main
            className={`ug-auth-main relative overflow-hidden rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.1)] sm:rounded-[1.6rem] sm:p-6 lg:z-20 lg:p-7 lg:transition-transform lg:duration-700 lg:ease-in-out lg:will-change-transform motion-reduce:transform-none motion-reduce:transition-none ${
              isSignInMode ? 'mx-auto w-full max-w-[560px] lg:max-w-none' : ''
            } ${
              isSignUpMode ? 'lg:-translate-x-[calc(100%+1rem)]' : 'lg:translate-x-0'
            }`}
          >
            <div className="mb-4 flex items-center justify-between gap-2 lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-[11px] font-black text-white">UG</span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.09em] text-emerald-800">Urban Gold</span>
              </div>
              <button
                type="button"
                onClick={handleBackButtonPress}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            </div>

            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              {modeMeta.badge}
            </p>
            <h2 className="mt-3 text-[1.65rem] font-black leading-tight tracking-tight text-slate-900 sm:mt-4 sm:text-3xl">
              {modeMeta.title}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:text-sm">{modeMeta.subtitle}</p>

            {showIdleLogoutNotice && (
              <div className="mt-4 rounded-xl border border-amber-300/80 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                You were logged out due to inactivity in the admin panel for {idleTimeoutMinutes} {idleTimeoutMinutes === 1 ? 'minute' : 'minutes'}.
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {mode === MODES.SIGN_IN && (
              <form className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5" onSubmit={handleSignInSubmit}>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Email or Username</span>
                  <span className="relative block">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={signInForm.identifier}
                      onChange={(event) => setSignInForm((prev) => ({ ...prev, identifier: event.target.value }))}
                      autoComplete="username"
                      autoFocus
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white sm:h-12"
                      placeholder="Enter email or username"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Account Type</span>
                  <div className="relative" ref={signInAccountTypeMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsSignInAccountTypeMenuOpen((prev) => !prev)}
                      className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-left text-sm font-medium text-slate-900 outline-none transition hover:border-slate-300 focus:border-emerald-400 focus:bg-white sm:h-12"
                      aria-haspopup="listbox"
                      aria-expanded={isSignInAccountTypeMenuOpen}
                    >
                      <span className={signInForm.accountType ? '' : 'text-slate-400'}>
                        {signInForm.accountType || ACCOUNT_TYPE_PLACEHOLDER}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${isSignInAccountTypeMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isSignInAccountTypeMenuOpen && (
                      <div className="absolute z-30 mt-2 max-h-56 w-full overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]">
                        <div role="listbox" aria-label="Sign in account type options">
                          {SIGNIN_ACCOUNT_TYPES.map((accountType) => (
                            <button
                              type="button"
                              key={accountType}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                selectSignInAccountType(accountType);
                              }}
                              onClick={() => selectSignInAccountType(accountType)}
                              className={`flex w-full items-center justify-between px-3 py-2.5 text-sm transition ${
                                signInForm.accountType === accountType
                                  ? 'bg-emerald-50 font-semibold text-emerald-700'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                              role="option"
                              aria-selected={signInForm.accountType === accountType}
                            >
                              <span>{accountType}</span>
                              {signInForm.accountType === accountType && (
                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Password</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showSignInPassword ? 'text' : 'password'}
                      value={signInForm.password}
                      onChange={(event) => setSignInForm((prev) => ({ ...prev, password: event.target.value }))}
                      autoComplete="current-password"
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white sm:h-12"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
                      aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignInPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => switchMode(MODES.FORGOT)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-600"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-80 sm:h-12"
                >
                  {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            )}

            {mode === MODES.SIGN_UP && (
              <form className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-3.5" onSubmit={handleSignUpSubmit}>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Username</span>
                  <span className="relative block">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={signUpForm.username}
                      onChange={(event) => setSignUpForm((prev) => ({ ...prev, username: event.target.value }))}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white sm:h-12"
                      placeholder="Create username"
                    />
                  </span>
                </label>

                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Email</span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={signUpForm.email}
                      onChange={(event) => setSignUpForm((prev) => ({ ...prev, email: event.target.value }))}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white sm:h-12"
                      placeholder="you@company.com"
                    />
                  </span>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Account Type</span>
                  <div className="relative" ref={signUpAccountTypeMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsSignUpAccountTypeMenuOpen((prev) => !prev)}
                      className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-left text-sm font-medium text-slate-900 outline-none transition hover:border-slate-300 focus:border-emerald-400 focus:bg-white sm:h-12"
                      aria-haspopup="listbox"
                      aria-expanded={isSignUpAccountTypeMenuOpen}
                    >
                      <span className={signUpForm.accountType ? '' : 'text-slate-400'}>
                        {signUpForm.accountType || ACCOUNT_TYPE_PLACEHOLDER}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${isSignUpAccountTypeMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isSignUpAccountTypeMenuOpen && (
                      <div className="absolute z-30 mt-2 max-h-56 w-full overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]">
                        <div role="listbox" aria-label="Account type options">
                          {SIGNUP_ACCOUNT_TYPES.map((accountType) => (
                            <button
                              type="button"
                              key={accountType}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                selectSignUpAccountType(accountType);
                              }}
                              onClick={() => selectSignUpAccountType(accountType)}
                              className={`flex w-full items-center justify-between px-3 py-2.5 text-sm transition ${
                                signUpForm.accountType === accountType
                                  ? 'bg-emerald-50 font-semibold text-emerald-700'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                              role="option"
                              aria-selected={signUpForm.accountType === accountType}
                            >
                              <span>{accountType}</span>
                              {signUpForm.accountType === accountType && (
                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Password</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showSignUpPassword ? 'text' : 'password'}
                      value={signUpForm.password}
                      onChange={(event) => setSignUpForm((prev) => ({ ...prev, password: event.target.value }))}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white sm:h-12"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
                      aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignUpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Confirm Password</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showSignUpConfirmPassword ? 'text' : 'password'}
                      value={signUpForm.confirmPassword}
                      onChange={(event) => setSignUpForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white sm:h-12"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpConfirmPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
                      aria-label={showSignUpConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignUpConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                <div className="sm:col-span-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">Password Strength: {signUpStrength.label}</p>
                  <div className="mt-1 h-2 rounded-full bg-slate-200">
                    <span style={{ width: signUpStrength.width }} className={`block h-full rounded-full ${signUpStrength.color}`} />
                  </div>
                </div>

                <label className="inline-flex items-start gap-2 text-xs text-slate-600 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={signUpForm.agree}
                    onChange={(event) => setSignUpForm((prev) => ({ ...prev, agree: event.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  I agree to secure account usage and authentication policy.
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-80 sm:col-span-2 sm:h-12"
                >
                  {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {mode === MODES.FORGOT && (
              <form className="mt-6 space-y-3.5" onSubmit={handleForgotSubmit}>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Account Email</span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={forgotForm.email}
                      onChange={(event) => setForgotForm((prev) => ({ ...prev, email: event.target.value }))}
                      required
                      autoFocus
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                      placeholder="you@company.com"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Account Type</span>
                  <div className="relative" ref={forgotAccountTypeMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsForgotAccountTypeMenuOpen((prev) => !prev)}
                      className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-left text-sm font-medium text-slate-900 outline-none transition hover:border-slate-300 focus:border-emerald-400 focus:bg-white"
                      aria-haspopup="listbox"
                      aria-expanded={isForgotAccountTypeMenuOpen}
                    >
                      <span className={forgotForm.accountType ? '' : 'text-slate-400'}>
                        {forgotForm.accountType || ACCOUNT_TYPE_PLACEHOLDER}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${isForgotAccountTypeMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isForgotAccountTypeMenuOpen && (
                      <div className="absolute bottom-full z-30 mb-2 max-h-56 w-full overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]">
                        <div role="listbox" aria-label="Forgot password account type options">
                          {FORGOT_ACCOUNT_TYPES.map((accountType) => (
                            <button
                              type="button"
                              key={accountType}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                selectForgotAccountType(accountType);
                              }}
                              onClick={() => selectForgotAccountType(accountType)}
                              className={`flex w-full items-center justify-between px-3 py-2.5 text-sm transition ${
                                forgotForm.accountType === accountType
                                  ? 'bg-emerald-50 font-semibold text-emerald-700'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                              role="option"
                              aria-selected={forgotForm.accountType === accountType}
                            >
                              <span>{accountType}</span>
                              {forgotForm.accountType === accountType && (
                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
                </button>

                {debugResetToken && (
                  <button
                    type="button"
                    onClick={() => switchMode(MODES.RESET, debugResetToken)}
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    Open Reset Form With Test Token
                  </button>
                )}
              </form>
            )}

            {mode === MODES.RESET && (
              <form className="mt-6 space-y-3.5" onSubmit={handleResetSubmit}>
                {!resetToken && (
                  <div className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                    Reset token is missing. Request a fresh reset link.
                  </div>
                )}

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">New Password</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      value={resetForm.password}
                      onChange={(event) => setResetForm((prev) => ({ ...prev, password: event.target.value }))}
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
                      aria-label={showResetPassword ? 'Hide password' : 'Show password'}
                    >
                      {showResetPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">Confirm Password</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showResetConfirmPassword ? 'text' : 'password'}
                      value={resetForm.confirmPassword}
                      onChange={(event) => setResetForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetConfirmPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
                      aria-label={showResetConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showResetConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">Password Strength: {resetStrength.label}</p>
                  <div className="mt-1 h-2 rounded-full bg-slate-200">
                    <span style={{ width: resetStrength.width }} className={`block h-full rounded-full ${resetStrength.color}`} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            <div className="mt-5 border-t border-slate-200 pt-3.5 text-xs text-slate-500 sm:mt-6 sm:pt-4">
              {mode === MODES.SIGN_IN && (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode(MODES.SIGN_UP)}
                    className="font-semibold text-emerald-700 hover:text-emerald-600"
                  >
                    Sign up
                  </button>
                </>
              )}
              {mode === MODES.SIGN_UP && (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode(MODES.SIGN_IN)}
                    className="font-semibold text-emerald-700 hover:text-emerald-600"
                  >
                    Sign in
                  </button>
                </>
              )}
              {(mode === MODES.FORGOT || mode === MODES.RESET) && (
                <button
                  type="button"
                  onClick={() => switchMode(MODES.SIGN_IN)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to sign in
                </button>
              )}
            </div>

          </main>
        </div>
      </div>
    </section>
  );
};

export default Login;
