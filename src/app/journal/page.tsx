'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { BookOpen, Send } from 'lucide-react';

export default function JournalPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-gray-100 flex font-sans bg-noise">
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
          <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

          <div className="mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold-400" />
              Journal de Réflexion du Soir
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Trois questions simples pour clore la journée en pleine conscience.
            </p>
          </div>

          <div className="bg-card border border-card-border p-6 rounded-2xl glow-card space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                1. Qu'est-ce qui s'est bien passé aujourd'hui ?
              </label>
              <textarea
                rows={3}
                placeholder="Une victoire, une satisfaction, une conversation..."
                className="w-full bg-gray-900/80 border border-card-border rounded-xl p-3 text-sm text-gray-100 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                2. Qu'aurais-tu pu mieux gérer ou optimiser ?
              </label>
              <textarea
                rows={3}
                placeholder="Une distraction, une réaction, un timing..."
                className="w-full bg-gray-900/80 border border-card-border rounded-xl p-3 text-sm text-gray-100 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                3. De quoi es-tu particulièrement fier aujourd'hui ?
              </label>
              <textarea
                rows={3}
                placeholder="Un effort maintenu, de la constance..."
                className="w-full bg-gray-900/80 border border-card-border rounded-xl p-3 text-sm text-gray-100 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>

            <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-background font-semibold text-sm transition-colors shadow-amber-glow">
              <Send className="w-4 h-4 stroke-[2.5]" />
              Enregistrer la réflexion
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
