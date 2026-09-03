'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { RotateCcw, Plus } from 'lucide-react';
import { INITIAL_ROUTINES } from '../../mock/data';

export default function RoutinesPage() {
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

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-gold-400" />
                Éditeur de Routines
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Organise la séquence de tes routines quotidienne.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-background font-semibold text-xs transition-colors">
              <Plus className="w-4 h-4 stroke-[3]" />
              Créer une routine
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {INITIAL_ROUTINES.map((routine) => (
              <div key={routine.id} className="bg-card border border-card-border rounded-2xl p-5 glow-card">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-card-border/60">
                  <h3 className="font-bold text-white font-mono uppercase text-sm">
                    {routine.name} ({routine.habits.length})
                  </h3>
                  <span className="text-xs text-gold-400 font-mono">Ordre manuel</span>
                </div>
                <div className="space-y-2">
                  {routine.habits.map((h, i) => (
                    <div key={h.id} className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 flex items-center justify-between text-xs">
                      <span className="font-mono text-gray-400">#{i + 1}</span>
                      <span className="text-gray-200 font-medium">{h.name}</span>
                      <span className="text-gray-500 font-mono">{h.scheduledTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
