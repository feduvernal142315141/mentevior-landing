# Plan de mejoras UI/UX — MenteVior Landing "nivel dios"

> Basado en: auditoría completa de la landing (ago 2026), exploración del producto real
> (`~/front-office-mentevior`), análisis de 9 landings ABA competidoras (CentralReach,
> Rethink, Motivity, Raven Health, AlohaABA, Artemis, Theralytics, Hi Rasmus, SpectrumAi)
> y la spec original `~/front-office-mentevior/docs/design-prompt-landing.md`.

## Principios

- **Vender solo lo que existe en el código.** Sí: Improve with AI (AWS Bedrock), 5 métodos de
  data collection con gráficas automáticas, session notes 97153/97155/97156 con guía CASP,
  supervisión con % de cobertura, prior authorizations, billing/claims, roles dinámicos,
  white-label multi-tenant, template documents. **NO prometer:** portal de padres con login,
  EVV, payroll, app móvil nativa, telehealth con video integrado, SOC 2/certificaciones sin confirmar.
- La spec fuente de verdad del diseño es `design-prompt-landing.md` del front-office
  (copiarla a `docs/` de este repo). La paleta y el hero actuales ya la siguen.
- El hero ya es excelente; el trabajo es **nivelar el resto de la página a ese estándar**.

---

## Fase 0 — Deuda bloqueante de contenido y credibilidad (antes que cualquier píxel)

1. **Testimonial placeholder visible en producción** (`Testimonial.astro:12-14`): sustituir por
   cita de design partner real, o reconvertir la sección en "misión/por qué construimos MenteVior"
   (patrón Theralytics/Hi Rasmus: historia del fundador humaniza frente al gigante).
2. **TrustBar con barras grises** que parecen skeleton roto: reemplazar por **barra de métricas
   del producto** ("5 métodos de medición · 3 códigos CPT con guía CASP · 7 reportes PDF ·
   Roles ilimitados por clínica") hasta tener logos reales. Eliminar la afirmación
   "Trusted by ABA teams across the U.S." mientras no sea demostrable.
3. **Problem con `——` en las 3 estadísticas** (`Problem.astro:4-6`): usar cifras del sector con
   fuente, o rediseñar las cards sin slot numérico (icono + frase de dolor, lenguaje del sector:
   authorizations, claim denials, re-entry).
4. **Footer: 6 enlaces muertos** — crear páginas reales de Privacy Policy, Terms, HIPAA Notice
   (crítico para un producto que vende HIPAA) y About, o retirar los enlaces hasta tenerlas.
5. **"Sign in" apunta a `#demo`** (`Nav.astro:33-38`): apuntar a la URL real de la app
   (login multi-tenant) o eliminar el botón.
6. **CTA final es un `mailto:`**: sustituir por formulario de demo embebido (nombre, clínica,
   nº de clientes, email) o Calendly/Cal.com. Es la conversión de toda la página.
7. **"See how it works" con icono ▶ sin vídeo**: quitar el icono de play o grabar un
   screen-recording de 60-90s del flujo dato→nota→claim.

## Fase 1 — Nivelar el sistema de diseño

1. **Escala tipográfica pequeña**: crear `text-body-sm` / `text-caption` / `text-micro` y
   eliminar los ~15 tamaños arbitrarios (`text-[13.5px]`, `!text-[9.5px]`…).
2. **Tokens de espaciado y radio**: `--space-section` (py-72/128 consistente), `--radius-card: 20px`,
   `--radius-control: 12px`, `--radius-frame: 24px`; unificar FinalCta y Testimonial.
3. **Usar los tokens muertos o borrarlos**: el verde de éxito está hardcodeado 4 veces con
   4 luminosidades distintas → usar `--color-ok`; `#037ECC` literal en 4 SVG → `currentColor`/token.
4. **Componentes compartidos**: `<Section>` (wrapper max-w-1200 + padding), `<Card>` (feature-card
   con hover para TODAS las tarjetas incl. Pricing y Security), `<StatusChip>` (Signed/Met, hoy
   triplicado), `<Logo>` (hoy duplicado Nav/Footer). Eliminar los `!important`.
5. **Fuente**: `@fontsource-variable/inter/latin.css` (hoy carga 7 subsets), preload + font-display.

## Fase 2 — Navegación ampliada (más opciones de menú)

Estructura objetivo (patrón del sector + anclas nuevas):

- **Product** → dropdown: Data Collection · Session Notes · Supervision · Authorizations & Billing · Configurability (anclas a secciones)
- **Who it's for** → dropdown por rol: BCBA · RBT/BCaBA · Practice Owner · Billing/Admin (nueva sección, ver Fase 3)
- **AI** (nueva sección Improve with AI)
- **Security** · **Pricing** · **FAQ**
- Derecha: **Sign in** (URL real) + **Book a demo** (primario)
- Extras: scroll-spy con indicador de sección activa; skip-link; bajar el breakpoint del menú
  móvil a `md` o diseñar estado tablet (768-1023 hoy descuidado).

## Fase 3 — Completar y añadir secciones

Orden objetivo de la página:

1. **Hero** (ya excelente) — solo fix del icono play y del aria-hidden.
2. **Barra de métricas** (ex-TrustBar, ver Fase 0).
3. **Problem** con cifras reales.
4. **NUEVO — "How it works"**: 4 pasos animados del ciclo conectado
   *Collect → Document → Supervise → Bill* ("document once and everything else follows").
5. **FeaturePillars** (Clinical/Data/Operations): reemplazar el mockup dibujado de la fila 1
   por captura real de session note; stagger en los 12 bullets; recapturar
   `shot-authorization.png` a 2× (hoy 552px, se upscalea borroso).
6. **NUEVO — "Improve with AI"**: sección propia del botón AI de session notes (AWS Bedrock),
   con demo visual antes/después de una narrativa. Diferenciador 2026 obligatorio del sector
   que hoy la landing no menciona.
7. **Supervision** — arreglar geometría del medidor (62% de barra para "12.4%" con marca al
   "10%" en left:50% no cuadra) y animarlo on-scroll; añadir mini-CTA.
8. **NUEVO — "Built for every role"**: tabs o grid BCBA / RBT / Owner / Admin con lo que cada
   uno ve (idea más diferenciadora del análisis competitivo — Artemis ABA).
9. **Configurability** (cuña competitiva) — stagger de bullets, mini-CTA.
10. **Security** — hover en cards, iconografía más rica; sin sellos falsos.
11. **Pricing** — diferenciar los 3 tiers visualmente (los 3 dicen "Custom pricing"): feature-list
    diferenciada por tier, "desde X usuarios", CTAs distintos (Start basic / Book a demo / Talk to sales).
    El backend ya soporta basic/pro/enterprise.
12. **Testimonial o Misión** (Fase 0.1).
13. **NUEVO — FAQ** acordeón (5-7 preguntas: migración de datos, HIPAA, onboarding, precios,
    roles) + JSON-LD FAQPage.
14. **FinalCta** con formulario real.
15. **Footer** con enlaces vivos.

## Fase 4 — Motion "nivel dios" bajo el fold

Hoy el hero concentra ~90% del motion y la página se apaga tras el primer scroll.

1. **Stagger por ítem** en todos los grids (bullets, cards, pricing) — extender el
   IntersectionObserver actual con `--reveal-delay` por hijo (~60-80ms), o migrar a GSAP
   ScrollTrigger si se añaden efectos de pin/parallax seccional.
2. **Hover en toda tarjeta** (`translateY(-2px)` + sombra cian, hoy solo feature-card).
3. **Contadores animados** en la barra de métricas y estadísticas de Problem.
4. **Medidor de supervisión** que se llena on-scroll hasta el valor correcto.
5. **Transiciones de sección oscura**: entrada de Security/FinalCta con reveal del fondo índigo.
6. **`<noscript>` de seguridad**: hoy sin JS todo `.reveal` queda invisible (opacity:0).
7. Mantener el bloque `prefers-reduced-motion` ejemplar y extenderlo a lo nuevo.

## Fase 5 — A11y, SEO y performance

- **A11y**: quitar `aria-hidden` de visuales con alt descriptivo (Hero:93, FeaturePillars:91);
  contraste del footer (`text-white/40` ≈3.5:1 falla AA) y Problem (`text-ink-muted/60`);
  `:focus-visible` en botones on-dark, footer, cards; skip-link.
- **SEO**: OG image dedicada 1200×630 (hoy usa el logo cuadrado → preview rota en LinkedIn/Slack),
  canonical, `@astrojs/sitemap`, robots.txt, JSON-LD `SoftwareApplication` + `Organization` + `FAQPage`.
- **Performance**: subset latin de Inter, quitar `will-change` permanente, limpiar `raw-*.png`
  (~920 KB), resolver conflicto npm/yarn (borrar `package-lock.json`, gitignorar `.yarn/.pnp`).
- **Repo**: README real, commitear cambios pendientes.

## Orden de ejecución sugerido

| Sprint | Contenido | Impacto |
|---|---|---|
| 1 | Fase 0 completa | Elimina todo lo que hoy destruye credibilidad |
| 2 | Fase 1 + Fase 2 | Sistema nivelado + nav ampliada |
| 3 | Fase 3 (secciones nuevas: How it works, AI, Roles, FAQ; pricing y pillars) | La página "enamora" por contenido |
| 4 | Fase 4 + Fase 5 | Motion completo + pulido técnico |
