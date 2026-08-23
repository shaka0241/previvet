# Plan de remediación Legal + Ciberseguridad

> Derivado de `plans/legal.md` y `plans/ciberseguridad.md` (auditorías del 2026-08-22).
> Estado: **PENDIENTE DE APROBACIÓN** — nada de esto se ha ejecutado todavía.

## Fase A — Técnico inmediato (sin dependencias externas) ✅ Completada (2026-08-22)

- [x] **A1. `vercel.json` con headers de seguridad** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` y CSP:
  `default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src https://challenges.cloudflare.com; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'`
  ✅ Ejecutado. *Nota: `'unsafe-inline'` en script-src es inevitable con export estático (los payloads RSC de Next van inline y los nonces requieren SSR por petición). Se compensa restringiendo hosts externos.*
  ⚠️ Pendiente B3: verificar contra producción que la CSP no rompe formulario/Turnstile.
- [x] **A2. Micro-copy de finalidad corregido** (`data.ts → contactForm.privacyNote`): *"…gestionar tu solicitud y contactarte por teléfono, email o WhatsApp con fines comerciales."* — verificado en HTML exportado.
- [x] **A3. Higiene anti-abuso** — email ahora obligatorio (validación + atributo), `maxLength`: name 80, phone 20, email 120, message 500. Test actualizado (16/16 ✓).
- [x] **A4. Bloque legal en footer** — estructura condicional lista (`data.ts → legalInfo`); se renderiza automáticamente al llenar razón social/NIT/dirección/email ARCO-P. Actualmente oculto (datos pendientes del cliente).
- [x] **A5. Referencias de política centralizadas** (`data.ts → privacyPolicyRefs`): Web3Forms, Cloudflare Turnstile y declaración "sin cookies de seguimiento" listos para la página `/politica-de-privacidad` de la Fase C.

## Fase B — Configuración de plataformas (requiere acceso a dashboards)

- [ ] **B0. Cloudflare Turnstile — crear el widget** ([dash.cloudflare.com](https://dash.cloudflare.com/?to=/:account/turnstile) → Add site):
  - Domain: `vetlinenutrition.vercel.app` (+ dominio propio si lo habrá)
  - Widget mode: **Managed**
  - Guardar **Site Key** (pública → Vercel) y **Secret Key** (→ Web3Forms en B2)
- [ ] **B2-pre. Web3Forms — endurecer** ([web3forms.com](https://docs.web3forms.com), settings del access key):
  - Activar **Turnstile validation** y pegar ahí la Secret Key de Turnstile (cierra el vector de spam 🟠 #3 del informe)
  - Activar **spam filter** y rate limiting si el plan los ofrece
- [ ] **B1. Vercel → Settings → Environment Variables** (marcar Production + Preview):

  | Variable | Valor |
  |---|---|
  | `NEXT_PUBLIC_SITE_URL` | `https://vetlinenutrition.vercel.app` |
  | `NEXT_PUBLIC_WEB3FORMS_KEY` | access key de Web3Forms |
  | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site Key pública de Turnstile |
  | `NEXT_PUBLIC_WHATSAPP_NUMBER` | número internacional sin `+` (ej. `573001234567`) — opcional hasta tener el definitivo |

- [ ] **B1-bis. Redesplegar**: Deployments → ⋯ → Redeploy (las `NEXT_PUBLIC_*` se hornean en build; sin esto siguen sin efecto). Los headers de `vercel.json` se activan con este mismo deploy.
- [ ] **B3. Verificación post-deploy**:
  ```bash
  npm run verify:deploy   # compresión brotli OK
  curl -sI https://vetlinenutrition.vercel.app/ | grep -iE 'content-security|x-frame|x-content|referrer'
  curl -s https://vetlinenutrition.vercel.app/ | grep -o 'cf-turnstile\|access_key" value="[^"]'
  ```
  Esperado: headers presentes, `value="<uuid>"` real y `cf-turnstile` renderizado. Probar un envío real del formulario end-to-end.

## Fase C — Legal documental (requiere datos del cliente + counsel local)

- [ ] **C1. Definir país objetivo principal** (placeholder +57 sugiere Colombia/SIC) y recopilar: razón social completa, NIT/RUC, dirección, email para derechos ARCO-P.
- [ ] **C1-bis. Llenar `data.ts → legalInfo`** con esos datos — el bloque ARCO-P del footer se renderiza automáticamente.
- [ ] **C2. Crear `/politica-de-privacidad`** con: identidad del responsable, finalidades (gestión de solicitud + contacto comercial por teléfono/email/WhatsApp), encargados (ya centralizados en `data.ts → privacyPolicyRefs`: Web3Forms y Cloudflare), declaración "sin cookies de seguimiento", plazos de retención, derechos ARCO-P y canal de solicitudes.
- [ ] **C3. Checkbox obligatorio de aceptación** en el formulario, vinculado a la política (label con `<Link>` a `/politica-de-privacidad`, validación en `validateContactForm`).
- [ ] **C4. Validación de counsel local** según país (Colombia: textos SIC / Ecuador: SUPIMPA / México: aviso de privacidad integral / Perú: plazos ARCO).

## Dependencias y orden sugerido

```
Fase A (yo, ahora) ──→ Fase B (cliente/Alberto en dashboards) ──→ B3 verificación
                                                     │
Fase C1 (datos del cliente) ──→ C2-C3 (yo) ─────────┴──→ C4 (abogado local)
```

La Fase A puede ejecutarse de inmediato sin bloqueos. La C2/C3 requieren al menos el país objetivo y la razón social; pueden dejarse estructuradas con placeholders condicionales igual que el resto del sitio.
