import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {  Mail, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  heading?: string;
}

function Contact({ heading = 'Send a Signal' }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitText, setSubmitText] = useState('Transmit');
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

      // Divider line draw animation
      const dividerTrigger = ScrollTrigger.create({
        trigger: dividerRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            dividerRef.current,
            { scaleY: 0 },
            { scaleY: 1, duration: 1, ease: 'power2.inOut' }
          );
        },
        once: true,
      });
      triggersRef.current.push(dividerTrigger);

      // Left content slide in
      const leftTrigger = ScrollTrigger.create({
        trigger: leftContentRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            leftContentRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(leftTrigger);

      // Form inputs stagger
      const inputs = formRef.current?.querySelectorAll('.form-group');
      if (inputs) {
        const formTrigger = ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              inputs,
              { x: 50, opacity: 0 },
              { 
                x: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.1,
                ease: 'expo.out' 
              }
            );
          },
          once: true,
        });
        triggersRef.current.push(formTrigger);
      }
    }, sectionRef);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitText('Initiating...');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitText('Signal Sent!');
      
      setTimeout(() => {
        setSubmitText('Transmit');
      }, 2000);
    }, 1500);
  };

  const handleButtonHover = (isHovering: boolean) => {
    setSubmitText(isHovering ? 'Initiate' : 'Transmit');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 z-10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <h2 
          ref={headingRef}
          className="font-display text-4xl md:text-5xl font-bold text-white mb-16 text-center"
          style={{ opacity: 0 }}
        >
          {heading}
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative">
          {/* Left Content */}
          <div 
            ref={leftContentRef}
            className="flex flex-col justify-center pr-0 lg:pr-16"
            style={{ opacity: 0 }}
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              Let&apos;s Create Something Amazing
            </h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              Have a project in mind or just want to say hello? I&apos;m always open to discussing new opportunities, creative ideas, or potential collaborations.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5">
                  <Mail className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Email</p>
                  <p className="text-white">lff51555@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5">
                  <User className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Availability</p>
                  <p className="text-white">Open for freelance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div 
            ref={dividerRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
            style={{ transform: 'scaleY(0)' }}
          >
            {/* Traveling light dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.8)] animate-pulse" />
          </div>

          {/* Form */}
          <form
  action="https://formspree.io/f/mykbyalg"
  method="POST"
  className="space-y-4"
>
  {/* Name */}
  <div>
    <input
      type="text"
      name="name"
      placeholder="Your name"
      required
      className="w-full px-4 py-3 rounded-lg bg-[#191919]/50 border border-[#3D3D3D] text-white outline-none focus:border-red-500"
    />
  </div>

  {/* Email */}
  <div>
    <input
      type="email"
      name="email"
      placeholder="your@email.com"
      required
      className="w-full px-4 py-3 rounded-lg bg-[#191919]/50 border border-[#3D3D3D] text-white outline-none focus:border-red-500"
    />
  </div>

  {/* Message */}
  <div>
    <textarea
      name="message"
      placeholder="Tell me about your project..."
      required
      rows={4}
      className="w-full px-4 py-3 rounded-lg bg-[#191919]/50 border border-[#3D3D3D] text-white outline-none focus:border-red-500"
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all text-white font-semibold"
  >
    Transmit 🚀
  </button>
</form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
