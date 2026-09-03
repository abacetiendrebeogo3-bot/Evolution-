export type HabitStatus = 'done' | 'minimum_mode' | 'todo' | 'missed' | 'excused';

export type HabitMoment = 'matin' | 'midi' | 'soir' | 'custom';

export type Pillar = 'corps' | 'esprit' | 'travail' | 'relations';

export interface Habit {
  id: string;
  name: string;
  moment: HabitMoment;
  scheduledTime?: string; // e.g. "06:00"
  durationMinutes?: number;
  quantityLabel?: string; // e.g. "10 min" or "5 pages"
  minimumModeLabel?: string; // e.g. "1 page" or "2 min"
  why?: string; // Intention/Pourquoi: e.g. "Pour doubler mon niveau d'énergie au quotidien"
  pillar?: Pillar; // Corps, Esprit, Travail, Relations
  category?: string;
  status: HabitStatus;
  completedAt?: string;
  iconName?: string;
  streakCount: number;
}

export interface Routine {
  id: string;
  name: string;
  moment: HabitMoment;
  subtitle: string;
  icon: string;
  habits: Habit[];
}

export interface UserStats {
  currentStreak: number;
  bestStreak: number;
  weeklySuccessRate: number; // percentage (e.g. 87)
  completedTodayCount: number;
  totalHabitsCount: number;
}

export interface PillarStats {
  pillar: Pillar;
  name: string;
  icon: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export interface DailyQuote {
  id: string;
  text: string;
  author: string;
  category: string;
}
