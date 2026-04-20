import React from 'react';
import { Map } from './Map';

export function StaffDashboard({ occupancyMap, predictions, alerts }) {
  // Compute overall flow stats
  const avgDensity = Object.values(occupancyMap).reduce((a, b) => a + b, 0) / Math.max(1, Object.keys(occupancyMap).length);
  const flowVelocity = "Accelerating (20% > baseline)";
  const energyLevel = avgDensity > 0.6 ? 'HIGH ENERGY 🔥' : 'STABLE 🟢';

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Left Column: Alerts & Venue Pulse */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        
        {/* Venue Pulse */}
        <div className="glass-panel p-6 text-left">
          <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
            <span>🏟️ Venue Pulse</span>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--path-glow)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--path-glow)]"></span>
            </span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-xs text-white/50 tracking-wider">ENERGY LEVEL</div>
              <div className="font-mono text-lg font-semibold">{energyLevel}</div>
            </div>
            <div>
              <div className="text-xs text-white/50 tracking-wider">FLOW VELOCITY</div>
              <div className="text-sm text-white/90">{flowVelocity}</div>
            </div>
            <div>
               <div className="text-xs text-white/50 tracking-wider mt-2 mb-1">AGGREGATED DENSITY</div>
               <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--path-glow)] transition-all duration-1000" style={{ width: `${avgDensity * 100}%` }}></div>
               </div>
            </div>
          </div>
        </div>

        {/* Pattern Recognition Alerts */}
        <div className="glass-panel p-6 text-left flex-1 border border-white/5 bg-red-900/10">
          <h2 className="text-lg font-bold mb-4 text-[var(--alert-red)]">Command Pattern Recognition</h2>
          <div className="space-y-4 flex flex-col">
            {alerts.slice(0, 4).map((alert, idx) => (
              <div key={idx} className="bg-black/40 p-3 rounded-lg border-l-2 border-[var(--alert-red)] text-sm shadow-md">
                <span className="font-bold block mb-1 text-white/90">Actionable Intelligence:</span>
                <span className="text-white/70">{alert.message}</span>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="text-white/40 text-sm italic font-mono">Simulating swarm intelligence vectors... no current anomalies.</div>
            )}
          </div>
        </div>

      </div>

      {/* Right Column: Predictive Map */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <div className="glass-panel p-1 rounded-xl h-[500px]">
          <Map occupancyMap={occupancyMap} mode="staff" />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] text-center font-mono flex items-center justify-center gap-2">
          <span>System continuously modeling {Object.keys(occupancyMap).length} zones via particle swarm algorithm.</span>
        </div>
      </div>
    </div>
  );
}
