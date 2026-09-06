"use client";

import { useEffect } from "react";

// Cierra el menú móvil (popover) al navegar por anclas.
// Reemplaza al <script> inline: los scripts dentro de componentes React
// no se ejecutan en render de cliente y React 19 los rechaza.
export default function NavbarMenuClose() {
  useEffect(() => {
    function onHashChange() {
      const menu = document.getElementById("menu-movil");
      if (menu instanceof HTMLElement && menu.matches(":popover-open")) {
        // hidePopover existe en elementos con popover
        (menu as HTMLElement & { hidePopover: () => void }).hidePopover();
      }
    }
    document.addEventListener("hashchange", onHashChange);
    return () => document.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
