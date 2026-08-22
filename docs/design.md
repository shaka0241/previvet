# Sistema de Diseño y Configuración UI (Hero UI) - Vetline Nutrition

Este documento define cómo mapear la identidad de Vetline Nutrition a los componentes de **Hero UI** y **Tailwind CSS**, asegurando una implementación rápida y un aspecto altamente profesional.

## 1. Configuración de Tema (tailwind.config.js)
Hero UI permite personalizar fácilmente el tema global. Aquí tienes los colores exactos para configurar tu plugin:

*   **Primary (Verde Agro):** `#0DB14B` (Transmite crecimiento, pastos, salud).
    *   *Uso en Hero UI:* `color="primary"` para destacar iconos o badges.
*   **Secondary (Azul Veterinario):** `#1B365D` (Transmite ciencia, confianza).
    *   *Uso en Hero UI:* `color="secondary"` para botones principales de CTAs.
*   **Warning/Accent (Dorado/Mostaza):** `#F5A623`
    *   *Uso en Hero UI:* `color="warning"` para alertas o botones secundarios llamativos.

## 2. Tipografía (Google Fonts)
*   **Headings (Títulos):** `Montserrat` (Pesos: 600, 700).
*   **Body (Texto):** `Inter` (Pesos: 400, 500).
    *   *Configuración:* Aplica `font-sans` a la clase de Inter en Tailwind para que Hero UI la tome por defecto.

## 3. Mapeo de Componentes Hero UI

### Botones (CTAs)
*   **Botón Primario:** `<Button color="secondary" radius="sm" className="font-bold">Solicitar Cotización</Button>`
*   **Botón Secundario:** `<Button color="primary" variant="bordered" radius="sm">Hablar con un Asesor</Button>`

### Tarjetas de Beneficios (Cards)
Utilizar el componente `<Card>` de Hero UI con la propiedad `isHoverable` para lograr un efecto de elevación sutil.
*   `<Card isHoverable className="border-none bg-background/60 dark:bg-default-100/50">`
*   Usar `<CardHeader>`, `<CardBody>` para estructurar los íconos y textos.

### Pestañas (Tabs) para Beneficios por Especie
Usar el componente `<Tabs>` para organizar la información de "Bovinos" y "Porcinos" y evitar el scroll largo en móvil.
*   `<Tabs color="primary" variant="underlined">` o `variant="solid"` para botones tabulares redondeados.
*   Esta interacción fluida y animada (gracias a framer-motion de Hero UI) mejora radicalmente la UX en el campo (Mobile).

### Acordeón (Accordion) para la Ciencia / Ingredientes
Usar el componente `<Accordion>` para compactar información densa (Grasa sobrepasante, Probióticos, Minerales).
*   `<Accordion variant="splitted">` para mostrar cada ingrediente como un bloque independiente que se despliega.

## 4. Dirección de Fotografía
*   **Imágenes y Recursos:** Utilizar el componente `<Image>` de Hero UI para integrar `zoomed` (zoom al hacer hover) en fotos del producto (balde y bolsa de 20kg).
*   Las fotos del ganado (bovinos, lechones) deben ser luminosas y de alta calidad.