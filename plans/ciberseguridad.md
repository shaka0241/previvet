# Auditoría Ciberseguridad — vetlinenutrition.vercel.app

> Agente: Arquitecto de Ciberseguridad. Auditoría del 2026-08-22 con verificación real contra producción (curl).
> Severidades: 🔴 Crítico · 🟠 Alto · 🟡 Medio · ⚪ Informativo

## 🔴 Credenciales NEXT_PUBLIC ausentes en producción: formulario y Turnstile inoperativos
- **Evidencia:** `curl -s https://vetlinenutrition.vercel.app/_next/static/chunks/3wp6q_6z9gqzr.js | grep WEB3FORMS` → referencia runtime sin valor; HTML prod: `name="access_key" value=""`, 0 ocurrencias de `cf-turnstile`.
- **Vector:** disponibilidad — `submitContact` (`src/lib/contact.ts:61`) retorna `{ok:false}` con clave vacía; sin widget, el control anti-bot tampoco existe. **El formulario no funciona hoy en producción.**
- **Remediación:** configurar las 4 variables (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WEB3FORMS_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`) en Vercel → Settings → Environment Variables y redesplegar.

## 🟠 Sin cabeceras CSP / X-Frame-Options / X-Content-Type-Options / Referrer-Policy
- **Evidencia:** `curl -sI` solo muestra HSTS (✓ automático de Vercel). `output:"export"` ignora `headers()` de next.config; no existe `vercel.json`.
- **Vector:** clickjacking (iframe del formulario para phishing), sniffing MIME, fugas por referrer.
- **Remediación:** crear `vercel.json` con headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, y CSP: `default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'none'; frame-ancestors 'none'`.

## 🟠 Clave Web3Forms extraíble + spam directo a la API
- **Evidencia:** al definirse `NEXT_PUBLIC_WEB3FORMS_KEY` en Vercel, la UUID quedará como literal público en el JS del cliente.
- **Vector:** POST directo a `api.web3forms.com/submit` con la clave extraída — inundación del buzón sin pasar por Turnstile.
- **Remediación:** en dashboard Web3Forms: exigir Turnstile (valida `turnstile_response` server-side), activar spam-filter y límite de envíos. Riesgo residual aceptable para landing informativa.

## 🟡 Turnstile sin SRI ni allowlist CSP
- **Evidencia:** `contact-form.tsx:140-143` carga `challenges.cloudflare.com/turnstile/v0/api.js`; `grep -c "integrity=" out/index.html` → 0.
- **Matiz:** Cloudflare rota ese bundle, SRI no es viable; compensar con CSP `script-src` restringida (ver hallazgo anterior).

## ⚪ Verificado sin hallazgos
- **Dependencias:** `npm audit --omit=dev` → 0 vulnerabilidades.
- **Transporte:** HTTPS + timeout 10 s + `rel="noopener noreferrer"` en externos.
- **Secretos locales:** `.env.example` sin valores reales; sin `.env` commiteado.

## ⚪ Validación client-side: email opcional y sin longitud máxima
- **Evidencia:** `contact.ts:39` permite email vacío; textarea sin `maxLength`.
- **Remediación:** `maxLength={500}` en campos y email requerido con formato — higiene anti-abuso; la validación autoritativa vive en Web3Forms.

## Confirmación contra producción tras redesplegar con variables
```bash
curl -sI https://vetlinenutrition.vercel.app/ | grep -iE 'content-security|x-frame|x-content|referrer'
curl -s https://vetlinenutrition.vercel.app/_next/static/chunks/*.js | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
```
