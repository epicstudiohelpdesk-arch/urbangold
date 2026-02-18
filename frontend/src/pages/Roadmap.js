import React from 'react';
import { Calendar, CheckCircle2, Clock, Target } from 'lucide-react';
import { Card } from '../components/ui/card';

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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Development Roadmap
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            A disciplined, phased approach to building industrial-grade urban metal recovery infrastructure.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-16">
            Phased Development Timeline
          </h2>

          <div className="space-y-12">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative">
                {/* Connector Line */}
                {idx < milestones.length - 1 && (
                  <div className="absolute left-8 top-24 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-500 transform translate-y-8"></div>
                )}

                <Card className={`p-8 lg:p-10 border-2 ${
                  milestone.status === 'current' 
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-500 dark:border-amber-600' 
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    {/* Year Badge */}
                    <div className="flex-shrink-0 mb-6 lg:mb-0">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        milestone.status === 'current' ? 'bg-amber-500' :
                        milestone.status === 'planned' ? 'bg-orange-500' :
                        milestone.status === 'future' ? 'bg-yellow-600' :
                        'bg-gray-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="mt-3 text-center">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{milestone.year}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{milestone.period}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                        {milestone.status === 'current' && (
                          <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                            IN PROGRESS
                          </span>
                        )}
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Objectives */}
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Target className="h-5 w-5 text-amber-500 mr-2" />
                            Key Objectives
                          </h4>
                          <ul className="space-y-2">
                            {milestone.objectives.map((obj, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Deliverables */}
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                            Expected Deliverables
                          </h4>
                          <div className="space-y-3">
                            {milestone.deliverables.map((deliverable, i) => (
                              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Checklist */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Development Milestone Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {checklistItems.map((checklist, idx) => (
              <Card key={idx} className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{checklist.phase}</h3>
                  {checklist.status === 'in-progress' && (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                  {checklist.status === 'upcoming' && (
                    <Calendar className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <ul className="space-y-2">
                  {checklist.items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        checklist.status === 'in-progress' 
                          ? 'border-amber-500 bg-amber-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {checklist.status === 'in-progress' && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Management Timeline */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Risk Mitigation Approach
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technical Risk</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Risk:</strong> Unproven recovery yields or process bottlenecks at scale.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Mitigation:</strong> Year 2 pilot validation with real feedstock before full-scale investment. 
                Multiple process pathways evaluated during Year 1.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Regulatory Risk</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Risk:</strong> Delays in environmental clearances or authorization rejections.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Mitigation:</strong> Pre-compliance modeling and SPCB engagement during design phase. 
                EIA preparation before formal applications.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Capital Intensity</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Risk:</strong> High upfront CapEx with delayed revenue realization.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Mitigation:</strong> Modular facility design allows phased capital deployment. 
                Copper recovery provides early cash flow before precious metal optimization.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Market Volatility</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Risk:</strong> Gold and copper price fluctuations affecting profitability.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Mitigation:</strong> Dual revenue streams (precious + base metals) reduce single-commodity exposure. 
                Long-term supplier contracts lock in feedstock costs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Commitment */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            This is a multi-year infrastructure project.
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6">
            Not a startup sprint. Not a proof-of-concept experiment.
          </p>
          <p className="text-xl lg:text-2xl text-amber-400 font-medium">
            Industrial systems designed to operate for decades.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Roadmap;
