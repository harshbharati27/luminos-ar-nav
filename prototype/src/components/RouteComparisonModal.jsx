import React, { useState } from 'react';

export function RouteComparisonModal({ onClose, onSelectRoute }) {
  const [activeRoute, setActiveRoute] = useState('B'); // Default focus on the recommended alternative

  const routes = {
    A: {
      name: 'Primary Route',
      distance: '105 ft',
      waitTime: '2m 10s',
      walkTime: '2m 10s',
      total: '4m 20s',
      density: 29,
      color: '#ff3366', // red/congested vibe for wait
      graph: [10, 15, 20, 25, 29, 28, 29], // mock trend
      pathDesc: 'Direct, but highly congested corridor.'
    },
    B: {
      name: 'Alternative Route',
      distance: '180 ft',
      waitTime: '0m 45s',
      walkTime: '3m 30s',
      total: '4m 15s',
      density: 8,
      color: '#00ffcc', // clear vibe
      graph: [15, 12, 10, 8, 8, 9, 8],
      pathDesc: 'Longer walk, but bypasses the main crowd choke-point.'
    }
  };

  const current = routes[activeRoute];

  return (
    <div className="absolute inset-0 z-[200] bg-black/90 backdrop-blur-2xl flex flex-col pt-12 pb-8 px-6 animate-[fade-in_0.3s_ease-out]">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Route Comparison
        </h2>
        <button onClick={onClose} className="text-white/50 hover:text-white p-2 text-2xl leading-none">&times;</button>
      </div>

      {/* Toggle / Swipe Indicator (Mocking swipe via tabs) */}
      <div className="flex bg-white/5 p-1 rounded-full mb-6">
        <button 
          onClick={() => setActiveRoute('A')}
          className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${activeRoute === 'A' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40'}`}
        >
          Route A
        </button>
        <button 
          onClick={() => setActiveRoute('B')}
          className={`flex-1 py-2 text-sm font-bold rounded-full transition-all flex items-center justify-center gap-1 ${activeRoute === 'B' ? 'bg-[var(--path-glow)] text-black shadow-[0_0_15px_rgba(0,255,204,0.3)]' : 'text-white/40'}`}
        >
          Route B ⭐
        </button>
      </div>

      {/* Visual Map Preview */}
      <div className="h-40 rounded-2xl bg-[#0a0a0f] border border-white/10 overflow-hidden relative mb-6 shadow-inner flex items-center justify-center">
         {/* Abstract map representation */}
         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         
         <svg className="absolute inset-0 w-full h-full">
            {activeRoute === 'A' && (
              <path d="M 50 120 C 150 120 200 40 300 80" fill="none" stroke={routes.A.color} strokeWidth="6" strokeLinecap="round" className="drop-shadow-lg" />
            )}
            {activeRoute === 'B' && (
              <path d="M 50 120 C 100 150 150 160 250 120 S 280 40 300 80" fill="none" stroke={routes.B.color} strokeWidth="6" strokeLinecap="round" strokeDasharray="8 8" className="drop-shadow-lg animate-[dash_1s_linear_infinite]" />
            )}
            {/* Start & End Points */}
            <circle cx="50" cy="120" r="4" fill="white" />
            <circle cx="300" cy="80" r="6" fill="#ff2a5f" />
         </svg>
         
         <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-white/60 uppercase">
           Live Swarm Overlay
         </div>
      </div>

      {/* Stats Data */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
           <div>
              <div className="text-[10px] text-white/50 tracking-widest font-mono mb-1">TOTAL TIME</div>
              <div className="text-3xl font-extrabold flex items-center gap-2">
                 {current.total} 
                 {activeRoute === 'B' && <span className="text-[10px] bg-[var(--path-glow)]/20 text-[var(--path-glow)] px-2 py-1 rounded-full uppercase tracking-wider">Faster</span>}
              </div>
           </div>
           <div className="text-right">
              <div className="text-[10px] text-white/50 font-mono">WAIT: {current.waitTime}</div>
              <div className="text-[10px] text-white/50 font-mono">WALK: {current.walkTime}</div>
           </div>
        </div>

        <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
           <div>
              <div className="text-[10px] text-white/50 tracking-widest font-mono mb-1">DENSITY AHEAD</div>
              <div className="text-xl font-bold" style={{ color: current.color }}>{current.density}%</div>
           </div>
           <div className="w-24 h-8 flex items-end justify-between gap-1">
              {/* Density Graph Mock */}
              {current.graph.map((val, i) => (
                 <div key={i} className="w-full bg-white/20 rounded-t-sm transition-all" style={{ height: `${val}%`, backgroundColor: i === current.graph.length-1 ? current.color : '' }}></div>
              ))}
           </div>
        </div>

        <div className="text-sm font-medium text-white/70 italic bg-[#1a1a2e]/50 p-4 rounded-xl border-l-2 border-[var(--path-glow)]">
          "Route B takes longer to walk but avoids the congestion at the main concourse. You'll arrive faster overall."
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <button 
           onClick={() => onSelectRoute(activeRoute)}
           className="w-full bg-[var(--path-glow)] text-black font-extrabold text-sm py-4 rounded-2xl shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
           SELECT {activeRoute === 'B' ? 'ROUTE B' : 'ROUTE A'}
        </button>
        <button 
           onClick={onClose}
           className="w-full text-white/50 text-xs font-bold py-3 hover:text-white transition-colors uppercase tracking-widest"
        >
           STICK WITH ROUTE A
        </button>
      </div>
      
    </div>
  );
}
