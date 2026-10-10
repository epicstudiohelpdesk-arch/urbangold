import { useEffect, useState } from "react";
import "./FloatingRecycleBin.css";

function FloatingRecycleBin({ onClick, ariaLabel = "Toggle recycle bin" }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
      body.classList.add("ug-recycle-bin-open");
    } else {
      body.classList.remove("ug-recycle-bin-open");
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      body.classList.remove("ug-recycle-bin-open");
    };
  }, [isOpen]);

  const handleClick = (event) => {
    event.preventDefault();
    setIsOpen((prev) => !prev);
    if (typeof onClick === "function") {
      onClick(event);
    }
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`floating-recycle-bin__backdrop${isOpen ? " floating-recycle-bin__backdrop--active" : ""}`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      <button
        type="button"
        className={`floating-recycle-bin${isOpen ? " floating-recycle-bin--open" : ""}`}
        aria-label={ariaLabel}
        aria-pressed={isOpen}
        onClick={handleClick}
      >
        <svg
          className="floating-recycle-bin__svg"
          viewBox="0 0 240 260"
          role="presentation"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="binBodyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--bin-yellow)" />
              <stop offset="100%" stopColor="var(--bin-yellow-deep)" />
            </linearGradient>
            <linearGradient id="binBodySheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.48)" />
              <stop offset="55%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id="binSideFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--bin-dark)" />
              <stop offset="100%" stopColor="var(--bin-dark-deep)" />
            </linearGradient>
            <linearGradient id="wasteFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--bin-waste)" />
              <stop offset="100%" stopColor="var(--bin-waste-deep)" />
            </linearGradient>
            <linearGradient id="wasteFillAlt" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--bin-waste-alt)" />
              <stop offset="100%" stopColor="var(--bin-waste-alt-deep)" />
            </linearGradient>
            <path
              id="recycleArrow"
              d="M-18 -7 H4 V-17 L18 -1 L4 15 V5 H-6 V17 H-18 Z"
            />
          </defs>
          <g className="floating-recycle-bin__group">
            <ellipse
              className="floating-recycle-bin__shadow"
              cx="124"
              cy="240"
              rx="78"
              ry="10"
            />
            <g className="floating-recycle-bin__lid-group">
              <rect
                className="floating-recycle-bin__lid"
                x="18"
                y="20"
                width="204"
                height="36"
                rx="10"
              />
              <rect
                className="floating-recycle-bin__lid-top"
                x="22"
                y="24"
                width="180"
                height="12"
                rx="6"
              />
              <path
                className="floating-recycle-bin__lid-shadow"
                d="M24 24 H196 Q216 24 216 42 V52 H24 Z"
              />
              <path
                className="floating-recycle-bin__rim"
                d="M24 24 H198 Q222 24 222 42 V52"
              />
            </g>
            <polygon
              className="floating-recycle-bin__body"
              points="40 58 198 58 170 232 54 232"
            />
            <path
              className="floating-recycle-bin__side"
              d="M194 58 L222 40 Q232 44 232 52 L206 232 L170 232 Z"
            />
            <path
              className="floating-recycle-bin__body-sheen"
              d="M56 68 L130 68 L116 218 L70 218 Z"
            />
            <g className="floating-recycle-bin__waste" aria-hidden="true">
              <rect
                className="floating-recycle-bin__waste-stack floating-recycle-bin__waste-stack--a"
                x="70"
                y="126"
                width="46"
                height="26"
                rx="4"
              />
              <rect
                className="floating-recycle-bin__waste-stack floating-recycle-bin__waste-stack--b"
                x="106"
                y="118"
                width="48"
                height="30"
                rx="5"
              />
              <rect
                className="floating-recycle-bin__waste-stack floating-recycle-bin__waste-stack--c"
                x="86"
                y="98"
                width="42"
                height="24"
                rx="4"
              />
              <rect className="floating-recycle-bin__waste-chip" x="94" y="104" width="12" height="6" rx="2" />
              <rect className="floating-recycle-bin__waste-chip" x="124" y="126" width="12" height="6" rx="2" />
              <rect className="floating-recycle-bin__waste-chip" x="78" y="132" width="10" height="5" rx="2" />
            </g>
            <path
              className="floating-recycle-bin__label"
              d="M50 88
               Q54 70 74 70
               L98 70
               Q104 70 106 76
               Q112 92 124 92
               L138 92
               Q146 92 150 100
               L156 114
               Q160 122 154 128
               Q140 142 140 154
               L140 172
               Q140 182 128 182
               L88 182
               Q70 182 64 168
               L54 144
               Q46 124 50 88 Z"
          />
          <g className="floating-recycle-bin__symbol" transform="translate(100 134)">
            <g>
              <use href="#recycleArrow" transform="translate(0 -20)" />
            </g>
            <g transform="rotate(120)">
              <use href="#recycleArrow" transform="translate(0 -20)" />
            </g>
            <g transform="rotate(240)">
              <use href="#recycleArrow" transform="translate(0 -20)" />
            </g>
          </g>
            <path
              className="floating-recycle-bin__edge"
              d="M40 58 L54 232 H170 L198 58"
            />
          </g>
        </svg>
      </button>
    </>
  );
}

export default FloatingRecycleBin;
