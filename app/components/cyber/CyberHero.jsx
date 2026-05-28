import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export function CyberHero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(titleRef.current.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.5');
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full text-xs font-mono tracking-wider text-cyber-accent">
            <span className="w-2 h-2 bg-cyber-accent rounded-full animate-pulse" />
            <span>FUTURE OF E-COMMERCE</span>
          </div>
        </motion.div>

        <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 overflow-hidden">
          <span className="block">
            <span className="text-white">CYBER</span>
            <span className="gradient-text">FINDS</span>
          </span>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl lg:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
          Discover premium products in an immersive digital experience.
          <br className="hidden md:block" />
          Where luxury meets the future.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/collections"
            className="group relative inline-flex items-center px-8 py-4 bg-cyber-accent text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow-lg"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>

          <Link
            to="/collections/all"
            className="group relative inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:border-cyber-accent transition-all duration-300"
          >
            <span className="mr-2">View Products</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 text-white/40">
            <span className="text-xs tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-cyber-accent/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyber-purple/10 rounded-full filter blur-3xl" />
    </section>
  );
}
