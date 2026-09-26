-- Portfolio case studies.
-- Run this once in Supabase → SQL Editor → New query. It is safe to run again.

-- ── Admins ──────────────────────────────────────────────────────────────────
-- Only users listed here can add or edit case studies.

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
-- No policies on purpose: nobody can read or change this table through the API.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ── Case studies ────────────────────────────────────────────────────────────

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  tagline text not null default '',
  category text not null default '',
  year text not null default '',
  role text not null default '',
  timeline text not null default '',
  team text not null default '',
  platform text not null default '',
  -- Illustration drawn when there is no cover image.
  kind text not null default 'mobile'
    check (kind in ('mobile', 'dashboard', 'commerce', 'system', 'abstract')),
  colors jsonb not null
    default '{"bg":"#3a2dff","bg2":"#8b6bff","ui":"#ffffff","accent":"#c9ff4a","ink":"#15123a"}',
  cover_url text,
  overview text not null default '',
  challenge text not null default '',
  quote text not null default '',
  approach jsonb not null default '[]',   -- [{ "title", "text" }]
  highlights jsonb not null default '[]', -- [{ "title", "text", "image" }]
  results jsonb not null default '[]',    -- [{ "value", "suffix", "label", "decimals" }]
  gallery jsonb not null default '[]',    -- [{ "url", "caption" }]
  learnings text not null default '',
  position integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists case_studies_touch on public.case_studies;
create trigger case_studies_touch
  before update on public.case_studies
  for each row execute function public.touch_updated_at();

alter table public.case_studies enable row level security;

grant select on public.case_studies to anon, authenticated;
grant insert, update, delete on public.case_studies to authenticated;

drop policy if exists "Read published case studies" on public.case_studies;
create policy "Read published case studies"
  on public.case_studies for select
  using (published or public.is_admin());

drop policy if exists "Admins add case studies" on public.case_studies;
create policy "Admins add case studies"
  on public.case_studies for insert to authenticated
  with check (public.is_admin());

drop policy if exists "Admins edit case studies" on public.case_studies;
create policy "Admins edit case studies"
  on public.case_studies for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins delete case studies" on public.case_studies;
create policy "Admins delete case studies"
  on public.case_studies for delete to authenticated
  using (public.is_admin());

-- ── Image storage ───────────────────────────────────────────────────────────
-- A public bucket: anyone can view the images, only admins can upload.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'case-studies',
  'case-studies',
  true,
  10485760, -- 10 MB
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do nothing;

drop policy if exists "Admins upload case study images" on storage.objects;
create policy "Admins upload case study images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'case-studies' and public.is_admin());

drop policy if exists "Admins replace case study images" on storage.objects;
create policy "Admins replace case study images"
  on storage.objects for update to authenticated
  using (bucket_id = 'case-studies' and public.is_admin())
  with check (bucket_id = 'case-studies' and public.is_admin());

drop policy if exists "Admins delete case study images" on storage.objects;
create policy "Admins delete case study images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'case-studies' and public.is_admin());

-- ── Make yourself an admin ──────────────────────────────────────────────────
-- 1. Authentication → Users → Add user → create your email + password.
-- 2. Replace the email below with yours and run just this statement:
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'you@example.com';
