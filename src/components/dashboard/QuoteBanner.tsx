import React from 'react';
import { DailyQuote } from '../../types/habit';

interface QuoteBannerProps {
  quote: DailyQuote;
}

export const QuoteBanner: React.FC<QuoteBannerProps> = ({ quote }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 md:p-8 glow-card mt-6">
      {/* Background Image Overlay with Dark Mood Filter */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity filter blur-[1px] transform scale-105 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop')`,
        }}
      />
      {/* Gradient Mask for ultra smooth luxury look */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E14] via-[#0E0E14]/85 to-transparent pointer-events-none" />

      {/* Quote Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-4xl">
        <div className="flex gap-4">
          <span className="text-4xl md:text-5xl font-serif text-gold-500/80 leading-none select-none font-bold">
            “
          </span>
          <div>
            <blockquote className="text-lg md:text-xl font-serif italic text-gray-100 font-normal leading-relaxed tracking-wide">
              {quote.text}
            </blockquote>
            <p className="mt-2 text-xs md:text-sm font-sans text-gold-400/90 font-medium">
              — {quote.author}
            </p>
          </div>
        </div>

        <span className="self-end text-4xl md:text-5xl font-serif text-gold-500/80 leading-none select-none font-bold hidden md:inline">
          ”
        </span>
      </div>
    </div>
  );
};
