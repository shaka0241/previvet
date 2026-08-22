"use client";

import { errorPages } from "@/content/data";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white p-4 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#1b365d]">
          {errorPages.errorTitle}
        </h1>
        <p className="max-w-md text-gray-600">{errorPages.errorMessage}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-[#0a7f38] px-6 py-3 font-bold text-white"
        >
          {errorPages.reloadLabel}
        </button>
      </body>
    </html>
  );
}
