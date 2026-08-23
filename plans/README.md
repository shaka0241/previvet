# Plan de mejoras — Vetline Nutrition · Nutravit ADE3 Plus (repo `previvet`)

> Informe generado por el comité de 5 agentes especialistas el 2026-08-22.
> Cada informe completo vive en su propio archivo de esta carpeta.

## ⏳ Pendiente al retomar (ver `acciones-legal-seguridad.md`)

1. **Fase B — Dashboards** (🚨 prioridad: el formulario está inoperativo en producción):
   Turnstile widget → endurecer Web3Forms → env vars en Vercel → redeploy → verificación (`npm run verify:deploy` + curls).
2. **Fase C — Legal**: pedir al cliente país objetivo + razón social/NIT/dirección/email ARCO-P → `/politica-de-privacidad` + checkbox de consentimiento (+ validación counsel local).
3. **Del cliente también**: fotografía producto/animales, testimonios, MOQ/países, registros sanitarios ICA/Senasa (se renderizan solos al llenar `data.ts`).

## Índice de informes

| Archivo | Agente | Hallazgos |
|---|---|---|
| [`ui-ux.md`](ui-ux.md) | Diseño UI/UX y conversión | 10 ideas |
| [`seo.md`](seo.md) | SEO técnico y on-page | 8 ideas |
| [`accessibility.md`](accessibility.md) | Accesibilidad WCAG 2.2 | 8 barreras |
| [`architecture.md`](architecture.md) | Arquitectura y calidad de código | 7 ideas + quick wins |
| [`performance.md`](performance.md) | Rendimiento Core Web Vitals | 6 ideas |
| [`legal.md`](legal.md) | Auditoría legal y protección de datos (ronda 2) | 6 hallazgos |
| [`ciberseguridad.md`](ciberseguridad.md) | Auditoría OWASP/ciberseguridad (ronda 2) | 6 hallazgos |
| [`acciones-legal-seguridad.md`](acciones-legal-seguridad.md) | Plan de remediación derivado de ambas auditorías | 3 fases |

**Total: 45 hallazgos accionables** (33 de ronda 1 ya ejecutados, 10 de ronda 2 ya ejecutados, 2 auditorías nuevas pendientes de plan).

---

## Síntesis del comité: temas transversales

Los 5 agentes coinciden en 4 problemas que cruzan disciplinas:

| Tema | Detectado por |
|---|---|
| **Tabs de especies rotas** (overflow móvil + ARIA incompleto + contenido Porcinos no indexable) | UI/UX, SEO, A11y |
| **Formulario débil** (sin labels ni estados anunciados, payload sin tipar/sin validación/timeout, confirmación pobre, submit antes del token Turnstile) | UI/UX, A11y, Arquitectura, Rendimiento |
| **WhatsApp fantasma** (el error del formulario lo promete, nadie lo implementa; además es el canal B2B que mejor convierte en LatAm) | UI/UX |
| **Verde primario en tensión**: falla contraste (A11y) pero es justo el color propuesto para rescatar el CTA del hero (UI/UX) | A11y, UI/UX |
| **Imágenes**: el único asset existente está sobredimensionado 27× y a la vez falta toda la fotografía comercial | SEO, Rendimiento, UI/UX |

---

## Plan de ejecución sugerido (consenso del comité)

### Fase 0 — Fundación (½ día) ✅ Completada (2026-08-22)
- [x] Oscurecer token `--color-primary` a `#0a7f38` en `globals.css` (arregla 6 fallos WCAG y desbloquea el CTA verde del hero) — *el pre-título del hero pasó a `text-green-400` para no perder contraste sobre el navy*
- [x] Añadir favicon/íconos (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`), `sitemap.ts` y `robots.ts`
- [x] Regla global `:focus-visible` en `globals.css`
- [x] Eliminar los 5 SVGs de plantilla (`public/*.svg`)
- [x] Optimizar logo a WebP (`logo-nav.webp` 96×96, 1.3 KB; `logo-512.jpg` para OG, 19 KB)
- [x] Prettier + workflow CI mínimo (`format:check → lint → tsc → build`)

### Fase 1 — Conversión (1 día) ✅ Completada (2026-08-22)
- [x] CTA hero en verde primario + segundo CTA convertido a enlace `wa.me` real (número vía `NEXT_PUBLIC_WHATSAPP_NUMBER`, helper en `src/lib/site.ts`; si no está configurado, cae al fallback `#contacto`)
- [x] Mismo enlace WhatsApp en navbar (ícono desktop + fila móvil), footer columna de contacto y mensaje de error del formulario
- [x] Panel de confirmación post-envío (check animado + SLA 24 h + botón WhatsApp) con `role="status"`; spinner + `min-w` en submit, micro-copy de privacidad, labels visibles y `role="alert"` en error
- [x] Skip link + `<main id="contenido">`

### Fase 2 — Indexabilidad y contenido (1 día) ✅ Completada (2026-08-22)
- [x] Tabs: renderizar ambos paneles siempre (atributo `hidden`) + patrón APG completo (flechas ←/→/Home/End, `aria-controls`, roving tabindex) + `flex-wrap` + targets ≥44px — *verificado: los 4 beneficios de Porcinos ahora existen en el HTML exportado*
- [x] Title con keywords producto, OG 1200×630 dedicada (`og-nutravit.jpg`, generada con marca), Twitter Card `summary_large_image`, canonical
- [x] JSON-LD `@graph` (Organization + WebSite + Product con imagen/url/categoría) — *verificado en el HTML exportado*
- [x] Bonus: alt funcional del logo (`Inicio — Vetline Nutrition`) + `href="#inicio"` con `id="inicio"` en el hero; pre-título del hero con keywords ("Núcleo nutricional para bovinos y porcinos")
- [ ] ⚠️ Pendiente cliente: fotografía de producto/animales y datos reales (teléfono WhatsApp, NIT, registro sanitario)

### Fase 3 — Calidad interna (1–2 días) ✅ Completada (2026-08-22)
- [x] Extraer `lib/contact.ts`: `ContactFormData` tipado, `parseContactForm()`, `validateContactForm()` (nombre, teléfono con regex, email opcional, mensaje), `submitContact()` con `AbortSignal.timeout(10s)` y guardas de access key; errores por campo con `aria-invalid` + `role="alert"`
- [x] Centralizar en `data.ts`: H2s (`sectionTitles`), copy completo del formulario (`contactForm`), intro/CTA del footer (`footerContent`), CTA del navbar (`siteConfig.ctaLabel`)
- [x] Unificar botones: helper `cn()` (tailwind-merge) + `primaryButtonClasses` compartido; navbar (desktop/móvil) y footer usan el estilo primario unificado; overrides del hero ahora resuelven sin conflictos
- [x] Union types: `IconName`, `SpeciesId`, `Benefit` compartido por `SpeciesTab`/`ScienceBlock`; mapa de paths con `satisfies Record<IconName, ReactNode>` — typos de íconos ahora fallan en compilación
- [x] Navbar split: solo `mobile-menu.tsx` es client component (~mínimo); logo, links y CTA server-rendered. Bonus a11y: aria-label dinámico, cierre con Escape/clic-fuera y devolución de foco
- [x] Componente `SectionHeading` para el patrón repetido ×4 (benefits, science, species-benefits)

---

## Métricas de éxito

- Lighthouse SEO 100 / Accessibility ≥95
- Contenido Porcinos visible en el HTML exportado (`view-source:`)
- LCP <1.8 s mantenido
- Leads vía WhatsApp medibles como canal

---

# Ronda 2 del comité (2026-08-22) — 10 ideas ejecutadas

| # | Agente | Idea | Estado |
|---|--------|------|--------|
| 1 | SEO | Sección FAQ (6 preguntas) + JSON-LD `FAQPage` vinculado al Product | ✅ |
| 2 | SEO | Páginas dedicadas `/bovinos` y `/porcinos` con canonical propio + sitemap 0.8 | ✅ |
| 3 | A11y | Errores de formulario con `id` + `aria-describedby` + resumen agrupado con enlaces-ancla (`role="alert"`) | ✅ |
| 4 | A11y | `prefers-reduced-motion` universal (spinner, acordeón, transiciones) | ✅ |
| 5 | UI/UX | Franja de prueba social bajo hero: cifras reales del producto; testimonios como estructura vacía pendiente cliente | ✅ |
| 6 | UI/UX | Sección "Cómo Comprar": 3 pasos + MOQ/países/registros sanitarios condicionales (pendiente cliente) | ✅ |
| 7 | Arq. | Vitest: 15 tests de `contact.ts`, `cn()`, `site.ts`; step "Unit tests" en CI | ✅ |
| 8 | Arq. | `not-found.tsx` + `global-error.tsx` en español con marca | ✅ |
| 9 | Perf. | Menú móvil con Popover API nativo (`popoverTarget`) — navbar 100% server, cero hidratación de menú; cierre por hashchange vía script inline vanilla | ✅ |
| 10 | Perf. | Presupuesto de bundle en CI (`check:bundle`, límite 220 KB gzip, actual: 202) + `verify:deploy` para compresión brotli + huérfano `previvetlogo.jpeg` eliminado | ✅ |

**Pendiente de datos del cliente:** testimonios reales (`data.ts → socialProof.testimonials`), pedido mínimo y países (`howToBuy.moq/countries`), registros sanitarios ICA/Senasa (`howToBuy.registries`). Los componentes ya renderizan estos bloques automáticamente al llenarlos.

