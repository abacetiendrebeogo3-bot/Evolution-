'use client';

import React from 'react';
import { SunDim, Sun, Moon } from 'lucide-react';
import { Routine, HabitStatus } from '../../types/habit';
import { HabitItem } from './HabitItem';

interface RoutineCardProps {
  routine: Routine;
  onStatusChange: (habitId: string, newStatus: HabitStatus) => void;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onStatusChange }) => {
  const completedCount = routine.habits.filter(
    (h) => h.status === 'done' || h.status === 'minimum_mode'
  ).length;
  const totalCount = routine.habits.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const renderRoutineIcon = () => {
    switch (routine.moment) {
      case 'matin':
        return <SunDim className="w-5 h-5 text-gold-500" />;
      case 'midi':
        return <Sun className="w-5 h-5 text-gold-400" />;
      case 'soir':
        return <Moon className="w-5 h-5 text-indigo-300" />;
      default:
        return <SunDim className="w-5 h-5 text-gold-500" />;
    }
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 glow-card flex flex-col justify-between h-full">
      <div>
        {/* Routine Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-card-border/60">
          <div className="p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
            {renderRoutineIcon()}
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-white flex items-center gap-2">
              {routine.name}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{routine.subtitle}</p>
          </div>
        </div>

        {/* Habits Checklist */}
        <div className="space-y-1 my-2">
          {routine.habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="mt-6 pt-4 border-t border-card-border/60">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-mono">
          <span>
            {completedCount} / {totalCount} complétées
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-gray-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gold-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
