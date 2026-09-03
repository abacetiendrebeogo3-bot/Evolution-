'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { Settings, Bell, Clock, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
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
              <Settings className="w-5 h-5 text-gold-400" />
              Paramètres & Préférences
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Fuseau horaire, notifications et paramètres de profil.
            </p>
          </div>

          <div className="space-y-4">
            {/* Timezone & Hours Settings */}
            <div className="bg-card border border-card-border p-6 rounded-2xl glow-card">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
                Fuseau Horaire & Horaires Clés
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1">Fuseau horaire</label>
                  <input
                    type="text"
                    defaultValue="Africa/Ouagadougou"
                    className="w-full bg-gray-900 border border-card-border rounded-xl p-2.5 text-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Heure de réveil cible</label>
                  <input
                    type="time"
                    defaultValue="06:00"
                    className="w-full bg-gray-900 border border-card-border rounded-xl p-2.5 text-gray-200 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-card border border-card-border p-6 rounded-2xl glow-card">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-gold-400" />
                Rappels & Notifications (Web Push)
              </h3>
              <div className="space-y-3 text-xs">
                {[
                  { label: 'Rappel Réveil (06:00)', desc: 'Message court pour entamer la routine du matin' },
                  { label: 'Pause Midi (12:30)', desc: 'Rappel lecture & déjeuner conscient' },
                  { label: 'Fin de Travail (18:00)', desc: 'Signale la clôture de la journée professionnelle' },
                  { label: 'Routine Soir (21:30)', desc: 'Encouragement à ralentir avant le coucher' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/60 rounded-xl border border-gray-800">
                    <div>
                      <span className="font-semibold text-white block">{item.label}</span>
                      <span className="text-gray-400 text-[11px]">{item.desc}</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-gold-500 rounded cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy & RLS */}
            <div className="bg-card border border-card-border p-6 rounded-2xl glow-card flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-status-done" />
                <div>
                  <span className="font-semibold text-white block">Sécurité & Confidentialité RLS</span>
                  <span className="text-gray-400">Toutes vos données personnelles sont chiffrées et isolées par utilisateur.</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
