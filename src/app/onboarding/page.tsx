'use client';

import React, { useState } from 'react';
import { Compass, Clock, Sunrise, Sunset, Briefcase, ArrowRight, Sparkles, Check } from 'lucide-react';
import { saveProfileOnboarding } from '../../actions/auth';

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);
  const [wakeTime, setWakeTime] = useState('06:00');
  const [sleepTime, setSleepTime] = useState('23:00');
  const [workStart, setWorkStart] = useState('08:00');
  const [workEnd, setWorkEnd] = useState('18:00');
  const [timezone, setTimezone] = useState('Africa/Ouagadougou');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('wake_target_time', wakeTime);
    formData.append('sleep_target_time', sleepTime);
    formData.append('work_start_time', workStart);
    formData.append('work_end_time', workEnd);
    formData.append('timezone', timezone);

    try {
      await saveProfileOnboarding(formData);
    } catch {
      // Fallback redirect if demo or error
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center p-4 bg-noise">
      <div className="w-full max-w-xl bg-card border border-card-border rounded-3xl p-6 sm:p-8 shadow-2xl glow-card relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-3 shadow-amber-glow">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400 font-semibold mb-1">
            Étape 1 — Configuration initiale
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
            Définis le rythme de tes journées
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-md">
            Personnalise tes heures pour structurer automatiquement tes routines.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Wake & Sleep Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Wake Target Time */}
            <div className="p-4 bg-gray-900/90 rounded-2xl border border-card-border">
              <label className="block text-xs font-semibold text-gray-200 mb-2 uppercase font-mono flex items-center gap-2">
                <Sunrise className="w-4 h-4 text-gold-400" />
                Heure de réveil visée
              </label>
              <input
                type="time"
                name="wake_target_time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                required
                style={{ colorScheme: 'dark' }}
                className="w-full bg-gray-800/90 border border-card-border/80 rounded-xl p-3 text-xl font-mono text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
              />
              {/* Quick presets */}
              <div className="flex gap-1.5 mt-2">
                {['05:30', '06:00', '06:30', '07:00'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setWakeTime(time)}
                    className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-all ${
                      wakeTime === time
                        ? 'bg-gold-500/20 text-gold-400 border-gold-500/50'
                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep Target Time */}
            <div className="p-4 bg-gray-900/90 rounded-2xl border border-card-border">
              <label className="block text-xs font-semibold text-gray-200 mb-2 uppercase font-mono flex items-center gap-2">
                <Sunset className="w-4 h-4 text-indigo-300" />
                Heure de coucher visée
              </label>
              <input
                type="time"
                name="sleep_target_time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                required
                style={{ colorScheme: 'dark' }}
                className="w-full bg-gray-800/90 border border-card-border/80 rounded-xl p-3 text-xl font-mono text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
              />
              {/* Quick presets */}
              <div className="flex gap-1.5 mt-2">
                {['22:00', '22:30', '23:00', '23:30'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSleepTime(time)}
                    className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-all ${
                      sleepTime === time
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Work Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/90 rounded-2xl border border-card-border">
              <label className="block text-xs font-semibold text-gray-200 mb-2 uppercase font-mono flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" />
                Début de travail
              </label>
              <input
                type="time"
                name="work_start_time"
                value={workStart}
                onChange={(e) => setWorkStart(e.target.value)}
                required
                style={{ colorScheme: 'dark' }}
                className="w-full bg-gray-800/90 border border-card-border/80 rounded-xl p-3 text-xl font-mono text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
              />
            </div>

            <div className="p-4 bg-gray-900/90 rounded-2xl border border-card-border">
              <label className="block text-xs font-semibold text-gray-200 mb-2 uppercase font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Fin de travail
              </label>
              <input
                type="time"
                name="work_end_time"
                value={workEnd}
                onChange={(e) => setWorkEnd(e.target.value)}
                required
                style={{ colorScheme: 'dark' }}
                className="w-full bg-gray-800/90 border border-card-border/80 rounded-xl p-3 text-xl font-mono text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Timezone */}
          <div className="p-4 bg-gray-900/90 rounded-2xl border border-card-border">
            <label className="block text-xs font-semibold text-gray-200 mb-2 uppercase font-mono">
              Fuseau Horaire
            </label>
            <input
              type="text"
              name="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              required
              className="w-full bg-gray-800/90 border border-card-border/80 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs flex items-center gap-3">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>
              Ces paramètres créeront automatiquement tes routines du *Matin*, *Midi*, et *Soir*.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-background font-semibold text-sm transition-all shadow-amber-glow mt-4 disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : 'Accéder à mon Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
