'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  LayoutDashboard,
  CheckSquare,
  RotateCcw,
  Calendar,
  BarChart3,
  BookOpen,
  Users,
  Settings,
  ChevronUp,
  ChevronLeft,
  CalendarDays,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Habitudes', href: '/habits', icon: CheckSquare },
    { name: 'Routines', href: '/routines', icon: RotateCcw },
    { name: 'Calendrier', href: '/calendar', icon: Calendar },
    { name: 'Statistiques', href: '/stats', icon: BarChart3 },
    { name: 'Journal', href: '/journal', icon: BookOpen },
    { name: 'Relations', href: '/relations', icon: Users },
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-sidebar border-r border-card-border flex flex-col justify-between p-4 transition-transform duration-300 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between px-2 py-4 mb-6">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform shadow-amber-glow">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-widest text-xs uppercase text-white font-mono leading-none">
                  DISCIPLINE
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gold-400/80 font-mono mt-1">
                  JOURNAL
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-gray-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-card text-white border border-card-border shadow-md'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-card-hover/50'
                  }`}
                >
                  {/* Left Active Amber Highlight Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gold-500" />
                  )}

                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-gold-400'
                        : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile & Actions */}
        <div className="pt-4 border-t border-card-border/60 space-y-3">
          {/* Profile Card */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-card/60 border border-card-border/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-800 border border-gold-500/30 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Entrepreneur</span>
                <span className="text-[10px] text-gray-400">Focus · Discipline · Clarté</span>
              </div>
            </div>
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </div>

          {/* Daily View Selector Button */}
          <button className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-card/40 hover:bg-card border border-card-border/50 text-xs font-medium text-gray-300 transition-colors">
            <div className="flex items-center gap-2.5">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span>Vue quotidienne</span>
            </div>
            <ChevronLeft className="w-3.5 h-3.5 text-gray-500 rotate-180" />
          </button>

          {/* Reduce Sidebar Button */}
          <button className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span>Réduire</span>
          </button>
        </div>
      </aside>
    </>
  );
};
