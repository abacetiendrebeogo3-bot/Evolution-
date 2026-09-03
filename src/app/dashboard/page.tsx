'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { NextActionCard } from '../../components/dashboard/NextActionCard';
import { PillarsOverview } from '../../components/dashboard/PillarsOverview';
import { StatCard } from '../../components/dashboard/StatCard';
import { RoutineCard } from '../../components/dashboard/RoutineCard';
import { QuoteBanner } from '../../components/dashboard/QuoteBanner';
import {
  INITIAL_ROUTINES,
  INITIAL_USER_STATS,
  INITIAL_PILLAR_STATS,
  DAILY_QUOTE,
} from '../../mock/data';
import { HabitStatus, Routine, Habit } from '../../types/habit';

export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>(INITIAL_ROUTINES);
  const [stats, setStats] = useState(INITIAL_USER_STATS);
  const [pillarStats, setPillarStats] = useState(INITIAL_PILLAR_STATS);

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
              completedAt:
                newStatus === 'done' || newStatus === 'minimum_mode'
                  ? new Date().toISOString()
                  : undefined,
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

      // Recalculate Pillar Stats dynamically
      setPillarStats((prevPillars) =>
        prevPillars.map((p) => {
          const pillarHabits = allHabits.filter((h) => h.pillar === p.pillar);
          const pillarTotal = pillarHabits.length;
          const pillarDone = pillarHabits.filter(
            (h) => h.status === 'done' || h.status === 'minimum_mode'
          ).length;
          return {
            ...p,
            totalCount: pillarTotal || p.totalCount,
            completedCount: pillarDone,
            percentage: pillarTotal > 0 ? Math.round((pillarDone / pillarTotal) * 100) : 0,
          };
        })
      );

      return updatedRoutines;
    });
  };

  // Find the next upcoming uncompleted habit for the NEXT ACTION Hero Card
  const allHabits = routines.flatMap((r) => r.habits);
  const nextActionHabit: Habit | undefined =
    allHabits.find((h) => h.status === 'todo') || allHabits.find((h) => h.status === 'minimum_mode');

  return (
    <div className="min-h-screen bg-background text-gray-100 flex font-sans bg-noise">
      {/* Sidebar */}
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Header */}
          <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

          {/* 1. HERO SECTION: PROCHAINE ACTION ("Qu'est-ce que je dois faire maintenant ?") */}
          <NextActionCard
            habit={nextActionHabit}
            onStatusChange={handleStatusChange}
          />

          {/* 2. LES 4 PILIERS DE VIE (Équilibre Quotidien) */}
          <PillarsOverview pillars={pillarStats} />

          {/* 3. 4 STATS CARDS GRID */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard type="current_streak" value={stats.currentStreak} />
            <StatCard type="best_streak" value={stats.bestStreak} />
            <StatCard type="success_rate" value={stats.weeklySuccessRate} />
            <StatCard
              type="completed_today"
              value={stats.completedTodayCount}
              total={stats.totalHabitsCount}
            />
          </section>

          {/* 4. 3 ROUTINES GRID (Matin, Midi, Soir) */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onStatusChange={handleStatusChange}
              />
            ))}
          </section>

          {/* 5. BOTTOM QUOTE BANNER */}
          <section>
            <QuoteBanner quote={DAILY_QUOTE} />
          </section>
        </main>
      </div>
    </div>
  );
}
