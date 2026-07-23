# EnLimpio

Consultoría de organización de procesos + IA para pymes. El gancho es un
**diagnóstico financiero gratis** (estado de resultados en 72 h, revisado por
Pablo); a partir de los hallazgos se venden automatizaciones y consultoría.

El detalle del negocio está en [`CONTEXTO.md`](CONTEXTO.md) y
[`docs/design-doc.md`](docs/design-doc.md).

## Entrega 1 (lo que hay acá)

App **Next.js 15 (App Router) + Supabase**. El flujo del lead:

1. **Landing** (`/`) — promesa, privacidad y Pablo como cara humana.
2. **Magic link** (`/acceso`, `/auth/confirm`) — email → link privado, sin contraseñas.
3. **Carga** (`/mi-negocio`) — 3 cajas (Ventas / Compras / Gastos): archivos, fotos y texto → Supabase Storage privado. Se puede volver con el link.
4. **Informe** (`/informe`) — P&L de 1 página + "lo que encontramos en tu negocio". **Solo se ve cuando Pablo lo libera** (RLS: `estado = 'liberado'`).
5. **Notificación** (`/api/notify`) — avisa a Pablo/Jonatan cuando un lead carga.

Fuera de alcance v1 (respetando el design-doc): multi-mes, stock, conciliación,
facturación, dashboards, pipeline IA automático y el panel "aprobar/liberar"
(Entrega 2). El estimador y el panel viejos quedaron parkeados en `legacy/`.

## Puesta en marcha

### 1. Supabase
1. Creá un proyecto en [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → pegá y ejecutá [`supabase/schema.sql`](supabase/schema.sql) (crea tablas, RLS y el bucket privado `cargas`).
3. **Project Settings → API** → copiá `Project URL`, `anon public key` y `service_role key`.
4. **Authentication → Providers → Email**: dejá habilitado el magic link.

### 2. Variables de entorno
Copiá `.env.example` a `.env.local` y completá los valores de Supabase.

### 3. Local
```bash
npm install
npm run dev      # http://localhost:3000
```

### 4. Deploy (Vercel)
1. Importá el repo en [vercel.com](https://vercel.com).
2. Cargá las mismas variables de entorno en el proyecto de Vercel
   (con `NEXT_PUBLIC_SITE_URL` = tu dominio de producción).
3. En Supabase → Authentication → URL Configuration, agregá tu dominio a
   **Redirect URLs** (`https://TU-DOMINIO/auth/confirm`).
4. Cuando esté andando, re-apuntá `enlimpio.dpdns.org` de GitHub Pages a Vercel.

## Cómo se libera un informe (Entrega 1, manual)
Pablo/Jonatan cargan el P&L en la tabla `informes` (por ahora desde el panel de
Supabase) con `estado = 'liberado'`. Recién ahí el lead lo ve en `/informe`.
En la Entrega 2 esto pasa a un panel con botón "aprobar y liberar".
