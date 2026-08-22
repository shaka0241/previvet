# Arquitectura Estática, Segura y de Alto Rendimiento

Arquitectura real del proyecto **Vetline Nutrition** (repositorio interno: `previvet`) — un sitio estático (Jamstack) sin servidor propio, optimizado para velocidad de carga y seguridad.

## 1. Stack Tecnológico (Frontend)

| Capa          | Tecnología                                    | Versión |
| ------------- | --------------------------------------------- | ------- |
| **Framework** | Next.js (App Router — Static Export)          | 16.3.2  |
| **UI**        | React + React DOM                             | 19.2.8  |
| **Estilos**   | Tailwind CSS v4 (vía `@tailwindcss/postcss`)  | ^4      |
| **Tipado**    | TypeScript                                    | ^5      |
| **Linting**   | ESLint 9 (flat config) + `eslint-config-next` | ^9      |

### Modo de salida estática

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: "export", // genera HTML estático en /out
  images: {
    unoptimized: true, // requerido para static export
  },
};
```

_Justificación:_ Al generar HTML estático con `output: "export"`, el sitio se sirve desde CDN sin necesidad de un servidor Node.js, logrando tiempos de carga < 1s y costo de hosting cercano a cero.

### Tailwind CSS v4

El proyecto utiliza la nueva API de Tailwind v4 con el plugin PostCSS (`@tailwindcss/postcss`) y tokens definidos directamente en CSS con `@theme inline`:

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-primary: #0db14b;
  --color-secondary: #1b365d;
  --color-warning: #f5a623;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;
}
```

> **Nota:** En Tailwind v4 no existe `tailwind.config.js`. La personalización se hace mediante `@theme inline` en el archivo CSS o con el plugin de PostCSS.

## 2. Gestión de Formularios (Sin Backend Propio)

| Servicio                 | Propósito                                 |
| ------------------------ | ----------------------------------------- |
| **Web3Forms**            | Procesamiento de formularios vía API REST |
| **Cloudflare Turnstile** | Protección anti-bot invisible             |

**Implementación:** El componente [`contact-form.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/contact-form.tsx) es un Client Component (`"use client"`) que:

1. Envía los datos del formulario como JSON a `https://api.web3forms.com/submit`
2. Incluye el token de Cloudflare Turnstile para validación anti-spam
3. Las claves se configuran mediante variables de entorno (`NEXT_PUBLIC_WEB3FORMS_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`)

## 3. Infraestructura y Hosting (Despliegue Estático)

- **Hosting recomendado:** **Vercel** o **Cloudflare Pages**
  - Vercel tiene soporte nativo para Next.js 16. Con cada `git push`, construye los archivos estáticos y los distribuye globalmente en su Edge Network.
- **Dominio por defecto:** `vetlinenutrition.vercel.app` (configurable vía `NEXT_PUBLIC_SITE_URL`)

## 4. Capa de Red y Seguridad Front-End

- **DNS / CDN:** Cloudflare (mitigación DDoS, Edge Caching, protección gratuita)
- **Anti-Spam:** Cloudflare Turnstile integrado en el formulario de contacto (invisible en la mayoría de los casos)

## 5. SEO y Structured Data

El layout raíz ([`layout.tsx`](file:///Users/albertorojas/proyectos/previvet/src/app/layout.tsx)) exporta:

- **`metadata`**: Título, descripción, keywords, Open Graph (locale `es_LA`)
- **JSON-LD**: Schema `Product` con nombre de marca y producto

## 6. Flujo de Operación

1. **Visita:** El ganadero entra a la web, servida estáticamente vía Vercel/Cloudflare (< 1s de carga).
2. **Interacción:** Navega el sitio ultraligero estilizado con Tailwind CSS v4.
3. **Conversión:** Completa el formulario con un diseño limpio y profesional.
4. **Envío:** Web3Forms procesa la solicitud (con Turnstile validando que es humano) y envía el Lead al correo del equipo de Vetline Nutrition.
