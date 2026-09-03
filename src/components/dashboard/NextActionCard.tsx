'use client';

import React from 'react';
import {
  Clock,
  Sparkles,
  Zap,
  Check,
  Flame,
  ArrowRight,
  Target,
  Activity,
  Wind,
  Briefcase,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { Habit, HabitStatus, Pillar } from '../../types/habit';

interface NextActionCardProps {
  habit?: Habit;
  onStatusChange: (habitId: string, status: HabitStatus) => void;
}

export const NextActionCard: React.FC<NextActionCardProps> = ({
  habit,
  onStatusChange,
}) => {
  if (!habit) {
    return (
      <div className="bg-card border border-card-border rounded-3xl p-6 glow-card mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-status-done/10 border border-status-done/30 flex items-center justify-center text-status-done">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Toutes les actions du moment sont terminées !</h3>
            <p className="text-xs text-gray-400 mt-0.5">Excellente discipline. Continue de maintenir ton rythme.</p>
          </div>
        </div>
      </div>
    );
  }

  const renderPillarBadge = (pillar?: Pillar) => {
    switch (pillar) {
      case 'corps':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Activity className="w-3 h-3" /> CORPS
          </span>
        );
      case 'esprit':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <Wind className="w-3 h-3" /> ESPRIT
          </span>
        );
      case 'travail':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <Briefcase className="w-3 h-3" /> TRAVAIL
          </span>
        );
      case 'relations':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
            <Users className="w-3 h-3" /> RELATIONS
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center gap-1">
            <Target className="w-3 h-3" /> DISCIPLINE
          </span>
        );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-r from-card via-[#161622] to-card p-6 sm:p-7 shadow-amber-glow glow-card mb-8">
      {/* Background Subtle Accent Aura */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Action Details */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              PROCHAINE ACTION
            </span>
            {renderPillarBadge(habit.pillar)}
            {habit.scheduledTime && (
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1 bg-gray-900/80 px-2.5 py-1 rounded-lg border border-gray-800">
                <Clock className="w-3 h-3 text-gold-400" />
                {habit.scheduledTime}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight flex items-center gap-2">
              {habit.name}
            </h2>
            {habit.why && (
              <p className="text-xs sm:text-sm text-gray-300 font-serif italic mt-1.5 leading-relaxed bg-black/20 p-2.5 rounded-xl border border-white/5">
                « {habit.why} »
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
            {habit.streakCount > 0 && (
              <span className="flex items-center gap-1 text-flame-500 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-flame-500/20" />
                {habit.streakCount} jours de constance
              </span>
            )}
            {habit.minimumModeLabel && (
              <span className="text-status-minimum flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Mode Min : {habit.minimumModeLabel}
              </span>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3.5 flex-shrink-0 self-stretch sm:self-auto justify-center">
          {/* Main Done Button */}
          <button
            onClick={() => onStatusChange(habit.id, 'done')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-600 text-background font-bold text-sm transition-all shadow-amber-glow active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Fait (Complet)</span>
          </button>

          {/* Minimum Mode Button */}
          <button
            onClick={() => onStatusChange(habit.id, 'minimum_mode')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-status-minimum/15 hover:bg-status-minimum/25 border border-status-minimum/40 text-status-minimum font-semibold text-xs transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Mode Minimum</span>
          </button>
        </div>
      </div>
    </div>
  );
};
