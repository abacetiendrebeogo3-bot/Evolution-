-- Migration initiale Supabase pour Discipline Journal (Habit Tracker)
create extension if not exists "uuid-ossp";

-- 1. Profil (étend auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  timezone text not null default 'Africa/Ouagadougou',
  day_start_time time default '06:00',
  work_start_time time default '08:00',
  work_end_time time default '18:00',
  wake_target_time time default '06:00',
  sleep_target_time time default '23:00',
  total_points int not null default 0,
  current_level int not null default 1,
  created_at timestamptz not null default now()
);

-- 2. Habitudes
create table if not exists public.habits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  why text,
  trigger_text text,
  action_text text,
  moment text not null check (moment in ('matin','midi','apres_midi','soir','heure_precise')),
  scheduled_time time,
  duration_minutes int,
  quantity_label text,                 -- ex: "5 pages"
  frequency text not null check (frequency in ('daily','specific_days','x_per_week','weekly')),
  specific_days int[],                 -- 0=dimanche ... 6=samedi
  times_per_week int,
  is_mandatory boolean not null default true,
  minimum_mode_label text,             -- ex: "2 minutes" / "1 page"
  reward_text text,
  category text,                       -- sport, lecture, meditation, social...
  order_index int not null default 0,
  is_active boolean not null default true,
  archived_at timestamptz,
  created_at timestamptz not null default now()
);

-- 3. Routines
create table if not exists public.routines (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slot text check (slot in ('matin','midi','soir','custom')),
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.routine_habits (
  routine_id uuid not null references public.routines(id) on delete cascade,
  habit_id uuid not null references public.habits(id) on delete cascade,
  order_index int not null default 0,
  primary key (routine_id, habit_id)
);

-- 4. Logs quotidiens : le coeur du tracker
create table if not exists public.habit_logs (
  id uuid primary key default uuid_generate_v4(),
  habit_id uuid not null references public.habits(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  status text not null check (status in ('done','minimum_mode','missed','excused')),
  completed_at timestamptz,
  actual_duration_minutes int,
  note text,
  mood text,
  created_at timestamptz not null default now(),
  unique (habit_id, log_date)
);

-- 5. Citations
create table if not exists public.quotes (
  id uuid primary key default uuid_generate_v4(),
  text text not null,
  author text,
  category text,
  is_original boolean not null default false
);

create table if not exists public.quote_shown_log (
  user_id uuid not null references auth.users(id) on delete cascade,
  quote_id uuid not null references public.quotes(id) on delete cascade,
  shown_at timestamptz not null default now()
);

-- 6. Relations sociales
create table if not exists public.relationships (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  relation_type text,
  last_interaction_date date,
  next_target_date date,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.relationship_interactions (
  id uuid primary key default uuid_generate_v4(),
  relationship_id uuid not null references public.relationships(id) on delete cascade,
  interaction_date date not null default current_date,
  interaction_type text,
  note text
);

-- 7. Journal / réflexion
create table if not exists public.journal_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null,
  went_well text,
  to_improve text,
  proud_of text,
  mood text,
  created_at timestamptz not null default now(),
  unique (user_id, entry_date)
);

-- 8. Points / niveaux
create table if not exists public.points_ledger (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_type text not null,
  source_id uuid,
  points int not null,
  created_at timestamptz not null default now()
);

-- 9. Notifications
create table if not exists public.notification_settings (
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  enabled boolean not null default true,
  send_time time,
  primary key (user_id, category)
);

-- ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
drop policy if exists "owner_all_profiles" on public.profiles;
create policy "owner_all_profiles" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);

alter table public.habits enable row level security;
drop policy if exists "owner_all_habits" on public.habits;
create policy "owner_all_habits" on public.habits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.routines enable row level security;
drop policy if exists "owner_all_routines" on public.routines;
create policy "owner_all_routines" on public.routines for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.habit_logs enable row level security;
drop policy if exists "owner_all_habit_logs" on public.habit_logs;
create policy "owner_all_habit_logs" on public.habit_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.quote_shown_log enable row level security;
drop policy if exists "owner_all_quote_shown_log" on public.quote_shown_log;
create policy "owner_all_quote_shown_log" on public.quote_shown_log for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.relationships enable row level security;
drop policy if exists "owner_all_relationships" on public.relationships;
create policy "owner_all_relationships" on public.relationships for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.journal_entries enable row level security;
drop policy if exists "owner_all_journal_entries" on public.journal_entries;
create policy "owner_all_journal_entries" on public.journal_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.points_ledger enable row level security;
drop policy if exists "owner_all_points_ledger" on public.points_ledger;
create policy "owner_all_points_ledger" on public.points_ledger for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.notification_settings enable row level security;
drop policy if exists "owner_all_notification_settings" on public.notification_settings;
create policy "owner_all_notification_settings" on public.notification_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.quotes enable row level security;
drop policy if exists "public_read_quotes" on public.quotes;
create policy "public_read_quotes" on public.quotes for select using (true);

-- Insert initial sample quotes
insert into public.quotes (text, author, category, is_original) values
('La discipline est le pont entre les objectifs et les accomplissements.', 'Jim Rohn', 'discipline', false),
('Nous sommes ce que nous faisons de manière répétée. L''excellence n''est donc pas un acte, mais une habitude.', 'Aristote', 'discipline', false),
('Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant.', 'Proverbe', 'perseverance', false)
on conflict do nothing;
