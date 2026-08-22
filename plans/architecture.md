# Informe Arquitectura y Calidad de Código (7 ideas + quick wins)

> Agente: especialista en arquitectura frontend y calidad de código. Auditoría del 2026-08-22.
> Severidades: 🔴 Alta · 🟡 Media · 🟢 Baja

## 1. Botón primario duplicado ×4 + merges frágiles de clases — 🔴 Alta
- **Problema:** El estilo primario se copia-pega en cuatro sitios en vez de reutilizar `PrimaryButton`: `buttons.tsx:16` (`bg-secondary text-white font-bold py-3 px-6 rounded-md hover:bg-secondary/90 transition-colors`), `navbar.tsx:41-45` (CTA "Cotizar" escritorio), `navbar.tsx:72-77` (versión móvil) y `contact-form.tsx:83` (submit). Agravante: `hero.tsx:21` pasa overrides (`text-white border-white hover:bg-white/10`) a `SecondaryButton`, que concatena `className` sin resolver conflictos (`buttons.tsx:35`) → clases contradictorias coexisten (`text-primary` vs `text-white`) y gana el orden de la hoja de estilos, no la intención del código.
- **Propuesta:** Usar `PrimaryButton` en los CTAs del navbar y en el submit del formulario (añadir props `as="button"` y `size`). Introducir helper `cn()` basado en tailwind-merge para que los overrides pisen clases de forma predecible. Un solo punto de verdad para el estilo primario.

## 2. Copy hardcodeado vs promesa de data.ts — 🔴 Alta
- **Problema:** `docs/project_structure.md:62` promete "Contenido: Centralizado en `src/content/data.ts` (no CMS)", pero hay copy disperso en componentes: H2s hardcodeados en `species-benefits.tsx:8` ("Beneficios por Especie"), `science.tsx:7` ("La Ciencia de nuestra Fórmula") y `presentations.tsx:8`; todo el texto del formulario en `contact-form.tsx:56,59-70,85,89,93`; párrafo completo en `footer.tsx:13-15`; "Cotizar" duplicado en `navbar.tsx:44` y `76`.
- **Propuesta:** Ampliar `data.ts` con objetos tipados: `sectionTitles` (los tres H2 faltantes), `contactForm` (labels, placeholders, botón, mensajes de éxito/error), `navbar.cta` y `footer.copy`, con sus interfaces en `types/index.ts`. Resultado: única fuente de verdad real, edición de copy sin tocar JSX y cumplimiento efectivo de la documentación existente.

## 3. Formulario monolítico: payload sin tipar, sin validación real — 🔴 Alta
- **Problema:** En `contact-form.tsx` toda la lógica vive en un solo componente: la línea 27 construye el payload con `Object.fromEntries(new FormData(form).entries())` — tipo `{[k:string]: FormDataEntryValue}`, sin contrato — y se envía tal cual (línea 33). La validación es solo nativa (`required`, `type="email"`, líneas 59-70); el teléfono no tiene patrón. Riesgos silenciosos: `WEB3FORMS_KEY ?? ""` (línea 6) falla en runtime si falta el env; con Turnstile `lazyOnload` (línea 51) el usuario puede enviar antes de que exista token y recibir un rechazo inexplicable. Sin timeout en el fetch (líneas 30-34) y mensajes de estado sin `aria-live` (líneas 88-95).
- **Propuesta:** Extraer `src/lib/contact.ts`: interfaz `ContactFormData`, funciones puras `validate()` y `buildPayload()`, y `submitContact()` con `AbortSignal.timeout`. Añadir guardas para key/token ausentes y `role="status"` a los mensajes.

## 4. Tipos débiles: `icon: string` en vez de union — 🟡 Media
- **Problema:** En `types/index.ts:7` `BenefitCard.icon` es `string` libre, pero solo existen cuatro keys válidas en el mapa `paths` de `benefit-card.tsx:1-21` (minerals, energy, health, vitamins). Un typo como `"mineral"` compila sin error y renderiza un SVG **vacío en silencio** (línea 34: `paths[icon]` → undefined), sin fallo en build ni lint. Lo mismo en línea 13: `SpeciesTab.id: string` admite cualquier valor pese a que `species-tabs.tsx:7` lo usa como estado discriminador. Y línea 16: el tipo anónimo `{ title; description }[]` duplica estructuralmente `ScienceBlock` (líneas 19-22) sin compartir nombre.
- **Propuesta:** Definir `type IconName = "minerals" | "energy" | "health" | "vitamins"` (idealmente derivado con `keyof typeof paths` moviendo el mapa a un módulo tipado), union para `id`, e interfaz nombrada `Benefit` reutilizada por `SpeciesTab` y `ScienceBlock`. El compilador pasa a detectar inconsistencias contenido↔componente.

## 5. Sin Prettier, husky ni CI — 🟡 Media
- **Problema:** No hay formateador configurado ni verificación automatizada; el script actual `"lint": "eslint"` (package.json línea 9) ejecuta ESLint sin argumentos apoyándose en el flat config.
- **Propuesta:** Añadir Prettier (+ plugin Tailwind para orden de clases) y un workflow mínimo de GitHub Actions (`ci.yml`) que en cada PR ejecute: `npm ci` → `npm run lint` → `tsc --noEmit` → `npm run build`. Verificar tras migrar que el script lint sigue resolviendo los archivos correctamente, o hacer explícito el patrón (`eslint .`). Con esto, cualquier regresión de tipos o linting se detecta en el PR y no en el deploy de Vercel.

## 6. Testing: cero tests; recomendación pragmática — 🟡 Media
- **Problema:** El riesgo de regresión actual se concentra en dos puntos: el mapeo ícono→SVG (`benefit-card.tsx` líneas 1-21) donde una key errónea en `data.ts` compila sin error pero renderiza un SVG vacío **en silencio**, y la lógica del formulario si se extrae.
- **Propuesta:** Para esta escala, e2e completo es sobre-ingeniería; no lo recomiendo hoy. Plan mínimo viable: (1) Vitest con 2 tests unitarios cuando exista `lib/contact.ts`: builder de payload y validación; (2) un test de integridad de contenido que verifique que cada `icon` usado en `benefitCards` existe como key del mapa `paths` de `benefit-card.tsx`; (3) el "test de humo" real ya lo cubre el CI de la idea 5 (`tsc + lint + next build`). No instalar Playwright/Jest ahora.

## 7. Deuda de plantilla Next.js y documentación desincronizada — 🟢 Baja
- **Problema:** Los 5 SVGs de plantilla (`public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) están **referenciados en ningún punto del código** (grep confirmado): son basura de create-next-app que se despliega a producción. Además, `docs/project_structure.md` línea 36 documenta una carpeta `src/components/seo/` "(vacío, reservado para componentes SEO futuros)" que **no existe** en disco (glob confirmado) — la doc promete estructura fantasma. En el mismo archivo, líneas 12-16, los SVGs sí están documentados como parte legítima del árbol.
- **Propuesta:** Eliminar los 5 SVGs y su entrada en `project_structure.md`. Crear la carpeta `src/components/seo/` o borrarla de la doc — decidir, pero alinear. Añadir a la doc una sección "Verificado contra código en commit X" para forzar su mantenimiento.

---

## Quick wins adicionales (consistencia entre secciones)

- **Doble import del mismo módulo:** `footer.tsx` líneas 1-2 importan `footerCta` y `siteConfig` en dos sentencias separadas del mismo `"@content/data"`.
- **Patrón de encabezado repetido 4 veces sin componente:** `<h2 className="font-heading font-bold text-3xl md:text-4xl text-secondary text-center">` idéntico en `science.tsx:7`, `species-benefits.tsx:7`, casi igual en `benefits.tsx:9` y `presentations.tsx:8` → extraer `SectionHeading({title, intro?})`.
- **Color mágico fuera de tokens:** `hero.tsx` línea 6 usa literal `to-[#2a4a7f]` en vez de un token en `globals.css`.

## Verificado sin hallazgos (para completitud)

| Aspecto | Veredicto |
|---|---|
| Uso de `any` | ✅ Ninguno (grep confirmado); `tsconfig.json:7` `"strict": true` |
| Props drilling / estado global | ✅ No aplica: `useState` local correcto; solo 3 client components bien delimitados (`project_structure.md:66` lo documenta fielmente) |
| Contenido server-rendered | ✅ Todo el copy es RSC estático, indexable |

---

## Resumen ejecutivo

| # | Idea | Prioridad | Esfuerzo |
|---|------|-----------|----------|
| 1 | Botón primario duplicado ×4 + merges frágiles | 🔴 Alta | S |
| 2 | Copy hardcodeado vs promesa de `data.ts` | 🔴 Alta | M |
| 3 | Formulario monolítico: payload sin tipar, sin validación real | 🔴 Alta | M |
| 4 | Tipos débiles: `icon: string` en vez de union, tipos anónimos duplicados | 🟡 Media | S |
| 5 | Sin Prettier, husky ni CI | 🟡 Media | S |
| 6 | Cero tests: plan pragmático diferido | 🟡 Media | S-M |
| 7 | Deuda de plantilla + docs drift | 🟢 Baja | XS |

**Orden sugerido de ejecución:** 5 → 1 → 4 → 7 (fundación barata), luego 2 → 3 (refactor de contenido y formulario juntos, ya que ambos tocan `data.ts`).
