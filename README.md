# Previvet — Vetline Nutrition Landing Page

Landing page estática para **Nutravit ADE3 Plus**, un núcleo nutricional de alta palatabilidad para bovinos y porcinos, desarrollada por Vetline Nutrition.

## Stack Tecnológico

| Tecnología           | Versión | Propósito                                          |
| -------------------- | ------- | -------------------------------------------------- |
| Next.js              | 16.3.2  | Framework (App Router, Static Export)              |
| React                | 19.2.8  | Librería de UI                                     |
| Tailwind CSS         | v4      | Estilos (utility-first via `@tailwindcss/postcss`) |
| TypeScript           | ^5      | Tipado estático                                    |
| Web3Forms            | —       | Procesamiento de formularios (API)                 |
| Cloudflare Turnstile | —       | Anti-bot/spam invisible                            |

## Inicio Rápido

### Requisitos previos

- Node.js ≥ 18
- npm

### Instalación

```bash
npm install
```

### Variables de entorno

Copiar `.env.example` a `.env.local` y configurar:

```bash
cp .env.example .env.local
```

| Variable                         | Descripción                                    |
| -------------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | URL del sitio (para Open Graph / metadataBase) |
| `NEXT_PUBLIC_WEB3FORMS_KEY`      | Clave pública de Web3Forms                     |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site key de Cloudflare Turnstile               |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`    | Número WhatsApp internacional sin `+` (ej. `573001234567`). Si se omite, no se renderizan los enlaces de WhatsApp |

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build estático

```bash
npm run build
```

Genera archivos estáticos en el directorio `/out`, listos para desplegar en Vercel, Cloudflare Pages, o cualquier CDN.

## Estructura del Proyecto

```
src/
├── app/              # App Router (layout, page, globals.css)
├── components/
│   ├── sections/     # Secciones de la landing (Navbar, Hero, Benefits, etc.)
│   ├── ui/           # Componentes base reutilizables (Buttons, Cards)
│   └── seo/          # Componentes SEO (reservado)
├── content/          # Contenido textual centralizado (data.ts)
└── types/            # Interfaces TypeScript
```

> 📖 Documentación detallada en [`docs/`](docs/):
>
> - [`architecture.md`](docs/architecture.md) — Stack y arquitectura
> - [`design.md`](docs/design.md) — Sistema de diseño y componentes
> - [`landing_copy.md`](docs/landing_copy.md) — Contenido textual (copywriting)
> - [`project_structure.md`](docs/project_structure.md) — Árbol de directorios completo

## Despliegue

El sitio está configurado con `output: "export"` para generar HTML estático. Puede desplegarse en:

- **Vercel** (recomendado) — soporte nativo para Next.js
- **Cloudflare Pages**
- Cualquier hosting estático

## Licencia

Privado — © Vetline Nutrition. Todos los derechos reservados.
