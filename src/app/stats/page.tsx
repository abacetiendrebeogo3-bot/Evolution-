'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { BarChart3, TrendingUp, Award, Flame } from 'lucide-react';

export default function StatsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-gray-100 flex font-sans bg-noise">
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

          <div className="mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold-400" />
              Statistiques & Progression
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Analyses de tes séries, corrélations et taux de complétion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-card-border p-5 rounded-2xl glow-card">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-2">
                <TrendingUp className="w-4 h-4 text-status-done" />
                Taux moyen mensuel
              </div>
              <span className="text-3xl font-bold text-white">84%</span>
            </div>

            <div className="bg-card border border-card-border p-5 rounded-2xl glow-card">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-2">
                <Flame className="w-4 h-4 text-flame-500" />
                Série record
              </div>
              <span className="text-3xl font-bold text-white">27 jours</span>
            </div>

            <div className="bg-card border border-card-border p-5 rounded-2xl glow-card">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-2">
                <Award className="w-4 h-4 text-gold-400" />
                Niveau de discipline
              </div>
              <span className="text-3xl font-bold text-gold-400">Niveau 3</span>
              <span className="text-xs text-gray-400 block mt-1">Discipliné (580 pts)</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
