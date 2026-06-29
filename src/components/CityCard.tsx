import { motion } from "motion/react";
import { Landmark, Compass, Calendar, BookOpen, Quote } from "lucide-react";
import { City } from "../data/cities";

interface CityCardProps {
  city: City;
  isActive: boolean;
}

export default function CityCard({ city, isActive }: CityCardProps) {
  return (
    <motion.div
      id={`city-card-${city.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative w-full p-6 md:p-8 rounded-2xl bg-sand-light border border-dark-green/10 shadow-2xl transition-all duration-500 ${
        isActive ? "shadow-terracotta/10 scale-[1.01]" : "opacity-75"
      }`}
    >
      {/* Ancient/Classical double border decoration from the design theme */}
      <div className="absolute -inset-2 border border-terracotta/20 rounded-2xl pointer-events-none" />

      {/* City Image Header with vintage parchment/bronze border */}
      <div 
        id={`city-image-container-${city.id}`}
        className="relative w-full aspect-16/9 rounded-xl overflow-hidden mb-6 border-2 border-dark-green/10 group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/40 via-transparent to-transparent z-10 opacity-70" />
        <img
          src={city.image}
          alt={`Historical view of ${city.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] sepia-[0.15] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0"
        />
        {/* Geographic Coordinates overlay */}
        <div id="coords-badge" className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-sand-light/90 backdrop-blur-md rounded-full border border-dark-green/20 font-mono text-[10px] tracking-widest text-dark-green">
          <Compass className="w-3 h-3 text-terracotta" />
          <span>{city.coordinates.lat}, {city.coordinates.lng}</span>
        </div>
        {/* Highlight badge */}
        <div id="badge-theme" className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-terracotta/90 backdrop-blur-md rounded-lg text-[10px] font-display uppercase tracking-widest text-sand-light">
          {city.badgeText}
        </div>
      </div>

      {/* City Title & Metadata */}
      <div id="card-header" className="mb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-terracotta block mb-1 font-bold">
          {city.country}
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-wider text-dark-green">
          {city.name}
        </h2>
      </div>

      <hr className="border-dark-green/10 mb-5" />

      {/* Description as a blockquote */}
      <div id="description-section" className="relative pl-6 py-1 mb-6 border-l-2 border-terracotta/50">
        <Quote className="absolute top-0 left-1 w-4 h-4 text-terracotta/20 -scale-x-100" />
        <p className="font-serif text-base md:text-lg text-dark-green/90 leading-relaxed italic">
          {city.description}
        </p>
      </div>

      {/* Historical Facts & Significance Grid */}
      <div id="facts-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Founding Century card */}
        <div id="founding-fact" className="p-4 rounded-xl bg-dark-green/5 border border-dark-green/5 flex items-start gap-3">
          <Calendar className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
          <div>
            <span className="font-display text-[9px] tracking-widest uppercase text-dark-green/60 block font-bold">FOUNDED</span>
            <span className="font-mono text-sm font-semibold text-dark-green">{city.foundingCentury}</span>
          </div>
        </div>

        {/* Historical Significance card */}
        <div id="significance-fact" className="p-4 rounded-xl bg-dark-green/5 border border-dark-green/5 flex items-start gap-3 md:col-span-2">
          <BookOpen className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
          <div>
            <span className="font-display text-[9px] tracking-widest uppercase text-dark-green/60 block font-bold">HISTORICAL SIGNIFICANCE</span>
            <p className="font-serif text-sm text-dark-green/80 leading-relaxed mt-1">
              {city.historicalSignificance}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
