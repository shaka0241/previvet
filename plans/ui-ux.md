# Informe UI/UX — Diseño y conversión (10 ideas)

> Agente: especialista en diseño UI/UX frontend. Auditoría del 2026-08-22.

## 🔴 PRIORIDAD ALTA

### 1. El CTA primario del hero es invisible sobre su propio fondo
- **Problema:** En `hero.tsx:6` el fondo es `bg-gradient-to-b from-secondary to-[#2a4a7f]`, pero `PrimaryButton` renderiza con `bg-secondary` (#1B365D) (`buttons.tsx:16`). El botón "Solicitar Cotización" —la conversión principal de la página— se funde con el gradiente azul y pierde toda jerarquía visual. Además ambos CTAs apuntan al mismo destino `#contacto` (`data.ts:25-26`): redundantes, sin elección real para el visitante.
- **Propuesta:** Cambiar `PrimaryButton` a `bg-primary hover:bg-primary/90` (verde #0DB14B sobre azul oscuro = contraste AA y máximo pop). Diferenciar el CTA secundario convirtiéndolo en enlace directo a WhatsApp (`wa.me`) con ícono: "Hablar con un Asesor" promete conversación inmediata, no otro salto al mismo formulario.

### 2. Cero fotografía de producto o animales en toda la landing
- **Problema:** `public/images/` contiene únicamente `previvetlogo.jpeg`: no hay ninguna otra imagen en el sitio. Para un producto físico agro-veterinario, esto destruye la credibilidad. Caso más grave: `presentations.tsx:9-11` muestra como "imagen" del producto un rectángulo `aspect-video bg-white/15` con solo el texto tipográfico "20 kg" — parece placeholder inacabado. El hero (`hero.tsx`) es 100% texto plano. Nótese que `docs/design.md` (sección 4) ya contempla una "Dirección de Fotografía" que nunca se implementó.
- **Propuesta:** Foto real del balde/bolsa en Presentations con `next/image` y sombra. Imagen lateral o de fondo con overlay azul en el Hero (ganado bovino/porcino en producción). Mini-foto por especie junto al título de las tarjetas en las pestañas.

### 3. Formulario B2B sin etiquetas visibles y con "WhatsApp fantasma"
- **Problema:** Los cuatro campos usan solo `placeholder` como etiqueta (`contact-form.tsx:59-70`): desaparece al escribir, es anti-patrón de accesibilidad (WCAG) y en móvil autocompletado el usuario pierde contexto. Más grave: el mensaje de error dice *"escríbenos por WhatsApp"* (`contact-form.tsx:93`) pero **no existe ningún enlace a WhatsApp en todo el sitio** — salida de emergencia falsa que deja al lead sin ruta alternativa.
- **Propuesta:** Añadir labels visibles pequeños sobre cada input (placeholders quedan como ejemplo de formato). Crear enlace real `wa.me` con número definido en `siteConfig` y usarlo en tres puntos: estado de error del formulario, columna izquierda del footer y navbar. Para B2B LatAm, WhatsApp convierte mejor que cualquier formulario.

### 4. Confirmación de envío débil para una decisión de compra B2B
- **Problema:** En `contact-form.tsx`, el éxito es una sola línea `<p className="text-primary">¡Gracias! Te contactaremos pronto.</p>` (`contact-form.tsx:88-90`) tras resetear el formulario (`:37`) — feedback mínimo que además queda fuera del viewport si el usuario scrolleó. El estado de envío solo cambia el texto a "Enviando..." (`:85`): el ancho del botón salta (layout shift) y no hay spinner. No existe nota de privacidad antes del submit, relevante para generar confianza empresarial en un lead B2B.
- **Propuesta:** Al enviar con éxito, reemplazar el formulario por un panel de confirmación: ícono check animado + "Un asesor te contactará en menos de 24 h" + botón directo a WhatsApp como plan B. Fijar `min-w` en el botón y spinner SVG durante `status === "sending"`. Micro-copy bajo el botón: *"Tus datos solo se usan para enviarte la cotización."*

## 🟡 PRIORIDAD MEDIA

### 5. Tabs de especie: overflow en móvil, cambio brusco y sin teclado
- **Problema:** El contenedor de tabs es `flex justify-center gap-2 mb-8` **sin `flex-wrap`** (`species-tabs.tsx:12`): los pills largos ("Porcinos — Cerdas y Engorde") desbordan horizontalmente en pantallas pequeñas (~360 px). El panel cambia instantáneamente sin transición (`species-tabs.tsx:30-45`), lo que se percibe brusco. Pese a tener `role="tablist"`/`role="tab"` (`:12`, `:16`), faltan `id`/`aria-controls` vinculando tabs con panel y navegación con flechas del teclado.
- **Propuesta:** Añadir `flex-wrap`; en móvil apilar el subtítulo bajo el label (`flex-col sm:flex-row items-baseline` dentro del botón). Animar el panel con fade/slide corto (~200 ms) usando `key={active}` para remontar y una animación CSS. Completar ARIA: `id` en cada tab, `aria-controls`, `aria-labelledby` + `id` en el panel, y soporte de flechas ←/→ entre tabs.

### 6. Acordeón de ciencia: todo cerrado por defecto y apertura sin animación
- **Problema:** La única micro-interacción presente es la rotación del "+" (`science.tsx`, línea 19). El `<summary>` tampoco tiene estilos de `hover` ni `focus-visible`, así que no comunica que es clicable más allá del cursor.
- **Propuesta:**
  1. **Abrir el primer bloque** añadiendo el atributo `open` al primer `<details>`: el usuario entra en el patrón de lectura sin un clic previo y ve que hay contenido desplegable.
  2. **Animar la altura** con el patrón CSS `grid-template-rows: 0fr → 1fr` envolviendo el contenido en un wrapper con `overflow-hidden` (o `interpolate-size: allow-keywords` + `transition-behavior` si se apunta solo a navegadores modernos), con transición de ~300 ms y respetando `prefers-reduced-motion`.
  3. **Reforzar el summary:** añadir `hover:border-primary/30 hover:shadow-md transition-all` al contenedor y `focus-visible:ring-2 focus-visible:ring-primary` al summary.
  4. **Escaneabilidad del texto técnico:** envolver los nombres de ingredientes clave (Biofos, *Saccharomyces cerevisiae*, Metionina) en `<strong className="text-primary">` dentro de las descripciones de `data.ts` para que el ojo ganche los términos que el ganadero reconoce.

### 7. Sistema visual inconsistente entre secciones
- **Problema:** El token `--color-warning` definido en `globals.css` (línea 13) **no se usa en ningún componente** de todo el proyecto — es un token muerto que además contradice el sistema documentado en `docs/design.md` (que lo asigna a "alertas, acentos"). Además los anchos de contenedor difieren entre las 5 secciones, y el lenguaje de tarjetas no es uniforme entre `benefit-card.tsx` y las tarjetas de especie.
- **Propuesta:** Definir una escala única de contenedores (p. ej. `max-w-6xl` para grids de contenido, `max-w-3xl` solo para lectura) y aplicarla igual en las 5 secciones. Unificar el lenguaje de tarjetas (mismo radio, sombra y padding en `benefit-card.tsx` y las de especie). Rescatar o eliminar `--color-warning`: funcionaría bien como color de acento para cifras clave (el "20 kg", los gramos de dosificación en `presentations.tsx`) rompiendo la monotonía verde/azul con un color ya aprobado por marca.

### 8. Navbar estático: sin indicador de sección activa ni contacto directo
- **Problema:** En `navbar.tsx` los links (`hover:text-primary`, línea 35) no reflejan en qué sección está el usuario mientras scrollea — en una landing de anclajes largos, eso desorienta. El CTA "Cotizar" es la única vía de contacto visible; no hay teléfono/WhatsApp al alcance de un clic. El menú móvil (línea 65) aparece/desaparece sin animación y sin bloquear el scroll del body.
- **Propuesta:** Scroll-spy con `IntersectionObserver` que marque el link activo (subrayado `after:` o `text-primary font-semibold`). Añadir ícono/enlace de WhatsApp junto al botón Cotizar (en desktop puede ser solo el ícono). Animar el dropdown móvil con transición de opacidad+altura y cerrarlo también con la tecla Escape.

## 🟢 PRIORIDAD BAJA

### 9. Micro-interacciones mínimas: tarjetas planas y página sin vida al scroll
- **Problema:** `benefit-card.tsx` (línea 33) solo tiene `hover:shadow-lg`; las tarjetas de especie ni siquiera eso. Ninguna sección del `page.tsx` tiene animación de entrada: toda la landing aparece de golpe. Los botones de `buttons.tsx` no definen `focus-visible`, lo que penaliza navegación por teclado.
- **Propuesta:** Hover "lift" en tarjetas: `hover:-translate-y-1 hover:shadow-xl transition-all duration-300`. Fade-up sutil (~400 ms) al entrar en viewport para headers de sección y tarjetas, con `@media (prefers-reduced-motion: reduce)` desactivándolo todo. Añadir `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` como estándar en ambos botones y links del navbar.

### 10. Footer sin credenciales empresariales: confianza B2B incompleta
- **Problema:** La barra inferior de `footer.tsx` (líneas 22-26) contiene únicamente el copyright. Para un producto que se vende a empresas agropecuarias faltan los sellos mínimos de legitimidad: NIT/RUT, dirección, email, teléfono, redes sociales, y cualquier registro sanitario/veterinario aplicable. El visitante que llega al footer queriendo verificar "¿quién es Vetline Nutrition?" no encuentra nada.
- **Propuesta:** Convertir la zona inferior en grid de 3 columnas: (1) logo + descripción breve + certificaciones/registros como badges, (2) enlaces rápidos a las secciones, (3) datos de contacto completos + WhatsApp + horario de atención. Mantener el copyright debajo.

---

## Resumen ejecutivo

| # | Idea | Prioridad | Impacto principal |
|---|------|-----------|-------------------|
| 1 | CTA primario invisible en hero | 🔴 Alta | Conversión |
| 2 | Cero fotografía producto/animales | 🔴 Alta | Confianza/credibilidad |
| 3 | Form sin labels + WhatsApp fantasma | 🔴 Alta | Conversión/móvil |
| 4 | Confirmación de envío débil | 🔴 Alta | Conversión/confianza |
| 5 | Tabs: overflow móvil + a11y | 🟡 Media | Móvil/accesibilidad |
| 6 | Acordeón cerrado sin animación | 🟡 Media | Jerarquía/lectura |
| 7 | Tokens y anchos inconsistentes | 🟡 Media | Consistencia visual |
| 8 | Navbar sin scroll-spy/contacto | 🟡 Media | Navegación/conversión |
| 9 | Micro-interacciones ausentes | 🟢 Baja | Percepción de calidad |
| 10 | Footer sin credenciales B2B | 🟢 Baja | Credibilidad |

**Si solo se pudieran ejecutar 3:** la #1 (20 minutos de trabajo, impacto inmediato en conversión), la #2 (requiere fotos del cliente pero es la mayor brecha de credibilidad) y la #3 (el enlace real de WhatsApp probablemente duplique los leads calificados en este mercado).
