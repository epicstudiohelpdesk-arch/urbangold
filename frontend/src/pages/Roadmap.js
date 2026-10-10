import React from 'react';
import { Calendar, CheckCircle2, Clock, Target } from 'lucide-react';
import { Card } from '../components/ui/card';
import Carousel from '../components/Carousel';
import phase1ValidationVisual from '../assets/roadmap/phase-1-validation.svg';
import phase2PilotVisual from '../assets/roadmap/phase-2-pilot-regulatory.svg';
import phase3CommissionVisual from '../assets/roadmap/phase-3-industrial-commissioning.svg';
import phase4ScaleVisual from '../assets/roadmap/phase-4-scale-expansion.svg';

const Roadmap = () => {
  const milestones = [
    {
      year: 'Year 1',
      period: '2025-2026',
      status: 'current',
      title: 'Technical Validation & Process Finalization',
      objectives: [
        'Complete hydrometallurgical pathway selection',
        'Finalize mechanical processing equipment specifications',
        'Conduct feedstock variability studies across 50+ PCB samples',
        'Engineer effluent management systems',
        'Develop detailed process flow diagrams (PFDs)',
        'Establish cost models and economic thresholds'
      ],
      deliverables: [
        'Technical Design Package',
        'Capital Expenditure (CapEx) Estimates',
        'Regulatory Compliance Roadmap'
      ]
    },
    {
      year: 'Year 2',
      period: '2026-2027',
      status: 'planned',
      title: 'Pilot-Scale Testing & Regulatory Submission',
      objectives: [
        'Commission pilot facility (100-200 kg/day PCB capacity)',
        'Validate recovery yields under real-world conditions',
        'Test effluent treatment and hazardous waste protocols',
        'Document operational data for regulatory submissions',
        'Submit applications for environmental clearances',
        'Establish supplier agreements with e-waste aggregators'
      ],
      deliverables: [
        'Pilot Operations Report',
        'Environmental Impact Assessment (EIA)',
        'Authorization Applications to SPCB/CPCB'
      ]
    },
    {
      year: 'Year 3',
      period: '2027-2028',
      status: 'future',
      title: 'Industrial Commissioning & Initial Operations',
      objectives: [
        'Secure all required regulatory authorizations',
        'Construct full-scale facility (1-2 tonnes/day PCB capacity)',
        'Install mechanical, hydrometallurgical, and refining systems',
        'Hire and train operational workforce',
        'Commission systems with controlled ramp-up',
        'Achieve first bullion-grade metal production'
      ],
      deliverables: [
        'Operational Facility',
        'First B2B Metal Sales',
        'Regulatory Compliance Certifications'
      ]
    },
    {
      year: 'Year 4+',
      period: '2028 Onward',
      status: 'vision',
      title: 'Scale, Optimization & Expansion',
      objectives: [
        'Optimize recovery yields and operational efficiency',
        'Expand feedstock sources beyond PCBs (e.g., catalytic converters)',
        'Evaluate polymer recovery systems (Phase II)',
        'Explore regional facility replication',
        'Develop circular gold brand positioning (Phase III)'
      ],
      deliverables: [
        'Multi-Metal Recovery Operations',
        'Regional Hub Status',
        'Brand Development Roadmap'
      ]
    }
  ];

  const checklistItems = [
    { phase: 'Technical', items: ['Process selection', 'Equipment specs', 'Yield modeling', 'Cost analysis'], status: 'in-progress' },
    { phase: 'Regulatory', items: ['EIA preparation', 'SPCB engagement', 'Hazardous waste protocols', 'Site clearances'], status: 'upcoming' },
    { phase: 'Infrastructure', items: ['Land acquisition', 'Civil construction', 'Equipment installation', 'Utilities setup'], status: 'upcoming' },
    { phase: 'Operations', items: ['Workforce hiring', 'Training programs', 'SOPs development', 'Quality systems'], status: 'future' }
  ];
  const statusLabelMap = {
    current: 'In Progress',
    planned: 'Planned',
    future: 'Upcoming',
    vision: 'Long-Range'
  };
  const timelineIcons = [Target, Calendar, CheckCircle2, Clock];
  const timelineVisuals = [
    {
      src: phase1ValidationVisual,
      label: 'Technical Validation Frame',
      alt: 'Technical validation dashboard visual'
    },
    {
      src: phase2PilotVisual,
      label: 'Pilot & Compliance Operations',
      alt: 'Pilot plant and regulatory checklist visual'
    },
    {
      src: phase3CommissionVisual,
      label: 'Industrial Commissioning Track',
      alt: 'Industrial commissioning and operations control visual'
    },
    {
      src: phase4ScaleVisual,
      label: 'Scale and Expansion Network',
      alt: 'Multi-site expansion and optimization visual'
    }
  ];
  const timelineCards = milestones.map((milestone, idx) => {
    const Icon = timelineIcons[idx % timelineIcons.length];
    const visual = timelineVisuals[idx] || null;
    return {
      id: idx + 1,
      title: milestone.title,
      description: milestone.objectives[0],
      icon: <Icon className="carousel-icon" />,
      kicker: `${milestone.year} | ${milestone.period}`,
      status: statusLabelMap[milestone.status] || 'Phase',
      highlights: milestone.objectives.slice(1, 3),
      tags: milestone.deliverables.slice(0, 2),
      image: visual?.src,
      imageLabel: visual?.label,
      imageAlt: visual?.alt,
      stats: {
        objectives: milestone.objectives.length,
        outputs: milestone.deliverables.length
      }
    };
  });
  const checklistStatusMeta = {
    'in-progress': {
      label: 'In Progress',
      progress: 65,
      badge: 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200',
      progressFill: 'bg-slate-800 dark:bg-slate-200',
      iconColor: 'text-slate-600 dark:text-slate-300',
      Icon: Clock
    },
    upcoming: {
      label: 'Queued',
      progress: 34,
      badge: 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200',
      progressFill: 'bg-slate-600 dark:bg-slate-400',
      iconColor: 'text-slate-500 dark:text-slate-400',
      Icon: Calendar
    },
    future: {
      label: 'Future',
      progress: 14,
      badge: 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200',
      progressFill: 'bg-slate-500 dark:bg-slate-500',
      iconColor: 'text-slate-500 dark:text-slate-400',
      Icon: Target
    }
  };
  const totalChecklistTasks = checklistItems.reduce((sum, phase) => sum + phase.items.length, 0);
  const activeChecklistPhases = checklistItems.filter((phase) => phase.status === 'in-progress').length;
  const riskRegister = [
    {
      title: 'Technical Risk',
      risk: 'Unproven recovery yields or process bottlenecks at production scale.',
      mitigation: 'Run Year 2 pilot validation with real feedstock before full-scale investment. Evaluate multiple process pathways during Year 1.',
      priority: 'High',
      phase: 'Pilot Validation'
    },
    {
      title: 'Regulatory Risk',
      risk: 'Delays in environmental clearances or authorization rejections.',
      mitigation: 'Use pre-compliance modeling and early SPCB engagement in design stage, with EIA prepared before formal applications.',
      priority: 'High',
      phase: 'Compliance Preparation'
    },
    {
      title: 'Capital Intensity',
      risk: 'High upfront CapEx with delayed revenue realization.',
      mitigation: 'Apply modular facility design for phased capital deployment and use copper recovery as early cash flow support.',
      priority: 'Medium',
      phase: 'Funding & Deployment'
    },
    {
      title: 'Market Volatility',
      risk: 'Gold and copper price fluctuations affecting unit economics.',
      mitigation: 'Maintain dual-metal revenue exposure and lock feedstock costs through long-term supplier contracts.',
      priority: 'Medium',
      phase: 'Commercial Operations'
    }
  ];
  const riskPriorityMeta = {
    High: 'border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200',
    Medium: 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200',
    Low: 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
  };
  const highPriorityRisks = riskRegister.filter((risk) => risk.priority === 'High').length;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative -mt-16 sm:-mt-20 lg:-mt-24 overflow-hidden pt-14 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-24 bg-[linear-gradient(115deg,#f4f7fb_0%,#EAFDE7_45%,#ffffff_100%)] dark:bg-[linear-gradient(115deg,#0a0f17_0%,#101826_50%,#01312D_100%)]">
        <div className="absolute inset-0 opacity-25 dark:opacity-16 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-300/18 dark:bg-emerald-700/16 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-teal-300/14 dark:bg-teal-700/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-white/80 dark:bg-slate-500/10 px-3.5 py-2">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Execution Blueprint
                </span>
              </div>

              <h1 className="mt-4 text-[2.2rem] sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[0.98] tracking-tight">
                Development
                <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400">
                  Roadmap
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                A disciplined, phased approach to building industrial-grade urban metal recovery infrastructure.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Timeline', value: '2025-2028+' },
                  { label: 'Strategic Phases', value: '4 Stages' },
                  { label: 'Delivery Model', value: 'Pilot to Scale' }
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
              <div className="rounded-2xl border border-gray-200 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/90 p-5 sm:p-6 lg:p-7 shadow-[0_12px_30px_rgba(15,23,42,0.10)] dark:shadow-[0_18px_38px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                    Phased Execution Stack
                  </p>
                  <span className="inline-flex rounded-md border border-slate-300/65 dark:border-emerald-400/45 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-200">
                    Active
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Technical Validation', status: 'Year 1', Icon: Target },
                    { title: 'Pilot & Regulatory', status: 'Year 2', Icon: Calendar },
                    { title: 'Industrial Launch', status: 'Year 3', Icon: CheckCircle2 },
                    { title: 'Scale Expansion', status: 'Year 4+', Icon: Clock }
                  ].map((item) => {
                    const Icon = item.Icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-xl border border-gray-200 dark:border-slate-700/80 bg-gray-50 dark:bg-slate-800/85 px-4 py-3.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="rounded-lg bg-slate-100 dark:bg-emerald-400/20 p-2">
                            <Icon className="h-4.5 w-4.5 text-emerald-700 dark:text-emerald-300" />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.12em] text-gray-500 dark:text-slate-300">
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug">
                          {item.title}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-xl border border-slate-300/60 dark:border-emerald-400/45 bg-slate-50/75 dark:bg-slate-500/15 px-4 py-3.5">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-200">
                    Execution Direction
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 font-medium leading-relaxed">
                    Validate at pilot scale first, then expand through fully compliant industrial commissioning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-14 sm:py-16 lg:py-20 overflow-hidden bg-[linear-gradient(180deg,#0f172a_0%,#111827_45%,#0b1220_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_18%,rgba(114,191,0,0.24),transparent_38%),radial-gradient(circle_at_80%_84%,rgba(114,191,0,0.18),transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5">
              <span className="inline-flex rounded-full border border-slate-300/50 bg-emerald-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                Route Overview
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Phased Development Timeline
              </h2>
              <p className="mt-4 max-w-xl text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
                Phase-by-phase execution guidance redesigned for compact mobile scanning and detailed desktop navigation.
              </p>

              <div className="mt-6 grid max-w-sm grid-cols-2 gap-3 lg:hidden">
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Total Phases</p>
                  <p className="mt-1 text-xl font-black text-white">{milestones.length}</p>
                </div>
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Horizon</p>
                  <p className="mt-1 text-xl font-black text-white">2025+</p>
                </div>
              </div>

              <div className="mt-4 space-y-3 lg:hidden">
                {milestones.map((milestone, idx) => (
                  <article
                    key={`mobile-${milestone.title}`}
                    className="rounded-xl border border-slate-700/70 bg-slate-900/55 px-3.5 py-3.5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-slate-300/60 bg-emerald-400/15 text-xs font-bold text-emerald-200">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          {milestone.year} | {milestone.period}
                        </p>
                        <h3 className="mt-1 text-[15px] font-semibold leading-tight text-slate-100">
                          {milestone.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-slate-300">
                          {milestone.objectives[0]}
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {milestone.deliverables.slice(0, 2).map((deliverable) => (
                            <span
                              key={`${milestone.title}-${deliverable}`}
                              className="inline-flex rounded-full border border-slate-600/80 bg-slate-800/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-200"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-7 -mx-1 hidden overflow-x-auto pb-2 sm:mt-8 lg:mx-0 lg:block lg:overflow-visible lg:pb-0">
                <div className="flex min-w-max gap-3 px-1 lg:min-w-0 lg:flex-col">
                  {milestones.map((milestone, idx) => (
                    <div
                      key={milestone.title}
                      className="flex min-w-[244px] flex-shrink-0 items-start gap-3 rounded-xl border border-slate-700/70 bg-slate-900/45 px-3.5 py-3 sm:min-w-[270px] lg:min-w-0 lg:flex-shrink"
                    >
                      <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-slate-300/60 bg-emerald-400/15 text-xs font-bold text-emerald-200">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          {milestone.year} | {milestone.period}
                        </p>
                        <p className="mt-1 text-sm sm:text-[15px] font-semibold leading-snug text-slate-100">
                          {milestone.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 hidden max-w-sm grid-cols-2 gap-3 lg:grid">
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Total Phases</p>
                  <p className="mt-1 text-xl sm:text-2xl font-black text-white">{milestones.length}</p>
                </div>
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Horizon</p>
                  <p className="mt-1 text-xl sm:text-2xl font-black text-white">2025+</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:col-span-7 lg:block lg:pl-1">
              <div className="rounded-2xl border border-slate-600/60 bg-slate-900/35 p-2.5 sm:rounded-3xl sm:p-4">
                <div style={{ height: '600px', position: 'relative', width: '100%', maxWidth: '620px', margin: '0 auto' }}>
                  <Carousel
                    items={timelineCards}
                    baseWidth={620}
                    autoplay={false}
                    autoplayDelay={3000}
                    pauseOnHover={false}
                    loop={false}
                    round={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Checklist */}
      <section className="py-20 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                Execution Control
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Development Milestone Checklist
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                A phase-by-phase control board to track readiness across engineering, compliance, infrastructure, and operations.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Phases</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{checklistItems.length}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Workstreams</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{totalChecklistTasks}</p>
                </div>
                <div className="col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Active Tracks</p>
                  <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{activeChecklistPhases} / {checklistItems.length} in progress</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-5">
                {checklistItems.map((checklist, idx) => {
                  const meta = checklistStatusMeta[checklist.status] || checklistStatusMeta.future;
                  const PhaseIcon = meta.Icon;

                  return (
                    <Card
                      key={idx}
                      className="overflow-hidden border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">{checklist.phase}</h3>
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${meta.badge}`}>
                          {meta.label}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-2.5">
                        <PhaseIcon className={`h-4 w-4 ${meta.iconColor}`} />
                        <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className={`h-full rounded-full ${meta.progressFill}`} style={{ width: `${meta.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-300">{meta.progress}%</span>
                      </div>

                      <ul className="mt-5 space-y-2.5">
                        {checklist.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <div className={`mt-0.5 h-5 w-5 rounded border flex items-center justify-center ${
                              checklist.status === 'in-progress'
                                ? 'border-slate-400 bg-slate-700 dark:border-slate-300 dark:bg-slate-200'
                                : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                            }`}>
                              {checklist.status === 'in-progress' ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-white dark:text-slate-900" />
                              ) : (
                                <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                              )}
                            </div>
                            <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Timeline */}
      <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                Risk Governance
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                Risk Mitigation Approach
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Structured risk controls are embedded into each execution phase, with pilot validation and compliance-first sequencing before scale expansion.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Risk Classes</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{riskRegister.length}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">High Priority</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{highPriorityRisks}</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Control Principle</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  De-risk through staged validation, regulatory alignment, and modular capital deployment.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-6 lg:space-y-7">
                {riskRegister.map((item, idx) => (
                  <Card key={idx} className="border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div className="px-5 py-5 sm:px-6 sm:py-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-8 min-w-8 items-center justify-center rounded border border-slate-300 bg-slate-100 px-2 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                              Risk {idx + 1}
                            </p>
                            <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${riskPriorityMeta[item.priority] || riskPriorityMeta.Low}`}>
                            {item.priority}
                          </span>
                          <span className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                            {item.phase}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Risk Statement</p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.risk}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Mitigation Plan</p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.mitigation}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Commitment */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Long-Horizon Commitment
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  This is a multi-year infrastructure project.
                </h2>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-4">
                  <p className="text-lg lg:text-xl text-slate-200 leading-relaxed">
                    Not a startup sprint. Not a proof-of-concept experiment.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-4">
                  <p className="text-lg lg:text-xl font-semibold text-white leading-relaxed">
                    Industrial systems designed to operate for decades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roadmap;


