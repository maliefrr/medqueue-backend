-- Ensure schema exists
create schema if not exists medqueue;

-- Create role table first (auth_account references it)
create table if not exists medqueue.role (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp without time zone null,
  deleted_at timestamp without time zone null,
  role character varying not null,
  constraint role_pkey primary key (id)
) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS medqueue_role_role_key on medqueue.role using btree (role) TABLESPACE pg_default;

-- Create auth_account after role
create table if not exists medqueue.auth_account (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp without time zone null,
  deleted_at timestamp without time zone null,
  email character varying not null,
  password character varying null,
  role_id uuid not null,
  is_active boolean null,
  constraint auth_account_pkey primary key (id)
) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS auth_account_email_key ON medqueue.auth_account (email) TABLESPACE pg_default;

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'auth_account_role_id_fkey') THEN
    ALTER TABLE medqueue.auth_account ADD CONSTRAINT auth_account_role_id_fkey FOREIGN KEY (role_id) REFERENCES medqueue.role(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END$do$;

create table if not exists medqueue."user" (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp without time zone null,
  deleted_at timestamp without time zone null,
  name character varying null,
  email character varying not null,
  date_of_birth date not null,
  place_of_birth character varying not null,
  nik character varying not null,
  is_bpjs boolean not null,
  bpjs_number character varying null,
  blood_type character varying not null,
  phone_no character varying not null,
  auth_id uuid null,
  constraint user_pkey primary key (id)
) TABLESPACE pg_default;

create unique INDEX IF NOT EXISTS user_email_key ON medqueue."user" (email) TABLESPACE pg_default;
create unique INDEX IF NOT EXISTS user_nik_key ON medqueue."user" (nik) TABLESPACE pg_default;

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_auth_id_fkey') THEN
    ALTER TABLE medqueue."user" ADD CONSTRAINT user_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES medqueue.auth_account(id) ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END$do$;
