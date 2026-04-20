// Mock data for the venue structure and zones
export const VENUE_ZONES = [
  {
    id: 'radiant',
    name: 'Radiant Concourse',
    vibe: 'high-energy',
    capacity: 2000,
    attractions: ['Quick Eats', 'Team Store'],
    baseDensity: 0.3,
    color: 'var(--zone-radiant)'
  },
  {
    id: 'whisper',
    name: 'Slow Whisper Halls',
    vibe: 'calm',
    capacity: 800,
    attractions: ['Lounge', 'Premium Dining'],
    baseDensity: 0.2,
    color: 'var(--zone-whisper)'
  },
  {
    id: 'flash',
    name: 'Flash Bazaar',
    vibe: 'dynamic',
    capacity: 500,
    attractions: ['Pop-up Merchants', 'Limited Drops'],
    baseDensity: 0.1, // often bursts
    color: 'var(--zone-flash)'
  },
  {
    id: 'silent',
    name: 'Silent Sanctum',
    vibe: 'recharge',
    capacity: 300,
    attractions: ['Meditation pods', 'Charging Stations'],
    baseDensity: 0.5,
    color: 'var(--zone-silent)'
  }
];

export const VIBE_OPTIONS = [
  { id: 'radiant', label: 'Radiant', desc: 'Get food fast, stay hype' },
  { id: 'whisper', label: 'Whisper', desc: 'Premium & relaxed' },
  { id: 'flash', label: 'Flash', desc: 'Discover surprises' },
  { id: 'silent', label: 'Silent', desc: 'Recharge & reset' }
];
