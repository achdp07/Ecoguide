import { motion } from "motion/react";
import { Compass, BookOpen, Map, Landmark, Anchor } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "hero", label: "Introduction", icon: Compass },
    { id: "chinguetti", label: "Chinguetti", icon: BookOpen },
    { id: "ghardaia", label: "Ghardaïa", icon: Landmark },
    { id: "byblos", label: "Byblos", icon: Anchor },
    { id: "final", label: "Shared Heritage", icon: Map },
  ];

  return (
    <nav 
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 bg-sand-light/90 backdrop-blur-md border-b border-dark-green/10 px-4 py-3 md:px-8 md:py-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <div 
          id="nav-logo"
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate("hero")}
        >
          <Compass className="w-5 h-5 text-terracotta group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-display text-sm tracking-[0.2em] text-dark-green group-hover:text-terracotta transition-colors duration-300">
            ANCIENT CHRONICLES
          </span>
        </div>

        {/* Navigation Links */}
        <div id="nav-links" className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-2 font-display text-xs tracking-widest uppercase transition-all duration-300 pb-1 cursor-pointer ${
                  isActive ? "text-terracotta font-semibold" : "text-dark-green/60 hover:text-dark-green"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terracotta"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Mini-Nav (Icons only for clean space) */}
        <div id="mobile-nav" className="flex md:hidden items-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => onNavigate(item.id)}
                aria-label={item.label}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-terracotta text-sand-light scale-110 shadow-lg shadow-terracotta/20" 
                    : "text-dark-green/50 hover:text-dark-green hover:bg-black/5"
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
