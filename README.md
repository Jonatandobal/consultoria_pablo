# EnLimpio

Consultoría de organización de procesos + IA para pymes. El gancho es un
**diagnóstico financiero gratis** (estado de resultados en 72 h, revisado por
Pablo); a partir de los hallazgos se venden automatizaciones y consultoría.

## Contenido

| Archivo | Qué es |
|---|---|
| `index.html` | Landing pública de captación de leads. |
| `estimador.html` | Calculadora de horas/plata recuperables y áreas a automatizar. |
| `panel.html` | Panel interno para que Pablo revise cada caso rápido. |
| `data/casos.json` | Datos de ejemplo que consume el panel. |
| `maqueta-enlimpio.pdf` | Maqueta original de las 3 pantallas. |

## Antes de publicar: configurá el contacto

Reemplazá el número de WhatsApp de ejemplo por el real (con código de país,
sin `+` ni espacios) en **dos archivos**:

- `index.html` → constante `WHATSAPP`
- `estimador.html` → constante `WHATSAPP`

## Deploy a GitHub Pages (una sola vez)

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Con eso, cada push a `main` (o a la rama de trabajo) publica el sitio
   automáticamente vía `.github/workflows/pages.yml`.
3. Para dominio propio (`enlimpio.app`): Settings → Pages → Custom domain.

## Notas

- **Captación sin backend:** los formularios abren WhatsApp con un mensaje
  pre-armado. Para captar emails de verdad, conectar un servicio de formularios
  (Formspree, Getform) o un backend.
- **El panel es una versión de prueba:** los cambios de estado y notas se
  guardan solo en el navegador (localStorage) y usa datos de ejemplo. Para
  producción necesita login + base de datos real (recomendado: Supabase).
