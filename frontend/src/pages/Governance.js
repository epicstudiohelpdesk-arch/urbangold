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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Governance & Compliance
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Designed for regulatory alignment, environmental responsibility, and operational transparency.
          </p>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="p-8 lg:p-12 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-2xl">
            <div className="flex items-start space-x-4">
              <Shield className="h-12 w-12 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Compliance Before Operations
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Urban Gold India is committed to securing all required environmental and operational 
                  authorizations before commencing industrial operations.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Regulatory frameworks are being engineered into the facility design from the outset—not 
                  retrofitted after infrastructure is built. This approach ensures technical systems align 
                  with compliance requirements from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Frameworks */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-16">
            Governance Frameworks
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {frameworks.map((framework, idx) => {
              const Icon = framework.icon;
              return (
                <Card key={idx} className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-amber-500 dark:hover:border-amber-600 transition-all">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{framework.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {framework.principles.map((principle, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{principle}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regulatory Authorizations */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Required Regulatory Authorizations
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Consent to Establish (CTE)', authority: 'State Pollution Control Board (SPCB)', status: 'Pre-application Phase' },
              { title: 'Consent to Operate (CTO)', authority: 'SPCB', status: 'Post-commissioning' },
              { title: 'Hazardous Waste Authorization', authority: 'SPCB / CPCB', status: 'Pre-application Phase' },
              { title: 'Environmental Clearance', authority: 'State / MoEFCC (if required)', status: 'EIA Under Preparation' },
              { title: 'Factory License', authority: 'State Labour Department', status: 'Pre-application Phase' },
              { title: 'Fire Safety Certificate', authority: 'Fire Department', status: 'Post-construction' }
            ].map((auth, idx) => (
              <Card key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{auth.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{auth.authority}</p>
                <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-400 text-xs font-medium rounded-full">
                  {auth.status}
                </span>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Timeline Note:</strong> Regulatory authorization applications will be submitted only after 
                technical process finalization and environmental safeguard engineering are complete. Anticipated 
                submission window: Q2-Q3 2026 (Year 2 development phase).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Informal Sector Integration */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Informal Sector Integration Philosophy
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Urban Gold India recognizes that informal e-waste aggregators and dismantlers are integral to 
                the current supply chain. Rather than bypassing this ecosystem, we aim to formalize and integrate it.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Fair Pricing for Aggregators</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Transparent pricing based on metal content assays, not arbitrary estimates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Skill Development Pathways</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Training programs for informal workers to transition into formal facility roles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Partnership over Displacement</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Sourcing agreements with authorized aggregators create formal value chains.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1536382846503-832f3d8c7742?w=800&h=600&fit=crop"
                alt="Electronic Components"
                className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Commitment */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Transparency & Accountability
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Operational Data</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Recovery yields, metal outputs, and waste volumes will be documented and reported to regulatory authorities.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Environmental Performance</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Effluent quality, air emissions, and hazardous waste management data disclosed annually.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Community Engagement</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Local stakeholder consultations during facility design and ongoing dialogue post-commissioning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Compliance is not an afterthought.
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
            It's embedded in the engineering, the operations, and the culture of Urban Gold India.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Governance;
