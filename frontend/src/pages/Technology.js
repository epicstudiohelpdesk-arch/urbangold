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
            details: 'Investigating organic solvent systems for selective metal extraction—potentially reduces chemical consumption and effluent volume.'
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
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-bold mb-6">
            TECHNICAL EVALUATION PHASE
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Process Architecture & Technology Framework
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Design-stage systems engineered for maximum metal recovery, environmental compliance, 
            and industrial scalability.
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Process Architecture Overview
          </h2>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-yellow-600"></div>
            
            <div className="space-y-12">
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
                <div key={idx} className="relative pl-20">
                  <div className="absolute left-0 w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {idx + 1}
                  </div>
                  <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-bold text-amber-600 dark:text-amber-500 mb-2">{item.phase}</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Technical Sections */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Technical Deep Dive
          </h2>

          <Accordion type="single" collapsible className="space-y-6">
            {processStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-2 border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                  <AccordionTrigger className="px-8 py-6 hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors">
                    <div className="flex items-center space-x-4 text-left">
                      <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stage.title}</h3>
                        <span className="text-sm text-amber-600 dark:text-amber-500 font-medium">{stage.status}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 bg-gray-50 dark:bg-gray-850">
                    <div className="space-y-6">
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Objective</h4>
                        <p className="text-gray-700 dark:text-gray-300">{stage.content.objective}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Approaches Under Evaluation</h4>
                        <div className="space-y-4">
                          {stage.content.approaches.map((approach, i) => (
                            <div key={i} className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                              <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-amber-500 mr-2" />
                                {approach.name}
                              </h5>
                              <p className="text-sm text-gray-700 dark:text-gray-300 ml-6">{approach.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Expected Output</h4>
                        <p className="text-gray-700 dark:text-gray-300">{stage.content.output}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* Technical Image */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Industrial-Grade Systems
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Every component of the recovery system is designed to industrial standards—not laboratory 
                prototypes or scaled-down experiments.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Equipment selection prioritizes reliability, maintainability, and long operational lifespans 
                over cutting-edge complexity. Proven technology adapted to Indian feedstock conditions.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop"
                alt="Industrial Equipment"
                className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Technology Status Disclosure</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                All processes described on this page are in technical evaluation or design stage. 
                Urban Gold India has not yet commissioned operational facilities.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Proposed methodologies represent design intent based on engineering research and feasibility analysis. 
                Final process selection will be determined through pilot-scale validation and regulatory review.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
