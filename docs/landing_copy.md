# Contenido de la Landing Page — Vetline Nutrition

Este documento contiene el texto (copywriting) real utilizado en la landing page, tal como está definido en [`data.ts`](file:///Users/albertorojas/proyectos/previvet/src/content/data.ts). Todas las secciones de la UI consumen este archivo centralizado.

---

## 0. Navegación (Navbar)

_Componente: [`navbar.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/navbar.tsx)_

- **Logo:** `<Image src="/images/logo-nav.webp" alt="Vetline Nutrition Logo" />` — fija en top con glassmorphism (`bg-white/90 backdrop-blur-md`)
- **Enlaces:** Beneficios (`#beneficios`), Ciencia (`#ciencia`), Presentaciones (`#presentaciones`)
- **CTA:** Botón "Cotizar" → enlaza a `#contacto`
- **Móvil:** Menú hamburguesa con cierre automático en navegación

---

## 1. Cabecera (Hero Section)

_Componente: [`hero.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/hero.tsx)_

- **Pre-título:** Comprometidos con el Bienestar Animal
- **Título Principal (H1):** Nutrición Integral que Transforma tu Ganadería.
- **Subtítulo:** Nutravit ADE3 Plus no es solo un suplemento, es un núcleo nutricional de alta palatabilidad. Garantiza asimilación del 100%, maximiza la conversión alimenticia y asegura tu rentabilidad.
- **CTA Primario:** "Solicitar Cotización" → `#contacto`
- **CTA Secundario:** "Hablar con un Asesor" → `#contacto`
- **Fondo:** Gradiente `bg-gradient-to-b from-secondary to-[#2a4a7f]`

---

## 2. Sección: ¿Por qué Nutravit ADE3 Plus?

_Componentes: [`benefits.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/benefits.tsx) + [`benefit-card.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/ui/benefit-card.tsx)_

- **Título:** Sinergia Biológica para Resultados Reales
- **Texto introductorio:** Integramos los mejores componentes del mercado para potenciar la salud y el rendimiento.

**Tarjetas (Grid 1×2×4 responsivo):**

| Ícono    | Título    | Descripción                                                                        |
| -------- | --------- | ---------------------------------------------------------------------------------- |
| minerals | Minerales | Macrominerales premium y microminerales bioasimilables (Biofos, Calcio, Magnesio). |
| energy   | Energía   | Grasa Sobrepasante para combatir el balance energético negativo.                   |
| health   | Salud     | Aditivos vivos (Probióticos + Prebióticos) para un sistema inmunológico blindado.  |
| vitamins | Vitaminas | Complejo A, D3 y E, y aminoácidos esenciales encapsulados.                         |

---

## 3. Sección: Beneficios por Especie

_Componentes: [`species-benefits.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/species-benefits.tsx) + [`species-tabs.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/species-tabs.tsx)_

### Pestaña: Bovinos (Leche y Carne)

| Beneficio                 | Descripción                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| Cero Fiebre de Leche      | Combinación de Calcio, Magnesio y Selenio prepara a la vaca para el parto.          |
| Picos de Leche Sostenidos | Biofos aporta energía celular; Magnesio activa el rumen. ¡Más litros con más grasa! |
| Aprovechamiento del Pasto | Azufre y Probióticos multiplican bacterias buenas para digerir pastos duros.        |
| Repelente Natural         | El Azufre actúa como escudo natural contra garrapatas y moscas.                     |

### Pestaña: Porcinos (Cerdas y Engorde)

| Beneficio            | Descripción                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| Partos más rápidos   | Calcio activa contracciones eficientes, reduciendo asfixia en lechones.          |
| Lechones Más Pesados | Aminoácidos elevan la calidad de la leche materna para destetes grandes y sanos. |
| Huesos de Acero      | Biofos y Calcio garantizan articulaciones que soportan más de 100 kg.            |
| Control de Diarreas  | Probióticos y Prebióticos eliminan E. coli y Salmonella.                         |

---

## 4. Sección: La Ciencia de nuestra Fórmula

_Componente: [`science.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/science.tsx) — acordeón con `<details>`_

- **Intro:** Ingredientes que marcan la diferencia

| Bloque                                            | Descripción                                                                                                            |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Grasa Sobrepasante (Jabones de Calcio)            | Energía pura que "pasa de largo" el rumen y se absorbe al 100% en el intestino. Evita la cetosis y acelera el engorde. |
| Tecnología Simbiótica (Probióticos + Prebióticos) | Levadura Viva (S. cerevisiae) + MOS y Beta-glucanos. Exclusión competitiva de patógenos y máxima absorción.            |
| Aminoácidos Limitantes                            | Metionina, Lisina y Treonina. Los "ladrillos" para el desarrollo muscular magro y un sistema inmune de hierro.         |
| Micro y Macrominerales de Alta Gama               | Cobalto para B12, Selenito para antioxidación, Yodo para metabolismo basal.                                            |

---

## 5. Sección: Presentación y Dosificación

_Componente: [`presentations.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/presentations.tsx)_

**Dosificación:**

| Especie                     | Dosis                           |
| --------------------------- | ------------------------------- |
| Rumiantes                   | 100 gramos diarios por animal   |
| Porcinos y Caprinos         | 50 gramos diarios por animal    |
| Alimento Balanceado (A.B.A) | 20 kg por cada 500 kg de mezcla |

**Presentaciones:** Balde y Bolsa de 20 kg

---

## 6. Footer (Llamado a la Acción + Formulario)

_Componentes: [`footer.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/footer.tsx) + [`contact-form.tsx`](file:///Users/albertorojas/proyectos/previvet/src/components/sections/contact-form.tsx)_

- **Título:** ¿Listo para llevar tu producción al siguiente nivel?
- **Subtexto:** Déjanos tus datos y un asesor de Vetline Nutrition te contactará con una cotización personalizada.
- **Campos del formulario:** Nombre, Teléfono/WhatsApp, Correo electrónico, Mensaje
- **Integración:** Web3Forms (API REST) + Cloudflare Turnstile (anti-bot)
- **Copyright:** © {año} Vetline Nutrition. Todos los derechos reservados.
