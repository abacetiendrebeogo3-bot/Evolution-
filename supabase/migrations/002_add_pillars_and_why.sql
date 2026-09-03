-- Migration 002: Ajout du Pourquoi (Intention) et des 4 Piliers de vie
alter table public.habits 
  add column if not exists why text,
  add column if not exists pillar text check (pillar in ('corps','esprit','travail','relations'));

-- Index pour accélérer les filtrages par pilier
create index if not exists idx_habits_pillar on public.habits(pillar);
