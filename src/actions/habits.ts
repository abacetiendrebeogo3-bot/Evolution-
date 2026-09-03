'use server';

import { createClient } from '../lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { HabitStatus } from '../types/habit';

export async function createHabit(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Utilisateur non authentifié.' };
  }

  const name = formData.get('name') as string;
  const why = formData.get('why') as string;
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
