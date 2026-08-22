# Arquitectura Estática, Segura y de Alto Rendimiento (Tailwind CSS Edition)

Esta arquitectura mantiene el enfoque estático, seguro y sin costos de servidor (Jamstack), integrando **Tailwind CSS** para un diseño de interfaz altamente personalizado, ligero y sin dependencias de UI pesadas.

## 1. Stack Tecnológico (Frontend)
*   **Framework:** **Astro (con integración React/Preact opcional)** o **Next.js (App Router - Static Export)**.
    *   *Nota:* Al usar exclusivamente Tailwind CSS, la carga de JavaScript se reduce drásticamente, lo que hace que frameworks como Astro brillen aún más enviando HTML puro y logrando tiempos de carga ultrarrápidos.
*   **Estilos:** **Tailwind CSS**.
    *   *Justificación:* Metodología utility-first que permite construir diseños responsivos y personalizados directamente en el markup, generando un archivo CSS final minúsculo con solo las clases utilizadas.

## 2. Gestión de Formularios (Sin Backend Propio)
*   **Servicio:** **Netlify Forms**, **Formspree** o **Web3Forms**.
    *   *Implementación:* Utilizarás etiquetas `<input>`, `<textarea>` y `<button>` nativas estilizadas con Tailwind CSS apuntando al endpoint de Formspree. Esto permite capturar leads y validarlos sin tener un servidor backend.

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
2.  **Interacción:** Interactúa con el sitio ultraligero estilizado con Tailwind CSS.
3.  **Conversión:** Completa el formulario con un diseño limpio.
4.  **Envío:** Web3Forms/Formspree procesa la solicitud (con Turnstile validando que es humano) y envía el Lead al correo del equipo de Vetline.