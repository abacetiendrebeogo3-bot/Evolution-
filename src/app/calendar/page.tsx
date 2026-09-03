'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Generate 31 days heatmap mock data
  const days = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    let successRate = Math.floor(Math.random() * 40) + 60;
    if (dayNum === 14 || dayNum === 21) successRate = 100;
    if (dayNum === 5 || dayNum === 18) successRate = 40;
    return { dayNum, successRate };
  });

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
                <CalendarIcon className="w-5 h-5 text-gold-400" />
                Heatmap Mensuelle
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Visualise la consistance de tes habitudes au fil des jours.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-card border border-card-border text-gray-300 hover:text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-mono font-semibold px-3">Mai 2026</span>
              <button className="p-2 rounded-xl bg-card border border-card-border text-gray-300 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Heatmap Grid */}
          <div className="bg-card border border-card-border rounded-2xl p-6 glow-card">
            <div className="grid grid-cols-7 gap-3 mb-4 text-center font-mono text-xs text-gray-400">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>

            <div className="grid grid-cols-7 gap-3">
              {days.map((d) => {
                let bgClass = 'bg-gray-800/40 text-gray-400';
                if (d.successRate >= 90) bgClass = 'bg-status-done text-background font-bold shadow-sm';
                else if (d.successRate >= 70) bgClass = 'bg-gold-500/80 text-background font-bold';
                else if (d.successRate >= 50) bgClass = 'bg-status-minimum/40 text-blue-200 border border-status-minimum/40';

                return (
                  <div
                    key={d.dayNum}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer transition-all hover:scale-105 ${bgClass}`}
                  >
                    <span className="text-sm">{d.dayNum}</span>
                    <span className="text-[10px] opacity-80">{d.successRate}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
