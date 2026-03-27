import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaDiscord } from "react-icons/fa";
import {  
  Twitter, 
  Youtube, 
  Linkedin, 
  Twitch
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Varun917-oi', color: '#22d3ee' },
  { name: 'X (Twitter)', icon: Twitter, url: 'https://x.com/VarunChauhan917', color: '#1DA1F2' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@varunlive69?si=lgXICs8LAHJn8778', color: '#FF0000' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/YOUR-USERNAME', color: '#0A66C2' },
  { name: 'Twitch', icon: Twitch, url: 'https://www.twitch.tv/varunlive69', color: '#9146FF' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.gg/gWd9TYgYcn', color: '#5865F2' },
];

interface ConnectProps {
  heading?: string;
}

function Connect({ heading = 'Connect' }: ConnectProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading animation
      const headingTrigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(headingTrigger);

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { y: 100, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                delay: index * 0.1,
                ease: 'expo.out' 
              }
            );
          },
          once: true,
        });

        triggersRef.current.push(cardTrigger);
      });

      // Parallax effect
      const leftCol = cardsRef.current.filter((_, i) => i % 2 === 0);
      const rightCol = cardsRef.current.filter((_, i) => i % 2 === 1);

      const parallaxTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          leftCol.forEach(card => {
            if (card) gsap.set(card, { y: -50 + progress * 100 });
          });

          rightCol.forEach(card => {
            if (card) gsap.set(card, { y: 50 - progress * 100 });
          });
        },
      });

      triggersRef.current.push(parallaxTrigger);

    }, sectionRef);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, color: string) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.social-icon');

    gsap.to(card, {
      borderColor: color,
      boxShadow: `0 0 30px ${color}40`,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(icon, {
      rotateY: 360,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.social-icon');

    gsap.to(card, {
      borderColor: '#3D3D3D',
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(icon, {
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 z-10"
    >
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <h2 
          ref={headingRef}
          className="font-display text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          style={{ opacity: 0 }}
        >
          {heading}
        </h2>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                ref={el => { cardsRef.current[index] = el; }}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-5 rounded-xl border border-[#3D3D3D] bg-[#191919]/50 backdrop-blur-sm transition-all duration-300 overflow-hidden"
                style={{ opacity: 0 }}
                onMouseEnter={(e) => handleMouseEnter(e, link.color)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon className="social-icon text-xl text-white" />
                <span className="text-white">{link.name}</span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Connect;