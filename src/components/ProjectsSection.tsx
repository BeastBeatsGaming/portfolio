import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader, colors } from './HUDElements';

interface Project {
  title: string;
  category: 'field' | 'web';
  tags: string[];
  description: string;
  link?: string;
  standout?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'Charge It!',
    category: 'field',
    tags: ['Unity', 'C#'],
    description: 'Endless runner where you play as a charger that must collect electricity and dodge wire-cutters to power a phone.',
    link: '',
  },
  {
    title: 'Idle Business Manager',
    category: 'field',
    tags: ['Unity', 'C#'],
    description: 'Casual idle tycoon — build a business empire by investing in ventures, upgrading operations, and automating income.',
    link: '',
  },
  {
    title: 'Whack A Mole',
    category: 'field',
    tags: ['Unity', 'C#', 'TensorFlow'],
    description: 'Reimagined with motion tracking. Uses a webcam to detect hand movements so players physically "whack" the moles.',
    link: '',
    standout: true,
  },
  {
    title: 'Saran Cabs & Travels',
    category: 'web',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Frontend website for a cab booking service with interactive UI components.',
    link: '',
  },
  {
    title: 'Valorant Database',
    category: 'web',
    tags: ['Next.js', 'Axios'],
    description: 'Frontend app that fetches live data from the Valorant API — agents, weapons, maps, and cosmetics.',
    link: '',
  },
  {
    title: 'Task Master',
    category: 'web',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    description: 'Full-stack task manager with real-time updates, user authentication, and a responsive UI.',
    link: '',
  },
];

interface CardProps extends Project {
  index: number;
}

function ProjectCard({ title, category, tags, description, link, standout, index }: CardProps) {
  const catIcon  = category === 'field' ? '◆' : '▪';
  const catLabel = category === 'field' ? 'FIELD MISSION' : 'ENGINEERING OPS';

  return (
    <div
      className={`project-card${standout ? ' whack-card' : ''}`}
      style={{
        background: colors.bgPanel,
        border: `1px solid ${colors.border}`,
        padding: 16,
      }}
    >
      <div className="project-card-inner">
        {/* Index */}
        <div style={{
          position: 'absolute', top: 10, right: 12,
          fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
          color: colors.amberDim,
        }}>{String(index).padStart(2, '0')}</div>

        {/* Category */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
          letterSpacing: '2px', color: colors.amberDim, marginBottom: 8,
        }}>{catIcon} {catLabel}</div>

        {/* Title */}
        <h3 className="project-title" style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 600,
          letterSpacing: '2px', textTransform: 'uppercase',
          color: colors.text,
          margin: '0 0 6px',
        }}>{title}</h3>

        {/* Description */}
        <p style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
          color: colors.amberDim, lineHeight: 1.55, margin: '0 0 10px',
        }}>{description}</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
          {tags.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: 9,
              letterSpacing: '1px', color: colors.amberDim,
              border: `1px solid ${colors.border}`,
              padding: '2px 6px',
            }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <button
          className="project-cta-btn"
          onClick={() => {
            console.log(`[ VIEW PROJECT ] — ${title}`);
            if (link) window.open(link, '_blank', 'noopener,noreferrer');
          }}
          style={{
            background: 'transparent',
            border: `1px solid ${colors.amberDim}`,
            color: colors.amberDim,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase',
            padding: '6px 14px',
            cursor: 'pointer',
          }}
        >[ VIEW PROJECT ]</button>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const codeRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(codeRef.current, {
        x: -60, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top center', once: true },
      });
      gsap.from(headingRef.current, {
        x: 60, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top center', once: true },
      });
      gsap.from(cardsRef.current, {
        y: 40, opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top center', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const field = PROJECTS.filter(p => p.category === 'field');
  const web   = PROJECTS.filter(p => p.category === 'web');
  let cardIdx = 0;

  return (
    <section ref={sectionRef} style={{
      height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <SectionHeader
          code="// SYS.MISSIONS.02"
          title="Mission Log"
          subtitle="Completed and active operations"
          codeRef={codeRef}
          titleRef={headingRef}
        />

        {/* Field Missions */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
          letterSpacing: '2px', color: colors.amber, marginBottom: 10,
        }}>◆ FIELD MISSIONS — GAME DEV</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12, marginBottom: 16,
        }}>
          {field.map((p, i) => {
            const idx = ++cardIdx;
            return (
              <div key={i} ref={el => { cardsRef.current[i] = el; }}>
                <ProjectCard {...p} index={idx} />
              </div>
            );
          })}
        </div>

        {/* Engineering Ops */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
          letterSpacing: '2px', color: colors.amber, marginBottom: 10,
        }}>▪ ENGINEERING OPS — WEB DEV</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}>
          {web.map((p, i) => {
            const idx = ++cardIdx;
            const arrIdx = field.length + i;
            return (
              <div key={i} ref={el => { cardsRef.current[arrIdx] = el; }}>
                <ProjectCard {...p} index={idx} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
