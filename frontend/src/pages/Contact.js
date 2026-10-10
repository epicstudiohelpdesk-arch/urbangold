import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, Sparkles, Clock3, ArrowUpRight, Handshake, Factory, ChevronDown, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const inquiryTypeOptions = [
  {
    value: 'business',
    label: 'Business Inquiry'
  },
  {
    value: 'investor',
    label: 'Investor Inquiry'
  },
  {
    value: 'technical',
    label: 'Technical Collaboration'
  },
  {
    value: 'supplier',
    label: 'Supplier / Aggregator Partnership'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

const contactAudienceProfiles = [
  {
    lane: '01',
    icon: Handshake,
    title: 'Investors & Capital Partners',
    description: 'Strategic and institutional partners evaluating long-horizon urban mining infrastructure.',
    fit: 'Best fit: when you are exploring equity, structured capital, or platform-level partnerships.',
    highlights: ['Capital Alignment', 'Diligence Ready', 'Long-Term Focus'],
    accent: 'from-emerald-700 via-emerald-600 to-teal-500'
  },
  {
    lane: '02',
    icon: Factory,
    title: 'Strategic Industry Partners',
    description: 'Refiners, industrial processors, and circular-economy operators seeking operational collaboration.',
    fit: 'Best fit: when you can contribute infrastructure, channels, capability, or execution leverage.',
    highlights: ['Industrial Fit', 'Execution Leverage', 'Joint Programs'],
    accent: 'from-emerald-700 via-teal-600 to-lime-500'
  },
  {
    lane: '03',
    icon: Send,
    title: 'E-Waste Aggregators',
    description: 'Authorized collectors and dismantlers looking for reliable, compliant supply pathways.',
    fit: 'Best fit: when you can provide traceable feedstock and consistent partnership depth.',
    highlights: ['Traceable Feedstock', 'Compliance-Oriented', 'Supply Partnership'],
    accent: 'from-teal-600 via-emerald-600 to-lime-500'
  },
  {
    lane: '04',
    icon: Sparkles,
    title: 'Technical Collaborators',
    description: 'Process, hydrometallurgy, and environmental experts interested in solving hard execution problems.',
    fit: 'Best fit: when your expertise can sharpen yield, controls, or compliance systems.',
    highlights: ['Process Depth', 'Technical Validation', 'Engineering Rigor'],
    accent: 'from-emerald-700 via-teal-600 to-lime-500'
  }
];

const InquiryTypeDropdown = ({ id, value, onChange, mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const selectedOption = inquiryTypeOptions.find((option) => option.value === value) || inquiryTypeOptions[0];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleOutsidePress = (event) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsidePress);
    document.addEventListener('touchstart', handleOutsidePress);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsidePress);
      document.removeEventListener('touchstart', handleOutsidePress);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const buttonBaseClass = mobile
    ? 'mt-1.5 w-full h-11 rounded-xl bg-white dark:bg-gray-900 px-3.5 text-left text-slate-900 dark:text-slate-100 shadow-sm transition-colors duration-150'
    : 'mt-2 w-full min-h-[2.75rem] rounded-lg bg-white dark:bg-gray-900 px-4 py-2 text-left text-slate-900 dark:text-slate-100 shadow-sm transition-colors duration-150';

  const buttonStateClass = isOpen
    ? 'border border-slate-400/80 dark:border-slate-500 ring-2 ring-slate-300/40 dark:ring-slate-600/40'
    : 'border border-slate-300 dark:border-slate-700 hover:border-slate-400/80 dark:hover:border-slate-500';

  const buttonClassName = `${buttonBaseClass} ${buttonStateClass}`;

  const menuCardClassName = mobile
    ? 'rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-900 shadow-[0_16px_28px_-20px_rgba(15,23,42,0.45)]'
    : 'rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-900 shadow-[0_16px_28px_-20px_rgba(15,23,42,0.45)]';

  return (
    <div ref={wrapperRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        onClick={() => setIsOpen((previous) => !previous)}
        className={buttonClassName}
      >
        <span className="flex items-center justify-between gap-3">
          <span className={`font-medium truncate ${mobile ? 'text-sm' : 'text-sm'}`}>{selectedOption.label}</span>
          <ChevronDown
            className={`h-4 w-4 text-slate-500 dark:text-slate-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </span>
      </button>

      <div
        className={`absolute left-0 right-0 z-50 mt-1.5 origin-top transition-all duration-150 ${
          isOpen
            ? 'visible opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'invisible opacity-0 -translate-y-1 scale-[0.99] pointer-events-none'
        }`}
      >
        <div id={`${id}-listbox`} role="listbox" className={menuCardClassName}>
          <div className={`py-1 ${mobile ? 'max-h-64 overflow-y-auto' : ''}`}>
            {inquiryTypeOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 transition-colors ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/55'
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className={`block font-medium ${mobile ? 'text-sm' : 'text-sm'}`}>{option.label}</span>
                    <Check
                      className={`h-4 w-4 text-slate-700 dark:text-slate-200 transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

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

  const handleInquiryTypeChange = (nextValue) => {
    setFormData((previous) => ({
      ...previous,
      inquiryType: nextValue
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="sm:hidden">
        {/* Mobile Hero */}
        <section className="relative overflow-hidden pb-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_32%,rgba(114,191,0,0.20),transparent_46%),radial-gradient(circle_at_84%_34%,rgba(58,119,23,0.14),transparent_42%),radial-gradient(circle_at_82%_84%,rgba(58,119,23,0.14),transparent_40%),linear-gradient(180deg,#ffffff_0%,#EAFDE7_42%,#EAFDE7_100%)] dark:bg-[radial-gradient(circle_at_20%_32%,rgba(114,191,0,0.18),transparent_46%),radial-gradient(circle_at_84%_34%,rgba(58,119,23,0.12),transparent_42%),radial-gradient(circle_at_82%_84%,rgba(58,119,23,0.10),transparent_40%),linear-gradient(180deg,#09090b_0%,#111827_46%,#01312D_100%)]"></div>
          <div className="absolute inset-0 opacity-35 dark:opacity-20 bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-[size:26px_26px]"></div>
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/85 to-transparent dark:from-gray-950 dark:via-gray-950/80 dark:to-transparent"></div>
          <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-emerald-300/30 dark:bg-slate-500/16 blur-3xl"></div>
          <div className="absolute -bottom-14 -right-10 h-52 w-52 rounded-full bg-lime-300/28 dark:bg-lime-500/14 blur-3xl"></div>

          <div className="relative z-10 px-4">
            <div className="rounded-[1.7rem] border border-slate-200/75 dark:border-white/15 bg-white/82 dark:bg-white/5 backdrop-blur-xl p-4 shadow-[0_18px_44px_rgba(58,119,23,0.28)]">
              <h1 className="text-[1.85rem] font-black text-gray-900 dark:text-white leading-[1.03] tracking-tight">
                Talk to us.
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-lime-300">
                  Build what matters.
                </span>
              </h1>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Investors, strategic partners, e-waste aggregators, and technical collaborators can connect in one focused channel.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Response</p>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">2-3 business days</p>
                </div>
                <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Operating Base</p>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">Kolkata, India</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <a
                  href="#contact-form-mobile"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white px-4 py-2.5 text-sm font-semibold shadow-[0_14px_30px_rgba(58,119,23,0.34)]"
                >
                  <Send className="h-4 w-4" />
                  Send Inquiry
                </a>
                <a
                  href="mailto:urbangoldindia@gmail.com"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300/75 dark:border-emerald-500/35 bg-white/80 dark:bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Email Us
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {[
                { icon: Handshake, label: 'Partners' },
                { icon: Factory, label: 'Industry' },
                { icon: Clock3, label: 'Fast Response' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/75 dark:bg-white/5 backdrop-blur px-2.5 py-2.5 text-center"
                  >
                    <div className="mx-auto w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-500/15 flex items-center justify-center">
                      <Icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="mt-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase text-gray-700 dark:text-gray-300">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mobile Contact Form & Info */}
        <section id="contact-form-mobile" className="py-7 bg-[radial-gradient(circle_at_50%_0%,_#EAFDE7_0%,_#ffffff_45%,_#EAFDE7_100%)] dark:bg-[radial-gradient(circle_at_50%_0%,_rgba(114,191,0,0.18)_0%,_#0f172a_55%,_#0a0a0a_100%)]">
          <div className="px-4 space-y-3">
            <Card className="p-4 border border-slate-200/80 dark:border-emerald-800/70 bg-gradient-to-br from-slate-50/95 via-slate-50/90 to-slate-50/80 dark:from-emerald-950/35 dark:via-teal-950/25 dark:to-lime-950/20">
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">Quick Contact</p>
              <div className="mt-2.5 space-y-2">
                <a
                  href="mailto:urbangoldindia@gmail.com"
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-white/5 px-3 py-2.5"
                >
                  <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">urbangoldindia@gmail.com</span>
                </a>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-white/5 px-3 py-2.5">
                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">Kolkata, West Bengal, India</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 border border-slate-200/80 dark:border-white/15 bg-white/90 dark:bg-white/5 backdrop-blur-xl shadow-[0_20px_44px_-30px_rgba(58,119,23,0.45)]">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Send Us a Message</h2>
              <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400">Structured details help us reply with clear next steps.</p>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                <div>
                  <Label htmlFor="m-name" className="text-xs font-semibold text-gray-900 dark:text-white">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="m-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-emerald-800/50 bg-white/90 dark:bg-gray-900/80"
                  />
                </div>

                <div>
                  <Label htmlFor="m-email" className="text-xs font-semibold text-gray-900 dark:text-white">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="m-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-emerald-800/50 bg-white/90 dark:bg-gray-900/80"
                  />
                </div>

                <div>
                  <Label htmlFor="m-organization" className="text-xs font-semibold text-gray-900 dark:text-white">
                    Organization / Company
                  </Label>
                  <Input
                    id="m-organization"
                    name="organization"
                    type="text"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-emerald-800/50 bg-white/90 dark:bg-gray-900/80"
                  />
                </div>

                <div>
                  <Label htmlFor="m-inquiryType" className="text-xs font-semibold text-gray-900 dark:text-white">
                    Inquiry Type <span className="text-red-500">*</span>
                  </Label>
                  <InquiryTypeDropdown
                    id="m-inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInquiryTypeChange}
                    mobile
                  />
                </div>

                <div>
                  <Label htmlFor="m-message" className="text-xs font-semibold text-gray-900 dark:text-white">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="m-message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    rows={4}
                    className="mt-1.5 rounded-xl border-slate-200 dark:border-emerald-800/50 bg-white/90 dark:bg-gray-900/80"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-700 hover:via-teal-600 hover:to-teal-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Mobile Inquiry Types */}
        <section className="py-7 bg-white dark:bg-black">
          <div className="px-4">
            <div className="relative overflow-hidden rounded-[1.65rem] border border-slate-200/80 dark:border-white/15 bg-gradient-to-br from-white via-slate-50/70 to-slate-100/45 dark:from-slate-950/92 dark:via-slate-950/86 dark:to-slate-900/80 p-4 shadow-[0_18px_44px_-30px_rgba(58,119,23,0.45)]">
              <div className="absolute -top-12 -right-10 h-28 w-28 rounded-full bg-emerald-300/20 dark:bg-emerald-700/10 blur-2xl" />
              <div className="absolute -bottom-12 -left-8 h-24 w-24 rounded-full bg-teal-300/18 dark:bg-teal-700/10 blur-2xl" />

              <div className="relative">
                <div className="inline-flex items-center rounded-full border border-slate-300/75 dark:border-emerald-500/35 bg-white/85 dark:bg-white/10 px-3 py-1.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">Who Should Contact Us</p>
                </div>
                <h2 className="mt-2.5 text-2xl font-black text-gray-900 dark:text-white leading-tight">
                  Right-Fit Partner Profiles
                </h2>
                <p className="mt-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  Pick the profile that matches your mandate, then send one focused message with context.
                </p>

                <div className="mt-4 space-y-3">
                  {contactAudienceProfiles.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Card
                        key={type.title}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/85 dark:border-white/12 bg-white/92 dark:bg-slate-900/78 p-3.5 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.35)]"
                      >
                        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${type.accent}`} />
                        <div className="flex items-start gap-2.5">
                          <div className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-white/15 bg-slate-50 dark:bg-slate-800/70 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-black text-gray-900 dark:text-white leading-snug">{type.title}</h3>
                              <span className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-white/15 bg-slate-50 dark:bg-slate-800/75 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] font-semibold text-slate-600 dark:text-slate-300">
                                {`Lane ${type.lane}`}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{type.description}</p>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {type.highlights.map((highlight) => (
                                <span
                                  key={highlight}
                                  className="inline-flex items-center rounded-full border border-slate-200/80 dark:border-white/15 bg-slate-50/90 dark:bg-slate-800/75 px-2 py-1 text-[10px] font-semibold text-gray-700 dark:text-gray-200"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <div className="hidden sm:block">
      {/* Hero */}
      <section className="relative overflow-hidden pt-0 pb-10 lg:pb-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(114,191,0,0.23),transparent_40%),radial-gradient(circle_at_88%_14%,rgba(58,119,23,0.17),transparent_35%),radial-gradient(circle_at_82%_84%,rgba(1,49,45,0.14),transparent_36%),linear-gradient(132deg,#EAFDE7_0%,#ffffff_45%,#EAFDE7_100%)] dark:bg-[radial-gradient(circle_at_14%_20%,rgba(114,191,0,0.20),transparent_40%),radial-gradient(circle_at_88%_14%,rgba(58,119,23,0.13),transparent_35%),radial-gradient(circle_at_82%_84%,rgba(1,49,45,0.10),transparent_36%),linear-gradient(132deg,#09090b_0%,#111827_45%,#01312D_100%)]"></div>
        <div className="absolute inset-0 opacity-35 dark:opacity-20 bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-600/55 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-600/55 to-transparent"></div>
        <div className="absolute -top-20 left-8 h-60 w-60 rounded-full bg-emerald-300/22 dark:bg-slate-500/14 blur-3xl"></div>
        <div className="absolute -bottom-24 right-4 h-64 w-64 rounded-full bg-teal-300/22 dark:bg-slate-500/12 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-7 items-stretch">
            <div className="lg:col-span-8">
              <div className="relative h-full rounded-[1.9rem] border border-slate-200/85 dark:border-white/15 bg-white/86 dark:bg-white/5 backdrop-blur-xl p-5 sm:p-7 lg:p-8 overflow-hidden shadow-[0_24px_60px_-34px_rgba(58,119,23,0.52)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(114,191,0,0.24),transparent_36%),radial-gradient(circle_at_92%_90%,rgba(58,119,23,0.17),transparent_34%)]"></div>
                <div className="absolute -right-10 -top-8 h-28 w-28 rounded-full bg-emerald-300/28 dark:bg-slate-500/14 blur-2xl"></div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-600/45 to-transparent"></div>

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 dark:border-emerald-500/40 bg-white/90 dark:bg-white/5 px-3.5 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-300">
                      <Sparkles className="h-3 w-3" />
                      Contact Urban Gold India
                    </p>
                    <p className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-slate-700/70 bg-white/85 dark:bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-slate-600 dark:text-slate-300">
                      Strategic Desk
                    </p>
                  </div>

                  <h1 className="mt-5 text-[2rem] sm:text-5xl lg:text-[3.65rem] font-black text-slate-900 dark:text-white leading-[0.98] tracking-tight max-w-4xl">
                    Start one serious conversation.
                    <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400">
                      Leave with a concrete next step.
                    </span>
                  </h1>

                  <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                    We built this lane for high-intent conversations across capital, industrial supply, and technical collaboration. Share context once, and we respond with a focused path.
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Investor and strategic partnerships',
                      'Feedstock and aggregator integration',
                      'Technical and process advisory'
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3 sm:flex-wrap">
                    <a
                      href="#contact-form"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-700 hover:via-teal-600 hover:to-emerald-600 text-white px-5 py-3 text-sm sm:text-base font-semibold shadow-[0_14px_32px_rgba(114,191,0,0.34)] transition-all"
                    >
                      <Send className="h-4 w-4" />
                      Send Inquiry
                    </a>
                    <a
                      href="mailto:urbangoldindia@gmail.com"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300/80 dark:border-emerald-400/40 bg-white/85 dark:bg-white/5 backdrop-blur px-5 py-3 text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:border-emerald-500 dark:hover:border-slate-300 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      urbangoldindia@gmail.com
                    </a>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { label: 'Response', value: '2-3 days' },
                      { label: 'Base', value: 'Kolkata' },
                      { label: 'Format', value: 'Structured' },
                      { label: 'Priority', value: 'Execution' }
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-slate-200/75 dark:border-white/10 bg-slate-50/65 dark:bg-slate-500/10 px-3 py-2.5"
                      >
                        <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-300">{item.label}</p>
                        <p className="mt-1 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="relative h-full rounded-[1.9rem] border border-slate-200/80 dark:border-white/15 bg-white/88 dark:bg-white/5 backdrop-blur-xl p-5 sm:p-6 overflow-hidden shadow-[0_24px_58px_-34px_rgba(58,119,23,0.45)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-400"></div>
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-teal-300/24 dark:bg-slate-500/14 blur-2xl"></div>

                <div className="relative">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.17em] font-semibold text-emerald-700 dark:text-emerald-300">
                    Process Preview
                  </p>
                  <h2 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    From message to meaningful progress.
                  </h2>

                  <div className="mt-4 space-y-2.5">
                    {[
                      {
                        title: 'Send mandate details',
                        description: 'Define who you are and what outcome you need.'
                      },
                      {
                        title: 'We align on scope',
                        description: 'Timeline, decision checkpoints, and practical fit.'
                      },
                      {
                        title: 'Start focused actions',
                        description: 'A clear next move with the right counterpart.'
                      }
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className="rounded-xl border border-slate-200/75 dark:border-white/10 bg-white/88 dark:bg-white/5 px-3.5 py-2.5"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2.5">
                    <div className="rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/70 dark:bg-slate-500/10 px-3.5 py-2.5">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        Operating Base
                      </p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Kolkata, West Bengal</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/70 dark:bg-slate-500/10 px-3.5 py-2.5">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        Response Window
                      </p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Within 2-3 business days</p>
                    </div>
                  </div>

                  <a
                    href="mailto:urbangoldindia@gmail.com"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
                  >
                    Direct email line
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {[
              {
                icon: Handshake,
                title: 'Partnership Lane',
                value: 'Investors and strategic operators planning long-horizon collaboration.'
              },
              {
                icon: Factory,
                title: 'Industrial Lane',
                value: 'Aggregators, recyclers, and ecosystem players exploring integration.'
              },
              {
                icon: Send,
                title: 'Execution Lane',
                value: 'High-context outreach that converts into concrete next actions.'
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200/80 dark:border-white/15 bg-gradient-to-r from-white/90 via-slate-50/70 to-slate-50/55 dark:from-white/5 dark:via-emerald-600/8 dark:to-teal-700/8 backdrop-blur px-4 py-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_34px_-24px_rgba(58,119,23,0.55)]"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-500/15 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{item.title}</p>
                  <p className="mt-1.5 text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">{item.value}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contact-form" className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 lg:p-7 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.38)]">
                <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                  Official Channel
                </div>
                <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Share clear context, objectives, and timeline so we can route your inquiry to the right team quickly.
                </p>

                <div className="mt-6 space-y-3.5">
                  <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 px-4 py-4 transition-colors duration-200 hover:border-slate-300 dark:hover:border-white/20">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-slate-500 dark:text-slate-400">Primary Email</p>
                      <a
                        href="mailto:urbangoldindia@gmail.com"
                        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                      >
                        urbangoldindia@gmail.com
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Best for partnership, investor, and technical outreach.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 px-4 py-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-slate-500 dark:text-slate-400">Operational Presence</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        Kolkata, West Bengal
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">India</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-slate-50 dark:bg-emerald-950/20 border border-slate-200 dark:border-emerald-800/60 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Response Standard</h3>
                    <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      Typical reply time is 2-3 business days. For urgent matters, include required timeline and decision context.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="relative overflow-hidden p-7 lg:p-9 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 shadow-[0_28px_58px_-38px_rgba(15,23,42,0.45)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-600/65 to-transparent" />
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-200/22 dark:bg-emerald-600/10 blur-3xl" />
                <div className="absolute -left-14 bottom-0 h-36 w-36 rounded-full bg-teal-200/18 dark:bg-teal-700/10 blur-3xl" />

                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                      Send Us a Message
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-white/90 dark:bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">
                      <Clock3 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      Typical response: 2-3 business days
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl lg:text-[1.7rem] font-bold text-gray-900 dark:text-white tracking-tight">
                    Tell us your objective and required timeline
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    Structured inputs help our team route your inquiry to the right stakeholders and reply with clear next steps.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-900 dark:text-white">
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
                          className="mt-2 h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/45 placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-900 dark:text-white">
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
                          className="mt-2 h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/45 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="organization" className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-900 dark:text-white">
                        Organization / Company
                      </Label>
                      <Input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="mt-2 h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/45 placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inquiryType" className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-900 dark:text-white">
                        Inquiry Type <span className="text-red-500">*</span>
                      </Label>
                      <InquiryTypeDropdown
                        id="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInquiryTypeChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-900 dark:text-white">
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
                        className="mt-2 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/45 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Fields marked with <span className="text-red-500">*</span> are required.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto min-w-[210px] bg-gradient-to-r from-slate-700 via-slate-700 to-emerald-700 hover:from-slate-800 hover:via-slate-800 hover:to-emerald-700 text-white h-11 rounded-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Types */}
      <section className="relative py-14 lg:py-20 bg-[radial-gradient(circle_at_12%_10%,_#EAFDE7_0%,_#ffffff_44%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_12%_8%,_rgba(114,191,0,0.12)_0%,_#0a0d14_44%,_#040507_100%)] overflow-hidden">
        <div className="absolute inset-0 opacity-26 dark:opacity-16 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-emerald-300/22 dark:bg-emerald-700/12 blur-3xl" />
        <div className="absolute -bottom-24 right-4 h-80 w-80 rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/75 dark:border-emerald-500/35 bg-white/90 dark:bg-white/10 px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
              <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                Who Should Contact Us
              </span>
            </div>
            <h2 className="mt-3.5 text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-[1.04] tracking-tight">
              Choose Your Collaboration Lane
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              We respond fastest when your message maps clearly to one of these partner profiles.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-4">
            {contactAudienceProfiles.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.title}
                    className="group relative h-full overflow-hidden rounded-[1.25rem] border border-slate-200/85 dark:border-white/12 bg-white/92 dark:bg-slate-900/78 p-4 shadow-[0_16px_34px_-28px_rgba(15,23,42,0.30)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 dark:hover:border-emerald-500/45 hover:shadow-[0_22px_40px_-30px_rgba(58,119,23,0.4)]"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${type.accent}`} />
                    <div className="flex items-start justify-between gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/80 dark:border-white/15 bg-slate-50 dark:bg-slate-800/80">
                        <Icon className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <span className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-white/15 bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] font-semibold text-slate-600 dark:text-slate-300">
                        {`Lane ${type.lane}`}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-black text-slate-900 dark:text-white leading-snug">
                      {type.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {type.description}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 leading-relaxed">
                      {type.fit}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {type.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 dark:border-white/12 bg-slate-50/85 dark:bg-slate-800/70 px-2.5 py-1"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                          <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200">{highlight}</span>
                        </span>
                      ))}
                    </div>
                  </Card>
                );
              })}
          </div>

          <div className="mt-5 text-center">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Not sure where you fit? Select `Other` in the form and include your objective.
            </p>
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
            If you're aligned with long-term thinking, technical discipline, and industrial-scale ambition, we should talk.
          </p>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Contact;


