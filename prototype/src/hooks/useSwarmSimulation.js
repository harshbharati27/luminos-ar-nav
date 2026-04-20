import { useState, useEffect } from 'react';
import { VENUE_ZONES } from '../data/venue';

// Simulates the Swarm Intelligence / Biomimetic Crowd Model
export function useSwarmSimulation() {
  const [occupancyMap, setOccupancyMap] = useState({});
  const [predictions, setPredictions] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Initial state
    const current = {};
    const preds = {};
    VENUE_ZONES.forEach(zone => {
      current[zone.id] = zone.baseDensity;
      preds[zone.id] = zone.baseDensity;
    });
    setOccupancyMap(current);
    setPredictions(preds);

    // Simulation Loop: every 3 seconds, mock new density flows
    const interval = setInterval(() => {
      setOccupancyMap(prev => {
        const next = { ...prev };
        const nextPreds = {};
        const newAlerts = [];

        VENUE_ZONES.forEach(zone => {
          // Add some organic noise (Swarm particles moving)
          const fluctuation = (Math.random() - 0.5) * 0.15;
          let newDensity = Math.max(0.05, Math.min(0.95, next[zone.id] + fluctuation));
          
          // Specific rule: if Radiant gets too packed, it bursts into Flash
          if (zone.id === 'radiant' && newDensity > 0.8) {
            newAlerts.push({
              id: Date.now(),
              type: 'capacity_warning',
              message: `Bottleneck forming at ${zone.name}. Flash Bazaar pop-up triggered to divert 15% traffic.`
            });
            newDensity -= 0.15; // crowd leaves radiant
            next['flash'] = Math.min(0.95, (next['flash'] || 0) + 0.15); // moves to flash
          }

          next[zone.id] = newDensity;
          
          // Kinetic Prediction Engine (+10min prediction)
          nextPreds[zone.id] = Math.max(0.05, Math.min(0.95, newDensity + (fluctuation * 1.5)));
        });

        // Add fun alerts randomly or based on simulation
        if (next['whisper'] > 0.6 && Math.random() > 0.7) {
          newAlerts.push({
            id: Date.now(),
            type: 'flow_alert',
            message: `Premium dining area filling. Suggesting early departure / micro-moment offers to attendees.`
          });
        }

        setPredictions(nextPreds);
        // Only keep last 3 alerts
        setAlerts(currAlerts => [...newAlerts, ...currAlerts].slice(0, 3));
        
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { occupancyMap, predictions, alerts };
}
