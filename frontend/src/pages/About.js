import React from 'react';
import { Lightbulb, Target, Users, Rocket } from 'lucide-react';
import { Card } from '../components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Building Circular Metal Infrastructure
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Urban Gold India exists to build compliant, high-efficiency urban precious metal 
            recovery infrastructure in India.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-6">
                <Lightbulb className="h-10 w-10 text-amber-600 dark:text-amber-500" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                To establish India's most disciplined and technically advanced urban mining infrastructure, 
                transforming electronic waste into certified precious metals through industrial-grade recovery systems.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We envision a future where discarded electronics are recognized as valuable resource reserves, 
                and where Eastern India leads the nation in circular metal economy infrastructure.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1717667745934-53091623e8ee?w=800&h=600&fit=crop"
                alt="Electronic Components"
                className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Development Philosophy */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800&h=600&fit=crop"
                alt="Industrial Machinery"
                className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-6">
                <Target className="h-10 w-10 text-amber-600 dark:text-amber-500" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Development Philosophy
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Engineering First</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Every system designed for maximum recovery yield, process efficiency, and technical reliability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Compliance First</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Regulatory frameworks and environmental safeguards engineered before operational deployment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Scale Second</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Modular approach allows validation at pilot scale before industrial expansion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center">
            Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Technical Precision',
                description: 'Every process designed with industrial engineering discipline and measurable outcomes.'
              },
              {
                title: 'Environmental Responsibility',
                description: 'Closed-loop systems with controlled effluent management and waste neutralization.'
              },
              {
                title: 'Regulatory Integrity',
                description: 'Full compliance modeling before operational authorization is sought.'
              },
              {
                title: 'Transparent Communication',
                description: 'Honest disclosure of development stage and capability limitations.'
              },
              {
                title: 'Long-Term Thinking',
                description: 'Building sustainable infrastructure, not chasing short-term extraction gains.'
              },
              {
                title: 'Research-Driven',
                description: 'Decisions grounded in technical evaluation, not assumptions or industry trends.'
              }
            ].map((value, idx) => (
              <Card key={idx} className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-600 transition-all">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Perspective */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-6">
            <Users className="h-10 w-10 text-amber-600 dark:text-amber-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Founder Perspective
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Urban Gold India was founded on the conviction that India's e-waste challenge represents 
              a structural industrial opportunity—not a social enterprise problem, but a precision engineering 
              and capital deployment challenge.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              The foundation rests on deep research in urban mining methodologies, e-waste quantification, 
              and circular economy systems. This is not about "recycling" in the consumer sense. 
              It's about building industrial metal recovery infrastructure that can operate at bullion-grade standards.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We're in the technical design phase because getting the engineering right matters more than 
              launching quickly. When this system goes operational, it will be built to last decades—not quarters.
            </p>
          </div>
        </div>
      </section>

      {/* Long-Term Ambition */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-6">
              <Rocket className="h-10 w-10 text-amber-600 dark:text-amber-500" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Long-Term Ambition
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800">
              <div className="text-5xl font-bold text-amber-600 dark:text-amber-500 mb-4">01</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Regional Metal Recovery Hub</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Establish Eastern India's premier PCB processing and precious metal extraction facility.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-2 border-orange-200 dark:border-orange-800">
              <div className="text-5xl font-bold text-orange-600 dark:text-orange-500 mb-4">02</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Integrated Bullion Ecosystem</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Expand into multi-metal recovery with refining capabilities and B2B precious metal supply.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-2 border-yellow-200 dark:border-yellow-800">
              <div className="text-5xl font-bold text-yellow-600 dark:text-yellow-500 mb-4">03</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Circular Gold Brand</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Launch certified recycled gold products only after industrial capability is proven.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            We're building infrastructure, not hype.
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
            Every decision is made with the understanding that this system must operate 
            reliably for decades, not deliver quick returns in quarters.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
