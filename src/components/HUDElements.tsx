import { useRef, useEffect, ReactNode, CSSProperties, JSX } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const colors = {
  amber: '#D4A026',
  amberLight: '#F5C842',
  amberDim: '#8B6914',
  amberGlow: 'rgba(212, 160, 38, 0.15)',
  amberGlowStrong: 'rgba(212, 160, 38, 0.3)',
  bg: '#0F0F0C',
  bgPanel: 'rgba(212, 160, 38, 0.04)',
  bgPanelHover: 'rgba(212, 160, 38, 0.08)',
  border: 'rgba(212, 160, 38, 0.2)',
  borderBright: 'rgba(212, 160, 38, 0.5)',
  text: '#D4A026',
  textDim: 'rgba(212, 160, 38, 0.5)',
  textBright: '#F5C842',
} as const;

export function Scanlines() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 9998,
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 3px, rgba(212,160,38,0.015) 3px, rgba(212,160,38,0.015) 4px)',
    }} />
  );
}

export function Vignette() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 9997,
      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
    }} />
  );
}

interface CornerBracketsProps {
  children?: ReactNode;
  style?: CSSProperties;
  label?: string;
  status?: string;
  animate?: boolean;
  delay?: number;
}

const CORNER_SIZE = 20;

export function CornerBrackets({ children, style, label, status, animate = false, delay = 0 }: CornerBracketsProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const c1 = useRef<HTMLDivElement>(null);
  const c2 = useRef<HTMLDivElement>(null);
  const c3 = useRef<HTMLDivElement>(null);
  const c4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    const refs = [c1.current, c2.current, c3.current, c4.current];

    gsap.set(c1.current, { scaleX: 0, scaleY: 0, transformOrigin: 'top left' });
    gsap.set(c2.current, { scaleX: 0, scaleY: 0, transformOrigin: 'top right' });
    gsap.set(c3.current, { scaleX: 0, scaleY: 0, transformOrigin: 'bottom left' });
    gsap.set(c4.current, { scaleX: 0, scaleY: 0, transformOrigin: 'bottom right' });

    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(refs, {
          scaleX: 1, scaleY: 1,
          duration: 0.55,
          stagger: 0.08,
          delay,
          ease: 'power3.out',
        });
      },
    });

    return () => { st.kill(); };
  }, [animate, delay]);

  const bc = colors.amberDim;

  const cornerBase: CSSProperties = {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    pointerEvents: 'none',
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', padding: 24, ...style }}>
      {/* TL */}
      <div ref={c1} style={{ ...cornerBase, top: 0, left: 0, borderTop: `1px solid ${bc}`, borderLeft: `1px solid ${bc}` }} />
      {/* TR */}
      <div ref={c2} style={{ ...cornerBase, top: 0, right: 0, borderTop: `1px solid ${bc}`, borderRight: `1px solid ${bc}` }} />
      {/* BL */}
      <div ref={c3} style={{ ...cornerBase, bottom: 0, left: 0, borderBottom: `1px solid ${bc}`, borderLeft: `1px solid ${bc}` }} />
      {/* BR */}
      <div ref={c4} style={{ ...cornerBase, bottom: 0, right: 0, borderBottom: `1px solid ${bc}`, borderRight: `1px solid ${bc}` }} />

      {label && (
        <div style={{
          position: 'absolute', top: -10, left: 24,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase',
          color: colors.amberDim, background: colors.bg, padding: '0 8px',
        }}>{label}</div>
      )}
      {status && (
        <div style={{
          position: 'absolute', top: -10, right: 24,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, letterSpacing: '1px',
          color: colors.amber, background: colors.bg, padding: '0 8px',
        }}>{status}</div>
      )}
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  code: string;
  title: string;
  subtitle?: string | JSX.Element;
  codeRef?: React.RefObject<HTMLDivElement>;
  titleRef?: React.RefObject<HTMLHeadingElement>;
}

export function SectionHeader({ code, title, subtitle, codeRef, titleRef }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div ref={codeRef} style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 11, letterSpacing: '3px',
        color: colors.amberDim, marginBottom: 8,
      }}>{code}</div>
      <h2 ref={titleRef} style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: 36, fontWeight: 600,
        letterSpacing: '4px', textTransform: 'uppercase',
        color: colors.amberLight, margin: 0, lineHeight: 1.1,
      }}>{title}</h2>
      {subtitle && (
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 13, color: colors.amberDim, marginTop: 8,
        }}>{subtitle}</div>
      )}
      <div style={{
        width: 60, height: 1,
        background: `linear-gradient(90deg, ${colors.amber}, transparent)`,
        marginTop: 16,
      }} />
    </div>
  );
}

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  delay?: number;
}

export function StatBar({ label, value, max = 100, delay = 0 }: StatBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current || !containerRef.current) return;
    gsap.set(fillRef.current, { width: 0 });

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(fillRef.current, {
          width: `${(value / max) * 100}%`,
          duration: 1.2,
          delay: delay * 0.001,
          ease: 'power2.out',
        });
      },
    });

    return () => { st.kill(); };
  }, [value, max, delay]);

  return (
    <div ref={containerRef} style={{ marginBottom: 14 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 5,
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 12, letterSpacing: '1px',
          color: colors.text, textTransform: 'uppercase',
        }}>{label}</span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11, color: colors.amberDim,
        }}>{value}%</span>
      </div>
      <div style={{
        height: 4,
        background: 'rgba(212, 160, 38, 0.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div ref={fillRef} style={{
          height: '100%', width: 0,
          background: `linear-gradient(90deg, ${colors.amberDim}, ${colors.amber})`,
          boxShadow: `0 0 8px ${colors.amberGlow}`,
        }} />
      </div>
    </div>
  );
}

export function HUDDivider() {
  return (
    <div style={{
      height: 1, width: '100%', margin: '12px 0',
      background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
    }} />
  );
}
