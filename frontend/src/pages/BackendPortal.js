import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Gauge,
  HelpCircle,
  LayoutDashboard,
  ListTodo,
  LoaderCircle,
  LogOut,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  Upload,
  UserRound,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl, getApiBaseUrl } from '../lib/api';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ListTodo, label: 'Tasks' },
  { icon: CalendarDays, label: 'Calendar' },
  { icon: Gauge, label: 'Analytics' },
  { icon: Users, label: 'Team' },
];

const generalItems = [
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help' },
];

const teamMembers = [
  { name: 'Alexandra Deff', work: 'Github Project Repository', status: 'Completed' },
  { name: 'Edwin Adenike', work: 'User Authentication System', status: 'In Progress' },
  { name: 'Isaac Oluwatemilorun', work: 'Develop Search and Filter', status: 'Pending' },
  { name: 'David Oshodi', work: 'Responsive Dashboard Layout', status: 'In Progress' },
];

const projectTodos = [
  { title: 'Develop API Endpoints', due: 'Nov 26, 2024' },
  { title: 'Onboarding Flow', due: 'Nov 28, 2024' },
  { title: 'Build Dashboard Data', due: 'Nov 30, 2024' },
  { title: 'Optimize Page Load', due: 'Dec 05, 2024' },
  { title: 'Cross-Browser Testing', due: 'Dec 06, 2024' },
];

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const analyticsHeights = [54, 92, 65, 98, 58, 74, 67];
const IDLE_AUTO_LOGOUT_MINUTES = 30;
const IDLE_WARNING_WINDOW_SECONDS = 60;
const IDLE_AUTO_LOGOUT_MS = IDLE_AUTO_LOGOUT_MINUTES * 60 * 1000;
const IDLE_WARNING_TRIGGER_MS = Math.max(0, IDLE_AUTO_LOGOUT_MS - (IDLE_WARNING_WINDOW_SECONDS * 1000));
const IDLE_WARNING_TOTAL_SECONDS = Math.ceil((IDLE_AUTO_LOGOUT_MS - IDLE_WARNING_TRIGGER_MS) / 1000);

function formatClock(totalSeconds) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function formatIdleCountdown(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, '0');
  const seconds = String(safeSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function isSessionExpired(expiresAt) {
  const parsedMs = Date.parse(String(expiresAt || ''));
  if (!Number.isFinite(parsedMs)) return false;
  return Date.now() >= parsedMs;
}

const BackendPortal = ({ authSession, onLogout }) => {
  const navigate = useNavigate();
  const resolvedApiBaseUrl = authSession?.apiBaseUrl || getApiBaseUrl();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(5048);
  const [showIdleWarning, setShowIdleWarning] = useState(false);
  const [idleCountdownSeconds, setIdleCountdownSeconds] = useState(IDLE_WARNING_TOTAL_SECONDS);
  const lastActivityAtRef = useRef(Date.now());
  const hasAutoLoggedOutRef = useRef(false);

  const fetchDashboard = useCallback(
    async (refresh = false) => {
      if (!authSession?.token) {
        onLogout();
        navigate('/login', { replace: true });
        return;
      }

      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setErrorMessage('');

      try {
        const response = await fetch(buildApiUrl('/api/admin/dashboard', resolvedApiBaseUrl), {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authSession.token}`,
          },
        });

        let data = {};
        try {
          data = await response.json();
        } catch (error) {
          data = {};
        }

        if (response.status === 401) {
          if (isSessionExpired(authSession?.expiresAt)) {
            onLogout();
            navigate('/login', { replace: true, state: { sessionExpired: true, reason: 'token-expired' } });
            return;
          }

          setErrorMessage(data.detail || 'Session validation failed. You are still signed in. Please refresh.');
          return;
        }

        if (!response.ok) {
          setErrorMessage(data.detail || 'Backend request failed.');
          return;
        }

        setDashboardData(data);
      } catch (error) {
        setErrorMessage('Unable to load backend data from the server.');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [authSession, navigate, onLogout, resolvedApiBaseUrl]
  );

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (!authSession?.token) return undefined;

    let idleTickerId;
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'pointerdown', 'wheel'];

    const markActivity = () => {
      lastActivityAtRef.current = Date.now();
      setShowIdleWarning(false);
      setIdleCountdownSeconds(IDLE_WARNING_TOTAL_SECONDS);
    };

    const handleAutoLogout = () => {
      if (hasAutoLoggedOutRef.current) return;
      hasAutoLoggedOutRef.current = true;
      setShowIdleWarning(false);
      onLogout();
      navigate('/login', {
        replace: true,
        state: { sessionExpired: true, reason: 'idle-timeout', idleTimeoutMinutes: IDLE_AUTO_LOGOUT_MINUTES },
      });
    };

    const evaluateIdleState = () => {
      const idleElapsedMs = Date.now() - lastActivityAtRef.current;

      if (idleElapsedMs >= IDLE_AUTO_LOGOUT_MS) {
        handleAutoLogout();
        return;
      }

      if (idleElapsedMs >= IDLE_WARNING_TRIGGER_MS) {
        const remainingSeconds = Math.max(
          0,
          Math.ceil((IDLE_AUTO_LOGOUT_MS - idleElapsedMs) / 1000)
        );
        setShowIdleWarning(true);
        setIdleCountdownSeconds(remainingSeconds);
        return;
      }

      setShowIdleWarning(false);
      setIdleCountdownSeconds(IDLE_WARNING_TOTAL_SECONDS);
    };

    hasAutoLoggedOutRef.current = false;
    markActivity();
    evaluateIdleState();
    idleTickerId = window.setInterval(evaluateIdleState, 250);

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, markActivity, { passive: true });
    });
    window.addEventListener('scroll', markActivity, { passive: true, capture: true });

    return () => {
      window.clearInterval(idleTickerId);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, markActivity);
      });
      window.removeEventListener('scroll', markActivity, true);
    };
  }, [authSession?.token, navigate, onLogout]);

  const handleLogout = () => {
    onLogout();
    navigate('/login', { replace: true });
  };

  const handleStayLoggedIn = () => {
    lastActivityAtRef.current = Date.now();
    setShowIdleWarning(false);
    setIdleCountdownSeconds(IDLE_WARNING_TOTAL_SECONDS);
  };

  const statusCheckCount = Number(dashboardData?.status_check_count || 0);
  const totalProjects = 24 + statusCheckCount;
  const endedProjects = 10 + Math.min(statusCheckCount, 4);
  const runningProjects = 12 + Math.max(0, statusCheckCount - 1);
  const pendingProjects = Math.max(2, 7 - statusCheckCount);
  const progressPercent = Math.min(88, Math.max(41, 41 + statusCheckCount));
  const progressBackground = `conic-gradient(#157f52 ${progressPercent * 3.6}deg, #d8e3dd ${progressPercent * 3.6}deg 360deg)`;
  const clockDisplay = useMemo(() => formatClock(timerSeconds), [timerSeconds]);
  const warningProgressPercent = Math.max(0, Math.min(100, (idleCountdownSeconds / IDLE_WARNING_TOTAL_SECONDS) * 100));

  const statusBadgeClass = (status) => {
    if (status === 'Completed') {
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    }
    if (status === 'In Progress') {
      return 'border-amber-200 bg-amber-50 text-amber-700';
    }
    return 'border-slate-200 bg-slate-100 text-slate-600';
  };

  return (
    <section className="h-screen w-full overflow-hidden px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
      <div className="h-full w-full rounded-[1.4rem] border border-slate-200/90 bg-[#eef0ef] p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)] sm:p-4 lg:p-5">
        <div className="grid h-full items-start gap-4 xl:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="flex h-full flex-col rounded-[1.25rem] border border-slate-200/80 bg-white p-3 xl:sticky xl:top-0">
            <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-400 text-xs font-black text-white">
                UG
              </div>
              <div>
                <p className="text-base font-black text-slate-900">Donezo</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Workspace</p>
              </div>
            </div>

            <div className="pt-3">
              <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Menu</p>
              <div className="mt-1.5 space-y-0.5">
                {menuItems.map(({ icon: Icon, label, active }) => (
                  <button
                    key={label}
                    type="button"
                    className={`flex h-9 w-full items-center gap-2 rounded-lg px-2 text-[13px] font-semibold transition ${
                      active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-[15px] w-[15px]" />
                    <span>{label}</span>
                    {label === 'Tasks' && (
                      <span className="ml-auto rounded-md bg-emerald-700 px-1.5 py-[1px] text-[10px] font-bold text-white">12</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3.5">
              <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">General</p>
              <div className="mt-1.5 space-y-0.5">
                {generalItems.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex h-9 w-full items-center gap-2 rounded-lg px-2 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Icon className="h-[15px] w-[15px]" />
                    <span>{label}</span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-9 w-full items-center gap-2 rounded-lg px-2 text-[13px] font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  <LogOut className="h-[15px] w-[15px]" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-emerald-900/50 bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.45),transparent_50%),linear-gradient(130deg,#0a241a,#0d3526,#144a34)] p-2.5 text-white">
              <p className="text-[15px] font-semibold leading-tight">Download our Mobile App</p>
              <p className="mt-1 text-[12px] leading-snug text-emerald-100/90">Track daily workflows from anywhere.</p>
              <button
                type="button"
                className="mt-2 inline-flex h-8 items-center gap-2 rounded-lg bg-emerald-500 px-3 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          </aside>

          <main className="dashboard-scrollbar h-full overflow-y-auto rounded-[1.25rem] border border-slate-200/80 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-[430px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search task"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
                {showIdleWarning && (
                  <div className="order-first flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-slate-700 shadow-sm sm:w-auto sm:max-w-[25rem]">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                      <Clock3 className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Inactive Session
                      </p>
                      <p className="truncate text-xs font-semibold text-slate-800">
                        Auto logout in {formatIdleCountdown(idleCountdownSeconds)}
                      </p>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-200">
                        <span
                          className="block h-full rounded-full bg-emerald-600 transition-[width] duration-200"
                          style={{ width: `${warningProgressPercent}%` }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleStayLoggedIn}
                      className="inline-flex h-8 shrink-0 items-center rounded-lg border border-slate-300 bg-slate-50 px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-700 transition hover:bg-slate-100"
                    >
                      Stay
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900">
                      {authSession?.user?.username || 'Team User'}
                    </p>
                    <p className="truncate text-[11px] text-slate-500">
                      {authSession?.user?.username || 'team'}@urbangold.local
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-[2rem] font-black tracking-tight text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500">Plan, prioritize, and accomplish your tasks with ease.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-600"
                >
                  <Plus className="h-4 w-4" />
                  Add Project
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-emerald-700/40 bg-white px-4 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  <Upload className="h-4 w-4" />
                  Import Data
                </button>
                <button
                  type="button"
                  onClick={() => fetchDashboard(true)}
                  disabled={isRefreshing || isLoading}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isRefreshing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
                  Refresh
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {errorMessage}
              </div>
            )}

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border border-emerald-700/20 bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-500 p-4 text-white">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold">Total Projects</p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 text-4xl font-black leading-none">{isLoading ? '...' : totalProjects}</p>
                <p className="mt-2 text-xs text-emerald-100">Increased from last month</p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold text-slate-700">Ended Projects</p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-500">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 text-4xl font-black leading-none text-slate-900">{isLoading ? '...' : endedProjects}</p>
                <p className="mt-2 text-xs text-slate-500">Increased from last month</p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold text-slate-700">Running Projects</p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-500">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 text-4xl font-black leading-none text-slate-900">{isLoading ? '...' : runningProjects}</p>
                <p className="mt-2 text-xs text-slate-500">Currently active this cycle</p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold text-slate-700">Pending Project</p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-500">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 text-4xl font-black leading-none text-slate-900">{isLoading ? '...' : pendingProjects}</p>
                <p className="mt-2 text-xs text-slate-500">On discuss</p>
              </article>
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[1.5fr_1fr_1fr]">
              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <h2 className="text-sm font-bold text-slate-900">Project Analytics</h2>
                <div className="mt-4 flex h-32 items-end gap-2">
                  {analyticsHeights.map((height, idx) => (
                    <div key={`${dayLabels[idx]}-${height}`} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className={`w-full rounded-full ${
                          idx === 0 || idx === 4 || idx === 6
                            ? 'border border-slate-300 bg-[repeating-linear-gradient(135deg,#bcc3c0,#bcc3c0_2px,transparent_2px,transparent_5px)]'
                            : (idx === 1 || idx === 3) ? 'bg-emerald-700' : 'bg-emerald-400'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[11px] font-semibold text-slate-400">{dayLabels[idx]}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <h2 className="text-sm font-bold text-slate-900">Reminders</h2>
                <p className="mt-3 text-2xl font-black leading-tight text-slate-900">Meeting with Arc Company</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Time: 02:00 pm - 04:00 pm</p>
                <button
                  type="button"
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-600"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Start Meeting
                </button>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">Project</h2>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">+ New</span>
                </div>
                <div className="mt-3 space-y-2.5">
                  {projectTodos.map((todo) => (
                    <div key={todo.title} className="flex gap-2.5 rounded-xl border border-slate-200 px-2.5 py-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{todo.title}</p>
                        <p className="text-[11px] text-slate-500">Due date: {todo.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[1.5fr_1fr_1fr]">
              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">Team Collaboration</h2>
                  <button
                    type="button"
                    className="inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-300 px-3 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Member
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-2.5 py-2">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-rose-200 text-xs font-black text-slate-700">
                        {member.name.split(' ').map((item) => item[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">{member.name}</p>
                        <p className="truncate text-[11px] text-slate-500">Working on {member.work}</p>
                      </div>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusBadgeClass(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4">
                <h2 className="text-sm font-bold text-slate-900">Project Progress</h2>
                <div className="mt-4 flex flex-col items-center">
                  <div className="h-44 w-44 rounded-full p-3" style={{ background: progressBackground }}>
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">
                      <p className="text-5xl font-black leading-none text-slate-900">{progressPercent}%</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Project Ended</p>
                    </div>
                  </div>
                  <div className="mt-4 flex w-full items-center justify-center gap-3 text-[11px] font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-700" />Completed</span>
                    <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" />In Progress</span>
                    <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-300" />Pending</span>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-emerald-900/50 bg-[radial-gradient(circle_at_78%_18%,rgba(30,173,96,0.45),transparent_52%),linear-gradient(130deg,#061b12,#0c2a1f,#124635)] p-4 text-white">
                <p className="text-lg font-semibold">Time Tracker</p>
                <p className="mt-3 text-5xl font-black tracking-tight">{clockDisplay}</p>
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/90 hover:bg-red-400"
                  >
                    <Clock3 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-4 text-xs text-emerald-100">Last sync: {dashboardData?.generated_at ? new Date(dashboardData.generated_at).toLocaleTimeString() : '...'} via {resolvedApiBaseUrl || 'backend'}</p>
              </article>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default BackendPortal;
