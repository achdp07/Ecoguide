import { motion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Compass } from "lucide-react";

interface MapGridProps {
  activeSection: string;
  scrollProgress: number; // 0 to 1 representing the journey progress (Chinguetti to Byblos)
}

// Bezier coordinate interpolation
function getBezierPoint(p0: number, p1: number, p2: number, p3: number, t: number) {
  const oneMinusT = 1 - t;
  return (
    Math.pow(oneMinusT, 3) * p0 +
    3 * Math.pow(oneMinusT, 2) * t * p1 +
    3 * oneMinusT * Math.pow(t, 2) * p2 +
    Math.pow(t, 3) * p3
  );
}

export function getExplorerPosition(progress: number) {
  // progress goes from 0 (Chinguetti) to 1 (Byblos)
  const clampedProgress = Math.max(0, Math.min(1, progress));
  if (clampedProgress <= 0.5) {
    // Segment 1: Chinguetti to Ghardaia
    const t = clampedProgress * 2;
    const x = getBezierPoint(280, 360, 420, 500, t);
    const y = getBezierPoint(250, 300, 380, 500, t);
    return { x, y };
  } else {
    // Segment 2: Ghardaia to Byblos
    const t = (clampedProgress - 0.5) * 2;
    const x = getBezierPoint(500, 580, 680, 780, t);
    const y = getBezierPoint(500, 620, 650, 750, t);
    return { x, y };
  }
}

export default function MapGrid({ activeSection, scrollProgress }: MapGridProps) {
  // Define viewport zoom states for camera effects
  const getViewBox = (section: string) => {
    switch (section) {
      case "hero":
        return "0 0 1000 1000";
      case "chinguetti":
        return "80 50 450 450"; // Zoomed on Chinguetti
      case "ghardaia":
        return "300 300 450 450"; // Zoomed on Ghardaïa
      case "byblos":
        return "530 500 450 450"; // Zoomed on Byblos
      case "final":
      default:
        return "0 0 1000 1000"; // Full route reveal
    }
  };

  const targetViewBox = getViewBox(activeSection);
  const [currentViewBox, setCurrentViewBox] = useState("0 0 1000 1000");

  // Smoothly interpolate viewBox values using standard React state or springs
  useEffect(() => {
    // When targetViewBox changes, smoothly update it
    setCurrentViewBox(targetViewBox);
  }, [targetViewBox]);

  const explorerPos = getExplorerPosition(scrollProgress);

  // SVG dimensions & grid
  const latLines = [150, 300, 450, 600, 750, 900];
  const lngLines = [150, 300, 450, 600, 750, 900];

  return (
    <div 
      id="map-container"
      className="relative w-full h-full bg-sand border-4 border-sand-dark/30 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex items-center justify-center transition-all duration-700"
    >
      {/* Vintage paper texture overlay */}
      <div 
        id="map-paper-texture"
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 0%, #d4b483 100%)`,
        }}
      />
      {/* Vignette styling for aged parchment look */}
      <div 
        id="map-vignette"
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(139,94,60,0.25)]"
      />

      {/* Main SVG Map */}
      <motion.svg
        id="parchment-svg"
        className="w-full h-full text-dark-green"
        viewBox={currentViewBox}
        animate={{ viewBox: targetViewBox }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
      >
        {/* Definition for gradients and patterns */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B56545" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B56545" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FAF6ED" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EAD8B7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Map Coordinates & Grid Lines (Graticules) */}
        <g id="map-graticule" className="opacity-20">
          {latLines.map((y) => (
            <line
              key={`lat-${y}`}
              x1="0"
              y1={y}
              x2="1000"
              y2={y}
              stroke="#264653"
              strokeWidth="1"
              strokeDasharray="4,8"
            />
          ))}
          {lngLines.map((x) => (
            <line
              key={`lng-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="1000"
              stroke="#264653"
              strokeWidth="1"
              strokeDasharray="4,8"
            />
          ))}
        </g>

        {/* Tiny Grid labels */}
        <g id="graticule-labels" className="font-mono text-[10px] fill-dark-green/30 select-none">
          <text x="30" y="305">24° N</text>
          <text x="30" y="605">32° N</text>
          <text x="30" y="905">40° N</text>
          <text x="305" y="980">12° W</text>
          <text x="605" y="980">3° E</text>
          <text x="905" y="980">35° E</text>
        </g>

        {/* Decorative Map Border */}
        <rect
          x="15"
          y="15"
          width="970"
          height="970"
          fill="none"
          stroke="#264653"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <rect
          x="20"
          y="20"
          width="960"
          height="960"
          fill="none"
          stroke="#264653"
          strokeWidth="2"
          strokeDasharray="12, 6"
          strokeOpacity="0.4"
        />

        {/* 2. Elegant Winding Route Path */}
        {/* Base dotted route representing caravan path */}
        <path
          id="caravan-route-dotted"
          d="M 280 250 C 360 300, 420 380, 500 500 C 580 620, 680 650, 780 750"
          fill="none"
          stroke="#B56545"
          strokeWidth="4"
          strokeDasharray="8,8"
          strokeLinecap="round"
          className="opacity-40"
        />

        {/* Progressive solid line representing traveled path */}
        <motion.path
          id="caravan-route-solid"
          d="M 280 250 C 360 300, 420 380, 500 500 C 580 620, 680 650, 780 750"
          fill="none"
          stroke="#264653"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: scrollProgress }}
          transition={{ type: "tween", ease: "easeOut" }}
        />

        {/* 3. Compass Rose (Upper Right Panel) */}
        <g id="compass-rose" transform="translate(800, 200) scale(1.1)">
          <circle cx="0" cy="0" r="60" fill="none" stroke="#264653" strokeWidth="1" strokeOpacity="0.2" />
          <circle cx="0" cy="0" r="54" fill="none" stroke="#264653" strokeWidth="1.5" strokeDasharray="2, 4" strokeOpacity="0.3" />
          
          {/* Points */}
          <polygon points="0,-65 8,-12 0,0" fill="#B56545" />
          <polygon points="0,-65 -8,-12 0,0" fill="#D48C6F" />
          
          <polygon points="0,65 8,12 0,0" fill="#D48C6F" />
          <polygon points="0,65 -8,12 0,0" fill="#B56545" />

          <polygon points="65,0 12,8 0,0" fill="#B56545" />
          <polygon points="65,0 12,-8 0,0" fill="#D48C6F" />

          <polygon points="-65,0 -12,8 0,0" fill="#D48C6F" />
          <polygon points="-65,0 -12,-8 0,0" fill="#B56545" />

          {/* Diagonal Points */}
          <polygon points="40,40 10,2 0,0" fill="#264653" opacity="0.6" />
          <polygon points="40,40 2,10 0,0" fill="#162B34" opacity="0.4" />
          <polygon points="-40,-40 -10,-2 0,0" fill="#264653" opacity="0.6" />
          <polygon points="-40,-40 -2,-10 0,0" fill="#162B34" opacity="0.4" />
          <polygon points="40,-40 10,-2 0,0" fill="#264653" opacity="0.6" />
          <polygon points="40,-40 2,-10 0,0" fill="#162B34" opacity="0.4" />
          <polygon points="-40,40 -10,2 0,0" fill="#264653" opacity="0.6" />
          <polygon points="-40,40 -2,10 0,0" fill="#162B34" opacity="0.4" />

          <circle cx="0" cy="0" r="6" fill="#FAF6ED" />
          <circle cx="0" cy="0" r="3" fill="#B56545" />

          <text x="-4" y="-72" className="font-display text-[12px] font-bold fill-dark-green select-none">N</text>
        </g>

        {/* 4. Elegant Map Legend (Lower Left Corner) */}
        <g id="map-legend" transform="translate(50, 800)">
          <rect x="0" y="0" width="220" height="120" fill="#FAF6ED" stroke="#264653" strokeWidth="1.5" rx="4" filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.1))" />
          <rect x="4" y="4" width="212" height="112" fill="none" stroke="#264653" strokeWidth="0.5" strokeDasharray="3,3" />
          
          <text x="110" y="30" textAnchor="middle" className="font-display text-[11px] tracking-[0.2em] font-bold fill-dark-green">TRANS-MEDITERRANEAN</text>
          <text x="110" y="48" textAnchor="middle" className="font-display text-[10px] tracking-[0.15em] fill-terracotta">CULTURAL PATHWAYS</text>
          <line x1="30" y1="60" x2="190" y2="60" stroke="#264653" strokeWidth="1" strokeOpacity="0.3" />
          
          <text x="30" y="80" className="font-mono text-[9px] fill-dark-green/60">SCALE: 1 : 12,000,000</text>
          <text x="30" y="98" className="font-mono text-[9px] fill-dark-green/60">ERA: ANTIQUITY - MEDIEVAL</text>
        </g>

        {/* 5. Historical Cities Node Plots */}

        {/* Chinguetti Node (280, 250) */}
        <g id="node-chinguetti" className="cursor-pointer">
          {activeSection === "chinguetti" && (
            <circle cx="280" cy="250" r="35" fill="url(#glow)" />
          )}
          <circle cx="280" cy="250" r="12" fill="#FAF6ED" stroke="#B56545" strokeWidth="3" />
          <circle cx="280" cy="250" r="5" fill={activeSection === "chinguetti" ? "#264653" : "#B56545"} />
          <text
            x="280"
            y="225"
            textAnchor="middle"
            className={`font-display text-xs tracking-[0.15em] font-semibold select-none transition-all duration-300 ${
              activeSection === "chinguetti" ? "fill-terracotta scale-110 font-bold" : "fill-dark-green/70"
            }`}
          >
            CHINGUETTI
          </text>
        </g>

        {/* Ghardaïa Node (500, 500) */}
        <g id="node-ghardaia" className="cursor-pointer">
          {activeSection === "ghardaia" && (
            <circle cx="500" cy="500" r="35" fill="url(#glow)" />
          )}
          <circle cx="500" cy="500" r="12" fill="#FAF6ED" stroke="#B56545" strokeWidth="3" />
          <circle cx="500" cy="500" r="5" fill={activeSection === "ghardaia" ? "#264653" : "#B56545"} />
          <text
            x="500"
            y="475"
            textAnchor="middle"
            className={`font-display text-xs tracking-[0.15em] font-semibold select-none transition-all duration-300 ${
              activeSection === "ghardaia" ? "fill-terracotta scale-110 font-bold" : "fill-dark-green/70"
            }`}
          >
            GHARDAÏA
          </text>
        </g>

        {/* Byblos Node (780, 750) */}
        <g id="node-byblos" className="cursor-pointer">
          {activeSection === "byblos" && (
            <circle cx="780" cy="750" r="35" fill="url(#glow)" />
          )}
          <circle cx="780" cy="750" r="12" fill="#FAF6ED" stroke="#B56545" strokeWidth="3" />
          <circle cx="780" cy="750" r="5" fill={activeSection === "byblos" ? "#264653" : "#B56545"} />
          <text
            x="780"
            y="725"
            textAnchor="middle"
            className={`font-display text-xs tracking-[0.15em] font-semibold select-none transition-all duration-300 ${
              activeSection === "byblos" ? "fill-terracotta scale-110 font-bold" : "fill-dark-green/70"
            }`}
          >
            BYBLOS
          </text>
        </g>

        {/* 6. Glowing Explorer Traveling Marker */}
        {scrollProgress > 0 && scrollProgress <= 1 && (
          <g id="explorer-marker" transform={`translate(${explorerPos.x}, ${explorerPos.y})`}>
            {/* Outer halo pulsing */}
            <motion.circle
              cx="0"
              cy="0"
              r="24"
              fill="url(#gold-glow)"
              animate={{ r: [16, 26, 16], opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            {/* Marker body */}
            <circle cx="0" cy="0" r="10" fill="#264653" stroke="#FAF6ED" strokeWidth="2.5" className="shadow-lg shadow-black/50" />
            <circle cx="0" cy="0" r="4" fill="#EAD8B7" />
            <Compass className="w-3.5 h-3.5 text-sand-light absolute -translate-x-1.5 -translate-y-1.5 animate-spin-slow" style={{ transformOrigin: 'center' }} />
          </g>
        )}
      </motion.svg>
    </div>
  );
}
