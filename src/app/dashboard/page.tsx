'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { StatCard } from '../../components/dashboard/StatCard';
import { RoutineCard } from '../../components/dashboard/RoutineCard';
import { QuoteBanner } from '../../components/dashboard/QuoteBanner';
import {
  INITIAL_ROUTINES,
  INITIAL_USER_STATS,
  DAILY_QUOTE,
} from '../../mock/data';
import { HabitStatus, Routine } from '../../types/habit';

export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>(INITIAL_ROUTINES);
  const [stats, setStats] = useState(INITIAL_USER_STATS);

  // Recalculate stats dynamically based on routines state
  const handleStatusChange = (habitId: string, newStatus: HabitStatus) => {
    setRoutines((prevRoutines) => {
      const updatedRoutines = prevRoutines.map((routine) => ({
        ...routine,
        habits: routine.habits.map((habit) => {
          if (habit.id === habitId) {
            return {
              ...habit,
              status: newStatus,
              completedAt: newStatus === 'done' || newStatus === 'minimum_mode' ? new Date().toISOString() : undefined,
            };
          }
          return habit;
        }),
      }));

      // Calculate total habits & completed count
      const allHabits = updatedRoutines.flatMap((r) => r.habits);
      const totalCount = allHabits.length;
      const completedCount = allHabits.filter(
        (h) => h.status === 'done' || h.status === 'minimum_mode'
      ).length;

      // Calculate dynamic success rate percentage
      const rate = Math.round((completedCount / totalCount) * 100);

      setStats((prevStats) => ({
        ...prevStats,
        completedTodayCount: completedCount,
        totalHabitsCount: totalCount,
        weeklySuccessRate: Math.max(75, Math.min(98, 70 + Math.round(rate * 0.25))),
      }));

      return updatedRoutines;
    });
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 flex font-sans bg-noise">
      {/* Sidebar */}
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          {/* Top Header */}
          <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

          {/* 4 Stats Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard type="current_streak" value={stats.currentStreak} />
            <StatCard type="best_streak" value={stats.bestStreak} />
            <StatCard type="success_rate" value={stats.weeklySuccessRate} />
            <StatCard
              type="completed_today"
              value={stats.completedTodayCount}
              total={stats.totalHabitsCount}
            />
          </section>

          {/* 3 Routines Grid (Matin, Midi, Soir) */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onStatusChange={handleStatusChange}
              />
            ))}
          </section>

          {/* Bottom Quote Banner */}
          <section>
            <QuoteBanner quote={DAILY_QUOTE} />
          </section>
        </main>
      </div>
    </div>
  );
}
