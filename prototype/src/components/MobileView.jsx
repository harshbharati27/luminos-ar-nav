import React, { useState, useEffect } from 'react';
import { Map } from './Map';
import { ARNavigation } from './ARNavigation';
import { BadgeCollection } from './BadgeCollection';
import { VIBE_OPTIONS } from '../data/venue';

export function MobileView({ occupancyMap, alerts }) {
  const [vibe, setVibe] = useState(null);
  const [activeTab, setActiveTab] = useState('map'); // map, badges
  const [currentAlert, setCurrentAlert] = useState(null);
  const [arModeActive, setArModeActive] = useState(false);

  // Show alerts as micro-moments
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      setCurrentAlert(alerts[0]);
      const timer = setTimeout(() => setCurrentAlert(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  if (!vibe) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-black text-left">
        <h2 className="text-2xl font-bold mb-2 w-full">Welcome to Antigravity.</h2>
        <p className="text-white/60 mb-8 w-full">Which vibe calls you today?</p>
        <div className="flex flex-col gap-4 w-full">
          {VIBE_OPTIONS.map(v => (
            <button 
              key={v.id} 
              onClick={() => setVibe(v.id)}
              className="glass-panel p-4 text-left transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <h3 className="text-lg font-bold text-white mb-1">{v.label}</h3>
              <p className="text-sm text-white/50">{v.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black relative">
      {/* Status Bar */}
      <div className="pt-4 px-6 pb-2 text-xs font-mono text-white/50 flex justify-between tracking-widest uppercase items-center">
        <span>Vibe: {vibe}</span>
        <button className="underline" onClick={() => setVibe(null)}>Change</button>
      </div>

      {arModeActive && (
         <ARNavigation 
            occupancyMap={occupancyMap} 
            targetZoneId={vibe} 
            onBack={() => setArModeActive(false)} 
         />
      )}

      <div className="flex-1 relative overflow-hidden flex flex-col">
        {activeTab === 'map' ? (
          <>
            <div className="h-full scale-[1.2] origin-top flex flex-col pt-8">
              <Map occupancyMap={occupancyMap} mode="attendee" />
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[85%] z-50">
               <button 
                  onClick={() => setArModeActive(true)}
                  className="w-full bg-white text-black font-extrabold tracking-wide py-3.5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
               >
                  <span className="text-xl">👁️</span> ENTER AR ROUTE
               </button>
            </div>
          </>
        ) : (
          <div className="h-full bg-black/60 relative">
             <BadgeCollection />
          </div>
        )}
      </div>

      {/* Micro-moment Popover */}
      {currentAlert && activeTab === 'map' && (
        <div className="absolute top-12 left-4 right-4 glass-panel bg-white/10 border-[var(--path-glow)] p-4 animate-[float_3s_ease-in-out_infinite] shadow-[0_0_20px_rgba(0,255,204,0.2)] text-left">
          <div className="flex items-start gap-3">
             <div className="text-2xl mt-1">✨</div>
             <div>
                <h4 className="text-sm font-bold text-[var(--path-glow)] mb-1">Micro-Moment Opportunity</h4>
                <p className="text-xs text-white/90 leading-snug">{currentAlert.message}</p>
             </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="flex bg-[var(--bg-primary)] border-t border-white/10 p-4 pb-8">
        <button 
          className={`flex-1 text-center font-semibold text-sm ${activeTab === 'map' ? 'text-[var(--path-glow)]' : 'text-white/40'}`}
          onClick={() => setActiveTab('map')}
        >
          Navigate
        </button>
        <button 
          className={`flex-1 text-center font-semibold text-sm ${activeTab === 'badges' ? 'text-white' : 'text-white/40'}`}
          onClick={() => setActiveTab('badges')}
        >
          Badges
        </button>
      </div>
    </div>
  );
}
