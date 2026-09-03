import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  subtitle?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 72,
  strokeWidth = 7,
  subtitle = 'cette semaine',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#20202E"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#goldGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#E5A93C" />
              <stop offset="100%" stopColor="#D4A843" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div>
        <div className="text-2xl font-bold font-sans text-white tracking-tight">
          {percentage}%
        </div>
        <div className="text-xs text-gray-400 font-sans mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
};
