import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  username?: string;
  buyMeACoffeeUrl?: string;
}

function Footer({ 
  username = 'username',
  buyMeACoffeeUrl = '#'
}: FooterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in when reaching bottom
      const contentTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(contentTrigger);

      // Button pulse animation
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 40px rgba(255, 0, 0, 0.5), 0 0 80px rgba(255, 0, 0, 0.3)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleButtonHover = (isHovering: boolean) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: isHovering ? 1.05 : 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <footer 
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 z-10 section-dark"
    >
      <div 
        ref={contentRef}
        className="max-w-4xl mx-auto text-center"
        style={{ opacity: 0 }}
      >

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/50">
          <p className="text-sm">
            © {new Date().getFullYear()} {username}. All rights reserved.
          </p>
          
          <span className="hidden md:block text-white/20">|</span>
          
          <p className="text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and creativity
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <a 
            href="#" 
            className="text-sm text-white/40 hover:text-white transition-colors duration-300"
          >
            Privacy
          </a>
          <a 
            href="#" 
            className="text-sm text-white/40 hover:text-white transition-colors duration-300"
          >
            Terms
          </a>
          <a 
            href="#" 
            className="text-sm text-white/40 hover:text-white transition-colors duration-300"
          >
            Sitemap
          </a>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
}

export default Footer;
