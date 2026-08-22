# Informe Accesibilidad — WCAG 2.2 (8 barreras)

> Agente: especialista en accesibilidad web. Auditoría del 2026-08-22.
> Severidades: 🔴 Crítica · 🟠 Alta · 🟡 Media

## 1. Contraste insuficiente del verde primario `#0db14b` — 🔴 CRÍTICA
- **Problema:** el token de `globals.css:11` tiene ~2.8:1 contra blanco (mínimo 3:1 para texto grande). Fallos en: `species-tabs.tsx:21` (tab activa `bg-primary text-white`), `species-tabs.tsx:22` (tab inactiva `text-primary` sobre blanco), `presentations.tsx:7-16` (texto blanco sobre gradiente primary), `contact-form.tsx:89` (mensaje éxito sobre tarjeta blanca), `benefit-card.tsx:34` y `science.tsx:19` (iconos/"+" verdes, fallan 1.4.11), y `hero.tsx:8` (`preTitle` verde 14px sobre navy ≈4.27:1).
- **WCAG:** 1.4.3 Contrast (Minimum) AA · 1.4.11 Non-text Contrast AA.
- **Solución:** oscurecer una sola vez el token en `globals.css` a un verde ≥4.5:1 manteniendo el tono (p. ej. `#0a7f38`, ~5.1:1); corrige seis fallos en cinco archivos. Alternativa parcial: `text-secondary` (#1b365d, 12.6:1) para textos.

## 2. Tabs de especies sin teclado ni asociación ARIA — 🔴 CRÍTICA
- **Problema:** `species-tabs.tsx:14-27` — tabs con `role="tab"`/`aria-selected` pero **sin `id` ni `aria-controls`**; panel `role="tabpanel"` (líneas 30-32) **sin `aria-labelledby`** ni nombre accesible → relación rota. Sin navegación por flechas ni roving tabindex (patrón APG). Al cambiar de tab (línea 18) el contenido se reemplaza sin mover foco ni anunciarlo.
- **WCAG:** 4.1.2 Name, Role, Value AA · 2.1.1 Keyboard A · 1.3.1 Info and Relationships A.
- **Solución:** añadir `id={\`tab-${tab.id}\`}` + `aria-controls="panel-especie"` a cada tab; al panel `id="panel-especie"` + `aria-labelledby={active}` + `tabIndex={-1}`; implementar roving tabindex con `onKeyDown` (ArrowLeft/Right/Home/End).

## 3. Formulario sin labels visibles ni estados anunciados — 🟠 ALTA
- **Problema:** `contact-form.tsx:59-70` — los 4 campos usan solo `placeholder` + `aria-label`; **cero `<label>` visibles**, nombres inconsistentes ("Teléfono / WhatsApp" vs `"Teléfono"`; "Correo electrónico" vs `"Correo"`); faltan `autoComplete="name|tel|email"`. Líneas 88-95 — mensajes de éxito/error como `<p>` simples **sin `role="status"` ni `aria-live`**; sin `aria-busy` durante "Enviando..." (líneas 80-86).
- **WCAG:** 3.3.2 Labels or Instructions A · 1.3.5 Identify Input Purpose AA · 4.1.3 Status Messages AA.
- **Solución:** `<label htmlFor>` visible por campo; `autoComplete`; convertir mensajes a `<p role="status">` (éxito) y `role="alert"` (error); `aria-busy={status === "sending"}`.

## 4. Ausencia total de skip link — 🟠 ALTA
- **Problema:** ni `layout.tsx` ni `page.tsx` contienen enlace de salto. Con navbar fija de 4+ enlaces (`navbar.tsx:18-46`), el usuario de teclado debe recorrerlos todos en cada pasada. `<main>` (`page.tsx:13`) carece de `id`.
- **WCAG:** 2.4.1 Bypass Blocks A.
- **Solución:** primer elemento enfocable del body: `<a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-secondary focus:text-white focus:p-3">Saltar al contenido</a>`, con `<main id="contenido" tabIndex={-1}>`.

## 5. Menú móvil: foco perdido al cerrar, sin Escape/click-fuera — 🟠 ALTA
- **Problema:** `navbar.tsx:50` — `aria-label="Abrir menú"` fijo aunque esté abierto (SVG hamburguesa, línea 55, sin `aria-hidden`). Línea 13: solo se cierra con `hashchange`; **sin Escape ni clic fuera**, panel sin vínculo `aria-controls`. Al navegar desde el menú, éste se desmonta (línea 65) con el foco dentro → **el foco salta al `<body>`** y el usuario pierde su posición.
- **WCAG:** 2.1.1/2.1.2 Keyboard A · 4.1.2 Name, Role, Value AA · 2.4.3 Focus Order A.
- **Solución:** `aria-label={open ? "Cerrar menú" : "Abrir menú"}`; id + `aria-controls` en botón/panel; cerrar con `keydown` Escape y clic fuera; devolver foco al botón tras cerrar por navegación; `aria-hidden` + `focusable={false}` en el SVG.

## 6. Focus visible débil o anulado — 🟡 MEDIA
- **Problema:** cero estilos `focus-visible` en todo `src/`: tabs (`species-tabs.tsx:14-27`), enlaces del nav y summary del acordeón (`science.tsx:17`) dependen del outline nativo. En el formulario, `contact-form.tsx:44` usa `focus:outline-none focus:ring-primary`: anillo verde #0db14b sobre blanco = 2.8:1 < 3:1 → indicador insuficiente.
- **WCAG:** 2.4.7 Focus Visible AA · 1.4.11 Non-text Contrast AA.
- **Solución:** regla global en capa base de Tailwind v4 (`@layer base { :focus-visible { outline: 2px solid var(--color-secondary); outline-offset: 2px; } }`) y sustituir `ring-primary` por `ring-secondary` (12.6:1).

## 7. SVGs decorativos + alt no funcional — 🟡 MEDIA
- **Problema:** los iconos SVG decorativos (p. ej. check del formulario) van inline sin `aria-label`, por lo que se anuncian como gráfico vacío redundante. `navbar.tsx:20-27` — el logo va dentro de `<a href="#">` con alt `"Vetline Nutrition Logo"`: describe la imagen pero **no el destino del enlace**, además de que el enlace carece de nombre funcional ("Inicio").
- **WCAG:** 1.1.1 Non-text Content A.
- **Solución:** `aria-hidden="true"` + `focusable={false}` en ambos SVGs; en el logo-enlace usar `alt="Inicio — Vetline Nutrition"` y `href="#inicio"` con id correspondiente en la sección hero.

## 8. Targets táctiles ajustados en tabs y navegación — 🟡 MEDIA
- **Problema:** `species-tabs.tsx:19` — botones `px-4 py-2` → altura ~40px; cumplen el mínimo AA (24px) pero quedan por debajo de los 44px recomendados en móvil, siendo el control principal de la sección. `navbar.tsx:32-39` — enlaces desktop sin padding vertical (~24px de alto), salvados solo por `gap-8`; en menú móvil `py-2` (~40px, línea 68). El summary del acordeón (`science.tsx:17`) sí supera 44px gracias a `p-4`.
- **WCAG:** 2.5.8 Target Size (Minimum) AA · 2.5.5 Target Size (Enhanced) AAA (referencia).
- **Solución:** en tabs y enlaces de nav móvil: `inline-flex min-h-[44px] items-center justify-center px-5 py-3`; en nav desktop añadir `py-3` manteniendo el gap.

---

## ✅ Verificado conforme (sin acción)
- **`lang="es"`** correcto en `<html>` (`layout.tsx:59`) ✓
- **Acordeón nativo `details/summary`** (`science.tsx:13-24`) conserva semántica de disclosure accesible ✓ *(detalle cosmético: `list-none` no elimina el triángulo en WebKit/Safari; añadir `summary::-webkit-details-marker { display:none }`)*
- **`scroll-mt-16`** compensa la navbar fija en todas las anclas ✓
- Jerarquía h1→h2→h3 correcta; `text-gray-600`, `red-600`, `secondary/white` pasan contraste ✓

## Resumen ejecutivo

| # | Barrera | Severidad | WCAG |
|---|---------|-----------|------|
| 1 | Contraste verde primario (#0db14b) | Crítica | 1.4.3, 1.4.11 |
| 2 | Tabs sin teclado ni ARIA completo | Crítica | 4.1.2, 2.1.1 |
| 3 | Formulario sin labels/estados anunciados | Alta | 3.3.2, 4.1.3 |
| 4 | Sin skip link | Alta | 2.4.1 |
| 5 | Menú móvil pierde foco / sin Escape | Alta | 2.1.1, 4.1.2 |
| 6 | Focus visible débil o ausente | Media | 2.4.7, 1.4.11 |
| 7 | SVGs decorativos + alt no funcional | Media | 1.1.1 |
| 8 | Targets táctiles < 44px | Media | 2.5.8 |

Los ítems 1 y 2 concentran el mayor impacto real de usuario (toda la sección de especies es ilegible para baja visión e inoperable por teclado). El fix del token de color (ítem 1) es el de mejor relación esfuerzo/beneficio: un cambio en `globals.css` resuelve seis fallos distribuidos en cinco archivos.
