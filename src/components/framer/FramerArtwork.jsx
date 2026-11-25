import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

function pt(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function rays(count, rIn, rOut, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const deg = offset + (360 / count) * i;
    const [x1, y1] = pt(50, 50, rIn, deg);
    const [x2, y2] = pt(50, 50, rOut, deg);
    return { deg, x1, y1, x2, y2 };
  });
}

function renderGlyphShape(shape, color, weight) {
  switch (shape) {
    case 'burst': {
      const spokes = rays(8, 13, 42);
      return (
        <>
          {spokes.map((s, idx) => {
            const [lx, ly] = pt(s.x2, s.y2, 10, s.deg + 145);
            const [rx, ry] = pt(s.x2, s.y2, 10, s.deg - 145);
            return (
              <g
                key={idx}
                stroke={color}
                strokeWidth={weight}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
                <polyline points={`${lx},${ly} ${s.x2},${s.y2} ${rx},${ry}`} />
              </g>
            );
          })}
          <circle cx="50" cy="50" r={Math.max(4, weight * 0.75)} fill={color} />
        </>
      );
    }

    case 'asterisk': {
      const spokes = rays(6, 0, 42, 30);
      return spokes.map((s, idx) => (
        <line
          key={idx}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke={color}
          strokeWidth={weight}
          strokeLinecap="round"
        />
      ));
    }

    case 'sun': {
      const spokes = rays(10, 27, 44);
      return (
        <>
          <circle
            cx="50"
            cy="50"
            r="16"
            fill="none"
            stroke={color}
            strokeWidth={weight}
          />
          {spokes.map((s, idx) => (
            <line
              key={idx}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke={color}
              strokeWidth={weight}
              strokeLinecap="round"
            />
          ))}
        </>
      );
    }

    case 'spark':
      return (
        <path
          d="M50 4 C53 34 66 47 96 50 C66 53 53 66 50 96 C47 66 34 53 4 50 C34 47 47 34 50 4 Z"
          fill={color}
        />
      );

    case 'bloom': {
      const centers = Array.from({ length: 6 }, (_, i) =>
        pt(50, 50, 20, i * 60),
      );
      return (
        <>
          {centers.map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r="14"
              fill="none"
              stroke={color}
              strokeWidth={weight * 0.85}
            />
          ))}
          <circle cx="50" cy="50" r={Math.max(4.5, weight * 0.8)} fill={color} />
        </>
      );
    }

    case 'orbit':
      return (
        <>
          {[0, 60, 120].map((angle) => (
            <ellipse
              key={angle}
              cx="50"
              cy="50"
              rx="40"
              ry="16"
              transform={`rotate(${angle} 50 50)`}
              fill="none"
              stroke={color}
              strokeWidth={weight * 0.85}
            />
          ))}
          <circle cx="50" cy="50" r={Math.max(5, weight)} fill={color} />
        </>
      );

    case 'grid': {
      const coords = [22, 50, 78];
      const dotR = Math.max(4.5, weight * 1.05);
      return coords.flatMap((y) =>
        coords.map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={dotR} fill={color} />
        )),
      );
    }

    case 'wave': {
      const offsets = [28, 50, 72];
      return offsets.map((y, idx) => (
        <path
          key={idx}
          d={`M 10 ${y} C 24 ${y - 12}, 36 ${y - 12}, 50 ${y} C 64 ${y + 12}, 76 ${y + 12}, 90 ${y}`}
          fill="none"
          stroke={color}
          strokeWidth={weight}
          strokeLinecap="round"
        />
      ));
    }

    default:
      return null;
  }
}

/**
 * Geometric SVG glyph with smooth continuous rotation and 5x hover acceleration.
 */
export function Glyph({
  shape,
  color = '#171717',
  weight = 6,
  spin = 24,
  hoverSpin = true,
  className = '',
}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const rotate = useMotionValue(0);
  const canSpin = shape !== 'wave' && shape !== 'grid' && spin > 0;

  useAnimationFrame((_, delta) => {
    if (reduced || !canSpin) return;
    const activeDuration = hovered && hoverSpin ? Math.max(2, spin / 5) : spin;
    const degPerSecond = 360 / activeDuration;
    rotate.set((rotate.get() + degPerSecond * (delta / 1000)) % 360);
  });

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      style={reduced || !canSpin ? undefined : { rotate }}
      onMouseEnter={hoverSpin ? () => setHovered(true) : undefined}
      onMouseLeave={hoverSpin ? () => setHovered(false) : undefined}
      aria-hidden="true"
    >
      {renderGlyphShape(shape, color, weight)}
    </motion.svg>
  );
}

/**
 * Editorial institutional vector illustrations with mirror loop motion.
 */
export function Art({
  kind,
  ink = '#171717',
  accent = '#FF5A2B',
  tintA = '#CFCBFA',
  tintB = '#BFE9D2',
  tintC = '#FFE08A',
  paper = '#FFFFFF',
  animate: enableAnimate = true,
  className = '',
}) {
  const reduced = useReducedMotion();
  const active = enableAnimate && !reduced;

  if (kind === 'book') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <motion.g
          animate={active ? { y: [-2, 2], rotate: [-1.2, 1.2] } : undefined}
          transition={
            active
              ? { duration: 3.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              : undefined
          }
          style={{ originX: '60px', originY: '60px' }}
        >
          <rect x="16" y="26" width="44" height="68" rx="8" fill={tintA} stroke={ink} strokeWidth="3" />
          <rect x="60" y="26" width="44" height="68" rx="8" fill={paper} stroke={ink} strokeWidth="3" />
          <path d="M22 33 H56 V87 H22 Z" fill={paper} stroke={ink} strokeWidth="2.2" />
          <line x1="28" y1="45" x2="49" y2="45" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="55" x2="49" y2="55" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="65" x2="43" y2="65" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="68" y1="45" x2="94" y2="45" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="68" y1="55" x2="94" y2="55" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="81" cy="72" r="9" fill={tintB} stroke={ink} strokeWidth="2.2" />
          <motion.path
            d="M72 26 V52 L77 47 L82 52 V26 Z"
            fill={accent}
            stroke={ink}
            strokeWidth="2"
            strokeLinejoin="round"
            animate={active ? { y: [0, 3] } : undefined}
            transition={
              active
                ? { duration: 2.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                : undefined
            }
          />
        </motion.g>
      </svg>
    );
  }

  if (kind === 'cap') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <motion.g
          animate={active ? { y: [-2.5, 2.5], rotate: [-1.5, 1.5] } : undefined}
          transition={
            active
              ? { duration: 3.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              : undefined
          }
          style={{ originX: '60px', originY: '54px' }}
        >
          <path d="M32 58 V78 C32 86 88 86 88 78 V58 Z" fill={tintB} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
          <polygon points="60,26 106,48 60,68 14,48" fill={paper} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
          <polygon points="60,33 93,48 60,61 27,48" fill={tintA} />
          <circle cx="60" cy="48" r="4.5" fill={ink} />
          <motion.g
            animate={active ? { rotate: [-5, 5] } : undefined}
            transition={
              active
                ? { duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                : undefined
            }
            style={{ originX: '92px', originY: '54px' }}
          >
            <path d="M60 48 L92 54 V78" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="92" cy="82" r="5" fill={accent} stroke={ink} strokeWidth="2.2" />
          </motion.g>
        </motion.g>
      </svg>
    );
  }

  if (kind === 'bulb') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <motion.g
          animate={active ? { scale: [0.96, 1.04], opacity: [0.75, 1] } : undefined}
          transition={
            active
              ? { duration: 2.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              : undefined
          }
          style={{ originX: '60px', originY: '48px' }}
        >
          <line x1="60" y1="10" x2="60" y2="18" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="28" y1="22" x2="34" y2="28" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="92" y1="22" x2="86" y2="28" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="18" y1="48" x2="26" y2="48" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="94" y1="48" x2="102" y2="48" stroke={accent} strokeWidth="3.2" strokeLinecap="round" />
        </motion.g>
        <path
          d="M60 24 C43 24 31 36 31 51 C31 61 38 69 44 75 C46 77 47 80 47 84 H73 C73 80 74 77 76 75 C82 69 89 61 89 51 C89 36 77 24 60 24 Z"
          fill={tintC}
          stroke={ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M51 54 C51 47 60 47 60 54 C60 47 69 47 69 54 V70 H51 Z" fill={paper} stroke={ink} strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="47" y="84" width="26" height="9" rx="4" fill={tintA} stroke={ink} strokeWidth="2.8" />
        <rect x="51" y="93" width="18" height="8" rx="4" fill={ink} />
      </svg>
    );
  }

  if (kind === 'medal') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <motion.g
          animate={active ? { y: [-2, 2] } : undefined}
          transition={
            active
              ? { duration: 2.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              : undefined
          }
        >
          <polygon points="36,16 54,16 62,48 44,48" fill={tintA} stroke={ink} strokeWidth="2.8" strokeLinejoin="round" />
          <polygon points="84,16 66,16 58,48 76,48" fill={tintB} stroke={ink} strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="60" cy="70" r="28" fill={tintC} stroke={ink} strokeWidth="3" />
          <circle cx="60" cy="70" r="20" fill={paper} stroke={ink} strokeWidth="2.4" />
          <motion.path
            d="M60 55 C62 65 65 68 75 70 C65 72 62 75 60 85 C58 75 55 72 45 70 C55 68 58 65 60 55 Z"
            fill={accent}
            animate={active ? { scale: [0.92, 1.08] } : undefined}
            transition={
              active
                ? { duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                : undefined
            }
            style={{ originX: '60px', originY: '70px' }}
          />
        </motion.g>
      </svg>
    );
  }

  return null;
}

/**
 * Concentric SVG orbit rings alternating solid lines and rotating dotted tracks.
 */
export function OrbitRings({
  line = 'rgba(255,255,255,0.7)',
  dot = '#ffffff',
  rings = 5,
  speed = 90,
  className = '',
}) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="-700 -700 1400 1400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: rings }, (_, i) => {
        const r = 190 + i * 150;
        const isDotted = i % 2 === 1;

        if (!isDotted) {
          return (
            <circle
              key={i}
              r={r}
              fill="none"
              stroke={line}
              strokeWidth={1.2}
              vectorEffect="non-scaling-stroke"
            />
          );
        }

        const direction = i % 4 === 1 ? 360 : -360;
        const duration = speed + i * 15;

        return (
          <motion.circle
            key={i}
            r={r}
            fill="none"
            stroke={dot}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray="0.1 26"
            vectorEffect="non-scaling-stroke"
            animate={reduced ? undefined : { rotate: direction }}
            transition={
              reduced
                ? undefined
                : { repeat: Infinity, ease: 'linear', duration }
            }
          />
        );
      })}
    </svg>
  );
}

/**
 * Viewport-triggered count-up numeric readout with tabular numeral alignment.
 */
export function CountUpNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.8,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return undefined;

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  const activeValue = reduced ? value : display;
  const formatted =
    decimals > 0
      ? Number(activeValue).toFixed(decimals)
      : Math.round(activeValue).toLocaleString('en-US');

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/**
 * Section eyebrow featuring a spinning spark glyph and tracked uppercase label.
 */
export function Eyebrow({ label, dark = false, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Glyph
        shape="spark"
        color={dark ? '#ffffff' : '#FF5A2B'}
        spin={16}
        className="w-3 h-3 shrink-0"
      />
      <span
        className={`text-[12.5px] font-medium uppercase tracking-[0.02em] ${
          dark ? 'text-white/90' : 'text-[#52525b]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Circular diagonal arrow chip that flips contrast and rotates on group hover.
 */
export function ArrowChip({ dark = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-[30px] h-[30px] rounded-full transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        dark
          ? 'bg-white/12 text-white border border-white/15 group-hover:bg-[#171717] group-hover:text-white group-hover:border-white/30'
          : 'bg-white text-[#171717] border border-[#171717]/10 group-hover:bg-[#171717] group-hover:text-white group-hover:border-[#171717]'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </span>
  );
}

/**
 * Tactile action button with dual-label vertical spring roll on hover.
 */
export function RollingButton({
  label,
  onClick,
  variant = 'dark',
  href,
  className = '',
}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const isDark = variant === 'dark';
  const variantClasses = isDark
    ? 'bg-[#171717] hover:bg-[#000000] text-white px-[22px] hover:px-[26px] rounded-full shadow-[0_10px_24px_-10px_rgba(23,23,23,0.45)]'
    : 'text-[#171717] hover:text-white px-[22px] rounded-[14px] border border-[#171717]/10 hover:border-[#171717] shadow-[0_10px_22px_-8px_rgba(23,23,23,0.18)]';

  const variantStyle = isDark
    ? undefined
    : {
        background: hovered
          ? '#171717'
          : 'linear-gradient(180deg, #FBFBFC 0%, #E9E9EC 100%)',
      };

  const content = (
    <span className="relative block h-[18px] leading-[18px] overflow-hidden">
      <motion.span
        className="flex flex-col"
        animate={{ y: hovered && !reduced ? -18 : 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      >
        <span className="h-[18px] leading-[18px] flex items-center justify-center whitespace-nowrap">
          {label}
        </span>
        <span
          className="h-[18px] leading-[18px] flex items-center justify-center whitespace-nowrap"
          aria-hidden="true"
        >
          {label}
        </span>
      </motion.span>
    </span>
  );

  const sharedProps = {
    className: `inline-flex items-center justify-center min-h-[44px] py-2.5 text-[14px] font-medium tracking-[-0.01em] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${variantClasses} ${className}`,
    style: variantStyle,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    onClick,
  };

  if (href) {
    return (
      <motion.a href={href} whileTap={reduced ? undefined : { scale: 0.98 }} {...sharedProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={reduced ? undefined : { scale: 0.98 }}
      {...sharedProps}
    >
      {content}
    </motion.button>
  );
}
