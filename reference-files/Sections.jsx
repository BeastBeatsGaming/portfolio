// All page sections

function HeroSection() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return React.createElement('section', {
    style: {
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px 24px', position: 'relative', textAlign: 'center',
    }
  },
    // Crosshair decoration
    React.createElement('div', {
      style: {
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '320px', height: '320px',
        border: `1px solid rgba(212, 160, 38, 0.06)`,
        borderRadius: '50%', pointerEvents: 'none',
      }
    }),
    React.createElement('div', {
      style: {
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px', height: '500px',
        border: `1px solid rgba(212, 160, 38, 0.03)`,
        borderRadius: '50%', pointerEvents: 'none',
      }
    }),
    // Top status bar
    React.createElement('div', {
      style: {
        position: 'absolute', top: '24px', left: '24px', right: '24px',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px', letterSpacing: '2px', color: hudColors.amberDim,
      }
    },
      React.createElement('span', null, 'SYS.ONLINE'),
      React.createElement('span', null, 'SEC.CLEARANCE: PUBLIC'),
      React.createElement('span', null, new Date().toISOString().split('T')[0])
    ),
    // Main content
    React.createElement('div', {
      style: {
        opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
      React.createElement('div', {
        style: {
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px', letterSpacing: '4px', color: hudColors.amberDim,
          marginBottom: '24px', textTransform: 'uppercase',
        }
      }, '// Mission Briefing — Priority Alpha'),
      React.createElement('h1', {
        style: {
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700,
          letterSpacing: '6px', textTransform: 'uppercase',
          color: hudColors.amberLight, margin: '0 0 8px',
          lineHeight: 1, textShadow: `0 0 40px rgba(212, 160, 38, 0.3)`,
        }
      }, TWEAK_DEFAULTS.playerName),
      React.createElement('div', {
        style: {
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 400,
          letterSpacing: '6px', textTransform: 'uppercase',
          color: hudColors.amber, marginBottom: '32px',
        }
      }, 'Game Dev Student & Web Developer'),
      React.createElement('div', {
        style: {
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '14px', color: hudColors.textDim,
          maxWidth: '520px', margin: '0 auto', lineHeight: 1.7,
        }
      }, TWEAK_DEFAULTS.tagline),
    ),

    /* ============================================================
       PLACEHOLDER: FEATURED MISSION HERO SECTION
       Drop a featured project component here when ready.
       It should render below the tagline and above the scroll cue.
       Expected props: { title, thumbnail, tags, link }
       Example: <FeaturedMission title="Project X" ... />
       ============================================================ */

    // Scroll cue
    React.createElement('div', {
      style: {
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px', letterSpacing: '2px', color: hudColors.amberDim,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'pulse-dim 3s ease-in-out infinite',
      }
    },
      React.createElement('span', null, 'SCROLL TO PROCEED'),
      React.createElement('div', { style: { width: '1px', height: '24px', background: `linear-gradient(180deg, ${hudColors.amberDim}, transparent)` } })
    )
  );
}

function AboutSection() {
  const stats = [
    { label: 'CLASS', value: 'Game Dev / Web Dev' },
    { label: 'LEVEL', value: 'Student — Final Year' },
    { label: 'REGION', value: 'Remote // Global' },
    { label: 'STATUS', value: 'Open to Opportunities', highlight: true },
  ];

  return React.createElement('section', {
    style: { padding: '120px 24px', maxWidth: '900px', margin: '0 auto' }
  },
    React.createElement(SectionHeader, { code: '// SYS.PROFILE.01', title: 'Operative Profile', subtitle: 'Personnel dossier — clearance granted' }),
    React.createElement(CornerBrackets, { label: 'DOSSIER', status: 'DECLASSIFIED',
      style: { background: hudColors.bgPanel }
    },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' } },
        ...stats.map((s, i) =>
          React.createElement('div', { key: i, style: { padding: '12px 0' } },
            React.createElement('div', {
              style: { fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', letterSpacing: '2px', color: hudColors.amberDim, marginBottom: '4px' }
            }, s.label),
            React.createElement('div', {
              style: {
                fontFamily: "'Rajdhani', sans-serif", fontSize: '16px', fontWeight: 500,
                color: s.highlight ? hudColors.amberLight : hudColors.text,
                letterSpacing: '1px',
              }
            }, s.value)
          )
        )
      ),
      React.createElement(HUDDivider),
      React.createElement('p', {
        style: {
          fontFamily: "'Share Tech Mono', monospace", fontSize: '13px',
          color: hudColors.text, lineHeight: 1.8, margin: '16px 0 0',
        }
      }, "I build things that move, click, and sometimes explode (on purpose). Focused on real-time game systems and modern web architecture. I care about craft — the kind of work where every pixel and every millisecond matters. Currently leveling up through a game development program while shipping production web projects on the side.")
    )
  );
}

function ProjectCard({ title, category, tags, description, index }) {
  const [hovered, setHovered] = React.useState(false);
  const catIcon = category === 'field' ? '◆' : '▪';
  const catLabel = category === 'field' ? 'FIELD MISSION' : 'ENGINEERING OPS';

  return React.createElement('div', {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      background: hovered ? hudColors.bgPanelHover : hudColors.bgPanel,
      border: `1px solid ${hovered ? hudColors.borderBright : hudColors.border}`,
      padding: '24px', cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative', overflow: 'hidden',
    }
  },
    // Top index number
    React.createElement('div', {
      style: {
        position: 'absolute', top: '12px', right: '16px',
        fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
        color: hudColors.amberDim,
      }
    }, `${String(index).padStart(2, '0')}`),
    // Category tag
    React.createElement('div', {
      style: {
        fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
        letterSpacing: '2px', color: hudColors.amberDim, marginBottom: '12px',
      }
    }, `${catIcon} ${catLabel}`),
    // Thumbnail placeholder
    React.createElement('div', {
      style: {
        width: '100%', height: '120px', marginBottom: '16px',
        background: `repeating-linear-gradient(
          -45deg,
          rgba(212,160,38,0.03),
          rgba(212,160,38,0.03) 8px,
          transparent 8px,
          transparent 16px
        )`,
        border: `1px solid ${hudColors.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Share Tech Mono', monospace", fontSize: '11px',
        color: hudColors.amberDim, letterSpacing: '1px',
      }
    }, '[ project thumbnail ]'),
    // Title
    React.createElement('h3', {
      style: {
        fontFamily: "'Rajdhani', sans-serif", fontSize: '20px', fontWeight: 600,
        letterSpacing: '2px', textTransform: 'uppercase',
        color: hovered ? hudColors.amberLight : hudColors.text,
        margin: '0 0 8px', transition: 'color 0.3s',
      }
    }, title),
    // Description
    React.createElement('p', {
      style: {
        fontFamily: "'Share Tech Mono', monospace", fontSize: '12px',
        color: hudColors.amberDim, lineHeight: 1.6, margin: '0 0 16px',
      }
    }, description),
    // Tags
    React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } },
      ...tags.map((t, i) =>
        React.createElement('span', {
          key: i,
          style: {
            fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
            letterSpacing: '1px', color: hudColors.amberDim,
            border: `1px solid ${hudColors.border}`,
            padding: '3px 8px',
          }
        }, t)
      )
    )
  );
}

function ProjectsSection() {
  const projects = [
    { title: 'Voidrunner', category: 'field', tags: ['Unity', 'C#', 'Shaders'], description: 'Fast-paced space shooter with procedural level generation and custom particle systems.' },
    { title: 'Hex Kingdoms', category: 'field', tags: ['Godot', 'GDScript', 'AI'], description: 'Turn-based strategy game with hex-grid pathfinding and rival AI decision trees.' },
    { title: 'Phantom Halls', category: 'field', tags: ['Unreal', 'Blueprints', '3D'], description: 'First-person horror exploration with dynamic lighting and environmental storytelling.' },
    { title: 'Nexus Dashboard', category: 'web', tags: ['React', 'TypeScript', 'D3'], description: 'Real-time analytics dashboard with interactive data visualizations and live WebSocket feeds.' },
    { title: 'Forge CLI', category: 'web', tags: ['Node.js', 'Rust', 'CLI'], description: 'Developer toolchain for scaffolding, building, and deploying full-stack applications.' },
    { title: 'Arclight UI', category: 'web', tags: ['Svelte', 'CSS', 'Design System'], description: 'Component library and design system with theming, accessibility, and documentation site.' },
  ];

  return React.createElement('section', {
    style: { padding: '120px 24px', maxWidth: '1100px', margin: '0 auto' }
  },
    React.createElement(SectionHeader, { code: '// SYS.MISSIONS.02', title: 'Mission Log', subtitle: 'Completed and active operations' }),
    // Field Missions
    React.createElement('div', {
      style: {
        fontFamily: "'Share Tech Mono', monospace", fontSize: '12px',
        letterSpacing: '2px', color: hudColors.amber, marginBottom: '20px',
      }
    }, '◆ FIELD MISSIONS — GAME DEV'),
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '48px' }
    },
      ...projects.filter(p => p.category === 'field').map((p, i) =>
        React.createElement(ProjectCard, { key: i, ...p, index: i + 1 })
      )
    ),
    // Engineering Ops
    React.createElement('div', {
      style: {
        fontFamily: "'Share Tech Mono', monospace", fontSize: '12px',
        letterSpacing: '2px', color: hudColors.amber, marginBottom: '20px',
      }
    }, '▪ ENGINEERING OPS — WEB DEV'),
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }
    },
      ...projects.filter(p => p.category === 'web').map((p, i) =>
        React.createElement(ProjectCard, { key: i, ...p, index: i + 4 })
      )
    )
  );
}

function SkillsSection() {
  const categories = [
    { title: 'GAME ENGINES', skills: [
      { label: 'Unity / C#', value: 85 },
      { label: 'Godot / GDScript', value: 72 },
      { label: 'Unreal / Blueprints', value: 60 },
    ]},
    { title: 'WEB STACK', skills: [
      { label: 'React / TypeScript', value: 90 },
      { label: 'Node.js / Express', value: 82 },
      { label: 'HTML / CSS / SVG', value: 95 },
    ]},
    { title: 'SYSTEMS', skills: [
      { label: 'Git / CI-CD', value: 78 },
      { label: 'Shader Programming', value: 55 },
      { label: 'Database / SQL', value: 70 },
    ]},
  ];

  return React.createElement('section', {
    style: { padding: '120px 24px', maxWidth: '900px', margin: '0 auto' }
  },
    React.createElement(SectionHeader, { code: '// SYS.READOUT.03', title: 'System Readout', subtitle: 'Capability analysis — current build' }),
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }
    },
      ...categories.map((cat, ci) =>
        React.createElement(CornerBrackets, {
          key: ci, label: cat.title,
          style: { background: hudColors.bgPanel }
        },
          ...cat.skills.map((s, si) =>
            React.createElement(StatBar, { key: si, label: s.label, value: s.value, delay: ci * 200 + si * 100 })
          )
        )
      )
    )
  );
}

function ContactSection() {
  const [focused, setFocused] = React.useState(null);

  const inputStyle = (id) => ({
    width: '100%', padding: '12px 16px',
    background: focused === id ? 'rgba(212, 160, 38, 0.06)' : 'transparent',
    border: `1px solid ${focused === id ? hudColors.borderBright : hudColors.border}`,
    color: hudColors.text,
    fontFamily: "'Share Tech Mono', monospace", fontSize: '13px',
    outline: 'none', transition: 'all 0.3s',
    boxSizing: 'border-box',
  });

  return React.createElement('section', {
    style: { padding: '120px 24px 80px', maxWidth: '600px', margin: '0 auto' }
  },
    React.createElement(SectionHeader, { code: '// SYS.COMMS.04', title: 'Open Comms', subtitle: 'Transmission channel active' }),
    React.createElement(CornerBrackets, {
      label: 'SIGNAL', status: 'READY',
      style: { background: hudColors.bgPanel }
    },
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        React.createElement('input', {
          type: 'text', placeholder: 'CALLSIGN (Name)',
          style: inputStyle('name'),
          onFocus: () => setFocused('name'), onBlur: () => setFocused(null),
        }),
        React.createElement('input', {
          type: 'email', placeholder: 'FREQUENCY (Email)',
          style: inputStyle('email'),
          onFocus: () => setFocused('email'), onBlur: () => setFocused(null),
        }),
        React.createElement('textarea', {
          placeholder: 'TRANSMISSION (Message)',
          rows: 5,
          style: { ...inputStyle('msg'), resize: 'vertical' },
          onFocus: () => setFocused('msg'), onBlur: () => setFocused(null),
        }),
        React.createElement('button', {
          style: {
            padding: '14px 32px', background: 'transparent',
            border: `1px solid ${hudColors.amber}`,
            color: hudColors.amber,
            fontFamily: "'Rajdhani', sans-serif", fontSize: '14px',
            fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s',
            alignSelf: 'flex-start',
          },
          onMouseEnter: (e) => { e.target.style.background = hudColors.amberGlow; e.target.style.color = hudColors.amberLight; },
          onMouseLeave: (e) => { e.target.style.background = 'transparent'; e.target.style.color = hudColors.amber; },
        }, '▶ TRANSMIT'),
      )
    ),
    // Footer
    React.createElement('div', {
      style: {
        marginTop: '80px', textAlign: 'center',
        fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
        letterSpacing: '2px', color: hudColors.amberDim,
      }
    },
      React.createElement('div', { style: { marginBottom: '12px' } },
        ...['GitHub', 'LinkedIn', 'Twitter'].map((s, i) =>
          React.createElement('span', { key: i, style: { margin: '0 12px', cursor: 'pointer' } }, `[ ${s.toUpperCase()} ]`)
        )
      ),
      React.createElement('div', null, '© 2026 — ALL SYSTEMS NOMINAL')
    )
  );
}

Object.assign(window, { HeroSection, AboutSection, ProjectsSection, SkillsSection, ContactSection });
