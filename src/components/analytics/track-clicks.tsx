"use client";

import { useEffect } from "react";
import {
  trackCtaClick,
  trackSocialClick,
  trackWhatsappClick,
} from "@/lib/analytics";

export default function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-track]",
      ) as HTMLElement | null;
      if (!el) return;
      const { track, network, location, cta } = el.dataset;
      try {
        if (track === "whatsapp_click") {
          trackWhatsappClick(location ?? "unknown");
        } else if (track === "social_click") {
          if (
            network === "instagram" ||
            network === "tiktok" ||
            network === "email"
          ) {
            trackSocialClick(network);
          }
        } else if (track === "cta_click") {
          trackCtaClick(cta ?? "unknown", location ?? "unknown");
        }
      } catch {
        // no-op
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
