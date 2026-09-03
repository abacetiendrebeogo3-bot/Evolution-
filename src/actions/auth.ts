'use server';

import { createClient } from '../lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const displayName = formData.get('displayName') as string;

  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs obligatoires.' };
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName || 'Entrepreneur',
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    // Initialize user profile
    await supabase.from('profiles').upsert({
      id: data.user.id,
      display_name: displayName || 'Entrepreneur',
      timezone: 'Africa/Ouagadougou',
    });
  }

  revalidatePath('/', 'layout');
  redirect('/onboarding');
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function saveProfileOnboarding(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const wakeTargetTime = formData.get('wake_target_time') as string;
    const sleepTargetTime = formData.get('sleep_target_time') as string;
    const workStartTime = formData.get('work_start_time') as string;
    const workEndTime = formData.get('work_end_time') as string;
    const timezone = (formData.get('timezone') as string) || 'Africa/Ouagadougou';

    await supabase.from('profiles').upsert({
      id: user.id,
      wake_target_time: wakeTargetTime || '06:00',
      sleep_target_time: sleepTargetTime || '23:00',
      work_start_time: workStartTime || '08:00',
      work_end_time: workEndTime || '18:00',
      timezone,
    });
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
