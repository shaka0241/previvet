export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

const PHONE_RE = /^\+?[0-9\s().-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const SUBMIT_TIMEOUT_MS = 10_000;

function field(entries: Record<string, FormDataEntryValue>, key: string) {
  const value = entries[key];
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactForm(
  source: FormData | HTMLFormElement,
): ContactFormData {
  const entries = Object.fromEntries(
    (source instanceof FormData ? source : new FormData(source)).entries(),
  );
  return {
    name: field(entries, "name"),
    phone: field(entries, "phone"),
    email: field(entries, "email"),
    message: field(entries, "message"),
  };
}

export function validateContactForm(data: ContactFormData): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (data.name.length < 2) errors.name = "Ingresa tu nombre.";
  if (!PHONE_RE.test(data.phone))
    errors.phone = "Ingresa un teléfono válido (ej. +57 300 123 4567).";
  if (data.email && !EMAIL_RE.test(data.email))
    errors.email = "Ingresa un correo electrónico válido.";
  if (data.message.length < 10)
    errors.message = "Cuéntanos un poco más sobre tu producción.";
  return errors;
}

interface Web3FormsResponse {
  success?: boolean;
}

export async function submitContact({
  data,
  accessKey,
  turnstileToken,
  subject,
}: {
  data: ContactFormData;
  accessKey: string;
  turnstileToken: string;
  subject: string;
}): Promise<{ ok: boolean }> {
  if (!accessKey) return { ok: false };

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      body: JSON.stringify({
        ...data,
        access_key: accessKey,
        subject,
        turnstile_response: turnstileToken,
      }),
    });
    if (!res.ok) return { ok: false };
    const json = (await res.json()) as Web3FormsResponse;
    return { ok: json.success !== false };
  } catch {
    return { ok: false };
  }
}
