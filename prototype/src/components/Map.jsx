import React from 'react';
import { VENUE_ZONES } from '../data/venue';

export function Map({ occupancyMap, mode = 'staff' }) {
  // mode can be 'staff' (shows heatmaps) or 'attendee' (shows breadcrumbs/paths)

  return (
    <div className="relative w-full h-full min-h-[400px] glass-panel p-4 overflow-hidden flex items-center justify-center bg-black/40">
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} 
      ></div>

      <div className="relative w-full max-w-2xl aspect-video">
        {/* Mocking physical locations of zones with flex/absolute */}
        {VENUE_ZONES.map((zone, i) => {
          const density = occupancyMap[zone.id] || 0.1;
          // Calculate glow intensity based on density
          const blurSize = Math.floor(density * 60) + 10;
          const opacity = density * 0.8 + 0.1;
          
          // Layout styling (hardcoded for prototype visual)
          const positions = [
            { top: '10%', left: '10%', width: '40%', height: '30%' },
            { top: '10%', left: '55%', width: '35%', height: '40%' },
            { top: '55%', left: '10%', width: '30%', height: '35%' },
            { top: '60%', left: '45%', width: '45%', height: '30%' },
          ];
          const pos = positions[i % 4];

          return (
            <div
              key={zone.id}
              className="absolute rounded-2xl flex flex-col items-center justify-center transition-all duration-1000 border border-white/10 backdrop-blur-md"
              style={{
                ...pos,
                backgroundColor: `rgba(20, 20, 30, 0.7)`,
                boxShadow: mode === 'staff' ? `0 0 ${blurSize}px ${zone.color}40, inset 0 0 ${blurSize/2}px ${zone.color}20` : 'none',
                borderColor: mode === 'staff' ? (density > 0.75 ? 'var(--alert-red)' : `rgba(255,255,255,0.1)`) : `rgba(255,255,255,0.1)`
              }}
            >
              <h3 className="text-sm font-bold tracking-wider text-white mb-1">{zone.name}</h3>
              {mode === 'staff' && (
                <div className="text-xs text-white/70 font-mono">
                  Density: {(density * 100).toFixed(0)}%
                </div>
              )}
              {mode === 'attendee' && density < 0.4 && (
                <div className="mt-2 text-[10px] uppercase px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                  Clear Path
                </div>
              )}
            </div>
          );
        })}

        {/* Mock AR Breadcrumb Trail for Attendee View */}
        {mode === 'attendee' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            <path 
              d="M 150 300 Q 250 300 350 200 T 500 150" 
              fill="none" 
              stroke="var(--path-glow)" 
              strokeWidth="4" 
              className="drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 8px var(--path-glow))' }}
              strokeDasharray="10 10"
            >
              <animate attributeName="stroke-dashoffset" values="20;0" dur="1s" repeatCount="indefinite" />
            </path>
            <circle cx="500" cy="150" r="6" fill="var(--path-glow)">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        )}
      </div>
    </div>
  );
}
