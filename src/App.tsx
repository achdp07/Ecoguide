import { useEffect, useRef, useState, RefObject } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, ChevronDown, Map, Landmark, BookOpen, Anchor, ArrowRight, Share2, Award } from "lucide-react";
import Navigation from "./components/Navigation";
import MapGrid from "./components/MapGrid";
import CityCard from "./components/CityCard";
import { cities } from "./data/cities";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  // References for physical scroll containers
  const heroRef = useRef<HTMLDivElement>(null);
  const chinguettiRef = useRef<HTMLDivElement>(null);
  const ghardaiaRef = useRef<HTMLDivElement>(null);
  const byblosRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  // Smooth-scroll navigation helper
  const scrollToSection = (sectionId: string) => {
    const refs: { [key: string]: RefObject<HTMLDivElement | null> } = {
      hero: heroRef,
      chinguetti: chinguettiRef,
      ghardaia: ghardaiaRef,
      byblos: byblosRef,
      final: finalRef,
    };

    const targetRef = refs[sectionId];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionId);
    }
  };

  // Scroll listener to calculate precise active section and path progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Get offset positions
      const chinguettiTop = chinguettiRef.current?.offsetTop || 0;
      const ghardaiaTop = ghardaiaRef.current?.offsetTop || 0;
      const byblosTop = byblosRef.current?.offsetTop || 0;
      const finalTop = finalRef.current?.offsetTop || 0;

      // 1. Determine active section based on proximity to center of viewport
      const threshold = viewportHeight * 0.45;
      if (scrollY < chinguettiTop - threshold) {
        setActiveSection("hero");
      } else if (scrollY < ghardaiaTop - threshold) {
        setActiveSection("chinguetti");
      } else if (scrollY < byblosTop - threshold) {
        setActiveSection("ghardaia");
      } else if (scrollY < finalTop - threshold) {
        setActiveSection("byblos");
      } else {
        setActiveSection("final");
      }

      // 2. Calculate continuous explorer progress between Chinguetti and Byblos
      // We want the explorer to glide smoothly:
      // - Chinguetti to Ghardaia: maps from scrollY between chinguettiTop and ghardaiaTop -> scrollProgress 0 to 0.5
      // - Ghardaia to Byblos: maps from scrollY between ghardaiaTop and byblosTop -> scrollProgress 0.5 to 1.0
      if (scrollY <= chinguettiTop) {
        setScrollProgress(0);
      } else if (scrollY > chinguettiTop && scrollY <= ghardaiaTop) {
        const factor = (scrollY - chinguettiTop) / (ghardaiaTop - chinguettiTop);
        setScrollProgress(factor * 0.5);
      } else if (scrollY > ghardaiaTop && scrollY <= byblosTop) {
        const factor = (scrollY - ghardaiaTop) / (byblosTop - ghardaiaTop);
        setScrollProgress(0.5 + factor * 0.5);
      } else {
        setScrollProgress(1.0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to establish correct state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="scroll-storytelling-root" className="min-h-screen text-sand-light relative selection:bg-terracotta selection:text-sand-light">
      
      {/* Premium Floating Navigation */}
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />

      {/* SECTION 1: HERO (Fullscreen) */}
      <div 
        ref={heroRef}
        id="section-hero"
        className="relative h-screen w-full flex flex-col justify-between items-center px-4 py-8 overflow-hidden"
      >
        {/* Fullscreen Atmospheric Background Image with heavy elegant overlays */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/40 via-deep-forest/70 to-deep-forest z-10" />
          <img
            src="/src/assets/images/hero_background_1782552695461.jpg"
            alt="Historical Heritage Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 filter brightness-90 animate-subtle-zoom"
          />
        </div>

        {/* Top spacer for navigation alignment */}
        <div className="h-16" />

        {/* Hero Content */}
        <div id="hero-middle-content" className="z-20 text-center max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-[1px] w-8 md:w-12 bg-terracotta" />
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-terracotta-light uppercase">
              A DIGITAL MUSEUM CHRONICLE
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-terracotta" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-sand mb-6 leading-tight"
          >
            Three Cities.<br />
            Three Civilizations.<br />
            <span className="text-terracotta">One Journey.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="font-serif text-lg md:text-2xl text-sand-light/80 max-w-2xl leading-relaxed font-light mb-8"
          >
            "Discover three remarkable historic cities connected by centuries of culture, trade and knowledge."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection("chinguetti")}
              className="px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-light text-sand-light font-display text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-xl shadow-terracotta/20 cursor-pointer flex items-center gap-2"
            >
              <span>Begin Exploration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("final")}
              className="px-6 py-3 rounded-full bg-transparent hover:bg-white/5 text-sand border border-sand/30 font-display text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              View Full Route
            </button>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div 
          id="scroll-indicator"
          onClick={() => scrollToSection("chinguetti")}
          className="z-20 cursor-pointer flex flex-col items-center gap-2 select-none"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="font-display text-[11px] tracking-[0.2em] text-sand/60 uppercase">
            Scroll to begin
          </span>
          <ChevronDown className="w-4 h-4 text-terracotta" />
        </motion.div>
      </div>

      {/* INTERACTIVE STAGE WRAPPER */}
      <div id="story-narrative-sections" className="relative w-full z-10 bg-sand">
        
        {/* Two Column Layout on Desktop, Stacking on Mobile */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* STICKY COLUMN: THE JOURNEY MAP */}
          <div className="col-span-1 lg:col-span-5 lg:h-screen lg:sticky lg:top-24 flex flex-col justify-center">
            
            {/* Map Header with brief context */}
            <div id="map-stage-header" className="mb-4 hidden lg:block">
              <span className="font-mono text-[10px] text-terracotta tracking-widest uppercase font-semibold">
                ACTIVE CHRONICLE ROUTE
              </span>
              <h3 className="font-display text-lg text-dark-green font-bold uppercase mt-1 tracking-wider">
                Saharan & Phoenician Pathways
              </h3>
            </div>

            {/* Sticky map stage card */}
            <div className="w-full aspect-square md:aspect-16/10 lg:aspect-square sticky top-16 md:top-24 lg:relative z-20 h-[38vh] md:h-[45vh] lg:h-auto">
              <MapGrid activeSection={activeSection} scrollProgress={scrollProgress} />
            </div>

            {/* Map footer coordinates / helper */}
            <div id="map-stage-footer" className="mt-3 text-center lg:text-left hidden lg:block">
              <span className="font-mono text-[9px] text-dark-green/50 uppercase">
                * Camera pans and zooms automatically based on your scroll coordinates.
              </span>
            </div>
          </div>

          {/* SCROLLABLE COLUMN: THE CITIES CHRONICLES */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-24 md:gap-36 lg:py-24">
            
            {/* Section 2: Chinguetti Destination Card wrapper */}
            <div 
              ref={chinguettiRef}
              id="story-chinguetti" 
              className="scroll-mt-28 md:scroll-mt-36"
            >
              <div className="mb-4 pl-4 border-l-2 border-terracotta/40">
                <span className="font-mono text-xs text-terracotta font-bold">FIRST DESTINATION</span>
                <h4 className="font-display text-sm tracking-widest text-dark-green uppercase mt-1 font-bold">Crossroads of the Sahara</h4>
              </div>
              <CityCard 
                city={cities[0]} 
                isActive={activeSection === "chinguetti"} 
              />
            </div>

            {/* Section 4 & 5: Ghardaïa Destination Card wrapper */}
            <div 
              ref={ghardaiaRef}
              id="story-ghardaia" 
              className="scroll-mt-28 md:scroll-mt-36"
            >
              <div className="mb-4 pl-4 border-l-2 border-terracotta/40">
                <span className="font-mono text-xs text-terracotta font-bold">SECOND DESTINATION</span>
                <h4 className="font-display text-sm tracking-widest text-dark-green uppercase mt-1 font-bold">The Fortified Oasis Pentapolis</h4>
              </div>
              <CityCard 
                city={cities[1]} 
                isActive={activeSection === "ghardaia"} 
              />
            </div>

            {/* Section 6 & 7: Byblos Destination Card wrapper */}
            <div 
              ref={byblosRef}
              id="story-byblos" 
              className="scroll-mt-28 md:scroll-mt-36"
            >
              <div className="mb-4 pl-4 border-l-2 border-terracotta/40">
                <span className="font-mono text-xs text-terracotta font-bold">THIRD DESTINATION</span>
                <h4 className="font-display text-sm tracking-widest text-dark-green uppercase mt-1 font-bold">Birthplace of the Written Word</h4>
              </div>
              <CityCard 
                city={cities[2]} 
                isActive={activeSection === "byblos"} 
              />
            </div>

          </div>
        </div>
      </div>

      {/* FINAL SECTION: REVEAL ALL */}
      <div 
        ref={finalRef}
        id="section-final"
        className="relative min-h-screen bg-sand-light py-20 px-4 flex flex-col justify-center items-center overflow-hidden border-t border-dark-green/10"
      >
        {/* Beautiful full route layout background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: "radial-gradient(circle, #ffffff 0%, #000000 100%)" }} />

        <div className="max-w-4xl mx-auto text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="p-3 bg-terracotta/10 border border-terracotta/30 rounded-full">
              <Award className="w-8 h-8 text-terracotta animate-pulse" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-dark-green mb-6"
          >
            Three Cities.<br />
            Three Civilizations.<br />
            <span className="text-terracotta">One Shared Heritage.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-lg md:text-xl text-dark-green/90 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            From the sand-swept libraries of Chinguetti, through the communal fortresses of Ghardaïa, to the ancient harbor of Byblos where the alphabet took wing—our shared heritage is a living map. It is a testament to the persistent pathways of trade, human curiosity, and everlasting cultural exchange.
          </motion.p>

          {/* Elegant Historic Timeline Overview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 text-left"
          >
            <div className="p-5 rounded-2xl bg-sand border border-dark-green/15 relative">
              <div className="absolute -inset-1.5 border border-terracotta/10 rounded-2xl pointer-events-none" />
              <span className="font-mono text-[10px] text-terracotta tracking-wider uppercase font-bold">MAURITANIA</span>
              <h5 className="font-display text-lg text-dark-green font-bold mt-1">Chinguetti</h5>
              <p className="font-serif text-sm text-dark-green/80 mt-2">Guardians of medieval Saharan scientific and Quranic manuscripts.</p>
            </div>
            <div className="p-5 rounded-2xl bg-sand border border-dark-green/15 relative">
              <div className="absolute -inset-1.5 border border-terracotta/10 rounded-2xl pointer-events-none" />
              <span className="font-mono text-[10px] text-terracotta tracking-wider uppercase font-bold">ALGERIA</span>
              <h5 className="font-display text-lg text-dark-green font-bold mt-1">Ghardaïa</h5>
              <p className="font-serif text-sm text-dark-green/80 mt-2">Pioneers of climate-adapted sustainable architectural harmony.</p>
            </div>
            <div className="p-5 rounded-2xl bg-sand border border-dark-green/15 relative">
              <div className="absolute -inset-1.5 border border-terracotta/10 rounded-2xl pointer-events-none" />
              <span className="font-mono text-[10px] text-terracotta tracking-wider uppercase font-bold">LEBANON</span>
              <h5 className="font-display text-lg text-dark-green font-bold mt-1">Byblos</h5>
              <p className="font-serif text-sm text-dark-green/80 mt-2">Cradle of maritime navigation and the direct Phoenician linear alphabet.</p>
            </div>
          </motion.div>

          {/* Interactive Call to Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("hero")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-dark-green hover:bg-deep-forest text-sand-light font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl shadow-dark-green/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Restart Expedition</span>
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                navigator.share ? navigator.share({
                  title: 'Three Cities. Three Civilizations.',
                  text: 'Expedition through Chinguetti, Ghardaïa, and Byblos.',
                  url: window.location.href,
                }).catch(() => {}) : alert("Chronicle link copied to clipboard!");
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent hover:bg-black/5 text-dark-green border border-dark-green/25 font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-terracotta" />
              <span>Share Chronicle</span>
            </button>
          </motion.div>

          {/* Partner logos / Museum credits */}
          <div id="museum-credits" className="mt-16 pt-8 border-t border-dark-green/5 flex flex-wrap justify-center items-center gap-8 opacity-40">
            <span className="font-display text-[10px] tracking-[0.25em] text-dark-green uppercase">CULTURAL HERITAGE PROJECT</span>
            <span className="font-display text-[10px] tracking-[0.25em] text-dark-green uppercase">ARCHAEOLOGY COLLATIVE</span>
            <span className="font-display text-[10px] tracking-[0.25em] text-dark-green uppercase">UNESCO PRESERVATION TRUST</span>
          </div>
        </div>
      </div>

    </div>
  );
}
