import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const [showCloud, setShowCloud] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        roleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        '-=0.5'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10"
    >

      {/* Name */}
      <h1
        ref={titleRef}
        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
      >
        Varun Chauhan
      </h1>

      {/* Role */}
      <p
        ref={roleRef}
        className="text-lg md:text-xl text-white/70 mb-6"
      >
        AI Developer | Student | Creator
      </p>

      {/* Description */}
      <p
        ref={descRef}
        className="text-sm md:text-base text-white/60 max-w-xl leading-relaxed mb-8"
      >
        I built an AI that can solve arithmetic problems and talk to you 
        like a friend, teacher, or mentor. Focused on creating smart, 
        interactive, and useful AI experiences.
      </p>

      {/* ⚡ BUTTON WITH LIGHTNING + CLOUD */}
      <div className="relative flex flex-col items-center">

        {showCloud && (
         <div className="absolute top-full mt-2 left-1/2 translate-x-6 text-cyan-300 text-s whitespace-nowrap px-3 py-1 rounded-full border border-cyan-300/70 bg-transparent shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          Backend under development ☁️
         </div>
        )}


        {/* Button */}
        <a
          ref={buttonRef}
          href="https://verun-m8bzfqzwg-varun917-ois-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowCloud(true)}
          onMouseLeave={() => setShowCloud(false)}
          className="relative px-8 py-3 rounded-full text-white font-semibold border border-purple-500 overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_#a855f7]"
        >
          {/* Lightning */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
            <span className="absolute left-1/2 top-0 w-[2px] h-full bg-white blur-sm animate-lightning"></span>
          </span>

          {/* Glow */}
          <span className="absolute inset-0 rounded-full bg-purple-500/20 blur-md group-hover:opacity-100 opacity-0 transition"></span>

          {/* Text */}
          <span className="relative z-10">Try My AI ⚡</span>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-white/40 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

    </section>
  );
}

export default Hero;