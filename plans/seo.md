# Informe SEO — Técnico y on-page (8 ideas)

> Agente: especialista en SEO. Auditoría del 2026-08-22.
> Verificaciones previas: `src/app/` contiene solo `globals.css`, `layout.tsx` y `page.tsx`; `public/` solo tiene SVGs de plantilla y el logo; no existen `sitemap`, `robots`, `manifest`, `icon*`, `opengraph-image` ni `favicon`.

## 🔴 PRIORIDAD ALTA

### 1. No existen `sitemap.xml` ni `robots.txt`
- **Problema:** No hay `src/app/sitemap.ts` ni `src/app/robots.ts`. El sitio exporta una sola página pero los buscadores no reciben ni mapa del sitio ni directivas de rastreo (y cada petición a `/robots.txt` devuelve 404, lo que queda registrado en Search Console como error).
- **Propuesta:** Crear ambos archivos en `src/app/` — con `output: "export"` (`next.config.ts:4`) Next.js los genera como archivos estáticos `/sitemap.xml` y `/robots.txt` en tiempo de build. El sitemap debe usar `metadataBase` como dominio base; el robots debe permitir todo y declarar `Sitemap: {URL}/sitemap.xml`. Tras el deploy, dar de alta la propiedad en Google Search Console y enviar el sitemap.

### 2. Sin favicon, íconos de app ni manifest: 404 y cero branding en resultados
- **Problema:** No existe `favicon.ico` ni en `src/app/` ni en `public/` (el directorio público solo tiene `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — restos de plantilla). `layout.tsx` tampoco define `icons` ni `manifest` en metadata. Resultado: petición a `/favicon.ico` → 404, y la pestaña del navegador/SERP muestra el ícono genérico.
- **Propuesta:** Generar desde el logo los íconos estándar y colocarlos según convención del App Router: `src/app/favicon.ico` (32×32), `src/app/icon.png` (512×512), `src/app/apple-icon.png` (180×180). Next los detecta automáticamente e inyecta los `<link>` correspondientes. Opcional: `src/app/manifest.ts` con nombre, colores de marca (#1B365D fondo, #0DB14B acento) e ícono — refuerza presencia en móvil.

### 3. Open Graph con imagen incorrecta y sin Twitter Card ni canonical
- **Problema:** En `layout.tsx`: la imagen OG es el logo cuadrado 512×512 (línea 42) — al compartir en WhatsApp/LinkedIn/Facebook se ve recortada o minúscula porque las plataformas esperan 1200×630. No existe ningún bloque `twitter` (no hay `twitter:card`), y falta `alternates.canonical` pese a que `metadataBase` sí está definido (líneas 19-21).
- **Propuesta:** Crear imagen OG dedicada de 1200×630 (producto + claim + logo, exportada como PNG/JPG <300 KB dado que `images.unoptimized: true`) y apuntar `images[0].url` a ella. Añadir `twitter: { card: "summary_large_image", title, description, images }` y `alternates: { canonical: "/" }`. Con `metadataBase` presente, Next resuelve las URLs absolutas automáticamente.

### 4. El contenido "Porcinos" no existe en el HTML exportado
- **Problema:** `species-tabs.tsx` es un Client Component con `useState` (línea 7) y solo renderiza el panel activo (líneas 34-45). En el HTML estático exportado únicamente están indexables los 4 beneficios de **Bovinos**; los 8 textos de Porcinos (partos más rápidos, lechones más pesados, E. coli/Salmonella…) no existen para Google hasta un clic. Se pierde todo el valor semántico de esa mitad del contenido. (El acordeón de `science.tsx` no sufre esto: `<details>` mantiene el texto en el DOM.)
- **Propuesta:** Renderizar ambos paneles siempre en el DOM ocultando el inactivo con el atributo `hidden` (o `display:none`) en vez de condicional de render `{active === t.id && …}`. Mismo estado visual para el usuario, contenido 100% presente en el HTML exportado. Alternativa: convertir a tabs CSS-only con radio buttons.

### 5. JSON-LD incompleto: Product sin imagen ni oferta, y sin Organization
- **Problema:** El único schema (`layout.tsx`, líneas 46-53) es un `Product` mínimo: sin `image`, sin `sku`, sin `offers`, sin `url`. No existe ningún nodo `Organization` (Vetline Nutrition no tiene entidad estructurada: sin logo, sin contacto, sin `sameAs`) ni `WebSite`. Además el script va suelto en el body en lugar de un `@graph` cohesionado.
- **Propuesta:** Reestructurar como `"@graph"` con tres nodos referenciados entre sí: `Organization` (nombre, logo, URL, `contactPoint` con teléfono/WhatsApp, `sameAs` con redes si existen), `WebSite` y `Product` (añadir `image`, `url`, `category: "Animal Nutrition Supplement"`, y `brand` apuntando al nodo Organization). Al ser producto cotizable sin precio público, omitir `offers` es correcto — pero añadir `image` y `url` ya habilita mejor comprensión semántica.

## 🟡 PRIORIDAD MEDIA

### 6. H1 y `<title>` sin las keywords comerciales del producto
- **Problema:** El H1 es "Nutrición Integral que Transforma tu Ganadería." (`data.ts` línea 22, renderizado en `hero.tsx` línea 11): **no menciona el producto ni las especies** — cero coincidencia con lo que buscaría el cliente ("suplemento/núcleo nutricional bovinos porcinos"). El `<title>` es "Vetline Nutrition \| Nutravit ADE3 Plus" (`layout.tsx` línea 23): marca primero cuando nadie busca aún la marca.
- **Propuesta:** Invertir el orden del title: "Nutravit ADE3 Plus – Núcleo Nutricional para Bovinos y Porcinos \| Vetline Nutrition" (~70 caracteres). Enriquecer el pre-título del hero (`data.ts` línea 21) con las keywords ("Núcleo nutricional vitamínico-mineral para bovinos y porcinos") manteniendo el H1 emocional actual.

### 7. Dominio de reserva en producción y assets pesados por `unoptimized`
- **Problema:** Si `NEXT_PUBLIC_SITE_URL` no está definida en el entorno de producción, `metadataBase` cae a `https://previvet.vercel.app` (`layout.tsx` líneas 19-21) — canonical y OG URLs apuntarían al dominio equivocado. Además, `images.unoptimized: true` (`next.config.ts` línea 6) sirve los originales: el logo pesa ~71 KB para mostrarse a 40×40 px.
- **Propuesta:** Definir `NEXT_PUBLIC_SITE_URL=https://dominio-final.com` en Vercel antes de lanzar y verificar el HTML exportado. Comprimir el logo actual (WebP/AVIF, versión 80×80 @2x ≈ <5 KB) y establecer regla interna: toda imagen futura optimizada manualmente a WebP con dimensiones exactas de render.

## 🟢 PRIORIDAD BAJA

### 8. Único alt text mejorable + decisiones pendientes i18n/LATAM
- **Problema:** La única imagen del sitio (logo en `navbar.tsx` línea 23) usa `alt="Vetline Nutrition Logo"` — aceptable pero genérico. Y aunque `html lang="es"` está bien puesto (línea 59), no hay estrategia definida si Vetline apunta a varios países (Colombia, Ecuador, Centroamérica): una sola URL `es` no necesita hreflang todavía, pero el OG ya declara `locale: "es_LA"` (línea 41) mezclando criterios.
- **Propuesta:** Ampliar el alt a algo descriptivo con marca y rubro ("Logo de Vetline Nutrition — nutrición animal") y dejar documentado en `data.ts` el patrón de alts para las futuras fotos de producto (descriptivos en español, con especie y formato: "Bolsa de 20 kg de núcleo Nutravit ADE3 Plus para porcinos"). Decidir ahora la arquitectura internacional: si habrá subcarpetas `/co/`, `/ec/`, implementar `alternates.languages` con hreflang recíproco; si será una sola página regional, mantener `es`.

---

## Resumen ejecutivo

| # | Idea | Prioridad | Área |
|---|------|-----------|------|
| 1 | Crear sitemap.ts + robots.ts | 🔴 Alta | Indexación |
| 2 | Favicon + iconos + manifest | 🔴 Alta | Branding/crawl |
| 3 | OG 1200×630 + Twitter Card + canonical | 🔴 Alta | Metadata/compartir |
| 4 | Contenido "Porcinos" fuera del HTML | 🔴 Alta | Contenido indexable |
| 5 | JSON-LD @graph Organization+Product | 🔴 Alta | Datos estructurados |
| 6 | Keywords en title y pre-título | 🟡 Media | On-page |
| 7 | NEXT_PUBLIC_SITE_URL + peso de imágenes | 🟡 Media | Config/Velocidad |
| 8 | Alt texts + estrategia hreflang LATAM | 🟢 Baja | Imágenes/i18n |

**Lo más grave:** las ideas 1-4 son defectos objetivos (archivos faltantes y contenido invisible para el crawler), resolubles todas en una sola sesión. El punto #4 es el único que afecta directamente al posicionamiento por keywords de producto.
