# Arquitectura Estática, Segura y de Alto Rendimiento (Hero UI Edition)

Esta arquitectura mantiene el enfoque estático, seguro y sin costos de servidor (Jamstack), pero integra **Hero UI** (anteriormente NextUI) para potenciar el diseño de la interfaz con componentes premium, accesibles y listos para usar.

## 1. Stack Tecnológico (Frontend)
*   **Framework:** **Astro (con integración React)** o **Next.js (App Router - Static Export)**.
    *   *Nota de Compatibilidad:* Hero UI está construido sobre React y Framer Motion. Por lo tanto, debes usar un framework que soporte React. Astro es ideal porque permite hidratación parcial (islas), enviando JS solo donde el componente de Hero UI lo requiere, manteniendo la web ultrarrápida.
*   **Librería UI:** **Hero UI (React)**.
    *   *Justificación:* Ofrece componentes preconstruidos (Tarjetas, Acordeones, Pestañas) con animaciones fluidas y accesibilidad (basado en React Aria). Acelera el desarrollo sin sacrificar diseño.
*   **Estilos:** **Tailwind CSS**.
    *   *Justificación:* Hero UI funciona como un plugin de Tailwind, permitiendo personalizar los colores de la marca directamente en el `tailwind.config.js`.

## 2. Gestión de Formularios (Sin Backend Propio)
*   **Servicio:** **Netlify Forms**, **Formspree** o **Web3Forms**.
    *   *Implementación:* Utilizarás los componentes `<Input>` y `<Button>` de Hero UI dentro de una etiqueta `<form>` nativa apuntando al endpoint de Formspree. Esto permite capturar leads, validar los datos visualmente con Hero UI y enviarlos por correo sin tener un servidor backend.

## 3. Infraestructura y Hosting (Despliegue Estático)
*   **Hosting:** **Vercel** o **Cloudflare Pages**.
    *   *Justificación:* Vercel tiene soporte de primera clase tanto para Next.js como para Astro. Con cada `git push`, construyen los archivos estáticos y los distribuyen globalmente en su Edge Network.

## 4. Capa de Red y Seguridad Front-End
*   **Proveedor de DNS/CDN:** **Cloudflare**.
    *   Mitigación DDoS, Edge Caching estricto, protección gratuita.
*   **Seguridad Anti-Spam:**
    *   **Cloudflare Turnstile** integrado en el formulario para evitar bots sin arruinar la experiencia del usuario (es invisible en la mayoría de los casos).

## 5. Flujo de Operación
1.  **Visita:** El ganadero entra a la web, servida estáticamente vía Vercel/Cloudflare (< 1s de carga).
2.  **Interacción:** Interactúa con los Acordeones y Pestañas animadas de Hero UI (optimizadas para móvil).
3.  **Conversión:** Completa el formulario (Inputs de Hero UI).
4.  **Envío:** Web3Forms/Formspree procesa la solicitud (con Turnstile validando que es humano) y envía el Lead al correo del equipo de Vetline.