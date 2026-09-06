"use client";

import { useEffect, useState } from "react";

// Botón hamburguesa/X del menú móvil con estado comunicado.
// Usa la API popover nativa (sin JS para abrir/cerrar) y solo sincroniza
// aria-expanded + icono escuchando el evento `toggle` del panel.
export default function NavbarMenuToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const menu = document.getElementById("menu-movil");
    if (!menu) return;
    function onToggle(event: Event) {
      setOpen((event as Event & { newState?: string }).newState === "open");
    }
    menu.addEventListener("toggle", onToggle);
    return () => menu.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <button
      type="button"
      popoverTarget="menu-movil"
      aria-expanded={open}
      aria-controls="menu-movil"
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      className="text-secondary ml-auto p-2 md:hidden"
    >
      {open ? (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )}
    </button>
  );
}
