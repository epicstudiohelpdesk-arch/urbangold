import React from 'react';
import { Settings, Droplets, Zap, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const Technology = () => {
  const processStages = [
    {
      title: 'Mechanical Pre-Processing Design Principles',
      icon: Settings,
      status: 'Design Stage',
      content: {
        objective: 'Transform heterogeneous PCB waste into concentrated metallic fractions for downstream extraction.',
        approaches: [
          {
            name: 'Dismantling & Segregation',
            details: 'Manual separation of high-value components (CPUs, memory modules) from bulk PCB material. Component-level segregation maximizes recovery efficiency.'
          },
          {
            name: 'Mechanical Shredding',
            details: 'Multi-stage size reduction using hammer mills and granulators to liberate metal particles from polymer matrices.'
          },
          {
            name: 'Density-Based Separation',
            details: 'Air classification and gravity separation to concentrate heavy metal fractions (gold, copper) and remove plastic/resin components.'
          },
          {
            name: 'Magnetic & Eddy Current Separation',
            details: 'Removal of ferrous and non-ferrous base metals prior to precious metal processing.'
          }
        ],
        output: 'High-grade PCB concentrate (15-20% metal content by weight) ready for hydrometallurgical processing.'
      }
    },
    {
      title: 'Hydrometallurgical Pathway Evaluation',
      icon: Droplets,
      status: 'Under Evaluation',
      content: {
        objective: 'Selectively dissolve and recover precious metals from concentrated PCB fractions with maximum yield and minimum environmental impact.',
        approaches: [
          {
            name: 'Base Metal Leaching',
            details: 'Controlled acid leaching (sulfuric or nitric acid) to dissolve copper and other base metals, leaving precious metal-enriched residue.'
          },
          {
            name: 'Precious Metal Dissolution',
            details: 'Evaluation of aqua regia, thiourea, or alternative lixiviants for gold and silver dissolution. Process selection balances yield, safety, and effluent complexity.'
          },
          {
            name: 'Selective Precipitation',
            details: 'Sequential chemical precipitation to isolate gold, silver, and palladium from solution. pH control and reagent selection critical for purity.'
          },
          {
            name: 'Solvent Extraction (Alternative)',
            details: 'Investigating organic solvent systems for selective metal extractionâ€”potentially reduces chemical consumption and effluent volume.'
          }
        ],
        output: 'Crude precious metal precipitates (85-90% purity) for refining, plus copper-rich solutions for base metal recovery.'
      }
    },
    {
      title: 'Recovery Yield Modeling Approach',
      icon: Zap,
      status: 'Analytical Phase',
      content: {
        objective: 'Establish realistic recovery targets based on feedstock variability and process efficiency constraints.',
        approaches: [
          {
            name: 'Feedstock Characterization',
            details: 'Assay analysis of representative PCB samples to establish baseline metal concentrations (Au, Ag, Cu, Pd).'
          },
          {
            name: 'Process Efficiency Assumptions',
            details: 'Conservative estimates: 90-95% mechanical recovery, 85-90% hydrometallurgical recovery, 95%+ refining efficiency.'
          },
          {
            name: 'Economic Threshold Modeling',
            details: 'Minimum viable metal grades required for profitable operation given processing costs, labor, and regulatory compliance overhead.'
          }
        ],
        output: 'Target overall recovery: 80-85% of contained precious metals in feedstock, balancing technical feasibility and economic viability.'
      }
    },
    {
      title: 'Effluent and Waste Neutralization Planning',
      icon: Shield,
      status: 'Pre-Design Phase',
      content: {
        objective: 'Engineer closed-loop or near-closed-loop systems to minimize environmental discharge and ensure regulatory compliance.',
        approaches: [
          {
            name: 'Acid Neutralization',
            details: 'Controlled pH adjustment using lime or caustic soda to precipitate dissolved metals from spent leach solutions. Resulting sludge requires hazardous waste disposal.'
          },
          {
            name: 'Water Recovery Systems',
            details: 'Evaluating reverse osmosis or evaporative recovery to recycle process water and concentrate dissolved solids for controlled disposal.'
          },
          {
            name: 'Hazardous Waste Classification',
            details: 'All non-recyclable residues will be characterized per CPCB guidelines and disposed through authorized Treatment, Storage, and Disposal Facilities (TSDFs).'
          },
          {
            name: 'Air Emission Controls',
            details: 'Scrubber systems for any gaseous emissions from thermal or chemical processes. No open combustion.'
          }
        ],
        output: 'Designed effluent discharge within permissible limits; hazardous waste generation minimized and managed through licensed channels.'
      }
    }
  ];

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
                  Technical Evaluation Phase
                </span>
              </div>

              <h1 className="mt-4 text-[2.2rem] sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[0.98] tracking-tight">
                Process Architecture &
                <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400">
                  Technology Framework
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                Design-stage systems engineered for maximum metal recovery, environmental compliance, and industrial scalability.
              </p>

              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'System Maturity', value: 'Design Stage' },
                  { label: 'Recovery Target', value: '80-85%' },
                  { label: 'Core Principle', value: 'Compliance by Design' }
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
                    System Evaluation Stack
                  </p>
                  <span className="inline-flex rounded-md border border-slate-300/65 dark:border-emerald-400/45 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-200">
                    Active
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      title: 'Mechanical Pre-Processing',
                      status: 'Design Review',
                      Icon: Settings
                    },
                    {
                      title: 'Hydromet Pathway',
                      status: 'Under Evaluation',
                      Icon: Droplets
                    },
                    {
                      title: 'Yield Modeling',
                      status: 'Analytical Phase',
                      Icon: Zap
                    },
                    {
                      title: 'Effluent Controls',
                      status: 'Pre-Design',
                      Icon: Shield
                    }
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
                    Engineering Direction
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 font-medium leading-relaxed">
                    Prioritize process reliability and regulatory compliance before scale acceleration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-slate-50 dark:bg-[#0b1118] overflow-hidden">
        <div className="absolute inset-0 opacity-25 dark:opacity-14 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-emerald-300/18 dark:bg-emerald-700/12 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-teal-300/12 dark:bg-teal-700/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-gray-200 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/80 p-5 sm:p-6">
                <div className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50 dark:bg-slate-500/10 px-3 py-1.5">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                    Process Flow Map
                  </span>
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.03] tracking-tight">
                  Process Architecture Overview
                </h2>
                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  End-to-end processing sequence from authorized feedstock intake to certified metal output and compliant residue management.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'Flow Stages', value: '05' },
                    { label: 'Core Blocks', value: '03' },
                    { label: 'Output Grade', value: '99.9%+' }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-gray-200 dark:border-slate-700/80 bg-gray-50 dark:bg-slate-800/70 px-2.5 py-3 text-center"
                    >
                      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 dark:text-slate-400">{item.label}</p>
                      <p className="mt-1 text-sm sm:text-base font-black text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 gap-7 sm:gap-8">
              {[
                {
                  phase: 'Input',
                  title: 'Feedstock Acquisition',
                  description: 'Source segregated PCB waste from authorized e-waste aggregators and dismantlers. Quality control at intake to ensure metal-bearing material.'
                },
                {
                  phase: 'Stage 1',
                  title: 'Mechanical Processing',
                  description: 'Physical size reduction and density-based separation to produce metal-enriched concentrate. No chemical reagents at this stage.'
                },
                {
                  phase: 'Stage 2',
                  title: 'Hydrometallurgical Extraction',
                  description: 'Controlled leaching and precipitation to selectively recover precious and base metals. Closed-loop acid management.'
                },
                {
                  phase: 'Stage 3',
                  title: 'Refining & Assay',
                  description: 'Electro-refining to achieve bullion-grade purity (99.9%+). Third-party assay verification before sale.'
                },
                {
                  phase: 'Output',
                  title: 'Metal Products & Waste Management',
                  description: 'Certified gold, silver, copper bullion for B2B sale. Hazardous waste residues sent to authorized TSDFs.'
                }
              ].map((item, idx) => (
                <Card
                  key={item.title}
                  className="rounded-2xl border border-gray-200 dark:border-slate-700/85 bg-white/95 dark:!bg-slate-900 p-5 sm:p-6 shadow-[0_8px_20px_rgba(15,23,42,0.06)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-900 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-white">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-md border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50 dark:bg-slate-500/10 px-2 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                          {item.phase}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 uppercase tracking-[0.12em]">
                          Step {idx + 1} of 5
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg sm:text-2xl font-black text-gray-900 dark:text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Technical Sections */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-white dark:bg-[#070b12] overflow-hidden">
        <div className="absolute inset-0 opacity-20 dark:opacity-14 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-emerald-300/16 dark:bg-emerald-700/12 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50 dark:bg-slate-500/10 px-3.5 py-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                Technical Modules
              </span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.04] tracking-tight">
              Technical Deep Dive
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Detailed evaluation view of each process module, including objective scope, candidate approaches, and expected output profile.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-8 space-y-4 sm:space-y-5">
            {processStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-2xl border border-gray-200 dark:border-slate-700/85 bg-white dark:bg-slate-900/85 shadow-[0_8px_20px_rgba(15,23,42,0.06)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.35)] overflow-hidden"
                >
                  <AccordionTrigger className="px-5 sm:px-6 py-5 sm:py-6 hover:no-underline hover:bg-gray-50 dark:hover:bg-slate-800/70 transition-colors">
                    <div className="flex items-center gap-3 sm:gap-4 text-left">
                      <div className="h-11 w-11 rounded-lg bg-slate-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex rounded-md border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50 dark:bg-slate-500/10 px-2 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                            Module {idx + 1}
                          </span>
                          <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-slate-400">
                            {stage.status}
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-base sm:text-xl font-bold text-gray-900 dark:text-white leading-snug">
                          {stage.title}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 bg-gray-50 dark:bg-slate-800/55">
                    <div className="space-y-4">
                      <div className="rounded-xl border border-slate-200/85 dark:border-emerald-700/60 bg-slate-50/90 dark:!bg-slate-900/95 px-4 py-3.5">
                        <h4 className="text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-300">Objective</h4>
                        <p className="mt-1.5 text-sm text-emerald-900 dark:text-slate-100 leading-relaxed">{stage.content.objective}</p>
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-3">
                          Approaches Under Evaluation
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {stage.content.approaches.map((approach, i) => (
                            <div
                              key={i}
                              className="rounded-xl border border-gray-200 dark:border-slate-700/85 bg-white dark:bg-slate-900/80 px-4 py-3.5"
                            >
                              <h5 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                                {approach.name}
                              </h5>
                              <p className="mt-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {approach.details}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-green-200 dark:border-green-800/70 bg-green-50 dark:bg-green-950/25 px-4 py-3.5">
                        <h4 className="text-sm sm:text-base font-bold text-green-900 dark:text-green-100">Expected Output</h4>
                        <p className="mt-1.5 text-sm text-green-900 dark:text-green-100 leading-relaxed">{stage.content.output}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
      {/* Industrial-Grade Systems */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-gray-50 dark:bg-[#090d14] overflow-hidden">
        <div className="absolute inset-0 opacity-20 dark:opacity-14 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:34px_34px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 dark:border-emerald-500/35 bg-slate-50 dark:bg-slate-500/10 px-3.5 py-2">
                <Shield className="h-4.5 w-4.5 text-emerald-700 dark:text-emerald-300" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  Engineering Standard
                </span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.04] tracking-tight">
                Industrial-Grade Systems
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Every component of the recovery stack is designed to industrial standards, not laboratory prototypes or scaled-down experiments.
              </p>
              <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Equipment selection prioritizes reliability, maintainability, and long operational life over unnecessary complexity, with architecture adapted to Indian feedstock variability.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
                {[
                  {
                    title: 'Reliability-First Hardware',
                    text: 'Component and subsystem choices optimized for stable, repeatable operations.'
                  },
                  {
                    title: 'Maintainability by Design',
                    text: 'Serviceability and parts replacement paths built into equipment planning.'
                  },
                  {
                    title: 'Long-Horizon Operation',
                    text: 'Lifecycle durability prioritized over short-term performance spikes.'
                  },
                  {
                    title: 'Feedstock Adaptability',
                    text: 'Process hardware tuned for heterogeneous PCB input conditions.'
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 px-4 py-3.5"
                  >
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{item.title}</p>
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 p-3 shadow-[0_12px_28px_rgba(15,23,42,0.10)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                <img
                  src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=860&fit=crop"
                  alt="Industrial Equipment"
                  className="h-56 sm:h-64 w-full rounded-xl object-cover"
                />
                <p className="mt-3 px-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Infrastructure intended for sustained industrial throughput under compliance-controlled operation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-300/60 dark:border-emerald-500/35 bg-slate-50/75 dark:bg-slate-500/10 p-5 sm:p-6">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-200">
                  System Posture
                </p>
                <p className="mt-2.5 text-sm sm:text-base text-emerald-900 dark:text-emerald-100 leading-relaxed">
                  Proven industrial methods, controlled process windows, and serviceable equipment architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(114,191,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(114,191,0,0.12)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-20 right-10 h-56 w-56 rounded-full bg-slate-500/14 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/40 bg-emerald-300/10 px-3.5 py-2">
                <AlertTriangle className="h-4.5 w-4.5 text-emerald-300" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-emerald-200">
                  Compliance Disclosure
                </span>
              </div>

              <h3 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.04] tracking-tight">
                Technology Status Disclosure
              </h3>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                All processes described on this page are currently in technical evaluation or design stage.
                Urban Gold India has not yet commissioned operational facilities.
              </p>
              <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                Methodologies shown represent engineering intent informed by research and feasibility analysis.
                Final process selection will be determined through pilot-scale validation and regulatory review.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {['Design-stage only', 'No commercial operations yet', 'Pilot validation pending'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-[11px] sm:text-xs text-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-white">Current Status</h4>
                <div className="mt-4 space-y-3">
                  {[
                    'Process pathway under technical evaluation',
                    'Yield assumptions pending pilot confirmation',
                    'Compliance pathways subject to regulator review'
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-300 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-300/40 bg-slate-500/10 p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-emerald-100">Decision Gate</h4>
                <p className="mt-2.5 text-sm sm:text-base text-emerald-100 leading-relaxed">
                  Engineering finalization will proceed only after pilot-scale proof and formal regulatory alignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;



