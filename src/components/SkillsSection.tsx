import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CornerBrackets, SectionHeader, colors } from './HUDElements';

const CATEGORIES = [
  {
    title: 'GAME DEV',
    tags: ['Unity', 'C#', 'Game Design', 'Physics Systems'],
  },
  {
    title: 'WEB STACK',
    tags: ['React', 'Next.js', 'Node.js', 'Express','MongoDB', 'TypeScript', 'HTML / CSS / JS'],
  },
  {
    title: 'TOOLS & TECH',
    tags: ['Git / GitHub', 'UI/UX Design'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        once: true,
        onEnter: () => {
          if (!sectionRef.current || !scannerRef.current) return;
          const h = sectionRef.current.offsetHeight;
          gsap.fromTo(scannerRef.current,
            { top: 0, opacity: 0.5 },
            { top: h, opacity: 0, duration: 1.2, ease: 'power1.inOut' }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden', position: 'relative',
    }}>
      {/* One-shot vertical scanner */}
      <div ref={scannerRef} className="skills-scanner" />

      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <SectionHeader
          code="// SYS.READOUT.03"
          title="System Readout"
          subtitle="Capability analysis — current build"
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 28,
        }}>
          {CATEGORIES.map((cat, ci) => (
            <CornerBrackets
              key={ci}
              animate
              delay={ci * 0.15}
              label={cat.title}
              style={{ background: colors.bgPanel }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="skill-tag"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: 12, letterSpacing: '1px',
                      color: colors.amberDim,
                      border: `1px solid ${colors.border}`,
                      padding: '8px 14px',
                    }}
                  >{tag}</span>
                ))}
              </div>
            </CornerBrackets>
          ))}
        </div>
      </div>
    </section>
  );
}
