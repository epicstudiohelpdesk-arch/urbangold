import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Cpu, Download, ExternalLink, Recycle, Building2, TrendingUp, Shield, Zap, Target, FileSearch, LayoutGrid, Scale, FlaskConical, Factory } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import HeroTicker from '../components/HeroTicker';
import ResearchLogisticsMarquee from '../components/ResearchLogisticsMarquee';
const importMobilePdfScrollPreview = () => import('../components/MobilePdfScrollPreview');
const importParticles = () => import('../components/Particles');
const MobilePdfScrollPreview = lazy(importMobilePdfScrollPreview);
const Particles = lazy(importParticles);


const Home = () => {
  const defaultResearchDocCode = 'UG-RD-01';
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [activeResearchDocCode, setActiveResearchDocCode] = useState(defaultResearchDocCode);
  const [renderResearchPreview, setRenderResearchPreview] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 1023px)').matches;
  });
  const [allowHeavyHeroEffects, setAllowHeavyHeroEffects] = useState(() => {
    if (typeof window === 'undefined') return false;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowCpu = typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number'
      ? navigator.hardwareConcurrency <= 4
      : false;
    const lowMemory = typeof navigator !== 'undefined' && typeof navigator.deviceMemory === 'number'
      ? navigator.deviceMemory <= 4
      : false;

    return !reducedMotion && !lowCpu && !lowMemory;
  });
  const [renderHeroParticles, setRenderHeroParticles] = useState(false);
  const tiltFrameMapRef = useRef(new Map());
  const researchFrameMapRef = useRef(new Map());
  const heroEndRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const handleChange = (event) => setIsCompactViewport(event.matches);

    setIsCompactViewport(mediaQuery.matches);
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateEffectBudget = () => {
      const lowCpu = typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number'
        ? navigator.hardwareConcurrency <= 4
        : false;
      const lowMemory = typeof navigator !== 'undefined' && typeof navigator.deviceMemory === 'number'
        ? navigator.deviceMemory <= 4
        : false;

      setAllowHeavyHeroEffects(!reducedMotionQuery.matches && !lowCpu && !lowMemory);
    };

    updateEffectBudget();
    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', updateEffectBudget);
      return () => reducedMotionQuery.removeEventListener('change', updateEffectBudget);
    }

    reducedMotionQuery.addListener(updateEffectBudget);
    return () => reducedMotionQuery.removeListener(updateEffectBudget);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    if (isCompactViewport || !allowHeavyHeroEffects) {
      setRenderHeroParticles(false);
      return undefined;
    }

    let idleHandle = null;
    let timeoutHandle = null;
    const showParticles = () => setRenderHeroParticles(true);

    if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(showParticles, { timeout: 700 });
    } else {
      timeoutHandle = window.setTimeout(showParticles, 220);
    }

    return () => {
      if (idleHandle !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [isCompactViewport, allowHeavyHeroEffects]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const target = heroEndRef.current;
    if (!target) return undefined;

    let lastPassed = null;
    const dispatchState = (passed) => {
      if (passed === lastPassed) return;
      lastPassed = passed;
      window.dispatchEvent(new CustomEvent('ug-hero-end', { detail: { passed } }));
    };

    if (typeof window.IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          dispatchState(entry.boundingClientRect.top <= 4);
        },
        { root: null, threshold: 0, rootMargin: '0px' }
      );

      observer.observe(target);
      dispatchState(false);

      return () => {
        observer.disconnect();
        dispatchState(false);
      };
    }

    let rafId = null;
    const evaluate = () => {
      rafId = null;
      const rect = target.getBoundingClientRect();
      dispatchState(rect.top <= 4);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(evaluate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    evaluate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      dispatchState(false);
    };
  }, []);

  useEffect(() => {
    if (!isResearchModalOpen) return undefined;
    if (typeof window === 'undefined') {
      setRenderResearchPreview(true);
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      setRenderResearchPreview(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isResearchModalOpen, activeResearchDocCode]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const body = document.body;
    body.classList.toggle('ug-modal-open', isResearchModalOpen);

    return () => {
      body.classList.remove('ug-modal-open');
    };
  }, [isResearchModalOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let idleHandle = null;
    let timeoutHandle = null;
    let cancelled = false;

    const warmDeferredModules = () => {
      if (cancelled) return;
      importMobilePdfScrollPreview();
      if (!isCompactViewport && allowHeavyHeroEffects) {
        importParticles();
      }
    };

    if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(warmDeferredModules, { timeout: 1400 });
    } else {
      timeoutHandle = window.setTimeout(warmDeferredModules, 260);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [allowHeavyHeroEffects, isCompactViewport]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isCompactViewport) return undefined;

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(connection?.saveData);
    const effectiveType = String(connection?.effectiveType || '').toLowerCase();
    const verySlowConnection = effectiveType.includes('2g');
    if (saveData || verySlowConnection) return undefined;

    const criticalMobileImages = [
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&h=900&fit=crop',
      '/research_documents/images/1.png',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=1600&h=900&fit=crop'
    ];

    let cancelled = false;
    let idleHandle = null;
    let warmTimer = null;

    const warmImages = () => {
      let index = 0;

      const warmNext = () => {
        if (cancelled || index >= criticalMobileImages.length) return;
        const src = criticalMobileImages[index];
        index += 1;

        if (src) {
          const image = new window.Image();
          image.decoding = 'async';
          image.src = src;
        }

        warmTimer = window.setTimeout(warmNext, 180);
      };

      warmNext();
    };

    if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(warmImages, { timeout: 1200 });
    } else {
      warmTimer = window.setTimeout(warmImages, 320);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (warmTimer !== null) {
        window.clearTimeout(warmTimer);
      }
    };
  }, [isCompactViewport]);

  useEffect(() => {
    const tiltFrameMap = tiltFrameMapRef.current;
    const researchFrameMap = researchFrameMapRef.current;

    return () => {
      for (const frameId of tiltFrameMap.values()) {
        window.cancelAnimationFrame(frameId);
      }
      tiltFrameMap.clear();

      for (const frameId of researchFrameMap.values()) {
        window.cancelAnimationFrame(frameId);
      }
      researchFrameMap.clear();
    };
  }, []);

  const localCardImageFallback = '/research_documents/images/1.png';

  const opportunities = [
    {
      title: 'Electronic Waste as Industrial Feedstock',
      description: 'India generates substantial volumes of electronic waste annually, with significant portions processed inefficiently or informally.',
      large: true,
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&h=900&fit=crop',
      fallbackImage: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/circuit-board-1373686_1280.jpg',
      imageAlt: 'Electronic waste components prepared for recycling'
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

  const heroMarqueeItems = [
    'Urban Mining Infrastructure',
    'PCB-First Recovery',
    'Precious Metal Extraction',
    'Hydrometallurgy Pathways',
    'Compliance by Design',
    'Assay-Grade Output',
    'Traceability Framework',
    'Circular Metal Economy',
    'Eastern India Buildout',
    'Industrial Scale Execution',
    'Long-Horizon Value Creation'
  ];

  const heroWireframeImageFiles = [
    'Ewaste-delhi.jpg',
    'Ewaste-crtkid.jpg',
    'E-waste-lab.jpg',
    'India Victor Grigas 2011-12.jpg',
    'India Victor Grigas 2011-13.jpg',
    'India Victor Grigas 2011-14.jpg',
    'Electronic waste.jpg',
    'Electronic waste 2.jpg',
    'Electronic wastes.jpg',
    'E-waste.jpg',
    '0ld keyboards.JPG',
    'Computer Recycling.JPG'
  ];

  const heroWireframeImages = heroWireframeImageFiles.map(
    (fileName) =>
      `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=1100`
  );

  const heroWireframeColumns = [
    [
      { height: 148 },
      { height: 214 },
      { height: 162 },
      { height: 208 }
    ],
    [
      { height: 196 },
      { height: 156 },
      { height: 224 },
      { height: 170 }
    ],
    [
      { height: 168 },
      { height: 220 },
      { height: 158 },
      { height: 210 }
    ]
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
    {
      icon: Building2,
      title: 'High Urban E-Waste Density',
      description: 'Concentrated generation in metro areas',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=900&fit=crop',
      fallbackImage: 'https://cdn.pixabay.com/photo/2018/01/05/07/26/electronics-3063611_1280.jpg',
      imageAlt: 'Urban electronic waste collection stream'
    },
    { icon: TrendingUp, title: 'Growing Telecom & IT Infrastructure', description: 'Expanding digital economy' },
    { icon: Target, title: 'Limited Local Precious Metal Extraction', description: 'Untapped market opportunity' },
    { icon: Zap, title: 'Strategic Logistics Positioning', description: 'Eastern India connectivity' }
  ];

  const roadmapPhases = [
    {
      title: 'Technical Process Evaluation',
      status: 'active',
      desc: 'Multi-path analysis of recovery systems and yield sensitivity.',
      icon: FileSearch
    },
    {
      title: 'Infrastructure Planning',
      status: 'active',
      desc: 'Site mapping, utility planning, and facility process layout.',
      icon: LayoutGrid
    },
    {
      title: 'Regulatory Roadmap Preparation',
      status: 'in-progress',
      desc: 'Licensing pathway, EHS controls, and audit-ready documentation.',
      icon: Scale
    },
    {
      title: 'Pilot Validation',
      status: 'planned',
      desc: 'Bench-to-pilot validation of process performance and stability.',
      icon: FlaskConical
    },
    {
      title: 'Industrial Deployment',
      status: 'future',
      desc: 'Commercial-scale commissioning and phased operational ramp.',
      icon: Factory
    }
  ];

  const phasePulseMetrics = [
    { short: 'Eval', label: 'Technical Evaluation', pct: 90, icon: FileSearch, status: 'active' },
    { short: 'Infra', label: 'Infrastructure Planning', pct: 75, icon: LayoutGrid, status: 'active' },
    { short: 'Reg', label: 'Regulatory Preparation', pct: 40, icon: Scale, status: 'in-progress' },
    { short: 'Pilot', label: 'Pilot Validation', pct: 5, icon: FlaskConical, status: 'planned' },
    { short: 'Deploy', label: 'Industrial Deployment', pct: 0, icon: Factory, status: 'future' }
  ];

  const overallReadiness = Math.round(
    phasePulseMetrics.reduce((sum, item) => sum + item.pct, 0) / phasePulseMetrics.length
  );
  const liveTrackCount = phasePulseMetrics.filter((item) => item.status === 'active' || item.status === 'in-progress').length;
  const upcomingGateCount = phasePulseMetrics.filter((item) => item.status === 'planned' || item.status === 'future').length;

  const researchDocuments = [
    {
      code: 'UG-RD-01',
      title: 'E-Waste Feedstock Baseline for Eastern India',
      summary: 'City-level feedstock mapping, recycler network scans, and PCB availability projections across priority industrial corridors.',
      modalTitle: 'Overall Rough Ideology (Final)',
      modalDescription: 'Concise strategic deck for Urban Gold\'s urban-mining model, scale path, and impact thesis.',
      focus: 'Feedstock Intelligence',
      status: 'Completed',
      period: 'Q1 2025',
      pages: '42 pages',
      version: 'Final v1.0',
      pdfUrl: '/research_documents/ppt/overall_rough_ideology(FINAL).pdf',
      modalSummary: [
        'India e-waste is rising rapidly while metal value is lost in informal handling.',
        'Urban Gold proposes an industrial recovery model: process rigor first, then phased market scale-up.'
      ],
      modalMetrics: ['300g+ Au/ton PCBs', '99.9 purity target'],
      icon: FileSearch,
      image: '/research_documents/images/1.png',
      layout: 'sm:col-span-2 lg:col-span-5 lg:row-span-2',
      tone: 'from-slate-50/95 via-white to-slate-50/70 dark:from-emerald-950/35 dark:via-gray-900 dark:to-teal-950/25 border-slate-200/85 dark:border-emerald-800/70',
      highlights: ['12 city clusters', '9 input channels', '3 scenario models']
    },
    {
      code: 'UG-RD-02',
      title: 'Quantifying Precious Metal Loss in E-Waste',
      summary: 'Source-based study quantifying unmanaged PCB flow and gold/silver recovery potential across India, West Bengal, and Kolkata.',
      modalTitle: 'Quantifying Precious Metal Loss in E-Waste',
      modalDescription: 'Comprehensive source-based analysis of gold and silver recovery potential across India, West Bengal, and Kolkata.',
      focus: 'Metal Loss Quantification',
      status: 'Completed',
      period: 'Feb 2026',
      pages: '12 pages',
      version: 'Compiled Feb 2026',
      pdfUrl: '/research_documents/Quantifying_Precious_Metal_Loss_in_E_Waste__A_Comprehensive_Source_Based_Analysis_of_Gold_and_Silver_Recovery_Potential_in_India__West_Bengal__and_Kol(1).pdf',
      modalSummary: [
        'Using FY21-22 inputs, estimated unmanaged PCB stream is 118-206 tonnes per day nationally.',
        'Modeled gold content in unmanaged PCB flow ranges from 4.6 to 188 kg/day based on product mix.'
      ],
      modalMetrics: ['118-206 t/day unmanaged PCBs', '4.6-188 kg/day gold potential', 'Kolkata institutional sources: 1.6-3.3 g/day Au'],
      icon: FlaskConical,
      image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=1200&h=900&fit=crop',
      layout: 'lg:col-span-3',
      tone: 'from-white to-slate-50/45 dark:from-gray-900 dark:to-emerald-950/20 border-gray-200 dark:border-gray-800'
    },
    {
      code: 'UG-RD-03',
      title: 'India E-Waste to Precious Metals Value Chain',
      summary: 'Investor-grade map of India\'s e-waste value chain with a focused capability-gap analysis for West Bengal.',
      modalTitle: 'India\'s E-Waste to Precious Metals Value Chain',
      modalDescription: 'Comprehensive market analysis focused on West Bengal\'s processing capabilities and scale pathways.',
      focus: 'Value Chain Mapping',
      status: 'Completed',
      period: 'Feb 2026',
      pages: '4 pages',
      version: 'Compiled Feb 2026',
      pdfUrl: '/research_documents/India_s_E_Waste_to_Precious_Metals_Value_Chain__A_Comprehensive_Market_Analysis_with_Focus_on_West_Bengal_s_Processing_Capabilities.pdf',
      modalSummary: [
        'India generated about 1.6 million tonnes of e-waste in FY 2021-22, but only a small fraction is formally recycled.',
        'Maps three operating tiers: industrial recyclers, specialized mid-sized processors, and regional collection networks.'
      ],
      modalMetrics: ['~1.6M tonnes FY 2021-22', '3-tier operator landscape', 'West Bengal extraction gap identified'],
      icon: Scale,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=900&fit=crop',
      layout: 'lg:col-span-4',
      tone: 'from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 border-gray-200 dark:border-gray-800'
    },
    {
      code: 'UG-RD-04',
      title: 'E-Waste Accumulation & Environmental Impact',
      summary: 'National and West Bengal quantification of e-waste generation, unmanaged flows, hotspot zones, and contamination risk.',
      modalTitle: 'Current Scenario of E-Waste Accumulation in India',
      modalDescription: 'Research covering daily generation, environmental impact, and regional patterns with West Bengal focus.',
      focus: 'Environmental Baseline',
      status: 'Completed',
      period: 'Feb 2026',
      pages: '8 pages',
      version: 'Compiled Feb 2026',
      pdfUrl: '/research_documents/Research_On_The_Current_Scenario_Of_E_Waste_Accumulation_In_India__Daily_Generation__Environmental_Impact__And_Regional_Analysis_Of_West_Bengal (1)(1).pdf',
      modalSummary: [
        'India generates about 1.6-1.75 million tonnes/year (roughly 4,300-4,800 tonnes/day) of e-waste.',
        'West Bengal generates about 462 tonnes/day with only about 0.9 tonnes/day formally processed.'
      ],
      modalMetrics: ['India: 4,300-4,800 t/day', 'West Bengal: ~462 t/day', 'Kolkata: ~71 t/day'],
      icon: LayoutGrid,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=900&fit=crop',
      layout: 'lg:col-span-3',
      tone: 'from-white to-slate-50/45 dark:from-gray-900 dark:to-teal-950/15 border-gray-200 dark:border-gray-800'
    },
    {
      code: 'UG-RD-05',
      title: 'Financial Sensitivity and Margin Dynamics',
      summary: 'Recovery-yield sensitivity across feedstock quality bands with capex/opex implications by phase.',
      focus: 'Commercial Analytics',
      status: 'In Review',
      period: 'Q4 2025',
      pages: '31 pages',
      icon: TrendingUp,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop',
      layout: 'lg:col-span-4',
      tone: 'from-white to-slate-50/35 dark:from-gray-900 dark:to-gray-900 border-gray-200 dark:border-gray-800'
    },
    {
      code: 'UG-RD-06',
      title: 'Quality Assurance and Traceability Framework',
      summary: 'Assay protocol, documentation checkpoints, and chain-of-custody standards for certified metal output.',
      focus: 'Governance Framework',
      status: 'Completed',
      period: 'Q1 2026',
      pages: '19 pages',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=900&fit=crop',
      layout: 'sm:col-span-2 lg:col-span-5',
      tone: 'from-white via-white to-slate-50/45 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950/15 border-gray-200 dark:border-gray-800'
    }
  ];

  const activeResearchDoc =
    researchDocuments.find((doc) => doc.code === activeResearchDocCode) ||
    researchDocuments.find((doc) => doc.code === defaultResearchDocCode) ||
    researchDocuments[0];

  const activeResearchPdfUrl = activeResearchDoc?.pdfUrl ? encodeURI(activeResearchDoc.pdfUrl) : '';
  const activeResearchSummary = activeResearchDoc?.modalSummary?.length
    ? activeResearchDoc.modalSummary
    : activeResearchDoc?.summary
      ? [activeResearchDoc.summary]
      : [];
  const activeResearchMetrics = activeResearchDoc?.modalMetrics?.length
    ? activeResearchDoc.modalMetrics
    : activeResearchDoc?.highlights || [];
  const activeResearchVersion = activeResearchDoc?.version || 'Research v1.0';

  const openResearchModal = (doc) => {
    if (!doc?.pdfUrl) return;
    setActiveResearchDocCode(doc.code);
    setRenderResearchPreview(false);
    setIsResearchModalOpen(true);
  };

  const handleResearchModalOpenChange = (open) => {
    if (!open) {
      setRenderResearchPreview(false);
    }
    setIsResearchModalOpen(open);
  };

  const scheduleCardAnimationFrame = (frameMapRef, cardNode, callback) => {
    if (typeof window === 'undefined') return;
    if (frameMapRef.current.has(cardNode)) return;

    const frameId = window.requestAnimationFrame(() => {
      frameMapRef.current.delete(cardNode);
      callback();
    });

    frameMapRef.current.set(cardNode, frameId);
  };

  const cancelCardAnimationFrame = (frameMapRef, cardNode) => {
    if (typeof window === 'undefined') return;
    const frameId = frameMapRef.current.get(cardNode);
    if (frameId === undefined) return;
    window.cancelAnimationFrame(frameId);
    frameMapRef.current.delete(cardNode);
  };

  const handleResearchCardMouseMove = (event) => {
    const card = event.currentTarget;
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    scheduleCardAnimationFrame(researchFrameMapRef, card, () => {
      const rect = card.getBoundingClientRect();
      const x = (pointerX - rect.left) / rect.width;
      const y = (pointerY - rect.top) / rect.height;

      const rotateX = (y - 0.5) * 10;
      const rotateY = (0.5 - x) * 12;

      card.style.setProperty('--research-rotate-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--research-rotate-y', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--research-glow-x', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--research-glow-y', `${(y * 100).toFixed(1)}%`);
      card.style.setProperty('--research-scale', '1.012');
    });
  };

  const handleResearchCardMouseLeave = (event) => {
    const card = event.currentTarget;
    cancelCardAnimationFrame(researchFrameMapRef, card);
    card.style.setProperty('--research-rotate-x', '0deg');
    card.style.setProperty('--research-rotate-y', '0deg');
    card.style.setProperty('--research-glow-x', '50%');
    card.style.setProperty('--research-glow-y', '50%');
    card.style.setProperty('--research-scale', '1');
  };

  const handleTiltCardMouseEnter = (event) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-lift', '-4px');
    card.style.setProperty('--tilt-scale', '1.012');
  };

  const handleTiltCardMouseMove = (event) => {
    const card = event.currentTarget;
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    scheduleCardAnimationFrame(tiltFrameMapRef, card, () => {
      const rect = card.getBoundingClientRect();
      const x = (pointerX - rect.left) / rect.width;
      const y = (pointerY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 10;
      const rotateY = (x - 0.5) * 12;

      card.style.setProperty('--tilt-rotate-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-rotate-y', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--tilt-scale', '1.016');
      card.style.setProperty('--tilt-lift', '-4px');
    });
  };

  const handleTiltCardMouseLeave = (event) => {
    const card = event.currentTarget;
    cancelCardAnimationFrame(tiltFrameMapRef, card);
    card.style.setProperty('--tilt-rotate-x', '0deg');
    card.style.setProperty('--tilt-rotate-y', '0deg');
    card.style.setProperty('--tilt-scale', '1');
    card.style.setProperty('--tilt-lift', '0px');
  };

  const tiltCardStyle = {
    '--tilt-rotate-x': '0deg',
    '--tilt-rotate-y': '0deg',
    '--tilt-scale': '1',
    '--tilt-lift': '0px',
    transform: 'perspective(1100px) translateY(var(--tilt-lift)) rotateX(var(--tilt-rotate-x)) rotateY(var(--tilt-rotate-y)) scale(var(--tilt-scale))'
  };
  const enableTiltEffects = !isCompactViewport;
  const tiltTransformClassName = enableTiltEffects ? 'transform-gpu will-change-transform' : '';
  const tiltCardStyleForViewport = enableTiltEffects ? tiltCardStyle : undefined;
  const researchCardTiltStyleForViewport = enableTiltEffects
    ? {
      '--research-rotate-x': '0deg',
      '--research-rotate-y': '0deg',
      '--research-glow-x': '50%',
      '--research-glow-y': '50%',
      '--research-scale': '1',
      transform: 'perspective(1100px) rotateX(var(--research-rotate-x)) rotateY(var(--research-rotate-y)) scale(var(--research-scale))'
    }
    : undefined;

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section
        data-ug-hero="true"
        className="relative -mt-4 pt-7 sm:mt-0 sm:pt-4 pb-16 sm:pb-20 lg:pt-12 lg:pb-20 xl:pb-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950"></div>
        <div className="absolute inset-x-0 -top-8 sm:top-0 bottom-0 bg-[radial-gradient(circle_at_20%_8%,rgba(114,191,0,0.12),transparent_46%),radial-gradient(circle_at_80%_70%,rgba(1,49,45,0.10),transparent_46%)]"></div>
        <div className="absolute -top-44 sm:-top-28 -left-28 w-72 h-72 rounded-full bg-emerald-300/15 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-teal-300/20 blur-3xl"></div>
        {!isCompactViewport && renderHeroParticles && (
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <Suspense fallback={null}>
              <Particles
                className="w-full h-full"
                particleCount={130}
                particleSpread={10}
                speed={0.085}
                particleBaseSize={88}
                moveParticlesOnHover={allowHeavyHeroEffects}
                particleHoverFactor={0.38}
                alphaParticles={false}
                disableRotation={false}
                pixelRatio={1}
                sizeRandomness={0.85}
                cameraDistance={21}
              />
            </Suspense>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:hidden pt-4">
            <div className="mobile-hero-shell mobile-hero-shine relative overflow-visible">
              <div className="mobile-hero-orbit mobile-hero-orbit--a" aria-hidden="true" />
              <div className="mobile-hero-orbit mobile-hero-orbit--b" aria-hidden="true" />
              <div className="mobile-hero-ribbon" aria-hidden="true" />
              <div className="mobile-brand-pulse absolute -top-20 -right-14 h-56 w-56 rounded-full bg-emerald-300/40 dark:bg-emerald-700/30 blur-3xl" />
              <div className="mobile-brand-pulse absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-teal-300/35 dark:bg-cyan-700/20 blur-3xl" />

              <div className="mobile-hero-flow relative z-[2] px-1 pb-2 pt-3 sm:px-2">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="mobile-hero-chip mobile-hero-chip--stage mobile-hero-chip--tilt-left inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300/75 dark:border-emerald-700/60 bg-white/80 dark:bg-slate-950/55 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                    Technical Design Stage
                  </div>
                  <div className="mobile-hero-chip mobile-hero-chip--focus mobile-hero-chip--tilt-right inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-300/70 dark:border-emerald-500/45 bg-emerald-50/70 dark:bg-emerald-900/20 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Kolkata Focus
                  </div>
                </div>

                <h1 className="mobile-display-type mobile-hero-title mt-4 text-[2.05rem] sm:text-[2.35rem] font-black text-slate-900 dark:text-white leading-[1.01]">
                  Engineered Urban Mining.
                  <span className="mobile-hero-title-emphasis block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-lime-600 dark:from-emerald-300 dark:via-teal-300 dark:to-lime-300">
                    Built for Precision Yield.
                  </span>
                </h1>

                <p className="mobile-hero-copy mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  Urban Gold India is building a research-led recovery platform that converts PCB-rich e-waste into
                  compliant, high-value precious-metal output.
                </p>

                <div className="mobile-hero-readiness mt-4">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.15em] font-semibold text-slate-600 dark:text-slate-300">
                    <span>Readiness Signal</span>
                    <span>Design-to-Pilot 42%</span>
                  </div>
                  <div className="mobile-hero-readiness-track mt-2">
                    <span className="mobile-hero-readiness-fill" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { value: 'PCB Core', label: 'Feedstock' },
                    { value: 'Yield-led', label: 'Process' },
                    { value: 'Compliant', label: 'Scale-up' }
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="mobile-hero-kpi rounded-xl border border-slate-200/80 dark:border-slate-700/70 bg-gradient-to-br from-white/90 via-white/82 to-slate-50/70 dark:from-slate-900/86 dark:via-slate-900/80 dark:to-slate-800/72 px-2.5 py-2.5 text-center"
                    >
                      <p className="text-[11px] font-black text-slate-900 dark:text-white leading-none">{item.value}</p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mobile-hero-visual mt-4 rounded-[1.35rem] overflow-hidden border border-slate-200/70 dark:border-slate-700/75 bg-slate-950 relative">
                  <img
                    src="/bg_images/2025-04-11T052611Z_136930174_RC26UDAK1OEA_RTRMADP_3_INDIA-EWASTE.JPG"
                    alt="E-waste collection and sorting activity in India"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-[186px] sm:h-[214px] object-cover scale-[1.07] saturate-[1.08]"
                  />
                  <div className="mobile-hero-scanline" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/45 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <div className="mobile-hero-chip mobile-hero-chip--signal inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-300/40 bg-black/45 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                      Process Signal
                    </div>
                    <div className="mobile-hero-float rounded-xl border border-emerald-200/35 bg-black/45 px-2.5 py-1.5 text-right backdrop-blur">
                      <p className="text-[8px] uppercase tracking-[0.16em] text-emerald-200/90">Yield Intent</p>
                      <p className="text-[12px] font-black text-white leading-none">High</p>
                    </div>
                  </div>

                  <div className="absolute left-3 right-3 bottom-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-emerald-300">Urban Gold Engine</p>
                    <p className="mt-1 text-white text-sm leading-relaxed">Precision architecture for high-value e-waste recovery streams.</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Button
                    asChild
                    className="mobile-hero-primary-btn h-11 w-full text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-700 shadow-[0_14px_30px_rgba(16,185,129,0.32)] transition-all duration-300"
                  >
                    <Link to="/roadmap" className="inline-flex items-center justify-center">
                      Explore Roadmap
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="mobile-hero-secondary-btn h-11 w-full text-sm font-semibold rounded-xl border border-slate-300/80 dark:border-slate-700 bg-white/75 dark:bg-slate-900/65 backdrop-blur hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                  >
                    <Link to="/investors">Investor Info</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 xl:col-span-7 space-y-5 xl:space-y-6">
              <div className="inline-flex w-auto items-center justify-start gap-2 mt-1 px-4 py-2 rounded-full border border-slate-300/70 dark:border-emerald-700/70 bg-white/70 dark:bg-gray-900/50 backdrop-blur text-sm font-semibold leading-snug text-emerald-900 dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                Development Stage: Technical Design & Regulatory Preparation
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl xl:text-6xl font-black text-gray-900 dark:text-white leading-[1.06] tracking-tight">
                  We Don&apos;t Mine the Earth.
                  <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700">
                    We Engineer Systems to Recover Its Value.
                  </span>
                </h1>

                <p className="text-base xl:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                  Urban Gold India is building a research-led industrial recovery platform for precious metals from
                  PCBs and high-value electronic waste streams across India&apos;s circular economy.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 xl:gap-4 max-w-2xl">
                {[
                  { value: 'PCB-first', label: 'Process focus' },
                  { value: 'High-yield', label: 'Recovery intent' },
                  { value: 'Regulatory', label: 'Compliance-led' }
                ].map((item) => (
                  <div
                    key={item.value}
                    className="rounded-xl border border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur px-4 py-3"
                  >
                    <p className="text-base font-bold text-gray-900 dark:text-white">{item.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 -mt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-600 hover:from-emerald-400 hover:via-emerald-600 hover:to-teal-700 shadow-[0_14px_32px_rgba(114,191,0,0.35)] hover:shadow-[0_18px_38px_rgba(114,191,0,0.45)] transition-all duration-300"
                >
                  <Link to="/roadmap" className="group inline-flex items-center justify-center text-center">
                    Explore Development Roadmap
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base font-semibold rounded-xl border border-gray-300/80 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 backdrop-blur hover:bg-white dark:hover:bg-gray-900 hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                >
                  <Link to="/investors">Investor Information</Link>
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-4 xl:col-span-5 mt-0">
              <div className="relative h-[31rem] xl:h-[34rem] lg:-mr-16 xl:-mr-24 2xl:-mr-28">
                <div className="hero-wireframe-stage" aria-hidden="true">
                  <div className="hero-wireframe-canvas">
                    {heroWireframeColumns.map((column, columnIndex) => (
                      <div
                        key={`hero-wireframe-column-${columnIndex}`}
                        className={`hero-wireframe-column hero-wireframe-column--${String.fromCharCode(97 + columnIndex)}`}
                      >
                        {column.map((card, cardIndex) => (
                          <article
                            key={`hero-wireframe-card-${columnIndex}-${cardIndex}`}
                            className="hero-wireframe-card"
                            style={{ '--hero-wireframe-card-height': `${card.height}px` }}
                          >
                            <img
                              src={heroWireframeImages[(columnIndex * 4 + cardIndex) % heroWireframeImages.length]}
                              alt=""
                              decoding="async"
                              className="hero-wireframe-card-image"
                            />
                          </article>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span ref={heroEndRef} className="block h-px w-full" aria-hidden="true" />
      </section>

      <div className="relative z-30 -mt-6 -mx-3 sm:mx-0 sm:-mt-12 lg:-mt-14 px-0 sm:px-4 lg:px-6 md:-ml-10 lg:-ml-14">
        <div className="mx-auto max-w-[94rem]">
          <HeroTicker items={heroMarqueeItems} className="hero-ticker--boundary" />
        </div>
      </div>

      {/* Strategic Resource Landscape */}
      <section className="home-deferred-section pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-28 bg-[radial-gradient(circle_at_10%_0%,_#EAFDE7_0%,_#ffffff_44%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_8%_2%,_rgba(114,191,0,0.12)_0%,_#0b0b10_46%,_#050508_100%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-35 dark:opacity-20 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-28 -right-24 w-[28rem] h-[28rem] rounded-full bg-emerald-300/30 dark:bg-emerald-700/[0.18] blur-3xl"></div>
        <div className="absolute -bottom-32 -left-24 w-[30rem] h-[30rem] rounded-full bg-teal-300/20 dark:bg-teal-700/[0.12] blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            <Card className="lg:col-span-8 relative overflow-hidden rounded-3xl border border-gray-200/85 dark:border-emerald-900/45 bg-white/[0.82] dark:bg-gradient-to-br dark:from-slate-950/[0.98] dark:via-slate-900/[0.96] dark:to-emerald-950/[0.9] backdrop-blur dark:backdrop-blur-none p-6 sm:p-8 lg:p-10 shadow-[0_24px_56px_rgba(15,23,42,0.10)] dark:shadow-[0_24px_56px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-400"></div>
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-emerald-700 dark:text-emerald-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                Strategic Resource Landscape
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-[3.1rem] font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight">
                India&apos;s Untapped Above-Ground Resource Base
              </h2>
              <p className="mt-5 text-base lg:text-lg text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
                E-waste volumes are scaling faster than compliant recovery systems. This creates a high-conviction
                opening for precision urban mining with strong environmental and economic multipliers.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: '1.6M+ t/yr', label: 'National e-waste stream' },
                  { value: 'Metal-dense PCBs', label: 'Premium recovery input' },
                  { value: 'Infra gap', label: 'Industrial white space' }
                ].map((item) => (
                  <div
                    key={item.value}
                    className="rounded-xl border border-gray-200/85 dark:border-slate-700/75 bg-gradient-to-br from-white/[0.9] via-white/[0.86] to-slate-50/[0.74] dark:from-slate-900/[0.9] dark:via-slate-900/[0.86] dark:to-slate-800/[0.84] px-4 py-3"
                  >
                    <p className="text-sm sm:text-base font-black text-gray-900 dark:text-white">{item.value}</p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
              <Card className="relative overflow-hidden rounded-2xl border border-slate-200/85 dark:border-emerald-800/55 bg-gradient-to-br from-slate-50 via-slate-50 to-white dark:from-slate-900/[0.96] dark:via-emerald-950/[0.38] dark:to-teal-950/[0.28] p-5 sm:p-6">
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-emerald-300/35 dark:bg-emerald-500/[0.24] blur-2xl pointer-events-none" />
                <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-400">Opportunity Index</p>
                <p className="mt-3 text-4xl font-black text-gray-900 dark:text-white leading-none">A+</p>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Strong alignment across feedstock growth, recovery value, and policy direction.
                </p>
              </Card>

              <Card className="rounded-2xl border border-gray-200/85 dark:border-slate-700/75 bg-white/80 dark:bg-slate-900/[0.78] backdrop-blur p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-gray-500 dark:text-gray-400">Audience Hook</p>
                <p className="mt-3 text-lg font-black text-gray-900 dark:text-white leading-tight">
                  Gold exists in cities before it exists in mines.
                </p>
                <div className="mt-4 h-2 rounded-full bg-gray-200/80 dark:bg-slate-700/70 overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-emerald-700 to-teal-700"></div>
                </div>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Resource accessibility confidence: 78%</p>
              </Card>
            </div>
          </div>

          <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-[minmax(168px,_auto)]">
            {opportunities.map((opp, idx) => {
              const Icon = [Recycle, Target, Building2, Zap][idx % 4];
              const layoutClasses = [
                'sm:col-span-2 lg:col-span-5 lg:row-span-2',
                'lg:col-span-3',
                'lg:col-span-4',
                'sm:col-span-2 lg:col-span-7'
              ];
              const toneClasses = [
                'from-slate-50/95 via-white to-slate-50/65 dark:from-slate-900/[0.96] dark:via-slate-900/[0.92] dark:to-emerald-950/[0.32] border-slate-200/85 dark:border-emerald-800/[0.52]',
                'from-white to-gray-50 dark:from-slate-900/95 dark:via-slate-900/[0.92] dark:to-cyan-950/[0.24] border-gray-200/85 dark:border-slate-700/[0.72]',
                'from-white to-gray-50 dark:from-slate-900/95 dark:via-slate-900/[0.92] dark:to-teal-950/[0.22] border-gray-200/85 dark:border-slate-700/[0.72]',
                'from-slate-50/70 via-white to-slate-50/50 dark:from-slate-900/95 dark:via-emerald-950/[0.28] dark:to-teal-950/30 border-slate-200/80 dark:border-teal-800/55'
              ];
              const tags = [
                'Primary Feedstock',
                'Value Density',
                'System Constraint',
                'Scale Lever'
              ];

              return (
                <Card
                  key={idx}
                  onMouseEnter={handleTiltCardMouseEnter}
                  onMouseMove={handleTiltCardMouseMove}
                  onMouseLeave={handleTiltCardMouseLeave}
                  className={`${layoutClasses[idx] || 'lg:col-span-4'} group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${toneClasses[idx] || toneClasses[1]} p-5 sm:p-6 lg:p-7 ${tiltTransformClassName} transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_24px_52px_rgba(15,23,42,0.14)] dark:hover:shadow-[0_24px_52px_rgba(0,0,0,0.5)]`}
                  style={tiltCardStyleForViewport}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-700/95 to-teal-700/90" />
                  <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-emerald-200/45 dark:bg-emerald-700/[0.22] blur-2xl pointer-events-none opacity-80" />

                  <div className="relative h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="inline-flex items-center justify-center h-8 px-2.5 rounded-lg bg-gray-900 text-white dark:bg-emerald-500/90 dark:text-white text-[10px] font-black tracking-[0.16em] uppercase">
                        {`0${idx + 1}`}
                      </div>
                      <div className="inline-flex h-10 w-10 rounded-xl bg-white/92 dark:bg-slate-800/85 border border-gray-200/85 dark:border-slate-700/90 items-center justify-center">
                        <Icon className="h-4.5 w-4.5 text-gray-800 dark:text-emerald-100" />
                      </div>
                    </div>

                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                      {tags[idx] || 'Opportunity'}
                    </p>
                    <h3 className="text-lg sm:text-xl lg:text-[1.45rem] font-black text-gray-900 dark:text-white leading-snug">
                      {opp.title}
                    </h3>
                    <p className="mt-3 text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {opp.description}
                    </p>

                    {idx === 0 && opp.image && (
                      <div className="mt-5 relative flex-1 min-h-[180px] sm:min-h-[210px] overflow-hidden rounded-2xl border border-slate-200/85 dark:border-emerald-800/65 bg-gray-100 dark:bg-gray-900">
                        <img
                          src={opp.image}
                          alt={opp.imageAlt || opp.title}
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          loading={isCompactViewport ? 'eager' : 'lazy'}
                          fetchPriority={isCompactViewport ? 'high' : 'auto'}
                          decoding="async"
                          onError={(event) => {
                            const currentSrc = event.currentTarget.src;
                            if (opp.fallbackImage && !currentSrc.includes(opp.fallbackImage)) {
                              event.currentTarget.src = opp.fallbackImage;
                              return;
                            }
                            if (!currentSrc.includes(localCardImageFallback)) {
                              event.currentTarget.src = localCardImageFallback;
                            }
                          }}
                        />
                        <span className="absolute left-3.5 top-3.5 inline-flex items-center rounded-full border border-white/55 dark:border-white/60 bg-slate-950/78 dark:bg-slate-900/82 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white dark:text-white shadow-[0_8px_20px_rgba(2,6,23,0.55)] ring-1 ring-black/40 dark:ring-white/15 backdrop-blur-md">
                          Feedstock Snapshot
                        </span>
                      </div>
                    )}

                    <div className="mt-auto pt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-600 dark:text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                      {idx === 0 ? 'High Availability' : idx === 1 ? 'Premium Yield Potential' : idx === 2 ? 'Execution Bottleneck' : 'First-Mover Edge'}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <div className="relative z-30 -mx-3 sm:mx-0 -mt-5 sm:-mt-6 lg:-mt-8 -mb-4 sm:-mb-6 lg:-mb-8 px-0 sm:px-4 lg:px-6 md:-ml-10 lg:-ml-14 md:-mr-16 lg:-mr-24">
        <div className="mx-auto max-w-[98rem]">
          <ResearchLogisticsMarquee className="recovery-marquee--boundary" />
        </div>
      </div>

      {/* Research Documents */}
      <section className="pt-12 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-24 bg-[radial-gradient(circle_at_8%_12%,_#EAFDE7_0%,_#ffffff_42%,_#f8f9fb_100%)] dark:bg-[radial-gradient(circle_at_10%_14%,_rgba(114,191,0,0.12)_0%,_#09090b_44%,_#040405_100%)] relative overflow-hidden">
        <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-emerald-300/25 dark:bg-emerald-600/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-7 sm:mb-9">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-emerald-700 dark:text-emerald-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                Research Dossier
              </p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                Research Documents
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                A structured document stack covering feedstock intelligence, technical process validation,
                compliance readiness, and commercial sensitivity for phased execution.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 w-full sm:w-auto sm:min-w-[360px]">
              {[
                { label: 'Documents', value: '06' },
                { label: 'Coverage', value: 'End-to-End' },
                { label: 'Latest', value: 'Q1 2026' }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200/80 dark:border-emerald-800/65 bg-white/75 dark:bg-gray-900/65 backdrop-blur px-3 py-2.5 text-center"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-400">{item.label}</p>
                  <p className="mt-1 text-xs sm:text-sm font-black text-gray-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 auto-rows-[minmax(154px,_auto)]">
            {researchDocuments.map((doc) => {
              const Icon = doc.icon;
              const isInteractiveResearchCard = Boolean(doc.pdfUrl);
              const isPrimaryResearchCard = doc.code === defaultResearchDocCode;
              const statusClass =
                doc.status === 'Completed'
                  ? 'bg-slate-100/90 dark:bg-emerald-900/35 text-emerald-700 dark:text-emerald-300 border-slate-200/90 dark:border-emerald-800/55'
                  : 'bg-slate-100/90 dark:bg-emerald-900/35 text-emerald-700 dark:text-emerald-300 border-slate-200/90 dark:border-emerald-800/55';

              return (
                <Card
                  key={doc.code}
                  onClick={isInteractiveResearchCard ? () => openResearchModal(doc) : undefined}
                  onKeyDown={
                    isInteractiveResearchCard
                      ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          openResearchModal(doc);
                        }
                      }
                      : undefined
                  }
                  role={isInteractiveResearchCard ? 'button' : undefined}
                  tabIndex={isInteractiveResearchCard ? 0 : undefined}
                  aria-label={isInteractiveResearchCard ? `${doc.title} - open document` : undefined}
                  onMouseMove={handleResearchCardMouseMove}
                  onMouseLeave={handleResearchCardMouseLeave}
                  className={`${doc.layout} group/doc relative overflow-hidden rounded-2xl border bg-gradient-to-br ${doc.tone} shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:shadow-[0_14px_34px_rgba(0,0,0,0.32)] hover:shadow-[0_24px_54px_rgba(15,23,42,0.16)] dark:hover:shadow-[0_24px_54px_rgba(0,0,0,0.52)] ${tiltTransformClassName} transition-all duration-300 ease-out ${isInteractiveResearchCard ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900' : ''}`}
                  style={researchCardTiltStyleForViewport}
                >
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/90 via-white/86 to-white/96 dark:from-gray-900/90 dark:via-gray-900/84 dark:to-gray-900/95" />
                  <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-35 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:26px_26px]" />
                  <div className="absolute -top-14 -right-10 h-28 w-28 rounded-full bg-emerald-300/35 dark:bg-emerald-600/20 blur-2xl pointer-events-none" />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(circle at var(--research-glow-x, 50%) var(--research-glow-y, 50%),
                          rgba(191,242,2,0.2) 0%,
                          rgba(191,242,2,0.08) 20%,
                          transparent 52%
                        ),
                        radial-gradient(circle at 0% 0%,
                          rgba(1,49,45,0.12) 0%,
                          transparent 38%
                        )
                      `
                    }}
                  />

                  <div className="relative p-4 sm:p-5 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="inline-flex h-10 w-10 rounded-xl bg-white/95 dark:bg-gray-900/90 border border-gray-200/90 dark:border-gray-700/80 items-center justify-center shadow-[0_8px_18px_rgba(15,23,42,0.10)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
                          <Icon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                            {doc.code}
                          </p>
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400 truncate">
                            {doc.focus}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[10px] uppercase tracking-[0.16em] font-semibold px-2.5 py-1 rounded-full border ${statusClass}`}>
                        {doc.status}
                      </span>
                    </div>

                    <h3 className="text-[1.02rem] sm:text-[1.08rem] font-black text-gray-900 dark:text-white leading-snug">
                      {doc.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {doc.summary}
                    </p>

                    {doc.highlights && (
                      <div className="mt-3.5 flex flex-wrap gap-2">
                        {doc.highlights.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-slate-300/90 dark:border-slate-300/90 bg-white/95 dark:bg-white/95 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-black dark:text-black shadow-[0_8px_18px_rgba(15,23,42,0.16)] dark:shadow-[0_8px_18px_rgba(2,6,23,0.55)]"
                            style={{ color: '#000000' }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {isPrimaryResearchCard && (
                      <div className={`mt-4 flex-1 min-h-[160px] sm:min-h-[190px] lg:min-h-[220px] rounded-xl border border-slate-200/85 dark:border-emerald-800/60 overflow-hidden relative ${doc.image ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gradient-to-br from-white/88 via-white/82 to-slate-50/75 dark:from-gray-900/88 dark:via-gray-900/84 dark:to-emerald-950/24'}`}>
                        {doc.image ? (
                          <img
                            src={doc.image}
                            alt={`${doc.title} visual placeholder`}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading={isCompactViewport ? 'eager' : 'lazy'}
                            fetchPriority={isCompactViewport ? 'high' : 'auto'}
                            decoding="async"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(114,191,0,0.24),transparent_44%),radial-gradient(circle_at_88%_86%,rgba(1,49,45,0.2),transparent_42%)]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                              <Icon className="h-6 w-6" />
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Image Placeholder</p>
                            </div>
                            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg border border-slate-200/80 dark:border-emerald-700/60 bg-white/88 dark:bg-gray-900/80 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                              Featured Preview
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-200">Deck Visual</p>
                              <p className="mt-1 text-xs sm:text-sm text-white/90 leading-snug line-clamp-2">
                                {doc.modalTitle || doc.title}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <div className={`${isPrimaryResearchCard ? 'mt-4' : 'mt-auto'} pt-4 flex items-center justify-between gap-3 border-t border-gray-200/85 dark:border-gray-800/85`}>
                      <p className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
                        {doc.pages} | {doc.period}
                      </p>
                      <span className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-gray-200/90 dark:border-gray-700/80 bg-white/90 dark:bg-gray-900/85 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                        {isInteractiveResearchCard ? 'Open PDF' : 'Read Brief'}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/doc:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Dialog open={isResearchModalOpen} onOpenChange={handleResearchModalOpenChange}>
        <DialogContent className="w-[calc(100vw-0.75rem)] sm:w-[min(96vw,1240px)] max-w-[1240px] h-[84vh] sm:h-[90vh] lg:h-[92vh] p-0 overflow-hidden border border-slate-200/75 dark:border-emerald-800/65 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-[0_32px_90px_rgba(15,23,42,0.36)] dark:shadow-[0_32px_90px_rgba(0,0,0,0.64)] rounded-2xl dark:ring-1 dark:ring-emerald-800/45 [&>button]:top-2.5 [&>button]:right-2 sm:[&>button]:top-3 sm:[&>button]:right-3 [&>button]:z-50 [&>button]:inline-flex [&>button]:items-center [&>button]:justify-center [&>button]:p-0 [&>button]:leading-none [&>button]:h-8 [&>button]:w-8 sm:[&>button]:h-9 sm:[&>button]:w-9 [&>button]:rounded-full [&>button]:opacity-100 [&>button]:border [&>button]:border-gray-200/90 dark:[&>button]:border-emerald-700/80 [&>button]:bg-white/95 dark:[&>button]:bg-gray-900/95 [&>button]:text-gray-600 dark:[&>button]:text-emerald-200 [&>button]:shadow-[0_10px_24px_rgba(15,23,42,0.18)] dark:[&>button]:shadow-[0_10px_24px_rgba(0,0,0,0.5)] [&>button]:backdrop-blur-md [&>button]:transition-all [&>button]:duration-200 [&>button]:hover:bg-slate-50 [&>button]:hover:text-emerald-700 [&>button]:hover:border-slate-300 dark:[&>button]:hover:bg-emerald-950/40 dark:[&>button]:hover:text-emerald-300 dark:[&>button]:hover:border-emerald-600 [&>button]:focus:outline-none [&>button]:focus-visible:ring-2 [&>button]:focus-visible:ring-emerald-400/85 [&>button]:focus-visible:ring-offset-2 [&>button]:focus-visible:ring-offset-white dark:[&>button]:focus-visible:ring-offset-gray-950 [&>button>svg]:h-[16px] [&>button>svg]:w-[16px] [&>button>svg]:shrink-0">
          <div className="relative h-full overflow-y-auto lg:overflow-hidden flex flex-col">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(191,242,2,0.16),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(1,49,45,0.14),transparent_34%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(114,191,0,0.2),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(1,49,45,0.2),transparent_36%)]" />

            <div className="sticky top-0 z-30 pl-4 pr-20 sm:pl-5 sm:pr-24 lg:pl-6 lg:pr-24 py-3 border-b border-gray-200/80 dark:border-emerald-900/55 bg-white/92 dark:bg-gray-950/92 backdrop-blur-md dark:shadow-[inset_0_-1px_0_rgba(16,185,129,0.14)]">
              <div className="flex items-center justify-between gap-2.5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-400">Embedded Preview</p>
                  <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">Scroll inside the frame to navigate all pages smoothly.</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200/85 dark:border-emerald-700/70 bg-slate-100/90 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 text-[10px] uppercase tracking-[0.16em] font-semibold shadow-[0_8px_18px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_18px_rgba(2,6,23,0.55)] ml-auto mr-10 sm:mr-11">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Ready
                </span>
              </div>
            </div>

            <div className="relative flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[340px_1fr]">
              <section className="order-1 lg:order-2 flex flex-col border-b lg:border-b-0 lg:border-l border-gray-200/80 dark:border-gray-800/80">
                <div className="p-2.5 sm:p-4 lg:p-5 bg-gradient-to-b from-slate-50/45 via-white to-gray-50 dark:from-emerald-950/20 dark:via-gray-950 dark:to-gray-950">
                  <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 ring-1 ring-emerald-200/50 dark:ring-emerald-800/35 shadow-[0_16px_42px_rgba(15,23,42,0.14)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.45)] h-[46vh] sm:h-[54vh] lg:h-[calc(92vh-110px)] lg:min-h-[64vh]">
                    {renderResearchPreview ? (
                      isCompactViewport ? (
                        <Suspense
                          fallback={
                            <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-950 dark:to-gray-900 px-4">
                              <div className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-900/80 px-4 py-5 text-center">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                                  Loading Preview Engine
                                </p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                  Preparing mobile PDF rendering...
                                </p>
                              </div>
                            </div>
                          }
                        >
                          <MobilePdfScrollPreview
                            fileUrl={activeResearchPdfUrl}
                          />
                        </Suspense>
                      ) : (
                        <iframe
                          title={activeResearchDoc?.modalTitle || activeResearchDoc?.title || 'research-document'}
                          src={activeResearchPdfUrl}
                          className="w-full h-full"
                        />
                      )
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-950 dark:to-gray-900 px-4">
                        <div className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-900/80 px-4 py-5 text-center">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                            Preparing Preview
                          </p>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Optimizing document rendering...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <aside className="modal-details-scrollbar order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-gray-200/80 dark:border-gray-800/80 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-5 bg-white/76 dark:bg-[#060b13] dark:shadow-[inset_1px_0_0_rgba(16,185,129,0.12)] backdrop-blur-md flex flex-col lg:h-full lg:overflow-y-scroll">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-slate-200/80 dark:border-emerald-800/70 bg-white/80 dark:bg-emerald-950/30 text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  Research Dossier
                </div>

                <DialogHeader className="mt-3 sm:mt-4 text-left">
                  <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                    {activeResearchDoc?.modalTitle || activeResearchDoc?.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {activeResearchDoc?.modalDescription || activeResearchDoc?.summary}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 font-semibold">Document ID</p>
                    <p className="mt-1 text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{activeResearchDoc?.code}</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 font-semibold">Version</p>
                    <p className="mt-1 text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{activeResearchVersion}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-gray-500 dark:text-gray-400 mb-2">What This Deck Covers</p>
                  <div className="space-y-2">
                    {activeResearchSummary.map((item, idx) => (
                      <div key={item} className={`rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white/75 dark:bg-gray-900/80 px-3 py-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-100 leading-relaxed ${idx > 0 ? 'hidden sm:block' : ''}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 hidden sm:block">
                  <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Signals</p>
                  <div className="grid grid-cols-1 gap-2">
                    {activeResearchMetrics.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-200/75 dark:border-emerald-800/60 bg-slate-50/65 dark:bg-emerald-950/40 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 lg:mt-auto pt-2 lg:pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  <a
                    href={activeResearchPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 text-white text-xs font-semibold tracking-[0.08em] uppercase shadow-[0_10px_24px_rgba(114,191,0,0.35)] hover:from-emerald-400 hover:to-teal-700 transition-all duration-200"
                  >
                    View PDF
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={activeResearchPdfUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/75 text-gray-700 dark:text-gray-200 text-xs font-semibold tracking-[0.08em] uppercase hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200"
                  >
                    Download PDF
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative z-30 -mx-3 sm:mx-0 -mt-5 sm:-mt-6 lg:-mt-8 -mb-4 sm:-mb-6 lg:-mb-8 px-0 sm:px-4 lg:px-6 md:-ml-10 lg:-ml-14 md:-mr-16 lg:-mr-24">
        <div className="mx-auto max-w-[98rem]">
          <ResearchLogisticsMarquee className="recovery-marquee--boundary recovery-marquee--tilt-right" />
        </div>
      </div>

      {/* Our Focus - Process Stages */}
      <section className="home-deferred-section py-12 sm:py-16 lg:py-32 bg-gray-50 dark:bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-emerald-100/60 to-transparent dark:from-emerald-900/10"></div>
        <div className="absolute -bottom-28 right-0 w-96 h-96 rounded-full bg-teal-200/20 dark:bg-teal-700/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-emerald-700 dark:text-emerald-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
              Technical System Architecture
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
              A Precision Urban Metal Recovery System
            </h2>
            <p className="mt-5 text-base lg:text-lg text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
              The platform is designed as a staged recovery stack, balancing throughput, compliance, and metallurgical yield across each phase.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-emerald-300 via-teal-400 to-emerald-300 dark:from-emerald-700 dark:via-teal-700 dark:to-emerald-700"></div>

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {processStages.map((process, idx) => {
                const Icon = process.icon;
                return (
                  <Card
                    key={idx}
                    onMouseEnter={handleTiltCardMouseEnter}
                    onMouseMove={handleTiltCardMouseMove}
                    onMouseLeave={handleTiltCardMouseLeave}
                    className={`relative p-5 sm:p-6 lg:p-8 bg-white/90 dark:bg-gray-900/80 backdrop-blur border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg shadow-black/[0.03] dark:shadow-black/30 ${tiltTransformClassName} hover:border-emerald-400 dark:hover:border-emerald-600 transition-[transform,box-shadow,border-color] duration-300 ease-out`}
                    style={tiltCardStyleForViewport}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 sm:mb-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-700 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                            {process.stage}
                          </p>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight mt-1">
                            {process.title}
                          </h3>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        {process.status || 'Core Stage'}
                      </span>
                    </div>

                    <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                      {process.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-500 flex-shrink-0"></span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-500 dark:text-gray-400 mb-1.5">
                        {process.objective ? 'Objective' : 'Output'}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {process.objective || 'Bullion-grade and assay-ready pathway buildout'}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-30 -mx-3 sm:mx-0 -mt-5 sm:-mt-6 lg:-mt-8 -mb-4 sm:-mb-6 lg:-mb-8 px-0 sm:px-4 lg:px-6 md:-ml-10 lg:-ml-14 md:-mr-16 lg:-mr-24">
        <div className="mx-auto max-w-[98rem]">
          <ResearchLogisticsMarquee className="recovery-marquee--boundary" />
        </div>
      </div>

      {/* Timeline Section */}
      <section className="home-deferred-section py-12 sm:py-16 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-gradient-to-r from-emerald-200/20 to-teal-200/20 dark:from-emerald-800/10 dark:to-teal-800/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-teal-200/15 dark:bg-teal-900/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="mb-10 sm:mb-14 lg:mb-16 grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-emerald-700 dark:text-emerald-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                Execution Roadmap
              </p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                Current Development Stage
              </h2>
            </div>
            <p className="lg:col-span-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Structured progression from technical design to deployment - each milestone mapped to execution readiness.
            </p>
          </div>

          {/* Main layout */}
          <div className="grid xl:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">

            {/* ── Program Pulse Card ── */}
            <div className="xl:col-span-4 min-w-0">
              <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-950 p-4 sm:p-5 lg:p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_34px_rgba(0,0,0,0.35)]">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    Program Pulse
                  </p>
                  <span className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-200">
                    {overallReadiness}% Ready
                  </span>
                </div>

                <div className="lg:hidden min-w-0 space-y-3.5">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70 p-3.5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                          Execution Readiness
                        </p>
                        <p className="mt-1 text-2xl font-black leading-none text-slate-900 dark:text-white">
                          {overallReadiness}
                          <span className="ml-0.5 text-sm font-semibold text-slate-500 dark:text-slate-400">%</span>
                        </p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-slate-500/10">
                        <span className="h-2 w-2 rounded-full bg-slate-500" />
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-teal-700 transition-all duration-700"
                        style={{ width: `${overallReadiness}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/80 px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Live</p>
                      <p className="mt-1 text-lg font-black leading-none text-slate-900 dark:text-white">{liveTrackCount}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/80 px-3 py-2.5 text-right">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Next</p>
                      <p className="mt-1 text-lg font-black leading-none text-slate-900 dark:text-white">{upcomingGateCount}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-2.5">
                    <div className="space-y-2">
                      {phasePulseMetrics.map((item) => {
                        const Icon = item.icon;
                        const isLive = item.status === 'active' || item.status === 'in-progress';
                        const barColor = isLive ? 'bg-slate-500' : 'bg-slate-500/60 dark:bg-slate-300/75';

                        return (
                          <div key={item.label} className="min-w-0 rounded-lg border border-slate-200/85 dark:border-slate-800/85 bg-slate-50/85 dark:bg-slate-950/60 px-2.5 py-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex min-w-0 items-center gap-2">
                                <div
                                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${isLive
                                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                    }`}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                </div>
                                <p className="pr-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] leading-tight text-slate-600 dark:text-slate-300">
                                  {item.label}
                                </p>
                              </div>
                              <p className="shrink-0 text-[10px] font-bold text-slate-700 dark:text-slate-300">{item.pct}%</p>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                                style={{ width: `${Math.max(item.pct, 0)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70 p-4">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                          Execution Readiness
                        </p>
                        <p className="mt-1 text-3xl font-black leading-none text-slate-900 dark:text-white">
                          {overallReadiness}
                          <span className="ml-0.5 text-base font-semibold text-slate-500 dark:text-slate-400">%</span>
                        </p>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-slate-500/10">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                      </div>
                    </div>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-teal-700 transition-all duration-700"
                        style={{ width: `${overallReadiness}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-5 gap-4">
                    {phasePulseMetrics.map((item) => {
                      const Icon = item.icon;
                      const isLive = item.status === 'active' || item.status === 'in-progress';

                      return (
                        <div
                          key={item.label}
                          className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/80 p-2.5"
                        >
                          <div
                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg ${isLive
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                              }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="mx-auto mt-2.5 flex h-16 w-2 flex-col-reverse overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                            <div
                              className={`w-full rounded-full transition-all duration-700 ${isLive ? 'bg-slate-500' : 'bg-slate-500 dark:bg-slate-300'
                                }`}
                              style={{ height: `${Math.max(item.pct, 0)}%`, opacity: item.pct === 0 ? 0 : 1 }}
                            />
                          </div>
                          <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                            {item.short}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-3.5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Live</p>
                      <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">{liveTrackCount}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Next</p>
                      <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">{upcomingGateCount}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* ── Phase Timeline ── */}
            <div className="xl:col-span-8 min-w-0">
              <div className="lg:hidden min-w-0 space-y-4 sm:space-y-5">
                {roadmapPhases.map((phase, idx) => {
                  const Icon = phase.icon;
                  const isActive = phase.status === 'active';
                  const isInProgress = phase.status === 'in-progress';
                  const isPlanned = phase.status === 'planned';
                  const statusLabel = isActive ? 'Active' : isInProgress ? 'In Progress' : isPlanned ? 'Planned' : 'Future';
                  const statusClass = isActive
                    ? 'bg-slate-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-slate-200 dark:border-emerald-800/50'
                    : isInProgress
                      ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 border-slate-200 dark:border-teal-800/50'
                      : isPlanned
                        ? 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border-gray-200/60 dark:border-gray-800';
                  const progressPct = Math.max(phasePulseMetrics[idx]?.pct ?? 0, 0);

                  return (
                    <Card
                      key={`mobile-phase-${idx}`}
                      className={`min-w-0 rounded-2xl border px-3 py-3.5 sm:px-3.5 ${isActive
                          ? 'bg-gradient-to-br from-slate-50 via-white to-slate-50/50 dark:from-emerald-950/30 dark:via-gray-900 dark:to-teal-950/20 border-slate-200 dark:border-emerald-800/70'
                          : isInProgress
                            ? 'bg-gradient-to-br from-slate-50 via-white to-white dark:from-teal-950/25 dark:via-gray-900 dark:to-gray-900 border-slate-200 dark:border-teal-800/60'
                            : 'bg-white/90 dark:bg-gray-900 border-gray-200/90 dark:border-gray-800'
                        }`}
                    >
                      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-2.5">
                          <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive || isInProgress
                              ? 'bg-slate-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                            }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
                              {`Phase ${idx + 1}`}
                            </p>
                            <h4 className="mt-0.5 text-sm font-bold leading-snug text-gray-900 dark:text-white">
                              {phase.title}
                            </h4>
                          </div>
                        </div>
                        <span className={`self-start rounded-full border px-2.5 py-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                        {phase.desc}
                      </p>
                      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isActive || isInProgress ? 'bg-slate-500' : 'bg-slate-500/60 dark:bg-slate-300/75'
                            }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <div className="mt-1 flex justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                        <span>{statusLabel}</span>
                        <span>{progressPct}%</span>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="hidden lg:block relative">
                {/* Vertical connector line — centred on the 20px dot column */}
                <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-400 via-teal-400 to-gray-300/60 dark:from-emerald-600 dark:via-teal-700 dark:to-gray-700/60 rounded-full" />

                <div className="space-y-0">
                  {roadmapPhases.map((phase, idx) => {
                    const Icon = phase.icon;
                    const isActive = phase.status === 'active';
                    const isInProgress = phase.status === 'in-progress';
                    const isPlanned = phase.status === 'planned';
                    const statusLabel = isActive ? 'Active' : isInProgress ? 'In Progress' : isPlanned ? 'Planned' : 'Future';

                    return (
                      <div key={idx} className="relative flex gap-5 sm:gap-6 items-start pb-7 sm:pb-9 last:pb-0">
                        {/* Timeline dot — always in flow, never absolute */}
                        <div className={`relative z-10 shrink-0 mt-3.5 h-10 w-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isActive
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-400/40 dark:shadow-emerald-900/60'
                            : isInProgress
                              ? 'bg-gradient-to-br from-teal-400 to-teal-600 shadow-teal-400/40 dark:shadow-teal-900/60'
                              : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 shadow-none'
                          }`}>
                          <Icon className={`h-4 w-4 ${isActive || isInProgress ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                          {/* Live pulse for active phases */}
                          {isActive && (
                            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-900 shadow" />
                          )}
                        </div>

                        {/* Phase card */}
                        <Card
                          onMouseEnter={handleTiltCardMouseEnter}
                          onMouseMove={handleTiltCardMouseMove}
                          onMouseLeave={handleTiltCardMouseLeave}
                          className={`flex-1 p-4 sm:p-5 lg:p-6 border rounded-2xl ${tiltTransformClassName} transition-[transform,box-shadow,border-color] duration-300 ease-out ${isActive
                              ? 'bg-gradient-to-br from-slate-50 via-white to-slate-50/50 dark:from-emerald-950/30 dark:via-gray-900 dark:to-teal-950/20 border-slate-200 dark:border-emerald-800/70 shadow-[0_8px_28px_rgba(114,191,0,0.13)] dark:shadow-[0_8px_28px_rgba(114,191,0,0.07)]'
                              : isInProgress
                                ? 'bg-gradient-to-br from-slate-50 via-white to-white dark:from-teal-950/25 dark:via-gray-900 dark:to-gray-900 border-slate-200 dark:border-teal-800/60'
                                : 'bg-white/90 dark:bg-gray-900 border-gray-200/90 dark:border-gray-800'
                            }`}
                          style={tiltCardStyleForViewport}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              {/* Icon badge */}
                              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isActive
                                  ? 'bg-slate-500 text-white shadow-lg shadow-emerald-400/30'
                                  : isInProgress
                                    ? 'bg-slate-500 text-white shadow-lg shadow-teal-400/30'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                }`}>
                                <Icon className="w-4.5 h-4.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 dark:text-gray-500 mb-0.5">
                                  Phase {idx + 1}
                                </p>
                                <h4 className="font-bold text-base lg:text-lg text-gray-900 dark:text-white leading-snug">
                                  {phase.title}
                                </h4>
                                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{phase.desc}</p>
                              </div>
                            </div>

                            {/* Status pill */}
                            <span className={`shrink-0 w-fit text-[10px] uppercase tracking-[0.16em] font-bold px-3 py-1.5 rounded-full whitespace-nowrap border ${isActive
                                ? 'bg-slate-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-slate-200 dark:border-emerald-800/50'
                                : isInProgress
                                  ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 border-slate-200 dark:border-teal-800/50'
                                  : isPlanned
                                    ? 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border-gray-200/60 dark:border-gray-800'
                              }`}>
                              {statusLabel}
                            </span>
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-30 -mx-3 sm:mx-0 -mt-5 sm:-mt-6 lg:-mt-8 -mb-4 sm:-mb-6 lg:-mb-8 px-0 sm:px-4 lg:px-6 md:-ml-10 lg:-ml-14 md:-mr-16 lg:-mr-24">
        <div className="mx-auto max-w-[98rem]">
          <ResearchLogisticsMarquee className="recovery-marquee--boundary recovery-marquee--tilt-right" />
        </div>
      </div>

      {/* Business Model */}
      <section className="home-deferred-section py-12 sm:py-16 lg:py-32 bg-[radial-gradient(circle_at_top_right,_#EAFDE7_0%,_#ffffff_38%,_#f7f8fa_100%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(114,191,0,0.12)_0%,_#09090b_42%,_#030303_100%)] relative overflow-hidden">
        <div className="absolute -top-28 -left-20 w-96 h-96 rounded-full bg-emerald-300/20 dark:bg-emerald-700/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-emerald-700 dark:text-emerald-400 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                Monetization Strategy
              </p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                Phased
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700">
                  Business Model
                </span>
              </h2>
              <p className="mt-6 text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                A sequential value ladder: first build industrial recovery margins, then expand into circular integration,
                and finally move into branded downstream products.
              </p>
            </div>

            <div className="lg:col-span-8 relative">
              <div className="hidden sm:block absolute top-8 bottom-8 left-7 w-px bg-gradient-to-b from-emerald-300 via-teal-400 to-emerald-300 dark:from-emerald-700 dark:via-teal-700 dark:to-emerald-700"></div>

              <div className="space-y-6 lg:space-y-7">
                <Card
                  onMouseEnter={handleTiltCardMouseEnter}
                  onMouseMove={handleTiltCardMouseMove}
                  onMouseLeave={handleTiltCardMouseLeave}
                  className={`relative pl-12 pr-4 py-5 sm:pl-16 sm:pr-7 sm:py-7 lg:p-8 lg:pl-20 rounded-3xl border border-slate-200/80 dark:border-emerald-800/70 bg-white/90 dark:bg-gray-900/75 backdrop-blur shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${tiltTransformClassName} transition-[transform,box-shadow,border-color] duration-300 ease-out`}
                  style={tiltCardStyleForViewport}
                >
                  <div className="absolute left-3 sm:left-5 top-6 sm:top-7 w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-700 text-white text-[10px] sm:text-xs font-black flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    01
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <p className="text-xs font-bold tracking-[0.16em] uppercase text-emerald-700 dark:text-emerald-400">
                      Phase I
                    </p>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-slate-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                      Core Revenue Engine
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                    Industrial Metal Recovery
                  </h3>
                  <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    Primary focus on PCB concentration, precious metal extraction, B2B bullion sales and copper monetization.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {['Feedstock security', 'Yield optimization', 'Assured off-take'].map((item) => (
                      <span
                        key={item}
                        className="px-3.5 py-2 rounded-full border border-slate-200/80 dark:border-emerald-800/60 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-slate-50/80 dark:bg-emerald-950/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card
                  onMouseEnter={handleTiltCardMouseEnter}
                  onMouseMove={handleTiltCardMouseMove}
                  onMouseLeave={handleTiltCardMouseLeave}
                  className={`relative pl-12 pr-4 py-5 sm:pl-16 sm:pr-7 sm:py-7 lg:p-8 lg:pl-20 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-900/75 backdrop-blur ${tiltTransformClassName} transition-[transform,box-shadow,border-color] duration-300 ease-out`}
                  style={tiltCardStyleForViewport}
                >
                  <div className="absolute left-3 sm:left-5 top-6 sm:top-7 w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-700 text-white text-[10px] sm:text-xs font-black flex items-center justify-center shadow-lg shadow-teal-500/30">
                    02
                  </div>
                  <p className="text-xs font-bold tracking-[0.16em] uppercase text-gray-600 dark:text-gray-400 mb-3">Phase II</p>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                    Polymer Recovery & Circular Integration
                  </h4>
                  <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    Expands value capture by integrating non-metal fractions into compliant circular value chains and partnerships.
                  </p>
                </Card>

                <Card
                  onMouseEnter={handleTiltCardMouseEnter}
                  onMouseMove={handleTiltCardMouseMove}
                  onMouseLeave={handleTiltCardMouseLeave}
                  className={`relative pl-12 pr-4 py-5 sm:pl-16 sm:pr-7 sm:py-7 lg:p-8 lg:pl-20 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 ${tiltTransformClassName} transition-[transform,box-shadow,border-color] duration-300 ease-out`}
                  style={tiltCardStyleForViewport}
                >
                  <div className="absolute left-3 sm:left-5 top-6 sm:top-7 w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-[10px] sm:text-xs font-black flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    03
                  </div>
                  <p className="text-xs font-bold tracking-[0.16em] uppercase text-gray-600 dark:text-gray-400 mb-3">Phase III</p>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                    Branded Recycled Gold Products
                  </h4>
                  <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    Converts upstream industrial capability into consumer-facing brand equity and premium recycled-gold positioning.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-30 -mx-3 sm:mx-0 -mt-5 sm:-mt-6 lg:-mt-8 -mb-4 sm:-mb-6 lg:-mb-8 px-0 sm:px-4 lg:px-6 md:-ml-10 lg:-ml-14 md:-mr-16 lg:-mr-24">
        <div className="mx-auto max-w-[98rem]">
          <ResearchLogisticsMarquee className="recovery-marquee--boundary" />
        </div>
      </div>

      {/* Why Eastern India */}
      <section className="home-deferred-section py-12 sm:py-16 lg:py-28 bg-[radial-gradient(circle_at_0%_8%,_#EAFDE7_0%,_#ffffff_45%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_4%_10%,_rgba(114,191,0,0.14)_0%,_#0b0b11_44%,_#040408_100%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-35 dark:opacity-20 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute -top-24 -right-20 w-[28rem] h-[28rem] rounded-full bg-emerald-300/25 dark:bg-emerald-700/16 blur-3xl"></div>
        <div className="absolute -bottom-28 -left-20 w-[30rem] h-[30rem] rounded-full bg-teal-300/18 dark:bg-teal-700/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-7">
            <Card className="lg:col-span-8 relative overflow-hidden rounded-3xl border border-gray-200/85 dark:border-gray-800/80 bg-white/82 dark:bg-gray-900/78 backdrop-blur p-6 sm:p-8 lg:p-10 shadow-[0_24px_56px_rgba(15,23,42,0.10)] dark:shadow-[0_24px_56px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-400"></div>
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-emerald-700 dark:text-emerald-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                Regional Advantage Layer
              </p>
              <h2 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-black text-gray-900 dark:text-white leading-[1.04] tracking-tight">
                Why Eastern India
              </h2>
              <p className="mt-5 text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                Eastern India combines concentrated e-waste generation, logistics reach, and underbuilt precious-metal
                recovery capacity. That combination creates a practical first-mover corridor for compliant urban mining.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'Feedstock Dense', label: 'Urban collection clusters' },
                  { value: 'Logistics-Ready', label: 'Eastern corridor access' },
                  { value: 'Processing Gap', label: 'High whitespace for scale' }
                ].map((item) => (
                  <div
                    key={item.value}
                    className="rounded-xl border border-gray-200/85 dark:border-gray-800/80 bg-white/80 dark:bg-gray-900/70 px-4 py-3"
                  >
                    <p className="text-sm sm:text-base font-black text-gray-900 dark:text-white">{item.value}</p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
              <Card className="relative overflow-hidden rounded-2xl border border-slate-200/85 dark:border-emerald-800/65 bg-gradient-to-br from-slate-50 via-slate-50 to-white dark:from-emerald-950/35 dark:via-teal-950/20 dark:to-gray-900 p-5 sm:p-6">
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-emerald-300/35 dark:bg-emerald-600/20 blur-2xl pointer-events-none" />
                <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-400">Regional Fit Score</p>
                <p className="mt-3 text-4xl font-black text-gray-900 dark:text-white leading-none">4.7/5</p>
                <div className="mt-4 h-2 rounded-full bg-gray-200/80 dark:bg-gray-800/80 overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-emerald-700 to-teal-700"></div>
                </div>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Weighted by feedstock, infra, and market reach.</p>
              </Card>

              <Card className="rounded-2xl border border-gray-200/85 dark:border-gray-800/80 bg-white/80 dark:bg-gray-900/75 backdrop-blur p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-gray-500 dark:text-gray-400">Strategic Thesis</p>
                <p className="mt-3 text-lg font-black text-gray-900 dark:text-white leading-tight">
                  Build where waste concentration and capacity gap overlap.
                </p>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  This lowers collection friction and improves early-stage operational control.
                </p>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-[minmax(168px,_auto)]">
            {regionalAdvantages.map((advantage, idx) => {
              const Icon = advantage.icon;
              const spanClass =
                idx === 0
                  ? 'sm:col-span-2 lg:col-span-5 lg:row-span-2'
                  : idx === 1
                    ? 'lg:col-span-3'
                    : idx === 2
                      ? 'lg:col-span-4'
                      : 'sm:col-span-2 lg:col-span-7';
              const label =
                idx === 0
                  ? 'Collection Advantage'
                  : idx === 1
                    ? 'Demand Multiplier'
                    : idx === 2
                      ? 'Market Gap'
                      : 'Execution Leverage';
              const pulse =
                idx === 0
                  ? 'High Feedstock Access'
                  : idx === 1
                    ? 'Demand Expansion'
                    : idx === 2
                      ? 'Underserved Segment'
                      : 'Network Efficiency';

              return (
                <Card
                  key={idx}
                  onMouseEnter={handleTiltCardMouseEnter}
                  onMouseMove={handleTiltCardMouseMove}
                  onMouseLeave={handleTiltCardMouseLeave}
                  className={`${spanClass} group relative overflow-hidden rounded-2xl border border-gray-200/85 dark:border-gray-800/80 bg-gradient-to-br from-white via-white to-slate-50/45 dark:from-gray-900 dark:to-gray-900 p-5 sm:p-6 lg:p-7 ${tiltTransformClassName} transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-slate-300 dark:hover:border-emerald-700 hover:shadow-[0_24px_52px_rgba(15,23,42,0.14)] dark:hover:shadow-[0_24px_52px_rgba(0,0,0,0.5)]`}
                  style={tiltCardStyleForViewport}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-700 to-teal-700" />
                  <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-emerald-200/45 dark:bg-emerald-700/22 blur-2xl pointer-events-none opacity-80" />

                  <div className="relative h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="inline-flex h-10 w-10 rounded-xl bg-white/92 dark:bg-gray-900/88 border border-gray-200/85 dark:border-gray-700/80 items-center justify-center">
                        <Icon className="h-4.5 w-4.5 text-gray-800 dark:text-gray-200" />
                      </div>
                      <span className="inline-flex items-center justify-center h-8 px-2.5 rounded-lg bg-gray-900 text-white dark:bg-slate-500 dark:text-gray-950 text-[10px] font-black tracking-[0.16em] uppercase">
                        {`0${idx + 1}`}
                      </span>
                    </div>

                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                      {label}
                    </p>
                    <h3 className="text-lg sm:text-xl lg:text-[1.4rem] font-black text-gray-900 dark:text-white leading-snug">
                      {advantage.title}
                    </h3>
                    <p className="mt-3 text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {advantage.description}
                    </p>

                    {idx === 0 && advantage.image && (
                      <div className="mt-5 relative flex-1 min-h-[180px] overflow-hidden rounded-2xl border border-slate-200/85 dark:border-emerald-800/65 bg-gray-100 dark:bg-gray-900">
                        <img
                          src={advantage.image}
                          alt={advantage.imageAlt || advantage.title}
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          loading={isCompactViewport ? 'eager' : 'lazy'}
                          fetchPriority={isCompactViewport ? 'high' : 'auto'}
                          decoding="async"
                          onError={(event) => {
                            const currentSrc = event.currentTarget.src;
                            if (advantage.fallbackImage && !currentSrc.includes(advantage.fallbackImage)) {
                              event.currentTarget.src = advantage.fallbackImage;
                              return;
                            }
                            if (!currentSrc.includes(localCardImageFallback)) {
                              event.currentTarget.src = localCardImageFallback;
                            }
                          }}
                        />
                        <span className="absolute left-3.5 top-3.5 inline-flex items-center rounded-full border border-white/55 dark:border-white/60 bg-slate-950/78 dark:bg-slate-900/82 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white dark:text-white shadow-[0_8px_20px_rgba(2,6,23,0.55)] ring-1 ring-black/40 dark:ring-white/15 backdrop-blur-md">
                          Collection Snapshot
                        </span>
                      </div>
                    )}

                    <div className="mt-auto pt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-600 dark:text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                      {pulse}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Long-Term Objective */}
      <section className="home-deferred-section py-12 sm:py-16 lg:py-32 bg-[radial-gradient(circle_at_15%_20%,_#2f2f35_0%,_#0f1013_42%,_#060607_100%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1580584126903-c17d41830450?w=1600&h=900&fit=crop"
            alt="Background"
            loading={isCompactViewport ? 'eager' : 'lazy'}
            fetchPriority={isCompactViewport ? 'high' : 'auto'}
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-24 -right-20 w-[26rem] h-[26rem] rounded-full bg-slate-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-16 w-[24rem] h-[24rem] rounded-full bg-slate-500/20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-5 sm:p-9 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-end">
              <div className="lg:col-span-8">
                <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-emerald-300 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Long-Term Objective
                </p>
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-[1.03] tracking-tight">
                  From discarded electronics
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-teal-700">
                    to certified metal recovery.
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-4">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-slate-300/30 bg-emerald-400/10 px-5 py-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-emerald-200/90 mb-1">Priority 01</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Industrial capability first.</p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/5 px-5 py-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-gray-300 mb-1">Priority 02</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-200">Brand equity later.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-deferred-section py-12 sm:py-16 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[7%] w-80 h-80 rounded-full bg-emerald-300/20 dark:bg-slate-500/10 blur-3xl"></div>
          <div className="absolute -bottom-24 left-[6%] w-[28rem] h-[28rem] rounded-full bg-teal-300/20 dark:bg-slate-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-emerald-700 dark:text-emerald-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                National Buildout Opportunity
              </p>
              <h2 className="text-[2.35rem] sm:text-6xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[0.95] tracking-tight">
                Building India&apos;s
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700">
                  Next Precious
                </span>
                <span className="block">Metal Infrastructure</span>
              </h2>
              <div className="mt-6 sm:mt-8 lg:mt-10 max-w-3xl flex gap-4 sm:gap-5">
                <span className="hidden sm:block w-px bg-gradient-to-b from-emerald-700 via-emerald-600 to-transparent"></span>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We are designing a compliant, industrial recovery engine that connects urban e-waste inputs
                  to certified extraction outcomes and long-term strategic metal resilience for India.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 mt-2 sm:mt-4 lg:mt-0 lg:pt-16">
              <div className="space-y-5 sm:space-y-6">
                {[
                  { index: '01', label: 'Feedstock', value: 'Urban E-Waste Streams' },
                  { index: '02', label: 'Approach', value: 'Process-Led Execution' },
                  { index: '03', label: 'Deployment', value: 'Phased Industrial Build' }
                ].map((item) => (
                  <div key={item.index} className="pb-4 border-b border-gray-200/80 dark:border-gray-700/70">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400">
                      {item.index} / {item.label}
                    </p>
                    <p className="mt-2 text-base sm:text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 w-full sm:w-auto text-base font-semibold text-white rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-600 hover:from-emerald-400 hover:via-emerald-600 hover:to-teal-700 shadow-[0_14px_34px_rgba(114,191,0,0.35)] hover:shadow-[0_18px_40px_rgba(114,191,0,0.45)] transition-all duration-300"
                >
                  <Link to="/investors" className="group inline-flex items-center justify-center">
                    Investor Brief
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 w-full sm:w-auto text-base font-semibold rounded-xl border-2 border-slate-300/80 dark:border-emerald-700/70 text-emerald-800 dark:text-emerald-300 bg-white/70 dark:bg-gray-900/50 hover:bg-slate-50 dark:hover:bg-gray-900 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300"
                >
                  <Link to="/contact">Strategic Partnerships</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;




