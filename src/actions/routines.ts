'use server';

import { createClient } from '../lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createRoutine(name: string, slot: 'matin' | 'midi' | 'soir' | 'custom') {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Utilisateur non authentifié.' };
  }

  const { data, error } = await supabase.from('routines').insert({
    user_id: user.id,
    name,
    slot,
  }).select().single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/routines');
  revalidatePath('/dashboard');
  return { success: true, routine: data };
}

export async function addHabitToRoutine(routineId: string, habitId: string, orderIndex: number = 0) {
  const supabase = createClient();
  const { error } = await supabase.from('routine_habits').upsert({
    routine_id: routineId,
    habit_id: habitId,
    order_index: orderIndex,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/routines');
  revalidatePath('/dashboard');
  return { success: true };
}
