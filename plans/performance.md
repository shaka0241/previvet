# Informe Rendimiento — Core Web Vitals (6 ideas)

> Agente: especialista en rendimiento web. Auditoría del 2026-08-22.
> Severidades: 🔴 Alta · 🟡 Media · 🟢 Baja

## 1. Logo JPEG sobredimensionado servido completo — 🔴 ALTA
- **Problema:** `public/images/previvetlogo.jpeg` pesa 71,872 B y mide 1080×1080 px, pero se renderiza a 40×40 (`src/components/sections/navbar.tsx:21-27`) y es OG image (`src/app/layout.tsx:42`). Con `images.unoptimized: true` (`next.config.ts:6`) se sirve el archivo íntegro.
- **Propuesta:** Generar WebP/AVIF en 96×96 (nav) y 512×512 (OG); bajaría a <5 KB. Referencia en `src/content/data.ts:12`.

## 2. Navbar client component innecesario — 🔴 ALTA
- **Problema:** Todo el header es `"use client"` solo por el toggle móvil (`src/components/sections/navbar.tsx:1,8`). El logo y links desktop podrían ser server-rendered. El bundle cliente total es ~602 KB raw en chunks (verificado en `out/_next/static/chunks`: mayor chunk 227 KB).
- **Propuesta:** Extraer menú móvil a subcomponente client mínimo, o usar `<details>`/popover CSS; reduce hidratación temprana y mejora INP/TBT.

## 3. Turnstile: estrategia ya correcta, mantener — 🟡 MEDIA
- **Problema:** Ninguno grave. Riesgo residual: submit antes del token genera `turnstile_response` vacío (`contact-form.tsx:33`).
- **Propuesta:** Mantener `strategy="lazyOnload"` (`contact-form.tsx:51`) — evita competir por red/main-thread durante carga e interacción: óptimo para INP. No subir a `beforeInteractive`. Deshabilitar botón de envío hasta que el `token` esté listo. El formulario vive bajo el fold (`footer.tsx:19`), así que lazyOnload es idóneo.

## 4. Fuentes: ya óptimas, micro-ajuste — 🟡 MEDIA
- **Problema:** Ninguno relevante.
- **Propuesta:** Usa `next/font/google` self-hosted con preload automático (Inter 400/500, Montserrat 600/700 en `layout.tsx:2-16`): mejor que CDN externo (cero DNS extra, sin request a Google Fonts). Solo 4 pesos, subsets latin: bien. Ajustes menores: declarar `display: "swap"` explícito y verificar que solo Montserrat-700 bloquee el LCP del heading; nada más requerido.

## 5. CSS Tailwind v4 contenido — 🟢 BAJA
- **Problema:** Ninguno.
- **Propuesta:** Bundle único de 29,085 B sin comprimir (~7 KB gzip estimado): saludable para v4 con `@import "tailwindcss"` (`globals.css:1`). Temas vía `@theme inline` (líneas 8-16), sin CSS muerto evidente. Sin acción urgente; vigilar no introducir clases dinámicas arbitrarias masivas.

## 6. LCP textual: mantener sin imagen — 🟢 BAJA
- **Problema:** Ninguno hoy.
- **Propuesta:** El LCP es el `<h1>` Montserrat bold sobre gradiente CSS (`hero.tsx:11,6`): sin imagen compitiendo, render rápido tras font-load. `next/font` ya preloaded. Si algún día se añade imagen hero, usar `priority`. Hoy: no tocar.

---

## Resumen ejecutivo

| # | Idea | Prioridad | Acción |
|---|------|-----------|--------|
| 1 | Logo JPEG sobredimensionado (71 KB → <5 KB) | 🔴 Alta | Optimizar WebP |
| 2 | Navbar 100% client innecesario | 🔴 Alta | Split server/client |
| 3 | Turnstile lazyOnload correcto | 🟡 Media | Deshabilitar submit sin token |
| 4 | Fuentes óptimas | 🟡 Media | display swap explícito |
| 5 | CSS Tailwind saludable | 🟢 Baja | Sin acción |
| 6 | LCP textual rápido | 🟢 Baja | Sin acción |

**Contexto general:** solo 3 client components (navbar, species-tabs, contact-form); el JS está dominado por el runtime React, no por código de app.
