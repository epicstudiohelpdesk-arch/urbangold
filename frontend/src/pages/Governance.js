import React from 'react';
import { Shield, Droplets, Users, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/card';

const Governance = () => {
  const frameworks = [
    {
      icon: Droplets,
      title: 'Environmental Framework',
      principles: [
        'Closed-loop chemical handling systems',
        'Zero discharge or controlled effluent within permissible limits',
        'Real-time monitoring of pH, heavy metals, and dissolved solids',
        'Emergency response protocols for chemical spills',
        'Periodic third-party environmental audits'
      ]
    },
    {
      icon: Shield,
      title: 'Hazardous Waste Compliance',
      principles: [
        'All non-recyclable residues classified per CPCB guidelines',
        'On-site secure storage in designated hazardous waste areas',
        'Transport and disposal only through authorized TSDFs',
        'Manifest tracking for all hazardous waste movements',
        'Annual waste audit and reporting to regulatory authorities'
      ]
    },
    {
      icon: Users,
      title: 'Worker Safety Model',
      principles: [
        'Personal protective equipment (PPE) mandatory for all chemical handling',
        'Ventilation and fume extraction in all processing areas',
        'Regular health monitoring for workforce exposure',
        'Safety training and standard operating procedure (SOP) adherence',
        'Emergency medical facilities and first-aid protocols'
      ]
    },
    {
      icon: FileText,
      title: 'Reporting & Monitoring Intent',
      principles: [
        'Monthly operational data logging and review',
        'Quarterly reporting to State Pollution Control Board (SPCB)',
        'Annual environmental performance disclosure',
        'Transparent communication with local community stakeholders',
        'Compliance documentation maintained for regulatory inspections'
      ]
    }
  ];
  const frameworkMeta = [
    { code: 'GF-01', domain: 'Environmental Controls' },
    { code: 'GF-02', domain: 'Hazardous Materials' },
    { code: 'GF-03', domain: 'Workforce Safety' },
    { code: 'GF-04', domain: 'Reporting & Oversight' }
  ];
  const totalFrameworkControls = frameworks.reduce((sum, framework) => sum + framework.principles.length, 0);
  const frameworkCardStyles = [
    {
      card: 'border-emerald-200/80 bg-[linear-gradient(150deg,#ffffff_0%,#ecfdf5_100%)] dark:border-emerald-700/55 dark:bg-[linear-gradient(150deg,#0f172a_0%,#072f2b_100%)]',
      icon: 'border-emerald-200 bg-emerald-100 dark:border-emerald-700/60 dark:bg-emerald-900/45',
      badge:
        'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700/65 dark:bg-emerald-900/45 dark:text-emerald-200',
      bullet: 'text-emerald-600 dark:text-emerald-300'
    },
    {
      card: 'border-cyan-200/80 bg-[linear-gradient(150deg,#ffffff_0%,#ecfeff_100%)] dark:border-cyan-700/55 dark:bg-[linear-gradient(150deg,#0f172a_0%,#0b2a35_100%)]',
      icon: 'border-cyan-200 bg-cyan-100 dark:border-cyan-700/60 dark:bg-cyan-900/45',
      badge: 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-700/65 dark:bg-cyan-900/45 dark:text-cyan-200',
      bullet: 'text-cyan-600 dark:text-cyan-300'
    },
    {
      card: 'border-amber-200/85 bg-[linear-gradient(150deg,#ffffff_0%,#fffbeb_100%)] dark:border-amber-700/55 dark:bg-[linear-gradient(150deg,#0f172a_0%,#30230b_100%)]',
      icon: 'border-amber-200 bg-amber-100 dark:border-amber-700/60 dark:bg-amber-900/45',
      badge:
        'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700/65 dark:bg-amber-900/45 dark:text-amber-200',
      bullet: 'text-amber-600 dark:text-amber-300'
    },
    {
      card: 'border-violet-200/80 bg-[linear-gradient(150deg,#ffffff_0%,#f5f3ff_100%)] dark:border-violet-700/55 dark:bg-[linear-gradient(150deg,#0f172a_0%,#291b4e_100%)]',
      icon: 'border-violet-200 bg-violet-100 dark:border-violet-700/60 dark:bg-violet-900/45',
      badge:
        'border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-700/65 dark:bg-violet-900/45 dark:text-violet-200',
      bullet: 'text-violet-600 dark:text-violet-300'
    }
  ];
  const regulatoryAuthorizations = [
    {
      code: 'RA-01',
      title: 'Consent to Establish (CTE)',
      authority: 'State Pollution Control Board (SPCB)',
      phase: 'Pre-application',
      targetWindow: 'Year 2, pre-construction',
      prerequisite: 'Process design and safeguard engineering pack finalized'
    },
    {
      code: 'RA-02',
      title: 'Consent to Operate (CTO)',
      authority: 'State Pollution Control Board (SPCB)',
      phase: 'Post-commissioning',
      targetWindow: 'After commissioning trials',
      prerequisite: 'CTE compliance evidence and trial-run data submitted'
    },
    {
      code: 'RA-03',
      title: 'Hazardous Waste Authorization',
      authority: 'SPCB / CPCB',
      phase: 'Pre-application',
      targetWindow: 'Year 2, alongside CTE filing',
      prerequisite: 'Waste classification protocol and storage plan approved'
    },
    {
      code: 'RA-04',
      title: 'Environmental Clearance',
      authority: 'State Authority / MoEFCC (if applicable)',
      phase: 'EIA preparation',
      targetWindow: 'Before formal filing window',
      prerequisite: 'EIA baseline studies and impact models completed'
    },
    {
      code: 'RA-05',
      title: 'Factory License',
      authority: 'State Labour Department',
      phase: 'Pre-application',
      targetWindow: 'Prior to workforce onboarding',
      prerequisite: 'Facility layout, safety controls, and staffing plan approved'
    },
    {
      code: 'RA-06',
      title: 'Fire Safety Certificate',
      authority: 'Fire Department',
      phase: 'Post-construction',
      targetWindow: 'Before start of plant operations',
      prerequisite: 'Fire systems installation and inspection clearances completed'
    }
  ];
  const authorizationPhaseStyles = {
    'Pre-application':
      'border-slate-300 bg-slate-50 text-emerald-800 dark:border-emerald-500/45 dark:bg-slate-500/12 dark:text-emerald-200',
    'EIA preparation':
      'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-500/45 dark:bg-blue-500/12 dark:text-blue-200',
    'Post-construction':
      'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200',
    'Post-commissioning':
      'border-slate-300 bg-slate-50 text-emerald-800 dark:border-emerald-500/45 dark:bg-slate-500/12 dark:text-emerald-200'
  };
  const uniqueAuthorizationAuthorities = new Set(regulatoryAuthorizations.map((item) => item.authority)).size;
  const transparencyCommitments = [
    {
      code: 'TA-01',
      title: 'Operational Data',
      cadence: 'Monthly capture, quarterly submission',
      owner: 'Operations & Compliance',
      scope: 'Recovery yields, metal output, and residue volumes tracked against process baselines.'
    },
    {
      code: 'TA-02',
      title: 'Environmental Performance',
      cadence: 'Continuous monitoring, annual disclosure',
      owner: 'EHS Team',
      scope: 'Effluent quality, air emissions, and hazardous waste handling indicators maintained for audit.'
    },
    {
      code: 'TA-03',
      title: 'Community Engagement',
      cadence: 'Design-stage consultations, post-commissioning updates',
      owner: 'External Affairs',
      scope: 'Structured communication with local stakeholders on environmental and operational performance.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative -mt-16 sm:-mt-20 lg:-mt-24 overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 bg-[linear-gradient(115deg,#f4f7fb_0%,#EAFDE7_45%,#ffffff_100%)] dark:bg-[linear-gradient(115deg,#0a0f17_0%,#101826_50%,#01312D_100%)]">
        <div className="absolute inset-0 opacity-25 dark:opacity-16 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-300/18 dark:bg-emerald-700/16 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-teal-300/14 dark:bg-teal-700/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-white/80 dark:bg-slate-500/10 px-3.5 py-2">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Regulatory First Model
                </span>
              </div>

              <h1 className="mt-4 text-[2.2rem] sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[0.98] tracking-tight">
                Governance &
                <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400">
                  Compliance
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                Designed for regulatory alignment, environmental responsibility, and operational transparency.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Framework Scope', value: 'EHS + Regulatory' },
                  { label: 'Control Principle', value: 'Compliance First' },
                  { label: 'Reporting Mode', value: 'Audit-Ready' }
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
                    Governance Stack
                  </p>
                  <span className="inline-flex rounded-md border border-slate-300/65 dark:border-emerald-400/45 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-200">
                    Structured
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Environmental Framework', status: 'Core', Icon: Droplets },
                    { title: 'Hazardous Waste Controls', status: 'Core', Icon: Shield },
                    { title: 'Worker Safety Model', status: 'Active', Icon: Users },
                    { title: 'Reporting & Monitoring', status: 'Active', Icon: FileText }
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
                    Operating Rule
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 font-medium leading-relaxed">
                    Compliance requirements are engineered into systems before operations begin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 dark:border-slate-700 dark:bg-slate-900">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-100 p-2.5 dark:border-slate-700 dark:bg-slate-800">
                    <Shield className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Governance Principle
                    </p>
                    <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                      Compliance Before Operations
                    </h2>
                  </div>
                </div>

                <p className="mt-5 text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Urban Gold India is committed to securing all required environmental and operational authorizations before commencing industrial operations.
                </p>
                <p className="mt-4 text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Regulatory frameworks are engineered into facility design from the outset, not retrofitted after infrastructure is built.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Authorization Sequence
                    </p>
                    <ol className="mt-3 space-y-2">
                      {[
                        'Process and safeguard design completion',
                        'Regulatory application filing and review',
                        'Operations start after formal approvals'
                      ].map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Control Measures
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        'Design-stage compliance mapping',
                        'Documentation aligned to inspection standards',
                        'Operational SOPs tied to permit conditions'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-slate-500 dark:text-slate-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900/80">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Assurance
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    This sequence is designed to ensure technical systems and operating permissions stay aligned from day one of industrial deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Frameworks */}
      <section className="py-20 lg:py-24 bg-slate-100 dark:bg-[#060a12]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Compliance Matrix
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                Governance Frameworks
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Four integrated frameworks define environmental stewardship, worker safety, and reporting discipline across operations.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Frameworks</p>
                  <p className="mt-0.5 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{frameworks.length}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Control Points</p>
                  <p className="mt-0.5 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{totalFrameworkControls}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 sm:mt-5 sm:px-4 sm:py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Governance Standard
                </p>
                <p className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Documented controls, role accountability, and audit-ready reporting integrated into daily operations.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 lg:order-1">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                {frameworks.map((framework, idx) => {
                  const Icon = framework.icon;
                  const meta = frameworkMeta[idx] || { code: `GF-0${idx + 1}`, domain: 'Governance Domain' };
                  const cardStyle = frameworkCardStyles[idx % frameworkCardStyles.length];
                  return (
                    <Card
                      key={idx}
                      className={`border p-3 sm:p-5 shadow-sm ${cardStyle.card}`}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className={`rounded-lg border p-1.5 sm:p-2 ${cardStyle.icon}`}>
                            <Icon className="h-4.5 w-4.5 text-slate-700 dark:text-slate-200" />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                              {meta.code}
                            </p>
                            <h3 className="mt-0.5 text-base sm:text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                              {framework.title}
                            </h3>
                          </div>
                        </div>
                        <span className={`inline-flex w-fit rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${cardStyle.badge}`}>
                          {meta.domain}
                        </span>
                      </div>

                      <div className="mt-2.5 rounded-lg border border-slate-200/90 bg-white/75 px-2.5 py-2 dark:border-slate-700/80 dark:bg-slate-800/55 sm:mt-4 sm:px-3.5 sm:py-2.5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          Control Checklist ({framework.principles.length})
                        </p>
                      </div>

                      <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2.5">
                        {framework.principles.map((principle, i) => (
                          <li key={i} className="flex items-start gap-2 rounded-lg bg-white/70 px-2 py-1.5 dark:bg-slate-800/40 sm:bg-transparent sm:px-0 sm:py-0">
                            <CheckCircle2 className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5 ${cardStyle.bullet}`} />
                            <span className="text-[12px] sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">{principle}</span>
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

      {/* Regulatory Authorizations */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Permit Strategy
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Required Regulatory Authorizations
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Core permits are structured as a staged filing program tied to design completion, safety controls, and commissioning milestones.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Authorizations
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{regulatoryAuthorizations.length}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Authorities
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{uniqueAuthorizationAuthorities}</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Submission Rule
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Applications proceed only after technical process finalization and environmental safeguard engineering are closed.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 lg:order-1">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-700 dark:bg-slate-900/60">
                <div className="grid sm:grid-cols-2 gap-4">
                  {regulatoryAuthorizations.map((auth, idx) => {
                    const phaseStyle =
                      authorizationPhaseStyles[auth.phase] ||
                      'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200';
                    return (
                      <Card key={idx} className="border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            {auth.code}
                          </p>
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${phaseStyle}`}
                          >
                            {auth.phase}
                          </span>
                        </div>

                        <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white leading-snug">{auth.title}</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{auth.authority}</p>

                        <div className="mt-4 space-y-3 border-t border-slate-200 pt-3 dark:border-slate-700">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                              Target Window
                            </p>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{auth.targetWindow}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                              Prerequisite
                            </p>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{auth.prerequisite}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 dark:border-emerald-500/45 dark:bg-slate-500/10">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="h-5 w-5 text-emerald-700 dark:text-emerald-300 flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-100">
                    Planned filing window is Q2-Q3 2026 (Year 2 development phase), once process engineering and safeguard controls complete internal gate review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informal Sector Integration */}
      <section className="py-20 lg:py-24 bg-slate-100 dark:bg-[#060b14]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Inclusion Strategy
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Informal Sector Integration Philosophy
              </h2>
              <p className="mt-4 text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Urban Gold India recognizes informal aggregators and dismantlers as core contributors to the existing e-waste flow. The objective is formal integration, not displacement.
              </p>
              <p className="mt-4 text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                The model combines transparent pricing, capability building, and long-term sourcing partnerships to create a stable and compliant supply network.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Pricing Model</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-snug">Assay-Linked</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Workforce Path</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-snug">Training-Backed</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Network Type</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-snug">Partner-Led</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-700 dark:bg-slate-900">
                <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1536382846503-832f3d8c7742?w=1200&h=700&fit=crop"
                    alt="Electronic components and e-waste feedstock"
                    className="h-52 w-full object-cover sm:h-56"
                  />
                  <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/70">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Field Context
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      Integration pathways are built around the current informal collection ecosystem to improve traceability and compliance.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      code: 'IS-01',
                      title: 'Fair Pricing for Aggregators',
                      detail: 'Pricing linked to metal content assays for consistent and transparent procurement.'
                    },
                    {
                      code: 'IS-02',
                      title: 'Skill Development Pathways',
                      detail: 'Structured training for informal workers to transition into formal operational roles.'
                    },
                    {
                      code: 'IS-03',
                      title: 'Partnership over Displacement',
                      detail: 'Long-term sourcing contracts with authorized aggregators to stabilize feedstock.'
                    },
                    {
                      code: 'IS-04',
                      title: 'Compliance Enablement',
                      detail: 'Onboarding standards aligned to documentation, traceability, and safety requirements.'
                    }
                  ].map((item) => (
                    <Card key={item.code} className="border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/65">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                        {item.code}
                      </p>
                      <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {item.detail}
                      </p>
                    </Card>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-800/55">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Integration Outcome
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    A traceable supply chain where informal participation is formalized through commercial fairness, technical upskilling, and compliance-ready operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Commitment */}
      <section className="py-20 lg:py-24 bg-slate-50 dark:bg-[#050914]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Disclosure Framework
              </p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Transparency & Accountability
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Reporting standards are defined as operating controls with fixed ownership, cadence, and documented evidence trails.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Reporting Streams</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{transparencyCommitments.length}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Audit Orientation</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-tight">Regulatory + Stakeholder</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Accountability Rule
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Every disclosure item is assigned to a responsible function with periodic review and retrievable records.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 lg:order-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-700 dark:bg-slate-900">
                <div className="space-y-4">
                  {transparencyCommitments.map((item) => (
                    <Card key={item.code} className="border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-700 dark:bg-slate-800/60">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            {item.code}
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                        </div>
                        <span className="inline-flex rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
                          {item.cadence}
                        </span>
                      </div>

                      <div className="mt-4 grid sm:grid-cols-2 gap-3">
                        <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 dark:border-slate-700 dark:bg-slate-900">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Owner</p>
                          <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">{item.owner}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 dark:border-slate-700 dark:bg-slate-900">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Reporting Scope</p>
                          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.scope}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="relative overflow-hidden py-20 lg:py-24 bg-[linear-gradient(120deg,#0b1220_0%,#0f1729_45%,#1b1308_100%)] text-white">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="absolute -top-20 right-6 h-64 w-64 rounded-full bg-slate-500/12 blur-3xl" />
        <div className="absolute -bottom-16 left-0 h-64 w-64 rounded-full bg-blue-500/12 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                Operating Doctrine
              </p>
              <h2 className="mt-4 text-4xl lg:text-6xl font-bold leading-tight">
                Compliance is not
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200">
                  an afterthought.
                </span>
              </h2>
              <p className="mt-5 text-base sm:text-lg lg:text-2xl text-slate-300 leading-relaxed max-w-3xl">
                It is embedded into engineering decisions, operating controls, and reporting structures before industrial execution begins.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Design Layer', value: 'Permit-Aligned Engineering' },
                  { label: 'Execution Layer', value: 'Control-Based Operations' },
                  { label: 'Oversight Layer', value: 'Audit-Ready Disclosure' }
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/18 bg-white/8 px-4 py-3.5 backdrop-blur-[2px]">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-slate-300">{item.label}</p>
                    <p className="mt-1.5 text-sm font-semibold text-white leading-snug">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/18 bg-slate-900/55 p-5 sm:p-6 backdrop-blur-[2px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300">
                  Governance Execution Standard
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    'Authorizations mapped to project gates before operations.',
                    'Environmental and safety controls validated prior to deployment.',
                    'Defined ownership and cadence for every disclosure stream.'
                  ].map((line, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed text-slate-200">{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/16 bg-black/20 px-3.5 py-3">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Gate Policy</p>
                    <p className="mt-1 text-sm font-semibold text-white">Approval Before Startup</p>
                  </div>
                  <div className="rounded-lg border border-white/16 bg-black/20 px-3.5 py-3">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Control Posture</p>
                    <p className="mt-1 text-sm font-semibold text-white">Documentation-First</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Governance;


