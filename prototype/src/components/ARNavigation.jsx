import React, { useState, useEffect } from 'react';
import { RouteComparisonModal } from './RouteComparisonModal';

export function ARNavigation({ occupancyMap, targetZoneId, onBack }) {
  // Use mock data if targetZoneId doesn't exist. Assuming 'radiant' fallback.
  const targetId = targetZoneId || 'radiant';
  
  // Base Vibe Overrides
  let vibeDensity = occupancyMap[targetId] || 0.1;
  let bgFilter = 'brightness(0.65) contrast(1.1)';
  let vibeColor = '#00ffcc'; 
  let vibeLabel = 'Radiant Concourse';

  if (targetId === 'whisper') {
    vibeDensity = 0.08;
    bgFilter = 'brightness(0.6) contrast(1.1) hue-rotate(280deg)'; // Purple tint
    vibeColor = '#9b59b6'; // Calm purple
    vibeLabel = 'Whisper Halls';
  } else if (targetId === 'flash') {
    bgFilter = 'brightness(0.7) contrast(1.2) hue-rotate(290deg) saturate(1.5)'; // Energetic magenta
    vibeColor = '#ff00ff'; // Magenta
    vibeLabel = 'Flash Bazaar';
  } else if (targetId === 'silent') {
    vibeDensity = 0.03;
    bgFilter = 'brightness(0.5) contrast(0.9) hue-rotate(150deg) saturate(0.5)'; // Sage green 
    vibeColor = '#81b073'; // Peaceful sage
    vibeLabel = 'Silent Sanctum';
  }

  // Logic for final display colors based on vibe OR congestion
  let trailColor = vibeColor; 
  let trailWidth = Math.max(6, 24 - (vibeDensity * 22)); // Thick when clear, thin when crowded
  let statusText = 'Clear Path';
  
  if (vibeDensity > 0.7 && targetId === 'radiant') {
    trailColor = '#ff3366'; // AVOID RED overlay for basic navigation
    statusText = 'Congested Path';
  } else if (vibeDensity > 0.4 && targetId === 'radiant') {
    trailColor = '#f5a623'; // WARNING AMBER
    statusText = 'Moderate Traffic';
  }

  const [distance, setDistance] = useState(120);
  const [showComparison, setShowComparison] = useState(false);
  const trend = Math.random() > 0.5 ? '↗' : '↘'; // mock trend 

  // Dynamic instruction mock (walk distance down)
  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(prev => Math.max(0, prev - Math.floor(Math.random() * 5)));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-[100] flex flex-col pointer-events-auto bg-black overflow-hidden animate-[fade-in_0.3s_ease-out]">
      {/* AR Camera Feed Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: 'url(/ar-background.png)', filter: bgFilter }}
      ></div>

      {/* AR Breadcrumb Trail Layer - simulated 3D depth */}
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center perspective-1000">
        <svg 
          viewBox="0 0 400 800" 
          className="absolute bottom-[-10%] w-full h-[90%] origin-bottom" 
          style={{ transform: 'rotateX(65deg)', filter: `drop-shadow(0 0 15px ${trailColor})` }}
        >
          {/* Base Glow */}
          <path 
            d="M 200,800 C 200,600 120,400 180,100" 
            fill="none" 
            stroke={trailColor} 
            strokeWidth={trailWidth} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
            opacity="0.75"
          />
          {/* Animated Directional Pulses */}
          <path 
            d="M 200,800 C 200,600 120,400 180,100" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth={Math.max(2, trailWidth * 0.3)} 
            strokeLinecap="round"
            strokeDasharray="15 30"
            className="animate-pulse"
          >
            <animate attributeName="stroke-dashoffset" values="45;0" dur="0.8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Top Interface */}
      <div className="relative pt-8 px-6 pb-4 flex justify-between items-start">
        <button 
          onClick={onBack}
          className="bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-white/20 transition-colors"
        >
          ←
        </button>
        <div className="bg-black/60 backdrop-blur-md border border-[var(--path-glow)] px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[var(--path-glow)] flex items-center gap-2 shadow-[0_0_10px_rgba(0,255,204,0.3)]">
          <span className="w-2 h-2 rounded-full bg-[var(--path-glow)] animate-pulse"></span>
          AR ACTIVE
        </div>
      </div>

      {/* Dynamic Instruction Popup */}
      <div className="relative mt-2 mx-auto bg-black/60 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl w-[85%] text-center transform hover:scale-[1.02] transition-transform">
        <div className="text-sm font-bold text-white mb-1 tracking-wide">
          Walk {distance} ft → Turn left
        </div>
        <div className="text-[10px] text-white/70 font-mono tracking-widest uppercase">
          Routing to {vibeLabel} • {statusText}
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Bottom Overlay Stats */}
      <div className="relative bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-8 px-6 text-left">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 glass-panel p-3 border-white/10 text-center bg-black/40">
             <div className="text-[10px] text-white/50 mb-1 font-mono tracking-wider">ZONE DENSITY</div>
             <div className="text-xl font-bold flex items-center justify-center gap-1 transition-colors duration-1000" style={{ color: trailColor }}>
               {(vibeDensity * 100).toFixed(0)}% <span className="text-sm opacity-80">{trend}</span>
             </div>
          </div>
          <div className="flex-1 glass-panel p-3 border-white/10 text-center bg-black/40">
             <div className="text-[10px] text-white/50 mb-1 font-mono tracking-wider">TOTAL ETA</div>
             <div className="text-xl font-bold text-white">4m 20s</div>
             <div className="text-[9px] uppercase text-white/40 mt-1 tracking-wider">Wait + Walk</div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => setShowComparison(true)}
            className="w-full bg-[var(--path-glow)] text-black font-bold py-3.5 rounded-2xl shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:scale-[1.02] transition-transform text-sm"
          >
             Take Alternative Route (Save 2m)
          </button>
          <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 py-3.5 rounded-2xl text-sm font-bold text-white hover:bg-white/20 transition-colors">
             Call Nearest Staff Assist
          </button>
        </div>
      </div>

      {showComparison && (
        <RouteComparisonModal 
          onClose={() => setShowComparison(false)}
          onSelectRoute={(route) => {
            // In a real app we'd update the AR path logic here
            setShowComparison(false);
          }}
        />
      )}
    </div>
  );
}
