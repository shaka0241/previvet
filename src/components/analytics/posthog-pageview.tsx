"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

function PageviewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !posthog.__loaded) return;
    try {
      const url = searchParams?.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      posthog.capture("$pageview", { $current_url: url });
    } catch {
      // no-op
    }
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogPageview() {
  return (
    <Suspense fallback={null}>
      <PageviewInner />
    </Suspense>
  );
}
