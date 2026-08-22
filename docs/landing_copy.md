# Contenido para Poblado de Landing Page (Estructura Tailwind CSS) - Vetline Nutrition

Este documento contiene el texto (copywriting) adaptado para encajar en secciones estandarizadas con **Tailwind CSS**.

---

## 0. Navegación (Navbar)
*Sugerencia UI: Una barra de navegación fija (`fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm`) que contenga el logo de la marca.*

*   **Logo:** Etiqueta `<img src="/images/previvetlogo.jpeg" alt="Vetline Nutrition Logo" class="h-10 w-auto rounded-md">`
*   **Enlaces:** Beneficios, Ciencia, Presentaciones.
*   **CTA Menú:** Botón con clases `bg-secondary text-white px-4 py-2 rounded-md` - Cotizar

---

## 1. Cabecera (Hero Section)
*Sugerencia UI: Usar un fondo difuminado o una imagen de fondo oscurecida (`bg-cover bg-center`). Los botones deben estar estilizados con clases utilitarias de Tailwind.*

*   **Pre-título:** Comprometidos con el Bienestar Animal
*   **Título Principal (H1):** Nutrición Integral que Transforma tu Ganadería.
*   **Subtítulo (H2):** Nutravit ADE3 Plus no es solo un suplemento, es un núcleo nutricional de alta palatabilidad. Garantiza asimilación del 100%, maximiza la conversión alimenticia y asegura tu rentabilidad.
*   **CTA Primario:** Botón con clases `bg-secondary text-white hover:bg-secondary/90 transition-colors` - Solicitar Cotización
*   **CTA Secundario:** Botón con clases `border-2 border-primary text-primary hover:bg-primary/10 transition-colors` - Hablar con un Asesor

---

## 2. Sección: ¿Por qué Nutravit ADE3 Plus?
*Sugerencia UI: Usar un Grid de Tailwind (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`) con tarjetas limpias (`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`).*

*   **Título:** Sinergia Biológica para Resultados Reales
*   **Texto introductorio:** Integramos los mejores componentes del mercado para potenciar la salud y el rendimiento.

**Tarjetas (Cards):**
1.  **Minerales:** Macrominerales premium y microminerales bioasimilables (Biofos, Calcio, Magnesio).
2.  **Energía:** Grasa Sobrepasante para combatir el balance energético negativo.
3.  **Salud:** Aditivos vivos (Probióticos + Prebióticos) para un sistema inmunológico blindado.
4.  **Vitaminas:** Complejo A, D3 y E, y aminoácidos esenciales encapsulados.

---

## 3. Sección: Beneficios por Especie
*Sugerencia UI: Crear un contenedor para pestañas con botones para alternar el contenido (Bovinos y Porcinos) usando clases de Tailwind para los estados activo e inactivo.*

### Pestaña: Bovinos (Leche y Carne)
*   **Cero Fiebre de Leche:** Combinación de Calcio, Magnesio y Selenio prepara a la vaca para el parto.
*   **Picos de Leche Sostenidos:** Biofos aporta energía celular; Magnesio activa el rumen. ¡Más litros con más grasa!
*   **Aprovechamiento del Pasto:** Azufre y Probióticos multiplican bacterias buenas para digerir pastos duros.
*   **Repelente Natural:** El Azufre actúa como escudo natural contra garrapatas y moscas.

### Pestaña: Porcinos (Cerdas y Engorde)
*   **Partos más rápidos:** Calcio activa contracciones eficientes, reduciendo asfixia en lechones.
*   **Lechones Más Pesados:** Aminoácidos elevan la calidad de la leche materna para destetes grandes y sanos.
*   **Huesos de Acero:** Biofos y Calcio garantizan articulaciones que soportan más de 100 kg.
*   **Control de Diarreas:** Probióticos y Prebióticos eliminan E. coli y Salmonella.

---

## 4. Sección: La Ciencia de nuestra Fórmula
*Sugerencia UI: Usar etiquetas `<details>` y `<summary>` estilizadas con Tailwind (`group`, `cursor-pointer`, `bg-gray-50 rounded-lg p-4`) para crear un acordeón.*

*   **Título:** Ingredientes que marcan la diferencia

*   **Bloque 1: Grasa Sobrepasante (Jabones de Calcio)**
    Energía pura que "pasa de largo" el rumen y se absorbe al 100% en el intestino. Evita la cetosis en vacas recién paridas y acelera el engorde.
*   **Bloque 2: Tecnología Simbiótica (Probióticos + Prebióticos)**
    Levadura Viva (Saccharomyces cerevisiae) combinada con MOS y Beta-glucanos. Exclusión competitiva de patógenos y máxima absorción.
*   **Bloque 3: Aminoácidos Limitantes**
    Metionina, Lisina y Treonina. Los "ladrillos" para el desarrollo muscular magro y un sistema inmune de hierro.
*   **Bloque 4: Micro y Macrominerales de Alta Gama**
    Desde Cobalto para Vitamina B12, hasta Selenito para antioxidación y Yodo para optimizar el metabolismo basal.

---

## 5. Sección: Presentación y Dosificación
*Sugerencia UI: Mostrar las dos presentaciones con imágenes usando clases como `rounded-xl shadow-lg object-cover` y una tarjeta de información lateral.*

*   **Rumiantes:** 100 gramos diarios por animal.
*   **Porcinos y Caprinos:** 50 gramos diarios por animal.
*   **Alimento Balanceado (A.B.A):** 20 kg por cada 500 kg de mezcla.
*   **Presentaciones:** Balde y Bolsa de 20 kg.

---

## 6. Footer (Llamado a la Acción)
*   **Título:** ¿Listo para llevar tu producción al siguiente nivel?
*   **CTA Formulario:** Utilizar componentes de formulario estándar (`<input>`, `<textarea>`, `<button>`) estilizados con bordes (`border-gray-300 rounded-md`), padding (`p-3`) y focus rings de Tailwind (`focus:ring-2 focus:ring-primary`) conectados a Web3Forms.