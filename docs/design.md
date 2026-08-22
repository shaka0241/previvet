# Sistema de Diseño y Configuración UI (Tailwind CSS) - Vetline Nutrition

Este documento define cómo mapear la identidad de Vetline Nutrition a los componentes usando **Tailwind CSS**, asegurando una implementación rápida y un aspecto altamente profesional y moderno.

## 1. Configuración de Tema (tailwind.config.js)
Tailwind CSS permite personalizar fácilmente el tema global. Aquí tienes los colores exactos para configurar tu archivo `tailwind.config.js`:

*   **Primary (Verde Agro):** `#0DB14B` (Transmite crecimiento, pastos, salud).
    *   *Uso en Tailwind:* `bg-primary`, `text-primary`, `border-primary` para destacar iconos o badges.
*   **Secondary (Azul Veterinario):** `#1B365D` (Transmite ciencia, confianza).
    *   *Uso en Tailwind:* `bg-secondary`, `text-secondary` para botones principales de CTAs.
*   **Warning/Accent (Dorado/Mostaza):** `#F5A623`
    *   *Uso en Tailwind:* `bg-warning`, `text-warning` para alertas o botones secundarios llamativos.

## 2. Tipografía (Google Fonts)
*   **Headings (Títulos):** `Montserrat` (Pesos: 600, 700).
*   **Body (Texto):** `Inter` (Pesos: 400, 500).
    *   *Configuración:* Configura las fuentes en el archivo `tailwind.config.js` y usa las utilidades `font-sans` (para Inter) y `font-heading` (para Montserrat).

## 3. Mapeo de Componentes con Tailwind
Al no usar librerías externas de UI, los componentes se construirán nativamente con clases utilitarias de Tailwind.

### Botones (CTAs)
*   **Botón Primario:** `<button class="bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary/90 transition-colors">Solicitar Cotización</button>`
*   **Botón Secundario:** `<button class="border-2 border-primary text-primary font-medium py-2 px-4 rounded-md hover:bg-primary/10 transition-colors">Hablar con un Asesor</button>`

### Tarjetas de Beneficios (Cards)
Construir tarjetas limpias usando utilidades de bordes, sombras y fondos.
*   `<div class="bg-white/60 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-shadow rounded-xl p-6">`
*   Usar flexbox o grid interno para estructurar los íconos y textos (`flex flex-col gap-4`).

### Pestañas (Tabs) para Beneficios por Especie
Implementar estado de pestañas con Alpine.js, React o Vanilla JS, usando Tailwind para el diseño.
*   Botones de pestaña: `<button class="border-b-2 border-primary text-primary pb-2 font-medium">Bovinos</button>` o `<button class="bg-primary text-white px-4 py-2 rounded-full">Porcinos</button>`.

### Acordeón (Accordion) para la Ciencia / Ingredientes
Construir el componente con la etiqueta `<details>` nativa de HTML o mediante el framework base, estilizado con Tailwind.
*   `<details class="group bg-white p-4 rounded-lg shadow-sm border border-gray-100">`
*   Animar la apertura mediante clases utilitarias y transiciones en el ícono del sumario.

## 4. Dirección de Fotografía y Branding
*   **Logo de la Marca:** El proyecto cuenta con el logo oficial (`previvetlogo.jpeg`). Se deberá extraer una paleta de colores suplementaria si es necesario o utilizarlo en el `Navbar` (`<nav>`) ajustado con un tamaño máximo (`max-h-12 w-auto`) y bordes redondeados (`rounded-md`) en caso de no contar con una versión en PNG transparente, además de incluir atributos correctos de SEO (`alt="Vetline Nutrition Logo"`).
*   **Imágenes y Recursos:** Utilizar la etiqueta `<img class="hover:scale-105 transition-transform duration-300">` para integrar un efecto de zoom en las fotos del producto.
*   Las fotos del ganado (bovinos, lechones) deben ser luminosas, de alta calidad y utilizar clases como `rounded-2xl shadow-lg` para un acabado premium.