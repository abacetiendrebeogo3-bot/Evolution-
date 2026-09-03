'use server';

import { createClient } from '../lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { HabitStatus, Pillar, Routine, Habit, UserStats, PillarStats } from '../types/habit';
import { calculateStreak } from '../lib/streaks/calculateStreak';
import { INITIAL_ROUTINES, INITIAL_USER_STATS, INITIAL_PILLAR_STATS } from '../mock/data';

export async function createHabit(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Utilisateur non authentifié.' };
  }

  const name = formData.get('name') as string;
  const why = formData.get('why') as string;
  const pillar = (formData.get('pillar') as Pillar) || 'corps';
  const triggerText = formData.get('trigger_text') as string;
  const actionText = formData.get('action_text') as string;
  const moment = (formData.get('moment') as string) || 'matin';
  const scheduledTime = formData.get('scheduled_time') as string;
  const durationMinutes = formData.get('duration_minutes') ? Number(formData.get('duration_minutes')) : null;
  const quantityLabel = formData.get('quantity_label') as string;
  const frequency = (formData.get('frequency') as string) || 'daily';
  const minimumModeLabel = formData.get('minimum_mode_label') as string;
  const rewardText = formData.get('reward_text') as string;
  const category = formData.get('category') as string;

  const { error } = await supabase.from('habits').insert({
    user_id: user.id,
    name,
    why,
    pillar,
    trigger_text: triggerText,
    action_text: actionText,
    moment,
    scheduled_time: scheduledTime || null,
    duration_minutes: durationMinutes,
    quantity_label: quantityLabel,
    frequency,
    minimum_mode_label: minimumModeLabel,
    reward_text: rewardText,
    category,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/habits');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function logHabit(habitId: string, status: HabitStatus, dateString?: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Utilisateur non authentifié.' };
  }

  const logDate = dateString || new Date().toISOString().split('T')[0];

  const { error } = await supabase.from('habit_logs').upsert(
    {
      habit_id: habitId,
      user_id: user.id,
      log_date: logDate,
      status,
      completed_at: status === 'done' || status === 'minimum_mode' ? new Date().toISOString() : null,
    },
    { onConflict: 'habit_id,log_date' }
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function archiveHabit(habitId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Utilisateur non authentifié.' };
  }

  const { error } = await supabase
    .from('habits')
    .update({ is_active: false, archived_at: new Date().toISOString() })
    .eq('id', habitId)
    .eq('user_id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/habits');
  revalidatePath('/dashboard');
  return { success: true };
}

/**
 * Fetch real user data from Supabase DB or return fallback initial data
 */
export async function getDashboardData() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      isAuthenticated: false,
      displayName: 'Entrepreneur',
      routines: INITIAL_ROUTINES,
      stats: INITIAL_USER_STATS,
      pillarStats: INITIAL_PILLAR_STATS,
    };
  }

  // 1. Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'Entrepreneur';

  // 2. Fetch User Habits
  let { data: dbHabits } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  // If new user has no habits yet, seed default initial habits for them
  if (!dbHabits || dbHabits.length === 0) {
    const defaultSeedHabits = [
      {
        user_id: user.id,
        name: 'Boire un verre d\'eau',
        why: 'Réhydrater immédiatement mon corps et éveiller mon métabolisme.',
        pillar: 'corps',
        moment: 'matin',
        scheduled_time: '06:00',
        minimum_mode_label: 'Quelques gorgées',
        frequency: 'daily',
      },
      {
        user_id: user.id,
        name: 'Sport / Entraînement',
        why: 'Forger une énergie maximale et développer ma discipline physique.',
        pillar: 'corps',
        moment: 'matin',
        scheduled_time: '06:10',
        minimum_mode_label: '10 pompes / 5 min étirement',
        frequency: 'daily',
      },
      {
        user_id: user.id,
        name: 'To-do list (3 priorités)',
        why: 'Exécuter mes priorités essentielles avant la journée.',
        pillar: 'travail',
        moment: 'matin',
        scheduled_time: '07:50',
        minimum_mode_label: 'Noter 1 seule tâche principale',
        frequency: 'daily',
      },
      {
        user_id: user.id,
        name: 'Lecture (10 min)',
        why: 'Nourrir mon esprit avec des connaissances de valeur.',
        pillar: 'esprit',
        moment: 'midi',
        scheduled_time: '12:30',
        minimum_mode_label: '2 pages',
        frequency: 'daily',
      },
      {
        user_id: user.id,
        name: 'Travail profond',
        why: 'Créer de la valeur à fort impact sans distraction.',
        pillar: 'travail',
        moment: 'midi',
        scheduled_time: '14:00',
        minimum_mode_label: '25 min de Pomodoro',
        frequency: 'daily',
      },
      {
        user_id: user.id,
        name: 'Respiration / Méditation',
        why: 'Apaiser le système nerveux pour un sommeil réparateur.',
        pillar: 'esprit',
        moment: 'soir',
        scheduled_time: '20:20',
        minimum_mode_label: '3 respirations profondes',
        frequency: 'daily',
      },
    ];

    const { data: inserted } = await supabase
      .from('habits')
      .insert(defaultSeedHabits)
      .select();

    dbHabits = inserted || [];
  }

  // 3. Fetch Today's Logs
  const todayStr = new Date().toISOString().split('T')[0];
  const { data: todayLogs } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('user_id', user.id)
    .eq('log_date', todayStr);

  const logsMap = new Map<string, HabitStatus>();
  todayLogs?.forEach((l) => {
    logsMap.set(l.habit_id, l.status as HabitStatus);
  });

  // Map db Habits to Routine objects
  const mapDbToHabit = (h: any): Habit => ({
    id: h.id,
    name: h.name,
    moment: h.moment,
    scheduledTime: h.scheduled_time || undefined,
    minimumModeLabel: h.minimum_mode_label || undefined,
    why: h.why || undefined,
    pillar: h.pillar || 'corps',
    status: logsMap.get(h.id) || 'todo',
    streakCount: 1,
  });

  const matinHabits = (dbHabits || []).filter((h: any) => h.moment === 'matin').map(mapDbToHabit);
  const midiHabits = (dbHabits || []).filter((h: any) => h.moment === 'midi').map(mapDbToHabit);
  const soirHabits = (dbHabits || []).filter((h: any) => h.moment === 'soir').map(mapDbToHabit);

  const routines: Routine[] = [
    {
      id: 'routine-matin',
      name: 'MATIN',
      subtitle: 'Construire le jour',
      moment: 'matin',
      icon: 'SunDim',
      habits: matinHabits.length > 0 ? matinHabits : INITIAL_ROUTINES[0].habits,
    },
    {
      id: 'routine-midi',
      name: 'MIDI',
      subtitle: 'Recharger & apprendre',
      moment: 'midi',
      icon: 'Sun',
      habits: midiHabits.length > 0 ? midiHabits : INITIAL_ROUTINES[1].habits,
    },
    {
      id: 'routine-soir',
      name: 'SOIR',
      subtitle: 'Ralentir & se préparer',
      moment: 'soir',
      icon: 'Moon',
      habits: soirHabits.length > 0 ? soirHabits : INITIAL_ROUTINES[2].habits,
    },
  ];

  const allHabits = routines.flatMap((r) => r.habits);
  const completedTodayCount = allHabits.filter(
    (h) => h.status === 'done' || h.status === 'minimum_mode'
  ).length;

  const stats: UserStats = {
    currentStreak: Math.max(1, completedTodayCount > 0 ? 1 : 0),
    bestStreak: 12,
    weeklySuccessRate: allHabits.length > 0 ? Math.round((completedTodayCount / allHabits.length) * 100) : 0,
    completedTodayCount,
    totalHabitsCount: allHabits.length,
  };

  const pillarStats: PillarStats[] = ['corps', 'esprit', 'travail', 'relations'].map((p) => {
    const pillarHabits = allHabits.filter((h) => h.pillar === p);
    const totalCount = pillarHabits.length;
    const completedCount = pillarHabits.filter(
      (h) => h.status === 'done' || h.status === 'minimum_mode'
    ).length;
    return {
      pillar: p as Pillar,
      name: p.toUpperCase(),
      icon: 'Target',
      completedCount,
      totalCount,
      percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    };
  });

  return {
    isAuthenticated: true,
    displayName,
    routines,
    stats,
    pillarStats,
  };
}
