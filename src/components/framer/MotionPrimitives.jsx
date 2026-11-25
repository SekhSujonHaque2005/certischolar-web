import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const SPRING_CONFIG = { stiffness: 90, damping: 24, mass: 0.7 };

const RISE_DISTANCES = {
  A: 40,
  B: 80,
  C: 120,
  D: 160,
};

/**
 * Scroll-linked hero exit parallax and fade over [0, 700] scroll range.
 */
export function HeroOut({ children, className = '', style }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -70]);
  const opacity = useTransform(scrollY, [160, 680], [1, 0]);

  return (
    <motion.div
      className={className}
      style={reduced ? style : { ...style, y, opacity }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Gentle spring-damped vertical float across the element's viewport pass.
 */
export function FloatDown({ children, className = '', style }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);
  const y = useTransform(smooth, [0, 1], [-45, 45]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? style : { ...style, y }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-driven inset clip-path reveal from framed inset to full bleed.
 */
export function RevealMedia({ children, className = '', style }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1', 'start 0.5'],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);
  const clipPath = useTransform(
    smooth,
    [0, 1],
    ['inset(10% 8% 10% 8% round 28px)', 'inset(0% 0% 0% 0% round 28px)'],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        reduced
          ? { borderRadius: '28px', overflow: 'hidden', ...style }
          : { ...style, clipPath }
      }
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-scrubbed subtle zoom and vertical pan inside media frames.
 */
export function ZoomMedia({ children, className = '', style }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);
  const scale = useTransform(smooth, [0, 1], [1.16, 1]);
  const y = useTransform(smooth, [0, 1], ['-3%', '3%']);

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: 'hidden', ...style }}
    >
      <motion.div
        className="w-full h-full"
        style={reduced ? undefined : { scale, y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Staggered scroll-rise card supporting A (40px), B (80px), C (120px), and D (160px) travel.
 */
export function RiseCard({ children, variant = 'A', className = '', style }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const distance = RISE_DISTANCES[variant] ?? RISE_DISTANCES.A;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1', 'start 0.6'],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);
  const y = useTransform(smooth, [0, 1], [distance, 0]);
  const opacity = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? style : { ...style, y, opacity }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Blur-to-crisp viewport entrance matching Framer clarity reveals.
 */
export function ClarityReveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Elevated sheet entrance scaling from 0.93 to 1 with 70px vertical rise.
 */
export function SheetSection({ children, className = '', style }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1', 'start 0.5'],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);
  const scale = useTransform(smooth, [0, 1], [0.93, 1]);
  const y = useTransform(smooth, [0, 1], [70, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? style : { ...style, scale, y }}
    >
      {children}
    </motion.div>
  );
}
