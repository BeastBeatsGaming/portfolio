// FeaturedMission — drop-in cinematic project card for the Hero section.
// Usage: uncomment the import and JSX in HeroSection.tsx when ready.
//
// import FeaturedMission from './FeaturedMission';
//
// <FeaturedMission
//   title="Project Name"
//   thumbnail="/path/to/thumb.png"
//   tags={['Unity', 'C#']}
//   link="https://github.com/..."
// />

/*
import { colors } from './HUDElements';

interface FeaturedMissionProps {
  title: string;
  thumbnail?: string;
  tags: string[];
  link: string;
}

export default function FeaturedMission({ title, thumbnail, tags, link }: FeaturedMissionProps) {
  return (
    <div style={{
      width: '100%', maxWidth: 720,
      margin: '48px auto 0',
      border: `1px solid ${colors.borderBright}`,
      background: colors.bgPanel,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 10, letterSpacing: '3px', color: colors.amberDim,
        padding: '12px 24px',
        borderBottom: `1px solid ${colors.border}`,
      }}>◆ FEATURED MISSION</div>

      <div style={{
        width: '100%', height: 240,
        background: thumbnail
          ? `url(${thumbnail}) center/cover no-repeat`
          : `repeating-linear-gradient(-45deg, rgba(212,160,38,0.04), rgba(212,160,38,0.04) 8px, transparent 8px, transparent 16px)`,
        display: thumbnail ? undefined : 'flex',
        alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${colors.border}`,
      }}>
        {!thumbnail && (
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: colors.amberDim }}>
            [ mission thumbnail ]
          </span>
        )}
      </div>

      <div style={{ padding: '24px 32px' }}>
        <h2 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700,
          letterSpacing: '4px', textTransform: 'uppercase',
          color: colors.amberLight, margin: '0 0 12px',
        }}>{title}</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {tags.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
              letterSpacing: '1px', color: colors.amberDim,
              border: `1px solid ${colors.border}`,
              padding: '3px 8px',
            }}>{t}</span>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 13, fontWeight: 600, letterSpacing: '3px',
            textTransform: 'uppercase',
            color: colors.amber,
            border: `1px solid ${colors.amber}`,
            padding: '10px 24px',
            textDecoration: 'none',
            transition: 'background 0.3s, color 0.3s',
          }}
        >[ VIEW MISSION ]</a>
      </div>
    </div>
  );
}
*/

export {};
