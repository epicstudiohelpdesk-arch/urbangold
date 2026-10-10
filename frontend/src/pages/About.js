import React, { useEffect, useRef } from 'react';
import { Lightbulb, Target, Users, Rocket, Check, ClipboardCheck, Plus, User } from 'lucide-react';
import { Card } from '../components/ui/card';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const TiltSurface = ({ children, className = '', maxTilt = 8, hoverScale = 1.012 }) => {
  const surfaceRef = useRef(null);
  const frameRef = useRef(null);
  const currentRef = useRef({ x: 0, y: 0, scale: 1 });
  const targetRef = useRef({ x: 0, y: 0, scale: 1 });
  const enabledRef = useRef(false);

  const applyTransform = () => {
    const node = surfaceRef.current;
    if (!node) return;

    node.style.setProperty('--about-tilt-x', `${currentRef.current.x.toFixed(3)}deg`);
    node.style.setProperty('--about-tilt-y', `${currentRef.current.y.toFixed(3)}deg`);
    node.style.setProperty('--about-tilt-scale', currentRef.current.scale.toFixed(4));
  };

  const startAnimation = () => {
    if (frameRef.current !== null) return;

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;
      current.scale += (target.scale - current.scale) * 0.12;
      applyTransform();

      const settled =
        Math.abs(target.x - current.x) < 0.02 &&
        Math.abs(target.y - current.y) < 0.02 &&
        Math.abs(target.scale - current.scale) < 0.001;

      if (settled) {
        frameRef.current = null;
        return;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const updateAvailability = () => {
      enabledRef.current = !motionQuery.matches && pointerQuery.matches;

      if (enabledRef.current) return;
      targetRef.current = { x: 0, y: 0, scale: 1 };
      currentRef.current = { x: 0, y: 0, scale: 1 };
      applyTransform();
    };

    updateAvailability();

    const bindQueryListener = (query, listener) => {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', listener);
        return () => query.removeEventListener('change', listener);
      }

      query.addListener(listener);
      return () => query.removeListener(listener);
    };

    const cleanupMotion = bindQueryListener(motionQuery, updateAvailability);
    const cleanupPointer = bindQueryListener(pointerQuery, updateAvailability);

    return () => {
      cleanupMotion();
      cleanupPointer();
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  const handlePointerEnter = () => {
    if (!enabledRef.current) return;
    targetRef.current.scale = hoverScale;
    startAnimation();
  };

  const handlePointerMove = (event) => {
    if (!enabledRef.current || !surfaceRef.current) return;

    const rect = surfaceRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const normalizedX = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    const normalizedY = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);

    targetRef.current.x = -normalizedY * maxTilt;
    targetRef.current.y = normalizedX * maxTilt;
    targetRef.current.scale = hoverScale;
    startAnimation();
  };

  const handlePointerLeave = () => {
    targetRef.current = { x: 0, y: 0, scale: 1 };
    startAnimation();
  };

  return (
    <div
      ref={surfaceRef}
      className={`about-tilt-surface ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
    >
      {children}
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen pt-4">
      {/* Hero */}
      <section className="relative -mt-6 lg:-mt-8 overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-28 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:bg-gray-950 dark:bg-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(191,242,2,0.22),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(1,49,45,0.2),transparent_40%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(191,242,2,0.22),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(1,49,45,0.2),transparent_40%)]"></div>
        <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-200/45 blur-3xl sm:hidden"></div>
        <div className="absolute right-0 top-14 h-32 w-32 rounded-full border border-slate-300/40 bg-white/40 backdrop-blur-md sm:hidden"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center rounded-full border border-slate-300/65 dark:border-emerald-400/35 bg-white/75 dark:bg-white/10 px-3 py-1.5 mb-4 sm:mb-5">
                <p className="text-[11px] sm:text-sm uppercase tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">
                  About Urban Gold India
                </p>
              </div>
              <h1 className="text-[2.05rem] sm:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.08] tracking-tight max-w-4xl">
                Building Circular Metal Infrastructure
                <span className="block text-emerald-600 dark:text-emerald-300 mt-2 sm:mt-3">With Engineering Discipline</span>
              </h1>
              <p className="mt-4 sm:mt-7 text-sm sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                We are designing a compliant, high-efficiency precious metal recovery platform for India&apos;s
                urban resource economy, focused on long-life systems instead of short-cycle outcomes.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-white/5 backdrop-blur px-4 py-5 sm:px-5 sm:py-6">
                <div className="absolute -right-12 -top-14 h-28 w-28 rounded-full bg-emerald-300/35 blur-2xl"></div>
                <p className="relative text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-300 mb-3 sm:mb-4">
                  Operating Doctrine
                </p>
                <div className="relative space-y-3 sm:space-y-4">
                  {[
                    { title: 'Engineering First', desc: 'Process architecture before scale.' },
                    { title: 'Compliance by Design', desc: 'Regulatory readiness from day one.' },
                    { title: 'Decades, Not Quarters', desc: 'Industrial continuity as core objective.' }
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/85 dark:bg-black/20 px-3 py-3 sm:px-4"
                    >
                      <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
            {[
              { label: 'Focus', value: 'Urban Precious Metal Recovery' },
              { label: 'Model', value: 'Research-Led Industrial Design' },
              { label: 'Intent', value: 'Responsible Circular Infrastructure' }
            ].map((item, idx) => (
              <div
                key={item.label}
                className={`rounded-xl border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-white/5 backdrop-blur px-3 sm:px-4 py-3 sm:py-4 ${idx === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="text-xs sm:text-base font-semibold text-gray-900 dark:text-white mt-1 leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative py-12 sm:py-16 lg:py-32 bg-[radial-gradient(circle_at_10%_8%,_#EAFDE7_0%,_#ffffff_42%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_10%_8%,_rgba(114,191,0,0.14)_0%,_#0c0d11_42%,_#040407_100%)] overflow-hidden">
        <div className="absolute inset-0 opacity-35 dark:opacity-18 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-emerald-300/24 dark:bg-emerald-700/14 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-10 items-stretch">
            <div className="lg:col-span-7">
              <div className="relative h-full rounded-3xl border border-slate-200/85 dark:border-emerald-800/45 bg-white/82 dark:bg-gray-900/78 backdrop-blur p-6 sm:p-8 lg:p-10 shadow-[0_24px_56px_rgba(15,23,42,0.10)] dark:shadow-[0_24px_56px_rgba(0,0,0,0.45)] overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-400" />
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/35 dark:bg-emerald-700/20 blur-3xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/85 dark:border-emerald-700/45 bg-slate-50/90 dark:bg-slate-500/10 px-3 py-1.5">
                    <Lightbulb className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                      Our Vision
                    </span>
                  </div>

                  <h2 className="mt-4 text-[2rem] sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.04] tracking-tight">
                    From E-Waste Streams to
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400 mt-1.5">
                      Certified Metal Infrastructure
                    </span>
                  </h2>

                  <p className="mt-5 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                    Build India&apos;s most disciplined urban mining platform where process engineering, compliance depth, and recovery quality scale together.
                  </p>
                  <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                    We aim to shift discarded electronics from waste perception to strategic above-ground resource reserves with industrial-grade output confidence.
                  </p>

                  <div className="mt-6 grid sm:grid-cols-3 gap-3">
                    {[
                      { title: 'Precision Stack', text: 'End-to-end process control from feedstock intake to output verification.' },
                      { title: 'Compliance Core', text: 'Regulatory and environmental safeguards embedded in architecture.' },
                      { title: 'National Relevance', text: 'Scalable model for India&apos;s circular metal economy transition.' }
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border border-slate-200/80 dark:border-emerald-800/45 bg-white/82 dark:bg-emerald-950/10 p-3.5 sm:p-4"
                      >
                        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold text-emerald-700 dark:text-emerald-300">
                          {item.title}
                        </p>
                        <p className="mt-2 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-3 bg-gradient-to-b from-emerald-200/35 to-teal-200/20 dark:from-emerald-700/15 dark:to-teal-700/10 blur-2xl rounded-3xl" />

              <TiltSurface
                className="relative h-full min-h-[360px] sm:min-h-[500px] rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 shadow-2xl"
                maxTilt={8.5}
                hoverScale={1.014}
              >
                <img
                  src="https://images.unsplash.com/photo-1717667745934-53091623e8ee?w=900&h=1200&fit=crop"
                  alt="Electronic components close-up"
                  className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/22 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(191,242,2,0.35),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(1,49,45,0.22),transparent_34%)]" />

                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                  <div className="rounded-xl border border-white/25 bg-black/35 backdrop-blur-md px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-200">Vision Horizon</p>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-white">Industrial Recovery Leadership</p>
                  </div>
                  <div className="rounded-xl border border-white/25 bg-black/35 backdrop-blur-md px-3 py-2 text-right">
                    <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-200">2030 Lens</p>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-white">Circular Metal Network</p>
                  </div>
                </div>

                <div className="absolute left-4 right-4 bottom-4">
                  <div className="rounded-2xl border border-white/25 bg-black/40 backdrop-blur-md p-4 sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-300">Vision Principle</p>
                    <p className="mt-2 text-sm sm:text-base text-white leading-relaxed">
                      Engineer deeply. Govern tightly. Scale deliberately.
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { label: 'Engineering', value: 'First' },
                        { label: 'Compliance', value: 'Built-In' },
                        { label: 'Scale', value: 'Phased' }
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-lg border border-white/20 bg-white/10 px-2 py-2 text-center"
                        >
                          <p className="text-[9px] uppercase tracking-[0.14em] text-emerald-200">{item.label}</p>
                          <p className="mt-1 text-[11px] sm:text-xs font-semibold text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltSurface>
            </div>
          </div>
        </div>
      </section>

      {/* Development Philosophy */}
      <section className="relative py-12 sm:py-16 lg:py-32 bg-[radial-gradient(circle_at_14%_12%,_#EAFDE7_0%,_#ffffff_48%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_12%_10%,_rgba(114,191,0,0.14)_0%,_#0d0d10_46%,_#060608_100%)] overflow-hidden">
        <div className="absolute inset-0 opacity-35 dark:opacity-18 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-300/24 dark:bg-emerald-700/14 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-10 items-stretch">
            <div className="lg:col-span-5">
              <TiltSurface
                className="relative h-full min-h-[330px] sm:min-h-[420px] rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 shadow-[0_24px_60px_-34px_rgba(1,49,45,0.48)]"
                maxTilt={8.5}
                hoverScale={1.014}
              >
                <img
                  src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=900&h=1200&fit=crop"
                  alt="Industrial machinery and process systems"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/24 to-transparent" />

                <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/35 bg-black/35 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-200">
                  Execution Blueprint
                </div>

                <div className="absolute inset-x-4 bottom-4">
                  <div className="rounded-2xl border border-white/25 bg-black/40 backdrop-blur-md p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-emerald-300">Operating Rule</p>
                    <p className="mt-1.5 text-sm sm:text-base text-white leading-relaxed">
                      Validate engineering and compliance depth before scale velocity.
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.14em] font-semibold">
                      {['Design', 'Control', 'Scale'].map((pill) => (
                        <span
                          key={pill}
                          className="rounded-lg border border-white/25 bg-white/10 px-2 py-1 text-center text-emerald-100"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltSurface>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-slate-200/85 dark:border-emerald-800/40 bg-white/82 dark:bg-gray-900/78 backdrop-blur p-6 sm:p-8 lg:p-10 shadow-[0_24px_56px_rgba(15,23,42,0.10)] dark:shadow-[0_24px_56px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-400"></div>

                <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/85 dark:border-emerald-700/50 bg-slate-50/90 dark:bg-slate-500/10 px-3 py-1.5">
                  <Target className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                    Development Philosophy
                  </span>
                </div>

                <h2 className="mt-4 text-[2rem] sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.06] tracking-tight">
                  How We Build Before We Scale
                </h2>
                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                  Every stage is ordered to protect process integrity: engineering baseline first, compliance discipline second, and expansion only after both are stable.
                </p>

                <div className="relative mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                  <div className="absolute left-[15px] sm:left-[17px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-400 via-teal-400 to-transparent" />

                  {[
                    {
                      step: '01',
                      title: 'Engineering First',
                      desc: 'Systems are designed for recovery yield, throughput stability, and operational reliability before expansion decisions.',
                      pulse: 'Yield and reliability baseline',
                      tone: 'from-white to-slate-50/55 dark:from-gray-900 dark:to-emerald-950/15'
                    },
                    {
                      step: '02',
                      title: 'Compliance First',
                      desc: 'Environmental controls, documentation rigor, and regulatory readiness are built into the core architecture.',
                      pulse: 'Audit-ready by design',
                      tone: 'from-white to-slate-50/50 dark:from-gray-900 dark:to-teal-950/15'
                    },
                    {
                      step: '03',
                      title: 'Scale Second',
                      desc: 'Pilot validation gates expansion. Scale follows only when process consistency and governance thresholds are proven.',
                      pulse: 'Controlled, phased expansion',
                      tone: 'from-white to-slate-50/50 dark:from-gray-900 dark:to-lime-950/15'
                    }
                  ].map((item) => (
                    <article key={item.title} className="relative pl-10 sm:pl-12">
                      <span className="absolute left-0 top-1.5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-slate-200/90 dark:border-emerald-700/55 bg-white dark:bg-gray-900 text-[11px] font-black tracking-[0.08em] text-emerald-700 dark:text-emerald-300 shadow-[0_10px_20px_rgba(15,23,42,0.10)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
                        {item.step}
                      </span>

                      <div className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-emerald-800/45 bg-gradient-to-br ${item.tone} p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(15,23,42,0.14)] dark:hover:shadow-[0_18px_38px_rgba(0,0,0,0.42)]`}>
                        <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-200/35 dark:bg-emerald-700/20 blur-2xl" />

                        <div className="relative">
                          <h3 className="text-base sm:text-xl font-black text-gray-900 dark:text-white leading-snug">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.desc}
                          </p>
                          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-emerald-700/45 bg-white/82 dark:bg-emerald-950/25 px-2.5 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold text-emerald-700 dark:text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                            {item.pulse}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-12 sm:py-16 lg:py-32 bg-[radial-gradient(circle_at_8%_12%,_#EAFDE7_0%,_#ffffff_46%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_8%_10%,_rgba(114,191,0,0.13)_0%,_#0c0d11_44%,_#050507_100%)] overflow-hidden">
        <div className="absolute inset-0 opacity-35 dark:opacity-18 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute -top-20 -right-24 h-80 w-80 rounded-full bg-emerald-300/25 dark:bg-emerald-700/14 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-teal-300/18 dark:bg-teal-700/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-end mb-6 sm:mb-8 lg:mb-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/85 dark:border-emerald-700/50 bg-slate-50/90 dark:bg-slate-500/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Values Architecture
                </span>
              </div>
              <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.04] tracking-tight">
                Core Values
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                These principles guide every technical and strategic decision, from process design to long-horizon industrial execution.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-2.5 sm:gap-3">
              {[
                { label: 'Value Pillars', value: '06' },
                { label: 'Non-Negotiable', value: 'Process Integrity' }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200/80 dark:border-emerald-800/45 bg-white/82 dark:bg-gray-900/74 backdrop-blur px-3 py-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">{item.label}</p>
                  <p className="mt-1 text-xs sm:text-sm font-black text-gray-900 dark:text-white leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                title: 'Technical Precision',
                description: 'Every process is engineered with measurable control variables and repeatable performance targets.',
                anchor: 'Process Rigor'
              },
              {
                title: 'Environmental Responsibility',
                description: 'Closed-loop handling and controlled neutralization are built into system design from day one.',
                anchor: 'Impact Discipline'
              },
              {
                title: 'Regulatory Integrity',
                description: 'Compliance pathways are treated as core architecture, not as post-launch patchwork.',
                anchor: 'Compliance by Design'
              },
              {
                title: 'Transparent Communication',
                description: 'We communicate technical realities clearly, including constraints, assumptions, and stage readiness.',
                anchor: 'Clear Disclosure'
              },
              {
                title: 'Long-Term Thinking',
                description: 'Infrastructure decisions are optimized for decades of operational continuity, not quarter-cycle optics.',
                anchor: 'Decades Over Quarters'
              },
              {
                title: 'Research-Driven',
                description: 'Key decisions are evidence-led, grounded in source analysis, validation, and iterative review.',
                anchor: 'Evidence First'
              }
            ].map((value, idx) => (
              <Card
                key={value.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-emerald-800/45 bg-gradient-to-br from-white via-white to-slate-50/45 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950/12 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-[0_24px_46px_rgba(15,23,42,0.14)] dark:hover:shadow-[0_24px_46px_rgba(0,0,0,0.45)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-400" />
                <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-emerald-200/35 dark:bg-emerald-700/20 blur-2xl" />

                <div className="relative">
                  <span className="inline-flex h-8 px-2.5 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-slate-500 dark:text-gray-950 text-[10px] font-black tracking-[0.16em] uppercase">
                    {`0${idx + 1}`}
                  </span>
                  <h3 className="mt-4 text-lg sm:text-xl font-black text-gray-900 dark:text-white leading-snug">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-emerald-700/45 bg-white/85 dark:bg-emerald-950/25 px-2.5 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold text-emerald-700 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    {value.anchor}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Perspective */}
      <section className="relative py-12 sm:py-16 lg:py-32 bg-[radial-gradient(circle_at_10%_10%,_#EAFDE7_0%,_#ffffff_46%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_12%_8%,_rgba(114,191,0,0.14)_0%,_#0b0c10_44%,_#030406_100%)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-16 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-emerald-300/25 dark:bg-emerald-700/14 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-10 items-stretch">
            <div className="lg:col-span-5">
              <div className="relative h-full min-h-[540px] sm:min-h-[640px] rounded-[1.6rem] sm:rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700/70 bg-white/70 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(2,6,23,0.92))] shadow-[0_28px_62px_rgba(15,23,42,0.16)] dark:shadow-[0_28px_62px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(191,242,2,0.26),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(1,49,45,0.2),transparent_40%)] dark:bg-[radial-gradient(circle_at_18%_12%,rgba(16,185,129,0.2),transparent_48%),radial-gradient(circle_at_86%_84%,rgba(20,184,166,0.14),transparent_42%)]" />
                <div className="absolute -top-20 -right-14 h-56 w-56 rounded-full bg-emerald-300/28 blur-3xl dark:bg-emerald-500/12" />
                <div className="absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-teal-300/24 blur-3xl dark:bg-teal-500/12" />

                <div className="relative h-full p-3.5 sm:p-8 flex flex-col items-center gap-3.5 sm:gap-6">
                  <article className="w-full max-w-[17.25rem] sm:max-w-full sm:w-[19.5rem] rounded-[1.6rem] sm:rounded-[2.2rem] border border-white/80 bg-[#eef2ea] p-2.5 sm:p-3 shadow-[0_28px_58px_rgba(15,23,42,0.22)] backdrop-blur-md dark:border-slate-600/60 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                    <div className="rounded-[1.25rem] sm:rounded-[1.85rem] border border-white/90 p-2 sm:p-2.5 dark:border-slate-600/60 dark:bg-slate-900/65">
                      <div className="overflow-hidden rounded-[1.05rem] sm:rounded-[1.45rem] border border-white/85 dark:border-slate-600/60">
                        <div className="h-52 sm:h-[16.75rem] w-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-800/95 dark:to-slate-950 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                            <User className="h-10 w-10" />
                            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold dark:text-emerald-200/85">Image Placeholder</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-1 pt-3 sm:px-1.5 sm:pt-4">
                        <div className="flex items-center gap-2">
                          <p className="text-[1.42rem] sm:text-[1.75rem] font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                            Subham Das
                          </p>
                          <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow-[0_6px_14px_rgba(22,101,52,0.35)] dark:bg-emerald-500 dark:shadow-[0_8px_16px_rgba(16,185,129,0.35)]">
                            <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[3]" />
                          </span>
                        </div>
                        <p className="mt-2.5 sm:mt-3 text-[0.98rem] sm:text-[1.08rem] leading-relaxed text-gray-800 dark:text-slate-300">
                          Product Designer who focuses on simplicity and usability.
                        </p>
                      </div>

                      <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 px-1 sm:px-1.5">
                        <div className="flex items-center gap-4 sm:gap-5 text-gray-800 dark:text-slate-200">
                          <span className="inline-flex items-center gap-1.5 text-base sm:text-[1.15rem] font-semibold leading-none">
                            <User className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-gray-500 dark:text-slate-400" />
                            312
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-base sm:text-[1.15rem] font-semibold leading-none">
                            <ClipboardCheck className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-gray-500 dark:text-slate-400" />
                            48
                          </span>
                        </div>
                        <button
                          type="button"
                          className="inline-flex whitespace-nowrap items-center gap-1 rounded-full border border-white/85 bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-semibold leading-none text-gray-900 shadow-[0_8px_20px_rgba(15,23,42,0.14)] transition-colors duration-200 hover:bg-gray-100 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
                        >
                          Follow
                          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>
                  </article>

                  <div className="mt-0.5 sm:mt-auto w-full rounded-2xl border border-white/70 dark:border-slate-700/70 bg-white/82 dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-950/90 backdrop-blur-md p-4 sm:p-6 shadow-[0_18px_42px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_42px_rgba(0,0,0,0.42)]">
                    <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                      Founder Lens
                    </p>
                    <h3 className="mt-1.5 sm:mt-2 text-lg sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                      Discipline Over Velocity
                    </h3>
                    <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      Build the recovery engine correctly first. Scale only after process and compliance foundations are proven.
                    </p>
                    <div className="mt-3.5 sm:mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
                      {[
                        { label: 'Engineering', value: 'Deep' },
                        { label: 'Controls', value: 'Tight' },
                        { label: 'Horizon', value: 'Long' }
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-lg border border-slate-200/80 dark:border-slate-600/60 bg-white/90 dark:bg-slate-800/70 px-1.5 sm:px-2 py-1.5 sm:py-2 text-center"
                        >
                          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-gray-700 dark:text-slate-300">{item.label}</p>
                          <p className="mt-1 text-[11px] sm:text-xs font-semibold text-gray-900 dark:text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-slate-200/85 dark:border-emerald-800/45 bg-white/82 dark:bg-gray-900/76 backdrop-blur p-6 sm:p-8 lg:p-10 shadow-[0_24px_56px_rgba(15,23,42,0.10)] dark:shadow-[0_24px_56px_rgba(0,0,0,0.45)] overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-400" />
                <div className="absolute -right-14 -top-16 h-40 w-40 rounded-full bg-emerald-200/35 dark:bg-emerald-700/20 blur-3xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/85 dark:border-emerald-700/45 bg-slate-50/90 dark:bg-slate-500/10 px-3 py-1.5">
                    <Users className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                      Founder Perspective
                    </span>
                  </div>

                  <h2 className="mt-4 text-[2rem] sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.04] tracking-tight">
                    Industrial Infrastructure,
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400 mt-1.5">
                      Not Short-Term Hype
                    </span>
                  </h2>

                  <div className="mt-5 space-y-4">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Urban Gold India was founded on the conviction that India&apos;s e-waste challenge is a structural industrial opportunity, not a social-enterprise narrative. It is fundamentally an engineering and capital deployment question.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      The thesis is rooted in research across urban mining methods, e-waste quantification, and circular value-chain design. This is not consumer-level recycling; it is precision recovery infrastructure built toward bullion-grade standards.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      We remain in technical design because execution quality matters more than speed. When operational, the system is intended to endure for decades, not quarters.
                    </p>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Thesis', value: 'Industrial Opportunity' },
                      { label: 'Method', value: 'Research + Engineering' },
                      { label: 'Horizon', value: 'Decades' }
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-slate-200/80 dark:border-emerald-800/45 bg-white/82 dark:bg-emerald-950/12 p-3.5"
                      >
                        <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-700 dark:text-emerald-300">
                          {item.label}
                        </p>
                        <p className="mt-1.5 text-sm sm:text-base font-black text-gray-900 dark:text-white leading-snug">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="relative py-12 sm:py-16 lg:py-28 bg-[radial-gradient(circle_at_14%_10%,_#EAFDE7_0%,_#ffffff_46%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_12%_8%,_rgba(16,185,129,0.14)_0%,_#0b1220_44%,_#020617_100%)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-18 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-300/24 dark:bg-emerald-700/14 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-teal-300/20 dark:bg-teal-700/12 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-end mb-6 sm:mb-8 lg:mb-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/85 dark:border-emerald-700/50 bg-slate-50/90 dark:bg-slate-500/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Team Members
                </span>
              </div>
              <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.04] tracking-tight">
                The People Building Urban Gold
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                Cross-functional execution team focused on engineering discipline, compliance rigor, and scalable operations.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-2.5 sm:gap-3">
              {[
                { label: 'Core Team', value: '04' },
                { label: 'Execution Mode', value: 'Research + Build' }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200/80 dark:border-emerald-800/45 bg-white/82 dark:bg-slate-900/76 backdrop-blur px-3 py-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">{item.label}</p>
                  <p className="mt-1 text-xs sm:text-sm font-black text-gray-900 dark:text-white leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                name: 'Subham Das',
                role: 'Founder and CEO',
                focus: 'Industrial strategy, capital discipline, and long-horizon execution.',
                unit: 'Leadership',
                tag: 'Core',
                icon: Rocket,
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&h=1100&fit=crop'
              },
              {
                name: 'Ananya Roy',
                role: 'Process Engineering Lead',
                focus: 'Recovery architecture, pilot workflows, and process optimization.',
                unit: 'Engineering',
                tag: 'Technical',
                icon: Target,
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1100&fit=crop'
              },
              {
                name: 'Ritwik Sen',
                role: 'Compliance and EHS Lead',
                focus: 'Regulatory readiness, environmental safeguards, and audit systems.',
                unit: 'Compliance',
                tag: 'Governance',
                icon: Users,
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1100&fit=crop'
              },
              {
                name: 'Megha Iyer',
                role: 'Research and Analytics',
                focus: 'Data-led planning, feedstock modeling, and execution intelligence.',
                unit: 'Research',
                tag: 'Analysis',
                icon: Lightbulb,
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1100&fit=crop'
              }
            ].map((member) => {
              const Icon = member.icon;

              return (
                <TiltSurface key={member.name} maxTilt={7.5} hoverScale={1.015}>
                  <Card className="group relative overflow-hidden rounded-[1.65rem] border border-slate-200/80 dark:border-emerald-800/45 bg-white/92 dark:bg-slate-900/82 p-0 shadow-[0_18px_42px_rgba(15,23,42,0.12)] dark:shadow-[0_18px_42px_rgba(0,0,0,0.48)] transition-[box-shadow,border-color] duration-300 hover:border-emerald-400/45 dark:hover:border-emerald-600/55 hover:shadow-[0_22px_46px_rgba(15,23,42,0.16)] dark:hover:shadow-[0_22px_46px_rgba(0,0,0,0.55)]">
                    <div className="relative h-56 overflow-hidden rounded-t-[1.65rem]">
                      <img
                        src={member.image}
                        alt={`${member.name} portrait`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 rounded-t-[1.65rem] bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent dark:from-black/84 dark:via-black/22" />

                      <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/30 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-emerald-100 backdrop-blur-sm">
                        {member.tag}
                      </div>
                      <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-black/30 text-emerald-100 backdrop-blur-sm">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="absolute left-4 bottom-4">
                        <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-emerald-200/95">
                          {member.unit}
                        </p>
                      </div>
                    </div>

                    <div className="relative p-5 sm:p-6">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {member.focus}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] font-semibold text-gray-500 dark:text-gray-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                          Active
                        </span>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-emerald-700/40 bg-slate-50 dark:bg-emerald-950/20 px-3 py-1.5 text-[11px] font-semibold text-gray-700 dark:text-emerald-200 hover:bg-slate-100 dark:hover:bg-emerald-900/30 transition-colors duration-200"
                        >
                          View
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </TiltSurface>
              );
            })}
          </div>
        </div>
      </section>

      {/* Long-Term Ambition */}
      <section className="relative py-14 sm:py-20 lg:py-32 bg-[radial-gradient(circle_at_18%_8%,_#EAFDE7_0%,_#ffffff_44%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_18%_8%,_rgba(114,191,0,0.16)_0%,_#0d0f14_44%,_#040407_100%)] overflow-hidden">
        <div className="absolute inset-0 opacity-35 dark:opacity-20 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-28 -right-24 h-80 w-80 rounded-full bg-emerald-300/28 dark:bg-emerald-700/18 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-teal-300/22 dark:bg-teal-700/12 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-300/70 dark:border-emerald-400/30 bg-white/80 dark:bg-white/10 backdrop-blur px-3.5 py-2">
              <Rocket className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                Strategic Roadmap
              </span>
            </div>
            <h2 className="mt-4 text-[2rem] sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.06] tracking-tight">
              Long-Term
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400 mt-1.5">
                Ambition
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A sequenced expansion strategy designed for industrial depth, output quality, and durable trust in circular metals.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 lg:mt-14 grid lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 items-start">
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/85 dark:border-white/15 bg-white/85 dark:bg-white/5 backdrop-blur-xl p-5 sm:p-6 lg:p-7 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-400" />
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Ambition Blueprint
                </p>
                <h3 className="mt-3 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                  Built in deliberate phases, not shortcuts.
                </h3>
                <p className="mt-3.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Each phase compounds process maturity, compliance confidence, and market credibility before moving to the next scale layer.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'Phases', value: '03' },
                    { label: 'Core', value: 'Execution' },
                    { label: 'Horizon', value: 'Decades' }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-200/80 dark:border-white/15 bg-white/88 dark:bg-black/20 px-2.5 py-3 text-center"
                    >
                      <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="mt-1 text-sm sm:text-base font-black text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              {[
                {
                  step: '01',
                  phase: 'Foundation',
                  title: "Regional Metal Recovery Hub",
                  description: "Establish Eastern India's premier PCB processing and precious metal extraction facility.",
                  highlights: ['Process discipline', 'Recovery accuracy', 'Regional depth']
                },
                {
                  step: '02',
                  phase: 'Integration',
                  title: 'Integrated Bullion Ecosystem',
                  description: 'Expand into multi-metal recovery with refining capabilities and B2B precious metal supply.',
                  highlights: ['Multi-metal stack', 'Refining capability', 'B2B circulation']
                },
                {
                  step: '03',
                  phase: 'Brand Layer',
                  title: 'Circular Gold Brand',
                  description: 'Launch certified recycled gold products only after industrial capability is proven.',
                  highlights: ['Certification trust', 'Product readiness', 'Consumer confidence']
                }
              ].map((item, idx) => (
                <TiltSurface
                  key={item.title}
                  maxTilt={8.5}
                  hoverScale={1.014}
                  className={idx === 0 ? '' : 'mt-12 sm:mt-14 lg:mt-16'}
                >
                  <Card className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/15 bg-white/90 dark:bg-white/[0.04] p-5 sm:p-6 lg:p-7 shadow-[0_14px_38px_rgba(15,23,42,0.08)] dark:shadow-[0_14px_38px_rgba(0,0,0,0.42)]">
                    <div
                      className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${
                        idx === 0
                          ? 'from-emerald-700 via-emerald-600 to-emerald-400'
                          : idx === 1
                          ? 'from-emerald-700 via-emerald-600 to-lime-400'
                          : 'from-emerald-700 via-emerald-600 to-teal-400'
                      }`}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                      <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center text-base font-black ${
                          idx === 0
                            ? 'bg-slate-100 text-emerald-700 dark:bg-slate-500/20 dark:text-emerald-300'
                            : idx === 1
                            ? 'bg-teal-100 text-teal-700 dark:bg-slate-500/20 dark:text-teal-300'
                            : 'bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300'
                        }`}
                      >
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-gray-500 dark:text-gray-400">
                            Phase {item.step}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50/80 dark:bg-slate-500/10 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                            {item.phase}
                          </span>
                        </div>
                        <h3 className="mt-2 text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-3.5 flex flex-wrap gap-2">
                          {item.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/[0.06] px-2.5 py-1 text-[11px] sm:text-xs text-gray-700 dark:text-gray-300"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </TiltSurface>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="relative py-14 sm:py-20 lg:py-32 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(114,191,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(114,191,0,0.1)_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="absolute -top-20 -right-14 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-14 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-7">
              <div className="h-full rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-900/55 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-[0_24px_55px_rgba(0,0,0,0.35)]">
                <div className="inline-flex items-center rounded-full border border-slate-300/35 bg-emerald-300/10 px-3 py-1.5">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-200">
                    Commitment Statement
                  </span>
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white">
                  We&apos;re building infrastructure,
                  <span className="block text-emerald-200 mt-1.5">
                    not hype.
                  </span>
                </h2>
                <p className="mt-5 text-base sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl">
                  Every decision is made with the understanding that this system must operate reliably for decades, not deliver quick returns in quarters.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {['Durability-first execution', 'Decades over quarters', 'Industrial trust by design'].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-slate-300/35 bg-emerald-200/10 px-3 py-1.5 text-[11px] sm:text-xs text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full rounded-2xl sm:rounded-3xl border border-white/15 bg-black/35 backdrop-blur-xl p-5 sm:p-6 lg:p-7 shadow-[0_24px_55px_rgba(0,0,0,0.38)]">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-200">
                  Operational Principles
                </p>
                <div className="mt-4 space-y-3.5">
                  {[
                    {
                      title: 'Reliability over velocity',
                      text: 'Scale follows proof of process quality and operational stability.'
                    },
                    {
                      title: 'Engineering over narrative',
                      text: 'Technical depth determines long-term value, not short-cycle attention.'
                    },
                    {
                      title: 'Continuity over cycles',
                      text: 'Decisions are optimized for decades of performance and trust.'
                    }
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/12 bg-slate-900/45 px-3.5 py-3.5"
                    >
                      <p className="text-sm sm:text-base font-semibold text-white">{item.title}</p>
                      <p className="mt-1.5 text-xs sm:text-sm text-gray-300 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

