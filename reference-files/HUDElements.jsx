// HUD UI primitives — scanlines, borders, decorative elements

const hudColors = {
  amber: '#D4A026',
  amberLight: '#F5C842',
  amberDim: '#8B6914',
  amberGlow: 'rgba(212, 160, 38, 0.15)',
  amberGlowStrong: 'rgba(212, 160, 38, 0.3)',
  bg: '#0A0A08',
  bgPanel: 'rgba(212, 160, 38, 0.04)',
  bgPanelHover: 'rgba(212, 160, 38, 0.08)',
  border: 'rgba(212, 160, 38, 0.2)',
  borderBright: 'rgba(212, 160, 38, 0.5)',
  text: '#D4A026',
  textDim: 'rgba(212, 160, 38, 0.5)',
  textBright: '#F5C842',
};

// Scanline overlay
function Scanlines() {
  return React.createElement('div', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 9998,
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
    }
  });
}

// Vignette overlay
function Vignette() {
  return React.createElement('div', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 9997,
      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
    }
  });
}

// CRT flicker
function CRTFlicker() {
  return React.createElement('style', null, `
    @keyframes crt-flicker {
      0%, 100% { opacity: 1; }
      92% { opacity: 1; }
      93% { opacity: 0.96; }
      94% { opacity: 1; }
      96% { opacity: 0.98; }
      97% { opacity: 1; }
    }
    .crt-active { animation: crt-flicker 8s infinite; }
  `);
}

// Corner bracket decoration
function CornerBrackets({ children, style, label, status }) {
  const bracketColor = hudColors.amberDim;
  const bracketStyle = {
    position: 'relative',
    padding: '24px',
    ...style,
  };

  const corner = (top, left, right, bottom, bTop, bRight, bBottom, bLeft) => ({
    position: 'absolute',
    width: '16px', height: '16px',
    top, left, right, bottom,
    borderTop: bTop ? `1px solid ${bracketColor}` : 'none',
    borderRight: bRight ? `1px solid ${bracketColor}` : 'none',
    borderBottom: bBottom ? `1px solid ${bracketColor}` : 'none',
    borderLeft: bLeft ? `1px solid ${bracketColor}` : 'none',
    pointerEvents: 'none',
  });

  return React.createElement('div', { style: bracketStyle },
    React.createElement('div', { style: corner('0','0',undefined,undefined, true,false,false,true) }),
    React.createElement('div', { style: corner('0',undefined,'0',undefined, true,true,false,false) }),
    React.createElement('div', { style: corner(undefined,'0',undefined,'0', false,false,true,true) }),
    React.createElement('div', { style: corner(undefined,undefined,'0','0', false,true,true,false) }),
    label && React.createElement('div', {
      style: {
        position: 'absolute', top: '-10px', left: '24px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
        color: hudColors.amberDim,
        background: hudColors.bg,
        padding: '0 8px',
      }
    }, label),
    status && React.createElement('div', {
      style: {
        position: 'absolute', top: '-10px', right: '24px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px', letterSpacing: '1px',
        color: hudColors.amber,
        background: hudColors.bg,
        padding: '0 8px',
      }
    }, status),
    children
  );
}

// Section header
function SectionHeader({ code, title, subtitle }) {
  return React.createElement('div', {
    style: { marginBottom: '48px' }
  },
    React.createElement('div', {
      style: {
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '11px', letterSpacing: '3px',
        color: hudColors.amberDim,
        marginBottom: '8px',
      }
    }, code),
    React.createElement('h2', {
      style: {
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '36px', fontWeight: 600,
        letterSpacing: '4px', textTransform: 'uppercase',
        color: hudColors.amberLight,
        margin: 0, lineHeight: 1.1,
      }
    }, title),
    subtitle && React.createElement('div', {
      style: {
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '13px', color: hudColors.amberDim,
        marginTop: '8px',
      }
    }, subtitle),
    React.createElement('div', {
      style: {
        width: '60px', height: '1px',
        background: `linear-gradient(90deg, ${hudColors.amber}, transparent)`,
        marginTop: '16px',
      }
    })
  );
}

// HUD stat bar
function StatBar({ label, value, max = 100, delay = 0 }) {
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), 200 + delay);
    return () => clearTimeout(t);
  }, [value, max, delay]);

  return React.createElement('div', { style: { marginBottom: '14px' } },
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: '5px',
      }
    },
      React.createElement('span', {
        style: {
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '12px', letterSpacing: '1px',
          color: hudColors.text, textTransform: 'uppercase',
        }
      }, label),
      React.createElement('span', {
        style: {
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px', color: hudColors.amberDim,
        }
      }, `${value}%`)
    ),
    React.createElement('div', {
      style: {
        height: '4px', background: 'rgba(212, 160, 38, 0.08)',
        position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          height: '100%', width: `${width}%`,
          background: `linear-gradient(90deg, ${hudColors.amberDim}, ${hudColors.amber})`,
          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: `0 0 8px ${hudColors.amberGlow}`,
        }
      })
    )
  );
}

// Horizontal rule / divider
function HUDDivider() {
  return React.createElement('div', {
    style: {
      height: '1px', width: '100%', margin: '12px 0',
      background: `linear-gradient(90deg, transparent, ${hudColors.border}, transparent)`,
    }
  });
}

Object.assign(window, { hudColors, Scanlines, Vignette, CRTFlicker, CornerBrackets, SectionHeader, StatBar, HUDDivider });
