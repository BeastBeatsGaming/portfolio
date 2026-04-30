import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TWEAK_DEFAULTS } from './config';
import { Scanlines, Vignette } from './components/HUDElements';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(flashRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.05, ease: 'none' }
      );
      gsap.to(flashRef.current, { opacity: 0, duration: 0.15, ease: 'power2.out', delay: 0.09 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={flashRef} className="boot-flash" />

      {TWEAK_DEFAULTS.crtEffects && (
        <>
          <Scanlines />
          <Vignette />
        </>
      )}

      <div className="edge-line edge-line-left">
        <div className="edge-sweep" style={{ animationDelay: '0s' }} />
      </div>
      <div className="edge-line edge-line-right">
        <div className="edge-sweep" style={{ animationDelay: '3s' }} />
      </div>

      <Nav />

      <main className={TWEAK_DEFAULTS.crtEffects ? 'crt-active' : ''}>
        <div className="snap-section"><HeroSection /></div>
        <div id="about"    className="snap-section"><AboutSection /></div>
        <div id="projects" className="snap-section"><ProjectsSection /></div>
        <div id="skills"   className="snap-section"><SkillsSection /></div>
        <div id="contact"  className="snap-section"><ContactSection /></div>
      </main>
    </>
  );
}
