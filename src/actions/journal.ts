'use server';

import { createClient } from '../lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveJournalEntry(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Utilisateur non authentifié.' };
  }

  const wentWell = formData.get('went_well') as string;
  const toImprove = formData.get('to_improve') as string;
  const proudOf = formData.get('proud_of') as string;
  const mood = formData.get('mood') as string;
  const entryDate = new Date().toISOString().split('T')[0];

  const { error } = await supabase.from('journal_entries').upsert(
    {
      user_id: user.id,
      entry_date: entryDate,
      went_well: wentWell,
      to_improve: toImprove,
      proud_of: proudOf,
      mood: mood || 'serene',
    },
    { onConflict: 'user_id,entry_date' }
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/journal');
  return { success: true };
}
