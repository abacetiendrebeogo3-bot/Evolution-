export interface LogEntry {
  log_date: string; // ISO format 'YYYY-MM-DD'
  status: 'done' | 'minimum_mode' | 'missed' | 'excused';
}

export interface StreakResult {
  currentStreak: number;
  bestStreak: number;
}

/**
 * Calculates current streak and best streak following non-punitive tolerance rules:
 * - 'done' or 'minimum_mode' increments streak by 1.
 * - Single isolated 'missed' or 'excused' keeps streak alive without incrementing.
 * - Two consecutive 'missed' days resets current streak to 0.
 * - Best streak never decreases.
 */
export function calculateStreak(logs: LogEntry[]): StreakResult {
  if (!logs || logs.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  // Sort logs by date ascending
  const sorted = [...logs].sort((a, b) => a.log_date.localeCompare(b.log_date));

  let currentStreak = 0;
  let bestStreak = 0;
  let consecutiveMissed = 0;

  for (const entry of sorted) {
    const isSuccess = entry.status === 'done' || entry.status === 'minimum_mode';

    if (isSuccess) {
      currentStreak += 1;
      consecutiveMissed = 0;
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    } else if (entry.status === 'missed') {
      consecutiveMissed += 1;
      if (consecutiveMissed >= 2) {
        currentStreak = 0;
      }
      // Single missed day does not reset streak, just pauses incrementing
    } else if (entry.status === 'excused') {
      consecutiveMissed = 0;
      // Excused day pauses streak without breaking it
    }
  }

  return { currentStreak, bestStreak };
}
