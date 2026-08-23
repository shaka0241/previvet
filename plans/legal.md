# Auditoría Legal y de Protección de Datos — Vetline Nutrition

> Agente: Auditor Legal-Jurídico. Auditoría del 2026-08-22.
> Severidades: 🔴 Riesgo legal alto · 🟠 Deber de implementar · 🟡 Mejora recomendada
> ⚠️ Este informe identifica riesgos y propone remediation; la redacción jurídica definitiva requiere validación de counsel local según país objetivo.

> **🔄 Actualización 2026-08-23:** formulario, Web3Forms y Turnstile eliminados — los hallazgos sobre consentimiento del formulario, transferencia a Web3Forms y aviso de Turnstile quedan resueltos. Pendiente revisar tratamiento de datos dentro de conversaciones WhatsApp en la política.

**Verificado previamente:** sin cookies ni analytics en todo el sitio (grep 0 resultados); Google Fonts self-hosted (evita la problemática de las sentencias CJUE sobre fonts).

## 🔴 1. Ausencia total de política de privacidad y consentimiento
- **Norma:** Colombia Ley 1581/2012 (autorización previa); Ecuador LOPDP 2021 (deber de informar + consentimiento); Perú LPDP 29733 (información previa); México LFPDPPP (aviso de privacidad obligatorio).
- **Evidencia:** no existe ruta `/politica-de-privacidad`; el formulario envía datos sin casilla de aceptación (`contact-form.tsx:146+`).
- **Remediación:** crear página de política (responsable, finalidades, terceros, retención, derechos ARCO-P, canal de solicitudes) + checkbox obligatorio pre-envío enlazado a ella.

## 🔴 2. Transferencia a tercero (Web3Forms) sin divulgación ni acuerdo de encargo
- **Norma:** transferencia internacional a EE.UU.: Ley 1581 art. 26; LOPDP ecuatoriana exige condiciones de transferencia.
- **Evidencia:** `contact.ts:12,64-77` — el navegador del titular POSTea sus datos directamente a `api.web3forms.com`, que reenvía al correo corporativo.
- **Remediación:** nombrar a Web3Forms como encargado del tratamiento en la política; revisar sus términos/DPA; valorar proxy server-side propio.

## 🟠 3. Micro-copy de finalidad incompleto frente al uso comercial posterior
- **Norma:** principio de finalidad (Ley 1581; LOPDP; LPDP 29733 art. 8; RGPD 5(1)(b) como referencia).
- **Evidencia:** `data.ts` — *"Tus datos solo se usan para enviarte la cotización"*, pero el flujo promete asesoría comercial activa (<24h, seguimiento por WhatsApp).
- **Remediación:** texto honesto: *"para gestionar tu solicitud y contactarte por teléfono, email o WhatsApp con fines comerciales"*.

## 🟠 4. Cloudflare Turnstile sin aviso de terceros
- **Norma:** deber de transparencia sobre receptores de datos (todas las leyes citadas).
- **Evidencia:** `contact-form.tsx:139-144` carga `challenges.cloudflare.com` cuando hay clave configurada.
- **Remediación:** incluir Cloudflare como encargado anti-fraude en la política. Al ser funcional (no rastreo), no exige banner bajo criterios LATAM — sí mención documental.

## 🟡 5. Falta identificación legal del responsable en el sitio
- **Norma:** identidad/dirección del responsable exigida por los regímenes citados.
- **Evidencia:** footer sin razón social/NIT/contacto; JSON-LD Organization sin email ni dirección (`layout.tsx`).
- **Remediación:** bloque legal en footer: razón social completa, NIT/RUC, dirección y correo para ejercicio de derechos ARCO-P.

## 🟡 6. Punto fuerte verificable: arquitectura "sin cookies"
- **Norma:** buena práctica (evita sentencias tipo fonts Múnich 2022); en LATAM sin cookies propias no se exige banner.
- **Remediación:** mantener; declarar explícitamente en la política *"este sitio no utiliza cookies de seguimiento"*.

## Validación de abogado local requerida según mercado objetivo
- **Colombia** (placeholder +57 sugiere mercado primario): formato SIC de autorización, registro de bases si aplica → prioridad.
- **Ecuador**: registro de tratamientos ante SUPIMPA.
- **México**: formato exacto del aviso de privacidad integral/simplificado.
- **Perú**: plazos de respuesta ARCO.
