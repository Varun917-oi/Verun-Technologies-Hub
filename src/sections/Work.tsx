import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Ethereal Dreams',
    category: 'Design System',
    description: 'A comprehensive design system for immersive digital experiences.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    link: '#'
  },
  {
    id: 2,
    title: 'Neon Horizons',
    category: 'Web Experience',
    description: 'An interactive web experience exploring the boundaries of digital art.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    link: '#'
  },
  {
    id: 3,
    title: 'Digital Flux',
    category: 'Brand Identity',
    description: 'Complete brand identity for a forward-thinking tech startup.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    link: '#'
  }
];

interface WorkProps {
  heading?: string;
}

function Work({ heading = 'My Work' }: WorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

      // Cards animation with 3D rotation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { 
                rotateY: -45, 
                z: -500, 
                opacity: 0,
                transformPerspective: 1000
              },
              { 
                rotateY: 0, 
                z: 0, 
                opacity: 1, 
                duration: 1.2, 
                delay: index * 0.15,
                ease: 'expo.out'
              }
            );
          },
          once: true,
        });
        triggersRef.current.push(cardTrigger);
      });
    }, sectionRef);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Chromatic aberration effect on image
    const img = card.querySelector('.project-image') as HTMLElement;
    if (img) {
      img.style.filter = `hue-rotate(${x * 10}deg) saturate(${1 + Math.abs(x)})`;
    }
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out'
    });

    const img = card.querySelector('.project-image') as HTMLElement;
    if (img) {
      img.style.filter = 'none';
    }

    setHoveredCard(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 z-10 section-dark"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 
          ref={headingRef}
          className="font-display text-4xl md:text-5xl font-bold text-white mb-16 text-center"
          style={{ opacity: 0 }}
        >
          {heading}
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ 
                opacity: 0,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center'
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Card Content */}
              <a href={project.link} className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Scanline effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-transparent transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      animation: hoveredCard === index ? 'scanline 1.5s linear infinite' : 'none'
                    }}
                  />
                  
                  {/* Border glow */}
                  <div 
                    className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                      hoveredCard === index ? 'border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.3)]' : 'border-transparent'
                    }`}
                  />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-red-400 bg-red-500/10 rounded-full mb-3">
                    {project.category}
                  </span>
                  
                  <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* View Project Link */}
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-red-400 transition-colors">
                    <span className="text-sm font-medium">View Project</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
                
                {/* External link icon */}
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
