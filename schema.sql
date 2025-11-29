-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  pcos_type text, -- e.g., 'insulin_resistant', 'inflammatory', etc.
  daily_carb_goal int,
  daily_protein_goal int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Foods Table (Master Database)
create table public.foods (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  brand text,
  barcode text unique, -- for scanning
  calories_per_100g numeric,
  protein_per_100g numeric,
  carbs_per_100g numeric,
  fat_per_100g numeric,
  fiber_per_100g numeric,
  sugar_per_100g numeric,
  glycemic_index numeric, -- Critical for PCOS
  source text, -- e.g., 'USDA', 'OpenFoodFacts', 'User'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Logs (What they ate)
create table public.food_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  food_id uuid references public.foods(id) not null,
  quantity_grams numeric not null,
  eaten_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.foods enable row level security;
alter table public.food_logs enable row level security;

-- Policies
create policy "Public foods are viewable by everyone" on public.foods
  for select using (true);

create policy "Users can insert their own logs" on public.food_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can view their own logs" on public.food_logs
  for select using (auth.uid() = user_id);
