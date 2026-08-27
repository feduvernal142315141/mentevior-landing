# Decisión pendiente: cómo agendar una demo (reemplazo de Calendly)

> **Estado:** abierta. Investigación hecha el 2026-08-26, sin cambios en código.
> El cliente **no tiene cuenta de Calendly y no la quiere**. Falta decidir a dónde
> apuntan los CTAs. Mientras tanto `CALENDLY_URL` sigue siendo un placeholder.

## Footprint del cambio

Los 6 CTAs salen de **un único punto**, así que cambiar de destino es barato:

| Archivo | Qué hay |
| --- | --- |
| `src/config.ts` | `CALENDLY_URL` — la constante que alimenta todo |
| `src/components/Nav.astro` | 2 CTAs (desktop + menú móvil) |
| `src/components/Hero.astro` | 1 CTA |
| `src/components/Pricing.astro` | 1 CTA |
| `src/components/FinalCta.astro` | 1 CTA |
| `src/components/Footer.astro` | 1 enlace de lista |
| `src/layouts/Layout.astro` | ~45 líneas del loader perezoso del popup de Calendly (`a[data-calendly]`) |

Lo que cambia entre opciones **no es el código, es qué le pasa al lead**.

## Restricción técnica

Astro está en **modo estático sin adaptador** (`astro.config.mjs` no declara `output`
ni adapter) → **no hay servidor ni API routes**. Un formulario necesita o bien el
servicio de forms del hosting, o bien un endpoint de terceros.

**No hay config de hosting en el repo** (ni `netlify.toml` ni `vercel.json`): el
destino de deploy sigue sin decidirse, y eso determina si el formulario sale gratis
y nativo o requiere un tercero.

## Opciones evaluadas

### A. Cal.com (open source) — $0
Sustituto directo de Calendly. Su plan free es más generoso (event types y calendarios
ilimitados; Calendly free da 1 y 1) y se puede autohospedar gratis.
El botón se queda en "Book a demo".
**Contra:** sigue siendo una cuenta de terceros y sigue exponiendo el calendario. Si
eso es justo lo que el cliente rechaza, no resuelve el problema.

### B. Formulario propio "Request a demo" — ⭐️ recomendada
Los botones abren `/demo` con un formulario corto: nombre, email de trabajo, clínica,
**nº de usuarios**, mensaje. El equipo responde y agenda por email o teléfono.
Los CTAs pasan de **"Book a demo"** a **"Request a demo"**.

- **Coste:** $0 en Netlify o Cloudflare Pages (forms incluidos). En otro hosting hace
  falta endpoint externo (Formspree / Web3Forms, free ~50 envíos/mes).
- **A favor:** cero dependencia de calendarios de terceros; control total del diseño;
  **califica** al lead en vez de solo agendarlo; engancha con la calculadora de
  asientos de `Pricing.astro` (el nº de usuarios se puede prellenar). Si mañana quiere
  agendado automático, el form redirige a un scheduler **sin volver a tocar ningún botón**.
- **Contra:** hay ida y vuelta; el lead no queda agendado solo.
- **Es el patrón del sector:** CentralReach (https://centralreach.com/book-demo/) usa
  "Book a Consultation" con formulario de calificación, no un calendario abierto. Los
  campos exactos no se pudieron leer porque el form carga dinámicamente.

### C. Google Calendar Appointment Schedule — $0
Si el cliente ya tiene Gmail o Workspace, **ya lo tiene incluido**, sin cuenta nueva.
El botón sigue diciendo "Book a demo" pero navega a la página de Google (no hay popup
embed equivalente al de Calendly).
**Contra:** en cuenta free solo **1 booking page** y **sin recordatorios automáticos
por email** — para un flujo de ventas eso duele.

### D. Sin agenda: contacto directo — $0
El botón pasa a "Talk to sales" con `mailto:` o WhatsApp. Cero infraestructura.
**Contra:** la peor conversión de las cuatro, y duplicaría los `mailto:` que ya existen
en `Pricing.astro` y `Footer.astro`.

## Recomendación

**Opción B.** Es la única que no depende de que el cliente mantenga una cuenta ni un
calendario de terceros — que es literalmente su objeción — y captura información de
calificación que un scheduler no da.

### Advertencia HIPAA
**Nada de PHI en el formulario.** El producto se vende como HIPAA-compliant; el campo
de texto libre debe llevar un aviso explícito de "no incluyas información de pacientes".
Los servicios de forms gratuitos **no firman BAA**.

## Qué falta para ejecutar

1. **Por qué el cliente descarta Calendly.** Si es solo coste → A o C lo resuelven gratis
   manteniendo el agendado automático. Si es "no quiero cuentas de terceros" o "no quiero
   exponer mi agenda" → B, y A y C quedan descartadas.
2. **Dónde se despliega.** Netlify/Cloudflare → form nativo y gratis. Otro hosting →
   endpoint externo.
3. **Qué pasa tras el envío.** ¿Respuesta manual por email, o redirección a alguna agenda?

## Fuentes

- Cal.com vs Calendly — https://koalendar.com/blog/calcom-vs-calendly
- Cal.com pricing 2026 — https://schedulingkit.com/pricing-guides/cal-com-pricing
- Google Calendar appointment schedules — https://support.google.com/calendar/answer/10729749
- Límites en cuentas free de Google — https://www.onecal.io/blog/how-to-use-google-calendar-appointment-schedule
