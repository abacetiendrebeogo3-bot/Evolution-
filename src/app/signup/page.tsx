'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, UserPlus, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { signupAction } from '../../actions/auth';

export default function SignupPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);
    const res = await signupAction(formData);
    if (res?.error) {
      setErrorMsg(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center p-4 bg-noise">
      <div className="w-full max-w-md bg-card border border-card-border rounded-3xl p-8 shadow-2xl glow-card relative overflow-hidden">
        {/* Top Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 shadow-amber-glow">
            <Compass className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-sans text-white tracking-tight">
            DISCIPLINE JOURNAL
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Créer un espace personnel de suivi et de discipline.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-flame-500/10 border border-flame-500/30 text-flame-500 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase font-mono">
              Nom complet / Pseudonyme
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                name="displayName"
                required
                placeholder="Amadou Fall — Entrepreneur"
                className="w-full bg-gray-900/90 border border-card-border rounded-xl pl-10 pr-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase font-mono">
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                name="email"
                required
                placeholder="votre.email@domaine.com"
                className="w-full bg-gray-900/90 border border-card-border rounded-xl pl-10 pr-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase font-mono">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full bg-gray-900/90 border border-card-border rounded-xl pl-10 pr-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-background font-semibold text-sm transition-all shadow-amber-glow mt-6 disabled:opacity-50"
          >
            {loading ? 'Création en cours...' : 'Créer mon compte'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-card-border/60 text-center text-xs text-gray-400">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-gold-400 font-semibold hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
