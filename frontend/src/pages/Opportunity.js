import React from 'react';
import { TrendingUp, AlertCircle, Target, Coins, Factory, Gauge } from 'lucide-react';
import { Card } from '../components/ui/card';

const Opportunity = () => {
  const stats = [
    { label: 'Annual E-Waste Generation (India)', value: '3.2M+ Tonnes', trend: 'Growing 30% YoY' },
    { label: 'PCB Gold Concentration', value: '250-350 g/tonne', trend: 'vs. 3-5 g/tonne in ore' },
    { label: 'Informal Processing Rate', value: '~70%', trend: 'Low recovery efficiency' },
    { label: 'Eastern India Facilities', value: 'Limited', trend: 'Infrastructure gap' }
  ];
  const heroKpis = [
    { value: '3.2M+', label: 'Tonnes annual feedstock' },
    { value: '50-100x', label: 'Gold density vs ore' },
    { value: '90%+', label: 'Industrial recovery potential' }
  ];

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative -mt-[5.5rem] sm:-mt-20 lg:-mt-24 overflow-hidden pt-14 pb-14 sm:pt-18 sm:pb-16 lg:pt-24 lg:pb-24 bg-[radial-gradient(circle_at_10%_8%,_#EAFDE7_0%,_#EAFDE7_26%,_#EAFDE7_46%,_#ffffff_78%)] dark:bg-[radial-gradient(circle_at_10%_8%,_rgba(114,191,0,0.22)_0%,_#11141b_48%,_#050609_100%)]">
        <div className="absolute inset-0 opacity-35 dark:opacity-20 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-28 right-4 h-80 w-80 rounded-full bg-emerald-300/34 dark:bg-emerald-700/22 blur-3xl" />
        <div className="absolute -bottom-24 -left-14 h-72 w-72 rounded-full bg-teal-300/24 dark:bg-teal-700/14 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 relative">
              <div className="hidden lg:block absolute right-0 top-2 text-[10px] uppercase tracking-[0.38em] text-emerald-700/45 dark:text-emerald-200/35">
                Urban Mining Index
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 dark:border-emerald-400/35 bg-white/85 dark:bg-white/10 backdrop-blur px-3.5 py-2">
                <Target className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Opportunity Thesis
                </span>
              </div>

              <h1 className="mt-4 text-[2.2rem] sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[0.98] tracking-tight">
                A Structural
                <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400">
                  Industrial
                </span>
                <span className="block text-gray-900 dark:text-white">Opportunity</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                India&apos;s e-waste represents an untapped above-ground resource base with significant precious metal recovery potential.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                {heroKpis.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200/85 dark:border-white/15 bg-white/82 dark:bg-white/[0.05] backdrop-blur px-3.5 py-3.5"
                  >
                    <p className="text-lg sm:text-xl font-black text-gray-900 dark:text-white leading-tight">{item.value}</p>
                    <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-600 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full rounded-2xl border border-gray-200 dark:border-white/12 bg-white/95 dark:bg-gray-900/80 p-5 sm:p-6 lg:p-7">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Opportunity Snapshot
                </p>
                <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Core indicators that support formal processing infrastructure development.
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    {
                      label: 'Annual E-Waste Volume',
                      value: '3.2M+ tonnes',
                      note: 'Large and persistent national feedstock base'
                    },
                    {
                      label: 'PCB Gold Concentration',
                      value: '250-350 g/tonne',
                      note: 'Substantially above traditional ore grades'
                    },
                    {
                      label: 'Informal Processing Share',
                      value: '~70%',
                      note: 'Signals significant formalization opportunity'
                    },
                    {
                      label: 'Industrial Recovery Potential',
                      value: '90%+',
                      note: 'Achievable under process-controlled operations'
                    }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-gray-200 dark:border-white/12 bg-gray-50 dark:bg-gray-800/65 px-4 py-3.5"
                    >
                      <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="mt-1 text-lg sm:text-xl font-black text-gray-900 dark:text-white leading-tight">{item.value}</p>
                      <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-slate-300/55 dark:border-emerald-500/30 bg-slate-50/70 dark:bg-slate-500/10 px-4 py-3.5">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-200">
                    Interpretation
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
                    High-grade feedstock with low formal capacity creates a clear infrastructure-led value window.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Context */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-slate-50 dark:bg-[#0a0d13] overflow-hidden">
        <div className="absolute inset-0 opacity-25 dark:opacity-15 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-20 right-12 h-64 w-64 rounded-full bg-emerald-300/22 dark:bg-emerald-700/12 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-teal-300/16 dark:bg-teal-700/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 items-start">
            <div className="lg:col-span-4">
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/15 bg-white/85 dark:bg-white/[0.05] backdrop-blur-xl p-5 sm:p-6 lg:p-7 shadow-[0_18px_46px_rgba(15,23,42,0.10)] dark:shadow-[0_18px_46px_rgba(0,0,0,0.4)]">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 dark:border-emerald-500/30 bg-slate-50/80 dark:bg-slate-500/10 px-3 py-1.5">
                  <Gauge className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                    Market Context
                  </span>
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.04] tracking-tight">
                  Operating Signal Map
                </h2>
                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Data indicates a high-value urban feedstock base paired with underbuilt formal processing capacity.
                </p>
                <div className="mt-5 rounded-xl border border-slate-300/65 dark:border-emerald-500/30 bg-slate-100/70 dark:bg-slate-500/10 px-3.5 py-3.5">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-200">
                    Strategic Read
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
                    High concentration inputs + low formal infrastructure = durable industrial upside.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {stats.map((stat, idx) => {
                  const Icon = idx === 0 ? TrendingUp : idx === 1 ? Coins : idx === 2 ? AlertCircle : Factory;
                  const meter = idx === 0 ? 88 : idx === 1 ? 93 : idx === 2 ? 72 : 84;
                  return (
                    <Card
                      key={stat.label}
                      className="rounded-2xl border border-gray-200 dark:border-white/12 bg-white dark:bg-gray-900/80 p-5 sm:p-6 shadow-[0_6px_20px_rgba(15,23,42,0.05)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.32)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-md border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-gray-800 px-2.5 py-1 text-[10px] sm:text-xs font-semibold tracking-[0.12em] text-gray-500 dark:text-gray-400">
                          M0{idx + 1}
                        </span>
                        <div
                          className={`rounded-lg p-2 ${
                            idx === 0
                              ? 'bg-slate-100 text-emerald-700 dark:bg-slate-500/20 dark:text-emerald-300'
                              : idx === 1
                              ? 'bg-teal-100 text-teal-700 dark:bg-slate-500/20 dark:text-teal-300'
                              : idx === 2
                              ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300'
                              : 'bg-lime-100/90 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300'
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      <p className="mt-4 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {stat.label}
                      </p>
                      <div className="mt-4 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/60 px-3 py-2.5">
                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                          <span>Trend</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{stat.trend}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                          <span>Signal Strength</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{meter}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-slate-500"
                            style={{ width: `${meter}%` }}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National E-Waste Generation */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50/80 dark:bg-slate-500/10 px-3.5 py-2">
                <TrendingUp className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-300" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  National Signal
                </span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight">
                National E-Waste Generation
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                India generates over 3.2 million tonnes of electronic waste annually, making it the third-largest e-waste producer globally. This stream is growing at approximately 30% year-over-year, driven by digital adoption and device replacement cycles.
              </p>
              <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Eastern hubs, particularly Kolkata, Bhubaneswar, and nearby industrial corridors, contribute substantial volume while local formal processing capacity remains limited.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
                {[
                  {
                    label: 'Annual E-Waste Volume',
                    value: '3.2M+ tonnes',
                    note: 'Large and consistent feedstock base'
                  },
                  {
                    label: 'Global Position',
                    value: '#3 Producer',
                    note: 'One of the largest national generation profiles'
                  },
                  {
                    label: 'Growth Rate',
                    value: '~30% YoY',
                    note: 'Volume expansion expected to continue'
                  },
                  {
                    label: 'Regional Capacity',
                    value: 'Underbuilt',
                    note: 'Formal infrastructure lags generation growth'
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gray-200 dark:border-white/12 bg-gray-50 dark:bg-gray-800/65 px-4 py-3.5"
                  >
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">{item.label}</p>
                    <p className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{item.value}</p>
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-gray-200 dark:border-white/12 bg-gray-50 dark:bg-gray-800/65 p-3">
                <img
                  src="https://images.unsplash.com/photo-1606718220923-fcb2abd9a778?w=1200&h=760&fit=crop"
                  alt="Electronic waste stream and device volume"
                  className="h-52 sm:h-60 w-full rounded-xl object-cover"
                />
                <p className="mt-3 px-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Rapid device turnover is expanding the national e-waste stream and reinforcing the need for formal recovery infrastructure.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-white/12 bg-gray-50 dark:bg-gray-800/65 p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Implications for Industrial Processing
                </h3>
                <ul className="mt-4 space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>Large and growing feedstock supports long-horizon capacity planning.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>Regional processing gaps create a clear infrastructure entry window.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>Formal systems can unlock higher recovery, compliance, and monetization quality.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-300/60 dark:border-emerald-500/35 bg-slate-50/70 dark:bg-slate-500/10 p-5 sm:p-6">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-200">
                  Feedstock Quality Note
                </p>
                <p className="mt-2.5 text-sm sm:text-base text-emerald-900 dark:text-emerald-100 leading-relaxed">
                  A large share of this stream includes PCB-rich devices with recoverable gold, silver, copper, palladium, and other strategic metals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PCB Metal Concentration */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50/80 dark:bg-slate-500/10 px-3.5 py-2">
                <Coins className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-300" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Concentration Analysis
                </span>
              </div>

              <h2 className="mt-3.5 text-[1.7rem] sm:text-4xl lg:text-[2.65rem] font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight">
                PCB Metal Concentration Logic
              </h2>
              <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                PCB-rich e-waste offers significantly higher precious metal concentration than primary ore sources, improving recovery economics when processed through controlled industrial systems.
              </p>

              <div className="mt-5 rounded-2xl border border-gray-200 dark:border-white/12 bg-white dark:bg-gray-900/75 overflow-hidden">
                <div className="px-4 sm:px-5 py-2.5 border-b border-gray-200 dark:border-white/10">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                    Gold Grade Comparison
                  </p>
                </div>
                <div>
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/65">
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Source</th>
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Gold Concentration</th>
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Relative Intensity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { source: 'PCB Feedstock', grade: '250-350 g/tonne', intensity: 'High-value input' },
                        { source: 'Traditional Gold Ore', grade: '3-5 g/tonne', intensity: 'Low concentration input' },
                        { source: 'Enrichment Ratio', grade: '50-100x', intensity: 'Structural processing advantage' }
                      ].map((row) => (
                        <tr key={row.source} className="border-t border-gray-200 dark:border-white/10">
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm font-semibold text-gray-900 dark:text-white break-words">{row.source}</td>
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300 break-words">{row.grade}</td>
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300 break-words">{row.intensity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {[
                  { title: 'Gold', value: '250-350 g/tonne', note: 'Primary value anchor' },
                  { title: 'Copper', value: '20-30%', note: 'Base recovery revenue' },
                  { title: 'Silver + Palladium', value: 'Trace-to-moderate', note: 'Incremental margin layer' }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-200 dark:border-white/12 bg-white dark:bg-gray-900/75 px-3.5 py-3"
                  >
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">{item.title}</p>
                    <p className="mt-1 text-lg font-black text-gray-900 dark:text-white">{item.value}</p>
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-2xl border border-gray-200 dark:border-white/12 bg-white dark:bg-gray-900/75 p-2.5">
                <img
                  src="https://images.unsplash.com/photo-1579803166678-7acf374cfe52?w=1200&h=780&fit=crop"
                  alt="Printed circuit board metal-rich feedstock"
                  className="h-48 sm:h-56 w-full rounded-xl object-cover"
                />
                <p className="mt-3 px-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  PCB-rich streams concentrate high-value metals in compact volumes, creating favorable conditions for precision recovery.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-300/60 dark:border-emerald-500/35 bg-slate-50/70 dark:bg-slate-500/10 p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-100">
                  Processing Implication
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-emerald-900 dark:text-emerald-100 leading-relaxed">
                  Higher concentration feedstock supports better unit economics, but only when sorting accuracy, process control, and recovery consistency are maintained.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Informal Processing Gap */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50 dark:bg-[#070a10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50/80 dark:bg-slate-500/10 px-3.5 py-2">
                <AlertCircle className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-300" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Gap Analysis
                </span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight">
                Informal Processing Gap
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                A large share of e-waste processing remains informal, where low-yield methods and weak controls reduce value capture and increase environmental risk.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
                {[
                  {
                    label: 'Informal Processing Share',
                    value: '~70%',
                    note: 'Majority of flow remains outside high-control systems'
                  },
                  {
                    label: 'Typical Recovery Efficiency',
                    value: '30-40%',
                    note: 'Large metal value leakage versus industrial methods'
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gray-200 dark:border-white/12 bg-white dark:bg-gray-900/75 px-4 py-3.5"
                  >
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">{item.label}</p>
                    <p className="mt-1 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{item.value}</p>
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{item.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-gray-200 dark:border-white/12 bg-white dark:bg-gray-900/75 p-5 sm:p-6">
                <h3 className="inline-flex items-center rounded-md border border-slate-300/75 dark:border-emerald-500/35 bg-slate-50/90 dark:bg-slate-500/10 px-3 py-1.5 text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-100">
                  Current Risk Pattern
                </h3>
                <div className="mt-4 grid sm:grid-cols-2 gap-3.5">
                  {[
                    {
                      code: 'R1',
                      title: 'Open Burning + Acid Leaching',
                      text: 'Unstructured extraction methods degrade recovery consistency.'
                    },
                    {
                      code: 'R2',
                      title: 'Low Metal Recovery',
                      text: 'Typical informal recovery remains around 30-40%.'
                    },
                    {
                      code: 'R3',
                      title: 'Effluent Control Deficit',
                      text: 'Inadequate treatment pathways increase environmental exposure.'
                    },
                    {
                      code: 'R4',
                      title: 'Worker Safety Exposure',
                      text: 'Manual handling without robust safeguards elevates health risk.'
                    }
                  ].map((item) => (
                    <div
                      key={item.code}
                      className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/65 px-4 py-3.5"
                    >
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">{item.code}</p>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-gray-200 dark:border-white/12 bg-white dark:bg-gray-900/75 overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-gray-200 dark:border-white/10">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    Informal vs Formal Benchmark
                  </h3>
                </div>
                <div>
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/65">
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Dimension</th>
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Informal</th>
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Formal Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { dim: 'Recovery Yield', informal: '30-40%', formal: '90%+' },
                        { dim: 'Environmental Control', informal: 'Limited', formal: 'Regulated and monitored' },
                        { dim: 'Effluent Handling', informal: 'Inconsistent', formal: 'Treatment-integrated' },
                        { dim: 'Worker Safety', informal: 'High exposure', formal: 'Process-controlled safety' },
                        { dim: 'Output Quality', informal: 'Variable', formal: 'Verified and consistent' }
                      ].map((row) => (
                        <tr key={row.dim} className="border-t border-gray-200 dark:border-white/10">
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm font-semibold text-gray-900 dark:text-white break-words">{row.dim}</td>
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300 break-words">{row.informal}</td>
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300 break-words">{row.formal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-300/60 dark:border-emerald-500/35 bg-slate-50/70 dark:bg-slate-500/10 p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-100">
                  Displacement Requirement
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-emerald-900 dark:text-emerald-100 leading-relaxed">
                  Formal facilities need superior recovery efficiency, predictable throughput economics, and strict compliance execution to sustainably absorb informal market share.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Eastern India Infrastructure Deficit */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50/80 dark:bg-slate-500/10 px-3.5 py-2">
                <Target className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-300" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Regional Capacity Analysis
                </span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight">
                Eastern India Infrastructure Deficit
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                While Western and Southern India host multiple formal e-waste processing units, Eastern India remains underbuilt for PCB-focused precious metal recovery despite meaningful feedstock generation.
              </p>
              <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                The capacity gap increases cross-state transport dependency, adds logistics overhead, and weakens economics for smaller aggregators operating in the region.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
                {[
                  {
                    label: 'Formal Capacity Presence',
                    value: 'Limited',
                    note: 'Regional PCB-focused processing units remain scarce'
                  },
                  {
                    label: 'Interstate Transport Reliance',
                    value: 'High',
                    note: 'Material movement required to reach established clusters'
                  },
                  {
                    label: 'Logistics Cost Pressure',
                    value: 'Elevated',
                    note: 'Additional distance compresses recovery economics'
                  },
                  {
                    label: 'Processing Turnaround',
                    value: 'Longer',
                    note: 'Extended chain reduces speed from collection to output'
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gray-200 dark:border-white/12 bg-gray-50 dark:bg-gray-800/65 px-4 py-3.5"
                  >
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">{item.label}</p>
                    <p className="mt-1 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{item.value}</p>
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-gray-200 dark:border-white/12 bg-gray-50 dark:bg-gray-800/65 overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-gray-200 dark:border-white/10">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    Regional Position Snapshot
                  </h3>
                </div>
                <div>
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800/80">
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Dimension</th>
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Eastern India</th>
                        <th className="text-left px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 break-words">Western/Southern Clusters</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { dim: 'Formal PCB Recovery Capacity', east: 'Limited', west: 'Established' },
                        { dim: 'Supplier Proximity to Processor', east: 'Dispersed', west: 'Concentrated' },
                        { dim: 'Cross-State Dependence', east: 'Higher', west: 'Lower' },
                        { dim: 'Processing Cost Efficiency', east: 'Constrained', west: 'More optimized' }
                      ].map((row) => (
                        <tr key={row.dim} className="border-t border-gray-200 dark:border-white/10">
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm font-semibold text-gray-900 dark:text-white break-words">{row.dim}</td>
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300 break-words">{row.east}</td>
                          <td className="px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300 break-words">{row.west}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-300/60 dark:border-emerald-500/35 bg-slate-50/70 dark:bg-slate-500/10 p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-100">
                  Regional Advantages
                </h3>
                <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Dense feedstock radius improves aggregation efficiency.',
                    'Kolkata Port access supports downstream market flexibility.',
                    'Comparatively lower land cost can improve capital productivity.',
                    'Early formal entry enables first-mover network effects.'
                  ].map((item) => (
                    <div key={item} className="rounded-lg border border-slate-300/45 dark:border-emerald-500/30 bg-white/60 dark:bg-black/20 px-3 py-2.5">
                      <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Investment Opportunity */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(114,191,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(114,191,0,0.12)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-20 right-8 h-64 w-64 rounded-full bg-slate-500/14 blur-3xl" />
        <div className="absolute -bottom-20 left-8 h-64 w-64 rounded-full bg-slate-500/14 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/40 bg-emerald-300/10 px-3.5 py-2">
                <TrendingUp className="h-4.5 w-4.5 text-emerald-300" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-200">
                  Investment Thesis
                </span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.04] tracking-tight">
                Industrial Investment Opportunity
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-xl text-gray-300 leading-relaxed">
                This is not a recycling business. It is precision metal extraction infrastructure requiring industrial capital, technical discipline, and long-horizon operating execution.
              </p>

              <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white">Investment Framing</h3>
                <div className="mt-4 grid sm:grid-cols-2 gap-3.5">
                  {[
                    { label: 'Asset Type', value: 'Process-intensive industrial infrastructure' },
                    { label: 'Revenue Route', value: 'B2B recovered metal and bullion flow' },
                    { label: 'Execution Model', value: 'Scale only after process stability' },
                    { label: 'Risk Lens', value: 'Compliance and recovery control as core moat' }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/12 bg-black/20 px-4 py-3.5"
                    >
                      <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                      <p className="mt-1.5 text-sm sm:text-base font-semibold text-white leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {[
                {
                  label: 'Phase I Capital Requirement',
                  value: '$3-5M',
                  note: 'Estimated pilot-scale facility investment'
                },
                {
                  label: 'Commissioning Horizon',
                  value: '18-24 Months',
                  note: 'From technical finalization to operations'
                },
                {
                  label: 'Go-To-Market Model',
                  value: 'B2B Bullion Supply',
                  note: 'Direct sales to refiners and metal traders'
                }
              ].map((item) => (
                <Card
                  key={item.label}
                  className="rounded-2xl border border-white/12 bg-white/[0.05] p-5 sm:p-6"
                >
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-emerald-300">{item.value}</p>
                  <p className="mt-2.5 text-sm sm:text-base text-gray-300 leading-relaxed">{item.note}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Opportunity;







