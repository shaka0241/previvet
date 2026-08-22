# Plan de mejoras — Previvet (Nutravit ADE3 Plus)

> Informe generado por el comité de 5 agentes especialistas el 2026-08-22.
> Cada informe completo vive en su propio archivo de esta carpeta.

## Índice de informes

| Archivo | Agente | Hallazgos |
|---|---|---|
| [`ui-ux.md`](ui-ux.md) | Diseño UI/UX y conversión | 10 ideas |
| [`seo.md`](seo.md) | SEO técnico y on-page | 8 ideas |
| [`accessibility.md`](accessibility.md) | Accesibilidad WCAG 2.2 | 8 barreras |
| [`architecture.md`](architecture.md) | Arquitectura y calidad de código | 7 ideas + quick wins |
| [`performance.md`](performance.md) | Rendimiento Core Web Vitals | 6 ideas |

**Total: 39 hallazgos accionables.**

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

### Fase 1 — Conversión (1 día)
- [ ] CTA hero en verde primario + segundo CTA convertido a enlace `wa.me` real (número definido en `siteConfig`)
- [ ] Mismo enlace WhatsApp en navbar, footer columna de contacto y mensaje de error del formulario
- [ ] Panel de confirmación post-envío (check animado + SLA 24 h + botón WhatsApp) con `role="status"`
- [ ] Skip link + `<main id="contenido">`

### Fase 2 — Indexabilidad y contenido (1 día)
- [ ] Tabs: renderizar ambos paneles siempre (atributo `hidden`) + patrón APG completo (flechas, `aria-controls`) + `flex-wrap`
- [ ] Title con keywords producto, OG 1200×630 dedicada, Twitter Card, canonical
- [ ] JSON-LD `@graph` (Organization + WebSite + Product con imagen/url)
- [ ] ⚠️ Requiere cliente: fotografía de producto/animales y datos reales (teléfono, NIT, registro sanitario)

### Fase 3 — Calidad interna (1–2 días)
- [ ] Extraer `lib/contact.ts`: payload tipado, validación (incl. teléfono), timeout, guardas para env keys
- [ ] Centralizar en `data.ts` todo el copy disperso (H2s, form, footer)
- [ ] Unificar `PrimaryButton` + helper `cn()` (tailwind-merge); union type para íconos
- [ ] Navbar: separar menú móvil en client component mínimo (header server-rendered)
- [ ] Componente `SectionHeading` para el patrón repetido ×4

---

## Métricas de éxito

- Lighthouse SEO 100 / Accessibility ≥95
- Contenido Porcinos visible en el HTML exportado (`view-source:`)
- LCP <1.8 s mantenido
- Leads vía WhatsApp medibles como canal
