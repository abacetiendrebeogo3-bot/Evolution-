'use client';

import React from 'react';
import { Calendar, ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileSidebar }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-2">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl bg-card border border-card-border text-gray-300 hover:text-white md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
            Bonjour, Entrepreneur.
          </h1>
          <p className="text-sm text-gray-400 mt-1 font-sans">
            Chaque action compte. Reste constant.
          </p>
        </div>
      </div>

      {/* Date & View Controls */}
      <div className="flex items-center gap-3 self-start sm:self-auto">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card/60 border border-card-border text-xs font-mono text-gray-300">
          <Calendar className="w-4 h-4 text-gold-400" />
          <span>22 Mai 2026</span>
        </div>

        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card hover:bg-card-hover border border-card-border text-xs font-medium text-white transition-colors">
          <span>Aujourd'hui</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
};
