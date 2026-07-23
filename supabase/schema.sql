-- ============================================================================
-- EnLimpio — Esquema de base de datos (Entrega 1)
-- Ejecutar en Supabase: SQL Editor -> New query -> pegar todo -> Run.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. NEGOCIOS: un registro por lead (dueño de pyme). Ligado a su usuario auth.
-- ---------------------------------------------------------------------------
create table if not exists public.negocios (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  nombre        text,
  rubro         text,
  contacto      text,
  created_at    timestamptz not null default now(),
  unique (user_id)
);

alter table public.negocios enable row level security;

create policy "negocio: el dueño ve el suyo"
  on public.negocios for select
  using (auth.uid() = user_id);

create policy "negocio: el dueño crea el suyo"
  on public.negocios for insert
  with check (auth.uid() = user_id);

create policy "negocio: el dueño edita el suyo"
  on public.negocios for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 2. CARGAS: cada cosa que el lead sube (Ventas / Compras / Gastos).
--    Puede ser un archivo (file_path apunta al Storage) o texto libre.
-- ---------------------------------------------------------------------------
create table if not exists public.cargas (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  caja          text not null check (caja in ('ventas', 'compras', 'gastos')),
  nota          text,
  file_path     text,
  file_name     text,
  created_at    timestamptz not null default now()
);

alter table public.cargas enable row level security;

create policy "carga: el dueño ve las suyas"
  on public.cargas for select
  using (auth.uid() = user_id);

create policy "carga: el dueño crea las suyas"
  on public.cargas for insert
  with check (auth.uid() = user_id);

create policy "carga: el dueño borra las suyas"
  on public.cargas for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 3. INFORMES: el P&L de 1 página. Lo carga Pablo/Jonatan (service_role).
--    P3 del doc: el lead NUNCA ve un informe sin validar -> solo lee cuando
--    estado = 'liberado'.
-- ---------------------------------------------------------------------------
create table if not exists public.informes (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users (id) on delete cascade,
  mes                 text,
  ventas_netas        numeric default 0,
  costo_mercaderia    numeric default 0,
  gastos_comprobante  numeric default 0,
  gastos_efectivo     numeric default 0,
  hallazgos           jsonb default '[]'::jsonb,
  estado              text not null default 'borrador'
                        check (estado in ('borrador', 'en_revision', 'liberado')),
  revisado_por_pablo  boolean not null default false,
  liberado_at         timestamptz,
  created_at          timestamptz not null default now()
);

alter table public.informes enable row level security;

-- El dueño SOLO ve su informe cuando está liberado (revisión humana previa).
create policy "informe: el dueño ve el suyo si está liberado"
  on public.informes for select
  using (auth.uid() = user_id and estado = 'liberado');
-- (No hay policies de insert/update para el dueño: eso lo hace el service_role
--  desde el servidor / panel de Pablo, que bypassa RLS.)

-- ---------------------------------------------------------------------------
-- 4. STORAGE: bucket privado para los archivos que sube el lead.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('cargas', 'cargas', false)
on conflict (id) do nothing;

-- Cada usuario solo puede tocar archivos dentro de su propia carpeta {user_id}/...
create policy "cargas: subir a la propia carpeta"
  on storage.objects for insert
  with check (
    bucket_id = 'cargas'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "cargas: leer los propios"
  on storage.objects for select
  using (
    bucket_id = 'cargas'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "cargas: borrar los propios"
  on storage.objects for delete
  using (
    bucket_id = 'cargas'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
