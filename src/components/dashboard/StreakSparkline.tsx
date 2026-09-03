'use me';
import React from 'react';

interface SparklineProps {
  color?: string;
  height?: number;
}

export const StreakSparkline: React.FC<SparklineProps> = ({
  color = '#E5A93C',
  height = 36,
}) => {
  // Smooth wave curve path matching screenshot wave line
  return (
    <div className="w-full mt-2" style={{ height }}>
      <svg
        viewBox="0 0 160 40"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          d="M0,32 C20,30 35,35 50,28 C65,22 80,26 95,20 C110,14 125,24 140,16 C150,11 155,14 160,8 L160,40 L0,40 Z"
          fill={`url(#grad-${color})`}
        />
        <path
          d="M0,32 C20,30 35,35 50,28 C65,22 80,26 95,20 C110,14 125,24 140,16 C150,11 155,14 160,8"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
