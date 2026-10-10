import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ClipboardCheck,
  FlaskConical,
  HandCoins,
  Home,
  Info,
  Linkedin,
  Mail,
  MapPin,
  Route,
  Send,
  Twitter,
  Zap,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────────────── */
const companyLinks = [
  { name: 'Home',        path: '/',            icon: Home },
  { name: 'About Us',    path: '/about',        icon: Info },
  { name: 'Opportunity', path: '/opportunity',  icon: BriefcaseBusiness },
  { name: 'Technology',  path: '/technology',   icon: FlaskConical },
  { name: 'Roadmap',     path: '/roadmap',      icon: Route },
];

const resourceLinks = [
  { name: 'Governance',  path: '/governance',   icon: ClipboardCheck },
  { name: 'Investors',   path: '/investors',    icon: HandCoins },
  { name: 'Contact',     path: '/contact',      icon: Mail },
];
const FOOTER_CURSOR_CLASS = 'ug-cursor-on-footer';

/* ─── Sub-components ────────────────────────────────────────────────────── */

/** emerald-highlighted section heading */
const FooterHeading = ({ children }) => (
  <div className="mb-5">
    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
      {children}
    </h3>
    <div className="mt-1.5 h-0.5 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" />
  </div>
);

/** Single footer nav link with icon */
const FooterLink = ({ to, icon: Icon, children }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center gap-3.5 py-1 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200"
    >
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-800 group-hover:bg-emerald-500/15 group-hover:text-emerald-400 transition-colors duration-200">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
        {children}
      </span>
    </Link>
  </li>
);

/* ─── Newsletter ─────────────────────────────────────────────────────────── */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/55 via-slate-900/90 to-teal-950/35 p-5 sm:p-6 md:p-8 mb-8 sm:mb-12 lg:mb-14">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-emerald-500/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-teal-500/12 blur-2xl" />

      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 mb-3">
            <Zap className="h-3 w-3 text-emerald-400" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
              Newsletter
            </span>
          </div>
          <h3 className="text-xl font-black text-white leading-tight">
            Stay ahead of the <span className="text-emerald-400">recovery curve</span>
          </h3>
          <p className="mt-1.5 text-sm text-slate-400 leading-relaxed max-w-md">
            Insights on urban mining, circular economy trends, and Urban Gold milestones — straight to your inbox.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-row items-center gap-2.5 sm:gap-3 w-full md:w-auto md:min-w-[360px]">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder="your@email.com"
              className={`w-full h-11 pl-10 pr-4 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200 ${
                status === 'error'
                  ? 'border-red-500/60 focus:ring-red-500/40'
                  : 'border-slate-700 hover:border-slate-600 focus:border-emerald-500/70'
              }`}
            />
          </div>
          <button
            type="submit"
            className="h-11 px-3.5 sm:px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 inline-flex items-center justify-center gap-2 shrink-0"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Subscribe</span>
          </button>
        </form>
      </div>

      {/* Status messages */}
      {status === 'success' && (
        <p className="relative mt-3 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          You're subscribed! Welcome aboard.
        </p>
      )}
      {status === 'error' && (
        <p className="relative mt-3 text-xs text-red-400 font-medium flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
};

/* ─── Footer ─────────────────────────────────────────────────────────────── */
const Footer = () => {
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove(FOOTER_CURSOR_CLASS);
      }
    };
  }, []);

  const handleFooterPointerEnter = () => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;
    document.documentElement.classList.add(FOOTER_CURSOR_CLASS);
  };

  const handleFooterPointerLeave = () => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.remove(FOOTER_CURSOR_CLASS);
  };

  return (
    <footer
      className="ug-footer-cursor-zone relative bg-[#03120f] dark:bg-[#020d0a] text-slate-300 border-t border-emerald-900/55 overflow-hidden"
      onPointerEnter={handleFooterPointerEnter}
      onPointerLeave={handleFooterPointerLeave}
      onPointerCancel={handleFooterPointerLeave}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-teal-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8">

        {/* Newsletter */}
        <Newsletter />

        {/* Main grid — 2 cols on mobile (brand/contact span full), 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-12">

          {/* ── Brand ── */}
          <div className="col-span-2 lg:col-span-1 space-y-4 sm:space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-lime-600 flex items-center justify-center font-black text-white text-xs shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-105">
                UG
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#03120f]" />
              </div>
              <div>
                <p className="text-sm font-black tracking-[0.05em] uppercase text-white flex items-center gap-1.5">
                  Urban Gold
                  <span className="text-[8px] font-black tracking-[0.16em] text-emerald-400 border border-emerald-400/50 rounded px-1 py-px leading-none">
                    INDIA
                  </span>
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mt-0.5">
                  Industrial Recovery
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              Precision urban mining & circular precious metal systems — building India's responsible recovery future.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="group h-9 w-9 rounded-xl bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 hover:bg-emerald-500/10 flex items-center justify-center transition-all duration-200"
              >
                <Linkedin className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="group h-9 w-9 rounded-xl bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 hover:bg-emerald-500/10 flex items-center justify-center transition-all duration-200"
              >
                <Twitter className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* ── Company ── */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-3">
              {companyLinks.map(({ name, path, icon }) => (
                <FooterLink key={path} to={path} icon={icon}>{name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <FooterHeading>Resources</FooterHeading>
            <ul className="space-y-3">
              {resourceLinks.map(({ name, path, icon }) => (
                <FooterLink key={path} to={path} icon={icon}>{name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="col-span-2 lg:col-span-1">
            <FooterHeading>Get in Touch</FooterHeading>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:urbangoldindia@gmail.com"
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="break-all leading-snug">urbangoldindia@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-snug">Kolkata, West Bengal, India</span>
                </div>
              </li>
              <li className="pt-1">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/60 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-lg px-3.5 py-2 transition-all duration-200"
                >
                  Send a message
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-emerald-900/45">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Urban Gold India. All rights reserved.
            </p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/70 bg-emerald-950/30 px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wide">
                Technical Design & Regulatory Preparation
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

