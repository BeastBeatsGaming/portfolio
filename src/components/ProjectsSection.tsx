import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader, colors } from './HUDElements';

import chargeItImg      from '../images/ChargeIt/one.png';
import idleImg          from '../images/Idle/image.png';
import whackImg         from '../images/WhackAMole/one.png';
import saranImg         from '../images/Saran/One.png';
import valorantImg      from '../images/ValorantDatabase/one.png';
import taskMasterImg    from '../images/TaskMaster/one.png';

interface Project {
  title: string;
  category: 'field' | 'web';
  tags: string[];
  description: string;
  image: string;
  link?: string;
  standout?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'Charge It!',
    category: 'field',
    tags: ['Unity', 'C#'],
    description: 'Endless runner where you play as a charger that must collect electricity and dodge wire-cutters to power a phone.',
    image: chargeItImg,
    link: 'https://sai-mayank.itch.io/charge-it',
  },
  {
    title: 'Idle Business Manager',
    category: 'field',
    tags: ['Unity', 'C#'],
    description: 'Casual idle tycoon — build a business empire by investing in ventures, upgrading operations, and automating income.',
    image: idleImg,
    link: 'https://sai-mayank.itch.io/idle-business-manager',
  },
  {
    title: 'Whack A Mole',
    category: 'field',
    tags: ['Unity', 'C#', 'TensorFlow'],
    description: 'Reimagined with motion tracking. Uses a webcam to detect hand movements so players physically "whack" the moles.',
    image: whackImg,
    link: '',
    standout: true,
  },
  {
    title: 'Saran Cabs & Travels',
    category: 'web',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Frontend website for a cab booking service with interactive UI components.',
    image: saranImg,
    link: '',
  },
  {
    title: 'Valorant Database',
    category: 'web',
    tags: ['Next.js', 'Axios'],
    description: 'Frontend app that fetches live data from the Valorant API — agents, weapons, maps, and cosmetics.',
    image: valorantImg,
    link: 'https://github.com/BeastBeatsGaming/Valorant-Database',
  },
  {
    title: 'Task Master',
    category: 'web',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    description: 'Full-stack task and project manager with real-time updates, user authentication, and a responsive UI.',
    image: taskMasterImg,
    link: 'https://github.com/BeastBeatsGaming/Task-Master',
  },
];

interface CardProps extends Project {
  index: number;
}

function ProjectCard({ title, category, tags, description, image, link, standout, index }: CardProps) {
  const catIcon  = category === 'field' ? '◆' : '▪';
  const catLabel = category === 'field' ? 'FIELD MISSION' : 'ENGINEERING OPS';

  return (
    <div
      className={`project-card${standout ? ' whack-card' : ''}`}
      style={{ border: `1px solid ${colors.border}` }}
    >
      {/* Grayscale image — fills card absolutely */}
      <img
        src={image}
        alt={title}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%)',
          zIndex: 0,
        }}
      />

      {/* Content — flex column over gradient overlay */}
      <div className="project-card-inner">
        {/* Index */}
        <div style={{
          position: 'absolute', top: 10, right: 12,
          fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
          color: colors.amberDim,
        }}>{String(index).padStart(2, '0')}</div>

        {/* Category */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
          letterSpacing: '2px', color: colors.amberDim,
          marginBottom: 6, flexShrink: 0,
        }}>{catIcon} {catLabel}</div>

        {/* Title */}
        <h3 className="project-title" style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 600,
          letterSpacing: '2px', textTransform: 'uppercase',
          color: colors.text,
          margin: '0 0 8px', flexShrink: 0,
        }}>{title}</h3>

        {/* Description — fills remaining space, clips overflow */}
        <p style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 13,
          color: colors.text, lineHeight: 1.6, margin: 0,
          flex: 1, overflow: 'hidden',
        }}>{description}</p>

        {/* Tags — pinned to bottom */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 6,
          marginTop: 'auto', paddingTop: 10,
        }}>
          {tags.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: 12,
              letterSpacing: '1px', color: colors.amberLight,
              border: '1px solid rgba(212, 160, 38, 0.4)',
              background: 'rgba(10, 10, 8, 0.6)',
              padding: '5px 12px',
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
            position: 'relative', zIndex: 10, pointerEvents: 'all',
            marginTop: 10, alignSelf: 'flex-start',
            background: 'transparent',
            border: `1px solid ${colors.amberDim}`,
            color: colors.amberDim,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 12, fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase',
            padding: '8px 16px',
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
