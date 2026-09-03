'use client';

import React from 'react';
import { Activity, Wind, Briefcase, Users, Target } from 'lucide-react';
import { PillarStats, Pillar } from '../../types/habit';

interface PillarsOverviewProps {
  pillars: PillarStats[];
}

export const PillarsOverview: React.FC<PillarsOverviewProps> = ({ pillars }) => {
  const getPillarIcon = (pillar: Pillar) => {
    switch (pillar) {
      case 'corps':
        return <Activity className="w-4 h-4 text-emerald-400" />;
      case 'esprit':
        return <Wind className="w-4 h-4 text-purple-400" />;
      case 'travail':
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case 'relations':
        return <Users className="w-4 h-4 text-rose-400" />;
      default:
        return <Target className="w-4 h-4 text-gold-400" />;
    }
  };

  const getPillarColor = (pillar: Pillar) => {
    switch (pillar) {
      case 'corps':
        return 'bg-emerald-500';
      case 'esprit':
        return 'bg-purple-500';
      case 'travail':
        return 'bg-blue-500';
      case 'relations':
        return 'bg-rose-500';
      default:
        return 'bg-gold-500';
    }
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 glow-card">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-card-border/60">
        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase font-mono flex items-center gap-2">
          <Target className="w-4 h-4 text-gold-400" />
          LES 4 PILIERS DE VIE
        </span>
        <span className="text-[10px] font-mono text-gold-400/80">Équilibre quotidien</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {pillars.map((item) => (
          <div
            key={item.pillar}
            className="p-3 bg-gray-900/60 rounded-xl border border-card-border/60 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                {getPillarIcon(item.pillar)}
                <span className="text-xs font-bold font-mono text-white">
                  {item.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">
                {item.completedCount}/{item.totalCount}
              </span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden mt-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${getPillarColor(
                  item.pillar
                )}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
