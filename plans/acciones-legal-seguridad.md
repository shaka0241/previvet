# Plan de remediación Legal + Ciberseguridad

> Derivado de `plans/legal.md` y `plans/ciberseguridad.md` (auditorías del 2026-08-22).
> Estado: **PENDIENTE DE APROBACIÓN** — nada de esto se ha ejecutado todavía.

## Fase A — Técnico inmediato (sin dependencias externas)

- [ ] **A1. `vercel.json` con headers de seguridad** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` y CSP:
  `default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'none'; frame-ancestors 'none'`
  *(Fuente: ciberseguridad 🟠 #2. Verificar que la CSP no rompa el formulario/Turnstile tras el deploy.)*
- [ ] **A2. Corregir micro-copy de finalidad** (`data.ts → contactForm.privacyNote`) — nuevo texto: *"Tus datos solo se usan para gestionar tu solicitud y contactarte por teléfono, email o WhatsApp con fines comerciales."* *(legal 🟠 #3)*
- [ ] **A3. Higiene anti-abuso del formulario** — email requerido con formato (quitar opcionalidad en `lib/contact.ts`), `maxLength={500}` en textarea y `maxLength` en name/phone. *(ciberseguridad ⚪)*
- [ ] **A4. Bloque legal en footer** (patrón condicional como `howToBuy`) — razón social, NIT/RUC, dirección y email para derechos ARCO-P; se renderiza al llenar `data.ts → siteConfig/legalInfo`. Requiere datos del cliente pero la estructura se puede dejar lista. *(legal 🟡 #5)*
- [ ] **A5. Mención de Cloudflare y Web3Forms preparada** en el contenido centralizado (`data.ts`) para que la futura política los referencie sin tocar JSX. *(legal 🟠 #4)*

## Fase B — Configuración de plataformas (requiere acceso a dashboards)

- [ ] **B1. Vercel → Environment Variables**: configurar las 4 variables (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WEB3FORMS_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`) y redesplegar. **🚨 El formulario está inoperativo en producción hoy.**
- [ ] **B2. Dashboard Web3Forms**: exigir validación Turnstile server-side, activar spam filter y límite de envíos por período. *(ciberseguridad 🟠 #3)*
- [ ] **B3. Verificación post-deploy** con `npm run verify:deploy` + curl de headers y presencia de la UUID esperada en chunks (comandos en `plans/ciberseguridad.md`).

## Fase C — Legal documental (requiere datos del cliente + counsel local)

- [ ] **C1. Definir país objetivo principal** (placeholder +57 sugiere Colombia/SIC) y recopilar: razón social completa, NIT/RUC, dirección, email para derechos ARCO-P.
- [ ] **C2. Crear `/politica-de-privacidad`** con: identidad del responsable, finalidades (gestión de solicitud + contacto comercial), encargados (Web3Forms, Cloudflare), declaración "sin cookies de seguimiento", plazos de retención, derechos ARCO-P y canal de solicitudes.
- [ ] **C3. Checkbox obligatorio de aceptación** en el formulario, vinculado a la política (label con `<Link>` a `/politica-de-privacidad`, validación en `validateContactForm`).
- [ ] **C4. Validación de counsel local** según país (Colombia: textos SIC / Ecuador: SUPIMPA / México: aviso de privacidad integral / Perú: plazos ARCO).

## Dependencias y orden sugerido

```
Fase A (yo, ahora) ──→ Fase B (cliente/Alberto en dashboards) ──→ B3 verificación
                                                     │
Fase C1 (datos del cliente) ──→ C2-C3 (yo) ─────────┴──→ C4 (abogado local)
```

La Fase A puede ejecutarse de inmediato sin bloqueos. La C2/C3 requieren al menos el país objetivo y la razón social; pueden dejarse estructuradas con placeholders condicionales igual que el resto del sitio.
