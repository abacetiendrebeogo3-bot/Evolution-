import React from 'react';
import { Flame, Trophy, CheckCircle2 } from 'lucide-react';
import { StreakSparkline } from './StreakSparkline';
import { CircularProgress } from './CircularProgress';

interface StatCardProps {
  type: 'current_streak' | 'best_streak' | 'success_rate' | 'completed_today';
  value: number;
  total?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ type, value, total = 16 }) => {
  if (type === 'current_streak') {
    return (
      <div className="bg-card border border-card-border rounded-2xl p-5 glow-card flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase font-mono">
            SÉRIE ACTUELLE
          </span>
          <div className="w-8 h-8 rounded-lg bg-flame-500/10 border border-flame-500/20 flex items-center justify-center text-flame-500">
            <Flame className="w-4 h-4 text-flame-500 fill-flame-500/20" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-sans text-white tracking-tight">
              {value}
            </span>
            <span className="text-sm font-medium text-gray-400">jours</span>
          </div>
        </div>

        <StreakSparkline color="#E8634A" height={32} />
      </div>
    );
  }

  if (type === 'best_streak') {
    return (
      <div className="bg-card border border-card-border rounded-2xl p-5 glow-card flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase font-mono">
            MEILLEURE SÉRIE
          </span>
          <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
            <Trophy className="w-4 h-4 text-gold-400" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-sans text-white tracking-tight">
              {value}
            </span>
            <span className="text-sm font-medium text-gray-400">jours</span>
          </div>
        </div>

        <StreakSparkline color="#D4A843" height={32} />
      </div>
    );
  }

  if (type === 'success_rate') {
    return (
      <div className="bg-card border border-card-border rounded-2xl p-5 glow-card flex flex-col justify-between">
        <div className="text-xs font-semibold tracking-wider text-gray-400 uppercase font-mono mb-3">
          TAUX DE RÉUSSITE
        </div>
        <div className="flex-1 flex items-center py-1">
          <CircularProgress percentage={value} size={68} subtitle="cette semaine" />
        </div>
      </div>
    );
  }

  // completed_today
  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 glow-card flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase font-mono">
          HABITUDES COMPLÉTÉES
        </span>
        <div className="w-8 h-8 rounded-lg bg-status-done/10 border border-status-done/20 flex items-center justify-center text-status-done">
          <CheckCircle2 className="w-4 h-4 text-status-done" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-sans text-white tracking-tight">
            {value}
          </span>
          <span className="text-sm font-medium text-gray-400">/ {total} aujourd'hui</span>
        </div>

        {/* Progress line */}
        <div className="w-full bg-gray-800/80 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className="bg-status-done h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.round((value / total) * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
