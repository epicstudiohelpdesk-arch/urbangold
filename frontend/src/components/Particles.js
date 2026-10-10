import { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

import './Particles.css';

const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];

const hexToRgb = (hex) => {
  let normalized = hex.replace(/^#/, '');
  if (normalized.length === 3) {
    normalized = normalized
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const value = Number.parseInt(normalized, 16);
  const r = ((value >> 16) & 255) / 255;
  const g = ((value >> 8) & 255) / 255;
  const b = (value & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

const Particles = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  className = ''
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const colorSignature = Array.isArray(particleColors) ? particleColors.join('|') : '';

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return undefined;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) return undefined;

    const dpr = Math.min(Math.max(pixelRatio, 1), 1.5);
    let renderer;
    try {
      renderer = new Renderer({
        dpr,
        depth: false,
        alpha: true,
        antialias: false
      });
    } catch (error) {
      return undefined;
    }
    const { gl } = renderer;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    resize();

    let resizeObserver = null;
    if (typeof ResizeObserver === 'function') {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', resize);
    }

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const handlePointerLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    if (moveParticlesOnHover) {
      container.addEventListener('pointermove', handlePointerMove, { passive: true });
      container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
      container.addEventListener('pointercancel', handlePointerLeave, { passive: true });
    }

    const count = Math.max(1, Math.floor(particleCount));
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = colorSignature ? colorSignature.split('|') : defaultColors;

    for (let index = 0; index < count; index += 1) {
      let x;
      let y;
      let z;
      let len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);

      const radius = Math.cbrt(Math.random());
      positions.set([x * radius, y * radius, z * radius], index * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], index * 4);

      const color = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(color, index * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors }
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * dpr },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }
      },
      transparent: true,
      depthTest: false
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId = null;
    let lastTime = performance.now();
    let elapsed = 0;
    let isVisible = !document.hidden;
    let isInViewport = true;
    let isUserScrolling = false;
    let scrollIdleTimer = null;

    const renderFrame = (time) => {
      animationFrameId = window.requestAnimationFrame(renderFrame);
      const delta = time - lastTime;
      lastTime = time;
      elapsed += delta * speed;

      if (isUserScrolling) {
        return; // Skip WebGL render calculation during scroll
      }

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
        smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;
        particles.position.x = -smoothMouseRef.current.x * particleHoverFactor;
        particles.position.y = -smoothMouseRef.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    const stopRendering = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const startRendering = () => {
      if (animationFrameId !== null || !isVisible || !isInViewport) return;
      lastTime = performance.now();
      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    const syncAnimationState = () => {
      if (isVisible && isInViewport) {
        startRendering();
      } else {
        stopRendering();
      }
    };

    const visibilityHandler = () => {
      isVisible = !document.hidden;
      syncAnimationState();
    };

    const handleScroll = () => {
      isUserScrolling = true;
      if (scrollIdleTimer !== null) {
        window.clearTimeout(scrollIdleTimer);
      }
      scrollIdleTimer = window.setTimeout(() => {
        isUserScrolling = false;
        scrollIdleTimer = null;
      }, 130);
    };

    let viewportObserver = null;
    if (typeof IntersectionObserver === 'function') {
      viewportObserver = new IntersectionObserver(
        (entries) => {
          isInViewport = entries[0]?.isIntersecting ?? true;
          syncAnimationState();
        },
        { threshold: 0.01 }
      );
      viewportObserver.observe(container);
    }
    document.addEventListener('visibilitychange', visibilityHandler);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    startRendering();

    return () => {
      stopRendering();
      if (viewportObserver) {
        viewportObserver.disconnect();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', resize);
      }
      document.removeEventListener('visibilitychange', visibilityHandler);
      window.removeEventListener('scroll', handleScroll);
      if (scrollIdleTimer !== null) {
        window.clearTimeout(scrollIdleTimer);
      }

      if (moveParticlesOnHover) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerleave', handlePointerLeave);
        container.removeEventListener('pointercancel', handlePointerLeave);
      }

      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    colorSignature,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    pixelRatio
  ]);

  return <div ref={containerRef} className={`particles-container ${className}`.trim()} aria-hidden="true" />;
};

export default Particles;
