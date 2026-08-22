# Estructura del Proyecto (Astro + Tailwind CSS)

Como Arquitecto de Soluciones, estandarizar la estructura de carpetas desde el día cero es vital para la escalabilidad y el mantenimiento. Esta estructura asume el uso de **Astro** (por su rendimiento) y **Tailwind CSS** puro, prescindiendo de librerías de componentes UI pesadas.

## 1. Árbol de Directorios Base

```text
vetline-landing/
├── public/                 # Archivos estáticos crudos (favicon, robots.txt, sitemap.xml)
│   ├── images/             # Imágenes estáticas no procesadas por el bundler
│   │   └── previvetlogo.jpeg # Logo oficial de la marca
│   └── og-image.jpg        # Imagen para compartir en redes sociales (Open Graph)
├── src/
│   ├── assets/             # Imágenes procesadas, SVGs y fuentes locales
│   ├── components/         # Componentes aislados (Astro/React)
│   │   ├── ui/             # Componentes base estilizados con Tailwind (Botones, Tarjetas)
│   │   ├── sections/       # Bloques de la landing (Hero, Beneficios, Footer)
│   │   └── seo/            # Componentes de metadatos y JSON-LD
│   ├── content/            # Colecciones estáticas (si decides usar Astro Content API)
│   │   └── data.json       # Toda la información del copy separada de la UI
│   ├── layouts/            # Plantillas maestras (BaseLayout.astro)
│   ├── pages/              # Enrutamiento basado en archivos (Astro)
│   │   └── index.astro     # Punto de entrada de la Landing Page
│   ├── styles/             # Hojas de estilo globales
│   │   └── global.css      # Directivas de Tailwind (@tailwind base, components, utilities)
│   ├── types/              # Definiciones de TypeScript (interfaces)
│   └── utils/              # Funciones auxiliares (ej. validaciones, formateo)
├── .env                    # Variables de entorno (¡No subir al repo!)
├── .env.example            # Plantilla de variables de entorno seguras
├── astro.config.mjs        # Configuración de integraciones (Tailwind)
├── tailwind.config.js      # Configuración del Tema de Vetline Nutrition
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias y scripts
```