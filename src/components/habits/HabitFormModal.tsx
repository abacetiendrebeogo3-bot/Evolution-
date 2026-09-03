'use client';

import React, { useState } from 'react';
import {
  X,
  Target,
  Sparkles,
  Zap,
  Activity,
  Wind,
  Briefcase,
  Users,
  Plus,
} from 'lucide-react';
import { Pillar, HabitMoment } from '../../types/habit';
import { createHabit } from '../../actions/habits';

interface HabitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const HabitFormModal: React.FC<HabitFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [pillar, setPillar] = useState<Pillar>('corps');
  const [moment, setMoment] = useState<HabitMoment>('matin');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('pillar', pillar);
    formData.append('moment', moment);

    await createHabit(formData);
    setLoading(false);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-card border border-card-border rounded-3xl p-6 shadow-2xl glow-card relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-card-border/60 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Ancrer une nouvelle Habitude</h2>
              <p className="text-xs text-gray-400">Définis l'action, ton pourquoi et ton pilier.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom de l'habitude */}
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-gray-300 mb-1.5">
              Nom de l'habitude *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="ex: Sport / Entraînement"
              className="w-full bg-gray-900 border border-card-border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* Pourquoi / Intention */}
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-gold-400 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Pourquoi fais-tu cette habitude ? (Intention) *
            </label>
            <textarea
              name="why"
              rows={2}
              required
              placeholder="ex: Je veux doubler mon énergie quotidienne et développer une discipline de fer."
              className="w-full bg-gray-900 border border-card-border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 font-serif italic"
            />
          </div>

          {/* Pilier de Vie */}
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-gray-300 mb-2">
              Pilier de Vie *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'corps', label: 'CORPS', icon: Activity, color: 'text-emerald-400' },
                { id: 'esprit', label: 'ESPRIT', icon: Wind, color: 'text-purple-400' },
                { id: 'travail', label: 'TRAVAIL', icon: Briefcase, color: 'text-blue-400' },
                { id: 'relations', label: 'RELATIONS', icon: Users, color: 'text-rose-400' },
              ].map((p) => {
                const Icon = p.icon;
                const isSelected = pillar === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPillar(p.id as Pillar)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-gold-500/15 border-gold-500 text-white'
                        : 'bg-gray-900 border-card-border text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${p.color}`} />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Moment / Routine */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase font-mono text-gray-300 mb-1.5">
                Créneau de Routine
              </label>
              <select
                value={moment}
                onChange={(e) => setMoment(e.target.value as HabitMoment)}
                className="w-full bg-gray-900 border border-card-border rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-gold-500"
              >
                <option value="matin">MATIN</option>
                <option value="midi">MIDI</option>
                <option value="soir">SOIR</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase font-mono text-gray-300 mb-1.5">
                Heure prévue
              </label>
              <input
                type="time"
                name="scheduled_time"
                defaultValue="06:00"
                style={{ colorScheme: 'dark' }}
                className="w-full bg-gray-900 border border-card-border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Mode Minimum */}
          <div>
            <label className="block text-xs font-semibold uppercase font-mono text-status-minimum mb-1.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Version Mode Minimum (Ne jamais manquer 2 fois) *
            </label>
            <input
              type="text"
              name="minimum_mode_label"
              required
              placeholder="ex: 5 min d'étirements / 10 pompes"
              className="w-full bg-gray-900 border border-card-border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-status-minimum"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-background font-bold text-sm transition-colors shadow-amber-glow mt-6 disabled:opacity-50"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            {loading ? 'Création...' : 'Ancrer l\'habitude'}
          </button>
        </form>
      </div>
    </div>
  );
};
