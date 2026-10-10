import React, { useEffect, useRef, useState } from 'react';

const defaultTickerItems = [
  'PCB Feedstock Mapping',
  'Urban Metal Intelligence',
  'Selective Gold Recovery',
  'Hydrometallurgy R&D',
  'Compliance by Design',
  'Traceability Framework',
  'Assay-Grade Output',
  'Industrial Scale-Up',
  'Circular Gold Strategy',
  'Investor Readiness'
];

const HeroTicker = ({ items = defaultTickerItems, className = '' }) => {
  const tickerItems = Array.isArray(items) && items.length ? items : defaultTickerItems;
  const shellRef = useRef(null);
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const shell = shellRef.current;
    if (!shell) return undefined;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setIsAnimationRunning(false);
      return undefined;
    }

    if (typeof IntersectionObserver !== 'function') {
      setIsAnimationRunning(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsAnimationRunning(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.05, rootMargin: '180px 0px 180px 0px' }
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  const shellStateClass = isAnimationRunning
    ? 'hero-ticker-shell--running'
    : 'hero-ticker-shell--paused';

  return (
    <div ref={shellRef} className={`hero-ticker-shell ${shellStateClass} ${className}`.trim()}>
      <div className="hero-ticker-edge hero-ticker-edge--left" aria-hidden="true" />
      <div className="hero-ticker-edge hero-ticker-edge--right" aria-hidden="true" />

      <div className="hero-ticker-wrapper" aria-label="Urban Gold capability highlights">
        <div className="hero-ticker-track">
          {[0, 1].map((segmentIndex) => (
            <div
              key={segmentIndex}
              className="hero-ticker-segment"
              aria-hidden={segmentIndex === 1}
            >
              {tickerItems.map((item) => (
                <div key={`${segmentIndex}-${item}`} className="hero-ticker-item">
                  <span className="hero-ticker-dot" aria-hidden="true" />
                  <span className="hero-ticker-text">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTicker;
