import React from 'react';
import { TrendingUp, AlertCircle, Target, Coins } from 'lucide-react';
import { Card } from '../components/ui/card';

const Opportunity = () => {
  const stats = [
    { label: 'Annual E-Waste Generation (India)', value: '3.2M+ Tonnes', trend: 'Growing 30% YoY' },
    { label: 'PCB Gold Concentration', value: '250-350 g/tonne', trend: 'vs. 3-5 g/tonne in ore' },
    { label: 'Informal Processing Rate', value: '~70%', trend: 'Low recovery efficiency' },
    { label: 'Eastern India Facilities', value: 'Limited', trend: 'Infrastructure gap' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            A Structural Industrial Opportunity
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            India's e-waste represents an untapped above-ground resource base with significant 
            precious metal recovery potential.
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-16">
            Market Context
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-500 mb-2">{stat.label}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.trend}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* National E-Waste Generation */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-6">
                <TrendingUp className="h-10 w-10 text-amber-600 dark:text-amber-500" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                National E-Waste Generation
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  India generates over 3.2 million tonnes of electronic waste annually, making it the 
                  third-largest e-waste producer globally. This volume is projected to grow at 30% year-over-year 
                  driven by rapid digitalization and device replacement cycles.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Metropolitan areas in Eastern India—particularly Kolkata, Bhubaneswar, and surrounding 
                  industrial zones—contribute significantly to this generation, yet local processing infrastructure 
                  remains underdeveloped.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  The majority of this waste contains valuable printed circuit boards (PCBs) with recoverable 
                  concentrations of gold, silver, copper, palladium, and other strategic metals.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1606718220923-fcb2abd9a778?w=800&h=600&fit=crop"
                alt="Electronic Devices"
                className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PCB Metal Concentration */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1579803166678-7acf374cfe52?w=800&h=600&fit=crop"
                alt="Motherboard"
                className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-6">
                <Coins className="h-10 w-10 text-amber-600 dark:text-amber-500" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                PCB Metal Concentration Logic
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-amber-50 dark:bg-amber-950/30 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Gold Concentration</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    PCBs contain 250-350 grams of gold per tonne—50 to 100 times higher than traditional gold ore.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Copper Recovery</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    20-30% copper content provides a reliable base revenue stream alongside precious metals.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Strategic Metals</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Silver, palladium, and trace metals add incremental value to recovery operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informal Processing Gap */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-6">
            <AlertCircle className="h-10 w-10 text-amber-600 dark:text-amber-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Informal Processing Gap
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Current Reality</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Approximately 70% of India's e-waste is processed through informal channels with limited 
                environmental controls.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Open burning and acid leaching</li>
                <li>• Low metal recovery rates (30-40%)</li>
                <li>• Uncontrolled effluent discharge</li>
                <li>• Worker health risks</li>
              </ul>
            </Card>

            <Card className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Displacement Challenge</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Formal facilities must compete economically while maintaining environmental compliance—
                requiring superior technology and process efficiency.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Industrial Solution</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                High-yield industrial systems can achieve 90%+ recovery rates while meeting regulatory standards, 
                creating value that justifies formal infrastructure investment.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Eastern India Infrastructure Deficit */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-6">
            <Target className="h-10 w-10 text-amber-600 dark:text-amber-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            Eastern India Infrastructure Deficit
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              While Western and Southern India host several industrial e-waste processing facilities, 
              Eastern India—despite generating substantial e-waste volumes—has limited domestic capacity 
              for PCB-focused precious metal recovery.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              This creates logistical inefficiencies where e-waste must be transported across state boundaries, 
              increasing processing costs and reducing economic viability for smaller aggregators.
            </p>
          </div>

          <Card className="p-10 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Regional Advantages</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Supply Density</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Dense e-waste generation within 200km radius reduces aggregation costs and improves unit economics.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Port Proximity</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Access to Kolkata Port enables potential future export of refined metals if domestic pricing gaps emerge.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Industrial Land Availability</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Relatively lower land costs compared to Western metros improve capital efficiency.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">First-Mover Positioning</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Limited competition allows establishment of supplier relationships and regulatory track record.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Industrial Investment Opportunity
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12">
            This is not a recycling business. It's precision metal extraction infrastructure—requiring 
            industrial capital, technical discipline, and long-term operational thinking.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl font-bold text-amber-400 mb-3">$3-5M</div>
              <p className="text-gray-300">Estimated Phase I capital requirement for pilot-scale facility</p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl font-bold text-amber-400 mb-3">18-24M</div>
              <p className="text-gray-300">Timeline to operational commissioning from technical finalization</p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl font-bold text-amber-400 mb-3">B2B Model</div>
              <p className="text-gray-300">Direct bullion sales to refiners and metal traders (no consumer brand initially)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Opportunity;
