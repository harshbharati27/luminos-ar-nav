import React, { useState } from 'react';
import { useSwarmSimulation } from './hooks/useSwarmSimulation';
import { MobileView } from './components/MobileView';
import { StaffDashboard } from './components/StaffDashboard';
import { HighlightsReel } from './components/HighlightsReel';

function App() {
  const [viewMode, setViewMode] = useState('attendee'); // 'staff' or 'attendee'
  const { occupancyMap, predictions, alerts } = useSwarmSimulation();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4 md:p-8 flex flex-col font-sans text-[var(--text-primary)]">
      {/* Header and View Toggle */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-white/10 max-w-6xl w-full mx-auto">
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient tracking-tight">Antigravity</h1>
          <p className="text-sm text-[var(--text-secondary)] tracking-widest uppercase mt-1">Venue Experience System</p>
        </div>
        
        <div className="flex bg-[var(--bg-glass)] p-1 rounded-lg border border-white/10 shadow-lg">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${viewMode === 'attendee' ? 'bg-white/15 shadow-[0_0_10px_rgba(255,255,255,0.1)] text-white' : 'text-white/50 hover:text-white/80'}`}
            onClick={() => setViewMode('attendee')}
          >
            Attendee App
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${viewMode === 'staff' ? 'bg-white/15 shadow-[0_0_10px_rgba(255,255,255,0.1)] text-white' : 'text-white/50 hover:text-white/80'}`}
            onClick={() => setViewMode('staff')}
          >
            Staff Command
          </button>
          <button 
            className={`px-4 py-2 ml-1 rounded-md text-sm font-semibold transition-all ${viewMode === 'highlights' ? 'bg-[#00ffcc]/20 text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.3)] border border-[#00ffcc]/50' : 'text-[#00ffcc]/60 hover:text-[#00ffcc]'}`}
            onClick={() => setViewMode('highlights')}
          >
            Highlights ✨
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center w-full">
        {viewMode === 'staff' ? (
          <StaffDashboard occupancyMap={occupancyMap} predictions={predictions} alerts={alerts} />
        ) : viewMode === 'attendee' ? (
          <div className="w-full max-w-[375px] mx-auto text-center text-white/50 border-[6px] border-[#222] rounded-[40px] h-[750px] bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative mt-4 transform origin-top md:hover:scale-[1.02] transition-transform">
            <MobileView occupancyMap={occupancyMap} alerts={alerts} />
          </div>
        ) : (
          <HighlightsReel />
        )}
      </main>
    </div>
  );
}

export default App;
