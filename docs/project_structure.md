# Estructura del Proyecto (Next.js 16 + Tailwind CSS v4)

Este documento refleja la estructura real del proyecto **Vetline Nutrition** (repositorio interno: `previvet`) — una landing page estática construida con **Next.js 16 (App Router, static export)** y **Tailwind CSS v4** puro, sin librerías de componentes externas.

## 1. Árbol de Directorios

```text
previvet/
├── public/                          # Archivos estáticos servidos tal cual
│   └── images/
│       ├── logo-nav.webp            # Logo optimizado para navbar (96×96)
│       ├── logo-512.jpg             # Logo optimizado para JSON-LD (512×512)
│       └── og-nutravit.jpg          # Imagen Open Graph (1200×630)
├── src/
│   ├── app/                         # App Router de Next.js 16
│   │   ├── globals.css              # Estilos globales + tokens Tailwind v4 (@theme inline)
│   │   ├── layout.tsx               # Root Layout (fuentes, metadata, JSON-LD)
│   │   ├── page.tsx                 # Página principal — ensambla todas las secciones
│   │   ├── sitemap.ts               # Genera /sitemap.xml en el build estático
│   │   ├── robots.ts                # Genera /robots.txt en el build estático
│   │   ├── favicon.ico              # Favicon (16/32/48 px)
│   │   ├── icon.png                 # Ícono moderno 512×512
│   │   └── apple-icon.png           # Ícono Apple Touch 180×180
│   ├── components/
│   │   ├── sections/                # Secciones completas de la landing
│   │   │   ├── navbar.tsx           # Barra de navegación fija con menú móvil
│   │   │   ├── hero.tsx             # Cabecera principal con CTAs
│   │   │   ├── benefits.tsx         # Grid de tarjetas de beneficios
│   │   │   ├── species-benefits.tsx # Contenedor de pestañas por especie
│   │   │   ├── species-tabs.tsx     # Pestañas interactivas (Bovinos / Porcinos)
│   │   │   ├── science.tsx          # Acordeón de ingredientes (<details>)
│   │   │   ├── presentations.tsx    # Presentación y dosificación
│   │   │   └── footer.tsx           # Footer con CTA de contacto vía WhatsApp
│   │   └── ui/                      # Componentes base reutilizables
│   │       ├── benefit-card.tsx     # Tarjeta de beneficio con ícono SVG inline
│   │       └── buttons.tsx          # PrimaryButton y SecondaryButton (wrappers de Link)
│   ├── content/
│   │   └── data.ts                  # Todo el contenido textual (copy) centralizado
│   └── types/
│       └── index.ts                 # Interfaces TypeScript (SiteConfig, BenefitCard, etc.)
├── docs/                            # Documentación del proyecto
│   ├── architecture.md
│   ├── design.md
│   ├── landing_copy.md
│   └── project_structure.md         # ← Este archivo
├── .env.example                     # Plantilla de variables de entorno
├── eslint.config.mjs                # ESLint 9 flat config + eslint-config-next
├── next.config.ts                   # output: "export", images: unoptimized
├── postcss.config.mjs               # Plugin @tailwindcss/postcss (Tailwind v4)
├── tsconfig.json                    # TypeScript con path alias @/* → ./src/*
└── package.json                     # next@16.3.2, react@19.2.8, tailwindcss@^4
```

## 2. Convenciones Clave

| Aspecto                | Decisión                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Framework**          | Next.js 16 (App Router)                                                                    |
| **Modo de salida**     | `output: "export"` — genera archivos estáticos en `/out`                                   |
| **Estilos**            | Tailwind CSS v4 vía `@tailwindcss/postcss` + `@theme inline`                               |
| **Fuentes**            | `next/font/google`: Inter (body) y Montserrat (headings)                                   |
| **Contenido**          | Centralizado en `src/content/data.ts` (no CMS)                                             |
| **Tipado**             | Interfaces en `src/types/index.ts`                                                         |
| **Contacto**           | WhatsApp vía `wa.me` (`lib/site.ts`) + `NEXT_PUBLIC_WHATSAPP_NUMBER`                       |
| **SEO**                | `metadata` export en layout + JSON-LD (`Product` schema)                                   |
| **Componentes client** | `"use client"` solo donde hay estado: `navbar.tsx`, `species-tabs.tsx`                     |
| **Path alias**         | `@/*` → `./src/*`                                                                          |
