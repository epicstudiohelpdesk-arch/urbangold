import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'business',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission - in real app, this would call backend
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 2-3 business days.",
      });
      setFormData({
        name: '',
        email: '',
        organization: '',
        inquiryType: 'business',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Get in Touch
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            We welcome inquiries from investors, strategic partners, e-waste aggregators, 
            and technical collaborators.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <Card className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email</h3>
                        <a 
                          href="mailto:urbangoldindia@gmail.com" 
                          className="text-amber-600 dark:text-amber-500 hover:underline"
                        >
                          urbangoldindia@gmail.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Location</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Kolkata, West Bengal<br />
                          India
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="p-6 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Response Time</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  We typically respond to inquiries within 2-3 business days. For time-sensitive matters, 
                  please indicate urgency in your message.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-850 border-2 border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-900 dark:text-white">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-900 dark:text-white">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="organization" className="text-gray-900 dark:text-white">
                      Organization / Company
                    </Label>
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="inquiryType" className="text-gray-900 dark:text-white">
                      Inquiry Type <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="business">Business Inquiry</option>
                      <option value="investor">Investor Inquiry</option>
                      <option value="technical">Technical Collaboration</option>
                      <option value="supplier">Supplier / Aggregator Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-900 dark:text-white">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white h-12"
                  >
                    {isSubmitting ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Types */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Who Should Contact Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Investors',
                description: 'Equity partners and institutional investors interested in long-term infrastructure development.'
              },
              {
                title: 'Strategic Partners',
                description: 'Metal refiners, technology providers, or circular economy enterprises seeking collaboration.'
              },
              {
                title: 'E-Waste Aggregators',
                description: 'Authorized e-waste collectors and dismantlers exploring supply partnerships.'
              },
              {
                title: 'Technical Experts',
                description: 'Hydrometallurgical engineers, process consultants, or environmental specialists.'
              }
            ].map((type, idx) => (
              <Card key={idx} className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-amber-500 dark:hover:border-amber-600 transition-all">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{type.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{type.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Let's build something serious.
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
            If you're aligned with long-term thinking, technical discipline, and industrial-scale ambition—we should talk.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
