import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoBackground from './components/VideoBackground';
import Hero from './sections/Hero';
import Connect from './sections/Connect';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import AntigravityCursor from './components/AntigravityCursor';
import { useState } from "react";
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      let lastScrollTop = 0;
      let skewTarget = 0;
      let currentSkew = 0;

      const updateSkew = () => {
        const scrollTop = window.pageYOffset;
        const velocity = scrollTop - lastScrollTop;
        lastScrollTop = scrollTop;

        skewTarget = Math.max(-5, Math.min(5, velocity * 0.1));
        currentSkew += (skewTarget - currentSkew) * 0.1;

        if (Math.abs(velocity) < 0.5) {
          skewTarget = 0;
        }

        const sections = document.querySelectorAll('.skew-on-scroll');
        sections.forEach(section => {
          gsap.set(section, { skewY: currentSkew });
        });

        requestAnimationFrame(updateSkew);
      };

      if (!window.matchMedia('(pointer: coarse)').matches) {
        requestAnimationFrame(updateSkew);
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <VideoBackground />
      <AntigravityCursor />
      <div className="grain-overlay" />

      <main ref={mainRef} className="relative z-10">
        <Hero />
        <Connect heading="Connect" />
        <Contact heading="Send a Signal" />
        <Footer username="Varun Chauhan" buyMeACoffeeUrl="#" />
      </main>
    </>
  );
}

export default App;
