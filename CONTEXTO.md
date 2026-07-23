# Contexto del proyecto — EnLimpio (nombre a confirmar)

> Este archivo es el punto de entrada para cualquier asistente (Claude Code, etc.)
> que abra el proyecto. Resume qué estamos construyendo, qué se decidió y qué
> sigue. El detalle completo está en [`docs/design-doc.md`](docs/design-doc.md).
> Última actualización: 2026-07-03.

## Qué es

Producto que regala a un dueño de pyme/comercio un **estado de resultados (P&L)
mensual** armado a partir de sus datos "como estén" (Excel, fotos, papelitos,
WhatsApp, efectivo sin factura). El P&L gratis es la **puerta de entrada
comercial**: con él, el consultor entra a la empresa y después vende el servicio
mensual de análisis y herramientas/automatizaciones a medida.

No es un ERP. El posicionamiento es "capa de inteligencia sobre el caos
existente": software + criterio del consultor.

## Quiénes

- **Jonatan Dobal** (HemisferIA) — desarrollo e IA. Trabaja full-time en relación
  de dependencia (e-commerce con Tienda Nube + Tango); horas limitadas.
- **Pablo Rostein** — asesor financiero de pymes. Aporta la red de clientes, el
  criterio financiero y es el canal de venta. Es la cara humana del producto.

## Decisiones cerradas (2026-07-03)

1. **P&L gratis total.** Sin precio. El negocio está en el paso siguiente
   (servicio mensual + soluciones a medida).
2. **Canal = Pablo en mano** (clientes, feria, WhatsApp). La web es la
   herramienta compartible de Pablo, no tráfico frío.
3. **Privacidad:** los datos se guardan y no se comparten con nadie. Es la
   promesa pública en la web.
4. **Ningún P&L llega al dueño sin revisión humana.** La IA arma el borrador,
   Pablo valida y libera. Cuando la IA pruebe precisión (20-30 casos), la
   liberación se automatiza. La revisión es una etapa del pipeline que se apaga,
   no una limitación del producto.
5. **Marca nueva.** Nombre de trabajo: **EnLimpio** ("pasar en limpio"), a
   confirmar con Pablo. Alternativas: Numera, CuentasClaras, MiResultado.
6. **El nicho/rubro no se elige todavía.** Se decide tras 10-20 diagnósticos,
   viendo dónde el dato entra más limpio y el dolor es mayor.

## Qué se construye — la web, en dos entregas

Misma experiencia de lead en ambas; lo que cambia es qué trabajo se automatiza.

**Entrega 1 (1-2 semanas):**
- Landing con la promesa + compromiso de privacidad + Pablo como cara humana.
- Identidad por **magic link** (email/WhatsApp → link privado, sin contraseñas).
- Carga libre en 3 cajas: Ventas / Compras / Gastos (archivos, fotos, texto
  libre). El lead puede volver con su link a seguir cargando.
- Notificación a Jonatan/Pablo cuando alguien carga.
- Página de informe privada: P&L de 1 página + sección "lo que encontramos en tu
  negocio" (las soluciones a medida) + botón para agendar con Pablo.
- Detrás: la clasificación de datos la hace Jonatan a mano con IA. Cada caso real
  es el set de pruebas de la Entrega 2.

**Entrega 2 (se enchufa sin cambiar la web del lead):**
- Pipeline automático: IA clasifica ventas/compras/gastos, separa IVA, arma el
  borrador del P&L.
- Panel de Pablo con botón "aprobar y liberar".
- El checklist de dato mínimo de Pablo es la rúbrica de esa IA.

**Fuera de alcance v1:** multi-mes, stock, conciliación bancaria, facturación,
dashboards, cuentas con contraseña, self-service sin revisión.

## Sugerencia técnica (a validar al construir)

Next.js desplegado en Vercel; magic link para auth; subida de archivos a storage
privado; notificación por email/WhatsApp. **Leer la documentación vigente de cada
librería antes de escribir código** — no asumir APIs de memoria.

## Qué pasa esta semana (no depende del código)

- **Pablo:** ofrecer el diagnóstico gratis a **3 personas con nombre** (candidato
  obvio: el veterinario + 2 de feria/WhatsApp). Consigna: "mandame la info de
  junio como la tengas, en 72 hs te doy tu estado de resultados y lo leemos
  juntos". Si uno no responde en 48 hs, sumar un 4to.
- **Pablo:** redactar el párrafo de privacidad.
- **Jonatan:** armar la plantilla del P&L de 1 página + el checklist de dato
  mínimo, validados por Pablo.
- **Métrica de la semana:** cuántos de los 3-4 mandaron datos reales en 7 días.
  Esa cifra confirma o replantea la puerta de entrada.

## Pendiente técnico conocido

El prototipo previo de Jonatan tiene mal calculada la regla de "facturación
recomendada AFIP" (equilibrio IVA débito/crédito). Definir con Pablo la fórmula
correcta antes de usar esa feature. No bloquea la Entrega 1.

## Archivos

- [`docs/design-doc.md`](docs/design-doc.md) — documento de diseño completo
  (problema, evidencia de demanda, alternativas, criterios de éxito).
- [`docs/maqueta-enlimpio.pdf`](docs/maqueta-enlimpio.pdf) — maqueta de las 3
  pantallas para compartir con Pablo.
- [`docs/maqueta-enlimpio.html`](docs/maqueta-enlimpio.html) — fuente HTML de la
  maqueta.
