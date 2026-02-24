-- Draft Prediction Game Schema
-- Run this in your Supabase SQL Editor after creating a project

-- Profiles table (optional, extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Draft predictions: one per user per year
create table if not exists public.draft_predictions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  draft_year integer not null default 2026,
  display_name text not null,
  created_at timestamptz default now() not null,
  locked_at timestamptz,
  unique(user_id, draft_year)
);

-- Per-year unique display names
alter table public.draft_predictions drop constraint if exists draft_predictions_display_name_draft_year_key;
alter table public.draft_predictions add constraint draft_predictions_display_name_draft_year_key unique (display_name, draft_year);

-- Individual picks: 32 per prediction
create table if not exists public.prediction_picks (
  id uuid default gen_random_uuid() primary key,
  prediction_id uuid references public.draft_predictions on delete cascade not null,
  pick_number integer not null check (pick_number >= 1 and pick_number <= 32),
  prospect_id text not null,
  prospect_name text not null,
  team text not null,
  unique(prediction_id, pick_number)
);

-- Actual draft results (you populate this after the draft for scoring)
create table if not exists public.draft_results (
  id uuid default gen_random_uuid() primary key,
  draft_year integer not null,
  pick_number integer not null,
  prospect_id text not null,
  prospect_name text not null,
  team text not null,
  unique(draft_year, pick_number)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.draft_predictions enable row level security;
alter table public.prediction_picks enable row level security;
alter table public.draft_results enable row level security;

-- Profiles: users can read/update own
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Draft predictions: users can CRUD own
drop policy if exists "Users can view own predictions" on public.draft_predictions;
drop policy if exists "Users can insert own predictions" on public.draft_predictions;
drop policy if exists "Users can update own predictions" on public.draft_predictions;
drop policy if exists "Users can delete own predictions" on public.draft_predictions;
create policy "Users can view own predictions"
  on public.draft_predictions for select
  using (auth.uid() = user_id);

create policy "Users can insert own predictions"
  on public.draft_predictions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own predictions"
  on public.draft_predictions for update
  using (auth.uid() = user_id);

create policy "Users can delete own predictions"
  on public.draft_predictions for delete
  using (auth.uid() = user_id);

-- Leaderboard: anyone can read predictions (for scoring display)
drop policy if exists "Users can view own picks" on public.prediction_picks;
drop policy if exists "Users can insert picks for own prediction" on public.prediction_picks;
drop policy if exists "Users can update picks for own prediction" on public.prediction_picks;
drop policy if exists "Users can delete picks for own prediction" on public.prediction_picks;
create policy "Users can view own picks"
  on public.prediction_picks for select
  using (
    exists (
      select 1 from public.draft_predictions
      where draft_predictions.id = prediction_id
      and draft_predictions.user_id = auth.uid()
    )
  );

create policy "Users can insert picks for own prediction"
  on public.prediction_picks for insert
  with check (
    exists (
      select 1 from public.draft_predictions
      where draft_predictions.id = prediction_id
      and draft_predictions.user_id = auth.uid()
    )
  );

create policy "Users can update picks for own prediction"
  on public.prediction_picks for update
  using (
    exists (
      select 1 from public.draft_predictions
      where draft_predictions.id = prediction_id
      and draft_predictions.user_id = auth.uid()
    )
  );

create policy "Users can delete picks for own prediction"
  on public.prediction_picks for delete
  using (
    exists (
      select 1 from public.draft_predictions
      where draft_predictions.id = prediction_id
      and draft_predictions.user_id = auth.uid()
    )
  );

-- Draft results: public read (for scoring), only service role can write
drop policy if exists "Anyone can read draft results" on public.draft_results;
create policy "Anyone can read draft results"
  on public.draft_results for select
  using (true);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger runs on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
