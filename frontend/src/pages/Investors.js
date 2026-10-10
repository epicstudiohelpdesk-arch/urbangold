import React from 'react';
import { TrendingUp, DollarSign, PieChart, BarChart3, Shield, Target, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Investors = () => {
  const investmentHighlights = [
    {
      icon: TrendingUp,
      title: 'Structural Demand',
      description: 'Gold and copper demand remains robust globally. Urban mining addresses supply constraints without traditional mining environmental impact.'
    },
    {
      icon: Target,
      title: 'High Metal Concentration',
      description: 'PCB feedstock contains 50-100x more gold per tonne than traditional ore, improving unit economics of extraction.'
    },
    {
      icon: Shield,
      title: 'Regulatory Moat',
      description: 'Compliance-first approach creates barriers to entry for informal and under-capitalized competitors.'
    },
    {
      icon: BarChart3,
      title: 'Dual Revenue Streams',
      description: 'Precious metals (gold, silver, palladium) + base metals (copper) reduce single-commodity exposure.'
    }
  ];

  const revenuePhases = [
    {
      phase: 'Phase I',
      title: 'Industrial Metal Recovery',
      period: 'Year 3-5',
      streams: [
        'B2B bullion sales (gold, silver)',
        'Copper concentrate monetization',
        'Palladium and trace metal recovery'
      ],
      model: 'Tonnage-based processing with margin on recovered metal value'
    },
    {
      phase: 'Phase II',
      title: 'Polymer Recovery & Integration',
      period: 'Year 5-7',
      streams: [
        'Recovered plastic pellet sales',
        'Fiber reinforcement material recovery',
        'Composite material partnerships'
      ],
      model: 'Circular economy integration expanding revenue per tonne processed'
    },
    {
      phase: 'Phase III',
      title: 'Branded Recycled Gold',
      period: 'Year 7+',
      streams: [
        'Direct-to-consumer recycled gold jewelry',
        'B2B certified recycled gold supply',
        'Brand licensing and partnerships'
      ],
      model: 'Value-added branded products with premium positioning'
    }
  ];
  const riskFramework = [
    {
      risk: 'Technical',
      mitigation: 'Pilot validation before full-scale deployment. Multi-process pathway evaluation.',
      severity: 'Medium'
    },
    {
      risk: 'Regulatory',
      mitigation: 'Pre-compliance engineering. SPCB engagement during design phase.',
      severity: 'Medium-High'
    },
    {
      risk: 'Market Price',
      mitigation: 'Dual revenue streams (precious + base metals). Long-term supplier contracts.',
      severity: 'Low-Medium'
    },
    {
      risk: 'Capital Intensity',
      mitigation: 'Modular facility design. Phased capital deployment. Copper provides early cash flow.',
      severity: 'High'
    }
  ];
  const highRiskCount = riskFramework.filter((item) => item.severity === 'High').length;
  const mediumRiskCount = riskFramework.filter((item) => item.severity.includes('Medium')).length;
  const developmentStatus = [
    { label: 'Development Phase', value: 'Year 1 (Technical Design)' },
    { label: 'Operational Status', value: 'Pre-operational' },
    { label: 'Regulatory Authorizations', value: 'Pre-application' },
    { label: 'Timeline to Operations', value: '24-30 months' }
  ];
  const capitalRequirements = [
    {
      phase: 'Phase I (Pilot)',
      budget: '$3-5M',
      focus: 'Technical finalization, pilot commissioning, regulatory submissions'
    },
    {
      phase: 'Phase II (Industrial)',
      budget: '$8-12M',
      focus: 'Full-scale facility construction, equipment installation, working capital'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative -mt-20 sm:-mt-24 lg:-mt-28 overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-14 lg:pt-[4.5rem] lg:pb-16 bg-slate-50 dark:bg-[#0b1118]">
        <div className="absolute inset-x-0 -top-14 bottom-0 opacity-32 dark:opacity-14 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-emerald-300/12 blur-3xl dark:bg-emerald-700/12" />
        <div className="pointer-events-none absolute -top-20 -left-10 h-56 w-56 rounded-full bg-slate-300/18 blur-3xl dark:bg-slate-700/18" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
          <div className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-white/80 dark:bg-slate-500/10 px-3.5 py-2">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
              Institutional Investment Case
            </span>
          </div>
          <h1 className="mt-4 text-[2.1rem] sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.02] tracking-tight">
            Investment Opportunity
          </h1>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 max-w-3xl">
            Building India's precision urban metal recovery infrastructure - a capital-intensive, 
            technically disciplined, long-term value creation opportunity.
          </p>
          <Button
            size="lg"
            className="group h-12 rounded-xl border border-slate-300/80 bg-[linear-gradient(135deg,#0f172a_0%,#1f2937_100%)] px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_22px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-[linear-gradient(135deg,#0f172a_0%,#14532d_100%)] hover:shadow-[0_14px_28px_rgba(15,23,42,0.28)] sm:h-14 sm:px-8 sm:text-xs dark:border-emerald-500/35 dark:bg-[linear-gradient(135deg,#10241f_0%,#173c34_100%)] dark:hover:border-emerald-300/60 dark:hover:bg-[linear-gradient(135deg,#11392f_0%,#166534_100%)]"
          >
            <Download className="h-4.5 w-4.5 text-emerald-300 transition-transform duration-300 group-hover:translate-y-0.5 sm:h-5 sm:w-5" />
            Download Executive Brief
          </Button>
          <p className="mt-2 text-[11px] sm:text-xs tracking-[0.08em] uppercase text-slate-500 dark:text-slate-400">
            Investor deck, risk profile, and milestone roadmap
          </p>
          <div className="mt-7 grid sm:grid-cols-3 gap-3 max-w-3xl">
            {[
              { label: 'Opportunity Type', value: 'Urban Mining Infra' },
              { label: 'Return Driver', value: 'Recovery Margin' },
              { label: 'Governance Lens', value: 'Compliance-Led' }
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-gray-200 dark:border-white/12 bg-white/90 dark:bg-gray-900/70 px-3.5 py-3.5"
              >
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="mt-1 text-base sm:text-lg font-black text-gray-900 dark:text-white leading-tight">{item.value}</p>
              </div>
            ))}
          </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.14em] font-semibold text-slate-500 dark:text-slate-400">
                    Investment Snapshot
                  </p>
                  <span className="inline-flex rounded-md border border-slate-300/70 dark:border-emerald-400/45 bg-slate-50 dark:bg-slate-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-200">
                    Professional
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Capital Profile', value: 'Phased Deployment' },
                    { label: 'Revenue Engine', value: 'Gold + Copper' },
                    { label: 'Risk Model', value: 'Compliance-First' },
                    { label: 'Time Horizon', value: 'Multi-Year Build' }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 px-4 py-3.5"
                    >
                      <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className="mt-1.5 text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-3.5">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Investment Note
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Infrastructure-led execution with disciplined milestone gating and long-duration value capture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Investment Thesis
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Why Urban Metal Recovery
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Urban mining combines structural demand, high-value feedstock, and compliance-led execution into a durable industrial investment model.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Thesis Pillars</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{investmentHighlights.length}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Value Logic</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-tight">Recovery + Compliance</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Strategic Context
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  The model is built around industrial-scale recovery discipline rather than speculative short-cycle growth.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {investmentHighlights.map((highlight, idx) => {
                  const Icon = highlight.icon;
                  return (
                    <Card key={idx} className="border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-800">
                          <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                        </div>
                        <span className="inline-flex rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                          {`TH-${String(idx + 1).padStart(2, '0')}`}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                        {highlight.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {highlight.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Market Context */}
      <section className="py-20 lg:py-24 bg-slate-100 dark:bg-[#070c14]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Market Fundamentals
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Structural Demand for Gold & Copper
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                Precious and base metals continue to provide strong industrial and monetary relevance, creating durable demand for compliant urban recovery capacity.
              </p>

              <div className="mt-7 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    MC-01
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Gold Market Fundamentals</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    Global gold demand remains strong driven by jewelry, investment, and central bank purchases.
                    Recycled gold accounts for ~25-30% of annual supply.
                  </p>
                  <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                    Current Gold Price: INR 6,500-7,000/gram (~$2,000-2,100/oz)
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    MC-02
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Copper as Base Revenue</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    Copper comprises 20-30% of PCB weight, providing reliable cash flow even during precious metal
                    price volatility. India imports ~50% of copper demand.
                  </p>
                  <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                    Current Copper Price: INR 750-850/kg (~$9,000-10,000/tonne)
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Investment Implication
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Dual exposure to precious and base metals supports more resilient unit economics across market cycles.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 sm:p-5">
                <img
                  src="https://images.unsplash.com/photo-1524514587686-e2909d726e9b?w=800&h=600&fit=crop"
                  alt="Metal Gears"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 object-cover"
                />

                <div className="mt-4 space-y-3">
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Demand Signal</p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Sustained bullion and copper demand supports long-horizon recovery infrastructure.</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Value Anchor</p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Metal-rich feedstock and dual-output revenue improve downside protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Monetization Roadmap
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Phased Revenue Model
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Revenue scales through staged deployment, starting with industrial metal recovery and expanding into higher-value circular product layers.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Phases</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{revenuePhases.length}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Time Span</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-tight">Year 3 Onward</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Progression Logic
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Each phase increases value per tonne by adding new recovery channels and commercialization depth.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-4">
                {revenuePhases.map((phase, idx) => (
                  <Card key={idx} className="border border-slate-200 bg-slate-50 p-5 sm:p-6 dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          {phase.phase}
                        </p>
                        <h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white leading-snug">{phase.title}</h3>
                      </div>
                      <span className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                        {phase.period}
                      </span>
                    </div>

                    <div className="mt-4 grid sm:grid-cols-2 gap-4">
                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800/70">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          Revenue Streams
                        </p>
                        <ul className="mt-2.5 space-y-2">
                          {phase.streams.map((stream, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-300 flex-shrink-0"></span>
                              <span>{stream}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800/70">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          Business Model
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{phase.model}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Framework */}
      <section className="py-20 lg:py-24 bg-slate-100 dark:bg-[#070d16]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Risk Governance
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Risk Mitigation Framework
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Risk controls are structured as planned mitigation actions tied to design, compliance, commercialization, and capital sequencing.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Total Risks</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{riskFramework.length}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">High Priority</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{highRiskCount}</p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Medium Priority</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{mediumRiskCount}</p>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Control Principle
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Mitigations are embedded before scale-up to reduce execution risk and protect capital efficiency.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {riskFramework.map((item, idx) => {
                  const severityClass =
                    item.severity === 'High'
                      ? 'border-red-300 bg-red-50 text-red-700 dark:border-red-500/45 dark:bg-red-500/10 dark:text-red-300'
                      : item.severity.includes('Medium')
                        ? 'border-slate-300 bg-slate-50 text-emerald-700 dark:border-emerald-500/45 dark:bg-slate-500/10 dark:text-emerald-300'
                        : 'border-slate-300 bg-slate-50 text-emerald-700 dark:border-emerald-500/45 dark:bg-slate-500/10 dark:text-emerald-300';
                  return (
                    <Card key={idx} className="border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            {`RK-${String(idx + 1).padStart(2, '0')}`}
                          </p>
                          <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white leading-snug">{item.risk} Risk</h3>
                        </div>
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${severityClass}`}>
                          {item.severity}
                        </span>
                      </div>

                      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 dark:border-slate-700 dark:bg-slate-800/70">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          Mitigation Action
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.mitigation}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Stage */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Execution Baseline
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Development Stage & Capital Discipline
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Current progress and capital planning are structured to de-risk scale-up through phased deployment and milestone-based investment.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Current Stage</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-tight">Design Phase</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Capital Envelope</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-tight">$11-17M</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Capital Rule
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Funding is sequenced against technical validation, permit progression, and commissioning readiness.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Current Status</h3>
                    <span className="inline-flex rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                      Active
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {developmentStatus.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="text-sm text-slate-600 dark:text-slate-300">{item.label}</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Capital Requirements</h3>
                    <span className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-700 dark:border-emerald-500/45 dark:bg-slate-500/10 dark:text-emerald-300">
                      Staged
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {capitalRequirements.map((item, idx) => (
                      <div key={item.phase} className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800/70">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.phase}</p>
                          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{item.budget}</span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.focus}</p>
                        {idx < capitalRequirements.length - 1 && (
                          <div className="mt-3 border-b border-slate-200 dark:border-slate-700"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Opportunities */}
      <section className="py-20 lg:py-24 bg-slate-100 dark:bg-[#070d16]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Engagement Paths
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Engagement Opportunities
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Multiple participation models are available based on investor profile, deployment horizon, and strategic alignment.
              </p>

              <div className="mt-7 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Participation Model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Capital and partnership structures are aligned to phased execution milestones and risk controls.
                </p>
              </div>

              <Button size="lg" className="mt-6 bg-slate-500 hover:bg-emerald-600 text-white h-13 px-8 sm:h-14 sm:px-10 text-sm sm:text-base">
                Request Investor Deck
              </Button>
            </div>

            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    code: 'EN-01',
                    title: 'Equity Investment',
                    description: 'Long-term equity partnership for infrastructure development and scaling.',
                    Icon: DollarSign
                  },
                  {
                    code: 'EN-02',
                    title: 'Strategic Partnership',
                    description: 'Joint ventures with metal refiners, e-waste aggregators, or technology providers.',
                    Icon: PieChart
                  },
                  {
                    code: 'EN-03',
                    title: 'Debt Financing',
                    description: 'Project finance for equipment, infrastructure, and working capital after pilot validation.',
                    Icon: Shield
                  }
                ].map((item) => {
                  const Icon = item.Icon;
                  return (
                    <Card key={item.code} className="border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800">
                          <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                        </div>
                        <span className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                          {item.code}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white leading-snug">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Investment Philosophy */}
      <section className="py-20 lg:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                Investment Philosophy
              </p>
              <h2 className="mt-4 text-4xl lg:text-6xl font-bold leading-tight">
                This is not a quick-exit opportunity.
              </h2>
              <p className="mt-5 text-base sm:text-lg lg:text-2xl text-slate-300 leading-relaxed max-w-3xl">
                We seek patient capital aligned with long-term infrastructure development, not quarterly milestone pressure or premature growth optics.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Asset Type', value: 'Industrial Infrastructure' },
                  { label: 'Capital Horizon', value: 'Decade+ View' },
                  { label: 'Execution Style', value: 'Disciplined Buildout' }
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3.5">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-slate-300">{item.label}</p>
                    <p className="mt-1.5 text-sm font-semibold text-white leading-snug">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-slate-800/70 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300">
                    Capital Alignment Criteria
                  </p>
                  <span className="inline-flex rounded-full border border-slate-300/45 bg-slate-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-200">
                    Long Horizon
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { title: 'Infrastructure Mindset', detail: 'Prioritize long-life systems over short-cycle valuation events.', Icon: Shield },
                    { title: 'Phased Deployment', detail: 'Release capital against milestone validation and operating readiness.', Icon: Target },
                    { title: 'Durable Value Creation', detail: 'Focus on sustained recovery margins through compliant scale.', Icon: TrendingUp }
                  ].map((item) => {
                    const Icon = item.Icon;
                    return (
                      <div key={item.title} className="rounded-lg border border-white/10 bg-black/20 px-3.5 py-3">
                        <div className="flex items-start gap-3">
                          <div className="rounded-md bg-white/10 p-1.5">
                            <Icon className="h-4 w-4 text-emerald-200" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.detail}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investors;



