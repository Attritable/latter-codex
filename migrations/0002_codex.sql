create table if not exists characters (
  id text primary key,
  user_id text not null,
  name text not null,
  class_label text not null,
  level integer not null default 1,
  data text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists characters_user_id_idx on characters (user_id);

create table if not exists worlds (
  id text primary key,
  user_id text not null,
  name text not null,
  region text not null,
  data text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists worlds_user_id_idx on worlds (user_id);
