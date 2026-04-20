import React from 'react';

export function HighlightsReel() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 animate-[fade-in_0.5s_ease-out]">
      <div className="text-center py-12">
         <h1 className="text-6xl font-extrabold tracking-tighter mb-4 text-white">Event Impact <span className="text-[var(--path-glow)]">Highlights</span></h1>
         <p className="text-xl text-white/50 max-w-2xl mx-auto">The Antigravity system dynamically routed attendees to prevent bottlenecks, generating a measurable impact on both experience and operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-panel p-8 text-center flex flex-col items-center justify-center transform hover:scale-[1.02] transition-transform">
            <div className="text-5xl mb-4 text-white">🚶</div>
            <div className="text-4xl font-extrabold text-[var(--path-glow)] mb-2">1,240</div>
            <div className="text-white/80 font-bold tracking-wide">Attendees Routed</div>
            <div className="text-sm text-white/50 mt-2">Engaged with smart pathing</div>
         </div>
         
         <div className="glass-panel p-8 text-center flex flex-col items-center justify-center bg-gradient-to-b from-[var(--path-glow)]/10 to-transparent transform hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(0,255,204,0.1)] border-[var(--path-glow)]/30">
            <div className="text-5xl mb-4 text-white">⏱️</div>
            <div className="text-4xl font-extrabold text-white mb-2">34,000</div>
            <div className="text-[var(--path-glow)] font-bold tracking-wide">Minutes Saved</div>
            <div className="text-sm text-white/50 mt-2">Total collective wait reduction</div>
         </div>

         <div className="glass-panel p-8 text-center flex flex-col items-center justify-center transform hover:scale-[1.02] transition-transform">
            <div className="text-5xl mb-4 text-white">📈</div>
            <div className="text-4xl font-extrabold text-[#f5a623] mb-2">+28%</div>
            <div className="text-white/80 font-bold tracking-wide">Concession Sales</div>
            <div className="text-sm text-white/50 mt-2">Driven by micro-moment routing</div>
         </div>
      </div>

      <div className="flex gap-6 mt-4">
         <div className="flex-1 glass-panel p-8 border border-white/10 text-left">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><span className="text-2xl">👥</span> Staff Efficiency Gains</h3>
            <ul className="space-y-4">
               <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mt-0.5 flex-shrink-0 font-bold">✓</div>
                  <div>
                    <div className="font-bold text-lg text-white/90">Proactive Deployment</div>
                    <div className="text-white/60">Automated alerts resolved 14 bottlenecks before they formed.</div>
                  </div>
               </li>
               <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mt-0.5 flex-shrink-0 font-bold">✓</div>
                  <div>
                    <div className="font-bold text-lg text-white/90">Evacuation Clearance</div>
                    <div className="text-white/60">Swarm simulation guided crowds to exits 15% faster than baseline.</div>
                  </div>
               </li>
               <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mt-0.5 flex-shrink-0 font-bold">✓</div>
                  <div>
                    <div className="font-bold text-lg text-white/90">-12% Operational Cost</div>
                    <div className="text-white/60">Strategic staff allocation reduced need for static ushers.</div>
                  </div>
               </li>
            </ul>
         </div>

         <div className="flex-1 glass-panel p-8 flex flex-col justify-center border border-[#00ffcc]/20 bg-gradient-to-r from-[var(--path-glow)]/5 to-transparent text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 text-9xl">🌟</div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white relative"><span className="text-2xl">🏆</span> Collective Flow Score</h3>
            <div className="flex items-end gap-3 mb-4 relative">
               <div className="text-7xl font-black text-[#00ffcc] tracking-tighter leading-none">78<span className="text-4xl text-white/40">/100</span></div>
               <div className="text-2xl mb-2">🟢</div>
            </div>
            <p className="text-white/60 text-lg leading-relaxed relative">This event's collective cooperation score was robust. By adopting routing adjustments, attendees proved that gamified guidance creates a globally superior experience.</p>
         </div>
      </div>

    </div>
  );
}
