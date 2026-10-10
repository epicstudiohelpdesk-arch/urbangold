import React, { useEffect, useRef, useState } from 'react';

const skylineBlocks = [
  { height: '2.8rem', width: '1.2rem' },
  { height: '3.4rem', width: '1.35rem' },
  { height: '2.4rem', width: '1.05rem' },
  { height: '3.9rem', width: '1.6rem' },
  { height: '3.1rem', width: '1.25rem' },
  { height: '2.2rem', width: '1.15rem' },
  { height: '3.6rem', width: '1.45rem' },
  { height: '2.7rem', width: '1rem' },
  { height: '3.2rem', width: '1.3rem' },
  { height: '2.35rem', width: '0.95rem' },
  { height: '3.75rem', width: '1.5rem' },
  { height: '2.55rem', width: '1.08rem' },
  { height: '3rem', width: '1.15rem' },
  { height: '2.15rem', width: '0.86rem' }
];

const trees = [
  { height: '1.5rem' },
  { height: '1.25rem' },
  { height: '1.75rem' },
  { height: '1.35rem' },
  { height: '1.65rem' },
  { height: '1.15rem' },
  { height: '1.42rem' },
  { height: '1.22rem' },
  { height: '1.58rem' },
  { height: '1.08rem' },
  { height: '1.48rem' },
  { height: '1.3rem' }
];

const SceneSegment = ({ segmentIndex }) => (
  <div className="recovery-marquee-segment" aria-hidden={segmentIndex === 1}>
    <div className="recovery-marquee-skyline">
      {skylineBlocks.map((block, index) => (
        <span key={`skyline-${segmentIndex}-${index}`} className="recovery-building" style={block}></span>
      ))}
    </div>
    <div className="recovery-powerlines" aria-hidden="true">
      <span className="recovery-tower"></span>
      <span className="recovery-tower"></span>
    </div>
    <div className="recovery-marquee-forest">
      {trees.map((tree, index) => (
        <span key={`tree-${segmentIndex}-${index}`} className="recovery-tree" style={tree}></span>
      ))}
    </div>
  </div>
);

const ResearchLogisticsMarquee = ({ className = '' }) => {
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
      { threshold: 0.05, rootMargin: '160px 0px 160px 0px' }
    );

    observer.observe(shell);

    return () => observer.disconnect();
  }, []);

  const shellStateClass = isAnimationRunning
    ? 'recovery-marquee-shell--running'
    : 'recovery-marquee-shell--paused';

  return (
    <div ref={shellRef} className={`recovery-marquee-shell ${shellStateClass} ${className}`.trim()}>
      <div className="recovery-marquee-edge recovery-marquee-edge--left" aria-hidden="true" />
      <div className="recovery-marquee-edge recovery-marquee-edge--right" aria-hidden="true" />

      <div
        className="recovery-marquee-stage"
        role="img"
        aria-label="Animated waste recovery logistics loop with moving truck, city, trees, dustbins, and factory"
      >
        <div className="recovery-cloud-layer" aria-hidden="true">
          <span className="recovery-cloud recovery-cloud--one"></span>
          <span className="recovery-cloud recovery-cloud--two"></span>
          <span className="recovery-cloud recovery-cloud--three"></span>
          <span className="recovery-cloud recovery-cloud--one"></span>
          <span className="recovery-cloud recovery-cloud--two"></span>
          <span className="recovery-cloud recovery-cloud--three"></span>
        </div>
        <div className="recovery-data-nodes" aria-hidden="true">
          <span className="recovery-data-node recovery-data-node--one"></span>
          <span className="recovery-data-node recovery-data-node--two"></span>
          <span className="recovery-data-node recovery-data-node--three"></span>
        </div>
        <div className="recovery-marquee-track" aria-hidden="true">
          {[0, 1].map((segmentIndex) => (
            <SceneSegment key={segmentIndex} segmentIndex={segmentIndex} />
          ))}
        </div>

        <div className="recovery-road" aria-hidden="true" />
        <div className="recovery-pipeline" aria-hidden="true"></div>

        <div className="recovery-dustbins" aria-hidden="true">
          <span className="recovery-bin"></span>
          <span className="recovery-bin"></span>
          <span className="recovery-bin"></span>
        </div>

        <div className="recovery-factory" aria-hidden="true">
          <span className="recovery-factory-roof"></span>
          <span className="recovery-chimney recovery-chimney--one"></span>
          <span className="recovery-chimney recovery-chimney--two"></span>
          <span className="recovery-conveyor"></span>
          <span className="recovery-gold-pulse"></span>
        </div>

        <div className="recovery-truck" aria-hidden="true">
          <div className="recovery-dust-trail">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="recovery-truck-bed"></span>
          <span className="recovery-truck-cabin"></span>
          <span className="recovery-truck-window"></span>
          <span className="recovery-truck-wheel recovery-truck-wheel--front"></span>
          <span className="recovery-truck-wheel recovery-truck-wheel--rear"></span>
        </div>
      </div>
    </div>
  );
};

export default ResearchLogisticsMarquee;
