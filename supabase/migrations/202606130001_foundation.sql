create extension if not exists "pgcrypto";

create type public.artifact_visibility as enum ('private','draft','unlisted','public');
create type public.entitlement_source as enum ('founding_1000','razorpay','admin_grant');
create type public.entitlement_status as enum ('active','pending','revoked','refunded');
create type public.problem_kind as enum ('diagnose','decide','build');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  handle text unique check (handle is null or handle ~ '^[a-z0-9][a-z0-9_-]{2,29}$'),
  headline text,
  bio text,
  avatar_path text,
  selected_path_slug text,
  leaderboard_opt_in boolean not null default false,
  public_activity boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.email_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  weekly_challenge boolean not null default false,
  newsletter boolean not null default false,
  challenge_reminders boolean not null default false,
  peer_review_notifications boolean not null default false,
  monthly_summary boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  outcome text not null,
  cover_asset text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.challenge_days (
  id uuid primary key default gen_random_uuid(),
  path_id uuid not null references public.learning_paths(id) on delete cascade,
  day_number integer not null check (day_number > 0),
  title text not null,
  summary text not null,
  outcome text not null,
  artifact_title text not null,
  estimated_minutes integer not null check (estimated_minutes > 0),
  cover_asset text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  unique(path_id, day_number)
);

create table public.daily_problems (
  id uuid primary key default gen_random_uuid(),
  challenge_day_id uuid not null references public.challenge_days(id) on delete cascade,
  sequence_number integer not null check (sequence_number between 1 and 3),
  kind public.problem_kind not null,
  title text not null,
  context text not null,
  task text not null,
  expected_output text not null,
  estimated_minutes integer not null check (estimated_minutes > 0),
  hint text,
  rubric jsonb not null default '{}'::jsonb,
  unique(challenge_day_id, sequence_number),
  unique(challenge_day_id, kind)
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null
);

create table public.challenge_skills (
  challenge_day_id uuid references public.challenge_days(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  weight numeric(5,2) not null default 1,
  primary key(challenge_day_id, skill_id)
);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  entitlement_type text not null default 'calendar_learning_pass',
  source public.entitlement_source not null,
  status public.entitlement_status not null default 'active',
  founding_number integer unique,
  price_paid integer not null default 0,
  currency text not null default 'INR',
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  unique(user_id, entitlement_type)
);

create table public.founding_counter (
  singleton boolean primary key default true check (singleton),
  claimed_count integer not null default 0 check (claimed_count between 0 and 1000)
);
insert into public.founding_counter(singleton, claimed_count) values (true, 0) on conflict do nothing;

create table public.learning_plans (
  id uuid primary key default gen_random_uuid(),
  public_token uuid unique not null default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  path_id uuid not null references public.learning_paths(id),
  start_date date not null,
  selected_weekdays smallint[] not null,
  start_time time not null,
  duration_minutes integer not null default 60,
  timezone text not null,
  created_at timestamptz not null default now()
);

create table public.plan_days (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.learning_plans(id) on delete cascade,
  challenge_day_id uuid not null references public.challenge_days(id),
  scheduled_date date not null,
  status text not null default 'not_started' check (status in ('not_started','in_progress','completed','skipped')),
  completed_at timestamptz,
  unique(plan_id, challenge_day_id)
);

create table public.problem_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_day_id uuid not null references public.plan_days(id) on delete cascade,
  problem_id uuid not null references public.daily_problems(id),
  response_data jsonb not null default '{}'::jsonb,
  status text not null default 'not_started' check (status in ('not_started','in_progress','completed')),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(user_id, plan_day_id, problem_id)
);

create table public.artifacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_day_id uuid references public.plan_days(id) on delete set null,
  slug text,
  title text not null,
  summary text,
  visibility public.artifact_visibility not null default 'draft',
  cover_asset text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, slug)
);

create table public.artifact_blocks (
  id uuid primary key default gen_random_uuid(),
  artifact_id uuid not null references public.artifacts(id) on delete cascade,
  position integer not null,
  block_type text not null check (block_type in ('heading','paragraph','image','file','link','decision','metric','assumption','reflection','peer_feedback')),
  content jsonb not null default '{}'::jsonb,
  unique(artifact_id, position)
);

alter table public.profiles enable row level security;
alter table public.email_preferences enable row level security;
alter table public.learning_paths enable row level security;
alter table public.challenge_days enable row level security;
alter table public.daily_problems enable row level security;
alter table public.skills enable row level security;
alter table public.challenge_skills enable row level security;
alter table public.entitlements enable row level security;
alter table public.learning_plans enable row level security;
alter table public.plan_days enable row level security;
alter table public.problem_responses enable row level security;
alter table public.artifacts enable row level security;
alter table public.artifact_blocks enable row level security;

create policy "published paths are public" on public.learning_paths for select using (status='published');
create policy "published days are public" on public.challenge_days for select using (status='published');
create policy "published problem content is public" on public.daily_problems for select using (exists(select 1 from public.challenge_days d where d.id=challenge_day_id and d.status='published'));
create policy "skills are public" on public.skills for select using (true);
create policy "challenge skill links are public" on public.challenge_skills for select using (true);

create policy "users read own profile" on public.profiles for select using (auth.uid()=id or handle is not null);
create policy "users update own profile" on public.profiles for update using (auth.uid()=id) with check (auth.uid()=id);
create policy "users insert own profile" on public.profiles for insert with check (auth.uid()=id);
create policy "users manage own email preferences" on public.email_preferences for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users read own entitlement" on public.entitlements for select using (auth.uid()=user_id);
create policy "users manage own plans" on public.learning_plans for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users access own plan days" on public.plan_days for all using (exists(select 1 from public.learning_plans p where p.id=plan_id and p.user_id=auth.uid())) with check (exists(select 1 from public.learning_plans p where p.id=plan_id and p.user_id=auth.uid()));
create policy "users manage own responses" on public.problem_responses for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users manage own artifacts" on public.artifacts for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "public artifacts are readable" on public.artifacts for select using (visibility='public');
create policy "artifact blocks follow artifact access" on public.artifact_blocks for select using (exists(select 1 from public.artifacts a where a.id=artifact_id and (a.user_id=auth.uid() or a.visibility='public')));
create policy "owners manage artifact blocks" on public.artifact_blocks for all using (exists(select 1 from public.artifacts a where a.id=artifact_id and a.user_id=auth.uid())) with check (exists(select 1 from public.artifacts a where a.id=artifact_id and a.user_id=auth.uid()));

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id) values(new.id) on conflict do nothing;
  insert into public.email_preferences(user_id) values(new.id) on conflict do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
