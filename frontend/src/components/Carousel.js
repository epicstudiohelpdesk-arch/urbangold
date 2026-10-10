import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Carousel.css';

const DEFAULT_ITEMS = [
  {
    id: 1,
    title: 'Text Animations',
    description: 'Cool text animations for your projects.',
    kicker: 'Sample',
    status: 'Demo',
    highlights: ['Preview highlight one', 'Preview highlight two'],
    tags: ['Tag A', 'Tag B'],
    stats: { objectives: 2, outputs: 2 }
  }
];

const DRAG_BUFFER = 42;
const VELOCITY_THRESHOLD = 0.55;
const GAP = 16;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function CarouselItem({ item, index, itemWidth, round, virtualPosition }) {
  const distance = index - virtualPosition;
  const rotateY = clamp(-distance * 10, -28, 28);
  const scale = 1 - Math.min(0.12, Math.abs(distance) * 0.06);
  const opacity = 1 - Math.min(0.42, Math.abs(distance) * 0.2);
  const isActive = Math.abs(distance) < 0.55;

  return (
    <article
      className={`carousel-item ${round ? 'round' : ''} ${isActive ? 'active' : ''}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        transform: `translateZ(0) rotateY(${rotateY}deg) scale(${scale})`,
        opacity
      }}
    >
      <div className={`carousel-item-header ${round ? 'round' : ''}`}>
        <span className="carousel-icon-container">{item.icon || <span className="carousel-fallback-icon" />}</span>
        <div className="carousel-item-header-meta">
          <span className="carousel-item-kicker">{item.kicker || 'Phase'}</span>
          <span className="carousel-item-status">{item.status || 'Active'}</span>
        </div>
      </div>

      <div className="carousel-item-content">
        <div className="carousel-item-main">
          <div className="carousel-item-title">{item.title}</div>
          <p className="carousel-item-description">{item.description}</p>

          {item.stats && (
            <div className="carousel-stats">
              <div className="carousel-stat">
                <span className="carousel-stat-label">Objectives</span>
                <span className="carousel-stat-value">{item.stats.objectives ?? '-'}</span>
              </div>
              <div className="carousel-stat">
                <span className="carousel-stat-label">Outputs</span>
                <span className="carousel-stat-value">{item.stats.outputs ?? '-'}</span>
              </div>
            </div>
          )}

          {Array.isArray(item.highlights) && item.highlights.length > 0 && (
            <ul className="carousel-item-list">
              {item.highlights.slice(0, 2).map((highlight, idx) => (
                <li key={`${item.id || index}-highlight-${idx}`}>{highlight}</li>
              ))}
            </ul>
          )}

          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="carousel-item-tags">
              {item.tags.slice(0, 2).map((tag, idx) => (
                <span key={`${item.id || index}-tag-${idx}`} className="carousel-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="carousel-image-shell">
          {item.image ? (
            <img
              src={item.image}
              alt={item.imageAlt || `${item.title} visual`}
              className="carousel-image"
            />
          ) : (
            <div className="carousel-image-fallback" role="img" aria-label="Illustrative placeholder">
              <span className="carousel-image-fallback-grid" />
            </div>
          )}
          <div className="carousel-image-overlay" />
          <span className="carousel-image-caption">{item.imageLabel || 'Phase Visual'}</span>
        </div>
      </div>
    </article>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerPadding = 16;
  const containerRef = useRef(null);
  const dragState = useRef({ startX: 0, startTime: 0 });

  const [containerWidth, setContainerWidth] = useState(baseWidth);
  const [position, setPosition] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const safeItems = useMemo(() => (Array.isArray(items) && items.length > 0 ? items : DEFAULT_ITEMS), [items]);
  const itemWidth = Math.max(220, containerWidth - containerPadding * 2);
  const trackItemOffset = itemWidth + GAP;
  const maxIndex = Math.max(safeItems.length - 1, 0);
  const virtualPosition = position - dragOffset / trackItemOffset;

  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === 'undefined') return undefined;
    const node = containerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      const nextWidth = entries[0]?.contentRect?.width;
      if (!nextWidth) return;
      setContainerWidth(Math.min(baseWidth, nextWidth));
    });
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, [baseWidth]);

  useEffect(() => {
    setPosition((prev) => clamp(prev, 0, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoplay || safeItems.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition((prev) => {
        if (loop) return (prev + 1) % safeItems.length;
        return Math.min(prev + 1, maxIndex);
      });
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, loop, maxIndex, pauseOnHover, safeItems.length]);

  const stepTo = (delta) => {
    setPosition((prev) => {
      if (loop) {
        return (prev + delta + safeItems.length) % safeItems.length;
      }
      return clamp(prev + delta, 0, maxIndex);
    });
  };

  const handlePointerDown = (event) => {
    if (safeItems.length <= 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      startX: event.clientX,
      startTime: Date.now()
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const nextOffset = event.clientX - dragState.current.startX;
    setDragOffset(nextOffset);
  };

  const finishDrag = (event) => {
    if (!isDragging) return;
    const delta = event.clientX - dragState.current.startX;
    const duration = Math.max(Date.now() - dragState.current.startTime, 1);
    const velocity = delta / duration;

    let direction = 0;
    if (delta < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) direction = 1;
    if (delta > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) direction = -1;

    if (direction !== 0) stepTo(direction);
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerCancel = () => {
    if (!isDragging) return;
    setDragOffset(0);
    setIsDragging(false);
  };

  const activeIndex = position;

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? 'round' : ''}`}
      style={{
        maxWidth: `${baseWidth}px`,
        height: '100%',
        ...(round && { borderRadius: '50%' })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`carousel-track ${isDragging ? 'dragging' : ''}`}
        style={{
          gap: `${GAP}px`,
          transform: `translate3d(${-(position * trackItemOffset) + dragOffset}px, 0, 0)`,
          transition: isDragging ? 'none' : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={handlePointerCancel}
      >
        {safeItems.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            virtualPosition={virtualPosition}
          />
        ))}
      </div>

      <div className={`carousel-controls ${round ? 'round' : ''}`}>
        <button
          type="button"
          className="carousel-control-button"
          onClick={() => stepTo(-1)}
          disabled={!loop && position === 0}
          aria-label="Previous slide"
        >
          Prev
        </button>
        <button
          type="button"
          className="carousel-control-button"
          onClick={() => stepTo(1)}
          disabled={!loop && position === maxIndex}
          aria-label="Next slide"
        >
          Next
        </button>
      </div>

      <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
        <div className="carousel-indicators">
          {safeItems.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
              onClick={() => setPosition(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
