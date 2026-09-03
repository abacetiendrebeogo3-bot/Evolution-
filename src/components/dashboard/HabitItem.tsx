'use client';

import React, { useState } from 'react';
import {
  Check,
  Zap,
  Circle,
  XCircle,
  ShieldAlert,
  Flame,
  Clock,
  Droplet,
  Activity,
  Home,
  ShowerHead,
  UserCheck,
  ListTodo,
  BookOpen,
  Utensils,
  Users,
  Briefcase,
  Footprints,
  Accessibility,
  Wind,
  BookMarked,
  Tv,
  MoonStar,
  MoreHorizontal,
} from 'lucide-react';
import { Habit, HabitStatus } from '../../types/habit';

interface HabitItemProps {
  habit: Habit;
  onStatusChange: (habitId: string, newStatus: HabitStatus) => void;
}

// Icon helper function
const renderIcon = (iconName?: string) => {
  const className = "w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors";
  switch (iconName) {
    case 'Droplet': return <Droplet className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Home': return <Home className={className} />;
    case 'ShowerHead': return <ShowerHead className={className} />;
    case 'UserCheck': return <UserCheck className={className} />;
    case 'ListTodo': return <ListTodo className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Footprints': return <Footprints className={className} />;
    case 'Accessibility': return <Accessibility className={className} />;
    case 'Wind': return <Wind className={className} />;
    case 'BookMarked': return <BookMarked className={className} />;
    case 'Tv': return <Tv className={className} />;
    case 'MoonStar': return <MoonStar className={className} />;
    default: return <Circle className={className} />;
  }
};

export const HabitItem: React.FC<HabitItemProps> = ({ habit, onStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  // Cycle status on direct circle click: todo -> done -> minimum_mode -> todo
  const handleQuickToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (habit.status === 'todo') {
      onStatusChange(habit.id, 'done');
    } else if (habit.status === 'done') {
      onStatusChange(habit.id, 'minimum_mode');
    } else {
      onStatusChange(habit.id, 'todo');
    }
  };

  const handleSelectStatus = (status: HabitStatus) => {
    onStatusChange(habit.id, status);
    setShowMenu(false);
  };

  return (
    <div className="relative group flex items-center justify-between p-3 rounded-xl hover:bg-card-hover/80 transition-all border border-transparent hover:border-card-border/60">
      <div className="flex items-center gap-3 min-w-0">
        {/* Status Checkbox Button */}
        <button
          onClick={handleQuickToggle}
          type="button"
          title="Cliquer pour changer rapidement d'état"
          className="relative flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-transform active:scale-95 focus:outline-none"
        >
          {habit.status === 'done' && (
            <div className="w-7 h-7 rounded-full bg-status-done text-background flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          )}

          {habit.status === 'minimum_mode' && (
            <div className="w-7 h-7 rounded-full bg-status-minimum text-white flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 fill-white" />
            </div>
          )}

          {habit.status === 'missed' && (
            <div className="w-7 h-7 rounded-full bg-slate-700/80 border border-slate-600 text-slate-300 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          )}

          {habit.status === 'excused' && (
            <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          )}

          {habit.status === 'todo' && (
            <div className="w-7 h-7 rounded-full border-2 border-gray-600 group-hover:border-gray-400 transition-colors flex items-center justify-center" />
          )}
        </button>

        {/* Habit Icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-800/40 border border-gray-800 flex items-center justify-center">
          {renderIcon(habit.iconName)}
        </div>

        {/* Habit Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium transition-colors truncate ${
                habit.status === 'done'
                  ? 'text-gray-300 line-through opacity-80'
                  : habit.status === 'minimum_mode'
                  ? 'text-status-minimum font-semibold'
                  : 'text-gray-100'
              }`}
            >
              {habit.name}
            </span>

            {/* Minimum Mode Label Badge */}
            {habit.status === 'minimum_mode' && (
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-status-minimum/15 text-status-minimum border border-status-minimum/30 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" />
                {habit.minimumModeLabel || 'Mode min.'}
              </span>
            )}

            {/* Non-punitive Missed Badge */}
            {habit.status === 'missed' && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Manqué (toléré)
              </span>
            )}
          </div>

          {/* Subtitle / Time */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
            {habit.scheduledTime && (
              <span className="font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                {habit.scheduledTime}
              </span>
            )}
            {habit.streakCount > 0 && (
              <span className="font-mono text-flame-500/90 flex items-center gap-0.5">
                <Flame className="w-3 h-3 fill-flame-500/20" />
                {habit.streakCount}j
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right side Menu trigger */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-all"
          title="Changer le statut de l'habitude"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>

        {/* Dropdown status selector */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-8 z-20 w-48 bg-card border border-card-border rounded-xl shadow-2xl p-1 text-xs backdrop-blur-md">
              <button
                onClick={() => handleSelectStatus('done')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-status-done/15 text-status-done flex items-center gap-2 font-medium"
              >
                <Check className="w-3.5 h-3.5" />
                Fait (Complet)
              </button>
              <button
                onClick={() => handleSelectStatus('minimum_mode')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-status-minimum/15 text-status-minimum flex items-center gap-2 font-medium"
              >
                <Zap className="w-3.5 h-3.5" />
                Mode Minimum
              </button>
              <button
                onClick={() => handleSelectStatus('todo')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 flex items-center gap-2"
              >
                <Circle className="w-3.5 h-3.5 text-gray-400" />
                À faire
              </button>
              <button
                onClick={() => handleSelectStatus('missed')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400 flex items-center gap-2"
              >
                <XCircle className="w-3.5 h-3.5" />
                Manqué (toléré)
              </button>
              <button
                onClick={() => handleSelectStatus('excused')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gold-500/10 text-gold-400 flex items-center gap-2"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Excusé (Repos)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
