'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { Plus, CheckSquare, Sparkles, Activity, Wind, Briefcase, Users, Target, Zap } from 'lucide-react';
import { INITIAL_ROUTINES } from '../../mock/data';
import { HabitFormModal } from '../../components/habits/HabitFormModal';
import { Pillar } from '../../types/habit';

export default function HabitsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const habits = INITIAL_ROUTINES.flatMap((r) => r.habits);

  const renderPillarBadge = (pillar?: Pillar) => {
    switch (pillar) {
      case 'corps':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Activity className="w-3 h-3" /> CORPS
          </span>
        );
      case 'esprit':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <Wind className="w-3 h-3" /> ESPRIT
          </span>
        );
      case 'travail':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <Briefcase className="w-3 h-3" /> TRAVAIL
          </span>
        );
      case 'relations':
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
            <Users className="w-3 h-3" /> RELATIONS
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center gap-1">
            <Target className="w-3 h-3" /> DISCIPLINE
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 flex font-sans bg-noise">
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-gold-400" />
                Mes Habitudes (16)
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Gère tes intentions profondes, piliers de vie et modes minimum.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-background font-semibold text-xs transition-colors shadow-amber-glow"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Nouvelle Habitude
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="bg-card border border-card-border rounded-2xl p-5 glow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    {renderPillarBadge(habit.pillar)}
                    <span className="text-xs font-mono text-flame-500 font-medium">
                      🔥 {habit.streakCount}j streak
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-1">
                    {habit.name}
                  </h3>

                  {habit.why && (
                    <p className="text-xs text-gray-300 font-serif italic mt-1 bg-black/20 p-2 rounded-lg border border-white/5">
                      « {habit.why} »
                    </p>
                  )}

                  {habit.minimumModeLabel && (
                    <div className="flex items-center gap-1.5 text-xs text-status-minimum mt-3 bg-status-minimum/10 p-2 rounded-lg border border-status-minimum/20 font-mono">
                      <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Mode Min : {habit.minimumModeLabel}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono">Routine : {habit.moment.toUpperCase()} ({habit.scheduledTime})</span>
                  <span className="text-gold-400 hover:underline cursor-pointer">
                    Éditer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <HabitFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
