'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-copy > *', { y: 26, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.11, ease: 'power3.out', delay: 0.1,
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 42, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });
      gsap.to('.hero-grid-glow', {
        yPercent: 18, scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.ticker-track', { xPercent: -22, ease: 'none', scrollTrigger: {
        trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 0.7,
      }});
    });
    return () => ctx.revert();
  }, []);
  return null;
}
