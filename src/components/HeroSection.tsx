import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { colors } from './HUDElements';
import { TWEAK_DEFAULTS } from '../config';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

function scrambleTo(el: HTMLElement, finalText: string, onDone?: () => void) {
  let frame = 0;
  const totalFrames = finalText.length * 4;

  const tick = () => {
    el.textContent = finalText.split('').map((_, i) => {
      if (i < frame / 4) return finalText[i];
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join('');

    frame++;
    if (frame <= totalFrames) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = finalText;
      onDone?.();
    }
  };
  tick();
}

function typewriter(el: HTMLElement, text: string, speed = 40, onDone?: () => void) {
  let i = 0;
  el.textContent = '';
  const tick = () => {
    el.textContent += text[i];
    i++;
    if (i < text.length) setTimeout(tick, speed);
    else onDone?.();
  };
  tick();
}

const FLOAT_POINTS = [
  { text: 'LAT: 13.0827°', style: { left: '6%',   top: '22%' } },
  { text: 'ALT: 0042 m',   style: { right: '7%',  top: '28%' } },
  { text: 'PING: 12 ms',   style: { left: '8%',   bottom: '28%' } },
  { text: 'SIG: -72 dBm',  style: { right: '9%',  bottom: '32%' } },
  { text: 'VER: 2.6.1',    style: { left: '4%',   top: '55%' } },
  { text: 'REF: 04.30',    style: { right: '5%',  top: '60%' } },
];

export default function HeroSection() {
  const outerCircle = useRef<HTMLDivElement>(null);
  const innerCircle = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);
  const sysRef      = useRef<HTMLSpanElement>(null);
  const secRef      = useRef<HTMLSpanElement>(null);
  const dateRef     = useRef<HTMLSpanElement>(null);
  const floatRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Circles — infinite rotation
    gsap.to(outerCircle.current, { rotation: 360, duration: 40, repeat: -1, ease: 'none' });
    gsap.to(innerCircle.current, { rotation: -360, duration: 25, repeat: -1, ease: 'none' });

    // Floating data points drift loops
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      const yAmt = 6 + (i % 3) * 3;
      const dur  = 4 + i * 0.7;
      gsap.to(el, {
        y: `-=${yAmt}`,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5,
      });
    });

    // Boot: everything starts at delay to sync with nav stagger in App.tsx
    const BOOT_OFFSET = 0.85;

    // Status bar items flicker in
    gsap.from([sysRef.current, secRef.current, dateRef.current], {
      opacity: 0,
      duration: 0.3,
      stagger: 0.18,
      delay: BOOT_OFFSET,
      ease: 'power2.out',
    });

    // Name glitch effect
    const titleEl = titleRef.current;
    if (titleEl) {
      gsap.set(titleEl, { opacity: 0 });
      gsap.to(titleEl, {
        opacity: 1,
        duration: 0.01,
        delay: BOOT_OFFSET,
        onComplete: () => {
          scrambleTo(titleEl, TWEAK_DEFAULTS.playerName, () => {
            // Subtitle typewriter after name resolves
            const subEl = subtitleRef.current;
            if (subEl) {
              gsap.set(subEl, { opacity: 1 });
              typewriter(subEl, 'Game Developer & Web Developer', 45, () => {
                // Tagline fade after subtitle
                gsap.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
                // Float points fade in
                gsap.to(floatRefs.current, { opacity: 1, duration: 0.8, stagger: 0.15 });
              });
            }
          });
        },
      });
    }

    return () => {
      gsap.killTweensOf([outerCircle.current, innerCircle.current, titleRef.current,
        subtitleRef.current, taglineRef.current, sysRef.current, secRef.current,
        dateRef.current, ...floatRefs.current]);
    };
  }, []);

  const today = new Date().toISOString().split('T')[0];

  return (
    <section style={{
      height: '100%',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px 24px',
      position: 'relative', textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Concentric circles */}
      <div ref={outerCircle} style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480, height: 480,
        border: `1px solid rgba(212, 160, 38, 0.05)`,
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div ref={innerCircle} style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300, height: 300,
        border: `1px solid rgba(212, 160, 38, 0.08)`,
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Status bar */}
      <div style={{
        position: 'absolute', top: 24, left: 24, right: 24,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 10, letterSpacing: '2px', color: colors.amberDim,
      }}>
        <span ref={sysRef} style={{ opacity: 0 }}>SYS.ONLINE</span>
        <span ref={secRef} style={{ opacity: 0 }}>SEC.CLEARANCE: PUBLIC</span>
        <span ref={dateRef} style={{ opacity: 0 }}>{today}</span>
      </div>

      {/* Main content */}
      <div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11, letterSpacing: '4px', color: colors.amberDim,
          marginBottom: 24, textTransform: 'uppercase',
        }}>// Mission Briefing — Priority Alpha</div>

        <h1 ref={titleRef} style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700,
          letterSpacing: '6px', textTransform: 'uppercase',
          color: colors.amberLight, margin: '0 0 8px',
          lineHeight: 1,
          textShadow: `0 0 40px rgba(212, 160, 38, 0.3)`,
          opacity: 0,
        }}>
          {TWEAK_DEFAULTS.playerName}
        </h1>

        <div ref={subtitleRef} style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 400,
          letterSpacing: '6px', textTransform: 'uppercase',
          color: colors.amber, marginBottom: 32,
          minHeight: '1.6em',
          opacity: 0,
        }} />

        <div ref={taglineRef} style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 14, color: colors.textDim,
          maxWidth: 520, margin: '0 auto', lineHeight: 1.7,
          opacity: 0,
          transform: 'translateY(16px)',
        }}>
          {TWEAK_DEFAULTS.tagline}
        </div>
      </div>

      {/* ============================================================
          PLACEHOLDER: FEATURED MISSION HERO SECTION
          Drop a <FeaturedMission /> component here when ready.
          Expected props: { title, thumbnail, tags, link }
          ============================================================ */}

      {/* Floating data points */}
      {FLOAT_POINTS.map((pt, i) => (
        <div
          key={i}
          ref={el => { floatRefs.current[i] = el; }}
          className="float-point"
          style={pt.style}
        >
          {pt.text}
        </div>
      ))}

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 10, letterSpacing: '2px', color: colors.amberDim,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'pulse-dim 3s ease-in-out infinite',
      }}>
        <span>SCROLL TO PROCEED</span>
        <div style={{
          width: 1, height: 24,
          background: `linear-gradient(180deg, ${colors.amberDim}, transparent)`,
        }} />
      </div>
    </section>
  );
}
