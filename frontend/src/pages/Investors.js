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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Investment Opportunity
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Building India's precision urban metal recovery infrastructure—a capital-intensive, 
            technically disciplined, long-term value creation opportunity.
          </p>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white h-14 px-10 text-base">
            <Download className="mr-2 h-5 w-5" />
            Download Executive Brief
          </Button>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-16">
            Why Urban Metal Recovery
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {investmentHighlights.map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <Card key={idx} className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-600 transition-all group">
                  <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{highlight.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{highlight.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Context */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Structural Demand for Gold & Copper
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Gold Market Fundamentals</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Global gold demand remains strong driven by jewelry, investment, and central bank purchases. 
                    Recycled gold accounts for ~25-30% of annual supply.
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-500 font-medium">
                    Current Gold Price: ₹6,500-7,000/gram (~$2,000-2,100/oz)
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Copper as Base Revenue</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Copper comprises 20-30% of PCB weight—providing reliable cash flow even during precious metal 
                    price volatility. India imports ~50% of copper demand.
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-500 font-medium">
                    Current Copper Price: ₹750-850/kg (~$9,000-10,000/tonne)
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1524514587686-e2909d726e9b?w=800&h=600&fit=crop"
                alt="Metal Gears"
                className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-16">
            Phased Revenue Model
          </h2>

          <div className="space-y-8">
            {revenuePhases.map((phase, idx) => (
              <Card key={idx} className={`p-8 lg:p-10 border-2 ${
                idx === 0 
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800' 
                  : 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-gray-200 dark:border-gray-700'
              }`}>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div>
                    <div className="text-sm font-bold text-amber-600 dark:text-amber-500 tracking-wider mb-2">
                      {phase.phase}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{phase.title}</h3>
                    <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                      {phase.period}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Revenue Streams</h4>
                    <ul className="space-y-2">
                      {phase.streams.map((stream, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{stream}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Business Model</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{phase.model}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Framework */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Risk Mitigation Framework
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
            ].map((item, idx) => (
              <Card key={idx} className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.risk} Risk</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    item.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    item.severity.includes('Medium') ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{item.mitigation}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Stage */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Development Stage & Capital Discipline
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800 h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Current Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-200 dark:border-amber-800">
                    <span className="text-gray-700 dark:text-gray-300">Development Phase</span>
                    <span className="font-bold text-gray-900 dark:text-white">Year 1 (Technical Design)</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-amber-200 dark:border-amber-800">
                    <span className="text-gray-700 dark:text-gray-300">Operational Status</span>
                    <span className="font-bold text-gray-900 dark:text-white">Pre-operational</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-amber-200 dark:border-amber-800">
                    <span className="text-gray-700 dark:text-gray-300">Regulatory Authorizations</span>
                    <span className="font-bold text-gray-900 dark:text-white">Pre-application</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Timeline to Operations</span>
                    <span className="font-bold text-gray-900 dark:text-white">24-30 months</span>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700 h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Capital Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Phase I (Pilot)</span>
                      <span className="font-bold text-xl text-amber-600 dark:text-amber-500">$3-5M</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Technical finalization, pilot commissioning, regulatory submissions
                    </p>
                  </div>
                  <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Phase II (Industrial)</span>
                      <span className="font-bold text-xl text-amber-600 dark:text-amber-500">$8-12M</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Full-scale facility construction, equipment installation, working capital
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Opportunities */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Engagement Opportunities
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-center">
              <DollarSign className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Equity Investment</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Long-term equity partnership for infrastructure development and scaling
              </p>
            </Card>

            <Card className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-center">
              <PieChart className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Strategic Partnership</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Joint ventures with metal refiners, e-waste aggregators, or technology providers
              </p>
            </Card>

            <Card className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-center">
              <Shield className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Debt Financing</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Project finance for equipment, infrastructure, and working capital (post-pilot validation)
              </p>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white h-14 px-10 text-base">
              Request Investor Deck
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            This is not a quick-exit opportunity.
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6">
            We're seeking patient capital aligned with long-term infrastructure development—not quarterly 
            milestones or premature growth metrics.
          </p>
          <p className="text-xl lg:text-2xl text-amber-400 font-medium">
            Industrial systems. Decade+ horizons. Disciplined execution.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Investors;
