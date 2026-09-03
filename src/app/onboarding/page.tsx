'use client';

import React, { useState } from 'react';
import { Compass, Clock, Sunrise, Sunset, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { saveProfileOnboarding } from '../../actions/auth';

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await saveProfileOnboarding(formData);
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center p-4 bg-noise">
      <div className="w-full max-w-xl bg-card border border-card-border rounded-3xl p-8 shadow-2xl glow-card relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 shadow-amber-glow">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold mb-1">
            Étape 1 sur 1 — Configuration initiale
          </span>
          <h1 className="text-2xl font-bold font-sans text-white tracking-tight">
            Définis le rythme de tes journées
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-md">
            Ces heures nous permettent de structurer tes routines du matin, du midi et du soir.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Wake & Sleep Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/80 rounded-2xl border border-card-border">
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase font-mono flex items-center gap-2">
                <Sunrise className="w-4 h-4 text-gold-400" />
                Heure de réveil visée
              </label>
              <input
                type="time"
                name="wake_target_time"
                defaultValue="06:00"
                required
                className="w-full bg-gray-800 border border-card-border rounded-xl p-3 text-lg font-mono text-white focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>

            <div className="p-4 bg-gray-900/80 rounded-2xl border border-card-border">
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase font-mono flex items-center gap-2">
                <Sunset className="w-4 h-4 text-indigo-300" />
                Heure de coucher visée
              </label>
              <input
                type="time"
                name="sleep_target_time"
                defaultValue="23:00"
                required
                className="w-full bg-gray-800 border border-card-border rounded-xl p-3 text-lg font-mono text-white focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Work Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/80 rounded-2xl border border-card-border">
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase font-mono flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" />
                Début de travail
              </label>
              <input
                type="time"
                name="work_start_time"
                defaultValue="08:00"
                required
                className="w-full bg-gray-800 border border-card-border rounded-xl p-3 text-lg font-mono text-white focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>

            <div className="p-4 bg-gray-900/80 rounded-2xl border border-card-border">
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Fin de travail
              </label>
              <input
                type="time"
                name="work_end_time"
                defaultValue="18:00"
                required
                className="w-full bg-gray-800 border border-card-border rounded-xl p-3 text-lg font-mono text-white focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Timezone */}
          <div className="p-4 bg-gray-900/80 rounded-2xl border border-card-border">
            <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase font-mono">
              Fuseau Horaire
            </label>
            <input
              type="text"
              name="timezone"
              defaultValue="Africa/Ouagadougou"
              required
              className="w-full bg-gray-800 border border-card-border rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-gold-500/60 transition-colors"
            />
          </div>

          <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs flex items-center gap-3">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <span>
              Ces paramètres créeront automatiquement tes 3 premières routines par défaut (*Matin*, *Midi*, *Soir*).
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-background font-semibold text-sm transition-all shadow-amber-glow mt-6 disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : 'Accéder à mon Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
