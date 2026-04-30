import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NAV_ITEMS = [
  { label: 'Profile',  id: 'about' },
  { label: 'Missions', id: 'projects' },
  { label: 'Systems',  id: 'skills' },
  { label: 'Comms',    id: 'contact' },
];

export default function Nav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    // Boot stagger — chars animate in from above
    const ctx = gsap.context(() => {
      gsap.from('.nav-char', {
        opacity: 0,
        y: -10,
        duration: 0.4,
        stagger: 0.028,
        delay: 0.3,
        ease: 'power2.out',
      });
    });

    // Active section tracking
    const triggers = NAV_ITEMS.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      })
    );

    return () => {
      ctx.revert();
      triggers.forEach(t => t.kill());
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="hud-nav">
      {NAV_ITEMS.map(({ label, id }) => (
        <a
          key={id}
          className={active === id ? 'active' : ''}
          onClick={() => scrollTo(id)}
        >
          {label.split('').map((char, i) => (
            <span key={i} className="nav-char">{char}</span>
          ))}
        </a>
      ))}
    </nav>
  );
}
