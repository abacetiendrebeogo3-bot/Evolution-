'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { Users, UserPlus, Heart, MessageCircle } from 'lucide-react';

export default function RelationsPage() {
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
                <Users className="w-5 h-5 text-gold-400" />
                Relations Sociales & Réseau
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Entretiens tes liens clés avec intention et régularité.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-background font-semibold text-xs transition-colors">
              <UserPlus className="w-4 h-4 stroke-[3]" />
              Ajouter une relation
            </button>
          </div>

          {/* Weekly Goal Card */}
          <div className="bg-card border border-card-border p-5 rounded-2xl glow-card mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Heart className="w-6 h-6 fill-gold-500/20" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Objectif hebdomadaire</h3>
                <p className="text-xs text-gray-400">2 sur 3 relations entretenues cette semaine</p>
              </div>
            </div>
            <div className="w-full md:w-48 bg-gray-800 rounded-full h-2">
              <div className="bg-gold-500 h-2 rounded-full w-2/3" />
            </div>
          </div>

          {/* Mock Relations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Alexandre M.', type: 'Partenaire Business', last: 'Il y a 2 jours' },
              { name: 'Maman', type: 'Famille', last: 'Hier' },
              { name: 'David K.', type: 'Ami proche', last: 'Il y a 5 jours' },
            ].map((rel, idx) => (
              <div key={idx} className="bg-card border border-card-border p-4 rounded-2xl glow-card flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm">{rel.name}</h4>
                  <span className="text-xs text-gray-400 block">{rel.type}</span>
                  <span className="text-[10px] text-gold-400 font-mono mt-1 block">Dernier contact : {rel.last}</span>
                </div>
                <button className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
