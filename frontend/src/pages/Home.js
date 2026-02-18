import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Recycle, Building2, TrendingUp, Shield, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Home = () => {
  const opportunities = [
    {
      title: 'Electronic Waste as Industrial Feedstock',
      description: 'India generates substantial volumes of electronic waste annually, with significant portions processed inefficiently or informally.',
      large: true
    },
    {
      title: 'High Metal Density',
      description: 'Printed circuit boards contain recoverable concentrations of gold, silver, copper and trace metals.'
    },
    {
      title: 'Infrastructure Gap',
      description: 'Domestic industrial-scale PCB-focused precious metal recovery remains limited in Eastern India.'
    },
    {
      title: 'Strategic Opportunity',
      description: 'This creates a structural opportunity for compliant, high-yield urban mining infrastructure.'
    }
  ];

  const processStages = [
    {
      stage: 'Stage 1',
      title: 'Mechanical Pre-Processing',
      icon: Cpu,
      points: [
        'Segregation of PCB fractions',
        'Mechanical shredding and separation',
        'Density-based concentration',
        'Removal of non-metallic residues'
      ],
      objective: 'Produce high-grade PCB concentrate'
    },
    {
      stage: 'Stage 2',
      title: 'Selective Metal Extraction',
      icon: Recycle,
      status: 'Under Evaluation',
      points: [
        'Controlled leaching systems',
        'Precious metal precipitation pathways',
        'Copper recovery integration',
        'Effluent neutralization'
      ],
      objective: 'Maximize recovery yield with environmental discipline'
    },
    {
      stage: 'Stage 3',
      title: 'Refining & Assay',
      icon: Shield,
      status: 'Future Operational Phase',
      points: [
        'Electro-refining to bullion-grade standards',
        'Laboratory validation',
        'Controlled by-product management'
      ],
      objective: null
    }
  ];

  const regionalAdvantages = [
    { icon: Building2, title: 'High Urban E-Waste Density', description: 'Concentrated generation in metro areas' },
    { icon: TrendingUp, title: 'Growing Telecom & IT Infrastructure', description: 'Expanding digital economy' },
    { icon: Target, title: 'Limited Local Precious Metal Extraction', description: 'Untapped market opportunity' },
    { icon: Zap, title: 'Strategic Logistics Positioning', description: 'Eastern India connectivity' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950 opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-tight">
                WE DON'T MINE THE EARTH.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  WE DESIGN SYSTEMS TO RECOVER ITS VALUE.
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                Urban Gold India is a research-driven circular economy venture developing a precision industrial 
                precious metal recovery system focused on printed circuit boards (PCBs) and high-value electronic 
                waste streams in India.
              </p>
              
              <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-400">
                  Development Stage: Technical Design & Regulatory Preparation
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white h-14 px-8 text-base">
                  <Link to="/roadmap">
                    Explore Our Development Roadmap
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base border-2">
                  <Link to="/investors">Investor Information</Link>
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1697952431907-8542919a16b3?w=800&h=800&fit=crop"
                  alt="Circuit Board Geometry"
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-white dark:border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structural Opportunity - Bento Grid */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-16">
            India's Untapped Above-Ground Resource Base
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {opportunities.map((opp, idx) => (
              <Card
                key={idx}
                className={`p-8 lg:p-10 bg-gradient-to-br hover:shadow-xl transition-all duration-300 border-2 ${
                  opp.large 
                    ? 'md:col-span-2 from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800' 
                    : 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 border-gray-200 dark:border-gray-700'
                }`}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {opp.title}
                </h3>
                <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {opp.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Focus - Process Stages */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-16">
            A Precision Urban Metal Recovery System
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {processStages.map((process, idx) => {
              const Icon = process.icon;
              return (
                <Card key={idx} className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-amber-500 dark:hover:border-amber-600 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    {process.status && (
                      <span className="text-xs font-medium px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-400 rounded-full">
                        {process.status}
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-2 text-sm font-bold text-amber-600 dark:text-amber-500 tracking-wider">
                    {process.stage}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {process.title}
                  </h3>
                  
                  <ul className="space-y-3 mb-6">
                    {process.points.map((point, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {process.objective && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">OBJECTIVE</p>
                      <p className="text-sm text-gray-900 dark:text-white font-medium">{process.objective}</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-16">
            Current Development Stage
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-gray-300 dark:to-gray-700"></div>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {[
                { title: 'Technical Process Evaluation', status: 'current', desc: 'Multi-path analysis of recovery systems' },
                { title: 'Infrastructure Planning', status: 'current', desc: 'Site identification and facility design' },
                { title: 'Regulatory Roadmap Preparation', status: 'in-progress', desc: 'Compliance framework development' },
                { title: 'Pilot Validation', status: 'planned', desc: 'Small-scale testing phase' },
                { title: 'Industrial Deployment', status: 'future', desc: 'Full-scale operations' }
              ].map((phase, idx) => (
                <div key={idx} className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    phase.status === 'current' ? 'bg-amber-500' :
                    phase.status === 'in-progress' ? 'bg-orange-400' :
                    'bg-gray-300 dark:bg-gray-700'
                  }`}>
                    <span className="text-white font-bold text-lg">{idx + 1}</span>
                  </div>
                  <h4 className="font-bold text-sm lg:text-base text-gray-900 dark:text-white mb-2">{phase.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-16">
            Phased Business Model
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-10 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800">
              <div className="text-sm font-bold text-amber-600 dark:text-amber-500 tracking-wider mb-3">PHASE I</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Industrial Metal Recovery</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Primary focus on PCB concentration, precious metal extraction, B2B bullion sales and copper monetization.
              </p>
            </Card>

            <div className="space-y-8">
              <Card className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                <div className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-wider mb-3">PHASE II</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Polymer Recovery & Circular Integration</h4>
              </Card>

              <Card className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                <div className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-wider mb-3">PHASE III</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Branded Recycled Gold Products</h4>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Eastern India */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-16">
            Why Eastern India
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalAdvantages.map((advantage, idx) => {
              const Icon = advantage.icon;
              return (
                <Card key={idx} className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-600 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{advantage.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{advantage.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Long-Term Objective */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1580584126903-c17d41830450?w=1600&h=900&fit=crop"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            From discarded electronics
            <br />
            to certified metal recovery.
          </h2>
          <p className="text-2xl lg:text-3xl text-amber-400 font-medium mb-4">
            Industrial capability first.
          </p>
          <p className="text-2xl lg:text-3xl text-amber-400 font-medium">
            Brand equity later.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Building India's Next Precious Metal Infrastructure
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white h-14 px-10 text-base">
              <Link to="/investors">
                Investor Brief
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base border-2">
              <Link to="/contact">Strategic Partnerships</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
