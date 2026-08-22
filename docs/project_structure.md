# Estructura del Proyecto (Astro + React + Hero UI)

Como Arquitecto de Soluciones, estandarizar la estructura de carpetas desde el día cero es vital para la escalabilidad y el mantenimiento. Esta estructura asume el uso de **Astro** (por su rendimiento) con **React** para los componentes de Hero UI.

## 1. Árbol de Directorios Base

```text
vetline-landing/
├── public/                 # Archivos estáticos crudos (favicon, robots.txt, sitemap.xml)
│   ├── images/             # Imágenes estáticas no procesadas por el bundler
│   └── og-image.jpg        # Imagen para compartir en redes sociales (Open Graph)
├── src/
│   ├── assets/             # Imágenes procesadas, SVGs y fuentes locales
│   ├── components/         # Componentes aislados
│   │   ├── ui/             # Envoltorios de Hero UI (Botones, Tarjetas personalizadas)
│   │   ├── sections/       # Bloques de la landing (Hero, Beneficios, Footer)
│   │   └── seo/            # Componentes de metadatos y JSON-LD
│   ├── content/            # Colecciones estáticas (si decides usar Astro Content API)
│   │   └── data.json       # Toda la información del copy separada de la UI
│   ├── layouts/            # Plantillas maestras (BaseLayout.astro)
│   ├── pages/              # Enrutamiento basado en archivos (Astro)
│   │   └── index.astro     # Punto de entrada de la Landing Page
│   ├── types/              # Definiciones de TypeScript (interfaces)
│   └── utils/              # Funciones auxiliares (ej. validaciones, formateo)
├── .env                    # Variables de entorno (¡No subir al repo!)
├── .env.example            # Plantilla de variables de entorno seguras
├── astro.config.mjs        # Configuración de integraciones (React, Tailwind)
├── tailwind.config.js      # Tema de Vetline Nutrition y plugin de Hero UI
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias y scripts