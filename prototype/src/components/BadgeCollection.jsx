import React, { useState } from 'react';

const BADGE_DATA = [
  {
    id: 'district_explorer',
    icon: '🏛️',
    name: 'District Explorer',
    desc: 'Visit all 5 venue districts in one event',
    rarity: 'rare',
    status: 'unlocked',
    reward: '5% off next event'
  },
  {
    id: 'flash_warrior',
    icon: '⚡',
    name: 'Flash Warrior',
    desc: 'Attend 3 Flash Bazaar pop-ups',
    rarity: 'epic',
    status: 'unlocked',
    reward: 'VIP Reserved Parking'
  },
  {
    id: 'vendor_veteran',
    icon: '🎪',
    name: 'Vendor Veteran',
    desc: 'Try food from 5 different stands',
    rarity: 'common',
    status: 'progress',
    progress: 3,
    total: 5
  },
  {
    id: 'collective_hero',
    icon: '🌟',
    name: 'Collective Hero',
    desc: 'Take 3 overflow routes to reduce bottlenecks',
    rarity: 'legendary',
    status: 'progress',
    progress: 1,
    total: 3
  }
];

const RARITY_COLORS = {
  common: 'from-gray-400 to-gray-600 border-gray-400/30 text-gray-300',
  rare: 'from-blue-400 to-indigo-600 border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(96,165,250,0.2)]',
  epic: 'from-purple-400 to-pink-600 border-purple-400/50 text-purple-300 shadow-[0_0_20px_rgba(192,132,252,0.3)]',
  legendary: 'from-yellow-300 via-yellow-500 to-orange-500 border-yellow-400/50 text-yellow-300 shadow-[0_0_25px_rgba(253,224,71,0.4)] animate-[pulse_3s_ease-in-out_infinite]'
};

export function BadgeCollection() {
  const [redeemModal, setRedeemModal] = useState(null);

  const unlocked = BADGE_DATA.filter(b => b.status === 'unlocked');
  const inProgress = BADGE_DATA.filter(b => b.status === 'progress');

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto w-full pb-20">
      
      <div className="mb-6 flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Digital Badges</h2>
           <p className="text-xs text-[var(--path-glow)] mt-1 font-mono">Cryptographically verified</p>
        </div>
        <div className="text-xl font-bold">2<span className="text-white/40 text-sm">/14</span></div>
      </div>

      {/* Unlocked Badges */}
      <h3 className="text-sm font-bold text-white/50 mb-3 tracking-widest uppercase">Unlocked Rewards</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {unlocked.map(badge => (
          <button 
            key={badge.id}
            onClick={() => setRedeemModal(badge)}
            className={`relative overflow-hidden rounded-2xl border bg-black/40 backdrop-blur-md p-4 text-left flex flex-col hover:scale-[1.02] transition-transform ${RARITY_COLORS[badge.rarity]}`}
          >
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="text-3xl mb-2 z-10 drop-shadow-md">{badge.icon}</div>
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 z-10`}>{badge.rarity}</div>
            <div className="font-bold text-sm text-white mb-1 leading-tight z-10">{badge.name}</div>
            <div className="text-[10px] text-white/50 mt-1 whitespace-nowrap text-ellipsis overflow-hidden z-10">Reward Available</div>
            
            {/* Glow sweep effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]"></div>
          </button>
        ))}
      </div>

      {/* In-Progress Badges */}
      <h3 className="text-sm font-bold text-white/50 mb-3 tracking-widest uppercase">In Progress</h3>
      <div className="space-y-4">
        {inProgress.map(badge => (
          <div key={badge.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-4 hidden-overflow">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full border border-dashed text-2xl opacity-50 ${RARITY_COLORS[badge.rarity]}`}>
              {badge.icon}
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-center mb-1">
                 <div className="font-bold text-white/90 text-sm">{badge.name}</div>
                 <div className="text-[10px] tracking-wider text-white/50 font-mono">{badge.progress} / {badge.total}</div>
               </div>
               <p className="text-[10px] text-white/40 mb-2 leading-snug">{badge.desc}</p>
               {/* Progress bar */}
               <div className="w-full bg-black h-1.5 rounded-full overflow-hidden border border-white/5">
                 <div 
                   className="h-full bg-gradient-to-r from-[var(--path-glow)] to-blue-400" 
                   style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                 ></div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Redemption Modal */}
      {redeemModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 animate-[fade-in_0.2s]">
          <div className={`w-full max-w-sm rounded-[2rem] border bg-black/80 p-8 text-center relative overflow-hidden ${RARITY_COLORS[redeemModal.rarity]}`}>
             {/* Background glow blob */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-current opacity-20 blur-[30px] rounded-full"></div>
             
             <div className="text-6xl mb-4 relative z-10 animate-[float_3s_ease-in-out_infinite]">{redeemModal.icon}</div>
             <h2 className="text-2xl font-bold text-white mb-2">{redeemModal.name}</h2>
             <p className="text-white/60 text-sm mb-6 pb-6 border-b border-white/10 leading-relaxed">{redeemModal.desc}</p>
             
             <div className="mb-8">
               <div className="text-[10px] text-white/40 tracking-widest font-mono uppercase mb-2">Available Reward</div>
               <div className="font-extrabold text-lg text-white bg-white/5 py-3 rounded-xl border border-white/10">{redeemModal.reward}</div>
             </div>

             <div className="space-y-3">
               <button className="w-full bg-white text-black font-extrabold py-3.5 rounded-xl transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  REDEEM NOW
               </button>
               <button 
                 onClick={() => setRedeemModal(null)}
                 className="w-full text-white/50 font-bold py-3 hover:text-white transition-colors text-xs tracking-widest uppercase"
               >
                  Save for later
               </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
