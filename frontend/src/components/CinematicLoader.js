import { useEffect, useState } from "react";
import "./CinematicLoader.css";
import CinematicLoaderLogo from "../assets/UGI_Logo/Logo001.png";

/**
 * CinematicLoader — Urban Gold India
 *
 * A precision-engineered brand reveal sequence:
 *
 * Stage 1 (200ms):   Blank off-white hold
 * Stage 2 (200-1600ms): Logo reveals — opacity, scale, blur (1.4s)
 * Stage 3 (3200ms):  Final hold + onLoaderReady callback
 * Stage 4 (4200ms):  Exit — fade + scale (0.7s)
 *
 * Total duration: ~4.9 seconds
 */

function CinematicLoader({ ready = false, onLoaderReady = null }) {
  const [stage, setStage] = useState('init');
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Stage sequence timing — deliberate, controlled pacing
    const timers = [
      // Stage 1 → Stage 2: Logo reveal after blank hold
      setTimeout(() => setStage('logo-reveal'), 200),

      // Stage 2 → Stage 3: Final hold + onLoaderReady callback
      setTimeout(() => {
        if (typeof onLoaderReady === 'function') {
          onLoaderReady();
        }
        setStage('final-hold');
      }, 3200),

      // Stage 3 → Stage 4: Exit
      setTimeout(() => setStage('exit'), 4200),

      // Final removal from DOM — after exit animation completes
      setTimeout(() => setGone(true), 4900),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onLoaderReady]);

  // React to external ready signal
  useEffect(() => {
    if (ready && stage !== 'exit' && stage !== 'gone') {
      setStage('exit');
      const t = setTimeout(() => setGone(true), 700);
      return () => clearTimeout(t);
    }
  }, [ready, stage]);

  if (gone) return null;

  return (
    <div
      className={[
        "cinematic-loader",
        `cinematic-loader--stage-${stage}`,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-live="polite"
      aria-label="Loading Urban Gold India"
    >
      {/* Industrial grid overlay */}
      <div className="cinematic-loader__grid" aria-hidden="true" />

      {/* Corner brackets — engineering/blueprint motif */}
      <div className="cinematic-loader__bracket cinematic-loader__bracket--tl" aria-hidden="true" />
      <div className="cinematic-loader__bracket cinematic-loader__bracket--tr" aria-hidden="true" />
      <div className="cinematic-loader__bracket cinematic-loader__bracket--bl" aria-hidden="true" />
      <div className="cinematic-loader__bracket cinematic-loader__bracket--br" aria-hidden="true" />

      {/* Main content container */}
      <div className="cinematic-loader__content">
        {/* Logo */}
        <div className="cinematic-loader__logo-wrap">
          <img
            src={CinematicLoaderLogo}
            alt="Urban Gold India"
            className="cinematic-loader__logo"
            decoding="async"
          />
        </div>
      </div>

      {/* Bottom tag line */}
      <p className="cinematic-loader__tag" aria-hidden="true">
        Urban Mining &amp; Precious Metal Recovery
      </p>
    </div>
  );
}

export default CinematicLoader;
