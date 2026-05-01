import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CornerBrackets, SectionHeader, HUDDivider, colors } from './HUDElements';

const STATS = [
  { label: 'CLASS',  value: 'Game Dev / Web Dev' },
  { label: 'LEVEL',  value: 'Fresher' },
  { label: 'REGION', value: 'Chennai, India' },
  { label: 'STATUS', value: 'Open to Opportunities', highlight: true },
];

const BIO = "I build things that move, click, and sometimes explode (on purpose). Focused on real-time game systems and modern web architecture. I care about craft — the kind of work where every pixel and every millisecond matters. Currently leveling up through a game development program while shipping production web projects on the side.";

function startTypewriter(
  el: HTMLElement,
  text: string,
  speed: number,
  timers: ReturnType<typeof setTimeout>[]
) {
  el.textContent = '';
  let i = 0;
  const tick = () => {
    i++;
    el.textContent = text.slice(0, i);
    if (i < text.length) {
      timers.push(setTimeout(tick, speed));
    }
  };
  tick();
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const bioRef     = useRef<HTMLParagraphElement>(null);
  const bioTimers  = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(statsRef.current, { rotateX: 90, opacity: 0, transformOrigin: 'center top' });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        once: true,
        onEnter: () => {
          gsap.to(statsRef.current, {
            rotateX: 0, opacity: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      });

      ScrollTrigger.create({
        trigger: bioRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          if (bioRef.current) startTypewriter(bioRef.current, BIO, 18, bioTimers.current);
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      bioTimers.current.forEach(t => clearTimeout(t));
      bioTimers.current = [];
    };
  }, []);

  return (
    <section ref={sectionRef} style={{
      height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <SectionHeader
          code="// SYS.PROFILE.01"
          title="Operative Profile"
          subtitle="Personnel dossier — clearance granted"
        />

        <CornerBrackets
          animate
          label="DOSSIER"
          status="DECLASSIFIED"
          style={{ background: colors.bgPanel }}
        >
          {/* 4-column single-row stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            marginBottom: 20,
          }}>
            {STATS.map((s, i) => (
              <div
                key={i}
                ref={el => { statsRef.current[i] = el; }}
                style={{
                  padding: '10px 0',
                  borderRight: i < STATS.length - 1 ? `1px solid ${colors.border}` : 'none',
                  paddingRight: i < STATS.length - 1 ? 12 : 0,
                }}
              >
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10, letterSpacing: '2px', color: colors.amberDim,
                  marginBottom: 4,
                }}>{s.label}</div>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 500,
                  color: s.highlight ? colors.amberLight : colors.text,
                  letterSpacing: '0.5px',
                }}>{s.value}</div>
              </div>
            ))}
          </div>

          <HUDDivider />

          <p ref={bioRef} style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: 13,
            color: colors.text, lineHeight: 1.75, margin: '14px 0 0',
            minHeight: '5em',
          }} />
        </CornerBrackets>
      </div>
    </section>
  );
}
