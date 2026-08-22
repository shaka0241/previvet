# Sistema de Diseño y Configuración UI (Tailwind CSS v4) — Vetline Nutrition

Este documento define cómo se mapea la identidad visual de Vetline Nutrition a los componentes usando **Tailwind CSS v4** en el proyecto real.

## 1. Tokens de Diseño (CSS — `@theme inline`)

En Tailwind CSS v4, la personalización del tema se realiza directamente en [`globals.css`](file:///Users/albertorojas/proyectos/previvet/src/app/globals.css) usando `@theme inline` — **no existe `tailwind.config.js`**.

### Colores

| Token                 | Valor       | Uso en Tailwind              | Significado                          |
| --------------------- | ----------- | ---------------------------- | ------------------------------------ |
| `--color-primary`     | `#0DB14B`   | `bg-primary`, `text-primary` | Verde Agro — crecimiento, salud      |
| `--color-secondary`   | `#1B365D`   | `bg-secondary`, `text-secondary` | Azul Veterinario — ciencia, confianza |
| `--color-warning`     | `#F5A623`   | `bg-warning`, `text-warning` | Dorado/Mostaza — alertas, acentos    |
| `--color-background`  | `#FFFFFF`   | `bg-background`              | Fondo principal                      |
| `--color-foreground`  | `#1F2937`   | `text-foreground`            | Texto principal (gray-800)           |

### Código CSS real

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #1f2937;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: #0db14b;
  --color-secondary: #1b365d;
  --color-warning: #f5a623;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;
}
```

## 2. Tipografía (Google Fonts via `next/font`)

Las fuentes se cargan y optimizan automáticamente mediante `next/font/google` en [`layout.tsx`](file:///Users/albertorojas/proyectos/previvet/src/app/layout.tsx):

| Fuente        | Uso               | Pesos   | Variable CSS         | Clase Tailwind  |
| ------------- | ------------------ | ------- | -------------------- | --------------- |
| **Montserrat**| Títulos (headings) | 600, 700| `--font-montserrat`  | `font-heading`  |
| **Inter**     | Cuerpo (body)      | 400, 500| `--font-inter`       | `font-sans`     |

## 3. Componentes Implementados

Todos los componentes están construidos con clases utilitarias de Tailwind CSS v4, sin librerías de UI externas.

### Botones (CTAs)

Definidos en [`buttons.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/ui/buttons.tsx):

*   **PrimaryButton:** `inline-block bg-secondary text-white font-bold py-3 px-6 rounded-md hover:bg-secondary/90 transition-colors`
*   **SecondaryButton:** `inline-block border-2 border-primary text-primary font-medium py-3 px-6 rounded-md hover:bg-primary/10 transition-colors`

Ambos son wrappers del componente `Link` de Next.js para navegación interna con hash anchors.

### Tarjetas de Beneficios (Cards)

Definidas en [`benefit-card.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/ui/benefit-card.tsx):

*   Contenedor: `bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col gap-4`
*   Íconos SVG inline mapeados por tipo (`minerals`, `energy`, `health`, `vitamins`)
*   Títulos con `font-heading font-bold text-xl text-secondary`

### Pestañas (Tabs) por Especie

Implementadas en [`species-tabs.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/species-tabs.tsx) como Client Component con `useState`:

*   Botones de pestaña: `px-4 py-2 rounded-full transition-colors` con estados activo (`bg-primary text-white`) e inactivo (`bg-white text-primary border border-primary`)
*   Panel con tarjetas en grid: `grid grid-cols-1 md:grid-cols-2 gap-6`
*   Cada tarjeta tiene borde lateral: `border-l-4 border-primary`

### Acordeón (Ciencia / Ingredientes)

Implementado en [`science.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/science.tsx) usando `<details>` nativo de HTML:

*   Contenedor: `group bg-white rounded-lg p-4 shadow-sm border border-gray-100`
*   Ícono animado: `transition-transform duration-300 group-open:rotate-45`
*   Sin dependencia de JavaScript para la funcionalidad de apertura/cierre

### Formulario de Contacto

Implementado en [`contact-form.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/contact-form.tsx):

*   Inputs: `border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary`
*   Manejo de estados: `idle` → `sending` → `success` / `error`
*   Integración con Web3Forms y Cloudflare Turnstile (carga lazy)

### Barra de Navegación (Navbar)

Implementada en [`navbar.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/navbar.tsx):

*   Fija en la parte superior: `fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm`
*   Menú móvil hamburguesa con toggle (`useState`) y cierre automático en `hashchange`
*   Logo con `next/image`: `h-10 w-auto rounded-md`

## 4. Dirección de Fotografía y Branding

*   **Logo:** [`previvetlogo.jpeg`](file:///Users/albertorojas/proyectos/previvet/public/images/previvetlogo.jpeg) — renderizado con `next/image` en el Navbar con `alt="Vetline Nutrition Logo"`
*   **Open Graph:** La misma imagen del logo se usa como `og:image` (512×512) en la metadata del layout