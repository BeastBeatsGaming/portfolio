import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CornerBrackets, SectionHeader, HUDDivider, colors } from './HUDElements';

const CONTACT_DETAILS = [
  {
    label: '[ EMAIL ]',
    value: 'saimayank.v@gmail.com',
    href: 'mailto:saimayank.v@gmail.com',
  },
  {
    label: '[ LINKEDIN ]',
    value: 'linkedin.com/in/sai-mayank',
    href: 'https://linkedin.com/in/',
  },
  {
    label: '[ GITHUB ]',
    value: 'github.com/saimayank',
    href: 'https://github.com/',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rowsRef.current, {
        y: 24, opacity: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <SectionHeader
          code="// SYS.COMMS.04"
          title="Open Comms"
          subtitle={
            <>
              Transmission channel active
              <span style={{ display: 'inline-block', animation: 'blink 1s step-end infinite', marginLeft: 2 }}>_</span>
            </>
          }
        />

        <CornerBrackets
          animate
          label="SIGNAL"
          status="READY"
          style={{ background: colors.bgPanel }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {CONTACT_DETAILS.map((detail, i) => (
              <div key={i} ref={el => { rowsRef.current[i] = el; }}>
                <div style={{ padding: '14px 0' }}>
                  <div style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 10, letterSpacing: '2px',
                    color: colors.amberDim, marginBottom: 6,
                  }}>{detail.label}</div>
                  <a
                    href={detail.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: 14, letterSpacing: '1px',
                      color: colors.amberLight,
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = colors.textBright; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = colors.amberLight; }}
                  >{detail.value}</a>
                </div>
                {i < CONTACT_DETAILS.length - 1 && <HUDDivider />}
              </div>
            ))}
          </div>
        </CornerBrackets>

        {/* Footer */}
        <div style={{
          marginTop: 32, textAlign: 'center',
          fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
          letterSpacing: '2px', color: colors.amberDim,
        }}>
          © 2026 — ALL SYSTEMS NOMINAL
        </div>
      </div>
    </section>
  );
}
